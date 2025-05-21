import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Award, AlertTriangle } from 'lucide-react';
import { ClassificationResult as ResultType } from '../types';

interface ClassificationResultProps {
  results: ResultType[];
  isLoading: boolean;
  error: string | null;
}

const ClassificationResult: React.FC<ClassificationResultProps> = ({
  results,
  isLoading,
  error
}) => {
  // Animation for bars
  useEffect(() => {
    if (results.length > 0) {
      const bars = document.querySelectorAll('.result-bar');
      bars.forEach((bar, i) => {
        setTimeout(() => {
          bar.classList.add('transition-all', 'duration-500', 'opacity-100', 'scale-x-100');
        }, i * 50);
      });
    }
  }, [results]);
  
  // No results yet
  if (results.length === 0 && !isLoading && !error) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Classification Results</h2>
        <p className="text-gray-600">
          Upload or draw an image to see classification results
        </p>
      </div>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 animate-pulse">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800">Classifying Image...</h2>
        <div className="h-32 bg-indigo-100 rounded-md"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2 text-red-700">Classification Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Format data for chart
  const chartData = results.slice(0, 5).map(result => ({
    name: result.label,
    confidence: (result.confidence * 100).toFixed(2)
  }));
  
  // Calculate color based on confidence
  const getBarColor = (confidence: number) => {
    if (confidence > 80) return '#4F46E5'; // Primary indigo
    if (confidence > 50) return '#0EA5E9'; // Secondary blue
    if (confidence > 30) return '#8B5CF6'; // Accent purple
    return '#94A3B8'; // Gray
  };
  
  // Format top result
  const topResult = results[0];
  const topConfidence = (topResult.confidence * 100).toFixed(1);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Classification Results</h2>
      
      {/* Top prediction */}
      <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
        <div className="flex items-center">
          <Award className="h-6 w-6 text-indigo-600 mr-3" />
          <div>
            <h3 className="font-bold text-indigo-800 text-lg">
              {topResult.label}
            </h3>
            <p className="text-indigo-600">
              {topConfidence}% confidence
            </p>
          </div>
        </div>
      </div>
      
      {/* Confidence chart */}
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 100]} />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Confidence']}
              contentStyle={{ 
                borderRadius: '0.375rem', 
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
              }}
            />
            <Bar dataKey="confidence" className="result-bar opacity-0 scale-x-0 origin-left">
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(parseFloat(entry.confidence))} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Additional info */}
      <div className="mt-4 text-xs text-gray-500">
        <p>Showing top {chartData.length} predictions from {results.length} classes</p>
      </div>
    </div>
  );
};

export default ClassificationResult;