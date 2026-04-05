'use client';

import { useState } from 'react';
import { Type, Upload, Palette, Trash2 } from 'lucide-react';

interface LeftSidebarProps {
  onAddText: (text: string) => void;
  onImageUpload: (file: File) => void;
  onColorChange: (color: string) => void;
  shirtColor: string;
  onDeleteSelected: () => void;
}

export default function LeftSidebar({
  onAddText,
  onImageUpload,
  onColorChange,
  shirtColor,
  onDeleteSelected,
}: LeftSidebarProps) {
  const [textInput, setTextInput] = useState('');
  const colors = [
    '#FFFFFF',
    '#000000',
    '#FF0000',
    '#0000FF',
    '#00FF00',
    '#FFFF00',
    '#FFA500',
    '#800080',
    '#FFC0CB',
    '#A52A2A',
    '#808080',
    '#FFD700',
  ];

  const handleAddText = () => {
    if (textInput.trim()) {
      onAddText(textInput);
      setTextInput('');
    }
  };

  return (
    <div className="w-full lg:w-80 bg-white p-4 lg:p-6 border-r border-gray-200 overflow-y-auto max-h-[calc(100vh-64px)]">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Design Tools</h2>

      {/* T-Shirt Color */}
      <div className="mb-8">
        <h3 className="flex items-center space-x-2 text-lg font-semibold mb-4 text-gray-800">
          <Palette size={20} />
          <span>Shirt Color</span>
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`w-full aspect-square rounded-lg border-2 transition ${
                shirtColor === color
                  ? 'border-blue-600 shadow-lg'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Add Text */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h3 className="flex items-center space-x-2 text-lg font-semibold mb-4 text-gray-800">
          <Type size={20} />
          <span>Add Text</span>
        </h3>
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddText()}
          placeholder="Enter text..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />
        <button
          onClick={handleAddText}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Add Text
        </button>
      </div>

      {/* Upload Image */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h3 className="flex items-center space-x-2 text-lg font-semibold mb-4 text-gray-800">
          <Upload size={20} />
          <span>Upload Image</span>
        </h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onImageUpload(e.target.files[0]);
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
        />
      </div>

      {/* Delete */}
      <div>
        <button
          onClick={onDeleteSelected}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center space-x-2"
        >
          <Trash2 size={18} />
          <span>Delete Selected</span>
        </button>
      </div>
    </div>
  );
}
