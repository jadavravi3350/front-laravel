'use client';

import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const PRODUCTS = [
  {
    id: '1',
    name: 'Classic Cotton Tee',
    price: 19.99,
    color: '#FFFFFF',
  },
  {
    id: '2',
    name: 'Navy Blue Tee',
    price: 19.99,
    color: '#000080',
  },
  {
    id: '3',
    name: 'Red Premium Tee',
    price: 24.99,
    color: '#FF0000',
  },
  {
    id: '4',
    name: 'Black Casual Tee',
    price: 19.99,
    color: '#000000',
  },
  {
    id: '5',
    name: 'Green Organic Tee',
    price: 22.99,
    color: '#00AA00',
  },
  {
    id: '6',
    name: 'Purple Retro Tee',
    price: 21.99,
    color: '#800080',
  },
  {
    id: '7',
    name: 'Orange Summer Tee',
    price: 19.99,
    color: '#FFA500',
  },
  {
    id: '8',
    name: 'Gray Neutral Tee',
    price: 18.99,
    color: '#808080',
  },
];

export default function Products() {
  const router = useRouter();
  const { addItem } = useCart();

  const handleCustomize = (productId: string) => {
    router.push(`/customizer?product=${productId}`);
  };

  const handleAddToCart = (product: any) => {
    addItem(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Collection</h1>
          <p className="text-lg text-blue-100">
            Choose from our premium T-shirt collection and customize it your way.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Showing {PRODUCTS.length} Products
              </h2>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              image=""
              onCustomize={handleCustomize}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 CustomTee. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
