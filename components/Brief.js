import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import FontFaceObserver from "fontfaceobserver";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/brief.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create(
  "hyperBounce",
  "0.4,0,0.2,1" // effet rebond
);

const Brief = ({ brief }) => {
  const [isRendered, setIsRendered] = useState(false);
  const textRef = useRef(null);
  const [isFontReady, setIsFontReady] = useState(false);

  // Attendre que la font soit bien chargée
  useEffect(() => {
    const font = new FontFaceObserver("Inter");

    font.load().then(() => {
      setIsFontReady(true);
    }).catch(() => {
      console.warn("Font failed to load, proceeding anyway");
      setIsFontReady(true);
    });
  }, []);

  useLayoutEffect(() => {
    if (!isRendered) return;

    const mm = gsap.matchMedia();

    // --- Desktop & tablettes (>= 992px) ---
    mm.add("(min-width: 992px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".brief",
          markers: false,
          toggleClass: "active",
          start: "top 80%",
        },
      });

      const timer = setTimeout(() => {
        const linesSecond = textRef.current.querySelectorAll(
          ".brief .second .line"
        );

        timeline.from(linesSecond, {
          y: "100%",
          rotate: 5,
          ease: "hyperBounce",
          duration: 1,
          stagger: 0.1,
          force3D: true,
        });
      }, 555);

      return () => {
        clearTimeout(timer);
        timeline.kill();
      };
    });

    // --- Mobile (< 992px) ---
    mm.add("(max-width: 991px)", () => {
      gsap.from(".brief .second", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".brief",
          start: "top 90%",
        },
      });

      return () => {};
    });
  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <section className="brief">
      <div className="container">
        <span className="text-wrapper second">
          {isFontReady && (
            <SplitText
              LineWrapper={({ children }) => (
                <span className="line-wrapper">
                  <span className="line">{children}</span>
                </span>
              )}
              WordWrapper={({ children }) => (
                <span className="word">{children}</span>
              )}
              LetterWrapper={({ children }) => <>{children}</>}
              ref={textRef}
            >
              {brief}
            </SplitText>
          )}
        </span>
      </div>
    </section>
  );
};

export default Brief;