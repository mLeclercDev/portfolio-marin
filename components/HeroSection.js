import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/hero-section.scss'

const HeroSection = ({delay}) => {
  const [isRendered, setIsRendered] = useState(false);
  const textRef = useRef(null);
  const descriptionref = useRef(null);
  const descriptionprojectref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger

    var reveal = gsap.timeline({});

    gsap.to(".hero-section .transform", {y: "0%", rotate: 0, duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)", delay: delay })
    
    gsap.to(".hero-section .transform.second .line-bar", {width: "calc(100% + 20px)", duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)", delay: delay +  0.8 })
    gsap.to(".hero-section .transform.second .target ", {opacity: 0.5, duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)", delay: delay +  0.8 })
    gsap.to(".hero-section .informations ", {y: "0%", rotate: 0,duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)", delay: delay +  0.8 })
    gsap.to(".hero-section span.line ", { opacity: 1, duration: 0, delay: delay })

    var timeline = gsap.timeline({
      scrollTrigger: {
          trigger: ".hero-section",
          markers: false,
          start: 'top 0%',
          scrub: 1
      }
    });

    timeline.to(".hero-section span.line", {
      transform: "scaleX(0)",
      ease: "cubic-bezier(0.4,0,0.2,1)"
    })

  })

  return (
    <section className="hero-section">
        <div className='container'>
            <h1>
                <div className='o-wrapper'>
                    <span className='transform first'>
                        Developer
                    </span>
                </div>
                <div>
                    <span className='o-wrapper'>
                        <span className='transform second'>
                            <span className='target'>
                            based
                            </span>
                            <span className='line-bar'>
                            </span>
                        </span>
                        <span className='o-wrapper'>
                            <span className='informations'>
                                (frequently)
                            </span>
                        </span>
                    </span>
                    <span className='o-wrapper d-sm-none d-md-block'>
                        <span className='transform third'>
                        in
                        </span>
                    </span>
                </div>
                <div className='d-sm-block d-md-none'>
                    <span className='o-wrapper'>
                        <span className='transform'>
                        in
                        </span>
                    </span>
                </div>
                <div>
{/*                     <span className='shape'>
                        <svg width="72" height="80" viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M70.6416 20C67.4679 14.5031 59.9655 13.4683 55.4223 17.9009L40.1646 32.7877L45.428 12.1307C46.9952 5.97992 42.3479 0 36.0006 0C29.6533 0 25.006 5.97992 26.5732 12.1307L31.8365 32.7877L16.5788 17.9009C12.0357 13.4683 4.53324 14.5031 1.3596 20C-1.81405 25.4969 1.04106 32.5116 7.15141 34.2297L27.6725 40L7.15141 45.7703C1.04106 47.4884 -1.81405 54.5031 1.3596 59.9999C4.53324 65.4968 12.0357 66.5316 16.5788 62.099L31.8366 47.2123L26.5732 67.8693C25.006 74.02 29.6533 80 36.0006 80C42.3479 80 46.9952 74.02 45.428 67.8693L40.1646 47.2123L55.4223 62.099C59.9655 66.5316 67.4679 65.4969 70.6416 60C73.8152 54.5031 70.9601 47.4884 64.8498 45.7703L44.3287 40L64.8498 34.2297C70.9601 32.5116 73.8152 25.4969 70.6416 20Z" fill="black"/>
                        </svg>
                    </span> */}
                    <span className='images'>
                        {/* <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} /> */}
                    </span>
                    <span className='o-wrapper'>
                        <span className='transform fourth'>
                        France
                        </span>
                    </span>
                </div>
            </h1>
        </div>
        <span className='line'></span>
    </section>
  );
};

export default HeroSection;