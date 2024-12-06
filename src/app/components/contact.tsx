'use client';

import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Icons for contact types

interface ContactSectionProps {
  contactType: 'phone' | 'email' | 'address';
  description: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactType, description }) => {
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
    <div className="flex items-center gap-4 p-4">
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
