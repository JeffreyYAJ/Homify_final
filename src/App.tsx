// Fichier: src/App.tsx
import React, { useState } from 'react';
import { User } from 'lucide-react';

// Imports
import { BottomNav } from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen'; // <--- Import du Chat
import { Hotel } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  
  // Nouvel état pour savoir si on est dans le chat
  const [isChatting, setIsChatting] = useState(false); 

  const renderContent = () => {
    // 1. Si on est en mode Chat (Priorité absolue)
    if (isChatting) {
      return (
        <ChatScreen 
          onBack={() => setIsChatting(false)} 
          agentName="John Doe" 
        />
      );
    }

    // 2. Si un hôtel est sélectionné (Détails)
    if (selectedHotel) {
      return (
        <PropertyDetailsScreen 
          hotel={selectedHotel} 
          onBack={() => setSelectedHotel(null)} 
          onBookNow={() => setIsChatting(true)} // <--- Lance le chat
        />
      );
    }

    // 3. Navigation Principale
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onHotelClick={setSelectedHotel} />;
      case 'Favorites':
        return <FavoritesScreen onHotelClick={setSelectedHotel} />;
      case 'Profile':
        return <ProfileScreen />;
      case 'Search':
      case 'AI':
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
      
      {/* On cache le footer si on est dans les détails ou dans le chat */}
      {!selectedHotel && !isChatting && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}