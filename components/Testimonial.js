import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/testimonial.scss';
import '../styles/components/global/cursor.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

const Testimonial = ({ testimonial }) => {
  const [isRendered, setIsRendered] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (!isRendered) return;

    const mm = gsap.matchMedia();

    // --- Desktop & tablettes (>= 992px) ---
    mm.add("(min-width: 992px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonial",
          markers: false,
          toggleClass: "active",
          start: "top 80%",
        },
      });

      const timer = setTimeout(() => {
        const linesSecond = textRef.current.querySelectorAll(
          ".testimonial .line"
        );

        timeline.to(linesSecond, {
          y: "0%",
          rotate: 0,
          ease: "hyperBounce",
          duration: 1,
          stagger: 0.075,
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
      gsap.from(".testimonial .testimonial-content", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".testimonial",
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
    <section className="testimonial">
      <div className="container">
        <div className="quotes-icon">
          <svg
            width="162"
            height="179"
            viewBox="0 0 162 179"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 94.27H74L34.73 139L0 178.27V94.27Z" fill="#110F09" />
            <rect y="91.46" width="74" height="3" fill="#110F09" />
            <path d="M0 10H74V94H0V10Z" fill="#110F09" />
            <path
              d="M88 94.27H162L122.73 139L88 178.27V94.27Z"
              fill="#110F09"
            />
            <rect x="88" y="91.46" width="74" height="3" fill="#110F09" />
            <path d="M88 10H162V94H88V10Z" fill="#110F09" />
          </svg>
        </div>
        <div className="testimonial-content">
          <div>
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
              {testimonial[0].testimonial}
            </SplitText>
          </div>
          <a
            href={`${testimonial[0].linkedin}`}
            target="_blank"
            className="arrow-link cs-scale"
          >
            <span>{testimonial[0].client}</span>
            <div className="arrow">
              <svg
                className="first"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z"
                  fill="black"
                />
              </svg>
              <svg
                className="second"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z"
                  fill="black"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;