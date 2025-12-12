// Fichier: src/types/index.ts

export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  displayPrice?: string;
  rating: number;
  imageUrl: string;
  description?: string;
  amenities?: { 
    baths: number; 
    sqft?: number; 
    kitchen?: number 
  };
}
