import React from 'react';
import { MODELS } from '../models/modelDefinitions';
import { DatasetType } from '../types';
import { AlertCircle as CircleAlert, Loader2 } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: DatasetType;
  onSelectModel: (model: DatasetType) => void;
  isLoading: boolean;
  error: string | null;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onSelectModel,
  isLoading,
  error
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Select Dataset Model</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(MODELS).map(([id, model]) => (
          <button
            key={id}
            onClick={() => onSelectModel(id as DatasetType)}
            disabled={isLoading}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200
              ${selectedModel === id 
                ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <h3 className="font-medium">{model.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{model.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700">
                {model.imageSize.join('×')} px
              </span>
              <span className="text-xs text-indigo-600">
                {model.classes.length} classes
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {isLoading && (
        <div className="mt-4 flex items-center text-indigo-600">
          <Loader2 className="animate-spin h-4 w-4 mr-2" />
          <p>Loading model...</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 flex items-center text-red-600 bg-red-50 p-3 rounded-md">
          <CircleAlert className="h-4 w-4 mr-2" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;