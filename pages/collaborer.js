import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import { SplitText } from "gsap/dist/SplitText";
import MagneticCTA from '../components/global/MagneticCTA';
import Layer from '../components/global/Layer';
import Footer from '../components/global/Footer';
import CollaborerSteps from '../components/CollaborerSteps';
import DesignCards from '../components/DesignCards';
import ParallaxImage from '../components/ParallaxImage';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

export default function Collaborer() {
  const router = useRouter();

  // Initialisation immédiate pour éviter le flash
  useEffect(() => {
    // Masquer les éléments du hero avant l'animation
    gsap.set('.collaborer-hero h1 .word-wrapper span', { y: '100%' });
    gsap.set('.collaborer-hero .collaborer-subtitle', { opacity: 0 });
    
    // Init Hero CTA
    const heroCta = document.querySelector(".collaborer-hero .magnetic-cta");
    if (heroCta) {
        gsap.set(heroCta, { transition: "none", scale: 0, opacity: 0, y: 5 });
        const heroCtaText = heroCta.querySelector(".text-roller-inner");
        const heroCtaArrow = heroCta.querySelector(".arrow svg.first");
        if(heroCtaText) gsap.set(heroCtaText, { y: "110%" });
        if(heroCtaArrow) gsap.set(heroCtaArrow, { y: "100%", x: "-100%" });
    }


  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.set(".layers__items", { className: "layers__items out" });
  }, [router.asPath]);

  useEffect(() => {
    // Animation d'entrée pour le hero
    const tl = gsap.timeline({ delay: 0.1 });
    
    // Animation des mots du h1
    const wordSpans = document.querySelectorAll('.collaborer-hero h1 .word-wrapper span');
    gsap.set(wordSpans, { y: '100%' });
    
    // Split du sous-titre
    const subtitle = document.querySelector('.collaborer-hero .collaborer-subtitle');
    let splitSubtitle;
    
    if (subtitle) {
        splitSubtitle = new SplitText(subtitle, { type: "lines", linesClass: "line-child" });
        splitSubtitle.lines.forEach(line => {
             const wrapper = document.createElement('div');
             wrapper.style.overflow = 'hidden';
             wrapper.style.display = 'block';
             line.parentNode.insertBefore(wrapper, line);
             wrapper.appendChild(line);
        });
        gsap.set(splitSubtitle.lines, { y: "100%" });
        gsap.set(subtitle, { opacity: 1 });
    }

    // Hero Timeline
    tl.to(wordSpans, {
      y: '0%',
      stagger: 0.075,
      duration: 1,
      ease: 'power3.out',
      force3D: true
    })
    .to(splitSubtitle ? splitSubtitle.lines : '.collaborer-hero p', {
      y: "0%",
      opacity: 1,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out'
    }, '-=0.5');

    // Hero CTA Animation (Sequence)
    const heroCta = document.querySelector(".collaborer-hero .magnetic-cta");
    if (heroCta) {
        const t = heroCta.querySelector(".text-roller-inner");
        const a = heroCta.querySelector(".arrow svg.first");

        tl.fromTo(heroCta, 
            { scale: 0, opacity: 0, y: 5 },
            { 
               scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out",
               onComplete: () => gsap.set(heroCta, { clearProps: "transition" })
            }, 
            "-=0.5"
        );
        if(t) tl.to(t, { y: "0%", duration: 0.8, ease: "power3.out" }, "-=0.7");
        if(a) tl.to(a, { y: "-50%", x: "0%", duration: 0.75, ease: "power3.out" }, "-=0.6");
    }





    /* --- Existing Logic (Design Section BG) --- */
    const mainElement = document.querySelector("main");
    const st = ScrollTrigger.create({
        trigger: ".design",
        start: "top center",
        end: "bottom center",
        markers: false,
        onEnter: () => {
            gsap.to(mainElement, { backgroundColor: "#110F09", duration: 0.55, ease: "hyperBounce" });
        },
        onLeaveBack: () => {
            gsap.to(mainElement, { backgroundColor: "#FCFBF6", duration: 0.55, ease: "hyperBounce" });
        },
    });

    return () => {
        if (splitSubtitle) splitSubtitle.revert();
        st.kill();
    };
  }, []);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Collaborer – Marin Leclerc | Développeur Web Freelance</title>
        <meta name="title" content="Collaborer – Marin Leclerc | Développeur Web Freelance" />
        <meta name="description" content="Méthodologie en 5 étapes pour créer des sites web performants. Intégration WordPress, Webflow, HubSpot. Collaboration agences & designers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="développeur web freelance, intégration web, WordPress, Webflow, HubSpot, collaboration agence, développeur front-end" />
        <meta name="author" content="Marin Leclerc" />
        <link rel="canonical" href="https://marinleclerc.dev/collaborer" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marinleclerc.dev/collaborer" />
        <meta property="og:title" content="Collaborer – Marin Leclerc | Développeur Web Freelance" />
        <meta property="og:description" content="Méthodologie en 5 étapes pour créer des sites web performants. Intégration WordPress, Webflow, HubSpot. Collaboration agences & designers." />
        <meta property="og:image" content="https://marinleclerc.dev/Images/collaborer-marin-2.avif" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Marin Leclerc - Développeur Web" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marinleclerc.dev/collaborer" />
        <meta name="twitter:title" content="Collaborer – Marin Leclerc | Développeur Web Freelance" />
        <meta name="twitter:description" content="Méthodologie en 5 étapes pour créer des sites web performants. Intégration WordPress, Webflow, HubSpot. Collaboration agences & designers." />
        <meta name="twitter:image" content="https://marinleclerc.dev/Images/collaborer-marin-2.avif" />
        <meta name="twitter:creator" content="@marinleclerc" />

        {/* Analytics */}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5ff730a5-9ee9-49bb-a24e-5773e82d776a"></script>

        {/* Favicons */}
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
            <div className="cta-container" style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                <MagneticCTA text="Démarrer un projet" href="mailto:contact@marinleclerc.dev" />
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <CollaborerSteps />
        
        {/* Design Section */}
        <DesignCards />

        {/* Parallax Image Section */}
        <ParallaxImage />

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Section */}
        <CTASection 
            title="Envie de collaborer ?"
            description="Un premier échange simple pour voir si on peut avancer ensemble sur votre projet web."
            ctaText="Parlons-en"
            ctaLink="mailto:contact@marinleclerc.dev"
        />
      </main>

      <Footer triggerSelector=".cta-section" />
      <Layer />
    </>
  );
}
