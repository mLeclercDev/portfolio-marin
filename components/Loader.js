import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/loader.scss'

const Loader = ({title, description, projects}) => {
  const [isRendered, setIsRendered] = useState(false);
  const textRef = useRef(null);
  const descriptionref = useRef(null);
  const descriptionprojectref = useRef(null);
  const percentageRef = useRef(null);
  const percentages = useRef([useRef(null), useRef(null), useRef(null), useRef(null)]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    var revealPercent = gsap.timeline({});

    revealPercent.to(".loader .target-percent", { y: "0%", rotate: 0, duration: 1, ease: "cubic-bezier(0.4,0,0.2,1)" })
    .to(".loader .target-percent .one", { y: "-100%", rotate: 0, duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)" })
    .to(".loader .target-percent .two", { y: "0%", rotate: 0, duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)" })
    .to(".loader .target-percent .two", { y: "-100%", rotate: 0, duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)" })
    .to(".loader .target-percent .three", { y: "0%", rotate: 0, duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)" })

    gsap.to(".loader img", { className: "fit-cover view", delay: 2.6 });
    gsap.to(".loader .transform", { y: "0%", rotate: 0, duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)", delay: 1.8 });

    // Animation pour le span.line
    gsap.to(".loader span.line", {
      transform: "scaleX(1)",
      ease: "cubic-bezier(0.4,0,0.2,1)",
      duration: 4.4, // ajustez la durée de l'animation si nécessaire,
      delay: 0,
    });

    gsap.to(".loader .transform", { y: "-100%", rotate: 0, duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)", delay: 4.2 });
    gsap.to(".loader .target-percent", { y: "-100%", rotate: 0, duration: 0.8, ease: "cubic-bezier(0.4,0,0.2,1)", delay: 4.2 });
    gsap.to(".loader .line", { display: "none", duration: 0, delay: 5 });



  }, []);

  return (
    <section className="loader">
      <div className='container'>
        <h1>
          <div className='o-wrapper'>
            <span className='transform first'>
              Marin
            </span>
          </div>
          <div>
            <span className='o-wrapper'>
              <span className='transform second'>
                <span className='target'></span>
              </span>
            </span>
            <span className='o-wrapper'>
              <span className='transform third'>
                Leclerc
              </span>
            </span>
          </div>
          <div>
            <span className='images'>
              <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
            </span>
            <span className='o-wrapper'>
                <span className='target-percent'>
                    <span className='value-wrapper'>
                        <span span className='percent one' ref={percentages.current[0]}>
                            32
                        </span>
                        <span className='percent two' ref={percentages.current[2]}>
                            68
                        </span>
                        <span className='percent three' ref={percentages.current[3]}>
                            93
                        </span>
                    </span>
                    <span className='fixed-percent'>%</span>
                </span>
            </span>
          </div>
        </h1>
      </div>
      <span className='line'></span>
    </section>
  );
};

export default Loader;