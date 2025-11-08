'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface FiltersProps {
  countries: string[];
  selectedCountry?: string;
  onCountryChange: (country: string | undefined) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  countries,
  selectedCountry,
  onCountryChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="w-5 h-5" />
          <span className="font-semibold">Filters:</span>
        </div>
        
        <div>
          <label className="text-sm text-gray-600 mr-2">Country:</label>
          <select
            value={selectedCountry || ''}
            onChange={(e) => onCountryChange(e.target.value || undefined)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="text-sm text-gray-600 mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="match">Match Score</option>
            <option value="ranking">World Ranking</option>
            <option value="tuition-low">Tuition (Low to High)</option>
            <option value="tuition-high">Tuition (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
