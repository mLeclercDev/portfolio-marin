import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = () => {
    const counterRef = useRef(null);
    const progressLineRef = useRef(null);
    const progressWrapperRef = useRef(null);
    const loaderRef = useRef(null);
  
    useEffect(() => {
      const counter = counterRef.current;
      const progressLine = progressLineRef.current;
      const progressWrapper = progressWrapperRef.current;
      const loader = loaderRef.current;

    gsap.to(counter, {
      innerHTML: '100%',
      roundProps: 'innerHTML', // Arrondir la valeur du compteur à chaque mise à jour
      duration: 4,
      ease: 'power4.out',
      onComplete : () => {
        gsap.to(counter, {
            duration: 1, yPercent: -100, ease: 'power4.out'
        })
        gsap.to(loader, {
            delay: 0.8, duration: 1, opacity: 0, pointerEvents: "none", ease: 'power4.out',
            onComplete : () => {
                gsap.to(loader, {display: "none"})
            }
        })
      }
    });

    // Animation de la largeur de la progress-line de 0% à 100% avec ralentissement
    gsap.to(progressLine, {
        width: '100%',
        duration: 4,
        ease: 'power4.out',
        onComplete : () => {
            gsap.to(progressWrapper, {
                duration: 1, transform: "scaleX(0)", ease: 'power4.out'
            })
          }
    });
  }, []);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="container-xl">
        <div className='counter-wrapper'>
            <div ref={counterRef} className="counter">0%</div>
        </div>
        <div className="progress-wrapper" ref={progressWrapperRef}>
          <span ref={progressLineRef} className="progress-line"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;