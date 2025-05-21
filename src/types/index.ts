export type DatasetType = 'mnist' | 'fashion-mnist' | 'cifar10';

export interface ModelInfo {
  id: DatasetType;
  name: string;
  description: string;
  imageSize: [number, number];
  classes: string[];
  grayscale: boolean;
  modelPath: string;
}

export interface ClassificationResult {
  label: string;
  confidence: number;
  index: number;
}

export interface DatasetExample {
  id: number;
  label: string;
  imageUrl: string;
}