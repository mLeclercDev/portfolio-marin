import React, { useEffect, useRef } from 'react';
import { SplitText } from 'gsap/dist/SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, SplitText);

const FAQ = ({
  title = "Des questions ?",
  description = "Cette section répond aux questions les plus fréquentes sur ma façon de travailler, le cadre de collaboration et l'intégration front-end pour agences et designers.",
  faqData = [
    { number: '01', question: 'Travaillez-vous uniquement avec des agences et des designers ?', answer: 'Non, bien que je collabore souvent avec des agences et des designers pour l\'intégration technique, j\'accompagne aussi des clients directs (entreprises, startups, freelances) sur la création complète de leur site web.' },
    { number: '02', question: 'Acceptez-vous les projets sans maquettes ?', answer: 'Oui, comme expliqué dans la section ci-dessus, je peux vous accompagner même si vous n\'avez pas de maquettes. Je travaille avec un réseau de designers partenaires pour créer une interface qui vous ressemble avant de passer au développement.' },
    { number: '03', question: 'Pouvez-vous intervenir uniquement sur l’intégration front-end ?', answer: 'Absolument. Si vous avez déjà un back-end ou une équipe de développement, je peux intervenir exclusivement sur la partie front-end (HTML/CSS/JS, React/Next.js) pour garantir une intégration pixel-perfect et des animations fluides.' },
    { number: '04', question: 'Respectez-vous strictement les maquettes ?', answer: 'C\'est ma spécialité. Je prête une attention particulière aux détails : espacements, typographies, micro-interactions. L\'objectif est que le site final soit identique à la vision du designer.' },
    { number: '05', question: 'Comment se passent les échanges pendant le projet ?', answer: 'La communication est fluide et régulière. J\'utilise des outils comme Slack, Google Meet ou Notion pour vous tenir informé de l\'avancement, recueillir vos retours et valider chaque étape.' },
    { number: '06', question: 'Travaillez-vous en autonomie ou en lien avec un chef de projet ?', answer: 'Les deux. Je suis habitué à gérer des projets de A à Z en autonomie, mais je m\'intègre aussi très facilement dans des équipes existantes sous la direction d\'un chef de projet ou d\'un product owner.' },
    { number: '07', question: 'Êtes-vous disponible pour des collaborations récurrentes ?', answer: 'Oui, j\'aime établir des relations de confiance sur le long terme avec mes partenaires. Beaucoup de mes clients sont des agences avec qui je travaille sur plusieurs projets par an.' },
    { number: '08', question: 'Comment démarrer une collaboration ?', answer: 'C\'est simple : envoyez-moi un message via le formulaire de contact ou par email. On organise un court appel pour discuter de votre projet, de vos besoins et voir comment je peux vous aider au mieux.' }
  ]
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const faqItems = containerRef.current.querySelectorAll('.faq-item');
    const splits = [];
    
    // Initialisation des splits avec mask
    faqItems.forEach(item => {
        const answerText = item.querySelector('.answer-text');
        if(answerText) {
             const split = new SplitText(answerText, { type: "lines", linesClass: "line-child" });
             splits.push(split);
             
             // Wrap chaque ligne dans un masque overflow hidden
             split.lines.forEach(line => {
                 const wrapper = document.createElement('div');
                 wrapper.style.overflow = 'hidden';
                 wrapper.style.display = 'block';
                 line.parentNode.insertBefore(wrapper, line);
                 wrapper.appendChild(line);
             });

             // Etat initial : caché en bas
             gsap.set(split.lines, { y: "100%", opacity: 1 }); // opacity 1 car caché par masque
        }
    });

    const handleFaqClick = (e) => {
      const header = e.currentTarget;
      const item = header.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const inner = item.querySelector('.faq-content-inner');
      
      const isActive = item.classList.contains('active');
      const lines = item.querySelectorAll('.line-child');

      // Fermer tous les autres
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherLines = otherItem.querySelectorAll('.line-child');
          
          // Animation de fermeture (retour vers le bas)
          gsap.to(otherLines, {
              y: "100%",
              duration: 0.6,
              ease: "power2.in",
              stagger: 0.02
          });

          gsap.to(otherContent, {
            height: 0,
            duration: 0.9,
            ease: "power3.inOut"
          });
        }
      });

      // Basculer l'état actuel
      if (isActive) {
        item.classList.remove('active');
        
        gsap.to(lines, {
          y: "100%",
          duration: 0.6,
          ease: "power2.in",
          stagger: 0.02
        });

        gsap.to(content, {
          height: 0,
          duration: 0.9,
          ease: "power3.inOut"
        });
      } else {
        item.classList.add('active');
        gsap.to(content, {
          height: inner.offsetHeight,
          duration: 0.9,
          ease: "power3.out"
        });
        
        // Animation d'apparition (Reveal du bas vers le haut)
        gsap.fromTo(lines, 
          { y: "100%" },
          { 
            y: "0%", 
            duration: 1, 
            delay: 0.1, 
            ease: "power3.out", // Plus smooth pour un reveal
            stagger: 0.07
          }
        );
      }
    };

    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      header.addEventListener('click', handleFaqClick);
    });

    const crossWrappers = containerRef.current.querySelectorAll('.cross-wrapper');
    const cursorPresentation = document.querySelector('.cursor-presentation');

    const handleCrossWrapperHover = (e) => {
      const target = e.target.closest('.cross-wrapper');
      if (!target) return;

      const parentItem = target.closest('.item');
      if (parentItem && parentItem.classList.contains('active')) return;

      const cross = target.querySelector(".cross");
      if (!cross) return;

      const { offsetX, offsetY } = e;
      const { offsetWidth, offsetHeight } = target;

      const move = 25,
        xMove = offsetX / offsetWidth * (move * 2) - move,
        yMove = offsetY / offsetHeight * (move * 2) - move;

      cross.style.transform = `translate(${xMove}px, ${yMove}px)`;

      if (e.type === 'mouseleave') {
        cross.style.transform = 'translate(0px, 0px)';
        if (cursorPresentation) cursorPresentation.classList.remove('hovering-cross-wrapper');
      } else {
        if (cursorPresentation) cursorPresentation.classList.add('hovering-cross-wrapper');
      }
    };

    const handleMouseLeave = (e) => {
      if (!e.target.closest('.cross-wrapper')) {
        if (cursorPresentation) cursorPresentation.classList.remove('hovering-cross-wrapper');
      }
    };

    crossWrappers.forEach(wrapper => {
      wrapper.addEventListener('mousemove', handleCrossWrapperHover);
      wrapper.addEventListener('mouseleave', handleCrossWrapperHover);
    });
    
    if (cursorPresentation) {
        document.addEventListener('mousemove', handleMouseLeave);
    }

    return () => {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            header.removeEventListener('click', handleFaqClick);
        });
        splits.forEach(s => s.revert());
        
        crossWrappers.forEach(wrapper => {
          wrapper.removeEventListener('mousemove', handleCrossWrapperHover);
          wrapper.removeEventListener('mouseleave', handleCrossWrapperHover);
        });
        if (cursorPresentation) {
             document.removeEventListener('mousemove', handleMouseLeave);
        }
    };
  }, []);

  return (
    <section className="faq" ref={containerRef}>
      <div className="container">
        <div className="faq-top">
          <div className="faq-title">
            <h2>{title}</h2>
          </div>
          <div className="faq-intro">
            <p>{description}</p>
          </div>
        </div>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-header hover-this">
                <div className="faq-number">{item.number}</div>
                <div className="faq-question">
                  <h3>{item.question}</h3>
                </div>
                    <div className='cross-wrapper'>
                        <div className='cross'>
                            <div className='cross-inner'>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
              </div>
              <div className="faq-content">
                <div className="faq-content-inner">
                    <div className="answer-text">
                        {item.answer}
                    </div>
                </div>
              </div>
              <span className="faq-line"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
