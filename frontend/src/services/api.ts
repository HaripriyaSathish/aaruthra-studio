import {
  BookingRequest,
  ContactMessage,
  GalleryPhoto,
  PackageItem,
  ServiceItem,
  StoryItem,
  StudioInfoData,
  TestimonialItem
} from '../types';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${options?.method || 'GET'} ${path} failed (${res.status}): ${body.slice(0, 200)}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ---- Backend DTO shapes (snake_case, as returned by Django REST Framework) ----

interface StudioInfoDTO {
  id: number;
  name: string;
  tagline: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  founder_name: string;
  experience_years: string;
  weddings_photographed: string;
  heirloom_albums: string;
  client_rating: string;
  hero_image: string | null;
  parallax_image: string | null;
  photographer_image: string | null;
}

interface StoryDTO {
  id: number;
  title: string;
  couple: string;
  subtitle: string | null;
  location: string;
  date: string;
  cover_image: string;
  excerpt: string;
  full_story: string;
  highlights: string[];
  gallery_images: string[];
}

interface ServiceDTO {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
  deliverables: string[];
  starting_price: string;
  cover_image: string;
  is_popular: boolean;
}

interface GalleryDTO {
  id: number;
  title: string;
  category: GalleryPhoto['category'];
  category_label: string;
  location: string;
  image_url: string;
  cloudinary_public_id: string | null;
}

interface PackageDTO {
  id: number;
  name: string;
  badge: string | null;
  description: string;
  price: string;
  price_raw: number;
  duration: string;
  photographers: string;
  inclusions: string[];
  is_popular: boolean;
}

interface TestimonialDTO {
  id: number;
  name: string;
  role: string;
  wedding_date_venue: string;
  rating: number;
  quote: string;
  avatar_url: string;
}

interface BookingDTO {
  id: number;
  client_name: string;
  email: string;
  phone: string;
  event_date: string;
  event_type: string;
  package_name: string;
  venue_location: string;
  guest_count: string | null;
  notes: string | null;
  status: BookingRequest['status'];
  estimated_amount: string | null;
  created_at: string;
}

interface ContactMessageDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferred_contact: ContactMessage['preferredContact'];
  replied: boolean;
  created_at: string;
}

// ---- Mappers: DTO (snake_case) -> frontend shape (camelCase) ----

const toStudioInfo = (d: StudioInfoDTO): StudioInfoData => ({
  name: d.name,
  tagline: d.tagline,
  city: d.city,
  state: d.state,
  address: d.address,
  phone: d.phone,
  whatsappNumber: d.whatsapp_number,
  email: d.email,
  founderName: d.founder_name,
  experienceYears: d.experience_years,
  weddingsPhotographed: d.weddings_photographed,
  heirloomAlbums: d.heirloom_albums,
  clientRating: d.client_rating,
  heroImage: d.hero_image || '',
  parallaxImage: d.parallax_image || '',
  photographerImage: d.photographer_image || ''
});

const toStory = (d: StoryDTO): StoryItem => ({
  id: String(d.id),
  title: d.title,
  couple: d.couple,
  subtitle: d.subtitle || '',
  location: d.location,
  date: d.date,
  image: d.cover_image,
  excerpt: d.excerpt,
  fullStory: d.full_story,
  highlights: d.highlights || [],
  galleryImages: d.gallery_images || []
});

const toService = (d: ServiceDTO): ServiceItem => ({
  id: String(d.id),
  title: d.title,
  subtitle: d.subtitle || '',
  description: d.description,
  image: d.cover_image,
  startingPrice: d.starting_price,
  features: d.deliverables || []
});

const toGalleryPhoto = (d: GalleryDTO): GalleryPhoto => ({
  id: String(d.id),
  title: d.title,
  category: d.category,
  categoryLabel: d.category_label,
  location: d.location,
  image: d.image_url,
  cloudinaryPublicId: d.cloudinary_public_id || undefined
});

const toPackage = (d: PackageDTO): PackageItem => ({
  id: String(d.id),
  name: d.name,
  badge: d.badge || undefined,
  description: d.description,
  price: d.price,
  priceRaw: d.price_raw,
  duration: d.duration,
  photographers: d.photographers,
  inclusions: d.inclusions || [],
  popular: d.is_popular
});

const toTestimonial = (d: TestimonialDTO): TestimonialItem => ({
  id: String(d.id),
  name: d.name,
  role: d.role,
  location: d.wedding_date_venue,
  quote: d.quote,
  avatar: d.avatar_url,
  rating: d.rating
});

const toBooking = (d: BookingDTO): BookingRequest => ({
  id: String(d.id),
  clientName: d.client_name,
  email: d.email,
  phone: d.phone,
  eventDate: d.event_date,
  eventType: d.event_type,
  packageId: '',
  packageName: d.package_name,
  venueLocation: d.venue_location,
  guestCount: d.guest_count || '',
  notes: d.notes || undefined,
  status: d.status,
  createdAt: d.created_at,
  estimatedAmount: d.estimated_amount || undefined
});

const toContactMessage = (d: ContactMessageDTO): ContactMessage => ({
  id: String(d.id),
  name: d.name,
  email: d.email,
  phone: d.phone,
  subject: d.subject,
  message: d.message,
  preferredContact: d.preferred_contact,
  createdAt: d.created_at,
  replied: d.replied
});

// ---- Public API ----

export const Api = {
  async getStudioInfo(): Promise<StudioInfoData | null> {
    const list = await request<StudioInfoDTO[]>('/studio-info/');
    return list.length > 0 ? toStudioInfo(list[0]) : null;
  },

  async getStories(): Promise<StoryItem[]> {
    const list = await request<StoryDTO[]>('/stories/');
    return list.map(toStory);
  },

  async getServices(): Promise<ServiceItem[]> {
    const list = await request<ServiceDTO[]>('/services/');
    return list.map(toService);
  },

  async getGallery(category?: string): Promise<GalleryPhoto[]> {
    const qs = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    const list = await request<GalleryDTO[]>(`/gallery/${qs}`);
    return list.map(toGalleryPhoto);
  },

  async addGalleryPhoto(photo: {
    title: string;
    category: GalleryPhoto['category'];
    categoryLabel: string;
    location: string;
    image: string;
  }): Promise<GalleryPhoto> {
    const dto = await request<GalleryDTO>('/gallery/', {
      method: 'POST',
      body: JSON.stringify({
        title: photo.title,
        category: photo.category,
        category_label: photo.categoryLabel,
        location: photo.location,
        image_url: photo.image
      })
    });
    return toGalleryPhoto(dto);
  },

  async deleteGalleryPhoto(id: string): Promise<void> {
    await request<void>(`/gallery/${id}/`, { method: 'DELETE' });
  },

  async getPackages(): Promise<PackageItem[]> {
    const list = await request<PackageDTO[]>('/packages/');
    return list.map(toPackage);
  },

  async updatePackagePrice(id: string, price: string, priceRaw: number): Promise<PackageItem> {
    const dto = await request<PackageDTO>(`/packages/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ price, price_raw: priceRaw })
    });
    return toPackage(dto);
  },

  async getTestimonials(): Promise<TestimonialItem[]> {
    const list = await request<TestimonialDTO[]>('/testimonials/');
    return list.map(toTestimonial);
  },

  async getBookings(status?: string): Promise<BookingRequest[]> {
    const qs = status && status !== 'all' ? `?status=${encodeURIComponent(status)}` : '';
    const list = await request<BookingDTO[]>(`/bookings/${qs}`);
    return list.map(toBooking);
  },

  async createBooking(booking: {
    clientName: string;
    email: string;
    phone: string;
    eventDate: string;
    eventType: string;
    packageName: string;
    venueLocation: string;
    guestCount: string;
    notes?: string;
    estimatedAmount?: string;
  }): Promise<BookingRequest> {
    const dto = await request<BookingDTO>('/bookings/', {
      method: 'POST',
      body: JSON.stringify({
        client_name: booking.clientName,
        email: booking.email,
        phone: booking.phone,
        event_date: booking.eventDate,
        event_type: booking.eventType,
        package_name: booking.packageName,
        venue_location: booking.venueLocation,
        guest_count: booking.guestCount,
        notes: booking.notes || '',
        estimated_amount: booking.estimatedAmount || ''
      })
    });
    return toBooking(dto);
  },

  async updateBookingStatus(id: string, status: BookingRequest['status']): Promise<BookingRequest> {
    const dto = await request<BookingDTO>(`/bookings/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    return toBooking(dto);
  },

  async deleteBooking(id: string): Promise<void> {
    await request<void>(`/bookings/${id}/`, { method: 'DELETE' });
  },

  async getMessages(): Promise<ContactMessage[]> {
    const list = await request<ContactMessageDTO[]>('/messages/');
    return list.map(toContactMessage);
  },

  async createMessage(msg: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    preferredContact: ContactMessage['preferredContact'];
  }): Promise<ContactMessage> {
    const dto = await request<ContactMessageDTO>('/messages/', {
      method: 'POST',
      body: JSON.stringify({
        name: msg.name,
        email: msg.email,
        phone: msg.phone,
        subject: msg.subject,
        message: msg.message,
        preferred_contact: msg.preferredContact
      })
    });
    return toContactMessage(dto);
  },

  async markMessageReplied(id: string): Promise<ContactMessage> {
    const dto = await request<ContactMessageDTO>(`/messages/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ replied: true })
    });
    return toContactMessage(dto);
  },

  async deleteMessage(id: string): Promise<void> {
    await request<void>(`/messages/${id}/`, { method: 'DELETE' });
  }
};