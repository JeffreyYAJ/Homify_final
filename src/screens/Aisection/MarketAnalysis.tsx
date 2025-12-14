import React, { useState } from 'react';
import { TrendingUp, Search, MapPin, Sparkles, Calendar, DollarSign, Home, ArrowUp, ArrowDown } from 'lucide-react';

interface MarketData {
  location: string;
  medianPrice: string;
  priceChange: number;
  daysOnMarket: number;
  marketChange: number;
  inventoryLevel: number;
  trendData: number[];
}

const MarketAnalysis = () => {
  const [location, setLocation] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Sample market data
  const marketData: MarketData = {
    location: 'San Francisco, CA',
    medianPrice: '$1.2M',
    priceChange: 5.2,
    daysOnMarket: 18,
    marketChange: 3.2,
    inventoryLevel: 65,
    trendData: [20, 35, 45, 50, 60, 65, 70, 65]
  };

  const handleSearch = () => {
    if (location.trim()) {
      setShowAnalysis(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Market Analysis
        </h1>
        <p className="text-center text-gray-500 text-sm">
          AI-powered real-estate market insights
        </p>
      </div>

      {/* Search Section */}
      <div className="px-4 py-6">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter city or ZIP code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Market Data Card */}
      {showAnalysis && (
        <div className="px-4 space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
          {/* Location Header */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {marketData.location}
            </h2>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Median Price */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                <p className="text-xs text-gray-600 mb-1">Median Price</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {marketData.medianPrice}
                </p>
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600 font-semibold">
                    + {marketData.priceChange}%
                  </span>
                </div>
              </div>

              {/* Days on Market */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                <p className="text-xs text-gray-600 mb-1">Days on Market</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {marketData.daysOnMarket}
                </p>
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 text-purple-600" />
                  <span className="text-xs text-purple-600 font-semibold">
                    - {marketData.marketChange}%
                  </span>
                </div>
              </div>
            </div>

            {/* Price Trend Graph */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Price Trend</p>
              <div className="relative h-24 flex items-end justify-between gap-1">
                {/* Progress bar background */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-full"></div>
                
                {/* Trend bars */}
                {marketData.trendData.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Jan</span>
                <span>Aug</span>
              </div>
            </div>

            {/* Inventory Level */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-700">Inventory Level</p>
                <span className="text-sm font-bold text-gray-900">{marketData.inventoryLevel}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${marketData.inventoryLevel}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* AI Predictions Section */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">AI Predictions</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Market Expected to Rise
                  </p>
                  <p className="text-xs text-gray-600">
                    Prices predicted to increase by 3-5% in the next quarter based on current trends.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Best Time to Buy
                  </p>
                  <p className="text-xs text-gray-600">
                    Current inventory levels suggest favorable buying conditions for the next 2-3 months.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    High Demand Areas
                  </p>
                  <p className="text-xs text-gray-600">
                    Downtown and Marina districts showing strongest buyer interest and appreciation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out, slide-in-from-bottom 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MarketAnalysis;