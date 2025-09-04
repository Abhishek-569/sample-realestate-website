import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  onSearch?: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export interface SearchFilters {
  keyword: string;
  type: 'all' | 'sale' | 'rent';
  propertyType: 'all' | 'apartment' | 'house' | 'villa' | 'office' | 'land';
  priceMin: number;
  priceMax: number;
  bedrooms: number;
  bathrooms: number;
  minSquareFootage: number;
  furnished: 'all' | 'yes' | 'no';
  city: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch, initialFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(
    initialFilters || {
      keyword: '',
      type: 'all',
      propertyType: 'all',
      priceMin: 0,
      priceMax: 10000000,
      bedrooms: 0,
      bathrooms: 0,
      minSquareFootage: 0,
      furnished: 'all',
      city: '',
    }
  );

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onSearch) {
      onSearch(newFilters);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      keyword: '',
      type: 'all' as const,
      propertyType: 'all' as const,
      priceMin: 0,
      priceMax: 10000000,
      bedrooms: 0,
      bathrooms: 0,
      minSquareFootage: 0,
      furnished: 'all' as const,
      city: '',
    };
    setFilters(clearedFilters);
    if (onSearch) {
      onSearch(clearedFilters);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by location, property type, or keywords..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.keyword}
          onChange={(e) => handleFilterChange('keyword', e.target.value)}
        />
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-full py-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <Filter className="h-4 w-4 mr-2" />
        <span>{isExpanded ? 'Hide Filters' : 'Show Filters'}</span>
      </button>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="all">All</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="office">Office</option>
                <option value="land">Land</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Bedrooms</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', parseInt(e.target.value))}
              >
                <option value={0}>Any</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
                <option value={5}>5+</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Bathrooms</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={filters.bathrooms}
                onChange={(e) => handleFilterChange('bathrooms', parseInt(e.target.value))}
              >
                <option value={0}>Any</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
              </select>
            </div>

            {/* Furnished */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Furnished</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={filters.furnished}
                onChange={(e) => handleFilterChange('furnished', e.target.value)}
              >
                <option value="all">All</option>
                <option value="yes">Furnished</option>
                <option value="no">Unfurnished</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <input
                type="number"
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={filters.priceMin || ''}
                onChange={(e) => handleFilterChange('priceMin', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <input
                type="number"
                placeholder="No limit"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={filters.priceMax === 10000000 ? '' : filters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value) || 10000000)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;

export { SearchFilters }