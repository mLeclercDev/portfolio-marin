import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const ProcessSteps = ({ 
  title = "Ma méthode de travail repose sur une approche structurée et collaborative. Chaque projet suit un processus pensé pour garantir qualité, performance et alignement avec vos objectifs.",
  steps = [
    { number: '01', label: 'Cadrage' },
    { number: '02', label: 'Développement' },
    { number: '03', label: 'Tests' },
    { number: '04', label: 'Livraison' }
  ]
}) => {
  const titleRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text animation for title
    const splitTitle = new SplitText(titleRef.current, { type: "lines", linesClass: "line-child" });
    
    // Wrap each line in a mask
    splitTitle.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.className = 'line-wrapper';
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // Set initial state
    gsap.set(splitTitle.lines, { y: "100%" });

    // Animate on scroll
    gsap.to(splitTitle.lines, {
      y: "0%",
      duration: 1,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
      }
    });

    // Animate steps
    const stepElements = stepsRef.current.querySelectorAll('.process-step');
    gsap.fromTo(stepElements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 75%",
        }
      }
    );

    return () => {
      splitTitle.revert();
    };
  }, []);

  return (
    <section className="process-steps">
      <div className="container">
        <div className="process-content">
          <p className="process-title" ref={titleRef}>
            {title}
          </p>
          
          <div className="steps-grid" ref={stepsRef}>
            {steps.map((step, index) => (
              <div key={step.number} className="process-step">
                <div className="step-number">{step.number}</div>
                {index < steps.length - 1 && <div className="step-arrow">→</div>}
                <div className="step-label">{step.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
