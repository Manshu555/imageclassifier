import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { DatasetType } from '../types';
import { DATASET_EXAMPLES } from '../models/modelDefinitions';

interface InfoPanelProps {
  modelType: DatasetType;
  modelSummary: string[];
}

const InfoPanel: React.FC<InfoPanelProps> = ({ modelType, modelSummary }) => {
  const [showExamples, setShowExamples] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  
  const examples = DATASET_EXAMPLES[modelType];
  
  const datasetInfo = {
    mnist: {
      title: 'MNIST Dataset',
      description: 'MNIST is a dataset of handwritten digits (0-9). It contains 60,000 training images and 10,000 testing images, each 28x28 pixels in grayscale.',
      source: 'http://yann.lecun.com/exdb/mnist/',
      classes: '10 classes (digits 0-9)',
      paper: 'http://vision.stanford.edu/cs598_spring07/papers/Lecun98.pdf'
    },
    'fashion-mnist': {
      title: 'Fashion MNIST Dataset',
      description: 'Fashion-MNIST is a dataset of Zalando\'s article images, consisting of 28x28 grayscale images of 70,000 fashion products from 10 categories.',
      source: 'https://github.com/zalandoresearch/fashion-mnist',
      classes: '10 classes (T-shirt, trouser, pullover, etc.)',
      paper: 'https://arxiv.org/abs/1708.07747'
    },
    cifar10: {
      title: 'CIFAR-10 Dataset',
      description: 'CIFAR-10 consists of 60,000 32x32 color images in 10 classes, with 6,000 images per class. There are 50,000 training images and 10,000 test images.',
      source: 'https://www.cs.toronto.edu/~kriz/cifar.html',
      classes: '10 classes (airplane, automobile, bird, etc.)',
      paper: 'https://www.cs.toronto.edu/~kriz/learning-features-2009-TR.pdf'
    }
  };
  
  const info = datasetInfo[modelType];
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-8">
      {/* Dataset info */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{info.title}</h2>
        <p className="text-gray-600 mb-3">{info.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Classes</h3>
            <p className="text-gray-600">{info.classes}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-1">Source</h3>
            <a 
              href={info.source} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              Dataset Homepage
            </a>
          </div>
        </div>
      </div>
      
      {/* Dataset examples section */}
      <div className="border-b border-gray-200">
        <button
          type="button"
          onClick={() => setShowExamples(!showExamples)}
          className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-indigo-500 mr-2" />
            <span className="font-medium">Example Images</span>
          </div>
          {showExamples ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {showExamples && (
          <div className="p-4 bg-gray-50">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {examples.map(example => (
                <div key={example.id} className="bg-white rounded-md border border-gray-200 overflow-hidden">
                  <div className="h-24 bg-gray-100 flex items-center justify-center">
                    <img 
                      src={example.imageUrl} 
                      alt={example.label}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <span className="text-xs font-medium">{example.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Model architecture section */}
      <div>
        <button
          type="button"
          onClick={() => setShowArchitecture(!showArchitecture)}
          className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <Layers className="h-5 w-5 text-indigo-500 mr-2" />
            <span className="font-medium">CNN Architecture</span>
          </div>
          {showArchitecture ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {showArchitecture && (
          <div className="p-4 bg-gray-50">
            {modelSummary.length > 0 ? (
              <div className="overflow-auto max-h-64">
                <pre className="text-xs bg-gray-100 p-3 rounded-md font-mono whitespace-pre-wrap">
                  {modelSummary.map((layer, i) => (
                    <div key={i} className="mb-1">
                      {layer}
                    </div>
                  ))}
                </pre>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">
                Load the model to see architecture details
              </p>
            )}
            
            <div className="mt-4">
              <h3 className="font-medium text-sm mb-2">What is a CNN?</h3>
              <p className="text-sm text-gray-600">
                Convolutional Neural Networks (CNNs) are specialized neural networks designed for image processing.
                They use convolutional layers to automatically detect features in images, followed by pooling layers
                to reduce dimensions, and finally fully connected layers for classification.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;