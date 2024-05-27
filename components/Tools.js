import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/tools.scss'

const Separator = ({content}) => {
  const [isRendered, setIsRendered] = useState(false);



  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger
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
            ease: "cubic-bezier(0.4,0,0.2,1)"
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
          ease: "cubic-bezier(0.4,0,0.2,1)"
        });
      });
    });

    var titleAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: ".tools h2",
            markers: true,
            start: 'top center',
        }
    });

    titleAnimation.to(".tools h2 span.word-wrapper", {
        y: "0%", rotate: 0, duration: 1, ease: "cubic-bezier(0.4,0,0.2,1)"
    })

    // Créer le trigger pour la section avec la classe "tools"
    ScrollTrigger.create({
        trigger: ".tools",
        start: "top center", // Démarrer le trigger quand le haut de la section atteint le centre de la fenêtre
        end: "bottom center", // Arrêter le trigger quand le bas de la section atteint le centre de la fenêtre
        markers: false,
        onEnter: () => mainElement.classList.add("tools-active"),
        onLeave: () => mainElement.classList.remove("tools-active"),
        onEnterBack: () => mainElement.classList.add("tools-active"),
        onLeaveBack: () => mainElement.classList.remove("tools-active"),
    });

    var timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".tools .item:first-child",
            markers: false,
            start: 'top 85%',
            onEnter: () => { firstItem.click(); },
            once: true // L'animation ne se déclenche qu'une seule fois
        }
      });
  
      timeline.to(".tools span.line", {
        width: "100%",
        duration: 1.25,
        ease: "cubic-bezier(0.4,0,0.2,1)",
        stagger: 0.15
    })

  }, []);

  return (
    <section className="tools">
        <div className='container'>
            <div className='flex-wrapper'>
                <div className='svg-wrapper'>
                    <svg width="322" height="200" viewBox="0 0 322 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M162.622 177.969C185.413 159.641 200 131.524 200 100C200 68.4763 185.413 40.3594 162.622 22.0306C179.099 9.46323 199.678 2 222 2C276.124 2 320 45.8761 320 100C320 154.124 276.124 198 222 198C199.678 198 179.099 190.537 162.622 177.969ZM161 179.246C137.281 160.961 122 132.265 122 100C122 67.7348 137.281 39.0387 161 20.7536C161.545 21.1738 162.086 21.5995 162.622 22.0306C139.148 39.9347 124 68.1984 124 100C124 131.802 139.148 160.065 162.622 177.969C162.086 178.401 161.545 178.826 161 179.246ZM161 179.246C144.119 192.26 122.963 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0C122.963 0 144.119 7.74007 161 20.7536C177.881 7.74007 199.037 0 222 0C277.228 0 322 44.7715 322 100C322 155.228 277.228 200 222 200C199.037 200 177.881 192.26 161 179.246Z" fill="white"/>
                    </svg>
                </div>
{/*                 <div className='circles'>
                    <div className='circle first'></div>
                    <div className='circle second'></div>
                </div> */}
                <h2>
                    <span className='word-wrapper'>
                    Tools
                    </span>
                </h2>
            </div>
            <div className='dropdowns'>
                <div className='item' data-index='1'>
                    <div className='flex-content'>
                        <div className='item-title'>
                            CMS
                        </div>
                        <div className='cross'>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className='item-content'>
                        <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel lacinia justo, non euismod felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec iaculis elit quis tellus semper, non eleifend lacus cursus. Donec id lorem hendrerit, cursus ipsum vel, euismod magna.
                        </span>
                    </div>
                    <span className='line'></span>
                </div>
                <div className='item' data-index='2'>
                    <div className='flex-content'>
                        <div className='item-title'>
                            Framework JS
                        </div>
                        <div className='cross'>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className='item-content'>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel lacinia justo, non euismod felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec iaculis elit quis tellus semper, non eleifend lacus cursus. Donec id lorem hendrerit, cursus ipsum vel, euismod magna.
                        </span>                   
                    </div>
                    <span className='line'></span>
                </div>
                <div className='item' data-index='3'>
                    <div className='flex-content'>
                        <div className='item-title'>
                            Animations
                        </div>
                        <div className='cross'>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className='item-content'>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel lacinia justo, non euismod felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec iaculis elit quis tellus semper, non eleifend lacus cursus. Donec id lorem hendrerit, cursus ipsum vel, euismod magna.
                        </span>                   
                    </div>
                    <span className='line'></span>
                </div>
                <div className='item' data-index='4'>
                    <div className='flex-content'>
                        <div className='item-title'>
                            3D
                        </div>
                        <div className='cross'>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className='item-content'>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel lacinia justo, non euismod felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec iaculis elit quis tellus semper, non eleifend lacus cursus. Donec id lorem hendrerit, cursus ipsum vel, euismod magna.
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