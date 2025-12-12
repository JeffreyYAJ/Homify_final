import React from 'react';
import { Heart, Star, MapPin, Bath, SlidersHorizontal } from 'lucide-react'; // BedDouble retiré des imports
import { Hotel } from '../types';

interface CardProps {
  hotel: Hotel;
  onClick: () => void;
}

export const RecommendedCard = ({ hotel, onClick }: CardProps) => (
  <div onClick={onClick} className="min-w-[260px] bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer group">
    <div className="relative mb-3 overflow-hidden rounded-xl">
      <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" />
      <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:text-red-500">
        <Heart className="w-4 h-4" />
      </button>
      {/* SECTION DISCOUNT SUPPRIMÉE ICI */}
    </div>
    <div className="flex justify-between items-start mb-1">
      <h3 className="font-bold text-gray-800 text-lg">{hotel.name}</h3>
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium text-gray-600">{hotel.rating}</span>
      </div>
    </div>
    <div className="flex items-center text-gray-500 text-sm mb-2"><MapPin className="w-3 h-3 mr-1" />{hotel.location}</div>
    <div className="flex items-end gap-1">
      <span className="font-bold text-gray-900 text-lg">${hotel.price}</span><span className="text-gray-400 text-sm mb-1">/night</span>
    </div>
  </div>
);

export const FavoriteCard = ({ hotel, onClick }: CardProps) => (
  <div onClick={onClick} className="mb-6 cursor-pointer group">
    <div className="relative h-64 rounded-3xl overflow-hidden mb-4 shadow-md">
      <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
      <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm p-2 rounded-full">
         <Heart className="w-5 h-5 text-red-500 fill-red-500" />
      </div>
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl">
         <span className="text-white font-bold">{hotel.displayPrice ? hotel.displayPrice : `$${hotel.price}`}</span>
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
      <p className="text-gray-500 text-sm mb-3 flex items-center gap-1"><MapPin className="w-4 h-4" /> {hotel.location}</p>
      
      {/* Amenities Row - Beds retiré */}
      <div className="flex gap-6 text-gray-600 text-sm font-medium">
         {/* SECTION BEDS SUPPRIMÉE ICI */}
         <span className="flex items-center gap-2"><Bath className="w-5 h-5 text-gray-400" /> {hotel.amenities?.baths} Baths</span>
         {hotel.amenities?.sqft && (
           <span className="flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-gray-400 rotate-90" /> {hotel.amenities.sqft} sqft</span>
         )}
      </div>
    </div>
  </div>
);
