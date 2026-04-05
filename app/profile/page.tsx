'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: number;
  car_id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  status: string;
  created_at: string;
  delivery_address: string;
}

// 🎭 Dummy Orders
const DUMMY_ORDERS: Order[] = [
  {
    id: 101,
    car_id: 1,
    title: '2020 Toyota Camry',
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 22000,
    status: 'completed',
    created_at: '2025-03-15',
    delivery_address: '123 Main Street, City',
  },
  {
    id: 102,
    car_id: 3,
    title: '2021 Tesla Model 3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2021,
    price: 45000,
    status: 'pending',
    created_at: '2025-04-01',
    delivery_address: '456 Oak Avenue, Town',
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>(DUMMY_ORDERS);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: '',
      city: '',
      state: '',
      country: '',
    });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    const updated = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
    setIsEditing(false);
    alert('✅ Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>

            {!isEditing ? (
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Type:</span> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{user.userType}</span>
                </p>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-2"
                >
                  Edit Profile
                </button>

                {user.userType === 'seller' && (
                  <Link
                    href="/sell"
                    className="w-full block text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mb-2"
                  >
                    Sell a Car
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">📦 My Orders</h2>

            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{order.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {order.brand} {order.model} • {order.year}
                        </p>
                        <p className="mt-2">
                          <span className="font-semibold">Price:</span> ${order.price.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Status:</span>{' '}
                          <span className={`px-2 py-1 rounded text-xs font-semibold
                            ${order.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : ''}
                          `}>
                            {order.status.toUpperCase()}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          Ordered: {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>

            {!isEditing ? (
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Type:</span> {user.user_type}
                </p>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-2"
                >
                  Edit Profile
                </button>

                {user.user_type === 'seller' && (
                  <Link
                    href="/sell"
                    className="w-full block text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mb-2"
                  >
                    Sell a Car
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>

            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{order.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {order.brand} {order.model} • {order.year}
                        </p>
                        <p className="mt-2">
                          <span className="font-semibold">Price:</span> ${order.price.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Status:</span>{' '}
                          <span className={`px-2 py-1 rounded text-xs font-semibold
                            ${order.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : ''}
                          `}>
                            {order.status}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          Ordered: {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
