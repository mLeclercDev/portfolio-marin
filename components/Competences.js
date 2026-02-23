import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Competences() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const fillRef = useRef(null);

  const categories = [
    {
      id: "01",
      title: "Développement",
      skills: [
        "Intégration front-end",
        "Animation CSS",
        "Micro-interactions",
        "WebGL / Three.js",
        "Intégration CMS",
        "E-commerce"
      ]
    },
    {
      id: "02",
      title: "Performance",
      skills: [
        "Core Web Vitals",
        "Optimisation",
        "Temps de chargement",
        "Mise en cache",
        "Accessibilité",
        "Préchargement"
      ]
    },
    {
      id: "03",
      title: "SEO",
      skills: [
        "Structure sémantique",
        "Maillage interne",
        "SEO technique",
        "Balises meta / Hn / canonical",
        "Données structurées",
        "GEO SEO",
        "LLM / SEO IA"
      ]
    },
    {
      id: "04",
      title: "Technologies",
      skills: [
        "WordPress",
        "Webflow",
        "HubSpot CMS",
        "Shopify",
        "Next.js",
        "Prismic",
        "Sanity",
        "Three.js"
      ]
    }
  ];

  // ─── Lerp scroll (mobile only) ──────────────────────────────────────
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || window.innerWidth > 768) return;

    const lerp = (a, b, t) => a + (b - a) * t;
    const EASE = 0.15; // lower = smoother / more inertia

    let startTouchX = 0;
    let startScrollLeft = 0;
    let targetX = 0;
    let currentX = 0;
    let rafId = null;

    // RAF loop — runs every frame, interpolates toward target
    const tick = () => {
      currentX = lerp(currentX, targetX, EASE);
      const max = el.scrollWidth - el.clientWidth;
      currentX = Math.max(0, Math.min(currentX, max));
      el.scrollLeft = currentX;

      // Live progress bar update
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${max > 0 ? currentX / max : 0})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onTouchStart = (e) => {
      startTouchX = e.touches[0].clientX;
      startScrollLeft = currentX;
    };

    const onTouchMove = (e) => {
      const dx = startTouchX - e.touches[0].clientX;
      targetX = startScrollLeft + dx;
      e.preventDefault(); // prevent page vertical scroll hijacking
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // ─── GSAP entrance animation ────────────────────────────────────────
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      const st = new SplitText(".competences-title", { type: "lines", linesClass: "line-child" });
      st.lines.forEach(line => {
        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'block';
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      tl.from(st.lines, {
        y: "100%",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      })
      .from(".comp-category", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.6");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="competences-section" ref={sectionRef}>
      <div className="container">
        <h2 className="competences-title">
          Mon expertise technique me permet de concevoir des expériences web sur mesure, fluides et optimisées pour vos objectifs.
        </h2>

        {/* ── Desktop grid ── */}
        <div className="competences-grid">
          {categories.map((cat, index) => (
            <div className="comp-category" key={index}>
              <div className="comp-header">
                <span className="comp-number">{cat.id}</span>
                <h3 className="comp-title">{cat.title}</h3>
              </div>
              <ul className="comp-list">
                {cat.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Mobile lerp carousel ── */}
        <div className="competences-carousel-wrapper">
          <div className="competences-carousel" ref={carouselRef}>
            {categories.map((cat, index) => (
              <div className="carousel-card" key={index}>
                <div className="comp-header">
                  <span className="comp-number">{cat.id}</span>
                  <h3 className="comp-title">{cat.title}</h3>
                </div>
                <ul className="comp-list">
                  {cat.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Ultra-thin progress bar */}
          <div className="carousel-track">
            <div className="carousel-fill" ref={fillRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
