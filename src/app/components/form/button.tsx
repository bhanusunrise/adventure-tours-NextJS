'use client'

import React from 'react';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  bgColor: string; // Make bgColor required
  hoverColor: string; // Make hoverColor required
  focusColor: string; // Make focusColor required
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = "",
  bgColor,
  hoverColor,
  focusColor,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bgColor} ${hoverColor} focus:ring-4 ${focusColor} text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
