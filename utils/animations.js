import gsap from "gsap"

export const animatePageIn = () => {
  const tl = gsap.timeline()
}

export const animatePageOut = (href, router) => {
  const banners = document.querySelectorAll(".layers__items")
  console.log("banner : ", banners);

  if (banners) {
    const tl = gsap.timeline()

    gsap.set("main", { opacity: 0, delay: 1 })
    //gsap.set(".hero-project img",{ className: "fit-cover", delay: 0.5 })

    gsap.to(".projects-second", {ease: "cubic-bezier(0.4,0,0.2,1)", opacity: 0.5, duration: 1})
    tl.to([banners], {
      duration: 1, stagger: 0.1, className: "layers__items in", onComplete: () => {
        gsap.delayedCall(0.25, () => { router.push(href) })
      },})
  }
} 