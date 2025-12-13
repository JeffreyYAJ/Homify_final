import React, { useEffect, useState } from 'react';
import { MapPin, Bell, Search, SlidersHorizontal, Loader2, X, Check } from 'lucide-react';
import axios from 'axios';
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
  
  // États de recherche et localisation
  const [searchQuery, setSearchQuery] = useState(""); 
  const [locationName, setLocationName] = useState("Localisation..."); 

  // --- NOUVEAU : GESTION DES FILTRES ---
  const [showFilters, setShowFilters] = useState(false); // Affiche le modal
  const [filters, setFilters] = useState({
    type: '',         // HOUSE, APARTMENT, etc.
    minPrice: '',
    maxPrice: '',
    city: '',
    ordering: '-created_at' // Tri par défaut (plus récent)
  });

  // Fonction principale pour charger les données
  const fetchProperties = async (customQueryString?: string) => {
    setLoading(true);
    try {
      // Si on fournit une query spécifique (filtre), on l'utilise, sinon on prend celle par défaut
      const queryString = customQueryString || '?ordering=-created_at';
      const data = await getProperties(queryString);
      
      if (data.length > 0) {
        setProperties(data);
        setError(null);
      } else {
        setProperties([]);
        setError("Aucun résultat ne correspond à vos critères.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial
  useEffect(() => {
    fetchProperties();
  }, []);

  // Gestion de la recherche textuelle (Debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // On ne lance la recherche textuelle que si l'utilisateur tape quelque chose
      // et que le modal de filtre n'est pas en train d'être utilisé
      if (searchQuery.trim()) {
        const query = `?search=${encodeURIComponent(searchQuery)}&ordering=${filters.ordering}`;
        fetchProperties(query);
      } else if (!showFilters) {
        // Si on efface la recherche, on recharge la liste par défaut
        fetchProperties(`?ordering=${filters.ordering}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Gestion de la localisation (Inchangé)
  useEffect(() => {
    const fetchCityName = async (lat: number, lon: number) => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        const response = await axios.get(url);
        const address = response.data.address;
        const city = address.city || address.town || address.village || "Ma Position";
        setLocationName(`${city}, CMR`);
      } catch (err) {
        setLocationName("Yaoundé, CMR");
      }
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (p) => fetchCityName(p.coords.latitude, p.coords.longitude),
        () => setLocationName("Yaoundé, CMR")
      );
    }
  }, []);

  // --- APPLICATION DES FILTRES ---
  const applyFilters = () => {
    // On construit l'URL de l'API manuellement
    let query = `?ordering=${filters.ordering}`;
    
    if (filters.type) query += `&type=${filters.type}`;
    if (filters.minPrice) query += `&min_price=${filters.minPrice}`;
    if (filters.maxPrice) query += `&max_price=${filters.maxPrice}`;
    if (filters.city) query += `&city=${filters.city}`;
    
    // On lance la requête
    fetchProperties(query);
    
    // On ferme le modal et on vide la barre de recherche textuelle pour éviter les conflits
    setShowFilters(false);
    setSearchQuery(""); 
  };

  // --- RENDERERS ---

  const renderHeader = () => (
      <header className="flex justify-between items-center mb-6 px-4 md:px-0">
        <div>
          <p className="text-gray-400 text-xs">Location</p>
          <div className="flex items-center gap-1 text-blue-950 font-bold text-lg cursor-pointer">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>{locationName}</span>
          </div>
        </div>
        <div className="relative p-2 bg-white rounded-full shadow-sm"><Bell className="w-6 h-6 text-black" /></div>
      </header>
  );

  return (
    <div className="animate-in fade-in duration-300 pb-24">
      {renderHeader()}
      
      {/* BARRE DE RECHERCHE */}
      <div className="flex gap-4 mb-8 px-4 md:px-0">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* BOUTON FILTRE ACTIF */}
        <button 
          onClick={() => setShowFilters(true)}
          className="bg-blue-600 p-3 rounded-xl text-white hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>
      </div>

       {/* MESSAGE ERREUR */}
       {error && <div className="p-4 bg-red-50 text-red-500 rounded-lg mx-4 mb-4 text-center text-sm">{error}</div>}

       {/* LOADER */}
       {loading && <div className="flex justify-center mb-4"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>}

      {/* LISTE PRINCIPALE */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 px-4 md:px-0">
          {searchQuery || Object.values(filters).some(v => v !== '' && v !== '-created_at') ? "Résultats filtrés" : "Récemment publiés"}
        </h2>
        
        {properties.length > 0 ? (
          <div className="flex overflow-x-auto pb-4 gap-4 px-4 scrollbar-hide md:grid md:grid-cols-3 md:px-0">
            {properties.map(hotel => (
              <RecommendedCard key={hotel.id} hotel={hotel} onClick={() => onHotelClick(hotel)} />
            ))}
          </div>
        ) : (
          !loading && <p className="px-4 text-gray-400 text-sm">Aucune annonce trouvée.</p>
        )}
      </section>

      {/* --- MODAL DE FILTRES --- */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full md:w-[500px] h-[85vh] md:h-auto md:rounded-3xl rounded-t-3xl p-6 shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Filtres</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contenu Scrollable */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              
              {/* Type de bien */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Type de bien</label>
                <div className="grid grid-cols-2 gap-3">
                  {['HOUSE', 'APARTMENT', 'STUDIO', 'ROOM'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilters({...filters, type: filters.type === type ? '' : type})}
                      className={`py-3 rounded-xl text-sm font-medium border transition ${
                        filters.type === type 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {type === 'HOUSE' ? 'Maison' : type === 'APARTMENT' ? 'Appartement' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Budget (FCFA)</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-100"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    />
                  </div>
                  <div className="flex-1">
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-100"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Ville */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ville</label>
                <input 
                  type="text" 
                  placeholder="Ex: Yaoundé, Douala..." 
                  className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-100"
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                />
              </div>

              {/* Tri */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Trier par</label>
                <select 
                  className="w-full p-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-100 text-gray-700"
                  value={filters.ordering}
                  onChange={(e) => setFilters({...filters, ordering: e.target.value})}
                >
                  <option value="-created_at">Plus récents</option>
                  <option value="monthly_rent">Prix croissant</option>
                  <option value="-monthly_rent">Prix décroissant</option>
                  <option value="surface">Surface croissante</option>
                </select>
              </div>

              {/*Reinitialiser filtres*/}
                <div>
                  <button 
                    onClick={() => { setSearchQuery(""); setFilters({ type: '', minPrice: '', maxPrice: '', city: '', ordering: '-created_at' }); }}
                    className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-xl shadow-lg shadow-gray-100 hover:bg-gray-300 transition"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>

            </div>

            {/* Footer Modal (Bouton Appliquer) */}
            <div className="pt-6 mt-4 border-t">
              <button 
                onClick={applyFilters}
                className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-800 transition flex justify-center items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Afficher les résultats
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}