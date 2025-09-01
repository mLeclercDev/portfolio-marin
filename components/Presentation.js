import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/presentation.scss';

const Separator = () => {
  const [isRendered, setIsRendered] = useState(false);
  const textRefFirst = useRef(null);
  const textRefSecond = useRef(null);
  const togglerRef = useRef(null); // Ref pour le bouton toggler
  const animationState = useRef(1); // Variable de référence pour l'état d'animation
  CustomEase.create("hyperBounce", "0.4,0,0.2,1");

    const animateFirst = () => {
    return new Promise((resolve) => {
      gsap.set(".presentation .second .line", { y: "0%", rotate: 0 });
      gsap.to(".presentation .second .line", {
        y: "-100%", rotate: -5, ease: "hyperBounce", duration: 1,
      });
      gsap.to(".presentation .second img", { className: "fit-cover" });
      gsap.set(".presentation .second .line", { y: "100%", rotate: 5, delay: 1 });
      gsap.to(".presentation .first img", { className: "fit-cover view", delay: 1 });
      gsap.to(".presentation .first .line", { y: "0%", rotate: 0, ease: "hyperBounce", duration: 1, delay: 1,
        onComplete: resolve
      });
    });
  };

  const animateSecond = () => {
    return new Promise((resolve) => {
      gsap.set(".presentation .first .line", { y: "0%", rotate: 0 });
      gsap.to(".presentation .first .line", {
        y: "-100%", rotate: -5, ease: "hyperBounce", duration: 1
      });
      gsap.to(".presentation .first img", { className: "fit-cover" });
      gsap.set(".presentation .first .line", { y: "100%", rotate: 5, delay: 1 });
      gsap.to(".presentation .second img", { className: "fit-cover view", delay: 1 });
      gsap.to(".presentation .second .line", { y: "0%", rotate: 0, ease: "hyperBounce", duration: 1, delay: 1,
        onComplete: resolve
      });
    });
  };

  const handleClick = () => {
    if (animationState.current === 1) {
      animateFirst().then(() => {
        animationState.current = 2;
      });
    } else {
      animateSecond().then(() => {
        animationState.current = 1;
      });
    }
  };

  useLayoutEffect(() => {
    if (!isRendered) return;
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".presentation",
        markers: false,
        toggleClass: 'active',
        start: 'top 80%',
        end: 'bottom 80%',
      }
    }); 

    const timer = setTimeout(() => {
    const linesSecond = textRefSecond.current.querySelectorAll(".line");
    const linesFirst = textRefFirst.current.querySelectorAll(".line");
    gsap.set(linesFirst, {  y: "100%", rotate: 0});
  
      timeline.from(linesSecond, { y: "100%", rotate: 0, ease: "hyperBounce", duration: 1, delay: -0.3  });
    }, 555);


    timeline.to(".presentation .second img", { className: "fit-cover view" });

    return () => clearTimeout(timer);

  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <section className="presentation">
        <div className='container'>
          <div className='images-wrapper'>
            <div className='img-wrapper first'>
              <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
            </div>
            <div className='img-wrapper second'>
              <Image className='fit-cover' src="/Images/layer-2.png" alt="Mon image" width={1150} height={520} />
            </div>
          </div>
            <div className='text-wrapper first'>
                <SplitText
                  LineWrapper={({ children }) =><span className="line-wrapper"><span className="line">{children}</span></span>}
                  WordWrapper={({ children }) => <span className='word'>{children}</span>}
                  LetterWrapper={({ children }) => <>{children}</>}
                  ref={textRefFirst}
                >
                Spacersp I&apos;m 28 years old and passionate about sports, always up for a session, no matter the field. I also love enjoying Rennes terraces with friends, chatting about everything over a drink, and making the most of the moment.

                </SplitText> 
            </div>
            <div className='text-wrapper second'>
                <SplitText
                  LineWrapper={({ children }) =><span className="line-wrapper"><span className="line">{children}</span></span>}
                  WordWrapper={({ children }) => <span className='word'>{children}</span>}
                  LetterWrapper={({ children }) => <>{children}</>}
                  ref={textRefSecond}
                >
                Spacersp I’m a 28-year-old front-end developer with agency experience, now working as a freelancer. I help my clients design and build websites that perfectly meet their needs and expectations, combining technical expertise with attention to detail.
                </SplitText> 
            </div>
            <div onClick={() => handleClick()} className='arrow-link cs-scale'>
              <span className='arrow-span'>
               View Alt Version
              </span>
              <div className="arrow">
                <svg className="first" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z" fill="black"></path></svg>
                <svg className="second" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z" fill="black"></path></svg>
              </div>
            </div>
        </div>
    </section>
  );
};

export default Separator;
