'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminStats {
  totalUsers: number;
  totalCars: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ userType: string } | null>(null);
  const [stats] = useState<AdminStats>({
    totalUsers: 1250,
    totalCars: 456,
    totalOrders: 892,
    totalRevenue: 15250000,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      if (parsed.userType !== 'admin') {
        router.push('/');
        return;
      }
      setUser(parsed);
    } catch {
      router.push('/');
    }
  }, [router]);

  if (!user) {
    return <div className="text-center py-16">Loading admin dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <div className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-2">Total Users</p>
          <p className="text-3xl font-semibold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-2">Total Cars</p>
          <p className="text-3xl font-semibold text-green-600">{stats.totalCars.toLocaleString()}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-2">Total Orders</p>
          <p className="text-3xl font-semibold text-purple-600">{stats.totalOrders.toLocaleString()}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-2">Total Revenue</p>
          <p className="text-3xl font-semibold text-orange-600">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          <p className="text-gray-600 mb-4">Review and manage registered buyers and sellers.</p>
          <button className="rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">Manage Users</button>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">Manage Cars</h2>
          <p className="text-gray-600 mb-4">Review listings and approve top cars.</p>
          <button className="rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">Manage Cars</button>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">View Orders</h2>
          <p className="text-gray-600 mb-4">Monitor recent purchases across the platform.</p>
          <button className="rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">View Orders</button>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          <p className="text-gray-600 mb-4">View performance and analytics for the marketplace.</p>
          <button className="rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">View Reports</button>
        </div>
      </div>
    </div>
  );
}
