import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useScrollContext } from './global/ScrollContext';
import Image from 'next/image';
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { animatePageOut } from "../utils/animations";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/next-project.scss'

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create(
  "hyperBounce",
  "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
);

function formatToUrl(title) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

const NextProject = ({ projects }) => {
  const wrappersRef = useRef([]);
  const router = useRouter(); 
  const pathname = router.asPath;


  const layersIn = (href) => {
    console.log("href : ", href)
    console.log("pathname : ", pathname)
    if (pathname !== href) {
      console.log("lance animatePageOut")
      animatePageOut(href, router);
    }
  };

  // index global pour toutes les images (colonnes gauche/droite)
  let globalIndex = 0;
      const renderProject = (project) => {
        const currentIndex = globalIndex;
        globalIndex++;
    
        return (
          <div key={project.sys.id} className="project">
            <div
              ref={(el) => (wrappersRef.current[currentIndex] = el)}
              className="project-inner"
              onClick={() => layersIn(`/${formatToUrl(project.fields.title)}`)}
            >
                <div className='background'></div>
                {project.fields.title}
            </div>
          </div>
        );
      };
  return (
    <section className="next-project">
      <div className="container">
        <div className='projects-wrapper'>
          {projects
            // on filtre les projets pour enlever celui de l’URL courante
            .filter((project) => {
              const projectUrl = `/${formatToUrl(project.fields.title)}`;
              return projectUrl !== pathname;
            })
            .map((project) => renderProject(project))}
        </div>
      </div>
    </section>
  );
};

export default NextProject;