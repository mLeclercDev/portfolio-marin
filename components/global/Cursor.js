import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import '../../styles/components/global/cursor.scss';
import gsap from "gsap";

const Cursor = () => {
  const router = useRouter();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);
  const [isHoveringScale, setIsHoveringScale] = useState(false);
  const [isHoveringScaleXl, setIsHoveringScaleXl] = useState(false);
  const animationState = useRef(1);
  
   useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsHoveringScale(false);
      setIsHoveringScaleXl(false);
      setIsHoveringHeader(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);





  useEffect(() => {
    const cursorContainers = document.querySelectorAll("[data-cursor-container]");

    const moveCursors = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorContainers.forEach(cursor => {
        cursor.style.left = `${posX}px`;
        cursor.style.top = `${posY}px`;
      });
    }

    const handleMouseEnter = (e) => {
      const index = e.target.getAttribute('data-index');
      const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
      if (cursor) {
        cursor.classList.add('active');
      }
    };

    const handleMouseLeave = (e) => {
      const index = e.target.getAttribute('data-index');
      const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
      if (cursor) {
        cursor.classList.remove('active');
      }
    };

    window.addEventListener("mousemove", moveCursors);

    const reviews = document.querySelectorAll('.review');
    reviews.forEach(review => {
      review.addEventListener('mouseenter', handleMouseEnter);
      review.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursors);
      reviews.forEach(review => {
        review.removeEventListener('mouseenter', handleMouseEnter);
        review.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const cursorContainers = document.querySelectorAll("[data-cursor-container]");

    const moveCursors = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorContainers.forEach(cursor => {
        cursor.style.left = `${posX}px`;
        cursor.style.top = `${posY}px`;
      });
    }

    const handleMouseEnter = (e) => {
      const index = e.target.getAttribute('data-index');
      const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
      if (cursor) {
        cursor.classList.add('active');
      }
    };

    const handleMouseLeave = (e) => {
      const index = e.target.getAttribute('data-index');
      const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
      if (cursor) {
        cursor.classList.remove('active');
      }
    };

    window.addEventListener("mousemove", moveCursors);

    const reviews = document.querySelectorAll('.review');
    reviews.forEach(review => {
      review.addEventListener('mouseenter', handleMouseEnter);
      review.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursors);
      reviews.forEach(review => {
        review.removeEventListener('mouseenter', handleMouseEnter);
        review.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      if (animationState.current === 1) {
        animateFirst().then(() => {
          animationState.current = 2;
        });
      } else {
        animateSecond().then(() => {
          animationState.current = 1;
        });
      }
    };

    const handleMouseEnterHeader = () => {
      setIsHoveringHeader(true);
    };

    const handleMouseLeaveHeader = () => {
      setIsHoveringHeader(false);
    };

    const handleMouseEnterScale = () => {
      setIsHoveringScale(true);
    };

    const handleMouseLeaveScale = () => {
      setIsHoveringScale(false);
    };

    const handleMouseEnterScaleXl = () => {
      setIsHoveringScaleXl(true);
    };

    const handleMouseLeaveScaleXl = () => {
      setIsHoveringScaleXl(false);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const presentationElement = document.querySelector('.presentation');
    const headerElement = document.querySelector('header');

    if (headerElement) {
      headerElement.addEventListener('mouseenter', handleMouseEnterHeader);
      headerElement.addEventListener('mouseleave', handleMouseLeaveHeader);
    }

    // Fonction pour ajouter les écouteurs d'événements de survol
    const addHoverListeners = () => {
      const csScaleElements = document.querySelectorAll('.cs-scale');
      const csScaleElementsXl = document.querySelectorAll('.cs-scale-xl');

      csScaleElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnterScale);
        element.addEventListener('mouseleave', handleMouseLeaveScale);
      });

      csScaleElementsXl.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnterScaleXl);
        element.addEventListener('mouseleave', handleMouseLeaveScaleXl);
      });
    };

    // Observer pour les changements dans le DOM
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Ajouter les écouteurs d'événements de survol lors du montage initial
    addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (presentationElement) {
        presentationElement.removeEventListener('mouseenter', handleMouseEnterPresentation);
        presentationElement.removeEventListener('mouseleave', handleMouseLeavePresentation);
        presentationElement.removeEventListener('click', handleClick);
      }
      if (headerElement) {
        headerElement.removeEventListener('mouseenter', handleMouseEnterHeader);
        headerElement.removeEventListener('mouseleave', handleMouseLeaveHeader);
      }

      observer.disconnect();
    };
  }, []);

  return (
    <>
    <div className={`cursor-presentation ${isHoveringHeader ? 'hovering-header' : ''} ${isHoveringScale ? 'hovering-scale' : ''} ${isHoveringScaleXl ? 'hovering-scale-xl' : ''}`} style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}>
      <div className='arrow'>
        <svg className="first" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 5.83333H25.0425L0.250835 30.625L4.375 34.7492L29.1667 9.9575V35H35V0H0V5.83333Z" fill="black"/>
        </svg>
        <svg className="second" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 5.83333H25.0425L0.250835 30.625L4.375 34.7492L29.1667 9.9575V35H35V0H0V5.83333Z" fill="black"/>
        </svg>
      </div>
    </div>
  </>
);
};

export default Cursor;