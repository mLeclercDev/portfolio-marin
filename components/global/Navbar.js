import { useEffect, useState } from 'react';
import { usePathname, useRouter } from "next/navigation"
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import '../../styles/components/global/navbar.scss';
import { animatePageOut } from "../../utils/animations"

function formatToUrl(title) {
  // Convertir en minuscules et remplacer les espaces par des tirets
  let url = title.toLowerCase().replace(/\s+/g, '-');
  // Supprimer les caractères spéciaux
  url = url.replace(/[^\w-]+/g, '');
  return url;
}

const Navbar = ({ delay = 0 }) => {
  console.log("delay : ", delay)
  const router = useRouter();
  const pathname = usePathname();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);

  useEffect(() => {
    if (delay == null) return;

    // GSAP matchMedia pour détecter desktop
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      setIsDesktop(true);
    });
    mm.add("(max-width: 991px)", () => {
      setIsDesktop(false);
    });

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHoveringHeader(true);
    };

    const handleMouseLeave = () => {
      setIsHoveringHeader(false);
    };

    // Hyper bounce custom
    CustomEase.create(
      "hyperBounce",
      "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
    );

    gsap.set("nav .logo", { opacity: 1 })
    gsap.set("nav .contact-link", { opacity: 1 })

    gsap.to("nav .logo", { y: "0%", delay: delay + 2, duration: 0.8, ease: "hyperBounce" })
    gsap.to("nav .contact-link", { y: "0%", delay: delay + 2, duration: 0.8, ease: "hyperBounce" })

    gsap.set("nav", { delay: delay + 3, overflow: "visible" })


    if (window.innerWidth >= 992) {
      window.addEventListener('mousemove', handleMouseMove);

      const headerElement = document.querySelector('header');
      if (headerElement) {
        headerElement.addEventListener('mouseenter', handleMouseEnter);
        headerElement.addEventListener('mouseleave', handleMouseLeave);
      }

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (headerElement) {
          headerElement.removeEventListener('mouseenter', handleMouseEnter);
          headerElement.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    };
  }, [delay]);

  const handleLinkHover = (e) => {
    const target = e.target.closest('.hover-this');
    console.log("target : ", target)
    if (!target) return;

    const span = target.querySelector("span");
    if (!span) return;

    const { offsetX, offsetY, target: { offsetWidth, offsetHeight } } = e.nativeEvent;

    const move = 25,
      xMove = offsetX / offsetWidth * (move * 2) - move,
      yMove = offsetY / offsetHeight * (move * 2) - move;

    span.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === 'mouseleave') span.style.transform = 'translate(0px, 0px)';
  };

  // Fonction à exécuter au clic sur un élément de class layers__item
  const layersIn = (href) => {    
    console.log("href : ", href) 
    console.log("pathname : ", pathname)    
    if (pathname !== href) {
      animatePageOut(href, router)
    } 
  };

  return (
    <header>
      <div className='container'>
        <nav>
          <div className={`logo hover-this ${pathname === '/' ? 'no-interaction' : ''}`} onMouseMove={handleLinkHover} onMouseLeave={handleLinkHover} onClick={() => layersIn(`/`)}
          style={{ transform: 'translateY(100%)', opacity: "0" }}
          >
            <span>marin.</span></div>
          <a className='contact-link hover-this' onMouseMove={handleLinkHover} onMouseLeave={handleLinkHover} href='mailto:marin.leclerc.dev@gmail.com'
             style={{ transform: 'translateY(100%)', opacity: "0" }}
          >
            <span>Contact</span>
          </a>
          <div className={`cursor ${isHoveringHeader ? 'hovering-header' : ''}`} style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;