import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/reviews.scss'
import '../styles/components/global/cursor.scss'

const Reviews = () => {
    const cursorContainersRef = useRef([]);
    const reviewsRef = useRef([]);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger); // Enregistrez ScrollTrigger

        var titleAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: ".reviews h2",
                markers: true,
                start: 'top 50%',
            }
        });

        titleAnimation.to(".reviews h2 span.word-wrapper", {
            y: "0%", rotate: 0, duration: 1, ease: "cubic-bezier(0.4,0,0.2,1)"
        })

        var timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".reviews",
                markers: false,
                start: 'top 30%',
            }
        });
      
        timeline.to(".reviews span.line", {
            width: "100%",
            duration: 1.45,
            ease: "cubic-bezier(0.4,0,0.2,1)",
            stagger: 0.05
        })

        const cursorContainers = cursorContainersRef.current;
        const reviews = reviewsRef.current;

        const moveCursors = (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorContainers.forEach(cursor => {
                cursor.style.left = `${posX}px`;
                cursor.style.top = `${posY}px`;
            });
        }

        const handleMouseEnter = (e) => {
            const index = e.target.getAttribute('data-index');
            const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
            if (cursor) {
                cursor.classList.add('active');
            }

            reviews.forEach((review, i) => {
                if (i + 1 == index) {
                    review.classList.add('active');
                } else {
                    review.classList.add('unactive');
                }
            });
        };

        const handleMouseLeave = (e) => {
            const index = e.target.getAttribute('data-index');
            const cursor = document.querySelector(`[data-cursor-container][data-index="${index}"]`);
            if (cursor) {
                cursor.classList.remove('active');
            }

            reviews.forEach(review => {
                review.classList.remove('active', 'unactive');
            });
        };

        window.addEventListener("mousemove", moveCursors);

        // Initialize Intersection Observers for reviews
        const options = { 
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Adjust as needed
        };

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

        // Cleanup function
        return () => {
            window.removeEventListener("mousemove", moveCursors);
            reviewObservers.forEach(observer => observer.disconnect());
        };
    }, []);
    
    return (
        <section className="reviews">
            <div className="cursor-container" data-index="1" data-cursor-container ref={el => cursorContainersRef.current[0] = el}>
                <Image className='fit-cover' src="/Images/layer-1.png" alt="Mon image" width={1150} height={520} />
            </div>
            <div className="cursor-container" data-index="2" data-cursor-container ref={el => cursorContainersRef.current[1] = el}>
                <Image className='fit-cover' src="/Images/layer-2.png" alt="Mon image" width={1150} height={520} />
            </div>
            <div className="cursor-container" data-index="3" data-cursor-container ref={el => cursorContainersRef.current[2] = el}>
                <Image className='fit-cover' src="/Images/layer-3.png" alt="Mon image" width={1150} height={520} />
            </div>
            <div className='container'>
                <h2>
                    <span className='word-wrapper'>
                    Reviews
                    </span>
                </h2>
                <div className='reviews-wrapper'>
                    <div className='review' data-index='1' ref={el => reviewsRef.current[0] = el}>
                        <div className='name'>
                            Emma Stone
                        </div>
                        <div className='right-content'>
                            <div className='quote'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et urna et velit fermentum congue eget luctus nisi. Nam velit lectus, tincidunt in magna sed, mattis lacinia lectus.
                            </div>
                            <div className='arrow'>
                                <svg className='first' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                    <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                                </svg>
                                <svg className='second' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                    <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <span className='line'></span>
                    </div>
                    <div className='review' data-index='2' ref={el => reviewsRef.current[1] = el}>
                        <div className='name'>
                            Ewen Tortelier
                        </div>
                        <div className='right-content'>
                            <div className='quote'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et urna et velit fermentum congue eget luctus nisi. Nam velit lectus, tincidunt in magna sed, mattis lacinia lectus.
                            </div>
                            <div className='arrow'>
                                <svg className='first' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                    <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                                </svg>
                                <svg className='second' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                    <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <span className='line'></span>
                    </div>
                    <div className='review' data-index='3' ref={el => reviewsRef.current[2] = el}>
                        <div className='name'>
                            Elizabeth Moraes
                        </div>
                        <div className='right-content'>
                            <div className='quote'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et urna et velit fermentum congue eget luctus nisi. Nam velit lectus, tincidunt in magna sed, mattis lacinia lectus.
                            </div>
                            <div className='arrow'>
                                <svg className='first' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                    <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                                </svg>
                                <svg className='second' xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                    <path d="M0 8H32.1975L0.322502 39.875L5.625 45.1775L37.5 13.3025V45.5H45V0.5H0V8Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                        <span className='line'></span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
