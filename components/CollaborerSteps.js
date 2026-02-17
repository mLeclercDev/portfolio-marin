import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const CollaborerSteps = ({ 
  steps = [
    {
      number: '01',
      title: 'Cadrage',
      description: 'Chaque projet commence par un brief précis. Maquettes, périmètre fonctionnel, contraintes techniques ou SEO, délais : tout est posé dès le départ. Je privilégie les projets où les objectifs et le périmètre sont clairs dès le départ, afin d’éviter les flous et les ajustements inutiles en cours de route.'
    },
    {
      number: '02',
      title: 'Organisation',
      description: 'Une fois le périmètre validé, j’estime le temps et le budget de manière réaliste, puis je planifie les différentes étapes du projet. Des points de validation sont définis en amont afin d’assurer un suivi fluide, limiter les allers-retours inutiles et éviter toute mauvaise surprise.'
    },
    {
      number: '03',
      title: 'Intégration',
      description: 'J’intègre des interfaces sur WordPress, Webflow et HubSpot, avec une exigence constante de qualité. Le design est respecté à la lettre, le code est propre, maintenable et performant. J’anticipe les contraintes techniques et signale les incohérences pour garantir un rendu fiable et une vraie autonomie après livraison.'
    },
    {
      number: '04',
      title: 'Validation',
      description: 'Avant la mise en ligne, le site fait l’objet d’une revue complète. Les ajustements sont ciblés et pertinents : pas de retouches sans fin, uniquement des améliorations qui ont un réel impact sur la qualité globale et l’expérience utilisateur.'
    },
    {
      number: '05',
      title: 'Suivi',
      description: 'Selon les besoins, je peux assurer un accompagnement après la livraison : corrections mineures, support technique ponctuel ou conseils pour la suite du projet. L’objectif est de vous laisser avec une base solide et durable.'
    }
  ]
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
        const stepElements = containerRef.current.querySelectorAll('.collaborer-step');

        stepElements.forEach((step, index) => {
            // Safety: Ensure parent step is visible (in case of legacy styles)
            gsap.set(step, { opacity: 1, y: 0, visibility: "visible" });

            const number = step.querySelector('.step-number');
            const title = step.querySelector('.step-title');
            const description = step.querySelector('.step-description');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: step,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

            // 4. Border Scrub Animation
            const border = step.querySelector('.step-line');
            if(border) {
                 gsap.fromTo(border, 
                    { scaleX: 1 },
                    { 
                        scaleX: 0.85, 
                        ease: "none",
                        transformOrigin: "right center", // Shrink from left visually (scale down towards right or left?)
                        // If transformOrigin is "right center", it scales towards the right, so the left side shrinks away. That's usually what "disappearing line" implies if consistent with DedicatedPartner.
                        scrollTrigger: {
                            trigger: step,
                            start: "top 20%",
                            end: "bottom top", 
                            scrub: true
                        }
                    }
                 );
            }

            // 1. Number Reveal
            if(number) {
                 // Init state explicit
                 gsap.set(number, { opacity: 0, x: -20 });
                 tl.to(number, { opacity: 0.5, x: 0, duration: 1, ease: "power3.out" });
            }

            // 2. Title Reveal (SplitText)
            if(title) {
                const split = new SplitText(title, { type: "lines", linesClass: "line-child" });
                
                // Wrap hidden
                split.lines.forEach(line => {
                    const w = document.createElement('div');
                    w.style.overflow = 'hidden';
                    w.style.display = 'block';
                    line.parentNode.insertBefore(w, line);
                    w.appendChild(line);
                });

                // Init split lines
                gsap.set(split.lines, { y: "100%" });

                tl.to(split.lines, 
                    { y: "0%", duration: 1, stagger: 0.1, ease: "power3.out" },
                    "<" // Sync with previous
                );
            }

            // 3. Description Reveal (SplitText)
            if(description) {
                const splitDesc = new SplitText(description, { type: "lines", linesClass: "line-child" });
                
                // Wrap hidden
                splitDesc.lines.forEach(line => {
                    const w = document.createElement('div');
                    w.style.overflow = 'hidden';
                    w.style.display = 'block';
                    line.parentNode.insertBefore(w, line);
                    w.appendChild(line);
                });

                // Init split lines
                gsap.set(splitDesc.lines, { y: "100%" });
                
                // Ensure parent is visible (if previously hidden)
                gsap.set(description, { opacity: 1 });

                tl.to(splitDesc.lines,
                    { y: "0%", duration: 1, stagger: 0.05, ease: "power3.out" },
                    "-=0.6"
                );
            }
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="collaborer-steps" ref={containerRef}>
      <div className="container">
        {steps.map((step, index) => (
          <div key={index} className="collaborer-step">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h2 className="step-title">{step.title}</h2>
              <p className="step-description">{step.description}</p>
            </div>
            <div className="step-line"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollaborerSteps;
