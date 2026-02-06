import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "gsap/dist/SplitText";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import FontFaceObserver from "fontfaceobserver";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/components/brief.scss";

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

const Brief = ({ brief }) => {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const [isFontReady, setIsFontReady] = useState(false);

  // Attendre que la font soit bien chargée
  useEffect(() => {
    const font = new FontFaceObserver("Inter");
    font
      .load()
      .then(() => setIsFontReady(true))
      .catch(() => {
        console.warn("Font failed to load, proceeding anyway");
        setIsFontReady(true);
      });
  }, []);

  useEffect(() => {
    if (!isFontReady || !textRef.current || !rootRef.current) return;

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

    // État initial
    gsap.set(split.lines, { y: "100%", rotate: 5 });

    // Animation
    gsap.to(split.lines, {
      y: "0%",
      rotate: 0,
      duration: 1,
      ease: "hyperBounce",
      stagger: 0.075,
      force3D: true,
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top 85%",
        markers: false,
      },
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isFontReady, brief]);

  return (
    <section className="brief" ref={rootRef}>
      <div className="container">
        <span className="text-wrapper second">
          {isFontReady && (
            <div ref={textRef}>
              {brief}
            </div>
          )}
        </span>
      </div>
    </section>
  );
};

export default Brief;
