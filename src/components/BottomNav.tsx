// Fichier: src/components/BottomNav.tsx
import React from 'react';
import { Home, Heart, Search, BrainCircuit, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Favorites', icon: Heart },
    { name: 'Search', icon: Search },
    { name: 'AI', icon: BrainCircuit },
    { name: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-6 pb-6 md:hidden z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <button 
            key={item.name}
            onClick={() => onTabChange(item.name)}
            className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 ${
              activeTab === item.name 
                ? 'bg-blue-900 text-white px-4' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon className={`w-6 h-6 ${activeTab === item.name ? 'fill-current' : ''}`} />
            {activeTab === item.name && <span className="text-sm font-medium">{item.name}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};