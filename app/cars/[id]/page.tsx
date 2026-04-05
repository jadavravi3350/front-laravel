'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface CarDetail {
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
}

const DUMMY_CARS_DETAIL: { [key: number]: CarDetail } = {
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
    main_image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=400&fit=crop',
    description: 'Well-maintained Toyota Camry with full service history. Comfortable, efficient, and perfect for daily driving.',
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
    features: ['Air Conditioning', 'Power Steering', 'CD Player', 'Cruise Control'],
    main_image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=500&h=400&fit=crop',
    description: 'Reliable Honda Civic in excellent condition. Comfortable ride and great fuel economy.',
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
    features: ['Autopilot', 'Touchscreen', 'Premium Audio', 'Fast Charging'],
    main_image: 'https://images.unsplash.com/photo-1560958089-b8a63dd8aa8b?w=500&h=400&fit=crop',
    description: 'Premium Tesla Model 3 with advanced features and impressive range.',
    views: 567,
  },
};

const SELLER: Seller = {
  id: 1,
  first_name: 'Ahmad',
  last_name: 'Khan',
  phone: '+92 300 1234567',
  email: 'seller@test.com',
};

export default function CarDetailPage() {
  const params = useParams();
  const carId = parseInt(params?.id as string, 10);
  const [car, setCar] = useState<CarDetail | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const carData = DUMMY_CARS_DETAIL[carId];
      if (carData) {
        setCar(carData);
        setSeller(SELLER);
      }
      setIsLoading(false);
    }, 300);
  }, [carId]);

  if (isLoading) {
    return <div className="text-center py-16">Loading car details...</div>;
  }

  if (!car) {
    return <div className="text-center py-16">Car not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
            <img src={car.main_image} alt={car.title} className="h-96 w-full object-cover" />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h1 className="text-3xl font-bold mb-3">{car.title}</h1>
            <p className="text-gray-600 mb-4">{car.brand} • {car.model} • {car.year}</p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold text-blue-600">${car.price.toLocaleString()}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Mileage</p>
                <p className="font-semibold">{car.mileage.toLocaleString()} km</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Transmission</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Fuel</p>
                <p className="font-semibold">{car.fuel_type}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{car.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-gray-500 text-sm">Seller Price</p>
            <p className="text-4xl font-bold text-blue-600 mb-6">${car.price.toLocaleString()}</p>
            <button
              onClick={() => alert('✅ Added to cart!')}
              className="w-full rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <Link href="/cart" className="mt-3 block text-center rounded-full border border-blue-600 px-5 py-3 text-blue-600 hover:bg-blue-50">
              View Cart
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{seller?.first_name} {seller?.last_name}</p>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">{seller?.phone}</p>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{seller?.email}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg text-center">
            <p className="text-sm text-gray-500">Views</p>
            <p className="mt-2 text-2xl font-semibold">{car.views.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
