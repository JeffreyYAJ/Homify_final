// Fichier: src/screens/FavoritesScreen.tsx
import React from 'react';
import { Bell, Settings2 } from 'lucide-react';
import { allHotels } from '../data/mockData'; // Assure-toi que tes données sont à jour
import { FavoriteCard } from '../components/Cards';
import { Hotel } from '../types';

interface FavProps {
  onHotelClick: (h: Hotel) => void;
}

export default function FavoritesScreen({ onHotelClick }: FavProps) {
  // Je filtre pour ne prendre que les hôtels qui ont un style "Maison" pour l'exemple
  // Dans un vrai app, ce serait une liste filtrée par l'utilisateur
  const myFavorites = [allHotels[0], allHotels[2]]; 

  return (
    <div className="px-4 pt-2 animate-in slide-in-from-right-10 duration-300 pb-24">
      
      {/* Header Spécifique aux Favoris */}
      <div className="flex justify-between items-center mb-6">
         <div>
            <p className="text-gray-400 text-sm">Good morning</p>
            <h1 className="text-xl font-bold text-gray-900">Sarah</h1>
         </div>
         <div className="flex gap-3">
             <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"><Bell className="w-6 h-6" /></button>
             <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"><Settings2 className="w-6 h-6" /></button>
         </div>
      </div>

      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl font-bold text-gray-900">Favorite Houses</h2>
        <button className="text-blue-500 text-sm font-medium hover:underline">See all</button>
      </div>

      {/* Grille des favoris */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
         {myFavorites.map((hotel) => (
            <FavoriteCard key={hotel.id} hotel={hotel} onClick={() => onHotelClick(hotel)} />
         ))}
      </div>
    </div>
  );
}