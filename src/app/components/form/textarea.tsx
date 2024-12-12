'use client';

import React from 'react';

type TextareaProps = {
  placeholder?: string;
  rows?: number;
  className?: string;
  required?: boolean;
};

const Textarea: React.FC<TextareaProps> = ({ placeholder = "Write your thoughts here...", rows = 4, className = "", required = false }) => {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      required={required}
      className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
    />
  );
};

export default Textarea;


