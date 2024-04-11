import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectContent = ({introduction, description}) => {
  const [isRendered, setIsRendered] = useState(false);
  const descriptionref = useRef(null);
  
  useEffect(() => {
    if (!isRendered) return;
    gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger
      var lines = descriptionref.current.querySelectorAll(".line");
      
      gsap.set(lines, { y: "100%", })
      
      var timeline = gsap.timeline();

      var timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".project-content",
            markers: false,
            toggleClass: 'active',
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: 1
        }
      });

      timeline.to(lines, {
          ease: "circ.out",
          y: "0%",
          stagger: 0.15
      })
  }, [isRendered, introduction, description]);

  useEffect(() => {
    setIsRendered(true);
  }, [descriptionref]);
 
  return (
    <div className="project-content">
        <div className='introduction'>
            {introduction}
        </div>
        <span className='divider'></span>
        <SplitText className="description"
          LineWrapper={({ children }) =><div className="line-wrapper"> <span className="line">{children}</span></div>}
          WordWrapper={({ children }) => (
            <>{children}</>
          )}
          LetterWrapper={({ children }) => (
            <>{children}</>
          )}
          ref={descriptionref}
        >
          {description}        
        </SplitText>
    </div>
  );
};

export default ProjectContent;