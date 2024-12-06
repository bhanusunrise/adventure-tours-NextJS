import React from "react";

interface SubHeadingProps {
  text: string;
  color: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ text, color }) => {
  return (
    <p className={`text-5xl font-semibold ${color}`}>
      {text}
    </p>
  );
};

export default SubHeading;