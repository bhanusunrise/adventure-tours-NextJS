import React from "react";

interface HeadingProps {
  text: string;
  color: string;
}

const Heading: React.FC<HeadingProps> = ({ text, color }) => {
  return (
    <p className={`text-6xl font-bold text-center ${color}`}>
      {text}
    </p>
  );
};

export default Heading;
