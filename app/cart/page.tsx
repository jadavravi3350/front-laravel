'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CartItem {
  id: number;
  car_id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  quantity: number;
  main_image: string;
}

// 🛒 Dummy Cart Data
const DUMMY_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    car_id: 1,
    title: '2020 Toyota Camry',
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 22000,
    quantity: 1,
    main_image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=400&fit=crop',
  },
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(DUMMY_CART_ITEMS);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRemoveFromCart = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (!deliveryAddress) {
      alert('Please enter a delivery address');
      return;
    }

    setIsCheckingOut(true);
    setTimeout(() => {
      alert('✅ Order placed successfully! Check your profile for order details');
      setItems([]);
      router.push('/profile');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {items.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.brand} {item.model} • {item.year}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.price.toLocaleString()}</p>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-600 text-sm hover:underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                rows={4}
                placeholder="Enter your delivery address"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              >
                <option value="credit_card">💳 Credit Card</option>
                <option value="bank_transfer">🏦 Bank Transfer</option>
                <option value="cash">💵 Cash</option>
              </select>
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="text-2xl font-bold">
                Total: ${total.toLocaleString()}
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
