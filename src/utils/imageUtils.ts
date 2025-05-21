import * as tf from '@tensorflow/tfjs';
import { ModelInfo } from '../types';

// Process image data from canvas/file to format needed for model input
export const processImage = async (
  imageData: ImageData | HTMLImageElement,
  modelInfo: ModelInfo
): Promise<tf.Tensor> => {
  const { imageSize, grayscale } = modelInfo;
  const [width, height] = imageSize;
  
  // Convert image to tensor
  let tensor = tf.browser.fromPixels(imageData);
  
  // Resize image to model's expected dimensions
  tensor = tf.image.resizeBilinear(tensor, [width, height]);
  
  // Convert to grayscale if needed
  if (grayscale && tensor.shape[2] === 3) {
    // RGB to grayscale conversion weights
    const rgbToGrayscaleWeights = [0.2989, 0.587, 0.114];
    tensor = tf.dot(
      tensor.reshape([width * height, 3]),
      tf.tensor1d(rgbToGrayscaleWeights)
    ).reshape([width, height, 1]);
  }
  
  // Normalize pixel values to 0-1
  tensor = tensor.div(tf.scalar(255));
  
  // Add batch dimension
  tensor = tensor.expandDims(0);
  
  return tensor;
};

// Convert a File object to an HTMLImageElement
export const fileToImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Extract image data from canvas
export const canvasToImageData = (canvas: HTMLCanvasElement): ImageData => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};