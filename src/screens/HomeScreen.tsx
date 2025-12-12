// Fichier: src/screens/HomeScreen.tsx
import React from 'react';
import { MapPin, Bell, Search, SlidersHorizontal } from 'lucide-react';
import { allHotels } from '../data/mockData';
import { RecommendedCard } from '../components/Cards';
import { Hotel } from '../types';

interface HomeProps {
  onHotelClick: (h: Hotel) => void;
}

export default function HomeScreen({ onHotelClick }: HomeProps) {
  return (
    <div className="animate-in fade-in duration-300">
      <header className="flex justify-between items-center mb-6 px-4 md:px-0">
        <div>
          <p className="text-gray-400 text-xs">Location</p>
          <div className="flex items-center gap-1 text-blue-950 font-bold text-lg cursor-pointer">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>New York, USA</span>
          </div>
        </div>
        <div className="relative p-2 bg-white rounded-full shadow-sm"><Bell className="w-6 h-6 text-black" /></div>
      </header>

      <div className="flex gap-4 mb-8 px-4 md:px-0">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <button className="bg-blue-600 p-3 rounded-xl text-white"><SlidersHorizontal className="w-6 h-6" /></button>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 px-4 md:px-0">Recommended Hotel</h2>
        <div className="flex overflow-x-auto pb-4 gap-4 px-4 scrollbar-hide md:grid md:grid-cols-3 md:px-0">
          {/* On ignore le premier élément pour varier l'affichage par rapport aux favoris */}
          {allHotels.slice(1, 4).map(hotel => (
            <RecommendedCard key={hotel.id} hotel={hotel} onClick={() => onHotelClick(hotel)} />
          ))}
        </div>
      </section>

      <section>
           <h2 className="text-xl font-bold text-gray-900 mb-4 px-4 md:px-0">Nearby Hotel</h2>
           <div className="flex flex-col gap-4 px-4 md:px-0 md:grid md:grid-cols-3">
             {allHotels.slice(0, 3).map(hotel => (
               <RecommendedCard key={hotel.id} hotel={hotel} onClick={() => onHotelClick(hotel)} />
             ))}
           </div>
      </section>
    </div>
  );
}