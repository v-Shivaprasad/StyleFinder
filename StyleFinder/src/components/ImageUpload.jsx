import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ onImageUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    // Call upload handler
    onImageUpload(file);
  };

  const clearImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-purple-400 bg-purple-50'
            : previewImage
            ? 'border-gray-200 bg-white'
            : 'border-gray-300 bg-white hover:border-purple-300 hover:bg-purple-50/50'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={isLoading}
        />

        {previewImage ? (
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-64 mx-auto rounded-xl shadow-md"
            />
            <button
              onClick={clearImage}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-3">
                {isLoading ? 'Searching for similar items...' : 'Image uploaded successfully!'}
              </p>
              {!isLoading && (
                <button
                  onClick={openFileDialog}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium underline"
                >
                  Upload a different image
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="cursor-pointer" onClick={openFileDialog}>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {dragActive ? (
                <Upload className="w-8 h-8 text-purple-600" />
              ) : (
                <ImageIcon className="w-8 h-8 text-purple-600" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {dragActive ? 'Drop your image here' : 'Upload an image'}
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your image here, or click to browse
            </p>
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={isLoading}
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose Image
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Supports JPG, PNG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;