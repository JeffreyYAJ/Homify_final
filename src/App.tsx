// Fichier: src/App.tsx
import React, { useState } from 'react';
import { User } from 'lucide-react';

// Imports des composants
import { BottomNav } from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
import { Hotel } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const renderContent = () => {
    // 1. Priorité aux détails si une maison est cliquée
    if (selectedHotel) {
      return <PropertyDetailsScreen hotel={selectedHotel} onBack={() => setSelectedHotel(null)} />;
    }

    // 2. Sinon, on navigue selon les onglets du footer
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onHotelClick={setSelectedHotel} />;
      
      case 'Favorites':
        // C'est ici qu'on appelle notre nouveau fichier
        return <FavoritesScreen onHotelClick={setSelectedHotel} />;
        
      case 'Search':
      case 'AI':
      case 'Profile':
        return (
          <div className="flex flex-col items-center justify-center h-screen text-gray-400">
            <User className="w-16 h-16 mb-4 opacity-20" />
            <p>Page {activeTab} en construction</p>
          </div>
        );
      default:
        return <HomeScreen onHotelClick={setSelectedHotel} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <div className="max-w-7xl mx-auto pt-6 md:pt-10">
        {renderContent()}
      </div>
      
      {/* Le Footer est caché si on est sur la page de détails */}
      {!selectedHotel && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}