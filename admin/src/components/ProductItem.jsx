import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, age, city, profession }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg hover:scale-105 transition-all duration-500">
      <Link to={`/profile/${id}`} className="text-gray-700 cursor-pointer block">
        <div className="overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover "
          />
        </div>
        <div className="pt-3">
          <p className="text-lg font-semibold">{name}, {age}</p>
          <p className="text-sm text-gray-600">{city}</p>
          <p className="text-sm text-gray-600">{profession}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
