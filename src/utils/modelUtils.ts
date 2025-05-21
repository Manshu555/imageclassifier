import * as tf from '@tensorflow/tfjs';
import { ClassificationResult, ModelInfo } from '../types';

// Cache for loaded models to avoid reloading
const modelCache: Record<string, tf.LayersModel> = {};

// Load a TensorFlow.js model
export const loadModel = async (modelInfo: ModelInfo): Promise<tf.LayersModel> => {
  const { id, modelPath } = modelInfo;
  
  // Return cached model if available
  if (modelCache[id]) {
    return modelCache[id];
  }
  
  try {
    // First try to load locally trained model
    try {
      const model = await tf.loadLayersModel(modelPath);
      modelCache[id] = model;
      return model;
    } catch (localError) {
      console.warn(`Failed to load local model ${id}, falling back to training...`);
      throw new Error(`Model ${id} not found. Please train the model first.`);
    }
  } catch (error) {
    console.error('Error loading model:', error);
    throw new Error(`Failed to load model ${id}. Please ensure the model is trained.`);
  }
};

// Run inference on processed image data
export const runInference = async (
  model: tf.LayersModel,
  processedImage: tf.Tensor,
  modelInfo: ModelInfo
): Promise<ClassificationResult[]> => {
  try {
    // Run inference
    const predictions = model.predict(processedImage) as tf.Tensor;
    
    // Get array of prediction values
    const values = await predictions.data();
    
    // Map to class names with confidence scores
    const results = Array.from(values).map((confidence, index) => ({
      label: modelInfo.classes[index],
      confidence: confidence,
      index: index
    }));
    
    // Sort by confidence (descending)
    results.sort((a, b) => b.confidence - a.confidence);
    
    // Clean up tensors
    predictions.dispose();
    processedImage.dispose();
    
    return results;
  } catch (error) {
    console.error('Inference error:', error);
    throw new Error('Failed to run inference on the image');
  }
};

// Get a sample of model architecture for visualization
export const getModelSummary = async (model: tf.LayersModel): Promise<string[]> => {
  try {
    const layers = model.layers;
    return layers.map(layer => {
      const outputShape = layer.outputShape;
      return `${layer.name} (${layer.getClassName()}): Output Shape: ${JSON.stringify(outputShape)}`;
    });
  } catch (error) {
    console.error('Error getting model summary:', error);
    return ['Model architecture not available'];
  }
};

// Memory management - clear tensor memory
export const clearTensorMemory = (): void => {
  try {
    tf.engine().disposeVariables();
    tf.engine().startScope();
    tf.engine().endScope();
  } catch (error) {
    console.error('Error clearing tensor memory:', error);
  }
};