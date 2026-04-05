'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 🎭 Dummy Authentication
    const dummyUsers: any = {
      'buyer@test.com': { password: 'password', id: 1, firstName: 'Buyer', lastName: 'User', userType: 'buyer' },
      'seller@test.com': { password: 'password', id: 2, firstName: 'Seller', lastName: 'User', userType: 'seller' },
      'admin@test.com': { password: 'password', id: 3, firstName: 'Admin', lastName: 'User', userType: 'admin' },
    };

    setTimeout(() => {
      const user = dummyUsers[formData.email];
      
      if (!user || user.password !== formData.password) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Save to localStorage
      const token = 'dummy_token_' + Math.random().toString(36);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: formData.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      }));

      setIsLoading(false);
      router.push('/');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded text-sm">
          Test Accounts:
          <ul className="mt-2 space-y-1">
            <li>Buyer: buyer@test.com / password</li>
            <li>Seller: seller@test.com / password</li>
            <li>Admin: admin@test.com / password</li>
          </ul>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
