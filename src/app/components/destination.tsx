'use client';

import React from 'react';

interface DestinationProps {
  imageUrl: string;
  name: string;
}

const Destination: React.FC<DestinationProps> = ({ imageUrl, name }) => {
  return (
    <div
      className="relative w-full h-64 rounded-xl overflow-hidden shadow-2xl group"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay Text */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-all duration-500 ease-in-out group-hover:bg-opacity-0"
      >
        <p
          className="text-white text-2xl font-bold transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        >
          {name}
        </p>
      </div>
    </div>
  );
};

export default Destination;

