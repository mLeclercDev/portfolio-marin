import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { useScrollContext } from './global/ScrollContext';
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/achievements.scss'

const Achievements = () => {
  const [isRendered, setIsRendered] = useState(false);
  const { scrollProgress } = useScrollContext();

useEffect(() => {
  const mainElement = document.querySelector("main");

  const mm = gsap.matchMedia();

  mm.add(
    {
      isMobile: "(max-width: 767px)",
      isTablet: "(min-width: 768px) and (max-width: 1199px)",
      isDesktop: "(min-width: 1200px)",
    },
    (context) => {
      let { isMobile, isTablet, isDesktop } = context.conditions;

      let limit1, limit2;

      if (isMobile) {
        limit1 = 50;
        limit2 = 60;
      } else if (isTablet) {
        limit1 = 50;
        limit2 = 60;
      } else if (isDesktop) {
        limit1 = 53;
        limit2 = 61;
      }

      if (scrollProgress >= limit1) {
        gsap.to(mainElement, { backgroundColor: "#FCFBF6", duration: 0 });
      } else if (scrollProgress > 0 && scrollProgress < limit2) {
        gsap.to(mainElement, { backgroundColor: "#110F09", duration: 0 });
      }
    }
  );

  return () => mm.revert(); // nettoyage
}, [scrollProgress]);

  return (
    <section className="achievements">
{/*         <div className='scroll-value'>
          {scrollProgress}
        </div> */}
        <div className='home-inner'>
          <h2 style={{ "--progress1": scrollProgress / 100 }}>
          PORTFOLIO
          </h2>
        </div>
    </section>
  );
};

export default Achievements;