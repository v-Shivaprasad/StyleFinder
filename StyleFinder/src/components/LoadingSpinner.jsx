import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700">Analyzing your image...</p>
      <p className="text-sm text-gray-500 mt-1">Finding similar fashion items</p>
    </div>
  );
};

export default LoadingSpinner;