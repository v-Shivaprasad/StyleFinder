import React, { useState } from 'react';
import { ExternalLink, Heart, ShoppingBag, ChevronLeft, ChevronRight, Info } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // Parse images array if it comes as a string
  const parseImages = (imagesData) => {
    if (Array.isArray(imagesData)) {
      return imagesData;
    }
    if (typeof imagesData === 'string') {
      try {
        // Handle string representation of array
        const cleanedString = imagesData.replace(/'/g, '"');
        return JSON.parse(cleanedString);
      } catch (e) {
        console.warn('Failed to parse images:', e);
        return [];
      }
    }
    return [];
  };

  const images = product.pdp_images_s3 && parseImages(product.pdp_images_s3).length > 0 
    ? parseImages(product.pdp_images_s3)
    : [product.feature_image_s3].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const openProductPage = () => {
    if (product.pdp_url) {
      window.open(product.pdp_url, '_blank');
    }
  };

  // Enhanced price formatting to handle string format and multiple currencies
  const formatPrice = (mrp) => {
    if (!mrp) return 'Price not available';
    
    let priceObj;
    
    // Handle string representation of object
    if (typeof mrp === 'string') {
      try {
        const cleanedString = mrp.replace(/'/g, '"');
        priceObj = JSON.parse(cleanedString);
      } catch (e) {
        return mrp; // Return as-is if parsing fails
      }
    } else if (typeof mrp === 'object') {
      priceObj = mrp;
    } else {
      return mrp;
    }

    // Format based on currency
    if (priceObj.INR) {
      return `₹${priceObj.INR.toLocaleString()}`;
    } else if (priceObj.USD) {
      return `$${priceObj.USD.toLocaleString()}`;
    } else if (priceObj.EUR) {
      return `€${priceObj.EUR.toLocaleString()}`;
    } else if (priceObj.GBP) {
      return `£${priceObj.GBP.toLocaleString()}`;
    } else {
      // Return first available currency
      const firstCurrency = Object.keys(priceObj)[0];
      const firstValue = priceObj[firstCurrency];
      return `${firstCurrency} ${firstValue.toLocaleString()}`;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        {!imageError && images.length > 0 ? (
          <img
            src={images[currentImageIndex]}
            alt={product.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Image not available</p>
            </div>
          </div>
        )}
        {images.length > 1 && !imageError && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          {product.description && (
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="w-8 h-8 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-lg">
            {product.brand}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
          {product.product_name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.mrp)}
          </span>
          <div className="text-sm text-gray-500">
            {product.brand}
          </div>
        </div>
        {product.description && showDescription && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}
        <div className="flex space-x-2">
          <button
            onClick={openProductPage}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Product</span>
          </button>
        </div>

        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          {images.length > 1 && (
            <span>{images.length} images</span>
          )}
          {product.description && (
            <span>Tap info icon for details</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;