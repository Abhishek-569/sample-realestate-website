import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, List, SortAsc } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import SearchFilters, { SearchFilters as SearchFiltersType } from '../components/SearchFilters';
import { mockProperties } from '../data/mockData';
import { Property } from '../types/property';

const Properties: React.FC = () => {
  const location = useLocation();
  const initialFilters = location.state?.filters;
  
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'views'>('newest');
  const [savedProperties, setSavedProperties] = useState<string[]>(['1', '3']);

  const handleSearch = (filters: SearchFiltersType) => {
    let filtered = [...mockProperties];

    // Apply filters
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(keyword) ||
        property.city.toLowerCase().includes(keyword) ||
        property.neighborhood.toLowerCase().includes(keyword) ||
        property.propertyType.toLowerCase().includes(keyword)
      );
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }

    if (filters.city) {
      filtered = filtered.filter(property =>
        property.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.bedrooms > 0) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms);
    }

    if (filters.bathrooms > 0) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathrooms);
    }

    if (filters.priceMin > 0 || filters.priceMax < 10000000) {
      filtered = filtered.filter(property =>
        property.price >= filters.priceMin && property.price <= filters.priceMax
      );
    }

    if (filters.furnished !== 'all') {
      filtered = filtered.filter(property =>
        property.furnished === (filters.furnished === 'yes')
      );
    }

    if (filters.minSquareFootage > 0) {
      filtered = filtered.filter(property => property.squareFootage >= filters.minSquareFootage);
    }

    setProperties(filtered);
  };

  const handleSort = (sortOption: typeof sortBy) => {
    setSortBy(sortOption);
    const sorted = [...properties].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });
    setProperties(sorted);
  };

  const handleSaveProperty = (propertyId: string) => {
    setSavedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  useEffect(() => {
    if (initialFilters) {
      handleSearch(initialFilters);
    }
  }, [initialFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Properties for Sale & Rent
          </h1>
          <p className="text-gray-600">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>

        {/* Search Filters */}
        <div className="mb-8">
          <SearchFilters onSearch={handleSearch} initialFilters={initialFilters} />
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">View:</span>
            <div className="flex bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as typeof sortBy)}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Property Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSave={handleSaveProperty}
              isSaved={savedProperties.includes(property.id)}
            />
          ))}
        </div>

        {/* No Results */}
        {properties.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all properties</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;