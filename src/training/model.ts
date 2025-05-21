import * as tf from '@tensorflow/tfjs';

export function createModel() {
  const model = tf.sequential();
  
  // Convolutional layers
  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    filters: 32,
    kernelSize: 3,
    activation: 'relu',
    padding: 'same'
  }));
  
  model.add(tf.layers.batchNormalization());
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.dropout({ rate: 0.25 }));
  
  model.add(tf.layers.conv2d({
    filters: 64,
    kernelSize: 3,
    activation: 'relu',
    padding: 'same'
  }));
  
  model.add(tf.layers.batchNormalization());
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.dropout({ rate: 0.25 }));
  
  model.add(tf.layers.conv2d({
    filters: 128,
    kernelSize: 3,
    activation: 'relu',
    padding: 'same'
  }));
  
  model.add(tf.layers.batchNormalization());
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.dropout({ rate: 0.4 }));
  
  // Dense layers
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 512, activation: 'relu' }));
  model.add(tf.layers.batchNormalization());
  model.add(tf.layers.dropout({ rate: 0.5 }));
  model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));
  
  // Compile model
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });
  
  return model;
}

export function preprocessData(data: tf.Tensor, labels: tf.Tensor) {
  // Normalize the data
  const normalizedData = data.div(255.0);
  
  // One-hot encode the labels
  const oneHotLabels = tf.oneHot(labels, 10);
  
  return {
    data: normalizedData,
    labels: oneHotLabels
  };
}

export async function trainModel(
  model: tf.LayersModel,
  data: tf.Tensor,
  labels: tf.Tensor,
  validationData: tf.Tensor,
  validationLabels: tf.Tensor,
  epochs = 50,
  batchSize = 32
) {
  const { data: trainData, labels: trainLabels } = preprocessData(data, labels);
  const { data: valData, labels: valLabels } = preprocessData(validationData, validationLabels);
  
  // Data augmentation configuration
  const dataAugmentation = {
    width_shift_range: 0.1,
    height_shift_range: 0.1,
    rotation_range: 10,
    zoom_range: 0.1
  };
  
  // Train the model
  return await model.fit(trainData, trainLabels, {
    epochs,
    batchSize,
    validationData: [valData, valLabels],
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}, val_accuracy = ${logs.val_acc.toFixed(4)}`);
      }
    }
  });
}

export async function evaluateModel(
  model: tf.LayersModel,
  testData: tf.Tensor,
  testLabels: tf.Tensor
) {
  const { data: processedData, labels: processedLabels } = preprocessData(testData, testLabels);
  
  const result = await model.evaluate(processedData, processedLabels);
  const testLoss = result[0].dataSync()[0];
  const testAccuracy = result[1].dataSync()[0];
  
  return {
    loss: testLoss,
    accuracy: testAccuracy
  };
}