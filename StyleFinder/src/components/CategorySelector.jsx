import React from 'react';
import { Check } from 'lucide-react';

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'dresses',
      label: 'Dresses',
      description: 'Find similar dresses and gowns',
      icon: '👗'
    },
    {
      id: 'jeans',
      label: 'Jeans',
      description: 'Find similar jeans and denim',
      icon: '👖'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Category</h3>
        <p className="text-sm text-gray-600">Choose the type of clothing to get more accurate results</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
              selectedCategory === category.id
                ? 'border-purple-500 bg-purple-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
            }`}
          >
            {/* Selection Indicator */}
            <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              selectedCategory === category.id
                ? 'border-purple-500 bg-purple-500'
                : 'border-gray-300 group-hover:border-purple-400'
            }`}>
              {selectedCategory === category.id && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Category Content */}
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{category.icon}</div>
              <div className="flex-1">
                <h4 className={`font-semibold text-lg mb-1 ${
                  selectedCategory === category.id ? 'text-purple-900' : 'text-gray-900'
                }`}>
                  {category.label}
                </h4>
                <p className={`text-sm ${
                  selectedCategory === category.id ? 'text-purple-700' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
              </div>
            </div>

            {/* Hover Effect */}
            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-purple-500/5 to-pink-500/5'
                : 'bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;