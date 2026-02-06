import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/text-separator.scss'

const Separator = ({content}) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!isRendered) return;
    gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger

    const screenWidth = window.innerWidth;
    let translateXValue;

    if (screenWidth > 992) {
      // Desktop : si la largeur du contenu dépasse 660px, on adapte
      translateXValue = -660; // 1000 px max par exemple
    } else {
      translateXValue = -330; // valeur par défaut pour tablettes et mobiles
    }

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
      x: translateXValue,
      ease: "linear"
  })


        // Animation spécifique pour mobile (<992px)
  const mm = gsap.matchMedia();

  mm.add("(max-width: 991px)", () => {
    let mobileTimeline; // ← déclaration ici
    // Exemple : faire apparaître le titre avec un scale léger
    mobileTimeline = gsap.from(".text-separator", {
      opacity: 0,
      x: 60,
      duration: 0.6,
      stagger: 0.05,
      delay: 0.65,
      ease: "linear"
    });

    return () => {
      if (mobileTimeline) mobileTimeline.kill(); // safe kill
    };
    });

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