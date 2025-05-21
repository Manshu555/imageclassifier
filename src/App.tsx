import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ModelSelector from './components/ModelSelector';
import ImageUploader from './components/ImageUploader';
import DrawCanvas from './components/DrawCanvas';
import ClassificationResult from './components/ClassificationResult';
import InfoPanel from './components/InfoPanel';
import DatasetExplorer from './components/DatasetExplorer';
import { useImageClassification } from './hooks/useImageClassification';
import { DatasetType } from './types';

function App() {
  const [inputMethod, setInputMethod] = useState<'upload' | 'draw'>('draw');
  
  const {
    selectedModel,
    setModelType,
    isModelLoading,
    modelLoadError,
    classifyImage,
    results,
    isClassifying,
    classificationError,
    modelSummary
  } = useImageClassification();
  
  // Handle input method tabs
  const handleTabChange = (method: 'upload' | 'draw') => {
    setInputMethod(method);
  };
  
  // Handle model selection
  const handleModelSelect = (modelType: DatasetType) => {
    setModelType(modelType);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Introduction Section */}
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Image Classification with CNN
            </h1>
            <p className="text-gray-600">
              Experience the power of Convolutional Neural Networks for image classification.
              This interactive tool uses pre-trained models with TensorFlow.js to classify images from 
              popular datasets directly in your browser.
            </p>
          </div>
          
          {/* Dataset Explorer */}
          <DatasetExplorer selectedDataset={selectedModel.id} />
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Input Section */}
            <div className="lg:col-span-2">
              {/* Model Selector */}
              <ModelSelector
                selectedModel={selectedModel.id}
                onSelectModel={handleModelSelect}
                isLoading={isModelLoading}
                error={modelLoadError}
              />
              
              {/* Input Method Tabs */}
              <div className="mb-4 border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => handleTabChange('draw')}
                    className={`py-2 px-4 font-medium text-sm mr-2 transition-colors ${
                      inputMethod === 'draw'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Draw Image
                  </button>
                  <button
                    onClick={() => handleTabChange('upload')}
                    className={`py-2 px-4 font-medium text-sm transition-colors ${
                      inputMethod === 'upload'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Upload Image
                  </button>
                </div>
              </div>
              
              {/* Image Input Area */}
              {inputMethod === 'draw' ? (
                <DrawCanvas
                  onImageReady={classifyImage}
                  isProcessing={isClassifying || isModelLoading}
                />
              ) : (
                <ImageUploader
                  onImageSelected={classifyImage}
                  isProcessing={isClassifying || isModelLoading}
                />
              )}
              
              {/* Dataset Information */}
              <InfoPanel
                modelType={selectedModel.id}
                modelSummary={modelSummary}
              />
            </div>
            
            {/* Right Column - Results Section */}
            <div className="lg:col-span-1">
              <ClassificationResult
                results={results}
                isLoading={isClassifying}
                error={classificationError}
              />
              
              {/* Educational Section */}
              <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-indigo-900">
                  How CNN Classification Works
                </h3>
                <ol className="space-y-3 text-sm text-indigo-800">
                  <li className="flex items-start">
                    <span className="font-bold mr-2 bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                    <span>Your image is <b>preprocessed</b> to match the input dimensions and format of the model</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2 bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                    <span>The CNN model <b>extracts features</b> through convolutional layers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2 bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                    <span>Pooling layers <b>reduce dimensions</b> while preserving important information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2 bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
                    <span>Fully connected layers <b>classify</b> the extracted features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2 bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">5</span>
                    <span>The <b>softmax function</b> converts outputs to probability scores across all classes</span>
                  </li>
                </ol>
                <div className="mt-4 text-xs text-indigo-700">
                  <p>All processing happens in your browser using TensorFlow.js - no server required!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;