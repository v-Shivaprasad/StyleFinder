import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import CategorySelector from './components/CategorySelector';
import ProductGrid from './components/ProductGrid';
import LoadingSpinner from './components/LoadingSpinner';
import { searchSimilarProducts } from './utils/api';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('dresses');

  const handleImageUpload = async (imageFile) => {
    setIsLoading(true);
    setHasSearched(true);
    setError(null);
    

    try {
      const results = await searchSimilarProducts(imageFile, selectedCategory);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to find similar products. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  StyleFinder
                </h1>
                <p className="text-sm text-gray-500">Find similar fashion items</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-purple-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Powered Search</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upload an Image to Find Similar Items
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload a photo of any clothing item and let our AI find similar products from top brands
            </p>
          </div>
          
          {/* Category Selection */}
          <div className="mb-8">
            <CategorySelector 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mb-8">
            <LoadingSpinner />
          </div>
        )}

        {/* Results Section */}
        {hasSearched && !isLoading && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {searchResults.length > 0 ? `Similar ${selectedCategory === 'jeans' ? 'Jeans' : 'Dresses'} Found` : 'No Results'}
              </h3>
              {searchResults.length > 0 && (
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {searchResults.length} items
                </span>
              )}
            </div>
            
            {searchResults.length > 0 ? (
              <ProductGrid products={searchResults} />
            ) : !error && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  No similar items found. Try uploading a different image or changing the category.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {!hasSearched && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How it works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Select Category</h4>
                <p className="text-gray-600 text-sm">
                  Choose between jeans or dresses to get more accurate results
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Upload Image</h4>
                <p className="text-gray-600 text-sm">
                  Drag and drop or click to upload an image of any clothing item
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
                <p className="text-gray-600 text-sm">
                  Our AI analyzes the image to understand style, color, and patterns
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Find Matches</h4>
                <p className="text-gray-600 text-sm">
                  Get similar items from top brands with prices and links
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 StyleFinder. Powered by AI fashion recognition.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;