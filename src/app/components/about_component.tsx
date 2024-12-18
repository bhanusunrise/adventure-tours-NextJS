'use client'

import React, { useEffect, useRef, useState } from "react";
import "./AboutComponent.css";

interface AboutComponentProps {
  imageUrl: string;
  paragraphText: string;
  image_side: string; // "left" or "right"
}

const AboutComponent: React.FC<AboutComponentProps> = ({ imageUrl, paragraphText, image_side }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-stretch gap-20 p-6 transition-all duration-700 ease-out ${
        image_side === "right" ? "md:flex-row-reverse" : ""
      } ${isVisible ? "fade-in" : "fade-out"}`}
    >
      {/* First Column: Image */}
      <div className="flex-[1] min-h-[15vh] md:min-h-[40vh] rounded-2xl shadow-2xl overflow-hidden">
        <img
          src={imageUrl}
          alt="About section"
          className={`image ${image_side === "left" ? "image-left" : ""}`}
        />
      </div>

      {/* Second Column: Paragraph */}
      <div className="flex-[2] flex items-center">
        <p className="text-2xl text-gray-600 leading-relaxed text-justify transition-all duration-500 ease-linear hover:text-green-900 hover:font-semibold">
          {paragraphText}
        </p>
      </div>
    </div>
  );
};

export default AboutComponent;
