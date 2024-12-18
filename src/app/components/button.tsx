'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string; // Text to display on the button
  color: 'green' | 'blue' | 'red' | 'yellow'; // Restrict colors to known Tailwind colors
}

const Button: React.FC<ButtonProps> = ({ text, color, className = '', ...props }) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isVisible, setIsVisible] = useState(false);  // This will control the fade effect

  // Set the initial scroll direction and visibility state
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
        setIsVisible(true);  // Show the button when the user scrolls
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection]);

  const baseClass = `
    text-white
    border-8
    font-medium 
    rounded-lg 
    text-sm 
    px-5 
    py-2.5 
    text-center 
    focus:ring-4 
    focus:outline-none 
    dark:text-white
  `;

  const colorClasses = {
    green: `
      border-green-700 
      hover:bg-green-800 
      focus:ring-green-300 
      dark:border-green-500 
      dark:hover:bg-green-600 
      dark:focus:ring-green-800
    `,
    blue: `
      border-blue-700 
      hover:bg-blue-800 
      focus:ring-blue-300 
      dark:border-blue-500 
      dark:hover:bg-blue-600 
      dark:focus:ring-blue-800
    `,
    red: `
      border-red-700 
      hover:bg-red-800 
      focus:ring-red-300 
      dark:border-red-500 
      dark:hover:bg-red-600 
      dark:focus:ring-red-800
    `,
    yellow: `
      border-yellow-700 
      hover:bg-yellow-800 
      focus:ring-yellow-300 
      dark:border-yellow-500 
      dark:hover:bg-yellow-600 
      dark:focus:ring-yellow-800
    `,
  };

  const animationClass = scrollDirection === 'down' 
    ? 'opacity-0 translate-y-10'  // Fade from bottom to top on scroll down
    : 'opacity-0 -translate-y-10';  // Fade from top to bottom on scroll up

  return (
    <button
      type="button"
      className={clsx(baseClass, colorClasses[color], isVisible ? 'opacity-100 translate-y-0 transition-all duration-700' : animationClass, className)}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
