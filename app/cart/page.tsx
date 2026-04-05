'use client';

import React, { useState } from 'react';
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

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveFromCart = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!deliveryAddress) {
      alert('Please enter a delivery address');
      return;
    }

    setIsCheckingOut(true);
    setTimeout(() => {
      alert('? Order placed successfully! Check your profile for order details');
      setItems([]);
      router.push('/profile');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <Link href="/" className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-3xl bg-white p-5 shadow-lg flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500">{item.brand} {item.model} • {item.year}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.price.toLocaleString()}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="mt-3 rounded-full bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows={4}
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your delivery address"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-3xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            <div className="rounded-3xl border border-gray-200 p-5 mb-6">
              <div className="flex justify-between text-gray-500 mb-2">
                <span>Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="text-2xl font-bold">Total: ${total.toLocaleString()}</div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full rounded-full bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-300"
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


