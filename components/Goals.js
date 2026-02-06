import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import { useScrollContext } from './global/ScrollContext';
import Image from 'next/image';
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase"; // important en Next.js
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import '../styles/components/goals.scss'

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create(
  "hyperBounce",
  "0.4,0,0.2,1" // grosse extrapolation pour un effet très rebondissant
);

const Goals = ({ goalsTitle, goals_content }) => {
  return (
    <section className="goals">
      <div className="container">
        <div className="flex-wrapper">
          <div className="title-wrapper">
            <h2 className="content-h2">
              Les objectifs <span>principaux</span> du projet.
            </h2>
          </div>
          <div className="cards-wrapper">
          {goals_content?.map((item, index) => (
            <div className="card" style={{ backgroundColor: item.color }} key={index}>     
                {/* Image / Icon */}
                {item.image && (
                <div
                    className="card-icon"
                    dangerouslySetInnerHTML={{ __html: item.image }}
                />
                )}
              <div className="card-title" style={{ color: item.content_color }} >
                {item.title}
              </div>
              <div
                className="card-description"
                dangerouslySetInnerHTML={{ __html: item.content }}
                style={{ color: item.content_color }}
              />
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goals;