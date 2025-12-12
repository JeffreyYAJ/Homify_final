import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Star, MapPin, Bath, Utensils, Phone, Send } from 'lucide-react'; // BedDouble retiré
import { Hotel } from '../types';

interface DetailsProps {
  hotel: Hotel;
  onBack: () => void;
}

export default function PropertyDetailsScreen({ hotel, onBack }: DetailsProps) {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0 relative animate-in fade-in slide-in-from-bottom-10 duration-300">
      <div className="md:max-w-6xl md:mx-auto md:p-6 md:grid md:grid-cols-2 md:gap-8">
        
        {/* Section Image */}
        <div className="relative h-[400px] md:h-[500px] md:rounded-3xl overflow-hidden">
          <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pt-10 md:pt-4">
            <button onClick={onBack} className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/40"><ArrowLeft className="w-6 h-6" /></button>
            <div className="flex gap-3">
              <button className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white"><Share2 className="w-5 h-5" /></button>
              <button className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white"><Heart className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        {/* Section Info */}
        <div className="px-5 pt-6 md:px-0 md:pt-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              {/* DISCOUNT RETIRÉ ICI */}
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{hotel.name}</h1>
            </div>
            <div className="flex items-center gap-1 mt-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-sm font-medium text-gray-700">{hotel.rating}</span></div>
          </div>
          <p className="text-gray-500 text-sm mb-6 flex items-center gap-1"><MapPin className="w-4 h-4" /> {hotel.location}</p>

          <div className="flex border-b border-gray-100 mb-6">
            {['About', 'Gallery', 'Review'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 pr-6 text-sm font-semibold transition-colors relative ${activeTab === tab ? 'text-blue-900' : 'text-gray-400'}`}>{tab}{activeTab === tab && <span className="absolute bottom-0 left-0 w-8 h-1 bg-blue-900 rounded-t-full"></span>}</button>
            ))}
          </div>

          <div className="flex gap-6 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {/* LISTE AMENITIES MISE À JOUR (PLUS DE BEDS) */}
            {[
                { icon: Bath, label: `${hotel.amenities?.baths || 1} Bath` }, 
                { icon: Utensils, label: `${hotel.amenities?.kitchen || 1} Kitchen` }
            ].map((item, idx) => (
               <div key={idx} className="flex flex-col items-center gap-2 min-w-[60px]"><div className="p-3 bg-gray-100 rounded-xl text-gray-600"><item.icon className="w-6 h-6" /></div><span className="text-xs font-medium text-gray-500">{item.label}</span></div>
            ))}
          </div>
          
          <h3 className="font-bold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">{hotel.description || "No description available."}</p>

          <div className="hidden md:flex justify-between items-center pt-6 border-t">
              <div><span className="text-sm text-gray-500">Total Price</span><div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-blue-900">${hotel.price}</span><span className="text-sm text-gray-400">/night</span></div></div>
              <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800">Book Now</button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-5 md:hidden z-20 flex justify-between items-center">
         <div><span className="text-xs text-gray-400 block mb-1">Total Price</span><div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-blue-900">${hotel.price}</span><span className="text-sm text-gray-500">/night</span></div></div>
         <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold shadow-lg">Book Now</button>
      </div>
    </div>
  );
}
