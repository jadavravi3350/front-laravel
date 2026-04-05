'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Design Your Own<br />Custom T-Shirt
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Express yourself with our interactive designer. Create unique designs with colors, text, and images.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/customizer"
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Start Designing
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition transform hover:scale-105"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
