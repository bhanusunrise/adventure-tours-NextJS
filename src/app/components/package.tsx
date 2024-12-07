import React from 'react';
import { FaMapMarkerAlt, FaUmbrellaBeach } from 'react-icons/fa'; // Location and Activity Icons

interface PackageProps {
  packageName: string;
  price: number;
  priceLimit: string;
  imageUrl: string;
  description: string;
  locations: string[]; // Locations as an array
  activities: string[]; // Activities as an array
}

const Package: React.FC<PackageProps> = ({
  packageName,
  price,
  priceLimit,
  imageUrl,
  description,
  locations,
  activities,
}) => {
  const formatPrice = () => {
    if (priceLimit === 'equal') {
      return `${price} LKR`;
    } else if (priceLimit === 'up to') {
      return `Up to ${price} LKR`;
    } else if (priceLimit === 'onwards') {
      return `${price} LKR Onwards`;
    }
  };

  return (
    <div className="rounded-xl shadow-xl overflow-hidden bg-yellow-100 border border-gray-200 pb-6">
      {/* Package Name and Price */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 text-center">{packageName}</h2>
        <p className="text-lg text-gray-600 mt-2 text-center">{formatPrice()}</p>
      </div>

      {/* Image */}
      <div className="pr-0 pl-0">
        <div
          className="h-48 w-full bg-cover bg-center "
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
          }}
        ></div>
      </div>

      {/* Description */}
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed text-justify">{description}</p>
      </div>

      {/* Locations */}
      <div className="pl-6 pr-6">
        <p className="text-gray-700 text-xl mb-4">Locations</p>
        <div className="flex flex-wrap gap-4">
          {locations.map((location, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              <span>{location}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="pl-6 pr-6 pt-8">
        <p className="text-gray-700 text-xl mb-4">Activities</p>
        <div className="flex flex-wrap gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <FaUmbrellaBeach className="mr-2 text-blue-500" />
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Package;
