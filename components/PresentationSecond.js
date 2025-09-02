import React, { useRef, useState, useEffect } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import FontFaceObserver from "fontfaceobserver";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/components/presentation-second.scss";

const PresentationSecond = () => {
  const wrapperRef = useRef(null);
  const [isFontReady, setIsFontReady] = useState(false);

  CustomEase.create("hyperBounce", "0.4,0,0.2,1");

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

useEffect(() => {
  if (!isFontReady || !wrapperRef.current) return;

  console.log("Font + DOM ready, waiting a bit ⏳");

  const timer = setTimeout(() => {
    console.log("Anim starts 🚀");
        gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".presentation-second",
        markers: false,
        toggleClass: 'active',
        start: 'top 80%',
        end: 'bottom 80%',
      }
    }); 

    timeline.from(wrapperRef.current.querySelectorAll(".line"), {
      y: "100%",
      duration: 1,
      ease: "hyperBounce",
      stagger: 0.05,
      marker: false
    });
  }, 1500); // essaie 50ms → ajuste si besoin (100-200ms max)

  return () => clearTimeout(timer);
}, [isFontReady]);


  return (
    <section className="presentation-second">
      <div className="container">
        <div className="presentation-wrapper">
          <div className="text-wrapper first" ref={wrapperRef}>
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
              >
                Spacersp I&apos;m 28 years old and passionate about sports,
                always up for a session, no matter the field. I also love
                enjoying Rennes terraces with friends, chatting about everything
                over a drink, and making the most of the moment.
              </SplitText>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationSecond;
