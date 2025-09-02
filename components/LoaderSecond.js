import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import '../styles/components/loader-second.scss'

gsap.registerPlugin(CustomEase);

// Hyper bounce custom
CustomEase.create(
  "hyperBounce",
  "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
);

const LoaderSecond = () => {
  const linesRef = useRef([]);

  useEffect(() => {
    linesRef.current = linesRef.current.slice(0, 3);
    const banners = document.querySelectorAll(".layers__items")
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "hyperBounce" } });

/*      tl.set("nav", { overflow: "hidden" })
     tl.set("nav .logo", { y: "100%" })
     tl.set("nav .contact-link", { y: "100%" }) */

    // 0% sort, 11% entre
    tl.to(linesRef.current[0], { y: "0%" })
    .to(linesRef.current[0], { y: "-100%", delay: 0.5  })
      .to(linesRef.current[1], { y: "0%" }, "<");

    // 11% sort, 47% entre
    tl.to(linesRef.current[1], { y: "-100%", delay: 0.5 })
      .to(linesRef.current[2], { y: "0%" }, "<");

    // 47% sort, 78% entre
    tl.to(linesRef.current[2], { y: "-100%", delay: 0.5 })
       
    tl.to(banners, {
        delay: -0.5,
    duration: 1,
    stagger: 0.1,
    className: "layers__items in",
    onComplete: () => {
        gsap.delayedCall(0.25, () => {
        // On change les classes des deux premiers éléments
        if (banners[0]) {
            banners[0].classList.remove("in");
            banners[0].classList.add("first");
        }
        if (banners[1]) {
            banners[1].classList.remove("in");
            banners[1].classList.add("second");
        }

         gsap.to("nav .logo", { y: "0%", delay: 1.2, duration: 0.8, ease: "hyperBounce" })
         gsap.to("nav .contact-link", { y: "0%", delay: 1.2, duration: 0.8, ease: "hyperBounce" })
         gsap.set("nav", { delay: 2, overflow: "visible" })

        // 🔥 cacher le loader complètement
        const loader = document.querySelector(".loader-second");
        if (loader) loader.style.display = "none";
        });
    },
    });

  }, []);

  return (
    <section className="loader-second">
      <div className='wrapper-loader'>
        {["14%", "47%", "78%"].map((percent, index) => (
          <div
            className='line'
            key={index}
            ref={el => linesRef.current[index] = el}
          >
            {percent}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoaderSecond;