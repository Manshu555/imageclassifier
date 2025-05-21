import { ModelInfo } from '../types';

export const MODELS: Record<string, ModelInfo> = {
  mnist: {
    id: 'mnist',
    name: 'MNIST Handwritten Digits',
    description: 'Classifies handwritten digits from 0-9',
    imageSize: [28, 28],
    grayscale: true,
    classes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    modelPath: '/models/mnist/model.json'
  },
  'fashion-mnist': {
    id: 'fashion-mnist',
    name: 'Fashion MNIST',
    description: 'Classifies fashion items like shirts, shoes, etc.',
    imageSize: [28, 28],
    grayscale: true,
    classes: [
      'T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
      'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot'
    ],
    modelPath: '/models/fashion-mnist/model.json'
  },
  cifar10: {
    id: 'cifar10',
    name: 'CIFAR-10',
    description: 'Classifies 10 different types of objects',
    imageSize: [32, 32],
    grayscale: false,
    classes: [
      'Airplane', 'Automobile', 'Bird', 'Cat', 'Deer',
      'Dog', 'Frog', 'Horse', 'Ship', 'Truck'
    ],
    modelPath: '/models/cifar10/model.json'
  }
};

// Example images for each dataset to show in the dataset explorer
export const DATASET_EXAMPLES = {
  mnist: [
    { id: 1, label: '0', imageUrl: 'https://storage.googleapis.com/tfjs-models/assets/mnist/0.png' },
    { id: 2, label: '1', imageUrl: 'https://storage.googleapis.com/tfjs-models/assets/mnist/1.png' },
    { id: 3, label: '2', imageUrl: 'https://storage.googleapis.com/tfjs-models/assets/mnist/2.png' },
    { id: 4, label: '3', imageUrl: 'https://storage.googleapis.com/tfjs-models/assets/mnist/3.png' }
  ],
  'fashion-mnist': [
    { id: 1, label: 'T-shirt/top', imageUrl: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 2, label: 'Trouser', imageUrl: 'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 3, label: 'Pullover', imageUrl: 'https://images.pexels.com/photos/6347548/pexels-photo-6347548.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 4, label: 'Dress', imageUrl: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ],
  cifar10: [
    { id: 1, label: 'Airplane', imageUrl: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 2, label: 'Automobile', imageUrl: 'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 3, label: 'Bird', imageUrl: 'https://images.pexels.com/photos/45851/bird-blue-cristata-cyanocitta-45851.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 4, label: 'Cat', imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ]
};