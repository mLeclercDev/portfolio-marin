import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const MockupsThird = ({ videos }) => {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const mainElement = document.querySelector("main");

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",   // 👉 un peu plus bas que "center"
        end: "bottom 50%", // 👉 laisse le temps de bien sortir
        markers: false,
        onEnter: () => {
          gsap.to(mainElement, {
            backgroundColor: "#110F09",
            duration: 0.75,
            ease: "cubic-bezier(0.4,0,0.2,1)",
          });
          gsap.to(sectionRef.current, {
            opacity: 1,
            duration: 0.75,
            ease: "cubic-bezier(0.4,0,0.2,1)",
          });
        },
        onLeave: () => {
          gsap.to(mainElement, {
            backgroundColor: "#FCFBF6",
            duration: 0.75,
            ease: "cubic-bezier(0.4,0,0.2,1)",
          });
          gsap.to(sectionRef.current, {
            opacity: 0,
            duration: 0.75,
            ease: "cubic-bezier(0.4,0,0.2,1)",
          });
        },
        onEnterBack: () => {
          gsap.to(mainElement, {
            backgroundColor: "#110F09",
            duration: 0.75,
            ease: "cubic-bezier(0.4,0,0.2,1)",
          });
          gsap.to(sectionRef.current, {
            opacity: 1,
            duration: 0.75,
            ease: "cubic-bezier(0.4,0,0.2,1)",
          });
        },
        onLeaveBack: () => {
          gsap.to(mainElement, {
            backgroundColor: "#FCFBF6",
            duration: 0.75,
            ease: "cubic-bezier(0.4,0,0.2,1)",
          });
          gsap.to(sectionRef.current, {
            opacity: 0,
            duration: 0.75,
            ease: "cubic-bezier(0.4,0,0.2,1)",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [videos]);

  // ──────────────── Forcer autoplay et refresh ScrollTrigger ────────────────
  useEffect(() => {
    let loadedCount = 0;

    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) playPromise.catch(() => {});

      // Quand une vidéo est prête
      video.addEventListener("loadedmetadata", () => {
        loadedCount++;
        if (loadedCount === videos.length) {
          // 🔥 toutes les vidéos sont prêtes → refresh ScrollTrigger
          ScrollTrigger.refresh();
        }
      });
    });
  }, [videos]);

  return (
    <section className="mockups-third" ref={sectionRef}>
      <div className="container">
        {videos.map((video, i) => (
          <div className="mockup-section" key={i}>
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              className="mockup-video fit-cover"
              src={
                video.fields.file.url.startsWith("http")
                  ? video.fields.file.url
                  : `https:${video.fields.file.url}`
              }
              width="1440"
              height="810"
              muted
              loop
              autoPlay
              playsInline
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MockupsThird;