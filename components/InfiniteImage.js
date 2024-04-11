import { useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation"
import { animatePageOut } from "../utils/animations"
import Image from 'next/image';
import gsap from 'gsap';

function formatToUrl(title) {
  // Convertir en minuscules et remplacer les espaces par des tirets
  let url = title.toLowerCase().replace(/\s+/g, '-');
  // Supprimer les caractères spéciaux
  url = url.replace(/[^\w-]+/g, '');
  return url;
}

const Gallery = ({ images, infinite = false, projects }) => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const imagesContainers = document.querySelectorAll('.image-container');

    // Fonction pour appliquer une transformation sur les autres éléments de la galerie
    const applyTransform = (element) => {
      const dataIndex = element.getAttribute('data-index'); // Récupérer le data-index de l'élément survolé

      const timeline = gsap.timeline(); // Créer une timeline
      element.classList.add("hovered")
      gsap.to(".image-container:not(.hovered) img", { duration: 0, className: "fit-cover out" })
      gsap.to("h1 .home-title .line", { yPercent: -100, duration: 0.55, ease: "power2.inOut"})
      gsap.to(".introduction .line", { yPercent: -100, duration: 0.55, ease: "power2.inOut"})
      gsap.to(`.project-name[data-index="${dataIndex}"]`, { y: "0%", duration: 0.55, ease: "power2.inOut"})
      gsap.to(`.project-description[data-index="${dataIndex}"] .line`, { y: "0%", duration: 0.55, ease: "power2.inOut"})

      return timeline; // Retourner la timeline pour une utilisation ultérieure si nécessaire
    };

    // Fonction pour réinitialiser la transformation des autres éléments
    const resetTransform = (element) => {
      element.classList.remove("hovered")
      gsap.to(".image-container img", { duration: 0, className: "fit-cover" })
      gsap.to("h1 .line", { yPercent: 0, duration: 0.55, ease: "power2.inOut"})
      gsap.to(".introduction .line", { yPercent: 0, duration: 0.55, ease: "power2.inOut"})
      gsap.to(".project-name", { y: "100%", duration: 0.55, ease: "power2.inOut"})
      gsap.to(".project-description .line", { y: "100%", duration: 0.55, ease: "power2.inOut"})
    };

    // Ajouter un écouteur d'événement pour chaque élément de la galerie
    imagesContainers.forEach((container) => {
      container.addEventListener('mouseenter', () => applyTransform(container));
      container.addEventListener('mouseleave', () =>  resetTransform(container));
    });

    // Nettoyer les écouteurs d'événements lors du démontage du composant
    return () => {
      imagesContainers.forEach((container) => {
        container.removeEventListener('mouseenter', () => applyTransform(container));
        container.removeEventListener('mouseleave', () =>  resetTransform(container));
      });
    };
  }, []);

  // Fonction à exécuter au clic sur un élément de class layers__item
  const layersIn = (href) => {        
    if (pathname !== href) {
      animatePageOut(href, router)
    } 
  };

   // Vérifie si images est défini avant de mapper dessus
   if (!images) return null;

  return (
    <div className='container-xl'>
      <div className={`gallery ${infinite ? 'infinite' : ''}`}>

      {projects.map((project, index) => ( 
        <div key={index} className="wrapper-img">
            <div className="image-container" data-index={index} onClick={() => layersIn(`/${formatToUrl(project.fields.titleProject)}`)}>
              <Image className='fit-cover' src={`https:${project.fields.featuredImage.fields.file.url}`} alt="Mon image" width={500} height={300} />
            </div> 
        </div>
      ))}
      </div>
    </div>
  );
};

export default Gallery;