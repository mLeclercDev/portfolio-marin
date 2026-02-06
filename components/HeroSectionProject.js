// components/HeroSectionProject.js
import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import { SplitText } from "gsap/dist/SplitText";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/hero-section-project.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

const HeroSectionProject = ({ title, image }) => {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const titleTlRef = useRef(null);
  const imageTlRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current || !titleRef.current) return;

    // scope helper (ne sélectionne que dans ce composant)
    const q = (sel) => rootRef.current.querySelectorAll(sel);

    // kill previous tweens / timelines if any
    if (titleTlRef.current) {
      titleTlRef.current.kill();
      titleTlRef.current = null;
    }
    if (imageTlRef.current) {
      imageTlRef.current.kill();
      imageTlRef.current = null;
    }
    // kill any leftover ScrollTrigger (defensive)
    ScrollTrigger.getAll().forEach(st => st.kill());

    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      // Initialisation GSAP SplitText
      const split = new SplitText(titleRef.current, { type: "words", wordsClass: "word-child" });

      // Wrap chaque mot dans un wrapper avec overflow hidden
      split.words.forEach(word => {
        const wrapper = document.createElement('div');
        wrapper.className = 'o-wrapper';
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        word.parentNode.insertBefore(wrapper, word);
        wrapper.appendChild(word);
        word.className = 'transform';
      });

      const runAnim = (els) => {
        // reset state
        gsap.set(els, { y: "100%" });
        // animate
        titleTlRef.current = gsap.to(els, {
          y: "0%",
          stagger: 0.075,
          duration: 0.8,
          ease: "hyperBounce",
          delay: 0.1,
          force3D: true,
        });
      };

      const transforms = Array.from(q(".transform"));

      if (!transforms.length) {
        // SplitText peut ne pas avoir rendu encore : attendre un frame
        requestAnimationFrame(() => {
          const transforms = Array.from(q(".transform"));
          if (transforms.length) runAnim(transforms);
        });
      } else {
        runAnim(transforms);
      }

      // Parallax image (scoped)
      const imgNode = rootRef.current.querySelector(".wrapper-image img");
      imageTlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current.querySelector(".wrapper-image"),
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          markers: false,
        },
      });
      if (imgNode) imageTlRef.current.to(imgNode, { y: -40 });

      return () => {
        if (titleTlRef.current) titleTlRef.current.kill();
        if (imageTlRef.current) imageTlRef.current.kill();
        split.revert();
      };
    });

    mm.add("(max-width: 991px)", () => {
      // mobile fallback simple
      gsap.from(rootRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power1.out",
      });
      return () => {};
    });

    return () => {
      // cleanup matchMedia + ScrollTrigger
      try { mm.revert(); } catch (e) { /* defensive */ }
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [title]); // RE-run when title change

  return (
    <section className="hero-section-project" ref={rootRef} key={title}>
      <div className="container">
        <h1 ref={titleRef}>
          {title}
        </h1>
      </div>
      <div className="container">
        <div className="wrapper-image">
          <Image
            src={`https:${image}`}
            alt={title || "image projet"}
            width={1920}
            height={1080}
            quality={80}
            priority={false}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionProject;
