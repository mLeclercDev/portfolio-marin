import React, { useRef, useState, useEffect } from "react";
import { SplitText } from "gsap/dist/SplitText";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import FontFaceObserver from "fontfaceobserver";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/components/presentation-second.scss";

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

CustomEase.create("hyperBounce", "0.4,0,0.2,1");

const PresentationSecond = () => {
  const wrapperRef = useRef(null);
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

useEffect(() => {
  if (!isFontReady || !wrapperRef.current || !textRef.current) return;

  console.log("Font + DOM ready, waiting a bit ⏳");

  const timer = setTimeout(() => {
    console.log("Anim starts 🚀");

    // Initialisation GSAP SplitText
    const split = new SplitText(textRef.current, { type: "lines", linesClass: "line-child" });

    // Wrap mask pour les lignes
    split.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.className = 'line-wrapper';
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
      line.className = 'line';
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".presentation-second",
        markers: false,
        toggleClass: 'active',
        start: 'top 80%',
        end: 'bottom 80%',
      }
    }); 

    timeline.from(split.lines, {
      y: "100%",
      duration: 1,
      ease: "hyperBounce",
      stagger: 0.05,
      marker: false
    });

    return () => {
      split.revert();
    };
  }, 1500);

  return () => clearTimeout(timer);
}, [isFontReady]);


  return (
    <section className="presentation-second">
      <div className="container">
        <div className="presentation-wrapper">
          <div className="text-wrapper first" ref={wrapperRef}>
            {isFontReady && (
              <div ref={textRef}>
                I&apos;m 28 years old and passionate about sports,
                always up for a session, no matter the field. I also love
                enjoying Rennes terraces with friends, chatting about everything
                over a drink, and making the most of the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationSecond;
