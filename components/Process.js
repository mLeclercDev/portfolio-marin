import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { useScrollContext } from './global/ScrollContext';
import Image from 'next/image';
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
          <svg viewBox="0 0 889 150"
          preserveAspectRatio="xMidYMid meet" width="100%" height="100%"
          fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50.4859 97H22.6859V147H0.685938V3.39999H50.4859C82.6859 3.39999 103.486 19.8 103.486 49.8C103.486 80 82.6859 97 50.4859 97ZM50.2859 22H22.6859V78.4H50.2859C69.6859 78.4 81.4859 67.8 81.4859 50C81.4859 32.2 69.6859 22 50.2859 22ZM141.491 147H119.491V3.39999H173.091C206.091 3.39999 225.891 19.6 225.891 48.2C225.891 68.8 212.891 84.6 191.091 89.8L230.091 147H203.691L167.891 93H141.491V147ZM141.491 21.8V74.6H171.691C192.091 74.6 203.691 65.6 203.691 48.2C203.691 31 192.091 21.8 171.691 21.8H141.491ZM308.364 150C266.764 150 235.364 117.4 235.364 75C235.364 32.6 266.764 0.399992 308.364 0.399992C349.964 0.399992 381.364 32.6 381.364 75C381.364 117.4 349.964 150 308.364 150ZM308.364 130.2C338.764 130.2 358.564 105.8 358.564 75C358.564 44.2 338.764 20.2 308.364 20.2C277.964 20.2 258.164 44.2 258.164 75C258.164 105.8 277.964 130.2 308.364 130.2ZM460.716 150C420.716 150 389.716 117.4 389.716 75C389.716 32.8 420.716 0.399992 460.716 0.399992C496.716 0.399992 525.516 24.4 530.916 59.8H507.516C503.516 36.6 484.716 20.2 460.916 20.2C432.516 20.2 412.516 43.2 412.516 75C412.516 107.2 432.516 130.2 460.916 130.2C484.716 130.2 503.516 113.6 507.516 90.4H530.916C525.516 126 496.716 150 460.716 150ZM638.78 127.8V147H547.78V3.39999H637.38V22.6H569.78V63.4H631.38V82.6H569.78V127.8H638.78ZM763.577 105C763.577 130 743.577 149 708.777 149C674.177 149 653.177 130 651.377 101.4H673.777C674.777 119.6 686.377 131.4 708.377 131.4C726.577 131.4 740.177 122.8 740.177 108C740.177 96 732.377 90 715.777 86.4L694.977 82.4C674.777 78.4 656.377 68.2 656.377 43.8C656.377 19.6 677.577 1.39999 707.377 1.39999C737.177 1.39999 759.777 19.6 761.577 48.2H739.177C737.977 31 725.577 19 707.577 19C688.977 19 678.777 30 678.777 42.4C678.777 56 690.577 60.8 703.977 63.6L725.177 67.8C749.777 72.8 763.577 83.6 763.577 105ZM888.045 105C888.045 130 868.045 149 833.245 149C798.645 149 777.645 130 775.845 101.4H798.245C799.245 119.6 810.845 131.4 832.845 131.4C851.045 131.4 864.645 122.8 864.645 108C864.645 96 856.845 90 840.245 86.4L819.445 82.4C799.245 78.4 780.845 68.2 780.845 43.8C780.845 19.6 802.045 1.39999 831.845 1.39999C861.645 1.39999 884.245 19.6 886.045 48.2H863.645C862.445 31 850.045 19 832.045 19C813.445 19 803.245 30 803.245 42.4C803.245 56 815.045 60.8 828.445 63.6L849.645 67.8C874.245 72.8 888.045 83.6 888.045 105Z" fill="#110F09"/>
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