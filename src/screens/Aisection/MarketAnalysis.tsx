import React, { useState } from 'react';
import { TrendingUp, Search, MapPin, Sparkles, Calendar, DollarSign, Home, ArrowUp, ArrowDown, Loader2, AlertCircle } from 'lucide-react';

interface MarketData {
  location: string;
  medianPrice: string;
  priceChange: number;
  daysOnMarket: number;
  marketChange: number;
  inventoryLevel: number;
  trendData: number[];
  predictions?: {
    marketTrend: string;
    bestTimeToBuy: string;
    highDemandAreas: string;
  };
  dataSource?: string;
  listingsAnalyzed?: number;
}

const MarketAnalysis = () => {
  const [location, setLocation] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  
  // Replace this with your actual n8n webhook URL
  const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/market-analysis';

  const handleSearch = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError('');
    setShowAnalysis(false);
    setMarketData(null);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: location.trim(),
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Check if n8n returned an error
      if (data.error) {
        setError(data.message || 'No data available for this location. Please try a different city.');
        return;
      }

      // Validate that we received actual data from n8n
      if (!data.location || !data.medianPrice) {
        setError('Invalid data received from server. Please try again.');
        return;
      }

      // Use ONLY the data from n8n - no fallbacks or test data
      setMarketData({
        location: data.location,
        medianPrice: data.medianPrice,
        priceChange: data.priceChange,
        daysOnMarket: data.daysOnMarket,
        marketChange: data.marketChange,
        inventoryLevel: data.inventoryLevel,
        trendData: data.trendData,
        predictions: data.predictions,
        dataSource: data.dataSource,
        listingsAnalyzed: data.listingsAnalyzed
      });
      
      setShowAnalysis(true);
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Unable to connect to the market analysis service. Please check your connection and try again.');
    } finally {
      setLoading(false);
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
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
            disabled={loading}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full mt-3 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze Market
            </>
          )}
        </button>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Market Data Card */}
      {showAnalysis && marketData && (
        <div className="px-4 space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
          {/* Data Source Badge */}
          {marketData.dataSource === 'real' && marketData.listingsAnalyzed && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-blue-700">
                Real-time data from {marketData.listingsAnalyzed} property listings
              </p>
            </div>
          )}

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
                  {marketData.priceChange >= 0 ? (
                    <ArrowUp className="w-3 h-3 text-green-600" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-red-600" />
                  )}
                  <span className={`text-xs font-semibold ${marketData.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {marketData.priceChange >= 0 ? '+' : ''} {marketData.priceChange}%
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
                  {marketData.marketChange >= 0 ? (
                    <ArrowUp className="w-3 h-3 text-purple-600" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-purple-600" />
                  )}
                  <span className="text-xs text-purple-600 font-semibold">
                    {marketData.marketChange >= 0 ? '+' : ''} {marketData.marketChange}%
                  </span>
                </div>
              </div>
            </div>

            {/* Price Trend Graph */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Price Trend</p>
              <div className="relative h-24 flex items-end justify-between gap-1">
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-full"></div>
                
                {marketData.trendData && marketData.trendData.length > 0 ? (
                  marketData.trendData.map((value, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${Math.max(value, 5)}%` }}
                      title={`Period ${index + 1}: ${value}%`}
                    ></div>
                  ))
                ) : (
                  <div className="flex-1 flex items-center justify-center text-xs text-gray-400">
                    No trend data available
                  </div>
                )}
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
                  style={{ width: `${Math.min(Math.max(marketData.inventoryLevel, 0), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* AI Predictions Section */}
          {marketData.predictions && (
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">AI Predictions</h3>
              </div>
              
              <div className="space-y-3">
                {marketData.predictions.marketTrend && (
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Market Trend
                      </p>
                      <p className="text-xs text-gray-600">
                        {marketData.predictions.marketTrend}
                      </p>
                    </div>
                  </div>
                )}

                {marketData.predictions.bestTimeToBuy && (
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Best Time to Buy
                      </p>
                      <p className="text-xs text-gray-600">
                        {marketData.predictions.bestTimeToBuy}
                      </p>
                    </div>
                  </div>
                )}

                {marketData.predictions.highDemandAreas && (
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Home className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        High Demand Areas
                      </p>
                      <p className="text-xs text-gray-600">
                        {marketData.predictions.highDemandAreas}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarketAnalysis;