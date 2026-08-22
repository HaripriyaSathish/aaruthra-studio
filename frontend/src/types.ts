export interface StoryItem {
  id: string;
  title: string;
  couple: string;
  subtitle: string;
  location: string;
  date: string;
  image: string;
  excerpt: string;
  fullStory: string;
  highlights: string[];
  galleryImages: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  startingPrice: string;
  features: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'muhurtham' | 'couples' | 'rituals' | 'portraits';
  categoryLabel: string;
  location: string;
  image: string;
  cloudinaryPublicId?: string;
  aspect?: string;
}

export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  description: string;
  price: string;
  priceRaw: number;
  duration: string;
  photographers: string;
  inclusions: string[];
  deliverables?: string[];
  popular?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface BookingRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  packageId: string;
  packageName: string;
  venueLocation: string;
  guestCount: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  estimatedAmount?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact: 'whatsapp' | 'email' | 'call';
  createdAt: string;
  replied?: boolean;
}

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
  enabled: boolean;
}

export interface StudioInfoData {
  name: string;
  tagline: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  founderName: string;
  experienceYears: string;
  weddingsPhotographed: string;
  heirloomAlbums: string;
  clientRating: string;
  heroImage: string;
  parallaxImage: string;
  photographerImage: string;
}