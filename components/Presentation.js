import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "gsap/dist/SplitText";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import FontFaceObserver from "fontfaceobserver";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/presentation.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

CustomEase.create("hyperBounce", "0.4,0,0.2,1");

const Presentation = ({delayPresentation}) => {
  const [isRendered, setIsRendered] = useState(false);
  const textRefFirst = useRef(null);
  const textRefSecond = useRef(null);
  const togglerRef = useRef(null); // Ref pour le bouton toggler
  const animationState = useRef(1); // Variable de référence pour l'état d'animation
  const [isFontReady, setIsFontReady] = useState(false);

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

    // 1. Attendre que la font soit bien chargée
    useEffect(() => {
      const font = new FontFaceObserver("Inter");
  
      font.load().then(() => {
        console.log("Font Inter loaded ✅");
        setIsFontReady(true);
      }).catch(() => {
        console.warn("Font failed to load, proceeding anyway");
        setIsFontReady(true);
      });
    }, []);

  useEffect(() => {
  if (!isFontReady || !textRefFirst.current || !textRefSecond.current) return;

    // --- check mobile
    const isMobile = window.matchMedia("(max-width: 992px)").matches;

    if (isMobile) {
    // Directement appliquer la classe en mobile
    const img = document.querySelector(".presentation .second img");

      if (img) {
        img.classList.add("view");
      }
      return; // on sort, pas besoin d'animations
    }

    // Initialisation GSAP SplitText
    const splitFirst = new SplitText(textRefFirst.current, { type: "lines", linesClass: "line-child" });
    const splitSecond = new SplitText(textRefSecond.current, { type: "lines", linesClass: "line-child" });

    // Wrap mask pour les lignes et gérer le premier mot invisible
    [splitFirst, splitSecond].forEach(split => {
      split.lines.forEach((line, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'line-wrapper';
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'block';
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        line.className = 'line';

        // Pour la première ligne, wrapper le premier mot dans un span.word
        if (index === 0) {
          const text = line.textContent;
          const firstSpaceIndex = text.indexOf(' ');
          if (firstSpaceIndex > 0) {
            const firstWord = text.substring(0, firstSpaceIndex);
            const restOfText = text.substring(firstSpaceIndex);
            line.innerHTML = `<span class="word">${firstWord}</span>${restOfText}`;
          }
        }
      });
    });

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
  
    timeline.from(linesSecond, { y: "100%", rotate: 0, ease: "hyperBounce", duration: 1, stagger: 0.033  });
    }, delayPresentation);

    timeline.to(".presentation .second img", { className: "fit-cover view" });

    return () => {
      clearTimeout(timer);
      splitFirst.revert();
      splitSecond.revert();
    };

  }, [isFontReady, delayPresentation]);

  return (
    <section className="presentation">
        <div className='container'>
          <div className='presentation-wrapper'>
          <div className='images-wrapper'>
            <div className='img-wrapper first'>
              <Image className='fit-cover'
              src="/Images/marin/marin-ascension.png"
              alt="Marin en ascension d'un sommet au Pérou"
              fill
              priority
              />
            </div>
            <div className='img-wrapper second'>
              <Image className='fit-cover'
              src="/Images/marin-portfolio.png"
              alt="Marin en train de travailler"
              fill
              priority
              />
            </div>
          </div>
            <div className='text-wrapper first' ref={textRefFirst}>
                {isFontReady && (
                  <div>
                    Spacersp Hors écran, je tape quelques balles au squash ou padel, je tente ma chance à la pêche sur la côte bretonne ou je pars explorer le monde, et je termine souvent sur une terrasse ou à un festival avec mes amis.
                  </div>
                )}
            </div>
            <div className='text-wrapper second' ref={textRefSecond}>
                {isFontReady && (
                  <div>
                    Spacersp Développeur front-end freelance, j&apos;accompagne particuliers, entreprises et agences pour transformer leurs idées en sites sur mesure et intuitifs, centrés sur l&apos;expérience utilisateur.
                  </div>
                )}
            </div>
            <div onClick={() => handleClick()} className='arrow-link cs-scale'>
              <span className='arrow-span'>
               Découvrir l&apos;autre facette
              </span>
              <div className="arrow">
                <svg className="first" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z" fill="black"></path></svg>
                <svg className="second" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z" fill="black"></path></svg>
              </div>
            </div>
        </div>
        </div>
    </section>
  );
};

export default Presentation;
