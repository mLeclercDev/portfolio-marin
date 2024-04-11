import Image from 'next/image';
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectImages = ({ images, descriptions, subDescriptions }) => {
  
    const [isRendered, setIsRendered] = useState(false);
    const projects = useRef(null);

    useEffect(() => {
      if (!isRendered) return;
        gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger

        // Enregistrez le plugin ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)
        
        // Sélectionnez toutes les images dans le conteneur projects
        const images = projects.current.querySelectorAll("img")

        gsap.set(images,{ className: "fit-cover" })
        // Pour chaque image, créez une timeline GSAP
        images.forEach((image) => {
        const timeline = gsap.timeline({
            scrollTrigger: {
            trigger: image, // Utilisez l'image actuelle comme déclencheur
            start: "top 65%", // Démarrez l'animation lorsque 80% de l'image est visible
            className: "view",
            markers: false
            }
        })
        // Ajoutez une animation à la timeline pour ajouter la classe "view" à l'image
        timeline.to(image, { duration: 0, className: "fit-cover view" });
    
        })

      }, [isRendered, images]);


  useEffect(() => {
    setIsRendered(true);
  }, []);

    return (
      <div className="project-images" ref={projects}>
        {images.map((image, index) => (
            <div key={index}  className='wrapper'>
                <div className="wrapper-img">
                    <Image className='fit-cover' src={`https:${image.fields.file.url}`} alt={image.fields.title} width={500} height={300} />
                </div>
                <div className='description'>
                {descriptions[index]}
                    <div>{subDescriptions[index]}</div>
                </div>
            </div>
        ))}
      </div>
    );
};
  
export default ProjectImages;