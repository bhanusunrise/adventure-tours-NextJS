import React from 'react';

type LabelProps = {
  text: string;
  className?: string;
  htmlFor?: string;
};

const Label: React.FC<LabelProps> = ({ text, className = "", htmlFor = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}
    >
      {text}
    </label>
  );
};

export default Label;
