
import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import { SplitText } from "gsap/dist/SplitText";
import MagneticCTA from '../components/global/MagneticCTA';
import Layer from '../components/global/Layer';
import ProcessSteps from '../components/ProcessSteps';
import DedicatedPartner from '../components/DedicatedPartner';
import GrowthStats from '../components/GrowthStats';
import OffersList from '../components/OffersList';

// Dynamic import for Footer to improve performance
const Footer = dynamic(() => import('../components/global/Footer'), { ssr: false });

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

export default function Services() {
  const router = useRouter();
  const [heroAnimationComplete, setHeroAnimationComplete] = React.useState(false);



  // Initialisation immédiate pour éviter le flash
  useEffect(() => {
    // Masquer les éléments du hero avant l'animation
    gsap.set('.services-hero h1 .word-wrapper span', { y: '100%' });
    gsap.set('.services-hero .services-subtitle', { opacity: 0 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.set(".layers__items", { className: "layers__items out" });
  }, [router.asPath]);

  useEffect(() => {
    // Animation d'entrée pour le hero
    const tl = gsap.timeline({ 
      delay: 0.1
    });
    
    // Animation des mots du h1
    const wordSpans = document.querySelectorAll('.services-hero h1 .word-wrapper span');
    gsap.set(wordSpans, { y: '100%' });
    
    // Split du sous-titre
    const subtitle = document.querySelector('.services-hero .services-subtitle p');
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
        gsap.set(subtitle.parentElement, { opacity: 1 });
    }

    tl.to(wordSpans, {
      y: '0%',
      stagger: 0.075,
      duration: 1,
      ease: 'power3.out',
      force3D: true
    })
    .to(splitSubtitle ? splitSubtitle.lines : '.services-hero .services-subtitle p', {
      y: "0%",
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out'
    }, '-=0.5')
    .call(() => setHeroAnimationComplete(true), null, "-=0.6");

    // === CTA SECTION ANIMATION ===
    const ctaSection = document.querySelector('.services-cta');
    if (ctaSection) {
      const ctaTitle = ctaSection.querySelector('h2');
      const ctaText = ctaSection.querySelector('p');
      const ctaButton = ctaSection.querySelector('.cta-button');

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSection,
          start: "top 75%",
        }
      });

      if (ctaTitle) {
        ctaTl.fromTo(ctaTitle,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
        );
      }

      if (ctaText) {
        ctaTl.fromTo(ctaText,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }

      if (ctaButton) {
        ctaTl.fromTo(ctaButton,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.2)" },
          "-=0.5"
        );
      }
    }

    return () => {
        if (splitSubtitle) splitSubtitle.revert();
    };
  }, []);



  const offers = [
    {
      id: 'integration',
      number: '01',
      title: 'Développement',
      subtitle: '& Intégration',
      target: 'Agences, Indépendants, Designers',
      context: 'Vous avez des maquettes prêtes',
      description: 'Je développe des sites web adaptés à vos besoins et à vos objectifs. Architecture claire, intégration propre et bases techniques solides pour un site fiable et durable.',
      link: '#benefits'
    },
    {
      id: 'refonte',
      number: '02',
      title: 'Audit &',
      subtitle: 'optimisation',
      target: 'Sites lents, Code vieillissant',
      context: 'Votre site est devenu un frein',
      description: 'J’optimise votre site existant pour le rendre plus rapide, plus stable et plus performant. Des améliorations concrètes, sans repartir de zéro.',
      link: '#benefits'
    },
    {
      id: 'accompagnement',
      number: '03',
      title: 'Partenaire',
      subtitle: 'Web',
      target: 'Clients cherchant un partenaire',
      context: 'Suivi sur la durée',
      description: 'Je vous accompagne dans vos décisions techniques et stratégiques. Objectif : structurer votre présence en ligne avec un site cohérent et efficace.',
      link: '#benefits'
    }
  ];



  return (
    <>
      <Head>
        <title>Services – Marin Leclerc | Développement Web Sur Mesure</title>
        <meta name="title" content="Services – Marin Leclerc | Développement Web Sur Mesure" />
        <meta name="description" content="Développement front-end sur mesure, refonte technique et accompagnement web global. Expert WordPress, Webflow et HubSpot." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="développeur web freelance, services web, développement sur mesure, WordPress, Webflow, HubSpot, audit technique, optimisation performance, accompagnement web" />
        <link rel="canonical" href="https://marinleclerc.dev/services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marinleclerc.dev/services" />
        <meta property="og:title" content="Services – Marin Leclerc | Développement Web Sur Mesure" />
        <meta property="og:description" content="Développement front-end sur mesure, refonte technique et accompagnement web global. Expert WordPress, Webflow et HubSpot." />
        <meta property="og:image" content="https://marinleclerc.dev/Images/og-services.jpg" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Marin Leclerc - Développeur Web" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marinleclerc.dev/services" />
        <meta name="twitter:title" content="Services – Marin Leclerc | Développement Web Sur Mesure" />
        <meta name="twitter:description" content="Développement front-end sur mesure, refonte technique et accompagnement web global. Expert WordPress, Webflow et HubSpot." />
        <meta name="twitter:image" content="https://marinleclerc.dev/Images/og-services.jpg" />





        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />



      </Head>

      <main className="services-page">
        {/* MISSION SECTION */}
{/*         <section className="offre-mission">
          <div className="container">
            <div className="mission-inner">
              <div className="mission-label">WHAT I DO</div>
              <div className="mission-text">
                <p>
                  Je suis convaincu que nous pouvons vivre dans un monde où <span>chaque produit ou service</span> offre une expérience fluide sur toutes les plateformes. Ma mission est d&apos;en faire une réalité.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* HERO SECTION */}
        <section className="services-hero">
          <div className="container">
            <h1>
              <span className='word-wrapper'>
                <span>Mes services</span>
              </span>
            </h1>
            <div className="services-subtitle">
              <p>
                J’interviens sur des projets nécessitant un cadre solide, une exécution propre et une attention particulière à la performance et la maintenabilité.
              </p>
            </div>
          </div>
        </section>

        {/* OFFERS LIST */}
        <OffersList offers={offers} startAnimation={heroAnimationComplete} />

        {/* DEDICATED PARTNER SECTION */}
        <DedicatedPartner />

        {/* GROWTH STATS SECTION */}
        {/* <GrowthStats /> */}

        {/* PROCESS STEPS SECTION */}
        {/* <ProcessSteps 
          title="Ma méthode de travail repose sur une approche structurée et collaborative. Chaque projet suit un processus pensé pour garantir qualité, performance et alignement avec vos objectifs."
          steps={[
            { number: '01', label: 'Cadrage' },
            { number: '02', label: 'Développement' },
            { number: '03', label: 'Tests' },
            { number: '04', label: 'Livraison' }
          ]}
        /> */}

        {/* CTA BOTTOM - MATCHING COLLABORER */}
        <section className="services-cta">
          <div className="container">
            <h2>Discutons de votre projet</h2>
            <p>Un premier échange permet de clarifier votre situation et de définir l’intervention la plus adaptée.</p>
            <MagneticCTA 
                text="Prendre rendez-vous"
                href="mailto:contact@marinleclerc.dev" 
                className="cta-button"
                style={{ transition: 'transform 0.1s linear' }}
            />
          </div>
        </section>

      </main>

      <Footer triggerSelector=".services-cta" />
      <Layer />
    </>
  );
}
