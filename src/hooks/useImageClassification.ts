import { useState, useCallback, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { ModelInfo, ClassificationResult, DatasetType } from '../types';
import { MODELS } from '../models/modelDefinitions';
import { processImage, fileToImage } from '../utils/imageUtils';
import { loadModel, runInference, clearTensorMemory } from '../utils/modelUtils';

interface UseImageClassificationProps {
  initialDataset?: DatasetType;
}

interface UseImageClassificationReturn {
  selectedModel: ModelInfo;
  setModelType: (type: DatasetType) => void;
  isModelLoading: boolean;
  modelLoadError: string | null;
  classifyImage: (imageData: ImageData | HTMLImageElement | File) => Promise<void>;
  results: ClassificationResult[];
  isClassifying: boolean;
  classificationError: string | null;
  modelSummary: string[];
}

export const useImageClassification = ({
  initialDataset = 'mnist'
}: UseImageClassificationProps = {}): UseImageClassificationReturn => {
  // State for selected model
  const [selectedModel, setSelectedModel] = useState<ModelInfo>(MODELS[initialDataset]);
  
  // Model loading state
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelLoadError, setModelLoadError] = useState<string | null>(null);
  
  // Classification state
  const [results, setResults] = useState<ClassificationResult[]>([]);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationError, setClassificationError] = useState<string | null>(null);
  
  // Model architecture summary
  const [modelSummary, setModelSummary] = useState<string[]>([]);
  
  // Change model type
  const setModelType = useCallback((type: DatasetType) => {
    setSelectedModel(MODELS[type]);
    setResults([]);
    setModelSummary([]);
  }, []);
  
  // Load model when selected model changes
  useEffect(() => {
    let isMounted = true;
    
    const loadSelectedModel = async () => {
      // Clear previous errors
      setModelLoadError(null);
      setIsModelLoading(true);
      
      try {
        // Load and set model
        const loadedModel = await loadModel(selectedModel);
        
        if (isMounted) {
          setModel(loadedModel);
          
          // Get model summary for visualization
          const summary = await Promise.resolve().then(() => {
            const layers = loadedModel.layers;
            return layers.map(layer => {
              const outputShape = layer.outputShape;
              return `${layer.name} (${layer.getClassName()}): Output Shape: ${JSON.stringify(outputShape)}`;
            });
          });
          
          setModelSummary(summary);
        }
      } catch (error) {
        console.error('Error loading model:', error);
        if (isMounted) {
          setModelLoadError(`Failed to load model: ${selectedModel.name}`);
        }
      } finally {
        if (isMounted) {
          setIsModelLoading(false);
        }
      }
    };
    
    loadSelectedModel();
    
    return () => {
      isMounted = false;
      clearTensorMemory();
    };
  }, [selectedModel]);
  
  // Classification function
  const classifyImage = useCallback(
    async (input: ImageData | HTMLImageElement | File) => {
      if (!model) {
        setClassificationError('Model not loaded yet');
        return;
      }
      
      setIsClassifying(true);
      setClassificationError(null);
      
      try {
        // Convert File to HTMLImageElement if needed
        let imageData: ImageData | HTMLImageElement = input as ImageData | HTMLImageElement;
        if (input instanceof File) {
          imageData = await fileToImage(input);
        }
        
        // Process image for model
        const processedImage = await processImage(imageData, selectedModel);
        
        // Run inference
        const classificationResults = await runInference(model, processedImage, selectedModel);
        
        // Update results
        setResults(classificationResults);
      } catch (error) {
        console.error('Classification error:', error);
        setClassificationError(`Error classifying image: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setResults([]);
      } finally {
        setIsClassifying(false);
      }
    },
    [model, selectedModel]
  );
  
  // Clean up tensors on unmount
  useEffect(() => {
    return () => {
      clearTensorMemory();
    };
  }, []);
  
  return {
    selectedModel,
    setModelType,
    isModelLoading,
    modelLoadError,
    classifyImage,
    results,
    isClassifying,
    classificationError,
    modelSummary
  };
};