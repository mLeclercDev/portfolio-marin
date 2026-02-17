import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import MagneticCTA from './global/MagneticCTA';

gsap.registerPlugin(ScrollTrigger, SplitText);

const CTASection = ({ 
  title, 
  description, 
  ctaText, 
  ctaLink, 
  className = "" 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let splitTitle;
    let splitDesc;
    
    const ctx = gsap.context(() => {
        const el = containerRef.current;
        const titleEl = el.querySelector('h2');
        const descEl = el.querySelector('p');
        const btnEl = el.querySelector('.magnetic-cta'); 

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "top 75%",
            }
        });

        // 1. Title Animation (SplitText)
        if (titleEl) {
            splitTitle = new SplitText(titleEl, { type: "lines", linesClass: "line-child" });
            
            // Wrap lines
            splitTitle.lines.forEach(line => {
                const wrapper = document.createElement('div');
                wrapper.style.overflow = 'hidden';
                wrapper.style.display = 'block';
                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });

            gsap.set(splitTitle.lines, { y: "100%" });
            gsap.set(titleEl, { opacity: 1 });

            tl.to(splitTitle.lines, {
                y: "0%",
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });
        }

        // 2. Description (SplitText)
        if (descEl) {
            splitDesc = new SplitText(descEl, { type: "lines", linesClass: "line-child" });
            
            // Wrap lines for reveal effect
            splitDesc.lines.forEach(line => {
                const wrapper = document.createElement('div');
                wrapper.style.overflow = 'hidden';
                wrapper.style.display = 'block';
                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });

            gsap.set(splitDesc.lines, { y: "100%" });
            gsap.set(descEl, { opacity: 0.8 }); 

            tl.to(splitDesc.lines, {
                y: "0%",
                duration: 1,
                stagger: 0.05,
                ease: "power3.out"
            }, "-=0.8");
        }

        // 3. Button
        if (btnEl) {
            const ctaTextInner = btnEl.querySelector('.text-roller-inner');
            const ctaArrow = btnEl.querySelector('.arrow svg.first');

            gsap.set(btnEl, { transition: 'none' });
            if(ctaTextInner) gsap.set(ctaTextInner, { y: "110%" });
            if(ctaArrow) gsap.set(ctaArrow, { y: "100%", x: "-100%" });

            tl.fromTo(btnEl,
                { opacity: 0, scale: 0, y: 5 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    onComplete: () => gsap.set(btnEl, { clearProps: "transition" })
                },
                "-=0.5"
            );
            
            if (ctaTextInner) {
                tl.to(ctaTextInner, { y: "0%", duration: 0.8, ease: "power3.out" }, "-=0.7");
            }
            if (ctaArrow) {
                tl.to(ctaArrow, { y: "-50%", x: "0%", duration: 0.75, ease: "power3.out" }, "-=0.6");
            }
        }
    }, containerRef);

    return () => {
        if (splitTitle) splitTitle.revert();
        if (splitDesc) splitDesc.revert();
        ctx.revert();
    };
  }, []);

  return (
    <section className={`cta-section ${className}`} ref={containerRef}>
      <div className="container">
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        
        {ctaText && ctaLink && (
            <MagneticCTA 
                text={ctaText}
                href={ctaLink} 
                className="cta-button"
            />
        )}
      </div>
    </section>
  );
};

export default CTASection;
