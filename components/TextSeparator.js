import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/text-separator.scss'

const Separator = ({content}) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!isRendered) return;
    gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger

    var timeline = gsap.timeline({
      scrollTrigger: {
          trigger: ".text-separator",
          markers: false,
          toggleClass: 'active',
          start: 'top 100%',
          scrub: 1
      }
    });

    timeline.to(".text-separator .inner", {
      transform: "translateX(-660px)",
      ease: "cubic-bezier(0.4,0,0.2,1)"
  })

  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <section className="text-separator">
        <div className='inner'>
            <span>
                {content}
            </span>
            <span>
                {content}
            </span>
            <span>
                {content}
            </span>
        </div>
    </section>
  );
};

export default Separator;