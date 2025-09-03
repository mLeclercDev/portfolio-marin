"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import "../styles/components/hero-second.scss";

const HeroSection = ({ delay }) => {
  const videoWrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [speed, setSpeed] = useState(550);
  const [entryDone, setEntryDone] = useState(false);

  const images = [
    "/Images/showreel/mockup-video-1.png",
    "/Images/showreel/mockup-video-12.png",
    "/Images/showreel/mockup-video-6.png",
    "/Images/showreel/mockup-video-5.png",
    "/Images/showreel/mockup-video-4.png",
    "/Images/showreel/mockup-video-9.png",
    "/Images/showreel/mockup-video-8.png",
    "/Images/showreel/mockup-video-11.png",
  ];

  // 🔁 Slideshow auto
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, speed);
    return () => clearInterval(interval);
  }, [speed, images.length]);

  // ⚡ Animation d'entrée
  useEffect(() => {
    if (delay == null) return;

    gsap.registerPlugin(CustomEase);
    CustomEase.create("hyperBounce", "0.4,0,0.2,1");

    const reveal = gsap.timeline({
      onComplete: () => setEntryDone(true),
    });

    // Set initial state
    gsap.set(videoWrapperRef.current, { scale: 0, rotate: -9 });

    reveal
      .to(".hero-second .word-wrapper.first", {
        y: "0%",
        rotate: 0,
        duration: 0.8,
        ease: "hyperBounce",
        delay: delay + 0.5,
      })
      .to(
        ".hero-second .word-wrapper.second",
        {
          y: "0%",
          rotate: 0,
          duration: 0.8,
          ease: "hyperBounce",
          delay: -0.725,
        }
      )
      .to(
        videoWrapperRef.current,
        {
          scale: 1,
          rotate: 0,
          duration: 0.85,
          ease: "hyperBounce",
          delay: -0.8,
        }
      )
      .to(
        ".hero-second .catchline .line",
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: "hyperBounce",
          delay: -0.225,
        }
      );
  }, [delay]);

  // ⚡ Timeline Scroll
  useEffect(() => {
    if (!entryDone) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-second",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      },
    });

    const handleScroll = () => {
      setSpeed(100);
      clearTimeout(window._heroScrollTimeout);
      window._heroScrollTimeout = setTimeout(() => {
        setSpeed(400);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    tl.fromTo(
      videoWrapperRef.current,
      { scale: 1, rotation: 0 },
      { scale: 0.85, rotation: -8, duration: 1, immediateRender: false }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      tl.kill();
    };
  }, [entryDone]);

  return (
    <section className="hero-second">
      <div className="container">
        <div className="name">
          <div className="word-wrapper first">Website</div>
        </div>
        <div className="name">
          <div className="word-wrapper second">developer</div>
        </div>
        <div className="middle-wrapper">
          <div className="video-wrapper" ref={videoWrapperRef}>
            {images.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`Mockup ${i + 1}`}
                width={1000}
                height={660}
                className={`fit-cover ${
                  i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="name ghost-word first">
          <div className="word-wrapper first">
            <span>W</span>
            <span>E</span>
            <span>B</span>
            <span>S</span>
            <span>I</span>
            <span>T</span>
            <span>E</span>
          </div>
        </div>
        <div className="name ghost-word second">
          <div className="word-wrapper second">
            <span>D</span>
            <span>E</span>
            <span>V</span>
            <span>E</span>
            <span>L</span>
            <span>O</span>
            <span>P</span>
            <span>E</span>
            <span>R</span>
          </div>
        </div>
        <div className="catchline">
          <div className="line-wrapper">
            <span className="line">Smart front-end development</span>
          </div>
          <div className="line-wrapper">
            <span className="line">High-impact websites</span>
          </div>
        </div>
        <div className="catchline">
          <div className="line-wrapper">
            <span className="line">HubSpot</span>
          </div>
          <div className="line-wrapper">
            <span className="line">Webflow</span>
          </div>
          <div className="line-wrapper">
            <span className="line">Wordpress</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
