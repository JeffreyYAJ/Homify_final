import React, { useState } from 'react';
import { 
  MapPin, Bell, Search, SlidersHorizontal, Star, Heart, 
  Home, User, BrainCircuit, ArrowLeft, Share2, 
  BedDouble, Bath, Utensils, Armchair, Phone, Send
} from 'lucide-react';

// --- 1. TYPES ET DONNÉES UNIFIÉS ---

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  discount?: string;
  description?: string; // Ajouté pour la page de détails
  amenities?: { beds: number; baths: number; kitchen: number }; // Ajouté pour les détails
}

// Données enrichies pour fonctionner sur les deux pages
const allHotels: Hotel[] = [
  {
    id: 1,
    name: "HarborHaven Hideaway",
    location: "1012 Ocean av, New York, USA",
    price: 650,
    rating: 4.5,
    discount: "10% Off",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600",
    description: "Experience luxury living in this stunning modern hideaway. Featuring state-of-the-art amenities, a spacious open-plan living area, and breathtaking views.",
    amenities: { beds: 3, baths: 1, kitchen: 3 }
  },
  {
    id: 2,
    name: "PrinstonHouse",
    location: "Nkolfoulou, Yde",
    price: 550,
    rating: 4.8,
    discount: "15% Off",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600",
    description: "A cozy and artistic house located in the suburbs, perfect for creative minds seeking inspiration and calm.",
    amenities: { beds: 2, baths: 2, kitchen: 1 }
  },
  {
    id: 3,
    name: "Luxury Villa",
    location: "Paris, France",
    price: 850,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600",
    description: "High-end villa in the heart of Paris. Close to all monuments with a private garden.",
    amenities: { beds: 5, baths: 3, kitchen: 2 }
  },
  {
    id: 102,
    name: "Urban Retreat",
    location: "Manhattan, NY",
    price: 450,
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=600",
    description: "Modern apartment in the city center. Ideal for business trips.",
    amenities: { beds: 1, baths: 1, kitchen: 1 }
  }
];

// --- 2. COMPOSANTS DE LA PAGE D'ACCUEIL (HOME) ---

const Header = () => (
  <header className="flex justify-between items-center mb-6">
    <div>
      <p className="text-gray-400 text-xs">Location</p>
      <div className="flex items-center gap-1 text-blue-950 font-bold text-lg cursor-pointer">
        <MapPin className="w-5 h-5 text-blue-600" />
        <span>New York, USA</span>
        <span className="text-xs">▼</span>
      </div>
    </div>
    <div className="relative p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100">
      <Bell className="w-6 h-6 text-black" />
      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
    </div>
  </header>
);

const SearchSection = () => (
  <div className="flex gap-4 mb-8">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input 
        type="text" 
        placeholder="Search" 
        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
    <button className="bg-blue-600 p-3 rounded-xl text-white hover:bg-blue-700 transition">
      <SlidersHorizontal className="w-6 h-6" />
    </button>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex justify-between items-end mb-4">
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    <button className="text-blue-500 text-sm font-medium hover:underline">See all</button>
  </div>
);

// Carte horizontale (Recommended)
const RecommendedCard = ({ hotel, onClick }: { hotel: Hotel; onClick: () => void }) => (
  <div onClick={onClick} className="min-w-[260px] bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer group">
    <div className="relative mb-3 overflow-hidden rounded-xl">
      <img 
        src={hotel.imageUrl} 
        alt={hotel.name} 
        className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" 
      />
      <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:text-red-500">
        <Heart className="w-4 h-4" />
      </button>
      {hotel.discount && (
        <span className="absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-md">
          {hotel.discount}
        </span>
      )}
    </div>
    <div className="flex justify-between items-start mb-1">
      <h3 className="font-bold text-gray-800 text-lg">{hotel.name}</h3>
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium text-gray-600">{hotel.rating}</span>
      </div>
    </div>
    <div className="flex items-center text-gray-500 text-sm mb-2">
      <MapPin className="w-3 h-3 mr-1" />
      {hotel.location}
    </div>
    <div className="flex items-end gap-1">
      <span className="font-bold text-gray-900 text-lg">${hotel.price}</span>
      <span className="text-gray-400 text-sm mb-1">/night</span>
    </div>
  </div>
);

// Carte verticale (Nearby)
const NearbyCard = ({ hotel, onClick }: { hotel: Hotel; onClick: () => void }) => (
  <div onClick={onClick} className="bg-white p-3 rounded-2xl shadow-sm flex gap-4 hover:shadow-md transition cursor-pointer group">
    <div className="relative w-28 h-28 flex-shrink-0">
      <img 
        src={hotel.imageUrl} 
        alt={hotel.name} 
        className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition duration-300"
      />
      <button className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:text-red-500">
        <Heart className="w-3 h-3" />
      </button>
    </div>
    
    <div className="flex-1 flex flex-col justify-center">
      {hotel.discount && (
        <span className="text-blue-500 text-xs font-bold mb-1">{hotel.discount}</span>
      )}
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-gray-800 text-lg leading-tight">{hotel.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-600">{hotel.rating}</span>
        </div>
      </div>
      <div className="flex items-center text-gray-500 text-xs mt-1 mb-2">
        <MapPin className="w-3 h-3 mr-1" />
        {hotel.location}
      </div>
      <div>
        <span className="font-bold text-gray-900">${hotel.price}</span>
        <span className="text-gray-400 text-xs"> /night</span>
      </div>
    </div>
  </div>
);

const BottomNav = () => {
  const [active, setActive] = useState('Home');
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
            onClick={() => setActive(item.name)}
            className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 ${
              active === item.name 
                ? 'bg-blue-900 text-white px-4' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon className={`w-6 h-6 ${active === item.name ? 'fill-current' : ''}`} />
            {active === item.name && <span className="text-sm font-medium">{item.name}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- 3. PAGE D'ACCUEIL PRINCIPALE (Composant Wrapper) ---

const RealEstateHome = ({ onHotelClick }: { onHotelClick: (h: Hotel) => void }) => {
  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 pt-6 md:pt-10">
        <Header />
        <SearchSection />

        <section className="mb-8">
          <SectionHeader title="Recommended Hotel" />
          <div className="flex overflow-x-auto pb-4 gap-4 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-4 md:mx-0 md:px-0 md:overflow-visible">
            {allHotels.slice(0, 3).map(hotel => (
              <RecommendedCard key={hotel.id} hotel={hotel} onClick={() => onHotelClick(hotel)} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Nearby Hotel" />
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {allHotels.slice(1, 4).map(hotel => (
              <NearbyCard key={hotel.id} hotel={hotel} onClick={() => onHotelClick(hotel)} />
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </div>
  );
};

// --- 4. PAGE DE DÉTAILS (Property Details) ---

const PropertyDetails = ({ hotel, onBack }: { hotel: Hotel; onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0 relative animate-in fade-in slide-in-from-right-10 duration-300">
      <div className="md:max-w-6xl md:mx-auto md:p-6 md:grid md:grid-cols-2 md:gap-8">
        
        {/* Section Gauche (Image) */}
        <div className="relative h-[400px] md:h-[500px] md:rounded-3xl overflow-hidden">
          <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pt-10 md:pt-4">
            <button onClick={onBack} className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/40 transition">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-3">
              <button className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/40 transition">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/40 transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Section Droite (Info) */}
        <div className="px-5 pt-6 md:px-0 md:pt-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              {hotel.discount && <span className="text-blue-500 font-bold text-sm mb-1 block">{hotel.discount}</span>}
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{hotel.name}</h1>
            </div>
            <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-700">{hotel.rating}</span>
                <span className="text-xs text-gray-400">(365 reviews)</span>
            </div>
          </div>

          <div className="flex justify-between items-start mb-6">
             <p className="text-gray-500 text-sm flex items-center gap-1 w-3/4"><MapPin className="w-4 h-4" /> {hotel.location}</p>
          </div>

          <div className="flex border-b border-gray-100 mb-6">
            {['About', 'Gallery', 'Review'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 pr-6 text-sm font-semibold transition-colors relative ${activeTab === tab ? 'text-blue-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
                {activeTab === tab && <span className="absolute bottom-0 left-0 w-8 h-1 bg-blue-900 rounded-t-full"></span>}
              </button>
            ))}
          </div>

          <div className="flex gap-6 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {[
                { icon: BedDouble, label: `${hotel.amenities?.beds || 3} Beds` },
                { icon: Bath, label: `${hotel.amenities?.baths || 1} Bath` },
                { icon: Utensils, label: `${hotel.amenities?.kitchen || 1} Kitchen` },
                { icon: Armchair, label: 'Living' }
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 min-w-[60px]">
                    <div className="p-3 bg-gray-100 rounded-xl text-gray-600"><item.icon className="w-6 h-6" /></div>
                    <span className="text-xs font-medium text-gray-500 whitespace-nowrap">{item.label}</span>
                </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{hotel.description || "No description available."}</p>
          </div>

          <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" alt="Agent" className="w-12 h-12 rounded-full object-cover"/>
                <div><p className="font-bold text-gray-900">John Doe</p><p className="text-xs text-gray-500">Estate Agent</p></div>
            </div>
            <div className="flex gap-3">
                <button className="p-3 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition shadow-md"><Phone className="w-5 h-5" /></button>
                <button className="p-3 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition shadow-md"><Send className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="hidden md:block mt-6 pt-6 border-t">
             <div className="flex justify-between items-center">
                 <div>
                    <span className="text-sm text-gray-500">Total Price</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-blue-900">${hotel.price}</span>
                        <span className="text-sm text-gray-400">/night</span>
                    </div>
                 </div>
                 <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-200">Book Now</button>
             </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-5 md:hidden z-20">
        <div className="flex justify-between items-center">
            <div>
                <span className="text-xs text-gray-400 block mb-1">Total Price</span>
                <div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-blue-900">${hotel.price}</span><span className="text-sm text-gray-500">/night</span></div>
            </div>
            <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-200">Book Now</button>
        </div>
      </div>
    </div>
  );
};

// --- 5. APPLICATION PRINCIPALE ---

export default function App() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  return (
    <div>
      {selectedHotel ? (
        <PropertyDetails 
            hotel={selectedHotel} 
            onBack={() => setSelectedHotel(null)} 
        />
      ) : (
        <RealEstateHome onHotelClick={setSelectedHotel} />
      )}
    </div>
  );
}