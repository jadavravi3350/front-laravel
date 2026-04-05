'use client';

import React, { useState } from 'react';
import CarCard from '@/app/components/CarCard';
import SearchFilter from '@/app/components/SearchFilter';
import Link from 'next/link';

interface Car {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  main_image: string;
}

interface FilterType {
  brand?: string;
  model?: string;
  minPrice?: string;
  maxPrice?: string;
  year?: string;
}

const DUMMY_CARS: Car[] = [
  {
    id: 1,
    title: '2020 Toyota Camry',
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 22000,
    mileage: 45000,
    main_image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=400&fit=crop',
  },
  {
    id: 2,
    title: '2019 Honda Civic',
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    price: 19000,
    mileage: 52000,
    main_image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=500&h=400&fit=crop',
  },
  {
    id: 3,
    title: '2021 Tesla Model 3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2021,
    price: 45000,
    mileage: 20000,
    main_image: 'https://images.unsplash.com/photo-1560958089-b8a63dd8aa8b?w=500&h=400&fit=crop',
  },
  {
    id: 4,
    title: '2018 BMW X5',
    brand: 'BMW',
    model: 'X5',
    year: 2018,
    price: 35000,
    mileage: 65000,
    main_image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&h=400&fit=crop',
  },
  {
    id: 5,
    title: '2022 Ford F-150',
    brand: 'Ford',
    model: 'F-150',
    year: 2022,
    price: 55000,
    mileage: 15000,
    main_image: 'https://images.unsplash.com/photo-1533473359331-35acda7ce3b1?w=500&h=400&fit=crop',
  },
  {
    id: 6,
    title: '2020 Chevrolet Malibu',
    brand: 'Chevrolet',
    model: 'Malibu',
    year: 2020,
    price: 21000,
    mileage: 48000,
    main_image: 'https://images.unsplash.com/photo-1525576489084-38cc453f3a32?w=500&h=400&fit=crop',
  },
];

export default function Home() {
  const [cars, setCars] = useState<Car[]>(DUMMY_CARS);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (newFilters: FilterType) => {
    setIsLoading(true);

    let filtered = DUMMY_CARS;

    if (newFilters.brand) {
      filtered = filtered.filter((car) =>
        car.brand.toLowerCase().includes(newFilters.brand!.toLowerCase())
      );
    }

    if (newFilters.model) {
      filtered = filtered.filter((car) =>
        car.model.toLowerCase().includes(newFilters.model!.toLowerCase())
      );
    }

    if (newFilters.minPrice) {
      filtered = filtered.filter(
        (car) => car.price >= parseFloat(newFilters.minPrice!)
      );
    }

    if (newFilters.maxPrice) {
      filtered = filtered.filter(
        (car) => car.price <= parseFloat(newFilters.maxPrice!)
      );
    }

    if (newFilters.year) {
      filtered = filtered.filter(
        (car) => car.year === parseInt(newFilters.year!)
      );
    }

    setTimeout(() => {
      setCars(filtered);
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-3xl p-12 mb-10 shadow-lg shadow-blue-200/30">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">Find Your Next Car</h1>
          <p className="text-lg text-blue-100 mb-6">
            Browse premium cars, compare prices, and connect with sellers instantly.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-white text-blue-700 px-7 py-3 rounded-full font-semibold shadow-md hover:bg-blue-50">
            Start Selling or Buying
          </Link>
        </div>
      </section>

      <div className="mb-8">
        <SearchFilter onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <div className="text-center py-16">
          <p className="text-gray-600">Loading cars...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
          <p className="text-gray-600 text-lg">No cars found with these filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
