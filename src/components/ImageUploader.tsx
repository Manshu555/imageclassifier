import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };
  
  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass file to parent component
    onImageSelected(file);
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const clearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Upload Image</h2>
      
      {!previewUrl ? (
        <div 
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'}
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            disabled={isProcessing}
          />
          
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="font-medium text-gray-700">Drag and drop an image here</p>
          <p className="text-sm text-gray-500 mt-1">or click to select</p>
          <p className="text-xs text-gray-400 mt-4">Supported formats: JPEG, PNG, GIF</p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img 
            src={previewUrl} 
            alt="Selected" 
            className="w-full object-contain max-h-64"
          />
          <button
            type="button"
            onClick={clearImage}
            disabled={isProcessing}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 
              hover:bg-opacity-70 transition-opacity"
            aria-label="Remove image"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <ImageIcon className="inline-block h-4 w-4 mr-1" />
          Choose an image that matches the selected model's dataset
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;