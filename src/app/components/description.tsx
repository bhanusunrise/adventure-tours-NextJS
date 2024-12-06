import React from "react";

interface DescriptionProps {
  text: string;
  color: string;
}

const Description: React.FC<DescriptionProps> = ({ text, color }) => {
  return (
    <p className={`text-2xl font-normal text-justify ${color}`}>
      {text}
    </p>
  );
};

export default Description;