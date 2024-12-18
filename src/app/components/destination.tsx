'use client'

import React, { useEffect, useRef, useState } from "react";

interface DestinationProps {
  imageUrl: string;
  name: string;
}

const Destination: React.FC<DestinationProps> = ({ imageUrl, name }) => {
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
      className={`relative w-full h-64 rounded-xl overflow-hidden shadow-2xl group transition-all duration-500 ease-in-out ${
        isVisible ? "fade-in" : "fade-out"
      }`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay Text */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-all duration-500 ease-in-out group-hover:bg-opacity-0"
      >
        <p
          className="text-white text-2xl font-bold transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        >
          {name}
        </p>
      </div>
    </div>
  );
};

export default Destination;

