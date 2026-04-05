'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats] = useState({
    totalUsers: 1250,
    totalCars: 456,
    totalOrders: 892,
    totalRevenue: 15250000,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    if (userData.userType !== 'admin') {
      router.push('/');
      return;
    }
    
    setUser(userData);
  }, [router]);

  if (!user) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">⚙️ Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-sm mb-2">Total Cars Listed</p>
          <p className="text-3xl font-bold text-green-600">{stats.totalCars.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-sm mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-purple-600">{stats.totalOrders.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-orange-600">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">👥 Manage Users</h2>
          <p className="text-gray-600 mb-4">View, edit, or remove user accounts</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Manage Users
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">🚗 Manage Cars</h2>
          <p className="text-gray-600 mb-4">Review or remove car listings</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Manage Cars
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">📦 View Orders</h2>
          <p className="text-gray-600 mb-4">Monitor all purchase transactions</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Orders
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">📊 Reports</h2>
          <p className="text-gray-600 mb-4">Generate platform analytics and reports</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Reports
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-xl font-semibold mb-4">📈 Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b">
            <span>New user registered: John Doe</span>
            <span className="text-gray-600 text-sm">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b">
            <span>Car listed: 2020 BMW X5</span>
            <span className="text-gray-600 text-sm">1 hour ago</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b">
            <span>Order placed: Tesla Model 3</span>
            <span className="text-gray-600 text-sm">30 minutes ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span>New review posted: Toyota Camry</span>
            <span className="text-gray-600 text-sm">15 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-2">Total Cars Listed</p>
          <p className="text-3xl font-bold text-green-600">{stats.totalCars}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-purple-600">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-orange-600">${stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <p className="text-gray-600 mb-4">View, edit, or remove user accounts</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Manage Users
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Cars</h2>
          <p className="text-gray-600 mb-4">Review or remove car listings</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Manage Cars
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">View Orders</h2>
          <p className="text-gray-600 mb-4">Monitor all purchase transactions</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Orders
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          <p className="text-gray-600 mb-4">Generate platform analytics and reports</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
