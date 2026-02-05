import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import { SplitText } from "gsap/dist/SplitText";
import MagneticCTA from '../components/global/MagneticCTA';
import Layer from '../components/global/Layer';
import Footer from '../components/global/Footer';
import '../styles/globals.scss';
import '../styles/components/collaborer.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

export default function Collaborer() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.set(".layers__items", { className: "layers__items out" });
  }, [router.asPath]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP : Animation complexe avec PIN
      mm.add("(min-width: 769px)", () => {
         // 1. Parallax d'approche (avant le pin)
         gsap.fromTo(".collaborer-full-image img", 
            { y: "-15%" }, 
            { 
              y: "0%",
              ease: "none",
              scrollTrigger: {
                trigger: ".collaborer-full-image",
                start: "top bottom",
                end: "top top",
                scrub: true
              }
            }
        );

        // 2. Pin + Scale Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".collaborer-full-image",
            start: "top top",
            end: "+=100%", 
            pin: true,
            scrub: 0.8
          }
        });

        tl.fromTo(".collaborer-full-image img", 
          { scale: 1.2 }, 
          { scale: 1, ease: "none" }
        )
        .to(".collaborer-full-image .overlay", {
            opacity: 0.3, 
            ease: "none"
        }, "<");
      });

      // MOBILE : Simple Parallax sans Pin
      mm.add("(max-width: 768px)", () => {
         // On s'assure que l'image a un scale de base suffisant pour le parallax si besoin, 
         // ou on utilise juste le translateY.
         // CSS a déjà transform: scale(1.2) par défaut.
         
         gsap.to(".collaborer-full-image img", {
            y: "20%", // Effet parallax simple vers le bas
            ease: "none",
            scrollTrigger: {
              trigger: ".collaborer-full-image",
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
         });
         
         // On reset l'overlay ou on l'anime légèrement si voulu, ici on le laisse transparent par défaut
         gsap.set(".collaborer-full-image .overlay", { opacity: 0 });
      });

    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const mainElement = document.querySelector("main");
    // Créer le trigger pour la section avec la classe "tools"
    ScrollTrigger.create({
        trigger: ".design",
        start: "top center", // Démarrer le trigger quand le haut de la section atteint le centre de la fenêtre
        end: "bottom center", // Arrêter le trigger quand le bas de la section atteint le centre de la fenêtre
        markers: false,
        onEnter: () => {
            gsap.to(mainElement, { backgroundColor: "#110F09", duration: 0.55, ease: "hyperBounce" });
        },
/*      onLeave: () => mainElement.classList.remove("tools-active"),
        onEnterBack: () => mainElement.classList.add("tools-active"), */
        onLeaveBack: () => {
            gsap.to(mainElement, { backgroundColor: "#FCFBF6", duration: 0.55, ease: "hyperBounce" });
        },
    });
  })

  useEffect(() => {
    // Animation d'entrée pour le hero
    const tl = gsap.timeline({ delay: 0.1 });
    
    // Animation des mots du h1 (comme sur les pages projets)
    const wordSpans = document.querySelectorAll('.collaborer-hero h1 .word-wrapper span');
    gsap.set(wordSpans, { y: '100%' });
    
    // Split du sous-titre
    const subtitle = document.querySelector('.collaborer-hero .collaborer-subtitle');
    let splitSubtitle;
    
    if (subtitle) {
        splitSubtitle = new SplitText(subtitle, { type: "lines", linesClass: "line-child" });
        // Wrap mask
        splitSubtitle.lines.forEach(line => {
             const wrapper = document.createElement('div');
             wrapper.style.overflow = 'hidden';
             wrapper.style.display = 'block';
             line.parentNode.insertBefore(wrapper, line);
             wrapper.appendChild(line);
        });
        gsap.set(splitSubtitle.lines, { y: "100%" });
    }

    tl.to(wordSpans, {
      y: '0%',
      stagger: 0.075,
      duration: 1,
      ease: 'power3.out',
      force3D: true
    })
    .to(splitSubtitle ? splitSubtitle.lines : '.collaborer-hero p', {
      y: "0%",
      duration: 0.9, // Plus lent
      stagger: 0.08,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.collaborer-step', {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'hyperBounce'
    }, '-=0.5');

    return () => {
        if (splitSubtitle) splitSubtitle.revert();
    };
  }, []);

  const steps = [
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
  ];

  useEffect(() => {
    const faqItems = document.querySelectorAll('.faq-item');
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

    return () => {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            header.removeEventListener('click', handleFaqClick);
        });
        splits.forEach(s => s.revert());
    };
  }, []);

  useEffect(() => {
    const crossWrappers = document.querySelectorAll('.cross-wrapper');
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

    document.addEventListener('mousemove', handleMouseLeave);

    return () => {
      crossWrappers.forEach(wrapper => {
        wrapper.removeEventListener('mousemove', handleCrossWrapperHover);
        wrapper.removeEventListener('mouseleave', handleCrossWrapperHover);
      });
      document.removeEventListener('mousemove', handleMouseLeave);
    };
  }, []);

  const faqData = [
    {
      number: '01',
      question: 'Travaillez-vous uniquement avec des agences et des designers ?',
      answer: 'Non, bien que je collabore souvent avec des agences et des designers pour l\'intégration technique, j\'accompagne aussi des clients directs (entreprises, startups, freelances) sur la création complète de leur site web.'
    },
    {
      number: '02',
      question: 'Acceptez-vous les projets sans maquettes ?',
      answer: 'Oui, comme expliqué dans la section ci-dessus, je peux vous accompagner même si vous n\'avez pas de maquettes. Je travaille avec un réseau de designers partenaires pour créer une interface qui vous ressemble avant de passer au développement.'
    },
    {
      number: '03',
      question: 'Pouvez-vous intervenir uniquement sur l’intégration front-end ?',
      answer: 'Absolument. Si vous avez déjà un back-end ou une équipe de développement, je peux intervenir exclusivement sur la partie front-end (HTML/CSS/JS, React/Next.js) pour garantir une intégration pixel-perfect et des animations fluides.'
    },
    {
      number: '04',
      question: 'Respectez-vous strictement les maquettes ?',
      answer: 'C\'est ma spécialité. Je prête une attention particulière aux détails : espacements, typographies, micro-interactions. L\'objectif est que le site final soit identique à la vision du designer.'
    },
    {
      number: '05',
      question: 'Comment se passent les échanges pendant le projet ?',
      answer: 'La communication est fluide et régulière. J\'utilise des outils comme Slack, Google Meet ou Notion pour vous tenir informé de l\'avancement, recueillir vos retours et valider chaque étape.'
    },
    {
      number: '06',
      question: 'Travaillez-vous en autonomie ou en lien avec un chef de projet ?',
      answer: 'Les deux. Je suis habitué à gérer des projets de A à Z en autonomie, mais je m\'intègre aussi très facilement dans des équipes existantes sous la direction d\'un chef de projet ou d\'un product owner.'
    },
    {
      number: '07',
      question: 'Êtes-vous disponible pour des collaborations récurrentes ?',
      answer: 'Oui, j\'aime établir des relations de confiance sur le long terme avec mes partenaires. Beaucoup de mes clients sont des agences avec qui je travaille sur plusieurs projets par an.'
    },
    {
      number: '08',
      question: 'Comment démarrer une collaboration ?',
      answer: 'C\'est simple : envoyez-moi un message via le formulaire de contact ou par email. On organise un court appel pour discuter de votre projet, de vos besoins et voir comment je peux vous aider au mieux.'
    }
  ];

  return (
    <>
      <Head>
        <title>Collaborer – Marin Leclerc</title>
        <meta name="description" content="Découvrez ma méthodologie de travail en 5 étapes pour créer des sites web performants et sur mesure. De la découverte au lancement, je vous accompagne à chaque étape." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5ff730a5-9ee9-49bb-a24e-5773e82d776a"></script>

        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main className="collaborer-page">
        {/* Hero Section */}
        <section className="collaborer-hero">
          <div className="container">
            <h1>
              <span className='word-wrapper'>
                <span>Collaborer</span>
              </span>
              <span className='word-wrapper'>
                <span>ensemble.</span>
              </span>
            </h1>
            <p className="collaborer-subtitle">
              Un accompagnement technique pour des projets web alliant design, performance et fiabilité.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="collaborer-steps">
          <div className="container">
            {steps.map((step, index) => (
              <div key={index} className="collaborer-step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h2 className="step-title">{step.title}</h2>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="design">
          <div className="container">
            <h2 className="design-title">Pas encore <br></br> de maquettes ?</h2>
            
            <div className="design-grid">
              <div className="design-card">
                <div className='index'>
                  01
                </div>
                <div>Cadrage du projet</div>
                <p>On clarifie ensemble l’essentiel : objectifs du site, priorités, contraintes et contexte. <br></br>Ce cadrage permet d’éviter les choix flous et de poser une base solide avant toute réflexion graphique ou technique.</p>
              </div>
              
              <div className="design-card">
                <div className='index'>
                  02
                </div>
                <div>Structure & contenus</div>
                <p>On définit la structure du site et les contenus à prévoir : pages, messages clés, hiérarchie de l’information. <br></br>Cette étape garantit un design utile et cohérent, pensé pour les utilisateurs comme pour les objectifs du projet.</p>
              </div>
              
              <div className="design-card">
                <div className='index'>
                  03
                </div>
                <div>Design accompagné</div>
                <p>Je vous mets en relation avec des designers de confiance, habitués à travailler en lien étroit avec l’intégration et les contraintes techniques.<br></br> Si besoin, je facilite les échanges pour assurer une collaboration fluide et un cadre clair.</p>
              </div>
              
              <div className="design-card">
                <div className='index'>
                  04
                </div>
                <div>Intégration & mise en œuvre</div>
                <p>Une fois les maquettes validées, j’interviens dans un cadre précis pour une intégration fidèle, propre et durable. <br></br>Le résultat : un site fiable, performant et facile à prendre en main après livraison.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="collaborer-full-image">
          <div className="image-container">
            <img src="/images/collaborer-marin-2.avif" alt="Collaborer" className="fit-cover" />
            <div className="overlay"></div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq">
          <div className="container">
            <div className="faq-top">
              <div className="faq-title">
                <h2>Des questions ?</h2>
              </div>
              <div className="faq-intro">
                <p>Cette section répond aux questions les plus fréquentes sur ma façon de travailler, le cadre de collaboration et l’intégration front-end pour agences et designers.</p>
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

        {/* CTA Section */}
        <section className="collaborer-cta">
          <div className="container">
            <h2>Envie de collaborer ?</h2>
            <p>Un premier échange simple pour voir si on peut avancer ensemble sur votre projet web.</p>
            <MagneticCTA 
             text="Parlons-en"
               href="mailto:contact@marinleclerc.dev" 
               className="cta-button" // On garde cta-button si y'a des styles spécifiques margin/layout dans methodo.scss, sinon on peut l'enlever. Pour l'instant on garde.
               style={{ transition: 'transform 0.1s linear' }}
            />
          </div>
        </section>
      </main>

      <Footer triggerSelector=".collaborer-cta" />
      <Layer />
    </>
  );
}
