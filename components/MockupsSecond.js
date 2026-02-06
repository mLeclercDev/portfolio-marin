import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/mockups-second.scss'
import '../styles/components/global/cursor.scss'

const MockupsSecond = ({ videos }) => {
    const cursorContainersRef = useRef([]);
    const reviewsRef = useRef([]);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const videoRefs = useRef([]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 992px)");
        const handleMediaQueryChange = (event) => {
            setIsLargeScreen(event.matches);
        };
        // Vérifiez la taille de l'écran au montage du composant
        handleMediaQueryChange(mediaQuery);
        // Ajoutez un écouteur pour détecter les changements de taille d'écran
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        // Nettoyez l'écouteur d'événement lors du démontage du composant
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);
    
    useEffect(() => {
        if (!isLargeScreen) return;

        gsap.registerPlugin(ScrollTrigger);

        const mainElement = document.querySelector("main");
        const races = document.querySelector(".horizontal-spacer");
        const wrapper = document.querySelector(".horizontal-wrapper");
        const firstMockup = document.querySelector(".mockup-section:first-child");
        const lastMockup = document.querySelector(".mockup-section:last-child");
        const wrapperWidth = wrapper.offsetWidth;
        const firstMockupWidth = firstMockup.offsetWidth;
        const difference = (wrapperWidth - firstMockupWidth) / 2;
        const otherDifference = (mainElement.offsetWidth - races.offsetWidth) / 2;

        // Apply the margin-left to the first mockup
        firstMockup.style.marginLeft = `${difference}px`;
        lastMockup.style.marginRight = `${difference}px`;

        function getScrollAmount() {
            let racesWidth = races.scrollWidth + difference + otherDifference;
            return -(racesWidth - window.innerWidth);
        }

        const tween = gsap.to(races, {
            x: getScrollAmount,
            duration: 10,
            ease: "none",
        });

        const progress = gsap.to(".mockups-second .progress-bar", {
            width: "100%",
            duration: 10,
            delay: -10,
            ease: "none"
        });

        const timeline = gsap.timeline();
        timeline.add(tween).add(progress);

        ScrollTrigger.create({
            trigger: ".mockups-second",
            start: "top 00%",
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            ease: "none",
            animation: timeline,
            scrub: 1,
            invalidateOnRefresh: true,
            markers: false,
            pinSpacing: true,
            fastScrollEnd: true,
            anticipatePin: 1,
        });

        ScrollTrigger.create({
            trigger: ".process",
            start: "top center",
            end: "bottom 10%",
            markers: false,
            onLeave: () => {
                gsap.to(mainElement, { backgroundColor: "#110F09", duration: 0.75, ease: "cubic-bezier(0.4,0,0.2,1)" });
                gsap.to(".mockups-second", { opacity: 1, duration: 0.75, ease: "cubic-bezier(0.4,0,0.2,1)" });
            },
            onEnterBack: () => {
                gsap.to(mainElement, { backgroundColor: "#FCFBF6", duration: 0.75, ease: "cubic-bezier(0.4,0,0.2,1)" });
                gsap.to(".mockups-second", { opacity: 0, duration: 0.75, ease: "cubic-bezier(0.4,0,0.2,1)" });
            },
        });

        const pinElementHeight = document.querySelector(".mockups-second").offsetHeight;

        ScrollTrigger.create({
            trigger: ".mockups-second",
            start: `top+=${pinElementHeight} center`,
            end: `top+=${pinElementHeight} center`,
            markers: false,
            onLeave: () => {
                gsap.to(mainElement, { backgroundColor: "#FCFBF6", duration: 0.75, ease: "cubic-bezier(0.4,0,0.2,1)" });
                gsap.to(".mockups-second", { opacity: 0, duration: 0.75, ease: "cubic-bezier(0.4,0,0.2,1)" });
            },
            onEnterBack: () => {
                gsap.to(mainElement, { backgroundColor: "#110F09", duration: 0.75, ease: "cubic-bezier(0.4,0,0.2,1)" });
                gsap.to(".mockups-second", { opacity: 1, duration: 0.75, ease: "cubic-bezier(0.4,0,0.2,1)" });
            },
        });

    }, [isLargeScreen]);

    // ──────────────── Force autoplay sur mobile ────────────────
    useEffect(() => {
        if (isLargeScreen) return;
        videoRefs.current.forEach(video => {
            if (!video) return;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        });
    }, [isLargeScreen, videos]);

    return (
        <section className="mockups-second">
            <div className='horizontal-wrapper'>
                <div className='horizontal-spacer'>
                    {videos.map((video, i) => (
                        <div className='mockup-section' key={i}>
                            <video
                                ref={el => videoRefs.current[i] = el}
                                className='mockup-video fit-cover'
                                src={video.fields.file.url.startsWith('http') ? video.fields.file.url : `https:${video.fields.file.url}`}
                                width="1440"
                                height="810"
                                muted
                                loop
                                autoPlay
                                playsInline
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='progress-wrapper'>
                <span className='complete-bar'></span>
                <span className='progress-bar'></span>
            </div>
        </section>
    );
};

export default MockupsSecond;
