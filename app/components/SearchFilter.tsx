'use client';

import React, { useState } from 'react';

export interface FilterType {
  brand?: string;
  model?: string;
  minPrice?: string;
  maxPrice?: string;
  year?: string;
}

interface SearchFilterProps {
  onSearch: (filters: FilterType) => void;
}

export default function SearchFilter({ onSearch }: SearchFilterProps) {
  const [filters, setFilters] = useState<FilterType>({
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    year: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters: FilterType = {
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      year: '',
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="grid gap-4 md:grid-cols-5">
        <input
          type="text"
          name="brand"
          value={filters.brand || ''}
          onChange={handleChange}
          placeholder="Brand"
          className="border border-gray-300 rounded-3xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="model"
          value={filters.model || ''}
          onChange={handleChange}
          placeholder="Model"
          className="border border-gray-300 rounded-3xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice || ''}
          onChange={handleChange}
          placeholder="Min Price"
          className="border border-gray-300 rounded-3xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice || ''}
          onChange={handleChange}
          placeholder="Max Price"
          className="border border-gray-300 rounded-3xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="year"
          value={filters.year || ''}
          onChange={handleChange}
          placeholder="Year"
          className="border border-gray-300 rounded-3xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border border-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSearch}
          className="rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}
