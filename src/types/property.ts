export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'sale' | 'rent';
  propertyType: 'apartment' | 'house' | 'villa' | 'office' | 'land';
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  address: string;
  city: string;
  neighborhood: string;
  furnished: boolean;
  images: string[];
  features: string[];
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  createdAt: string;
  views: number;
  isFeatured: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'buyer' | 'seller' | 'admin';
  savedProperties: string[];
  inquiries: Inquiry[];
}

export interface Inquiry {
  id: string;
  propertyId: string;
  userId: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'responded' | 'closed';
}