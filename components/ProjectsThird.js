import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../utils/animations";
import gsap from "gsap";
import "../styles/components/projects-third.scss";

function formatToUrl(title) {
  let url = title.toLowerCase().replace(/\s+/g, "-");
  url = url.replace(/[^\w-]+/g, "");
  return url;
}

const ProjectsThird = ({ projects }) => {
  const router = useRouter();
  const pathname = usePathname();

  const layersIn = (href) => {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Position initiale : tous les spans hors de vue
      gsap.set(".title-project span, .descriptions span, .year span", { yPercent: 100 });

      // Sélectionne chaque wrapper de projet
      document.querySelectorAll(".project-media-wrapper").forEach((wrapper) => {
        const spans = wrapper.querySelectorAll(".title-project span, .descriptions span, .year span");
        const cross = wrapper.querySelectorAll(".cross-inner");

        let hoverTl = gsap.timeline({ paused: true })
          .to(spans, {
            yPercent: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.05
          })

        wrapper.addEventListener("mouseenter", () => hoverTl.play());
        wrapper.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    });

    return () => ctx.revert(); // cleanup GSAP
  }, []);

  const sortedProjects = [...projects].sort((a, b) => {
    const orderA = a.fields.order ?? 0;
    const orderB = b.fields.order ?? 0;
    return orderA - orderB;
  });

  return (
    <section className="projects-third">
      <div className="container">
        <div className="grid-images">
          {sortedProjects.map((project, index) => (
            <div className="grid-item" key={index}>
              <div
                className={`project-media-wrapper cs-scale ${project.fields.textColor}`}
                data-index={index + 1}
                onClick={() => layersIn(`/${formatToUrl(project.fields.title)}`)}
              >
                <div className="informations">
                  <div className="flex-wrapper">
                    <div className='title-project'>
                      <div className="o-hidden">
                        <span>{project.fields.title} - Portfolio</span>
                      </div>
                    </div>
                    <div className='descriptions'>
                      <div className="o-hidden">
                        <span>Development</span>
                      </div>
                      <div className="o-hidden">
                        <span>Design</span>
                      </div>
                    </div>
                  </div>
                  <div className="year">
                    <div className="o-hidden">
                        <span>2025</span>
                    </div>
                  </div>
                </div>
{/*                 <img
                  className="fit-cover"
                  src={`https:${project.fields.featuredImageHomepage.fields.file.url}`}
                  alt="Mon image"
                  width={1150}
                  height={520}
                /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsThird;
