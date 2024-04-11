import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";
import projectsData from '../data/projects.json'; // Importez vos données projet depuis le fichier JSON
import gsap from "gsap";

const HeroSection = ({title, description, projects}) => {
  const [isRendered, setIsRendered] = useState(false);
  const textRef = useRef(null);
  const descriptionref = useRef(null);
  const descriptionprojectref = useRef(null);

  useEffect(() => {
    if (!isRendered) return;
      // Effectuer l'animation ici
      const lines = document.querySelectorAll('.line');
      for (const line of lines) {
        gsap.fromTo(
          line,
          {
            'will-change': 'transform',
            yPercent: 100,
          },
          {
            ease: 'power4.inOut',
            duration: 1,
            yPercent: 0,
            stagger: {
              each: 0.15,
              from: 0,
            },
            delay: 0.5,
          },
        );
      }
  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

    // Utilisation de la méthode map() pour générer dynamiquement des éléments description à partir des données de projectsData
    const projectTitles = projects.map((project, index) => (
      <div key={index} className="project-name" data-index={index}>
        <SplitText
            LineWrapper={({ children }) =><div className="line-wrapper"> <span className="line">{children}</span></div>}
            ref={descriptionprojectref}
          >
          {project.fields.titleProject}    
        </SplitText>
      </div>
    ));

  // Utilisation de la méthode map() pour générer dynamiquement des éléments description à partir des données de projectsData
  const projectDescriptions = projects.map((project, index) => (
    <div key={index} className="project-description" data-index={index}>
      <SplitText
        LineWrapper={({ children }) =><div className="line-wrapper"> <span className="line">{children}</span></div>}
        ref={descriptionprojectref}
      >
      {project.fields.hook}
      </SplitText>
    </div>
  ));

  return (
    <div className="hero-section">
      <h1>
        <SplitText className="home-title"
          LineWrapper={({ children }) => <span className="line">{children}</span>}
          WordWrapper={({ children }) => (
            <span className="word">{children}</span>
          )}
          LetterWrapper={({ children }) => (
            <span className="letter">{children}</span>
          )}
          ref={textRef}
        >
          {title}
        </SplitText>
        <div className="project-names-wrapper">
            {projectTitles}
        </div>
      </h1>
      <div className="description">
        <SplitText className="introduction"
          LineWrapper={({ children }) =><div className="line-wrapper"> <span className="line">{children}</span></div>}
          WordWrapper={({ children }) => (
            <span className="word">{children}</span>
          )}
          LetterWrapper={({ children }) => (
            <span className="letter">{children}</span>
          )}
          ref={descriptionref}
        >
          {description}
        </SplitText>
        <div className="projects-description-wrapper">
            {projectDescriptions}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;