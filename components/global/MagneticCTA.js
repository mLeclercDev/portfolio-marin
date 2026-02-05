import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../../styles/components/global/magnetic-cta.scss';

const MagneticCTA = ({ href = '#', text, children, className = '', lg = false, style = {}, ...props }) => {
  const magneticRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = magneticRef.current;
    const textEl = textRef.current;
    const rollerInner = textEl ? textEl.querySelector('.text-roller-inner') : null;

    if (!button || !textEl || !rollerInner) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Réactif : Plus d'attraction, moins de durée
      const deltaX = (e.clientX - centerX) * 0.35;
      const deltaY = (e.clientY - centerY) * 0.35;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3, 
        ease: "power2.out"
      });
      
      gsap.to(textEl, {
        x: deltaX * 0.2, // Texte suit légèrement
        y: deltaY * 0.2,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
        // RESET INVISIBLE
        gsap.set(rollerInner, { y: "0%" });
        
        const arrowFirst = button.querySelector('.arrow .first');
        const arrowSecond = button.querySelector('.arrow .second');
        
        if(arrowFirst && arrowSecond) {
             // Reset aux positions CSS initiales (centrage = -50%)
             gsap.set(arrowFirst, { x: "0%", y: "-50%", opacity: 1 });
             gsap.set(arrowSecond, { x: "-100%", y: "100%", opacity: 0 }); // En bas à gauche
        }

        // ANIMATION (Go to State B)
        // Texte
        gsap.to(rollerInner, {
            y: "-50%",
            duration: 0.5,
            ease: "cubic-bezier(0.4, 0, 0.2, 1)"
        });

        // Flèches
        if(arrowFirst && arrowSecond) {
            // F1 part haut-droite (de -50% à -200% pour bien sortir)
            gsap.to(arrowFirst, {
                x: "100%", y: "-200%", 
                duration: 0.5,
                ease: "cubic-bezier(0.4, 0, 0.2, 1)"
            });
            // F2 arrive centre (de 100% à -50%)
            gsap.to(arrowSecond, {
                opacity: 1,
                x: "0%", y: "-50%", // -50% pour être parfaitement centré
                duration: 0.5, 
                ease: "cubic-bezier(0.4, 0, 0.2, 1)" 
            });
        }
    };

    const handleMouseLeave = () => {
      // Retour rapide à la position initiale (magnétique)
      gsap.to([button, textEl], {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Valeur par défaut si text/children est vide
  const content = text || children || 'Contact';

  return (
    <a
      ref={magneticRef}
      href={href}
      className={`magnetic-cta cs-scale ${lg ? 'lg' : ''} ${className}`}
      style={style}
      {...props}
    >
      <span ref={textRef} className="magnetic-text">
        <span className="text-roller-mask">
            <span className="text-roller-inner">
                {/* Texte doublé pour l'effet de rouleau */}
                <span>{content}</span>
                <span>{content}</span>
            </span>
        </span>
        <span className="arrow">
          <svg className='first' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
            <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="currentColor"/>
          </svg>
          <svg className='second' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
            <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="currentColor"/>
          </svg>  
        </span>
      </span>
    </a>
  );
};

export default MagneticCTA;
