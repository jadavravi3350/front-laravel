'use client';

import React from 'react';
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
  main_image: string;
}

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/cars/${car.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden cursor-pointer">
        <div className="relative w-full h-48 bg-gray-200">
          {car.main_image ? (
            <Image
              src={car.main_image}
              alt={car.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{car.title}</h3>
          <p className="text-gray-600 text-sm">
            {car.brand} {car.model} • {car.year}
          </p>
          <div className="mt-2 text-sm text-gray-600">
            {car.mileage ? `${car.mileage.toLocaleString()} km` : 'New'}
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              ${car.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
