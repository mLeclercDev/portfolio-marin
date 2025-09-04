import gsap from "gsap";

export const animatePageIn = () => {
  const mm = gsap.matchMedia();

  // Desktop / Tablette
  mm.add("(min-width: 992px)", () => {
    const tl = gsap.timeline();
    // Anim "in" si nécessaire
    return () => tl.kill();
  });

  // Mobile
  mm.add("(max-width: 991px)", () => {
    gsap.fromTo(
      "main > * , footer",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
    );
    return () => {};
  });
};

export const animatePageOut = (href, router) => {
  const mm = gsap.matchMedia();

  // Desktop / Tablette (inchangé)
  mm.add("(min-width: 993px)", () => {
    const banners = document.querySelectorAll(".layers__items");
    if (banners.length) {
      const tl = gsap.timeline();

      gsap.set(["main", "footer"], { opacity: 0, delay: 1 });

      tl.to(banners, {
        duration: 1,
        stagger: 0.1,
        className: "layers__items in",
        onComplete: () => {
          window.scrollTo(0, 0);
          router.push(href);
        },
      });

      return () => tl.kill();
    }
    return () => {};
  });

  // Mobile (nouvelle approche)
  mm.add("(max-width: 992px)", () => {
    gsap.to("main > * , footer", {
      opacity: 0,
      y: 20, // léger translateY pour un effet de mouvement
      duration: 0.8, // rallongé pour que l'animation soit visible
      ease: "power1.out",
      onComplete: () => {
        window.scrollTo(0, 0);
        router.push(href);
      },
    });

    return () => {};
  });
};
