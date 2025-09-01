import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation"
import { useLenis } from "@studio-freight/react-lenis";
import Image from 'next/image';
import { animatePageOut } from "../utils/animations"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/projects-second.scss';

function formatToUrl(title) {
  // Convertir en minuscules et remplacer les espaces par des tirets
  let url = title.toLowerCase().replace(/\s+/g, '-');
  // Supprimer les caractères spéciaux
  url = url.replace(/[^\w-]+/g, '');
  return url;
}

const ProjectsSecond = ({ projects }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isRendered, setIsRendered] = useState(false);
  const projectRefs = useRef([]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaQueryChange = (event) => {
        setIsLargeScreen(event.matches);
    };
    // Vérifiez la taille de l'écran au montage du composant
    handleMediaQueryChange(mediaQuery);
    // Ajoutez un écouteur pour détecter les changements de taille d'écran
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    // Nettoyez l'écouteur d'événement lors du démontage du composant
    return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (!isLargeScreen) return;
    // Sélectionne l'élément .projects
    const projects = document.querySelector(".projects-second");

    // Sélectionne le dernier élément avec la classe .content-wrapper au sein de .projects
    const lastContentWrapper = projects.querySelector(".project-wrapper:last-of-type .wrapper-inner");
    const lastContentWrapperHeight = lastContentWrapper.offsetHeight;
    gsap.set(".projects-second .flex-wrapper", {
      height: `calc(400vh - ${lastContentWrapperHeight}px)`
    });

    gsap.registerPlugin(ScrollTrigger);

    // Animation de la première Image et de l'observer //
    var firstImage = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects-second",
        markers: false,
        start: 'top 100%',
      }
    });

    firstImage.to(".projects-second .images div:first-child img", {
      className: "fit-cover view",
    });
    firstImage.to(".projects-second .observer .complete-observer", {
        height: "100%", ease: "cubic-bezier(0.4,0,0.2,1)", duration: 1.25, delay: 0.15
    });

    // Animation des titres //
    const titles = document.querySelectorAll(".projects-second .title-project");

    titles.forEach(title => {
      // Crée une timeline pour chaque .project
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: title, // Utilise l'élément .project actuel comme trigger
          markers: false,
          toggleClass: 'active',
          start: 'top 90%',
          end: 'bottom 10%',
          onEnter: () => {
            // Ajoutez ici les actions que vous voulez réaliser lors de l'entrée
            timeline.to(title.querySelectorAll('span.transform'), {
              y: "0%",
              duration: 0.9,
              rotate: 0,
              ease: "cubic-bezier(0.4,0,0.2,1)",
              stagger: 0.05
            }).to(title.closest('.project-wrapper').querySelector(".description"), {
              duration: 0.5,
              opacity: 1,
              delay: -0.6,
              ease: "cubic-bezier(0.4,0,0.2,1)"
            });
          }
        }
      });
    });
    // FIN animation des titres

    // Animation de la première image //
    const firstProjectTitle = document.querySelector(".projects-second .project-wrapper:nth-child(1) .wrapper-inner");
    const heightFirstTitle = firstProjectTitle.offsetHeight;
    const secondProject = document.querySelector(".projects-second .project-wrapper:nth-child(2)");
    const heightSecondProject = secondProject.offsetHeight;

    var startOffset = document.querySelector(".projects-second .project-wrapper:nth-child(2)").offsetTop - heightFirstTitle + "px 100%";
    var endOffset = document.querySelector(".projects-second .project-wrapper:nth-child(2)").offsetTop - heightFirstTitle + heightSecondProject + "px 100%";

    var revealFirst = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects-second .project-wrapper:nth-child(2)",
        markers: false,
        start: startOffset,
        end: endOffset,
        scrub: true
      }
    });

    revealFirst.to(".projects-second .images div:nth-child(2) img", {
      scale: 1, clipPath: "inset(0% 0 0 0)", ease: "none"
    });

    // FIN Animation de la première image //

    // Animation de la deuxième image //
    const secondProjectTitle = document.querySelector(".projects-second .project-wrapper:nth-child(2) .wrapper-inner");
    const heightSecondTitle = secondProjectTitle.offsetHeight;
    const thirdProject = document.querySelector(".projects-second .project-wrapper:nth-child(3)");
    const heightThirdProject = thirdProject.offsetHeight;

    var startOffsetSecond = document.querySelector(".projects-second .project-wrapper:nth-child(2)").offsetTop - heightFirstTitle + "px 100%";
    var endOffsetSecond = document.querySelector(".projects-second .project-wrapper:nth-child(2)").offsetTop - heightSecondTitle + heightThirdProject + "px 100%";

    var revealSecond = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects-second .project-wrapper:nth-child(3)",
        markers: false,
        start: startOffsetSecond,
        end: endOffsetSecond,
        scrub: true
      }
    });

    revealSecond.to(".projects-second .images div:nth-child(3) img", {
      scale: 1, clipPath: "inset(0% 0 0 0)", ease: "none"
    });
    // FIN Animation de la deuxième image //

    var observer = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-second",
          markers: false,
          start: "top 0%",
          end: "bottom 100%",
          scrub: true
        }
      });
  
      observer.to(".projects-second .observer .dynamic-observer", {
        height: "100%", ease: "none"
      });

  });

  useEffect(() => {
    if (isLargeScreen) return;
        // Animation des titres //
        const titles = document.querySelectorAll(".projects-second .title-project");

        titles.forEach(title => {
          // Crée une timeline pour chaque .project
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: title, // Utilise l'élément .project actuel comme trigger
              markers: false,
              toggleClass: 'active',
              start: 'top 50%',
              onEnter: () => {
                // Ajoutez ici les actions que vous voulez réaliser lors de l'entrée
                timeline.to(title.querySelectorAll('span.transform'), {
                  y: "0%",
                  duration: 0.9,
                  rotate: 0,
                  ease: "cubic-bezier(0.4,0,0.2,1)",
                  stagger: 0.05
                }).to(title.closest('.project-wrapper').querySelector(".description"), {
                  duration: 0.5,
                  opacity: 1,
                  delay: -0.6,
                  ease: "cubic-bezier(0.4,0,0.2,1)"
                });
              }
            }
          });
        });

        // Animation des images //
        const images = document.querySelectorAll(".projects-second .responsive-image img");

        images.forEach(image => {
          // Crée une timeline pour chaque .project
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: image, // Utilise l'élément .project actuel comme trigger
              markers: false,
              toggleClass: 'active',
              start: 'top 75%',
              onEnter: () => {
                // Ajoutez ici les actions que vous voulez réaliser lors de l'entrée
                timeline.to(image, {
                  className: "fit-cover view"
                })
              }
            }
          });
        });
  });

  // Fonction à exécuter au clic sur un élément de class layers__item
  const layersIn = (href) => {    
    console.log("href : ", href) 
    console.log("pathname : ", pathname)    
    if (pathname !== href) {
      animatePageOut(href, router)
    } 
  };

    // Utilisation de la méthode map() pour générer dynamiquement des éléments description à partir des données de projectsData
    const projectObject = projects.map((project, index) => (
      <div key={index} className='project-wrapper' data-index={index + 1} ref={el => projectRefs.current[index] = el}>
        <div className='wrapper-inner'>
          <div className="responsive-image" key={index} data-index={index + 1} onClick={() => layersIn(`/${formatToUrl(project.fields.title)}`)}>
            <Image className='fit-cover' src={`https:${project.fields.featuredImageHomepage.fields.file.url}`} alt="Mon image" width={1150} height={520} />
          </div>
          <div className='title-project'>
            <div className='o-wrapper'>
              <span className='transform'>
                {project.fields.title} - 
              </span>
            </div>
            <div className='o-wrapper'>
              <span className='transform'>
                Portfolio
              </span>
            </div>
          </div>
          <div className='description'>
          {project.fields.description}
          </div>
          <div onClick={() => layersIn(`/${formatToUrl(project.fields.title)}`)} className='arrow-link cs-scale'>
            <span>
              View project
            </span>
            <div className='arrow'>
              <svg className='first' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z" fill="black" />
              </svg>
              <svg className='second' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z" fill="black" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    ));

    // Utilisation de la méthode map() pour générer dynamiquement des éléments description à partir des données de projectsData
    const projectImage = projects.map((project, index) => (
      <div className="cs-scale" key={index} data-index={index + 1} onClick={() => layersIn(`/${formatToUrl(project.fields.title)}`)}>
          <Image className='fit-cover' src={`https:${project.fields.featuredImageHomepage.fields.file.url}`} alt="Mon image" width={1150} height={520} />
      </div>
    ));

  return (
    <section className="projects-second">
      <div className='flex-wrapper'>
        <div className='images'>
          {projectImage}
        </div>
        <div className='content'>
          {projectObject}
        </div>
        <div className='observer'>
            <div className="observer-wrapper">
                <span className="complete-observer"></span>
                <span className="dynamic-observer"></span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSecond;