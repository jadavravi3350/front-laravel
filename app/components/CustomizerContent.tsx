'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import { useCart } from '../context/CartContext';
import * as FabricLib from 'fabric';

type FabricObject = FabricLib.Object & {
  type?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  angle?: number;
  scaleX?: number;
  scaleY?: number;
};

interface CustomizerContentProps {}

export default function CustomizerContent() {
  const searchParams = useSearchParams();
  const productId = searchParams?.get('product') || '1';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricLib.Canvas | null>(null);
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
  const { addItem } = useCart();

  // Initialize fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new FabricLib.Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: '#f0f0f0',
    });

    fabricCanvasRef.current = fabricCanvas;

    // Handle object selection
    fabricCanvas.on('object:added', () => {
      fabricCanvas.renderAll();
    });

    fabricCanvas.on('selection:created', (e: any) => {
      setSelectedObject(e.selected[0]);
    });

    fabricCanvas.on('selection:updated', (e: any) => {
      setSelectedObject(e.selected[0]);
    });

    fabricCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    fabricCanvas.on('object:modified', () => {
      fabricCanvas.renderAll();
    });

    // Load design from localStorage
    if (typeof window !== 'undefined') {
      const savedDesign = localStorage.getItem('current_design');
      if (savedDesign) {
        try {
          fabricCanvas.loadFromJSON(savedDesign, () => {
            fabricCanvas.renderAll();
          });
        } catch (error) {
          console.error('Error loading design:', error);
        }
      }
    }

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Auto-save design to localStorage
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (fabricCanvasRef.current && typeof window !== 'undefined') {
        const json = JSON.stringify(fabricCanvasRef.current.toJSON());
        localStorage.setItem('current_design', json);
      }
    }, 1000);

    return () => clearTimeout(autoSaveTimer);
  }, [selectedObject]);

  const handleAddText = (text: string) => {
    if (!fabricCanvasRef.current) return;

    const fabricText = new FabricLib.IText(text, {
      left: 100,
      top: 100,
      fontSize: 40,
      fontFamily: 'Arial',
      fill: '#000000',
      editable: true,
    });

    fabricCanvasRef.current.add(fabricText);
    fabricCanvasRef.current.setActiveObject(fabricText);
    fabricCanvasRef.current.renderAll();
  };

  const handleImageUpload = (file: File) => {
    if (!fabricCanvasRef.current) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const fabricImage = new FabricLib.Image(img, {
          left: 150,
          top: 150,
          scaleX: 0.5,
          scaleY: 0.5,
        });

        fabricCanvasRef.current!.add(fabricImage);
        fabricCanvasRef.current!.setActiveObject(fabricImage);
        fabricCanvasRef.current!.renderAll();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleColorChange = (color: string) => {
    setShirtColor(color);
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.backgroundColor = color as any;
      fabricCanvasRef.current.renderAll();
    }
  };

  const handlePropertyChange = (property: string, value: any) => {
    if (!selectedObject || !fabricCanvasRef.current) return;

    selectedObject.set({ [property]: value });
    fabricCanvasRef.current.renderAll();
  };

  const handleDeleteSelected = () => {
    if (selectedObject && fabricCanvasRef.current) {
      fabricCanvasRef.current.remove(selectedObject);
      fabricCanvasRef.current.renderAll();
      setSelectedObject(null);
    }
  };

  const handleSaveDesign = () => {
    if (fabricCanvasRef.current && typeof window !== 'undefined') {
      const json = JSON.stringify(fabricCanvasRef.current.toJSON());
      localStorage.setItem('current_design', json);
      alert('Design saved to localStorage!');
    }
  };

  const handleDownload = () => {
    if (fabricCanvasRef.current) {
      const link = document.createElement('a');
      link.href = fabricCanvasRef.current.toDataURL({ format: 'png', multiplier: 1 });
      link.download = 'custom-tshirt-design.png';
      link.click();
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: `custom-${Date.now()}`,
      name: 'Custom Designed T-Shirt',
      price: 29.99,
      color: shirtColor,
    });
    alert('Custom design added to cart!');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-full lg:w-80 order-2 lg:order-1">
        <LeftSidebar
          onAddText={handleAddText}
          onImageUpload={handleImageUpload}
          onColorChange={handleColorChange}
          shirtColor={shirtColor}
          onDeleteSelected={handleDeleteSelected}
        />
      </div>

      {/* Center - Canvas */}
      <div className="flex-1 order-1 lg:order-2 p-4 lg:p-8 flex flex-col items-center justify-center overflow-auto">
        <div className="bg-gradient-to-b from-white to-gray-100 p-8 rounded-lg shadow-xl">
          <h2 className="text-center text-gray-600 font-semibold mb-4">
            T-Shirt Preview
          </h2>
          <div className="border-4 border-gray-300 rounded-lg bg-white p-4">
            <canvas ref={canvasRef} className="block mx-auto" />
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg"
          >
            Add to Cart (${29.99})
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 order-3">
        <RightSidebar
          selectedObject={selectedObject}
          onPropertyChange={handlePropertyChange}
          onSave={handleSaveDesign}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
