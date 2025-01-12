import React from 'react';

export function PropertyCard({ image, ethPrice, squareFeet, location }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* Image Section */}
      <img
        src={image}
        alt="Property"
        className="w-full h-56 object-cover"
      />

      {/* Content Section */}
      <div className="p-6">
        {/* ETH Price */}
        <div className="flex items-center mb-4">
          <span className="text-xl font-semibold text-gray-800">{ethPrice} ETH</span>
        </div>

        {/* Square Footage */}
        <div className="flex items-center mb-4">
          <span className="text-lg text-gray-600">Square Feet: {squareFeet} sq ft</span>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4">
          <span className="text-lg text-gray-600">Location: {location}</span>
        </div>
      </div>
    </div>
  );
}

