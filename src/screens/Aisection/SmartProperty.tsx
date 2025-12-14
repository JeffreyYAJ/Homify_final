import React, { useState } from 'react';
import { Search, MapPin, Sparkles, ChevronDown, Bed, Bath, Home } from 'lucide-react';

interface Property {
  id: number;
  image: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  location: string;
  status: 'Available' | 'Nearby';
  tags: string[];
}

const SmartPropertySearch = () => {
  const [minPrice, setMinPrice] = useState('$500K');
  const [maxPrice, setMaxPrice] = useState('$1.5M');
  const [minBeds, setMinBeds] = useState('2+');
  const [minBaths, setMinBaths] = useState('2+');
  const [location, setLocation] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Sample property data
  const properties: Property[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      price: '$1.25M',
      beds: 3,
      baths: 2,
      sqft: 1850,
      location: 'Pacific Heights, San Francisco',
      status: 'Available',
      tags: ['Great Schools', 'Near Transit']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      price: '$1.18M',
      beds: 3,
      baths: 3,
      sqft: 1950,
      location: 'Marina District, San Francisco',
      status: 'Nearby',
      tags: ['Family-Friendly', 'Trendy Area']
    }
  ];

  const handleSearch = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white pt-4 pb-6 px-4 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
            <Search className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Smart Property Search
        </h1>
        <p className="text-center text-gray-500 text-sm">
          AI-powered property finder
        </p>
      </div>

      {/* Search Form */}
      <div className="px-4 py-6 space-y-4">
        {/* Location Input */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <select
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-200 text-gray-700"
            >
              <option>Min Price</option>
              <option>$500K</option>
              <option>$750K</option>
              <option>$1M</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-200 text-gray-700"
            >
              <option>Max Price</option>
              <option>$1.5M</option>
              <option>$2M</option>
              <option>$3M</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Beds & Baths */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <select
              value={minBeds}
              onChange={(e) => setMinBeds(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-200 text-gray-700"
            >
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={minBaths}
              onChange={(e) => setMinBaths(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-200 text-gray-700"
            >
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Find AI Matches
        </button>
      </div>

      {/* AI Recommendations */}
      {showRecommendations && (
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">AI Recommendations</h2>
          </div>

          {/* Property Cards */}
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                {/* Property Image */}
                <div className="relative h-48">
                  <img
                    src={property.image}
                    alt={property.location}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full">
                    <span className={`text-xs font-semibold ${
                      property.status === 'Available' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {property.status === 'Available' ? '95% Match' : '92% Match'}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{property.price}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      property.status === 'Available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {property.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.beds} bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.baths} bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      <span>{property.sqft} sq ft</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{property.location}</p>

                  <div className="flex flex-wrap gap-2">
                    {property.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-3 py-1 rounded-full ${
                          index === 0 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'bg-orange-50 text-orange-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartPropertySearch;