import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import FontFaceObserver from "fontfaceobserver";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/brief.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create(
  "hyperBounce", 
  "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
);

const Brief = ({ brief }) => {
  const [isRendered, setIsRendered] = useState(false);
  const textRef = useRef(null);
  const [isFontReady, setIsFontReady] = useState(false);

  // 1. Attendre que la font soit bien chargée
  useEffect(() => {
    const font = new FontFaceObserver("Inter");

    font.load().then(() => {
      console.log("Font Inter loaded ✅");
      setIsFontReady(true);
    }).catch(() => {
      console.warn("Font failed to load, proceeding anyway");
      setIsFontReady(true);
    });
  }, []);


  useLayoutEffect(() => {
    if (!isRendered) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".brief",
        markers: false,
        toggleClass: 'active',
        start: 'top 80%',
      }
    });

    const timer = setTimeout(() => {
      const linesSecond = textRef.current.querySelectorAll(".brief .second .line");
      console.log("lines : ", linesSecond);
  
      timeline.from(linesSecond, { y: "100%", rotate: 5, ease: "hyperBounce", duration: 1 });
    }, 555);

    return () => clearTimeout(timer);

  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <section className="brief">
        <div className='container'>
            <span className='text-wrapper second'>
                  {isFontReady && (
                <SplitText
                  LineWrapper={({ children }) =><span className="line-wrapper"><span className="line">{children}</span></span>}
                  WordWrapper={({ children }) => <span className='word'>{children}</span>}
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
