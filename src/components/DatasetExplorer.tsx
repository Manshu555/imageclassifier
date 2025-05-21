import React, { useState } from 'react';
import { DATASET_EXAMPLES } from '../models/modelDefinitions';
import { DatasetType } from '../types';
import { Database } from 'lucide-react';

interface DatasetExplorerProps {
  selectedDataset: DatasetType;
}

const DatasetExplorer: React.FC<DatasetExplorerProps> = ({ selectedDataset }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <Database className="h-5 w-5 text-indigo-500 mr-2" />
          <h2 className="font-semibold text-gray-800">Dataset Explorer</h2>
        </div>
        <button
          onClick={toggleExpanded}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            These datasets are commonly used benchmarks in machine learning.
            Each dataset contains thousands of labeled images used to train and evaluate
            image classification models.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(DATASET_EXAMPLES).map(([datasetId, examples]) => (
              <div 
                key={datasetId}
                className={`
                  border rounded-md overflow-hidden transition-all
                  ${selectedDataset === datasetId 
                    ? 'border-indigo-300 shadow-md' 
                    : 'border-gray-200'
                  }
                `}
              >
                <div className="border-b border-gray-200 bg-gray-50 p-3">
                  <h3 className="font-medium text-gray-800">
                    {datasetId === 'mnist' && 'MNIST Digits'}
                    {datasetId === 'fashion-mnist' && 'Fashion MNIST'}
                    {datasetId === 'cifar10' && 'CIFAR-10'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-2 p-2">
                  {examples.slice(0, 4).map(example => (
                    <div key={example.id} className="aspect-square relative overflow-hidden rounded-sm border border-gray-100">
                      <img 
                        src={example.imageUrl} 
                        alt={example.label}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center truncate">
                        {example.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetExplorer;