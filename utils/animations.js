import gsap from "gsap";
import Router from "next/router";

export const animatePageIn = () => {
  const mm = gsap.matchMedia();

  // Desktop / Tablette
  mm.add("(min-width: 992px)", () => {
    const tl = gsap.timeline();
    return () => tl.kill();
  });

  // Mobile
  mm.add("(max-width: 991px)", () => {
    gsap.set(
      "footer",
      { opacity: 1 }
    );
    gsap.fromTo(
      "main > *",
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
          const handle = () => {
            window.scrollTo(0, 0);
            Router.events.off("routeChangeComplete", handle);
          };
          Router.events.on("routeChangeComplete", handle);
          router.push(href);
        },
      });

      return () => tl.kill();
    }
    return () => {};
  });

  // Mobile
  mm.add("(max-width: 992px)", () => {
    gsap.to("main > * , footer", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power1.out",
      onComplete: () => {
        const handle = () => {
          window.scrollTo(0, 0);
          Router.events.off("routeChangeComplete", handle);
        };
        Router.events.on("routeChangeComplete", handle);
        router.push(href);
      },
    });

    return () => {};
  });
};
