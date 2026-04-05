'use client';

import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import { useCart } from './context/CartContext';

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
];

export default function Home() {
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
      <HeroSection />

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Featured T-Shirts
        </h2>
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

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-lg mb-6 text-blue-100">
            Design your unique T-shirt now and stand out from the crowd.
          </p>
          <button
            onClick={() => router.push('/customizer')}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Start Designing Today
          </button>
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
