import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import AnimatedTitle from "./utils/AnimateTitle";


const HeroProject = ({ image, title }) => {

  const [isRendered, setIsRendered] = useState(false);
  const textRef = useRef(null);
  const wrapperImageRef = useRef(null);

  useEffect(() => {
    if (!isRendered) return;

    const tl = gsap.timeline();

    /* gsap.set(wrapperImageRef.current,{ className: "fit-cover" }) */

    tl.to(wrapperImageRef.current, { className: "fit-cover view", delay: 0.55 }) // cibler les enfants de wrapperImageRef.current

    const timer = setTimeout(() => {
      var lines = textRef.current.querySelectorAll(".line");
      console.log("lines : ", lines)

      gsap.set(lines,{ y: "100%" })
  
      tl.to(lines, { y: "0%", ease: 'power4.inOut', duration: 1, delay: 0.55, stagger: 0 });
    }, 555); // Délai en millisecondes (1000 ms = 1 seconde)
  
    // Retour de fonction de nettoyage pour annuler le timer si le composant est démonté avant l'exécution du code
    return () => clearTimeout(timer);
  }, [isRendered, image, title]);

  useEffect(() => {
    setIsRendered(true);
    console.log(" setIsRendered(true);")
  }, [textRef, wrapperImageRef]);

  return (
    <div className="hero-project">
      <div className='content-wrapper'>
        <h1>
          <SplitText
            LineWrapper={({ children }) =><div className="line-wrapper"><span className="line">{children}</span></div>}
            WordWrapper={({ children }) => <>{children}</>}
            LetterWrapper={({ children }) => <>{children}</>}
            ref={textRef}
          >
            {title}
          </SplitText> 
        </h1>
        <div className='wrapper-image'>
          <Image className='fit-cover' ref={wrapperImageRef} src={`https:${image}`}alt="Ma belle image" width={1149} height={520} />
        </div>
      </div>
    </div>
  );
};

export default HeroProject;
