'use client'

import React, { useEffect, useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Icons for contact types

interface ContactSectionProps {
  contactType: 'phone' | 'email' | 'address';
  description: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactType, description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Determine the icon and link based on contact type
  const getContactDetails = () => {
    switch (contactType) {
      case 'phone':
        return {
          icon: <FaPhone className="text-green-500" />,
          link: `tel:${description}`,
          text: description,
        };
      case 'email':
        return {
          icon: <FaEnvelope className="text-blue-500" />,
          link: `mailto:${description}`,
          text: description,
        };
      case 'address':
        return {
          icon: <FaMapMarkerAlt className="text-red-500" />,
          link: null, // No link for address
          text: description,
        };
      default:
        return null;
    }
  };

  const contactDetails = getContactDetails();

  if (!contactDetails) return null;

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 p-4 transition-all duration-500 ease-in-out ${
        isVisible ? 'fade-in' : 'fade-out'
      }`}
    >
      {/* Icon */}
      <div className="text-2xl">{contactDetails.icon}</div>
      {/* Text */}
      <div>
        {contactDetails.link ? (
          <a
            href={contactDetails.link}
            className="text-lg text-gray-800 hover:underline"
          >
            {contactDetails.text}
          </a>
        ) : (
          <p className="text-lg text-gray-800">{contactDetails.text}</p>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
