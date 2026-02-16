import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import MagneticCTA from './global/MagneticCTA';

gsap.registerPlugin(ScrollTrigger, SplitText);

const DedicatedPartner = ({
  title = "Votre partenaire technique pour développer, optimiser et faire évoluer vos projets web.",
  description = "J'accompagne entreprises, indépendants et agences dans la mise en place de solutions web fiables et performantes. Du développement sur mesure à l'optimisation technique, j'interviens avec méthode et exigence pour garantir des bases solides, une expérience fluide et des résultats durables. Chaque collaboration est pensée sur le long terme, avec clarté et efficacité.",
  ctaText = "Prendre contact",
  ctaHref = "mailto:contact@marinleclerc.dev",
  stats = [
    { value: '15+', label: 'Projets réalisés' },
    { value: '10+', label: 'Clients accompagnés' },
    { value: '6+', label: 'Années d\'expérience' },
    { value: '5+', label: 'Collaborations agences' }
  ]
}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      const partnerSection = sectionRef.current;
      const partnerTitle = titleRef.current;
      const partnerText = partnerSection.querySelector('.partner-content p');
      const partnerCTA = partnerSection.querySelector('.partner-content .cta-button');
      const statItems = partnerSection.querySelectorAll('.stat-item');
      const separator = partnerSection.querySelector('.partner-separator');

      // Animate partner title
      if (partnerTitle) {
        const splitPartnerTitle = new SplitText(partnerTitle, { type: "lines", linesClass: "line-child" });
        splitPartnerTitle.lines.forEach(line => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          wrapper.style.display = 'block';
          line.parentNode.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
        gsap.set(splitPartnerTitle.lines, { y: "100%" });

        gsap.to(splitPartnerTitle.lines, {
          y: "0%",
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: partnerSection,
            start: "top 75%",
          }
        });
      }

      // Animate partner text
      if (partnerText) {
        gsap.fromTo(partnerText,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: partnerSection, start: "top 70%" } }
        );
      }

      // Animate CTA
      if (partnerCTA) {
        gsap.fromTo(partnerCTA,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "hyperBounce", scrollTrigger: { trigger: partnerSection, start: "top 65%" } }
        );
      }

      // Animate stats - Masked Reveal
      if (statItems.length > 0) {
        // Prepare elements for masked animation
        const animElements = [];
        
        statItems.forEach(item => {
           const val = item.querySelector('.stat-value');
           const lab = item.querySelector('.stat-label');
           
           [val, lab].forEach(el => {
             if(el) {
                // Wrap content in a div for sliding up
                const content = el.innerText;
                el.innerText = '';
                el.style.overflow = 'hidden';
                el.style.display = 'block'; // Ensure block for transform
                
                const wrapper = document.createElement('div');
                wrapper.textContent = content;
                wrapper.style.display = 'block';
                wrapper.style.transform = 'translateY(100%)'; // Initial state
                
                el.appendChild(wrapper);
                animElements.push(wrapper);
             }
           });
        });

        gsap.to(animElements, {
          y: "0%",
          duration: 1,
          stagger: 0.05, // Slight stagger for ripple effect
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.partner-stats',
            start: "top 80%",
          }
        });
      }

      // Animate Separator Line shrinking
      if (separator) {
        // Ensure full width initially
        gsap.set(separator, { scaleX: 1, transformOrigin: "right center" });
        
        gsap.to(separator, {
          scaleX: 0.85, 
          ease: "none",
          scrollTrigger: {
            trigger: separator,
            start: "top 25%", // Start when near top
            end: "top -5%", // End when leaving
            scrub: true
            // markers removed
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="dedicated-partner" ref={sectionRef}>
      <div className="container">
        <div className="dedicated-partner-inner">
          <div className="partner-top">
            <div className="partner-heading">
              <h2 ref={titleRef}>{title}</h2>
            </div>
            <div className="partner-content">
              <p>{description}</p>
              <MagneticCTA 
                text={ctaText}
                href={ctaHref} 
                className="cta-button"
                style={{ transition: 'transform 0.1s linear' }}
              />
            </div>
          </div>
          
          <div className="partner-separator"></div>
          <div className="partner-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DedicatedPartner;
