import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/tools.scss'

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create(
  "hyperBounce",
  "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
);

const Separator = ({content}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

useEffect(() => {
  const checkLayout = () => {
    const lines = document.querySelectorAll('.presentation-wrapper span.line');
    if (lines.length) setIsLayoutReady(true);
  };

  const observer = new MutationObserver(checkLayout);
  observer.observe(document.querySelector('.presentation-wrapper'), { childList: true, subtree: true });

  checkLayout(); // check direct au cas où c’est déjà monté

  return () => observer.disconnect();
}, []);

useEffect(() => {
  if (!isLayoutReady) return;

  console.log("Layout ready, refresh ScrollTrigger");
  ScrollTrigger.refresh();
}, [isLayoutReady]);

  useEffect(() => {
    const mainElement = document.querySelector("main");
    const toolsSection = document.querySelector(".tools");
    const firstItem = document.querySelector('.item:first-child');

    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        // Supprime la classe 'active' de tous les éléments .item
        items.forEach(item => {
          item.classList.remove('active');
          gsap.to(item.querySelector('.item-content'), {
            height: 0,
            duration: 0.65, // Durée de l'animation
            ease: "hyperBounce"
          });
        });

        // Ajoute la classe 'active' à l'élément cliqué
        item.classList.add('active');

        // Sélection de l'élément .item-content dans l'élément cliqué
        const itemContent = item.querySelector('.item-content');

        // Récupération de la hauteur du span dans l'élément .item-content
        const spanHeight = itemContent.querySelector('span').offsetHeight;

        // Application de la hauteur au contenu de l'élément .item-content avec l'easing spécifié
        gsap.to(itemContent, {
          height: spanHeight,
          duration: 0.65, // Durée de l'animation
          ease: "hyperBounce"
        });
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
        markers: true,
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

    .call(() => firstItem.click(), null, "-=1") // Ajouté ici, 0.3s avant la fin de l’animation précédente


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
        cursorPresentation.classList.remove('hovering-cross-wrapper');
      } else {
        cursorPresentation.classList.add('hovering-cross-wrapper');
      }
    };

    const handleMouseLeave = (e) => {
      if (!e.target.closest('.cross-wrapper')) {
        cursorPresentation.classList.remove('hovering-cross-wrapper');
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
            <div className='flex-wrapper'>
                <div className='svg-wrapper'>
                    <svg width="322" height="200" viewBox="0 0 322 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M162.622 177.969C185.413 159.641 200 131.524 200 100C200 68.4763 185.413 40.3594 162.622 22.0306C179.099 9.46323 199.678 2 222 2C276.124 2 320 45.8761 320 100C320 154.124 276.124 198 222 198C199.678 198 179.099 190.537 162.622 177.969ZM161 179.246C137.281 160.961 122 132.265 122 100C122 67.7348 137.281 39.0387 161 20.7536C161.545 21.1738 162.086 21.5995 162.622 22.0306C139.148 39.9347 124 68.1984 124 100C124 131.802 139.148 160.065 162.622 177.969C162.086 178.401 161.545 178.826 161 179.246ZM161 179.246C144.119 192.26 122.963 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0C122.963 0 144.119 7.74007 161 20.7536C177.881 7.74007 199.037 0 222 0C277.228 0 322 44.7715 322 100C322 155.228 277.228 200 222 200C199.037 200 177.881 192.26 161 179.246Z" fill="#FCFBF6"/>
                    </svg>
                </div> 
                <h2>
                    <span className='word-wrapper'>
                    Outils
                    </span>
                </h2>
            </div>
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
                        <span>
                          Le CMS HubSpot permet une intégration fluide des contenus, des outils marketing et du CRM. Je crée des sites HubSpot qui allient l’identité visuelle de la marque à une édition intuitive, permettant aux clients de gérer leur contenu en toute autonomie tout en soutenant leur croissance marketing.                        
                        </span>
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
                        <span>
Webflow permet de concevoir visuellement des sites internet tout en gardant un contrôle total sur les interactions et les mises en page responsives. Je crée des sites Webflow qui reflètent votre identité de marque, avec des structures claires et éditables, permettant aux clients de mettre à jour leur contenu facilement.
                        </span>                   
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
                      <span>
WordPress permet de gérer facilement le contenu de votre site tout en offrant une grande flexibilité pour des fonctionnalités sur mesure. Je développe des sites WordPress personnalisés, avec des backends intuitifs et des designs responsives, garantissant performance et gestion de contenu fluide.
                      </span>                    
                    </div>
                    <span className='line'></span>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Separator;