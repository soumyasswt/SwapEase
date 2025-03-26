import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="border rounded-xl shadow-md bg-white dark:bg-gray-800 p-4 flex flex-col transform transition-transform duration-300 hover:scale-105">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-40 object-contain mb-3 rounded-lg"
      />

      {/* Status Badge */}
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold mb-2 self-start ${
          product.status === 'For Exchange'
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 text-white'
        }`}
      >
        {product.status}
      </span>

      {/* Product Name */}
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
        {product.name}
      </h2>

      {/* Product Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow mb-3">
        {product.description.substring(0, 100)}...
      </p>

      {/* Pricing or Exchange Details */}
      <div className="mt-auto flex justify-between items-center">
        {product.status === 'For Rent' ? (
          <span className="text-blue-500 font-bold text-md">₹{product.price}/day</span>
        ) : (
          <span className="text-green-500 font-semibold text-md">Available for Exchange</span>
        )}

        {/* Action Button */}
        <Link
          to={`/product/${product.id}`}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md"
        >
          {product.status === 'For Exchange' ? 'Request Swap' : 'Rent Now'}
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
