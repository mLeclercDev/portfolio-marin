import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/mockups.scss';
import '../styles/components/global/cursor.scss';

const Mockups = ({ images }) => {
  useEffect(() => {

    // --- check mobile
    const isMobile = window.matchMedia("(max-width: 992px)").matches;

    if (isMobile) {
      // Directement appliquer la classe en mobile à tous les smartphones
      const smartphones = document.querySelectorAll(".mockups .smartphone");
      smartphones.forEach(phone => phone.classList.add("view"));
      return; // on sort, pas besoin d'animations scroll
    }

    gsap.registerPlugin(ScrollTrigger);

    // Choisir l’offset selon la taille d’écran
    const getOffset = () => {
      if (window.innerWidth < 992) return 'top 95%';   // mobile
      return 'top+=2020 75%';                               // desktop
    };

    gsap.utils.toArray(".mockups .smartphone").forEach((phone, i) => {
      gsap.to(phone, {
        scrollTrigger: {
          trigger: phone,
          start: getOffset(),
          markers: false,
          onEnter: () => phone?.classList.add("view"),
        },
        delay: i * 0.05,
      });
    });
  }, []);

  // Grouper les images par 2 pour former des lignes
  const rows = [];
  for (let i = 0; i < images.length; i += 2) {
    rows.push(images.slice(i, i + 2));
  }

  return (
    <section className="mockups">
      <div className="container">
        {rows.map((pair, rowIndex) => {
          const isEvenRow = rowIndex % 2 !== 0;

          return (
            <div className="row" key={rowIndex}>
              {/* Ligne paire : empty en premier */}
              {isEvenRow && <div className="smartphone empty" />}

              {pair.map((image, i) => (
                <div
                  key={i}
                  className={`smartphone ${i % 2 === 0 ? 'white' : 'black'}`}
                >
                  <div className="inner">
                    <Image
                      className="fit-cover"
                      src={`https:${image.fields.file.url}`}
                      alt={image.fields.title || `mockup-${i}`}
                      width={860}
                      height={1690}
                    />
                  </div>
                </div>
              ))}

              {/* Ligne impaire : empty à la fin */}
              {!isEvenRow && <div className="smartphone empty" />}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Mockups;