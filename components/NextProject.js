import { usePathname } from "next/navigation"
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { animatePageOut } from "../utils/animations"
import { SplitText } from "@cyriacbr/react-split-text";

function formatToUrl(title) {
  // Convertir en minuscules et remplacer les espaces par des tirets
  let url = title.toLowerCase().replace(/\s+/g, '-');
  // Supprimer les caractères spéciaux
  url = url.replace(/[^\w-]+/g, '');
  return url;
}

const NextProject = ({projects}) => {
  const router = useRouter();
  const pathname = usePathname()
  const { projectName } = router.query;
  const nameref = useRef(null);


  // Filtrer les projets qui ne sont pas égaux au projet actuel
  const filteredProjects = projects.filter(project => formatToUrl(project.fields.titleProject) !== projectName);
  // Sélectionner un projet aléatoire parmi les projets filtrés
  const nextProject = filteredProjects[Math.floor(Math.random() * filteredProjects.length)];

  // Fonction à exécuter au clic sur un élément de class layers__item
  const layersIn = (href) => {        
    if (pathname !== href) {
      animatePageOut(href, router)
    } 
  };

  return (
    <div className="next-project">
        <div className='introduction'> 
            Discover another incredible project of my portfolio
        </div>
        <span className='divider'></span>
        <div onClick={() => layersIn(`/${formatToUrl(nextProject.fields.titleProject)}`)}>
          <SplitText className="name-project" 
            LineWrapper={({ children }) =><div className="line-wrapper"> <span className="line">{children}</span></div>}
            WordWrapper={({ children }) => (
              <>{children}</>
            )}
            LetterWrapper={({ children }) => (
              <>{children}</>
            )}
            ref={nameref}
          >
          {nextProject.fields.titleProject}
          </SplitText>
        </div>
    </div>
  );
};

export default NextProject;