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
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.269392066728!2d80.7640419!3d6.9775079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3817dd8000e6f%3A0x511d2aeb3484e3ef!2sArun%20Home%20Decor!5e0!3m2!1sen!2slk!4v1733515033206!5m2!1sen!2slk"
        style={{ border: 0, width: "100%", height: "100%" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
