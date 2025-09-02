import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/hero-section-project.scss'

const HeroSectionProject = ({title, image}) => {
    const [isRendered, setIsRendered] = useState(false);
    const textRef = useRef(null);

  useEffect(() => {
    if (!isRendered) return;
    gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger
    gsap.registerPlugin(CustomEase);

        CustomEase.create(
      "hyperBounce",
      "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
    );

    gsap.to(".hero-section-project .transform", {y: "0%", stagger: 0.075, duration: 0.8, ease: "hyperBounce", delay: 0.1 
     });

  });

  useEffect(() => {
    setIsRendered(true);
    console.log(" setIsRendered(true);")
  }, [textRef]);

  return (
    <section className="hero-section-project">
        <div className='container'>
            <h1>
                <SplitText
                  LineWrapper={({ children }) =><>{children}</>}
                  WordWrapper={({ children }) => <div className='o-wrapper'><span className='transform'>{children}</span></div>}
                  LetterWrapper={({ children }) => <>{children}</>}
                  ref={textRef}
                >
                    {title}
                </SplitText> 
            </h1>
        </div>
        <div className='container'>
            <div className="wrapper-image">
                <Image className='fit-cover view' src={`https:${image}`} alt="Mon image" width={1920} height={1080} quality={80} />
            </div>
        </div>
    </section>
  );
};

export default HeroSectionProject;