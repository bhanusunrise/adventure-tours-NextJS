import React from "react";
import './AboutComponent.css'; // Import the CSS file

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
      {/* First Column: Image */}
      <div className="flex-[1] min-h-[15vh] md:min-h-[40vh] rounded-2xl shadow-2xl overflow-hidden">
        <img
          src={imageUrl}
          alt="About section"
          className={`image ${image_side === "left" ? "image-left" : ""}`}
        />
      </div>

      {/* Second Column: Paragraph */}
      <div className="flex-[2] flex items-center">
        <p className="text-2xl text-gray-600 leading-relaxed text-justify transition-all duration-500 ease-linear hover:text-green-900 hover:font-semibold">
          {paragraphText}
        </p>
      </div>
    </div>
  );
};

export default AboutComponent;
