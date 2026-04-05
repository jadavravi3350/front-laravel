'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Car {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  color: string;
  condition: string;
  features: string[];
  images: string[];
  main_image: string;
  description: string;
  views: number;
}

interface Seller {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  profile_image: string;
}

const DUMMY_CARS_DETAIL: { [key: number]: Car } = {
  1: {
    id: 1,
    title: '2020 Toyota Camry',
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 22000,
    mileage: 45000,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    color: 'Silver',
    condition: 'Used',
    features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'ABS'],
    images: [],
    main_image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=400&fit=crop',
    description: 'Beautiful Toyota Camry in perfect condition. Well maintained with regular service records. Ideal family car with excellent fuel efficiency.',
    views: 342,
  },
  2: {
    id: 2,
    title: '2019 Honda Civic',
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    price: 19000,
    mileage: 52000,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    color: 'Black',
    condition: 'Used',
    features: ['Air Conditioning', 'Power Steering', 'CD Player', 'Power Mirrors'],
    images: [],
    main_image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=500&h=400&fit=crop',
    description: 'Reliable Honda Civic with low mileage. Single owner, accident free. Great for daily commute. All papers in order.',
    views: 289,
  },
  3: {
    id: 3,
    title: '2021 Tesla Model 3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2021,
    price: 45000,
    mileage: 20000,
    fuel_type: 'Electric',
    transmission: 'Automatic',
    color: 'White',
    condition: 'Used',
    features: ['Autopilot', 'Touchscreen', 'Premium Audio', 'Supercharging'],
    images: [],
    main_image: 'https://images.unsplash.com/photo-1560958089-b8a63dd8aa8b?w=500&h=400&fit=crop',
    description: 'Premium Tesla Model 3 with latest technology. Electric vehicle with excellent range and performance. Perfect eco-friendly option.',
    views: 567,
  },
};

const DUMMY_SELLERS: { [key: number]: Seller } = {
  1: {
    id: 1,
    first_name: 'Ahmad',
    last_name: 'Khan',
    phone: '+92 300 1234567',
    email: 'seller@test.com',
    profile_image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seller1',
  },
  2: {
    id: 2,
    first_name: 'Fatima',
    last_name: 'Ali',
    phone: '+92 321 9876543',
    email: 'seller2@example.com',
    profile_image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seller2',
  },
};

export default function CarDetailPage() {
  const params = useParams();
  const carId = parseInt(params.id as string);
  const [car, setCar] = useState<Car | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const carData = DUMMY_CARS_DETAIL[carId];
      const sellerData = DUMMY_SELLERS[1]; // Default to first seller
      
      if (carData) {
        setCar(carData);
        setSeller(sellerData);
      }
      setIsLoading(false);
    }, 300);
  }, [carId]);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!car) {
    return <div className="text-center py-12">Car not found</div>;
  }

  const handleAddToCart = () => {
    alert('✅ Added to cart! Go to /cart to view');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src={car.main_image}
              alt={car.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Basic Info */}
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-600 text-sm">Brand</p>
                <p className="font-semibold">{car.brand}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Model</p>
                <p className="font-semibold">{car.model}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Year</p>
                <p className="font-semibold">{car.year}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Mileage</p>
                <p className="font-semibold">{car.mileage?.toLocaleString()} km</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Fuel</p>
                <p className="font-semibold">{car.fuel_type}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Transmission</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Color</p>
                <p className="font-semibold">{car.color}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Condition</p>
                <p className="font-semibold">{car.condition}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700">{car.description}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* Price & Cart */}
          <div className="bg-white p-6 rounded-lg shadow mb-4 sticky top-4">
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Price</p>
              <p className="text-4xl font-bold text-blue-600">
                ${car.price.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold mb-2"
            >
              Add to Cart
            </button>

            <Link
              href="/cart"
              className="w-full block text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              View Cart
            </Link>

            {seller && (
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-4">Seller Information</h3>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold mb-4">
                    {seller.first_name} {seller.last_name}
                  </p>

                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold mb-4">{seller.phone}</p>

                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{seller.email}</p>
                </div>

                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                  Contact Seller
                </button>
              </div>
            )}
          </div>

          <div className="text-center text-sm text-gray-600">
            👀 Views: {car.views}
          </div>
        </div>
      </div>
    </div>
  );
}

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!car) {
    return <div className="text-center py-12">Car not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
            {car.main_image ? (
              <Image
                src={car.main_image}
                alt={car.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* Title & Basic Info */}
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-600 text-sm">Brand</p>
                <p className="font-semibold">{car.brand}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Model</p>
                <p className="font-semibold">{car.model}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Year</p>
                <p className="font-semibold">{car.year}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Mileage</p>
                <p className="font-semibold">{car.mileage?.toLocaleString()} km</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Fuel</p>
                <p className="font-semibold">{car.fuel_type}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Transmission</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Color</p>
                <p className="font-semibold">{car.color}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Condition</p>
                <p className="font-semibold">{car.condition}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700">{car.description}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* Price & Cart */}
          <div className="bg-white p-6 rounded-lg shadow mb-4 sticky top-4">
            <div className="mb-4">
              <p className="text-gray-600 text-sm">Price</p>
              <p className="text-4xl font-bold text-blue-600">
                ${car.price.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold mb-2"
            >
              Add to Cart
            </button>

            {seller && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Seller Information</h3>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold mb-4">
                    {seller.first_name} {seller.last_name}
                  </p>

                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold mb-4">{seller.phone}</p>

                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{seller.email}</p>
                </div>

                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                  Contact Seller
                </button>
              </div>
            )}
          </div>

          <div className="text-center text-sm text-gray-600">
            👀 Views: {car.views}
          </div>
        </div>
      </div>
    </div>
  );
}
