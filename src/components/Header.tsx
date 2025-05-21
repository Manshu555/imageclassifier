import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <BrainCircuit className="h-8 w-8 mr-3" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Neural Vision</h1>
            <p className="text-indigo-200 text-sm">Image Classification with CNN</p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <a 
            href="https://www.tensorflow.org/js/models" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-md text-sm font-medium bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
          >
            TensorFlow.js
          </a>
          <a 
            href="https://www.tensorflow.org/js/tutorials/training/handwritten_digit_cnn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-md text-sm font-medium bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
          >
            Learn CNNs
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;