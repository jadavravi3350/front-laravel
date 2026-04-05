'use client';

import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import CustomizerContent from '../components/CustomizerContent';

function CustomizerLoading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading customizer...</p>
      </div>
    </div>
  );
}

export default function Customizer() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<CustomizerLoading />}>
        <CustomizerContent />
      </Suspense>
    </>
  );
}

