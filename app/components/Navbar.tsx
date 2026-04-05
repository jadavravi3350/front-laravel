'use client';

import Link from 'next/link';
import { ShoppingCart, Home, Package } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

export default function Navbar() {
  const { items } = useCart();
  const itemCount = items.length;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CT</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CustomTee</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition"
            >
              <Package size={18} />
              <span>Products</span>
            </Link>
            <Link
              href="/customizer"
              className="text-gray-600 hover:text-gray-900 font-medium transition"
            >
              Design Now
            </Link>
          </div>

          <Link
            href="/cart"
            className="relative flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
