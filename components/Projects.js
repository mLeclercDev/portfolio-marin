import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { useScrollContext } from './global/ScrollContext';
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/projects.scss'

const Projects = () => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger
    // Sélectionne tous les éléments .project
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        // Crée une timeline pour chaque .project
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: project, // Utilise l'élément .project actuel comme trigger
            markers: false,
            toggleClass: 'active',
            start: 'top 70%',
          }
        });
      
        // Ajoute une animation à la timeline
        timeline.to(project.querySelector('img'), { className: "fit-cover view" });
        timeline.to(project.querySelector('span.transform'), { y: "0%", rotate: 0,  duration: 0.7, ease: "cubic-bezier(0.4,0,0.2,1)", delay: 0.25 });
      });

  });

  return (
    <section className="projects">
        <div className='container'>
            <div className='column'>
                <a className='project' href='eurosport.fr'>
                    <figure>
                        <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
                    </figure>
                    <div className='informations'>
                        <span className='transform'>
                        Ewen Tortelier - <span>Portfolio</span> 
                        </span>
                    </div>
                </a>
                <a className='project' href='eurosport.fr'>
                    <figure>
                        <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
                    </figure>
                    <div className='informations'>
                        <span className='transform'>
                        Ewen Tortelier - <span>Portfolio</span> 
                        </span>
                    </div>
                </a>
            </div>
            <div className='column'>
                <a className='project' href='eurosport.fr'>
                    <figure>
                        <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
                    </figure>
                    <div className='informations'>
                        <span className='transform'>
                        Ewen Tortelier - <span>Portfolio</span> 
                        </span>
                    </div>
                </a>
                <a className='project' href='eurosport.fr'>
                    <figure>
                        <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
                    </figure>
                    <div className='informations'>
                        <span className='transform'>
                        Ewen Tortelier - <span>Portfolio</span> 
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </section>
  );
};

export default Projects;