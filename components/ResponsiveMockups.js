import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import '../styles/components/responsive-mockups.scss';
import '../styles/components/global/cursor.scss';

const ResponsiveMockups = ({ images }) => {
      const wrappersRef = useRef([]);
      // index global pour toutes les images (colonnes gauche/droite)
      let globalIndex = 0;
    
      const renderProject = (image) => {
        const currentIndex = globalIndex;
        globalIndex++;
    
        return (
          <div key={image.sys.id} className="mockup-wrapper">
            <div
              ref={(el) => (wrappersRef.current[currentIndex] = el)}
              className={`project-media-wrapper cs-scale ${image.fields.textColor}`}
            >
              <div className="image-wrapper">
                <div className="image-inner">
                  <Image
                    src={`https:${image.fields.file.url}`}
                    alt={image.fields.title || `mockup-${i}`}
                    fill
                    quality={80}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      };
    
      const sortedProjects = images.sort(
        (a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0)
      );
    
      // Séparer pour colonnes mais garder refs globales
      const leftColumnProjects = sortedProjects.filter((_, i) => i % 2 === 0);
      const rightColumnProjects = sortedProjects.filter((_, i) => i % 2 !== 0);
    
      return (
        <section className="responsive-mockups">
          <div className="container">
            <div className="mockups-wrapper">
              <div className="column left-column">
                {leftColumnProjects.map((image) => renderProject(image))}
              </div>
              <div className="column right-column">
                {rightColumnProjects.map((image) => renderProject(image))}
              </div>
            </div>
          </div>
        </section>
      );
};

export default ResponsiveMockups;