import React from 'react';
import { Github, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Neural Vision
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Powered by TensorFlow.js and React
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/tensorflow/tfjs-examples"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="GitHub Repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.tensorflow.org/js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="TensorFlow.js Documentation"
            >
              <Code2 className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-gray-500">
          <p>
            Models used in this application are pre-trained on MNIST, Fashion-MNIST, and CIFAR-10 datasets.
            This application is for educational purposes to demonstrate CNN-based image classification.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;