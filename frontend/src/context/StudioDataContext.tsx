import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Api } from '../services/api';
import {
  GalleryPhoto,
  PackageItem,
  ServiceItem,
  StoryItem,
  StudioInfoData,
  TestimonialItem
} from '../types';

// Studio details that live only in the frontend (no backend model for these
// yet) — merged on top of the live StudioInfo fetched from the API.
const STUDIO_STATIC_EXTRAS = {
  leadPhotographer: 'Aaruthra Selvan',
  establishedYear: '2012',
  mapCoordinates: { lat: 9.9195, lng: 78.1193 },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15720.916805623058!2d78.1102927236121!3d9.919532585149363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63933!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  socials: {
    instagram: 'https://instagram.com/aaruthra_studio',
    facebook: 'https://facebook.com/aaruthrastudio',
    youtube: 'https://youtube.com/@aaruthrastudio'
  }
};

const FALLBACK_STUDIO_INFO: StudioInfoData = {
  name: 'Aaruthra Studio',
  tagline: 'South Indian Wedding & Heritage Photography',
  city: 'Madurai',
  state: 'Tamil Nadu, India',
  address: '14, West Veli Street, Near Meenakshi Amman Temple, Madurai, Tamil Nadu 625001',
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  email: 'contact@aaruthrastudio.com',
  founderName: 'Aaruthra Selvan',
  experienceYears: '14+',
  weddingsPhotographed: '480+',
  heirloomAlbums: '380+',
  clientRating: '4.9/5',
  heroImage: '',
  parallaxImage: '',
  photographerImage: ''
};

export type StudioInfo = StudioInfoData & typeof STUDIO_STATIC_EXTRAS & {
  stats: { label: string; value: string }[];
};

interface StudioDataContextValue {
  studioInfo: StudioInfo;
  stories: StoryItem[];
  services: ServiceItem[];
  gallery: GalleryPhoto[];
  packages: PackageItem[];
  testimonials: TestimonialItem[];
  loading: boolean;
  error: string | null;
  refreshGallery: () => Promise<void>;
  refreshPackages: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

const StudioDataContext = createContext<StudioDataContextValue | undefined>(undefined);

const buildStudioInfo = (info: StudioInfoData | null): StudioInfo => {
  const base = info || FALLBACK_STUDIO_INFO;
  return {
    ...base,
    ...STUDIO_STATIC_EXTRAS,
    stats: [
      { label: 'Years Behind The Lens', value: base.experienceYears },
      { label: 'Weddings Photographed', value: base.weddingsPhotographed },
      { label: 'Heirloom Albums Delivered', value: base.heirloomAlbums },
      { label: 'Client Rating', value: base.clientRating }
    ]
  };
};

export const StudioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(buildStudioInfo(null));
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshGallery = useCallback(async () => {
    setGallery(await Api.getGallery());
  }, []);

  const refreshPackages = useCallback(async () => {
    setPackages(await Api.getPackages());
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [info, storyList, serviceList, galleryList, packageList, testimonialList] = await Promise.all([
        Api.getStudioInfo(),
        Api.getStories(),
        Api.getServices(),
        Api.getGallery(),
        Api.getPackages(),
        Api.getTestimonials()
      ]);
      setStudioInfo(buildStudioInfo(info));
      setStories(storyList);
      setServices(serviceList);
      setGallery(galleryList);
      setPackages(packageList);
      setTestimonials(testimonialList);
    } catch (err: any) {
      console.error('Failed to load studio data from backend:', err);
      setError(err?.message || 'Unable to reach the Aaruthra Studio backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const value = useMemo<StudioDataContextValue>(
    () => ({ studioInfo, stories, services, gallery, packages, testimonials, loading, error, refreshGallery, refreshPackages, refreshAll }),
    [studioInfo, stories, services, gallery, packages, testimonials, loading, error, refreshGallery, refreshPackages, refreshAll]
  );

  return <StudioDataContext.Provider value={value}>{children}</StudioDataContext.Provider>;
};

export function useStudioData(): StudioDataContextValue {
  const ctx = useContext(StudioDataContext);
  if (!ctx) throw new Error('useStudioData must be used within a StudioDataProvider');
  return ctx;
}