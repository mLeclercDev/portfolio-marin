import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../utils/animations";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/components/projects-five.scss";

gsap.registerPlugin(ScrollTrigger);

function formatToUrl(title) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

const ProjectsFourth = ({ projects }) => {
  const wrappersRef = useRef([]);
  const router = useRouter();
  const pathname = usePathname();

  CustomEase.create(
    "hyperBounce",
    "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
  );

  const layersIn = (href) => {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    wrappersRef.current.forEach((wrapper, index) => {
      if (!wrapper) return;

      const img = wrapper.querySelector("img");
      if (!img) return;

      const yValues = [-40, -30, -35, -40]; // tes valeurs Y différentes

      gsap.to(img, {
        y: yValues[index % yValues.length], // <- ici index est défini
        ease: "hyperBounce",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: false,
        },
      });
    });


  }, [projects]);

  // index global pour toutes les images (colonnes gauche/droite)
  let globalIndex = 0;

  const renderProject = (project) => {
    const currentIndex = globalIndex;
    globalIndex++;

    return (
      <div key={project.sys.id} className="project-wrapper">
        <div
          ref={(el) => (wrappersRef.current[currentIndex] = el)}
          className={`project-media-wrapper cs-scale ${project.fields.textColor}`}
          onClick={() => layersIn(`/${formatToUrl(project.fields.title)}`)}
        >
          <div className="image-wrapper">
            <div className="image-inner">
              <Image
                src={`https:${project.fields.featuredImageHomepage.fields.file.url}`}
                alt={project.fields.title}
                fill
                quality={80}
              />
            </div>
          </div>
          <div className="project-information">
            {project.fields.title} • {project.fields.description}
          </div>
        </div>
      </div>
    );
  };

  const sortedProjects = projects.sort(
    (a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0)
  );

  // Séparer pour colonnes mais garder refs globales
  const leftColumnProjects = sortedProjects.filter((_, i) => i % 2 === 0);
  const rightColumnProjects = sortedProjects.filter((_, i) => i % 2 !== 0);

  return (
    <section className="projects-five">
      <div className="container">
        <div className="projects-wrapper">
          <div className="column left-column">
            {leftColumnProjects.map((project) => renderProject(project))}
          </div>
          <div className="column right-column">
            {rightColumnProjects.map((project) => renderProject(project))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsFourth;
