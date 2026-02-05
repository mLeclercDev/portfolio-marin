import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from "next/navigation"
import Link from 'next/link';
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import '../../styles/components/global/navbar.scss';
import { animatePageOut } from "../../utils/animations"
import MagneticCTA from './MagneticCTA';

function formatToUrl(title) {
  // Convertir en minuscules et remplacer les espaces par des tirets
  let url = title.toLowerCase().replace(/\s+/g, '-');
  // Supprimer les caractères spéciaux
  url = url.replace(/[^\w-]+/g, '');
  return url;
}

const Navbar = ({ delay = 0 }) => {
  //console.log("delay : ", delay)
  const router = useRouter();
  const pathname = usePathname();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fonction à exécuter au clic sur un élément de class layers__item (enveloppée dans useCallback pour être stable)
  const layersIn = useCallback((href) => {    
    if (pathname !== href) {
      animatePageOut(href, router)
    } 
  }, [pathname, router]);

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

    gsap.set("nav .logo .text-roller-mask", { opacity: 1 })
    gsap.set("nav .collaborer-link .text-roller-mask", { opacity: 1 }) // MAJ selecteur
    
    // 1. Initialisation : Opacité 0 simple
    gsap.set("nav .contact-link", { opacity: 0 });
    // On s'assure que les enfants n'ont pas de transforms résiduels des essais précédents
    gsap.set(["nav .contact-link .navbar-cta", "nav .contact-link .text-roller-inner", "nav .contact-link .arrow"], { clearProps: "all" });

    gsap.to("nav .logo .text-roller-mask", { y: "0%", delay: delay + 2, duration: 0.8, ease: "hyperBounce" })
    gsap.to("nav .collaborer-link .text-roller-mask", { y: "0%", delay: delay + 2.1, duration: 0.8, ease: "hyperBounce" }) 
    
    // 2. Animation Simple : Fade in juste après
    gsap.to("nav .contact-link", { 
        opacity: 1, 
        delay: delay + 2.5, // Plus proche de Collaborer (2.1)
        duration: 0.6, // Plus rapide
        ease: "hyperBounce" 
    })

    gsap.set("nav", { delay: delay + 3, overflow: "visible" })


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
  }, [delay]);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Animations du menu mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Animation du background du menu
      gsap.to('.mobile-menu', {
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        display: 'block'
      });

      // Animation des liens de navigation avec stagger (juste translation)
      gsap.fromTo('.mobile-nav-link',
        { y: '100%' },
        {
          y: '0%',
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          stagger: 0.1
        }
      );

      // Animation spécifique pour le CTA mobile (Fade in simple)
      gsap.fromTo('.mobile-menu .navbar-cta',
        { opacity: 0, y: 0 }, // S'assurer que y est à 0
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.5, // Apparait après les liens
          ease: 'hyperBounce'
        }
      );

      // Animation du footer du menu
      gsap.fromTo('.mobile-menu-footer a',
        { y: '100%' },
        {
          y: '0%',
          duration: 0.6,
          delay: 0.6,
          ease: 'power3.out',
          stagger: 0.08
        }
      );
    } else {
      // Animation de fermeture
      gsap.to('.mobile-menu', {
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set('.mobile-menu', { display: 'none' }); 
          // Reset des positions
          gsap.set('.mobile-nav-link', {
            y: '100%'
          });
          gsap.set('.mobile-menu-footer a', {
            y: '100%'
          });
          gsap.set('.mobile-menu .navbar-cta', {
            opacity: 0
          });
        }
      });
    }
  }, [isMobileMenuOpen]);

  const handleLinkHover = (e) => {
    if (!isDesktop) return; // 🚫 Désactivé si pas desktop
    
    // Gérer l'état de hover pour le curseur
    if (e.type === 'mouseenter' || e.type === 'mousemove') {
      setIsHoveringLink(true);
    } else if (e.type === 'mouseleave') {
      setIsHoveringLink(false);
    }

  };

  // Animation Roller One-Way (GSAP)
  const handleRollerEnter = (e) => {
    const target = e.currentTarget;
    const rollerInner = target.querySelector('.text-roller-inner');
    if(rollerInner) {
         // Reset invisible (Texte 1 == Texte 2)
         gsap.set(rollerInner, { y: "0%" });
         // Anim vers Texte 2
         gsap.to(rollerInner, {
            y: "-50%",
            duration: 0.5,
            ease: "cubic-bezier(0.4, 0, 0.2, 1)"
        });
    }
  };

  return (
    <>
      <header className={isMobileMenuOpen ? 'menu-open' : ''}>
        <div className='container'>
          <nav>
            <div className={`logo hover-this cs-scale ${pathname === '/' ? 'is-current' : ''}`} 
                 onClick={() => layersIn(`/`)}
                 onMouseEnter={(e) => { handleLinkHover(e); handleRollerEnter(e); }}
                 onMouseLeave={handleLinkHover}
            >
              <span className="text-roller-mask" style={{ transform: 'translateY(100%)', opacity: "0" }}>
                <span className="text-roller-inner">
                  <span>marin.</span>
                  <span>marin.</span>
                </span>
              </span>
            </div>

            {/* Desktop Links */}
            <div className="links desktop-links">
              <div className={`collaborer-link hover-this cs-scale ${pathname === '/collaborer' ? 'active is-current' : ''}`} 
                   onClick={() => layersIn(`/collaborer`)}
                   onMouseMove={handleLinkHover} 
                   onMouseEnter={(e) => { handleLinkHover(e); handleRollerEnter(e); }}
                   onMouseLeave={handleLinkHover}
              >
                <span className="text-roller-mask" style={{ transform: 'translateY(100%)', opacity: "0" }}>
                  <span className="text-roller-inner">
                    <span>Collaborer</span>
                    <span>Collaborer</span>
                  </span>
                </span>
              </div>
              <div className="contact-link">
                <MagneticCTA 
                   href='mailto:contact@marinleclerc.dev'
                   className='navbar-cta'
                />
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={`cursor ${isHoveringHeader ? 'hovering-header' : ''} ${isHoveringLink ? 'hovering-link' : ''}`} style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu - Outside header to avoid blend-mode conflicts */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-nav">
            <div className="nav-item-wrapper">
                <Link 
                  href="/" 
                  className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeMobileMenu();
                    layersIn('/');
                  }}
                >
                  Accueil
                </Link>
            </div>
            <div className="nav-item-wrapper">
                <Link 
                  href="/collaborer" 
                  className={`mobile-nav-link ${pathname === '/collaborer' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeMobileMenu();
                    layersIn('/collaborer');
                  }}
                >
                  Collaborer
                </Link>
            </div>
            <div className="cta-wrapper">
                <MagneticCTA 
                   href='mailto:contact@marinleclerc.dev'
                   className='navbar-cta'
                   lg={true}
                />
            </div>
          </nav>

          <div className="mobile-menu-footer">
            <div className="footer-item-wrapper">
                <a 
                  href="https://www.linkedin.com/in/marin-leclerc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mobile-social-link"
                >
                  LinkedIn
                </a>
            </div>
            <div className="footer-item-wrapper">
                <a 
                  href="mailto:contact@marinleclerc.dev" 
                  className="mobile-email-link"
                >
                  contact@marinleclerc.dev
                </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
