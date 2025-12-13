import React, { useEffect, useState } from 'react';
import { MapPin, Bell, Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import axios from 'axios'; // <--- N'oublie pas d'importer axios
import { RecommendedCard } from '../components/Cards';
import { Hotel } from '../types';
import { getProperties } from '../services/propertyService';

interface HomeProps {
  onHotelClick: (h: Hotel) => void;
}

export default function HomeScreen({ onHotelClick }: HomeProps) {
  const [properties, setProperties] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // NOUVEL ÉTAT POUR LA LOCALISATION
  const [locationName, setLocationName] = useState("Localisation..."); 

  // 1. Récupérer les propriétés (Ton code existant)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProperties('?ordering=-created_at');
      if (data.length > 0) setProperties(data);
      else setError("Aucune propriété trouvée.");
      setLoading(false);
    };
    fetchData();
  }, []);

  // 2. NOUVEAU : Récupérer la Géolocalisation via Axios + Navigateur
  useEffect(() => {
    // Fonction pour convertir les coords en ville via OpenStreetMap (Gratuit)
    const fetchCityName = async (lat: number, lon: number) => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        const response = await axios.get(url);
        
        const address = response.data.address;
        // On cherche la ville, ou le village, ou la municipalité
        const city = address.city || address.town || address.village || address.municipality || "Ma Position";
        const countryCode = address.country_code ? address.country_code.toUpperCase() : "CMR";
        
        setLocationName(`${city}, ${countryCode}`);
      } catch (err) {
        console.error("Erreur de géocodage inverse", err);
        setLocationName("Location unavailable"); // Fallback en cas d'erreur
      }
    };

    // Demander la permission au navigateur
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Succès : on a les coordonnées, on appelle Axios
          fetchCityName(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          // Erreur ou Refus de l'utilisateur
          console.warn("Géolocalisation refusée ou impossible", error);
          setLocationName("Location unavailable"); // Valeur par défaut
        }
      );
    } else {
      setLocationName("Location unavailable"); // Géolocalisation non supportée
    }
  }, []);

  // --- Affichage du Header MODIFIÉ ---
  const renderHeader = () => (
      <header className="flex justify-between items-center mb-6 px-4 md:px-0">
        <div>
          <p className="text-gray-400 text-xs">Location</p>
          <div className="flex items-center gap-1 text-blue-950 font-bold text-lg cursor-pointer">
            <MapPin className="w-5 h-5 text-blue-600" />
            
            {/* ICI ON AFFICHE L'ÉTAT DYNAMIQUE */}
            <span>{locationName}</span>
            
          </div>
        </div>
        <div className="relative p-2 bg-white rounded-full shadow-sm"><Bell className="w-6 h-6 text-black" /></div>
      </header>
  );

  const renderSearchBar = () => (
      <div className="flex gap-4 mb-8 px-4 md:px-0">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Rechercher..." className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <button className="bg-blue-600 p-3 rounded-xl text-white"><SlidersHorizontal className="w-6 h-6" /></button>
      </div>
  );

  
  
  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="animate-in fade-in duration-300 pb-24">
      {renderHeader()}
      {/* ... reste du JSX ... */}
      <div className="flex gap-4 mb-8 px-4 md:px-0">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Rechercher..." className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
        <button className="bg-blue-600 p-3 rounded-xl text-white"><SlidersHorizontal className="w-6 h-6" /></button>
      </div>

       {error && <div className="p-4 bg-red-50 text-red-500 rounded-lg mx-4 mb-4 text-center text-sm">{error}</div>}

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 px-4 md:px-0">Récemment publiés</h2>
        <div className="flex overflow-x-auto pb-4 gap-4 px-4 scrollbar-hide md:grid md:grid-cols-3 md:px-0">
          {properties.slice(0, 5).map(hotel => (
            <RecommendedCard key={hotel.id} hotel={hotel} onClick={() => onHotelClick(hotel)} />
          ))}
        </div>
      </section>

      <section>
           <h2 className="text-xl font-bold text-gray-900 mb-4 px-4 md:px-0">Toutes les annonces</h2>
           <div className="flex flex-col gap-4 px-4 md:px-0 md:grid md:grid-cols-3">
             {properties.map(hotel => (
               <RecommendedCard key={hotel.id} hotel={hotel} onClick={() => onHotelClick(hotel)} />
             ))}
           </div>
      </section>
    </div>
  );
}

