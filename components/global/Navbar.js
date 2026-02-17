import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from "next/navigation"
import Link from 'next/link';
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { animatePageOut } from "../../utils/animations"
import MagneticCTA from './MagneticCTA';
import ContactPanel from '../ContactPanel';

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
  const [isContactOpen, setIsContactOpen] = useState(false);

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
    gsap.set("nav .page-link .text-roller-mask", { opacity: 1 }) 
    
    // 1. Initialisation : Opacité 1 pour le conteneur, on anime le contenu
    gsap.set("nav .contact-link", { opacity: 1 });
    
    gsap.to("nav .logo .text-roller-mask", { y: "0%", delay: delay + 2, duration: 0.8, ease: "hyperBounce" })
    gsap.to("nav .page-link .text-roller-mask", { y: "0%", delay: delay + 2.05, duration: 0.8, ease: "hyperBounce" })

    // === ANIMATION MAGNETIC CTA NAVBAR ===
    const navCta = document.querySelector("nav .contact-link .navbar-cta");
    // Force transition none to avoid conflict with CSS inside existing effect
    if(navCta) gsap.set(navCta, { transition: "none" });

    const navCtaText = navCta ? navCta.querySelector(".text-roller-inner") : null;
    const navCtaArrow = navCta ? navCta.querySelector(".arrow svg.first") : null;

    if (navCta && navCtaText && navCtaArrow) {
        // Hide content initially
        gsap.set(navCtaText, { y: "110%" }); 
        gsap.set(navCtaArrow, { y: "100%", x: "-100%" }); // En bas à gauche

        // Base delay for this sequence (juste après les liens pages)
        const startDelay = delay + 2.2;

        // 1. Capsule Scale (Black shell)
        gsap.fromTo(navCta, 
            { scale: 0, y: 5, opacity: 0 },
            { 
                scale: 1, 
                duration: 1, 
                opacity: 1,
                y: 0,
                delay: startDelay,
                ease: "power3.out",
                onComplete: () => {
                     gsap.set(navCta, { clearProps: "transition" });
                }
            }
        );

        // 2. Text Reveal
        gsap.to(navCtaText, {
            y: "0%",
            duration: 0.8,
            delay: startDelay + 0.3,
            ease: "power3.out"
        });
        
        // 3. Arrow Reveal
        gsap.to(navCtaArrow, {
            y: "-50%",
            x: "0%",
            duration: 0.75,
            delay: startDelay + 0.4,
            ease: "power3.out"
        });
    }

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

      // Animation spécifique pour le CTA mobile (Complex Reveal)
      const mobileCta = document.querySelector('.mobile-menu .navbar-cta');
      if (mobileCta) {
          const t = mobileCta.querySelector(".text-roller-inner");
          const a = mobileCta.querySelector(".arrow svg.first");
          
          gsap.set(mobileCta, { transition: "none" });
          if(t) gsap.set(t, { y: "110%" });
          if(a) gsap.set(a, { y: "100%", x: "-100%" });

          // 1. Capsule
          gsap.fromTo(mobileCta,
            { scale: 0, y: 5, opacity: 0 }, 
            {
              scale: 1, y: 0, opacity: 1,
              duration: 1,
              delay: 0.5,
              ease: 'power3.out',
              onComplete: () => gsap.set(mobileCta, { clearProps: "transition" })
            }
          );
          
          // 2. Text
          if(t) {
              gsap.to(t, {
                  y: "0%",
                  duration: 0.8,
                  delay: 0.8, // 0.5 + 0.3
                  ease: "power3.out"
              });
          }

          // 3. Arrow
          if(a) {
              gsap.to(a, {
                  y: "-50%",
                  x: "0%",
                  duration: 0.75,
                  delay: 0.9, // 0.5 + 0.4
                  ease: "power3.out"
              });
          }
      }

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
            opacity: 0,
            scale: 0
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
              <div className={`page-link hover-this cs-scale ${pathname === '/services' ? 'active is-current' : ''}`} 
                   onClick={() => layersIn(`/services`)}
                   onMouseMove={handleLinkHover} 
                   onMouseEnter={(e) => { handleLinkHover(e); handleRollerEnter(e); }}
                   onMouseLeave={handleLinkHover}
              >
                <span className="text-roller-mask" style={{ transform: 'translateY(100%)', opacity: "0" }}>
                  <span className="text-roller-inner">
                    <span>Services</span>
                    <span>Services</span>
                  </span>
                </span>
              </div>
              <div className={`page-link hover-this cs-scale ${pathname === '/collaborer' ? 'active is-current' : ''}`} 
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
                   href='#'
                   onClick={(e) => { e.preventDefault(); setIsContactOpen(true); }}
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
                  href="/services" 
                  className={`mobile-nav-link ${pathname === '/services' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeMobileMenu();
                    layersIn('/services');
                  }}
                >
                  Services
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
                   href='#'
                   onClick={(e) => { e.preventDefault(); closeMobileMenu(); setIsContactOpen(true); }}
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
                <button 
                   onClick={() => { closeMobileMenu(); setIsContactOpen(true); }}
                  className="mobile-email-link"
                  style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }}
                >
                  contact@marinleclerc.dev
                </button>
            </div>
          </div>
        </div>
      </div>

      <ContactPanel isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Navbar;
