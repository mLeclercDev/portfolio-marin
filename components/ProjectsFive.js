import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../utils/animations";
import gsap from "gsap";
import "../styles/components/projects-five.scss";

function formatToUrl(title) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

const ProjectsFourth = ({ projects }) => {
  const wrappersRef = useRef([]);
  const imagesRef = useRef([]);
  const titlesRef = useRef([]);
  const router = useRouter();
  const pathname = usePathname();

  const layersIn = (href) => {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  useEffect(() => {
  if (typeof window === "undefined") return; // évite exécution côté serveur

  imagesRef.current.forEach((img, i) => {
    if (!img) return;

    gsap.to(
      img,
      {
        y: 20,
        ease: "cubic-bezier(0.4,0,0.2,1)",
        duration: 0.3,
        scrollTrigger: {
          trigger: wrappersRef.current[i],
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: false
        },
      }
    );
  });
}, []);


  // Fonction pour générer le markup d’un projet
  const renderProject = (project, index) => (
    <div key={index} className="project-wrapper">
      <div
        ref={(el) => (wrappersRef.current[index] = el)}
        className={`project-media-wrapper cs-scale ${project.fields.textColor}`}
        data-index={index}
        onClick={() => layersIn(`/${formatToUrl(project.fields.title)}`)}
      >
        <div
          className="image-wrapper"
        >
            <div className="image-inner">
                <Image
                    ref={(el) => (imagesRef.current[index] = el)}
                    src={`https:${project.fields.featuredImageHomepage.fields.file.url}`}
                    alt={project.fields.title}
                    fill
                    quality={80}
                />
            </div>
        </div>
        <div className="project-information">
          <span
            ref={(el) => (titlesRef.current[index] = el)}
            data-index={index}
          >
            {project.fields.title}
          </span> • {project.fields.description}
        </div>
      </div>
    </div>
  );

  const sortedProjects = projects.sort(
    (a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0)
  );

  return (
    <section className="projects-five">
      <div className="container">
        <div className="projects-wrapper">
          {/* Colonne gauche (impairs) */}
          <div className="column left-column">
            {sortedProjects
              .filter((_, index) => index % 2 === 0)
              .map((project, index) => renderProject(project, index))}
          </div>

          {/* Colonne droite (pairs) */}
          <div className="column right-column">
            {sortedProjects
              .filter((_, index) => index % 2 !== 0)
              .map((project, index) => renderProject(project, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsFourth;