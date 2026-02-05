import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
// import { SplitText } from "@cyriacbr/react-split-text"; // REMOVED
import { SplitText } from "gsap/dist/SplitText"; // ADDED
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/tools.scss'

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

CustomEase.create(
  "hyperBounce",
  "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
);

const Separator = ({content}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  // Initialisation GSAP SplitText
  useEffect(() => {
    // On cible les éléments contenant le texte à splitter
    const targets = document.querySelectorAll('.item-content .content-inner');
    const splits = [];

    targets.forEach(target => {
        // Validation que l'élément n'est pas vide pour éviter erreur GSAP
        if (target && target.innerText.trim().length > 0) {
            const split = new SplitText(target, { type: "lines", linesClass: "line-child" });
            splits.push(split);

            // Wrap mask
            split.lines.forEach(line => {
                 const wrapper = document.createElement('div');
                 wrapper.style.overflow = 'hidden';
                 wrapper.style.display = 'block';
                 line.parentNode.insertBefore(wrapper, line);
                 wrapper.appendChild(line);
            });
            
            // État initial
            gsap.set(split.lines, { y: "100%", opacity: 1 });
        }
    });

    return () => {
        splits.forEach(s => s.revert());
    };
  }, []);

useEffect(() => {
  const checkLayout = () => {
    const lines = document.querySelectorAll('.presentation-wrapper span.line');
    if (lines.length) setIsLayoutReady(true);
  };

  const observer = new MutationObserver(checkLayout);
  const presentationWrapper = document.querySelector('.presentation-wrapper');
  if (presentationWrapper) {
      observer.observe(presentationWrapper, { childList: true, subtree: true });
  }

  checkLayout(); 

  return () => observer.disconnect();
}, []);

useEffect(() => {
  if (!isLayoutReady) return;

  ScrollTrigger.refresh();
}, [isLayoutReady]);

  useEffect(() => {
    const mainElement = document.querySelector("main");
    const toolsSection = document.querySelector(".tools");
    const firstItem = document.querySelector('.item:first-child');

    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        // Supprime la classe 'active' de tous les éléments
        items.forEach(otherItem => {
          otherItem.classList.remove('active');
          
          // Animation fermeture des lignes
          const otherLines = otherItem.querySelectorAll('.line-child');
          if (otherLines.length) {
              gsap.to(otherLines, {
                  y: "100%",
                  duration: 0.4,
                  stagger: 0.05,
                  ease: "power2.in"
              });
          }

          gsap.to(otherItem.querySelector('.item-content'), {
            height: 0,
            duration: 0.65, 
            ease: "power3.inOut"
          });
        });

        // Ajoute la classe 'active' à l'élément cliqué
        item.classList.add('active');

        const itemContent = item.querySelector('.item-content');
        const contentInner = itemContent.querySelector('.content-inner');
        
        if (contentInner) {
            const innerHeight = contentInner.offsetHeight;
            
            // Animation ouverture
            gsap.to(itemContent, {
              height: innerHeight,
              duration: 0.65, 
              ease: "power3.out"
            });
            
            const lines = contentInner.querySelectorAll('.line-child');
            if (lines.length) {
                gsap.fromTo(lines, 
                    { y: "100%" },
                    { y: "0%", duration: 0.6, delay: 0.1, stagger: 0.1, ease: "power3.out" }
                );
            }
        }
      });
    });

    var titleAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: ".tools",
            markers: false,
            start: 'top center',
        }
    }); 

    titleAnimation.to(".tools h2 span.word-wrapper", {
        y: "0%", rotate: 0, duration: 1, ease: "hyperBounce"
    })

    // Créer le trigger pour la section avec la classe "tools"
    ScrollTrigger.create({
        trigger: ".tools",
        start: "top center", // Démarrer le trigger quand le haut de la section atteint le centre de la fenêtre
        end: "bottom center", // Arrêter le trigger quand le bas de la section atteint le centre de la fenêtre
        markers: false,
        onEnter: () => {
            gsap.to(mainElement, { backgroundColor: "#110F09", duration: 0.55, ease: "hyperBounce" });
        },
/*         onLeave: () => mainElement.classList.remove("tools-active"),
        onEnterBack: () => mainElement.classList.add("tools-active"), */
        onLeaveBack: () => {
            gsap.to(mainElement, { backgroundColor: "#FCFBF6", duration: 0.55, ease: "hyperBounce" });
        },
    });

    var timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".tools",
            markers: false,
            start: 'top 50%',
            once: true // L'animation ne se déclenche qu'une seule fois
        }
      });
  
      timeline.to(".tools span.line", {
        delay: 0,
        width: "100%",
        duration: 1.2,
        ease: "hyperBounce",
        stagger: 0.075
    })

    timeline.to(".tools .item-title-inner", {
        delay: -1.2,
        y: "0%", 
        rotate: 0,
        duration: 0.5,
        ease: "hyperBounce",
        stagger: 0.05,
    })

    timeline.to(".tools .cross-inner", {
        delay: -1.2,
        scale: 1, 
        opacity: 1,
        duration: 0.5,
        ease: "hyperBounce",
        stagger: 0.075,
    })

    .call(() => { if(firstItem) firstItem.click() }, null, "-=1") 


  }, []);

  useEffect(() => {
    const mainElement = document.querySelector("main");
    const toolsSection = document.querySelector(".tools");
    const firstItem = document.querySelector('.item:first-child');
    const crossWrappers = document.querySelectorAll('.cross-wrapper');
    const cursorPresentation = document.querySelector('.cursor-presentation');

    const handleCrossWrapperHover = (e) => {
      const target = e.target.closest('.cross-wrapper');
      if (!target) return;

      const parentItem = target.closest('.item');
      if (parentItem && parentItem.classList.contains('active')) return;

      const cross = target.querySelector(".cross");
      if (!cross) return;

      const { offsetX, offsetY } = e;
      const { offsetWidth, offsetHeight } = target;

      const move = 25,
        xMove = offsetX / offsetWidth * (move * 2) - move,
        yMove = offsetY / offsetHeight * (move * 2) - move;

      cross.style.transform = `translate(${xMove}px, ${yMove}px)`;

      if (e.type === 'mouseleave') {
        cross.style.transform = 'translate(0px, 0px)';
        if (cursorPresentation) cursorPresentation.classList.remove('hovering-cross-wrapper');
      } else {
        if (cursorPresentation) cursorPresentation.classList.add('hovering-cross-wrapper');
      }
    };

    const handleMouseLeave = (e) => {
      if (!e.target.closest('.cross-wrapper')) {
        if (cursorPresentation) cursorPresentation.classList.remove('hovering-cross-wrapper');
      }
    };

    crossWrappers.forEach(wrapper => {
      wrapper.addEventListener('mousemove', handleCrossWrapperHover);
      wrapper.addEventListener('mouseleave', handleCrossWrapperHover);
    });

    document.addEventListener('mousemove', handleMouseLeave);

    return () => {
      crossWrappers.forEach(wrapper => {
        wrapper.removeEventListener('mousemove', handleCrossWrapperHover);
        wrapper.removeEventListener('mouseleave', handleCrossWrapperHover);
      });
      document.removeEventListener('mousemove', handleMouseLeave);
    };
  }, []);

  return (
    <section className="tools">
        <div className='container'> 
            <h2>
                <span className='word-wrapper'>
                Outils
                </span>
            </h2>
            <div className='dropdowns'>
                <div className='item' data-index='1'>
                    <div className='flex-content'>
                        <div className='item-title'>
                            <div className='item-title-inner'>
                                HubSpot
                            </div>
                        </div>
                        <div className='cross-wrapper'>
                            <div className='cross'>
                                <div className='cross-inner'>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='item-content'>
                        <div className="content-inner">
                            HubSpot CMS relie contenu, marketing et CRM dans un même outil. J’y ai travaillé 4 ans comme développeur dans une agence certifiée Elite Partner, ce qui me permet aujourd’hui de créer des sites parfaitement intégrés à l’écosystème HubSpot.
                        </div>
                    </div>
                    <span className='line'></span>
                </div>
                <div className='item' data-index='2'>
                    <div className='flex-content'>
                        <div className='item-title'>
                            <div className='item-title-inner'>
                                Webflow
                            </div>
                        </div>
                        <div className='cross-wrapper'>
                            <div className='cross'>
                                <div className='cross-inner'>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='item-content'>
                         <div className="content-inner">
                            Webflow facilite la création visuelle de sites modernes et dynamiques. J’ai mené plusieurs projets dessus, notamment avec des agences spécialisées, en combinant design impactant et gestion simple pour les clients.               
                        </div>
                    </div>
                    <span className='line'></span>
                </div>
                <div className='item' data-index='3'>
                    <div className='flex-content'>
                        <div className='item-title'>
                            <div className='item-title-inner'>
                            Wordpress
                            </div>
                        </div>
                        <div className='cross-wrapper'>
                            <div className='cross'>
                                <div className='cross-inner'>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='item-content'>
                        <div className="content-inner">
                           WordPress reste la référence pour des sites flexibles et évolutifs. J’ai construit de nombreux projets avec, d’abord en agence puis en freelance, ce qui m’a donné une solide maîtrise de ses thèmes, plugins et développements sur mesure.
                        </div>
                    </div>
                    <span className='line'></span>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Separator;