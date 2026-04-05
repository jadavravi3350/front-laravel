'use client';

import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const router = useRouter();
  const { items, removeItem, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-6 border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-20 h-24 rounded-lg shadow"
                        style={{ backgroundColor: item.color }}
                      >
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white opacity-50">
                          T
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 flex items-center space-x-2">
                          <span>Color:</span>
                          <span
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.color }}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <p className="text-2xl font-bold text-blue-600">
                        ${item.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">$5.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">
                      ${((total + 5) * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-blue-600">
                      ${(total + 5 + (total + 5) * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold text-lg mb-3">
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => router.push('/products')}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Continue Shopping
                </button>

                {items.length > 0 && (
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          'Are you sure you want to clear your cart?'
                        )
                      ) {
                        clearCart();
                      }
                    }}
                    className="w-full mt-3 px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-semibold"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 CustomTee. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
