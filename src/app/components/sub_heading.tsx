'use client'

import React, { useEffect, useRef, useState } from "react";

interface SubHeadingProps {
  text: string;
  color: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ text, color }) => {
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
      className={`text-5xl font-semibold ${color} transition-all duration-700 ease-out ${
        isVisible ? "fade-in" : "fade-out"
      }`}
    >
      {text}
    </p>
  );
};

export default SubHeading;
