import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import FontFaceObserver from "fontfaceobserver";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/components/brief.scss";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

const Brief = ({ brief }) => {
  const rootRef = useRef(null);
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
    if (!isFontReady || !rootRef.current) return;

    let animationKilled = false;

    const runAnim = () => {
      if (animationKilled) return;
      const lines = rootRef.current.querySelectorAll(".line");
      if (!lines.length) {
        // SplitText pas encore rendu → réessaie au prochain frame
        requestAnimationFrame(runAnim);
        return;
      }

      // Reset state initial
      gsap.set(lines, { y: "100%", rotate: 5 });

      // Animation
      gsap.to(lines, {
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
    };

    runAnim();

    return () => {
      animationKilled = true;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isFontReady, brief]);

  return (
    <section className="brief" ref={rootRef}>
      <div className="container">
        <span className="text-wrapper second">
          {isFontReady && (
            <SplitText
              LineWrapper={({ children }) => (
                <span className="line-wrapper">
                  <span className="line">{children}</span>
                </span>
              )}
              WordWrapper={({ children }) => <span className="word">{children}</span>}
              LetterWrapper={({ children }) => <>{children}</>}
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
