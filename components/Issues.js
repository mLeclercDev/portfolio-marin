// components/HeroSectionProject.js
import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import { SplitText } from "@cyriacbr/react-split-text";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/issues.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hyperBounce", "0.4,0,0.2,1");

const Issues = ({ problematicTitle, problematic_content }) => {

  console.log("problematicTitle : ", problematicTitle)

  return (
    <section className="issues-project" key={problematicTitle}>
      <div className="container">
        <div className="flex-wrapper">
          <div className="title-wrapper">
            <h2 className="content-h2">
              Les problématiques <span>majeurs</span> du projet.
            </h2>
          </div>
          <div className="content-wrapper">
          {problematic_content?.map((item, index) => (
            <div className="step-wrapper" key={index}>
                <div className="index">
                  <span>0</span>
                  <span>{index + 1}</span>
                </div>
              <div className="step-title">
                {item.title}
              </div>
              <div
                className="step-description"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Issues;
