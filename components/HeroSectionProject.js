import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/hero-section-project.scss'

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create(
  "hyperBounce",
  "0.4,0,0.2,1" // effet rebond
);

const HeroSectionProject = ({ title, image }) => {
  const [isRendered, setIsRendered] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (!isRendered) return;

    const mm = gsap.matchMedia();

    // --- Desktop & tablettes (>= 992px) ---
    mm.add("(min-width: 992px)", () => {
      // Animation du titre (split)
      gsap.to(".hero-section-project .transform", {
        y: "0%",
        stagger: 0.075,
        duration: 0.8,
        ease: "hyperBounce",
        delay: 0.1,
        force3D: true,
      });

      // Parallax image
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section-project .container:nth-child(2)",
          markers: false,
          start: "0% 100%",
          end: "bottom 0%",
          scrub: 1,
        },
      });
      titleAnimation.to(".hero-section-project .wrapper-image img", {
        y: "-40",
      });

      return () => {
        titleAnimation.kill();
      };
    });

    // --- Mobile (< 992px) ---
    mm.add("(max-width: 992px)", () => {
      // Fade-in simple du titre
      gsap.from(".hero-section-project", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power1.out",
      });

      return () => {}; // cleanup inutile ici
    });
  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, [textRef]);

  return (
    <section className="hero-section-project">
      <div className="container">
        <h1>
          <SplitText
            LineWrapper={({ children }) => <>{children}</>}
            WordWrapper={({ children }) => (
              <div className="o-wrapper">
                <span className="transform">{children}</span>
              </div>
            )}
            LetterWrapper={({ children }) => <>{children}</>}
            ref={textRef}
          >
            {title}
          </SplitText>
        </h1>
      </div>
      <div className="container">
        <div className="wrapper-image">
          <Image
            src={`https:${image}`}
            alt="Mon image"
            width={1920}
            height={1080}
            quality={80}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionProject;