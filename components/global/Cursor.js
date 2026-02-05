import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "../../styles/components/global/cursor.scss";

const Cursor = () => {
  const router = useRouter();
  const cursorRef = useRef(null);
  const cursorContainersRef = useRef([]);
  const [hoverStates, setHoverStates] = useState({
    header: false,
    scale: false,
    scaleXl: false,
  });

  // Reset hover states on route change
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setHoverStates({ header: false, scale: false, scaleXl: false });
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);

  useEffect(() => {
    const moveCursors = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }
      cursorContainersRef.current.forEach((el) => {
        if (el) {
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
        }
      });
    };

    const handleHover = (e, type, state) => {
      if (type === "review") {
        const index = e.currentTarget.dataset.index;
        const cursor = cursorContainersRef.current[index - 1];
        if (cursor) cursor.classList.toggle("active", state);
      } else {
        setHoverStates((prev) => ({ ...prev, [type]: state }));
      }
    };

    window.addEventListener("mousemove", moveCursors);

    // Fonction pour binder les hover listeners
    const bindHoverListeners = () => {
      // Désactivé pour permettre l'effet de grossissement sur les éléments de la navbar
      // const header = document.querySelector("header");
      // if (header) {
      //   header.addEventListener('mouseenter', (e) => handleHover(e, "header", true));
      //   header.addEventListener('mouseleave', (e) => handleHover(e, "header", false));
      // }

      document.querySelectorAll(".cs-scale").forEach((el) => {
        // Remove existing listeners to avoid duplicates
        el.removeEventListener('mouseenter', el._scaleEnterHandler);
        el.removeEventListener('mouseleave', el._scaleLeaveHandler);
        
        // Create and store handlers
        el._scaleEnterHandler = (e) => handleHover(e, "scale", true);
        el._scaleLeaveHandler = (e) => handleHover(e, "scale", false);
        
        el.addEventListener('mouseenter', el._scaleEnterHandler);
        el.addEventListener('mouseleave', el._scaleLeaveHandler);
      });

      document.querySelectorAll(".cs-scale-xl").forEach((el) => {
        el.removeEventListener('mouseenter', el._scaleXlEnterHandler);
        el.removeEventListener('mouseleave', el._scaleXlLeaveHandler);
        
        el._scaleXlEnterHandler = (e) => handleHover(e, "scaleXl", true);
        el._scaleXlLeaveHandler = (e) => handleHover(e, "scaleXl", false);
        
        el.addEventListener('mouseenter', el._scaleXlEnterHandler);
        el.addEventListener('mouseleave', el._scaleXlLeaveHandler);
      });

      document.querySelectorAll(".review").forEach((el) => {
        el.removeEventListener('mouseenter', el._reviewEnterHandler);
        el.removeEventListener('mouseleave', el._reviewLeaveHandler);
        
        el._reviewEnterHandler = (e) => handleHover(e, "review", true);
        el._reviewLeaveHandler = (e) => handleHover(e, "review", false);
        
        el.addEventListener('mouseenter', el._reviewEnterHandler);
        el.addEventListener('mouseleave', el._reviewLeaveHandler);
      });
    };

    // Bind une première fois
    bindHoverListeners();

    // Observer le DOM pour re-binder quand Next.js change la page
    let timeoutId;
    const observer = new MutationObserver(() => {
      // Debounce pour éviter trop de re-bindings
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        bindHoverListeners();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("mousemove", moveCursors);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor-presentation 
        ${hoverStates.header ? "hovering-header" : ""} 
        ${hoverStates.scale ? "hovering-scale" : ""} 
        ${hoverStates.scaleXl ? "hovering-scale-xl" : ""}`}
    >
      <div className="arrow">
        <svg
          className="first"
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 5.83333H25.0425L0.250835 30.625L4.375 34.7492L29.1667 9.9575V35H35V0H0V5.83333Z"
            fill="black"
          />
        </svg>
        <svg
          className="second"
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 5.83333H25.0425L0.250835 30.625L4.375 34.7492L29.1667 9.9575V35H35V0H0V5.83333Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

export default Cursor;
