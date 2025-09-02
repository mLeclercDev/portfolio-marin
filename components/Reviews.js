import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/reviews.scss'
import '../styles/components/global/cursor.scss'

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create(
  "hyperBounce",
  "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
);

const Reviews = () => {
    const cursorContainersRef = useRef([]);
    const reviewsRef = useRef([]);
    const [mounted, setMounted] = useState(false); // pour gérer visibilité initiale

    useEffect(() => {
        setMounted(true); // le composant est monté, on peut montrer les cursor-container
    }, []);

    useEffect(() => {

        const titleAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: ".reviews h2",
                markers: false,
                start: 'top 50%',
            }
        });

        titleAnimation.to(".reviews h2 span.word-wrapper", {
            y: "0%", rotate: 0, duration: 1, ease: "hyperBounce"
        });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".reviews",
                markers: false,
                start: 'top 45%',
            }
        });

        timeline.to(".reviews span.line", {
            width: "100%",
            duration: 1.2,
            ease: "hyperBounce",
            stagger: 0.075
        });

        timeline.to(".reviews .reviews-wrapper .review .arrow svg.second", {
            delay: -1,
            opacity: 1,
            y: "-50%",
            x: "0%",
            duration: 0.5,
            ease: "hyperBounce",
            stagger: 0.05
        });

        timeline.to(".reviews .reviews-wrapper .review .name", {
            delay: -1,
            y: "0%", 
            rotate: 0,
            duration: 0.5,
            ease: "hyperBounce",
            stagger: 0.05
        });

        const cursorContainers = cursorContainersRef.current;
        const reviews = reviewsRef.current;

        const moveCursors = (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorContainers.forEach(cursor => {
                cursor.style.left = `${posX}px`;
                cursor.style.top = `${posY}px`;
            });
        };

        const handleMouseEnter = (e) => {
            const index = e.target.getAttribute('data-index');
            const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
            if (cursor) cursor.classList.add('active');

            reviews.forEach((review, i) => {
                if (i + 1 === Number(index)) review.classList.add('active');
                else review.classList.add('unactive');
            });
        };

        const handleMouseLeave = (e) => {
            const index = e.target.getAttribute('data-index');
            const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
            if (cursor) cursor.classList.remove('active');

            reviews.forEach(review => {
                review.classList.remove('active', 'unactive');
            });
        };

        window.addEventListener("mousemove", moveCursors);

        const options = { root: null, rootMargin: '0px', threshold: 0.5 };
        const reviewObservers = [];
        reviews.forEach(review => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        review.addEventListener('mouseenter', handleMouseEnter);
                        review.addEventListener('mouseleave', handleMouseLeave);
                    } else {
                        review.removeEventListener('mouseenter', handleMouseEnter);
                        review.removeEventListener('mouseleave', handleMouseLeave);
                    }
                });
            }, options);
            reviewObservers.push(observer);
            observer.observe(review);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursors);
            reviewObservers.forEach(observer => observer.disconnect());
        };
    }, []);

    return (
        <section className="reviews">
            {/** cursor-container initialement invisible */}
            {mounted && (
            <div
                className="cursor-container"
                data-index="1"
                data-cursor-container
                ref={el => cursorContainersRef.current[0] = el}
                style={{ visibility: mounted ? 'visible' : 'hidden' }}
            >
                <Image className='fit-cover' src="/Images/killian-lebras.webp" alt="Killian" width={444} height={444} />
            </div>
            )}
            {mounted && (
            <div
                className="cursor-container"
                data-index="2"
                data-cursor-container
                ref={el => cursorContainersRef.current[1] = el}
                style={{ visibility: mounted ? 'visible' : 'hidden' }}
            >
                <Image className='fit-cover' src="/Images/zoe-ringenbach.png" alt="Zoé" width={666} height={666} />
            </div>
                )}
            {mounted && (
            <div
                className="cursor-container"
                data-index="3"
                data-cursor-container
                ref={el => cursorContainersRef.current[2] = el}
                style={{ visibility: mounted ? 'visible' : 'hidden' }}
            >
                <Image className='fit-cover' src="/Images/killian-lebras.webp" alt="Murielle" width={1150} height={520} />
            </div>
            )}

            <div className='container'>
                <h2>
                    <span className='word-wrapper'>Reviews</span>
                </h2>
                <div className='reviews-wrapper'>
                    <a href='https://www.linkedin.com/in/killian-le-bras/' target='_blank' className='review' data-index='1' ref={el => reviewsRef.current[0] = el}>
                        <div className='name-wrapper'><div className='name'>Killian Lebras</div></div>
                        <div className='quote'>Great collaboration with Marin on a WordPress project. Professional, meticulous, and responsive, I highly recommend him!</div>
                        <div className='arrow'>
                            <svg className='first' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                            </svg>
                            <svg className='second' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                            </svg>
                        </div>
                        <span className='line'></span>
                    </a>
                    <a href='https://www.linkedin.com/in/zo%C3%A9-ringenbach-directrice-artistique/' target='_blank' className='review' data-index='2' ref={el => reviewsRef.current[1] = el}>
                        <div className='name-wrapper'><div className='name'>Zoé Ringenbach</div></div>
                        <div className='quote'>Marin perfectly understood my needs and expectations for my photography portfolio. Professional, creative, and meticulous, I highly recommend him.</div>
                        <div className='arrow'>
                            <svg className='first' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                            </svg>
                            <svg className='second' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                            </svg>
                        </div>
                        <span className='line'></span>
                    </a>
                    <a href='http://muriellepariscreations.fr/' target='_blank' className='review' data-index='3' ref={el => reviewsRef.current[2] = el}>
                        <div className='name-wrapper'><div className='name'>Murielle Paris</div></div>
                        <div className='quote'>Working with him was a seamless experience. He perfectly captured the essence of Murielle Paris Creations, creating a website that showcases her handcrafted work. Professional, attentive, and highly skilled.</div>
                        <div className='arrow'>
                            <svg className='first' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                            </svg>
                            <svg className='second' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                            </svg>
                        </div>
                        <span className='line'></span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
