'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
}

interface Order {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  status: string;
  created_at: string;
}

const DUMMY_ORDERS: Order[] = [
  {
    id: 101,
    title: '2020 Toyota Camry',
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 22000,
    status: 'completed',
    created_at: '2025-03-15',
  },
  {
    id: 102,
    title: '2021 Tesla Model 3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2021,
    price: 45000,
    status: 'pending',
    created_at: '2025-04-01',
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
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
    if (typeof window === 'undefined') return;
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    try {
      const parsed = JSON.parse(storedUser) as UserProfile;
      setUser(parsed);
      setFormData({
        firstName: parsed.firstName || '',
        lastName: parsed.lastName || '',
        phone: parsed.phone || '',
        city: parsed.city || '',
        state: parsed.state || '',
        country: parsed.country || '',
      });
    } catch {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (!user) return;
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert('✅ Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return <div className="text-center py-16">Loading profile...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-5">My Profile</h2>
          {!isEditing ? (
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {user.userType}
              </p>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full rounded-full bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full rounded-full border border-red-500 px-4 py-3 text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 rounded-full bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 rounded-full border border-gray-300 px-4 py-3 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">You have not placed any orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-3xl border border-gray-200 p-5 hover:shadow-md transition">
                    <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{order.title}</h3>
                        <p className="text-gray-500">{order.brand} {order.model} • {order.year}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">${order.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="mt-3 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
                      Status: {order.status}
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


