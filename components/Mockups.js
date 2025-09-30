import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/mockups.scss';
import '../styles/components/global/cursor.scss';

const Mockups = ({ images }) => {
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
                  className={`smartphone white`}
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