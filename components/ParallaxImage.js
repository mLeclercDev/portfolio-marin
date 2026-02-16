import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxImage = ({
  src = "/Images/collaborer-marin-2.avif",
  alt = "Collaborer",
  className = "collaborer-full-image"
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !overlayRef.current) return;

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP : Animation complexe avec PIN
      mm.add("(min-width: 769px)", () => {
         // 1. Parallax d'approche (avant le pin)
         gsap.fromTo(imageRef.current, 
            { y: "-15%" }, 
            { 
              y: "0%",
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "top top",
                scrub: true
              }
            }
        );

        // 2. Pin + Scale Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%", 
            pin: true,
            scrub: 0.8
          }
        });

        tl.fromTo(imageRef.current, 
          { scale: 1.2 }, 
          { scale: 1, ease: "none" }
        )
        .to(overlayRef.current, {
            opacity: 0.3, 
            ease: "none"
        }, "<");
      });

      // MOBILE : Simple Parallax sans Pin
      mm.add("(max-width: 768px)", () => {
         gsap.to(imageRef.current, {
            y: "20%", // Effet parallax simple vers le bas
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
         });
         
         gsap.set(overlayRef.current, { opacity: 0 });
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className={className} ref={containerRef}>
      <div className="image-container">
        <Image 
          ref={imageRef}
          src={src} 
          alt={alt} 
          className="fit-cover" 
          fill
          unoptimized
          style={{ objectFit: 'cover' }}
        />
        <div className="overlay" ref={overlayRef}></div>
      </div>
    </section>
  );
};

export default ParallaxImage;
