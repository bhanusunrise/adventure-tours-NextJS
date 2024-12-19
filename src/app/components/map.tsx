import React, { useEffect, useRef, useState } from "react";

export default function Map() {
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Observe the visibility of the component
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className={`w-full h-96 transition-all duration-500 ease-in-out ${
        isVisible ? "fade-in" : "fade-out"
      }`}
    >
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.51679299697395!2d80.76382608557287!3d6.977610476682847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae381004708ad3d%3A0xbccaea42694decf8!2sTuk%20Tuk%20Adventure%20Tours!5e0!3m2!1sen!2slk!4v1734575120589!5m2!1sen!2slk" width="720" height="480" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}
