import '../../styles/components/global/footer.scss';
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Matter from 'matter-js';

const currentYear = new Date().getFullYear();

const Footer = ({ triggerSelector }) => {
    const [isRendered, setIsRendered] = useState(false);
    const [marqueeDuration, setMarqueeDuration] = useState(130); // Initial value for marquee duration
    const canvasRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {

    var timeline = gsap.timeline({
        scrollTrigger: {
            trigger: triggerSelector,
            markers: false,
            start: 'bottom 100%',
            scrub: true,
            once: true
        }
    });
    
    timeline.to("footer span.line", {
        width: "100%",
        ease: "cubic-bezier(0.4,0,0.2,1)",
    })
/*     console.clear(); */

    
    // =============================
    gsap.set('.wrapper',{xPercent:-50,yPercent:-50})

    var boxWidth = 1970,
    totalWidth = boxWidth * 14,  //  * n of boxes
    no01 = document.querySelectorAll("#no01 .box"),
    dirFromLeft = "+=" + totalWidth;

    var mod = gsap.utils.wrap(0, totalWidth);

    function marquee(which, time, direction){
    gsap.set(which, {
        x:function(i) {
        return i * boxWidth;
        }
    });
    var action = gsap.timeline()
    .to(which,  {
    x: direction,
    modifiers: {
        x: x => mod(parseFloat(x)) + "px"
    },
        duration:time, ease:'none',
        repeat:-1,
    });
    return action
    }

    var master = gsap.timeline({paused:true})
    .add(marquee(no01, marqueeDuration, dirFromLeft))

    // =============================

    ScrollTrigger.create({
    trigger: triggerSelector,
    start: 'bottom 80%',
    onEnter: isActive => master.play(),
    //onLeave: isActive => master.pause(),
    //onLeaveBack: isActive => master.pause(),
    onEnterBack: isActive => master.play(),
    markers:false,
    onUpdate: self => {
        //var speed = self.progress.toFixed(2)*2
        //master.timeScale(speed)
    } 
    })

    }, [])

    useEffect(() => {
        const divTest = document.querySelector('.canvas-wrapper');
        // Récupère la hauteur et la largeur
        const largeur = divTest.offsetWidth;
        const hauteur = divTest.offsetHeight;

    const canvas = canvasRef.current;
    const engine = Matter.Engine.create();
    const world = engine.world;
    
        // Fonction pour démarrer la chute des objets
    const startObjectFall = () => {
        // Code pour démarrer la chute des objets
        const render = Matter.Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: largeur,
                height: hauteur,
                wireframes: false,
                background: "transparent"
            }
        });

        Matter.Render.run(render);

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        // Create walls
        const screenWidth = largeur;
        const screenHeight = hauteur;
        const wallThickness = 30;

        // Définir une couleur transparente
        const transparentColor = 'rgba(0, 0, 0, 0)';

        const bottomWall = Matter.Bodies.rectangle(screenWidth / 2, screenHeight, screenWidth, wallThickness, { isStatic: true, render: {
            fillStyle: transparentColor, // Utiliser la couleur transparente
            strokeStyle: transparentColor // Utiliser la couleur transparente pour les contours
        } });
        const rightWall = Matter.Bodies.rectangle(screenWidth, screenHeight / 2, wallThickness, screenHeight, { isStatic: true, render: {
            fillStyle: transparentColor, // Utiliser la couleur transparente
            strokeStyle: transparentColor // Utiliser la couleur transparente pour les contours
        } });
        const leftWall = Matter.Bodies.rectangle(0, screenHeight / 2, wallThickness, screenHeight, { isStatic: true, render: {
            fillStyle: transparentColor, // Utiliser la couleur transparente
            strokeStyle: transparentColor // Utiliser la couleur transparente pour les contours
        } });

        Matter.World.add(world, [bottomWall, rightWall, leftWall]);


        // You can use your images here to create bodies instead of circles
        const images = [
            { src: '/matter-js/wordpress.svg', width: 280, height: 53 },
            { src: '/matter-js/webflow.svg', width: 227, height: 44 },
            { src: '/matter-js/next-js.svg', width: 200, height: 43 },
            { src: '/matter-js/r3f.svg', width: 97, height: 43 },
            { src: '/matter-js/gsap.svg', width: 145, height: 43 },
            { src: '/matter-js/hubspot.svg', width: 227, height: 54 },
            { src: '/matter-js/react-js.svg', width: 226, height: 43 },
            // Add more image objects here
        ];

        images.forEach((image, index) => {
            const x = Math.random() * largeur;
            const y = -Math.random() * 100;

            // Ajuster la position pour que l'image soit centrée sur son point de rotation
            const scaleFactor = window.innerWidth < 982 ? 0.7 : 1;
            const width = image.width * scaleFactor;
            const height = image.height * scaleFactor;

            const xScale = width / image.width;
            console.log("xScale : ", xScale)
            const yScale = height / image.height;
            console.log("yScale : ", yScale)

            const body = Matter.Bodies.rectangle(x, y, width, height, {
                render: {
                    sprite: {
                        texture: image.src,
                        xScale: xScale,
                        yScale: yScale
                    }
                },
                restitution: 0.1, // Réglage de la restitution pour que les images rebondissent
                friction: 0.2, // Réduire la friction pour que les éléments glissent plus facilement
                isStatic: false, // Définir le corps comme non statique pour qu'il puisse se déplacer
                density: 0.1,
                angle: 0, // Définir l'angle à 0 pour éviter toute rotation

                // Ajouter une rotation de 90 degrés pour aligner correctement l'image
            });

            Matter.World.add(world, body);
        });

        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        };
    };

    // Initialisation de ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    var timeline = gsap.timeline({
        scrollTrigger: {
        trigger: triggerSelector, // Sélecteur pour le déclencheur
        start: 'bottom 60%', // Déclenche le défilement lorsque le déclencheur atteint le milieu de la fenêtre
        onEnter: () => {
            startObjectFall(); // Appelle la fonction pour démarrer la chute des objets
        },
        markers: false,
        once: true, // Déclenche l'événement une seule fois
        }
    });

    }, []); 
    
      useEffect(() => {
        setIsRendered(true);
      }, []);
      
  return (
    <footer ref={footerRef}>
        <div id="no01" className="wrapper">
            <div className="boxes">
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
                <div className="box">On échange ? - </div>
            </div>
        </div>
        <div className='canvas-wrapper'>
            <canvas id="matter-container" ref={canvasRef}  />
        </div>
        <div className='container'>
            <div className='flex-wrapper'>
                <span className='line'></span>
                <div>
                @{currentYear} concept by Marin Leclerc
                </div>
                <div className='socials'>
                    <a href='https://www.linkedin.com/in/marin-leclerc/'>
                        Linkedin
                    </a>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;