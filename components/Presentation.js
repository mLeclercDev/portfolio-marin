import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/presentation.scss'

const Separator = () => {
  const [isRendered, setIsRendered] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (!isRendered) return;
    gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger

    var timeline = gsap.timeline({
      scrollTrigger: {
          trigger: ".presentation",
          markers: false,
          toggleClass: 'active',
          start: 'top 60%',
          end: 'bottom 80%',
      }
    });


    const timer = setTimeout(() => {
      var lines = textRef.current.querySelectorAll(".presentation .line");
      console.log("lines : ", lines)
  
      timeline.to(lines, { y: "0%", rotate: 0, ease: "cubic-bezier(0.4,0,0.2,1)", duration: 1, delay: -0.3  });
    }, 555); // Délai en millisecondes (1000 ms = 1 seconde)

    timeline.to(".presentation img", { className: "fit-cover view" })

    return () => clearTimeout(timer);
  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <section className="presentation">
        <div className='container'>
            <div className='img-wrapper'>
              <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
            </div>
            <span className='text-wrapper first'>
                <span className='spacer'></span>
                <span>
{/*                 <SplitText
                  LineWrapper={({ children }) =><div className="line-wrapper"><span className="line">{children}</span></div>}
                  WordWrapper={({ children }) => <>{children}</>}
                  LetterWrapper={({ children }) => <>{children}</>}
                  ref={textRef}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam augue erat, fringilla et augue ac, dignissim tempor tortor. Vestibulum interdum consequat porttitor. Nulla mollis ligula metus, ut sed libero sit amet.
                </SplitText>  */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam augue erat, fringilla et augue ac, dignissim tempor tortor. Vestibulum interdum consequat porttitor. Nulla mollis ligula metus, ut sed libero sit amet.
                </span>
            </span>
            <span className='text-wrapper second'>
                {/* <span className='spacer'></span> */}
                <SplitText
                  LineWrapper={({ children }) =><span className="line-wrapper"><span className="line">{children}</span></span>}
                  WordWrapper={({ children }) => <span className='word'>{children}</span>}
                  LetterWrapper={({ children }) => <>{children}</>}
                  ref={textRef}
                >
                Spacersp Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam augue erat, fringilla et augue ac, dignissim tempor tortor. Vestibulum interdum consequat porttitor. Nulla mollis ligula metus, ut sed libero sit amet.

                </SplitText> 
            </span>
            <button className='toggler'>
                <span>
                  True <br></br> version
                </span>
            </button>
        </div>
    </section>
  );
};

export default Separator;