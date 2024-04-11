import gsap from "gsap"

export const animatePageIn = () => {
  const tl = gsap.timeline()
}

export const animatePageOut = (href, router) => {
  const banners = document.querySelectorAll(".layers__item")

  if (banners) {
    const tl = gsap.timeline()

    gsap.set(".layers", {zIndex: 11,})
    gsap.set("main", { opacity: 0, delay: 1 })
    
    tl.to([banners], {
      duration: 1, className: "layers__item out", stagger: 0.25, onComplete: () => {
        gsap.delayedCall(0.25, () => { router.push(href) })
      },})
  }
} 