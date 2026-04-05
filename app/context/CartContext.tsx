'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
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

interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (carId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartId: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const addToCart = async (carId: number, quantity: number) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ carId, quantity }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    await fetchCart();
  };

  const removeFromCart = async (cartId: number) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ cartId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    await fetchCart();
  };

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setItems([]);
      setTotal(0);
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const clearCart = () => {
    setItems([]);
    setTotal(0);
  };

  // Fetch cart when component mounts and when token changes
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ items, total, addToCart, removeFromCart, fetchCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
