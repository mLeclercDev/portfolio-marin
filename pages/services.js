
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
import HeroThree from '../components/HeroThree';
import CTASection from '../components/CTASection';

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
    
    // Animation H1 (SplitText)
    const h1 = document.querySelector('.services-hero h1');
    let splitH1;
    
    if (h1) {
        gsap.set(h1, { opacity: 1 });
        splitH1 = new SplitText(h1, { type: "lines", linesClass: "line-child" });
        splitH1.lines.forEach(line => {
             const wrapper = document.createElement('div');
             wrapper.style.overflow = 'hidden';
             wrapper.style.display = 'block';
             line.parentNode.insertBefore(wrapper, line);
             wrapper.appendChild(line);
        });
        gsap.set(splitH1.lines, { y: "100%" });
    }
    
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

    if(splitH1) {
        tl.to(splitH1.lines, {
            y: '0%',
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            force3D: true
        });
    }
    tl.to(splitSubtitle ? splitSubtitle.lines : '.services-hero .services-subtitle p', {
      y: "0%",
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out'
    }, '-=0.6');
    
    // === MAGNETIC CTA ANIMATION ===
    // Force transition none to avoid conflict with CSS
    gsap.set(".services-hero .magnetic-cta", { transition: "none" });

    // 1. Capsule Scale (Black shell only, content hidden)
    const cta = document.querySelector(".services-hero .magnetic-cta");
    const ctaText = cta ? cta.querySelector(".text-roller-inner") : null;
    const ctaArrow = cta ? cta.querySelector(".arrow svg.first") : null;

    if (cta && ctaText && ctaArrow) {
        // Hide content initially
        gsap.set(ctaText, { y: "110%" }); 
        gsap.set(ctaArrow, { y: "100%", x: "-100%"});

        // Animate Capsule
        tl.fromTo(cta, 
            { scale: 0, y: 5, opacity: 0 },
            { 
                scale: 1, 
                duration: 1, 
                opacity: 1,
                y: 0,
                ease: "power3.out",
                onComplete: () => {
                    // Restore transition after animation if needed, or keep it off until interaction
                     gsap.set(cta, { clearProps: "transition" });
                }
            },
            "-=0.75"
        )
        // 2. Text Reveal (distinct step after capsule)
        .to(ctaText, {
            y: "0%",
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.7") // Slight overlap for fluidity but distinct step
        
        // 3. Arrow Reveal (distinct step after text)
        .to(ctaArrow, {
            y: "-50%",
            x: "0%",
            duration: 0.75,
            ease: "power3.out"
        }, "-=0.6");
    }

    tl.call(() => setHeroAnimationComplete(true), null, "-=0.1");



    return () => {
        if (splitSubtitle) splitSubtitle.revert();
        if (splitH1) splitH1.revert();
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
              Ce que vous ne voyez pas fait toute la différence.
            </h1>
            <div className="services-subtitle">
              <p>
                Développement front-end & intégration sur mesure pour des sites fiables, performants et durables.
              </p>
            </div>
            
            <div className="cta-container" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                <MagneticCTA text="Me contacter" href="/contact" />
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

        {/* CTA BOTTOM */}
        <CTASection 
            title="Discutons de votre projet"
            description="Un premier échange permet de clarifier votre situation et de définir l’intervention la plus adaptée."
            ctaText="Prendre rendez-vous"
            ctaLink="mailto:contact@marinleclerc.dev"
        />

      </main>

      <Footer triggerSelector=".cta-section" />
      <Layer />
    </>
  );
}
