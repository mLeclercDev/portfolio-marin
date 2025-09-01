import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../utils/animations";
import gsap from "gsap";
import "../styles/components/projects-fourth.scss";

function formatToUrl(title) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

const ProjectsFourth = ({ projects }) => {
    const wrappersRef = useRef([]);
    const imagesRef = useRef([]);
    const titlesRef = useRef([]);
    const parallaxWrappersRef = useRef([]);
    const router = useRouter();
    const pathname = usePathname();
  
    const layersIn = (href) => {
      if (pathname !== href) {
        animatePageOut(href, router);
      }
    };

    const handleHover = (index, enter) => {
    const wrapper = wrappersRef.current[index];
    const img = imagesRef.current[index];
    if (!wrapper || !img) return;

    // Zoom de l'image seulement
    gsap.to(img, {
        scale: enter ? 1.1 : 1, // léger zoom
        duration: 0.4,
        ease: "power3.out",
    });

    // 2️⃣ Animation des autres wrappers (sauf celui survolé)
    wrappersRef.current.forEach((otherWrapper, i) => {
        if (i !== index && otherWrapper) {
        gsap.to(otherWrapper, {
            scale: enter ? 0.65 : 1, // léger dézoom
            opacity: enter ? 0 : 1, // léger dézoom
            duration: 0.5,
            ease: "power3.out",
        });
        }
    });

    const title = titlesRef.current[index];
    if (title) {
        gsap.to(title, {
        y: enter ? 0 : -76,
        duration: 0.5,
        ease: "cubic-bezier(0.4,0,0.2,1)",
        overwrite: "auto",
        onComplete: () => {
            if (!enter) {
            // fixe le transform final après le retour
            gsap.set(title, { y: 76 });
            }
        }
        });
    }
    };


  useEffect(() => {

    const parallaxValues = [-10, 10, -40, 50, -25]; // à adapter selon tes besoins
    // Parallax scroll
    parallaxWrappersRef.current.forEach((wrapper, index) => {
        if (!wrapper) return;

        const parallaxY = parallaxValues[index % parallaxValues.length]; // boucle sur le tableau

        gsap.to(wrapper, {
        y: parallaxY, // parallax opposé selon index
        ease: "none",
        scrollTrigger: {
            trigger: ".projects-fourth",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false
        },
        });
    });
    
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth - 0.5) * 2; // -1 à 1
      const mouseY = (e.clientY / innerHeight - 0.5) * 2;

      wrappersRef.current.forEach((wrapper, index) => {
        if (!wrapper) return;
        const delay = 0.15 + index * 0.03; // latence différente
        const moveX = mouseX * (15 + index * 5); // variation de l’amplitude
        const moveY = mouseY * (15 + index * 5);

        // Carte principale
        gsap.to(wrapper, {
          x: moveX,
          y: moveY,
          duration: 0.4,
          ease: "power3.out",
          delay,
        });

        // Image en sens inverse
        const img = imagesRef.current[index];
        if (img) {
          gsap.to(img, {
            x: -moveX * 2,
            y: -moveY * 2,
            duration: 0.8,
            ease: "power3.out",
            delay,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="projects-fourth">
    {projects
        .sort((a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0))
        .map((project, index) => (
        <div
            key={index}
            className="project-parallax-wrapper" // <-- nouveau conteneur pour le scroll
            ref={(el) => (parallaxWrappersRef.current[index] = el)}
        >
            <div
            ref={(el) => (wrappersRef.current[index] = el)}
            className={`project-media-wrapper cs-scale ${project.fields.textColor}`}
            data-index={index}
            onClick={() => layersIn(`/${formatToUrl(project.fields.title)}`)}
            onMouseEnter={() => handleHover(index, true)}
            onMouseLeave={() => handleHover(index, false)}
            >
            <div
                ref={(el) => (imagesRef.current[index] = el)}
                className="image-wrapper"
            >
                <Image
                className="fit-cover"
                src={`https:${project.fields.featuredImageHomepage.fields.file.url}`}
                alt={project.fields.title}
                fill
                quality={80}
                />
            </div>
            </div>
        </div>
        ))}
    <div className="titles-projects">
        {projects.map((project, index) => (
        <span
            key={index}
            ref={(el) => (titlesRef.current[index] = el)}
            data-index={index}
        >
            {project.fields.title}
        </span>
        ))}
    </div>
    </section>
  );
};

export default ProjectsFourth;
