
import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import MagneticCTA from '../components/global/MagneticCTA';
import Layer from '../components/global/Layer';

// Dynamic import for Footer to improve performance
const Footer = dynamic(() => import('../components/global/Footer'), { ssr: false });

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

export default function Services() {
  const router = useRouter();



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.asPath]);

  useEffect(() => {
    // Hero Animation Setup & Execution
    const titleSpans = document.querySelectorAll('.services-hero h1 .word-wrapper span');
    const subtitle = document.querySelector('.services-hero .services-subtitle');
    const cards = document.querySelectorAll('.offer-item-wrap');

    const missionText = document.querySelector('.services-mission p');
    const missionLabel = document.querySelector('.services-mission .mission-label');

    // Initial states
    if (missionText) gsap.set(missionText, { opacity: 0, y: 30 });
    if (missionLabel) gsap.set(missionLabel, { opacity: 0, x: -20 });
    if (titleSpans.length > 0) gsap.set(titleSpans, { y: '100%' });
    if (subtitle) gsap.set(subtitle, { opacity: 0 });
    if (cards.length > 0) gsap.set(cards, { opacity: 0, y: 50 });

    const tl = gsap.timeline({ delay: 0.1 });

    if (missionLabel) {
      tl.to(missionLabel, {
        opacity: 0.8,
        x: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    if (missionText) {
      tl.to(missionText, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6');
    }
    
    if (titleSpans.length > 0) {
        tl.to(titleSpans, {
          y: '0%',
          stagger: 0.075,
          duration: 1,
          ease: 'power3.out',
          force3D: true
        });
    }

    if (subtitle) {
        tl.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out'
        }, '-=0.5');
    }

    if (cards.length > 0) {
        tl.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'hyperBounce'
        }, '-=0.6');
    }

    // Scroll Animations for sections
    const sections = document.querySelectorAll('.services-detail');
    sections.forEach((section) => {
        const h2 = section.querySelector('h2');
        if (h2) {
            gsap.fromTo(h2, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    }
                }
            );
        }
        
        const items = section.querySelectorAll('.detail-list li');
        if(items.length > 0) {
            gsap.fromTo(items,
                { x: -20, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                    }
                }
            );
        }
    });

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
        <meta name="author" content="Marin Leclerc" />
        <link rel="canonical" href="https://marinleclerc.dev/services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marinleclerc.dev/services" />
        <meta property="og:title" content="Services – Marin Leclerc | Développement Web Sur Mesure" />
        <meta property="og:description" content="Développement front-end sur mesure, refonte technique et accompagnement web global. Expert WordPress, Webflow et HubSpot." />
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

        {/* OFFERS LIST - SIMPLIFIED */}
        <section className="services-list-section">
          <div className="container">
            <div className="offers-list">
              {offers.map((offer, index) => (
                <div key={index} className="offer-item-wrap">
                  <div className="horizontal-line"></div>
                  <div className="offer-item hover-this">
                      <span className="offer-number">{offer.number}</span>
                    <div className="offer-title">
                      <h2>{offer.title}<br></br>{offer.subtitle}</h2>
                    </div>
                    <div className="offer-right">
                      <div className='offer-description'>
                        {offer.description}
                      </div>
                      {/* <MagneticCTA 
                        text="Prendre rendez-vous"
                        href="/contact" 
                        className="cta-button"
                        style={{ transition: 'transform 0.1s linear' }}
                      /> */}
                    </div>
                  </div>
                </div>
              ))}
              <div className="horizontal-line"></div>
            </div>
          </div>
        </section>

        {/* DEDICATED PARTNER SECTION (New Design) */}
        <section className="dedicated-partner">
          <div className="container">
            <div className="dedicated-partner-inner">
              <div className="partner-top">
                <div className="partner-heading">
                  <h2>Votre partenaire technique pour développer, optimiser et faire évoluer vos projets web.</h2>
                </div>
                <div className="partner-content">
                  <p>J’accompagne entreprises, indépendants et agences dans la mise en place de solutions web fiables et performantes. Du développement sur mesure à l’optimisation technique, j’interviens avec méthode et exigence pour garantir des bases solides, une expérience fluide et des résultats durables. Chaque collaboration est pensée sur le long terme, avec clarté et efficacité.</p>
                  <MagneticCTA 
                      text="Prendre contact"
                      href="mailto:contact@marinleclerc.dev" 
                      className="cta-button"
                      style={{ transition: 'transform 0.1s linear' }}
                  />
                </div>
              </div>
              
              <div className="partner-stats">
                  <div className="stat-item">
                      <div className="stat-value">15+</div>
                      <div className="stat-label">Projets réalisés</div>
                  </div>
                  <div className="stat-item">
                      <div className="stat-value">10+</div>
                      <div className="stat-label">Clients accompagnés</div>
                  </div>
                  <div className="stat-item">
                      <div className="stat-value">6+</div>
                      <div className="stat-label">Années d’expérience</div>
                  </div>
                  <div className="stat-item">
                      <div className="stat-value">5+</div>
                      <div className="stat-label">Collaborations agences</div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* GROWTH STATS SECTION (Style from Image) */}
{/*         <section className="growth-stats">
          <div className="container">
            <div className="growth-intro">
               <p>Since you&apos;ve last seen us...</p>
            </div>
            
            <div className="growth-grid">
              <div className="growth-item">
                <div className="growth-label">GROWTH % <br/>SINCE SERIES A</div>
                <div className="growth-value">3.2<span className="unit">k</span></div>
              </div>
              <div className="growth-item">
                <div className="growth-label">$ SPENT SINCE SERIES A <br/>(14 MONTHS)</div>
                <div className="growth-value">3.5<span className="unit">M</span></div>
              </div>
              <div className="growth-item">
                <div className="growth-label">BURN RATE AS A <br/>% OF GMV RUN RATE</div>
                <div className="growth-value">1.4<span className="unit">%</span></div>
              </div>
              <div className="growth-item">
                <div className="growth-label">GMV QUICK RATIO</div>
                <div className="growth-value">5.5</div>
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA BOTTOM - MATCHING COLLABORER */}
        <section className="services-cta">
          <div className="container">
            <h2>Discutons de votre projet</h2>
            <p>Un premier échange permet de clarifier votre situation et de définir l’intervention la plus adaptée.</p>
            <MagneticCTA 
                text="Prendre rendez-vous"
                href="/contact" 
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
