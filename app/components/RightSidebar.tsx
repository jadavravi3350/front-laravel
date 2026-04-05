'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Copy } from 'lucide-react';

interface RightSidebarProps {
  selectedObject: any;
  onPropertyChange: (property: string, value: any) => void;
  onSave: () => void;
  onDownload: () => void;
}

const FONTS = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Comic Sans MS',
  'Impact',
];

export default function RightSidebar({
  selectedObject,
  onPropertyChange,
  onSave,
  onDownload,
}: RightSidebarProps) {
  const [fontSize, setFontSize] = useState(40);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [rotation, setRotation] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  useEffect(() => {
    if (selectedObject) {
      setFontSize(selectedObject.fontSize || 40);
      setFontFamily(selectedObject.fontFamily || 'Arial');
      setTextColor(selectedObject.fill || '#000000');
      setRotation(selectedObject.angle || 0);
      setScaleX(selectedObject.scaleX || 1);
      setScaleY(selectedObject.scaleY || 1);
    }
  }, [selectedObject]);

  const handlePropertyChange = (property: string, value: any) => {
    onPropertyChange(property, value);
    if (property === 'fontSize') setFontSize(value);
    if (property === 'fontFamily') setFontFamily(value);
    if (property === 'fill') setTextColor(value);
    if (property === 'angle') setRotation(value);
    if (property === 'scaleX') setScaleX(value);
    if (property === 'scaleY') setScaleY(value);
  };

  if (!selectedObject) {
    return (
      <div className="w-full lg:w-80 bg-white p-4 lg:p-6 border-l border-gray-200 max-h-[calc(100vh-64px)] overflow-y-auto">
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">No object selected</p>
          <p className="text-sm text-gray-400">Click on an element to edit</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 bg-white p-4 lg:p-6 border-l border-gray-200 max-h-[calc(100vh-64px)] overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Properties</h2>

      {/* Font Size */}
      {selectedObject.type === 'i-text' && (
        <>
          <div className="mb-6">
            <label className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Font Size</span>
              <span className="text-lg font-bold text-blue-600">{fontSize}</span>
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePropertyChange('fontSize', fontSize - 5)}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                <ChevronDown size={18} />
              </button>
              <input
                type="range"
                min="10"
                max="120"
                value={fontSize}
                onChange={(e) =>
                  handlePropertyChange('fontSize', parseFloat(e.target.value))
                }
                className="flex-1"
              />
              <button
                onClick={() => handlePropertyChange('fontSize', fontSize + 5)}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                <ChevronUp size={18} />
              </button>
            </div>
          </div>

          {/* Font Family */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => handlePropertyChange('fontFamily', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {FONTS.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Text Color */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => handlePropertyChange('fill', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </>
      )}

      {/* Rotation */}
      <div className="mb-6">
        <label className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Rotation</span>
          <span className="text-lg font-bold text-blue-600">{rotation}°</span>
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => handlePropertyChange('angle', parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Scale */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Scale
        </label>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-600">Width: {(scaleX * 100).toFixed(0)}%</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={scaleX}
              onChange={(e) => handlePropertyChange('scaleX', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Height: {(scaleY * 100).toFixed(0)}%</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={scaleY}
              onChange={(e) => handlePropertyChange('scaleY', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onSave}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center space-x-2"
        >
          <Copy size={18} />
          <span>Save Design</span>
        </button>
        <button
          onClick={onDownload}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Download Design
        </button>
      </div>
    </div>
  );
}
