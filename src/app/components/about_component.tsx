import React from "react";

interface AboutComponentProps {
  imageUrl: string;
  paragraphText: string;
  image_side: string; // "left" or "right"
}

const AboutComponent: React.FC<AboutComponentProps> = ({ imageUrl, paragraphText, image_side }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-stretch gap-20 p-6 ${
        image_side === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* First Column: Background Image */}
      <div
        className="flex-[1] min-h-[15vh] md:min-h-[40vh] rounded-2xl shadow-2xl"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: image_side === "left" ? "rotate(-5deg)" : "rotate(5deg)", // Conditional rotation
        }}
      ></div>

      {/* Second Column: Paragraph */}
      <div className="flex-[2] flex items-center">
        <p className="text-2xl text-gray-700 leading-relaxed text-justify">
          {paragraphText}
        </p>
      </div>
    </div>
  );
};

export default AboutComponent;


