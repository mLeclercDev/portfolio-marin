import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GrowthStats = ({
  introText = "Quelques chiffres clés",
  stats = [
    { label: 'Projets<br/>livrés', value: '15', unit: '+' },
    { label: 'Années<br/>d\'expérience', value: '6', unit: '+' },
    { label: 'Clients<br/>accompagnés', value: '10', unit: '+' },
    { label: 'Collaborations<br/>agences', value: '5', unit: '+' }
  ]
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const growthSection = sectionRef.current;
    const growthIntro = growthSection.querySelector('.growth-intro p');
    const growthItems = growthSection.querySelectorAll('.growth-item');

    // Animate intro text
    if (growthIntro) {
      gsap.fromTo(growthIntro,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: growthSection,
            start: "top 75%",
          }
        }
      );
    }

    // Animate growth items
    if (growthItems.length > 0) {
      growthItems.forEach((item) => {
        const label = item.querySelector('.growth-label');
        const value = item.querySelector('.growth-value');

        if (label) {
          gsap.fromTo(label,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              }
            }
          );
        }

        if (value) {
          gsap.fromTo(value,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
              }
            }
          );
        }
      });
    }
  }, []);

  return (
    <section className="growth-stats" ref={sectionRef}>
      <div className="container">
        <div className="growth-intro">
          <p>{introText}</p>
        </div>
        
        <div className="growth-grid">
          {stats.map((stat, index) => (
            <div key={index} className="growth-item">
              <div 
                className="growth-label" 
                dangerouslySetInnerHTML={{ __html: stat.label }}
              />
              <div className="growth-value">
                {stat.value}
                {stat.unit && <span className="unit">{stat.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthStats;
