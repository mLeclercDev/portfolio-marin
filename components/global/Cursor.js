import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "../../styles/components/global/cursor.scss";

const Cursor = () => {
  const router = useRouter();
  const cursorRef = useRef(null);
  const cursorContainersRef = useRef([]);
  const animationState = useRef(1);

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

  // Cursor movement & hover listeners
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

    // Mouse move
    window.addEventListener("mousemove", moveCursors);

    // Header hover
    const header = document.querySelector("header");
    if (header) {
      header.addEventListener("mouseenter", (e) => handleHover(e, "header", true));
      header.addEventListener("mouseleave", (e) => handleHover(e, "header", false));
    }

    // cs-scale / cs-scale-xl hover
    const csScaleEls = document.querySelectorAll(".cs-scale");
    csScaleEls.forEach((el) => {
      el.addEventListener("mouseenter", (e) => handleHover(e, "scale", true));
      el.addEventListener("mouseleave", (e) => handleHover(e, "scale", false));
    });

    const csScaleXlEls = document.querySelectorAll(".cs-scale-xl");
    csScaleXlEls.forEach((el) => {
      el.addEventListener("mouseenter", (e) => handleHover(e, "scaleXl", true));
      el.addEventListener("mouseleave", (e) => handleHover(e, "scaleXl", false));
    });

    // Review hover
    const reviewEls = document.querySelectorAll(".review");
    reviewEls.forEach((el) => {
      el.addEventListener("mouseenter", (e) => handleHover(e, "review", true));
      el.addEventListener("mouseleave", (e) => handleHover(e, "review", false));
    });

    return () => {
      window.removeEventListener("mousemove", moveCursors);

      if (header) {
        header.removeEventListener("mouseenter", (e) => handleHover(e, "header", true));
        header.removeEventListener("mouseleave", (e) => handleHover(e, "header", false));
      }

      csScaleEls.forEach((el) => {
        el.removeEventListener("mouseenter", (e) => handleHover(e, "scale", true));
        el.removeEventListener("mouseleave", (e) => handleHover(e, "scale", false));
      });

      csScaleXlEls.forEach((el) => {
        el.removeEventListener("mouseenter", (e) => handleHover(e, "scaleXl", true));
        el.removeEventListener("mouseleave", (e) => handleHover(e, "scaleXl", false));
      });

      reviewEls.forEach((el) => {
        el.removeEventListener("mouseenter", (e) => handleHover(e, "review", true));
        el.removeEventListener("mouseleave", (e) => handleHover(e, "review", false));
      });
    };
  }, []);

  return (
    <>
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
    </>
  );
};

export default Cursor;