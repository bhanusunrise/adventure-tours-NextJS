'use client'

import React, { useEffect, useRef, useState } from "react";

interface DescriptionProps {
  text: string;
  color: string;
}

const Description: React.FC<DescriptionProps> = ({ text, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

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
    <p
      ref={ref}
      className={`text-xl ${color} leading-relaxed text-justify transition-all duration-700 ease-out ${
        isVisible ? "fade-in" : "fade-out"
      }`}
    >
      {text}
    </p>
  );
};

export default Description;
