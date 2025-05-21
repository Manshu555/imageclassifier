import React, { useRef, useState, useEffect } from 'react';
import { PenLine, RotateCcw } from 'lucide-react';
import { canvasToImageData } from '../utils/imageUtils';

interface DrawCanvasProps {
  width?: number;
  height?: number;
  onImageReady: (imageData: ImageData) => void;
  isProcessing: boolean;
}

const DrawCanvas: React.FC<DrawCanvasProps> = ({
  width = 280,
  height = 280,
  onImageReady,
  isProcessing
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDraw, setHasDraw] = useState(false);
  
  // Setup canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing style
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'black';
  }, []);
  
  // Drawing handlers
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isProcessing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    setHasDraw(true);
    
    // Get coordinates
    const pos = getPointerPosition(e, canvas);
    
    // Start new path
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };
  
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isProcessing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get coordinates
    const pos = getPointerPosition(e, canvas);
    
    // Draw line
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    
    // Process the drawn image after a small delay to ensure it's complete
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const imageData = canvasToImageData(canvas);
      onImageReady(imageData);
    }, 200);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDraw(false);
  };
  
  // Helper function to get pointer position
  const getPointerPosition = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    // Handle both mouse and touch events
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Draw Image</h2>
      
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={`touch-none w-full ${isProcessing ? 'opacity-50' : ''}`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      <div className="mt-3 flex justify-between">
        <div className="text-sm text-gray-600 flex items-center">
          <PenLine className="h-4 w-4 mr-1" />
          Draw something that matches the selected dataset
        </div>
        
        <button
          type="button"
          onClick={clearCanvas}
          disabled={isProcessing || !hasDraw}
          className={`
            px-3 py-1 rounded flex items-center text-sm
            ${hasDraw && !isProcessing
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Clear
        </button>
      </div>
    </div>
  );
};

export default DrawCanvas;