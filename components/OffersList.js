import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const OffersList = ({
  offers = [
    {
      id: 'vitrine',
      number: '01',
      title: 'Site vitrine',
      subtitle: 'engageant',
      description: 'Je crée des sites web sur mesure, conçus pour captiver vos visiteurs et refléter l\'identité de votre marque. Architecture claire, intégration soignée et bases techniques solides pour un site fiable et durable.',
      link: '#benefits'
    },
    {
      id: 'e-commerce',
      number: '02',
      title: 'E-commerce',
      subtitle: 'performant',
      description: 'Je crée des boutiques en ligne performantes et optimisées pour la conversion. Architecture claire, intégration propre et bases techniques solides pour un site fiable et durable.',
      link: '#benefits'
    },
    {
      id: 'audit',
      number: '03',
      title: 'Audit',
      subtitle: '& optimisation',
      description: 'Je réalise des audits complets de votre site web pour identifier les points d\'amélioration techniques, de performance et d\'expérience utilisateur. Recommandations concrètes et plan d\'action adapté.',
      link: '#benefits'
    }
  ],
  startAnimation = true
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !startAnimation) return;

    let ctx = gsap.context(() => {
      // Animate line and then content for each item
      const items = containerRef.current.querySelectorAll('.offer-item-wrap');
      const finalLine = containerRef.current.querySelector('.horizontal-line:last-child');

      items.forEach((wrap, i) => {
        const line = wrap.previousElementSibling;
        const item = wrap.querySelector('.offer-item');
        
        // Elements
        const number = item.querySelector('.offer-number');
        // Hide immediately to prevent FOUC / flash of un-masked content
        gsap.set(number, { autoAlpha: 0 });

        const titleParts = item.querySelectorAll('.offer-title .mask-block .anim-content');
        const descriptionWrapper = item.querySelector('.offer-description');
        const description = descriptionWrapper ? descriptionWrapper.querySelector('p') : null;

        // Split Number (Chars)
        const splitNumber = new SplitText(number, { type: "chars", charsClass: "num-char" });
        // Wrap each char in a mask
        splitNumber.chars.forEach(char => {
             const wrapper = document.createElement('span');
             wrapper.style.overflow = 'hidden';
             wrapper.style.display = 'inline-block';
             wrapper.style.verticalAlign = 'bottom'; // Align properly
             char.parentNode.insertBefore(wrapper, char);
             wrapper.appendChild(char);
        });
        
        gsap.set(splitNumber.chars, { y: "100%" }); // Initial state
        // Reveal container now that chars are hidden
        gsap.set(number, { autoAlpha: 1 });

        // Split Description (Lines)
        let splitDesc;
        let descLines = [];
        if (description) {
           splitDesc = new SplitText(description, { type: "lines" });
           // Wrap lines for mask effect
           splitDesc.lines.forEach(line => {
               const wrapper = document.createElement('div');
               wrapper.style.overflow = 'hidden';
               wrapper.style.display = 'block';
               line.parentNode.insertBefore(wrapper, line);
               wrapper.appendChild(line);
               descLines.push(line);
           });
           
           // Ensure container and wrapper are visible now that content is prepared and lines are hidden
           if (descriptionWrapper) gsap.set(descriptionWrapper, { autoAlpha: 1 });
           gsap.set(descLines, { y: "100%" }); // Initial state
        }
        
        // Initial state for title parts (already masked by JSX structure)
        if (titleParts.length > 0) {
            gsap.set(titleParts, { y: "100%" });
        }

        // Line animation with scrub - Shows only the last 15% of fill (85% to 100%)
        if (line && line.classList.contains('horizontal-line')) {
           gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
           
           gsap.to(line, {
             scaleX: 1,
             ease: "none",
             scrollTrigger: {
               trigger: line,
               start: "top bottom+=300%", // Commence bien avant (trait déjà à ~85% quand visible)
               end: "top 60%", // Finit quand le trait atteint 60% du viewport
               scrub: true
             }
           });
        }

        // Content animations - triggered once
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Staggered Animations
        // 1. Number Chars - Smoother but faster
        if (splitNumber.chars.length > 0) {
             tl.to(splitNumber.chars, {
                 y: "0%",
                 duration: 1.1, 
                 stagger: 0.1, 
                 ease: "power2.out"
             }, "0");
        }

        // 2. Title Parts - Overlapping with numbers
        if (titleParts.length > 0) {
            tl.to(titleParts, {
                y: "0%",
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            }, "-=1.0"); // Start while numbers are animating
        }

        // 3. Description Lines - Overlapping with title
        if (descLines.length > 0) {
            tl.to(descLines, {
                y: "0%",
                duration: 1,
                stagger: 0.05,
                ease: "power3.out"
            }, "-=0.9"); // Start while title is animating
        }
      });

      // Animate final line with scrub - Shows only the last 15% of fill (85% to 100%)
      if (finalLine) {
         gsap.set(finalLine, { scaleX: 0, transformOrigin: "left center", opacity: 0.2 });
         
         gsap.to(finalLine, {
           scaleX: 1,
           ease: "none",
           scrollTrigger: {
             trigger: finalLine,
             start: "top bottom+=300%", // Commence bien avant (trait déjà à ~85% quand visible)
             end: "top 60%", // Finit quand le trait atteint 60% du viewport
             scrub: true
           }
         });
      }

    }, containerRef);
    
    // Force refresh
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [offers, startAnimation]);

  return (
    <section className="services-list-section" ref={containerRef}>
      <div className="container">
        <div className="offers-list">
          {offers.map((offer, index) => (
            <React.Fragment key={offer.id}>
              {index > 0 && <div className="horizontal-line"></div>}
              <div className="offer-item-wrap">
                <div className="offer-item hover-this">
                  <span className="offer-number">{offer.number}</span>
                  <div className="offer-title">
                    <h2>
                      <span className="mask-block"><span className="anim-content">{offer.title}</span></span>
                      <span className="mask-block"><span className="anim-content">{offer.subtitle}</span></span>
                    </h2>
                  </div>
                  <div className="offer-right">
                    <div className='offer-description'>
                      <p>{offer.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
          <div className="horizontal-line"></div>
        </div>
      </div>
    </section>
  );
};

export default OffersList;
