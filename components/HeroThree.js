"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticCTA from "./global/MagneticCTA";

const HeroThree = ({ delay = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Animation simple d'apparition
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: delay });

        tl.from(".hero-nav a", {
            y: -20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8
        })
        .from(".hero-title", {
            y: 50,
            opacity: 0,
            duration: 1
        }, "-=0.4")
        .from(".custom-line", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8
        }, "-=0.6")
        .from([".description"], {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.4")
        .from(".hero-image-placeholder", {
            y: 50,
            opacity: 0,
            duration: 1
        }, "-=0.6")
        
        // --- Magnetic CTA Animation Sequence ---
        // 1. Capsule Scale (Black background appears)
        .from(".magnetic-cta", {
            scale: 0,
            duration: 2, // Une seconde pour un scale bien smooth
            ease: "power3.out", // Elastic mais pas trop "boing"
            transformOrigin: "center center"
        }, "-=0.2")

        // 2. Text Reveal (TransformY up)
        .from(".magnetic-cta .text-roller-inner", {
            y: "100%", // Part de plus bas
            duration: 0.8,
            ease: "power3.out" // Tres smooth
        }, "-=0.6") // Commence pendant que la capsule finit de grandir

        // 3. Arrow Reveal
        .from(".magnetic-cta .arrow", {
            scale: 0,
            opacity: 0,
            rotation: -45, // Petite rotation pour le style
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-three">
      <div className="container-xl">
        <div className="hero-top">
             {/* Navigation removed as per design integration */}
        </div>

        <div className="hero-content">
            <h1 className="hero-title">
                Ce que vous ne voyez pas<br/>
                <span className="light-text">fait toute la différence.</span>
            </h1>
            
            {/* Placeholder pour la ligne/trait */}
            <div className="custom-line"></div>
            
            <div className="hero-bottom-row">
                <div className="spacer"></div>
                <div className="content-right">
                    <div className="description">
                        <p>Développement front-end & intégration sur mesure <br />pour des sites fiables, performants et durables.</p>
                    </div>
                    <div className="cta-wrapper">
                        <MagneticCTA text="Découvrir" href="#services-list" />
                    </div>
                </div>
            </div>
        </div>

        <div className="hero-image-container">
            <div className="hero-image-placeholder">
                {/* Cadre noir comme demandé */}
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroThree;
