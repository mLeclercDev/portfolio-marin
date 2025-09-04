import gsap from "gsap";
import Router from "next/router";

// Fonction helper pour forcer le scroll en haut après changement de page
const scrollToTopAfterRoute = () => {
  const handle = () => {
    window.scrollTo(0, 0);
    Router.events.off("routeChangeComplete", handle); // cleanup
  };
  Router.events.on("routeChangeComplete", handle);
};

export const animatePageIn = () => {
  const mm = gsap.matchMedia();

  // Desktop / Tablette
  mm.add("(min-width: 992px)", () => {
    const tl = gsap.timeline();
    // Tu peux ajouter ici une animation "in" si nécessaire
    return () => tl.kill();
  });

  // Mobile
  mm.add("(max-width: 991px)", () => {
    gsap.fromTo(
      "main, footer",
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power1.out" }
    );
    return () => {};
  });
};

export const animatePageOut = (href, router) => {
  const mm = gsap.matchMedia();

  // Desktop / Tablette
  mm.add("(min-width: 993px)", () => {
    const banners = document.querySelectorAll(".layers__items");
    if (banners.length) {
      const tl = gsap.timeline();

      // cacher main/footer plus longtemps
      gsap.to(["main", "footer"], { opacity: 0, duration: 0.8, ease: "power1.out" });

      tl.to(banners, {
        duration: 1,
        stagger: 0.1,
        className: "layers__items in",
        onComplete: () => {
          // scroll top juste avant de changer de page
          window.scrollTo(0, 0);
          router.push(href);
        },
      });

      return () => tl.kill();
    }
    return () => {};
  });

  // Mobile
  mm.add("(max-width: 992px)", () => {
    gsap.set("footer", { opacity: 0 });

    gsap.to("main", {
      opacity: 0,
      duration: 0.8, // rallonge l'animation pour bien voir le fade
      ease: "power1.out",
      onComplete: () => {
        // scroll top après que le main ait fini
        window.scrollTo(0, 0);
        router.push(href);
      },
    });

    return () => {};
  });
};
