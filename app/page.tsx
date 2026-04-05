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

// 🚗 Dummy Cars Data
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

interface FilterType {
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>(DUMMY_CARS);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (newFilters: FilterType) => {
    setIsLoading(true);
    setFilters(newFilters);
    
    // Filter dummy data locally
    let filtered = DUMMY_CARS;
    
    if (newFilters.brand) {
      filtered = filtered.filter(car => 
        car.brand.toLowerCase().includes(newFilters.brand.toLowerCase())
      );
    }
    if (newFilters.model) {
      filtered = filtered.filter(car => 
        car.model.toLowerCase().includes(newFilters.model.toLowerCase())
      );
    }
    if (newFilters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseFloat(newFilters.minPrice));
    }
    if (newFilters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseFloat(newFilters.maxPrice));
    }
    if (newFilters.year) {
      filtered = filtered.filter(car => car.year === parseInt(newFilters.year));
    }
    
    setTimeout(() => {
      setCars(filtered);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to CarMarket</h1>
        <p className="text-lg mb-6">Find your perfect car or sell yours today. The easiest peer-to-peer car marketplace.</p>
        <Link href="/register" className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 inline-block">
          Get Started
        </Link>
      </section>

      {/* Search Section */}
      <SearchFilter onSearch={handleSearch} />

      {/* Cars Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading cars...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 text-lg">No cars found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
