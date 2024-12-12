'use client'

import React from 'react';

type InputProps = {
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  type?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  placeholder = "",
  required = false,
  min,
  max,
  type = "text",
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
    />
  );
};

export default Input;
