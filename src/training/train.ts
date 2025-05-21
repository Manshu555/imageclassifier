import * as tf from '@tensorflow/tfjs-node';
import { createModel, trainModel, evaluateModel } from './model';

async function loadMNISTData() {
  const data = await tf.data.mnist();
  const trainData = data.trainData.map(d => d.xs);
  const trainLabels = data.trainData.map(d => d.ys);
  const testData = data.testData.map(d => d.xs);
  const testLabels = data.testData.map(d => d.ys);
  
  return {
    trainData,
    trainLabels,
    testData,
    testLabels
  };
}

async function main() {
  try {
    console.log('Loading MNIST dataset...');
    const { trainData, trainLabels, testData, testLabels } = await loadMNISTData();
    
    console.log('Creating model...');
    const model = createModel();
    
    console.log('Training model...');
    const history = await trainModel(
      model,
      trainData,
      trainLabels,
      testData,
      testLabels,
      50, // epochs
      32  // batch size
    );
    
    console.log('Evaluating model...');
    const { accuracy, loss } = await evaluateModel(model, testData, testLabels);
    console.log(`Test accuracy: ${(accuracy * 100).toFixed(2)}%`);
    console.log(`Test loss: ${loss.toFixed(4)}`);
    
    // Save the model
    await model.save('file://./models/mnist');
    console.log('Model saved successfully');
    
  } catch (error) {
    console.error('Error during training:', error);
  }
}

main();