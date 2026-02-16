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

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

export default function Collaborer() {
  const router = useRouter();

  // Initialisation immédiate pour éviter le flash
  useEffect(() => {
    // Masquer les éléments du hero avant l'animation
    gsap.set('.collaborer-hero h1 .word-wrapper span', { y: '100%' });
    gsap.set('.collaborer-hero .collaborer-subtitle', { opacity: 0 });
    gsap.set('.collaborer-step', { opacity: 0, y: 80 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.set(".layers__items", { className: "layers__items out" });
  }, [router.asPath]);

    
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
        // On rend le conteneur visible maintenant que les lignes sont cachées par overflow:hidden
        gsap.set(subtitle, { opacity: 1 });
    } else {
        // Fallback si pas de split (ex: erreur), on s'assure que c'est visible pour l'animation ou on l'animera plus tard
        // Ici on laisse opacity 0 car on l'animera dans la timeline si non splitté
    }

    const mainElement = document.querySelector("main");
    // Créer le trigger pour la section avec la classe "design" pour changer la couleur de fond
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

    tl.to(wordSpans, {
      y: '0%',
      stagger: 0.075,
      duration: 1,
      ease: 'power3.out',
      force3D: true
    })
    .to(splitSubtitle ? splitSubtitle.lines : '.collaborer-hero p', {
      y: "0%",
      opacity: 1, // Assure que l'élément (ou ses lignes) devient visible
      duration: 0.9, // Plus lent
      stagger: 0.08,
      ease: 'power3.out'
    }, '-=0.5')
    .to('.collaborer-step', { // Animation des étapes qui étaient opacity: 0
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'hyperBounce'
    }, '-=0.5');

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
