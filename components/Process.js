import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { useScrollContext } from './global/ScrollContext';
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/process.scss'

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create(
  "hyperBounce",
  "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
);

const Process = ({ process }) => {
    useEffect(() => {

        var titleAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: ".process",
                markers: false,
                start: 'top 90%',
                end: '700px 90%',
                scrub: 1 
            }
        });

        titleAnimation.to(".process .title-wrapper svg", {
            y: "15%",
            ease: "hyperBounce",
        })

        var processAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: ".process",
                markers: false,
                start: 'top 90%',
            }
        });

/*         processAnimation.to(".process h3 span", {
            y: "0%", rotate: 0, duration: 1, ease: "hyperBounce"
        }) */
        processAnimation.to(".process span.line", {
            delay: -0.8,
            width: "100%",
            duration: 1.5,
            ease: "hyperBounce",
            stagger: 0.075
        })
    });
  return (
    <section className="process">
      <div className="container">
        <div className='title-wrapper'>
          <svg viewBox="0 0 418 80" 
          preserveAspectRatio="xMidYMid meet" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M54.2 22.1C55.2 30.8 52.9 37.3 48.4 41.5C47.8 42.1 46.6 43.2 45.6 43.9C45.6 43.9 45.6 43.9 45.5 44C41.4 46.7 36 48.2 26.2 48.4H19.7C19.2 48.4 11 48.4 11 48.4V73H0.2V2.9L28.5 2.8C48.4 2.5 53.5 16.4 54.2 22.1ZM26.5 37.9C39.4 37.9 42.7 32 42.7 26.1C42.7 18.1 38.5 12.9 26.5 12.9L11 13V37.8H11.8L26.5 37.9ZM105.712 59.2C108.512 68.2 112.312 73.2 112.312 73.2H98.3117C98.3117 73.2 96.6117 70.4 93.9117 60.3C90.7117 48 80.1117 43.9 73.9117 43.9H73.7117C73.2117 43.9 69.7117 43.9 69.7117 43.9V73.2H58.2117V3.49999H81.6117C100.712 2.9 105.912 13 107.112 19.1C108.312 25.4 106.712 32.5 102.412 37.2C98.8117 41 90.2117 41.6 90.2117 41.6C97.1117 42.9 102.512 49.1 105.712 59.2ZM84.1117 34.6C94.4117 34.6 96.4117 27.9 96.0117 23.2C95.7117 18.8 92.2117 13.4 83.3117 13.5L69.7117 13.6V34.6H70.4117H84.1117ZM148.814 2.5C170.614 2.5 183.314 17.2 183.314 38.4C183.314 60.1 169.414 74.2 148.814 74.2C127.714 74.2 114.314 62.1 114.314 38.4C114.314 14.6 129.814 2.5 148.814 2.5ZM148.814 65C161.714 65 171.714 54.6 171.714 38.3C171.714 22.5 161.714 11.7 148.814 11.7C136.014 11.7 125.814 21.7 125.814 38.5C125.914 56 135.314 65 148.814 65ZM236.816 55.3L247.916 57.7C247.916 57.7 242.616 73.8 220.016 73.8C200.916 73.8 187.116 61 187.516 36.3C187.816 13.9 202.016 2 219.616 2C243.316 2 247.516 20.3 247.516 20.3L236.816 22C236.816 22 233.116 12 219.916 12.2C214.616 12.3 209.216 13.3 204.916 18.1C200.516 23 199.116 30.4 199.216 37.9C199.316 45.5 201.916 53.7 206.216 57.9C210.116 61.7 215.216 63.2 220.816 63.4C233.916 63.8 236.816 55.3 236.816 55.3ZM301.415 3.49999V13.1H264.715V32.1L293.315 32V42.5H264.915V63.2H301.415V73.2H254.415V3.49999H301.415ZM342.032 35.2C350.632 38.2 358.332 42.5 359.132 54.4C360.732 75.8 324.932 79.9 312.532 67.7C308.832 64.2 307.332 60.7 306.832 59L317.032 55.1C317.032 55.1 318.232 62.2 328.732 64C344.732 66.7 350.732 55.8 345.832 49.9C342.032 45.4 334.932 44.2 329.832 42.6C322.932 40.5 318.532 38.7 314.032 35.3C303.632 27.2 308.532 12.4 314.132 8.2C322.732 0.599996 336.332 1.8 343.332 3.8C346.632 4.7 353.432 8.7 356.732 17.8L346.732 21.9C346.732 21.9 346.232 19.3 343.632 16.2C339.832 11.6 330.432 11.1 325.032 13.4C320.132 15.4 316.932 20.9 320.732 26.1C323.732 30.2 332.132 31.8 342.032 35.2ZM398.677 35.2C407.277 38.2 414.977 42.5 415.777 54.4C417.377 75.8 381.577 79.9 369.177 67.7C365.477 64.2 363.977 60.7 363.477 59L373.677 55.1C373.677 55.1 374.877 62.2 385.377 64C401.377 66.7 407.377 55.8 402.477 49.9C398.677 45.4 391.577 44.2 386.477 42.6C379.577 40.5 375.177 38.7 370.677 35.3C360.277 27.2 365.177 12.4 370.777 8.2C379.377 0.599996 392.977 1.8 399.977 3.8C403.277 4.7 410.077 8.7 413.377 17.8L403.377 21.9C403.377 21.9 402.877 19.3 400.277 16.2C396.477 11.6 387.077 11.1 381.677 13.4C376.777 15.4 373.577 20.9 377.377 26.1C380.377 30.2 388.777 31.8 398.677 35.2Z" fill="#110F09"/>
          </svg>
        </div>
{/*         <h3>
          <span>Process</span>
        </h3> */}

        {process?.map((step, index) => (
          <div className="step-wrapper" key={index}>
            <span className='line'></span>
            <div className="flex-wrapper">
              <div className="index">
                {index + 1}.
              </div>
              <div className="step-title">
                {step.title}
              </div>
            </div>
            <div
              className="step-description"
              dangerouslySetInnerHTML={{ __html: step.description }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;