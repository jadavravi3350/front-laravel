'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'buyer' | 'seller' | 'admin';
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Failed to parse user');
        }
      }
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🚗 CarMarket
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Browse Cars
          </Link>

          {user && user.userType === 'seller' && (
            <Link href="/sell" className="text-gray-600 hover:text-gray-900">
              Sell Car
            </Link>
          )}

          <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
            Cart
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {isLoading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 font-medium">
                {user.firstName} 👤
              </Link>
              {user.userType === 'admin' && (
                <Link href="/admin" className="text-orange-600 hover:text-orange-900 font-medium">
                  ⚙️ Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
