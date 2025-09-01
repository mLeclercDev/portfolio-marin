import { useEffect, useState, createContext, useContext } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollProgressProjects, setScrollProgressProjects] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const worksSection = document.querySelector('.achievements');
      if (!worksSection) return; // Vérifier si la section .works est présente

      const windowHeight = window.innerHeight;
      const worksTop = worksSection.offsetTop;
      const worksHeight = worksSection.offsetHeight;
      const worksBottom = worksTop + worksHeight;
      const currentScrollY = window.scrollY;
      
      // Calculer la progression du défilement par rapport à la position de début et de fin de la section .works
      const progress = Math.max(0, Math.min(100, ((currentScrollY - worksTop) / (worksBottom - worksTop)) * 100));
      setScrollProgress(progress);
    };

    updateScrollProgress(); // Mettre à jour la progression du défilement initiale
    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  return useContext(ScrollContext);
};
