import React, { useState } from 'react';
import {
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Share2,
  Check
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface PortfolioGalleryProps {
  onOpenBooking: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  onOpenBooking
}) => {
  const { gallery: galleryItems } = useStudioData();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'muhurtham', label: 'Sacred Muhurtham' },
    { id: 'couples', label: 'Couples & Pre-Wedding' },
    { id: 'rituals', label: 'Rituals & Nalangu' },
    { id: 'portraits', label: 'Portraits & Heirloom' }
  ];

  const filteredPhotos = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(p => p.category === activeTab);

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const currentPhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="portfolio" className="py-14 sm:py-20 bg-[#141211] text-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#38271E] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span className="eyebrow text-[#C5A880] font-bold">Curated Archives</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal leading-tight">
              The Living <span className="italic text-[#C5A880]">Portfolio</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-[#E2CFB4] leading-relaxed font-normal">
            A visual anthology of Tamil weddings, candid glances, and the timeless artistry of South Indian ceremonial celebrations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-tab-${cat.id}`}
              onClick={() => setActiveTab(cat.id)}
              className={`eyebrow text-xs px-5 py-2.5 rounded-sm transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-[#C5A880] text-[#141211] font-bold shadow-md'
                  : 'bg-[#23201E] text-[#FAF7F2] hover:text-[#C5A880] border border-[#38271E] hover:border-[#C5A880]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              id={`gallery-item-${photo.id}`}
              onClick={() => handleOpenLightbox(index)}
              className="group relative cursor-pointer overflow-hidden rounded-sm bg-[#23201E] aspect-[4/5] border border-[#38271E] hover:border-[#C5A880] transition-all duration-500 shadow-md"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-[#141211]/80 text-[#FAF7F2] border border-[#C5A880]/40">
                    <Maximize2 className="w-4 h-4 text-[#C5A880]" />
                  </span>
                </div>

                <div>
                  <span className="eyebrow text-[0.62rem] text-[#C5A880] font-bold">
                    {photo.categoryLabel}
                  </span>
                  <h3 className="font-serif text-lg text-[#FAF7F2] font-medium leading-snug mt-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#E2CFB4] flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3 h-3 text-[#C5A880]" />
                    {photo.location}
                  </p>
                </div>
              </div>

              {/* Mobile always visible bottom caption strip */}
              <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-[#141211]/85 p-2 px-3 border-t border-[#38271E]">
                <p className="font-serif text-xs text-[#FAF7F2] truncate font-medium">{photo.title}</p>
                <p className="text-[0.65rem] text-[#C5A880]">{photo.categoryLabel}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-sm bg-[#23201E] border border-[#38271E] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-[#FAF7F2] font-medium">
              Want to see a complete 600+ photograph wedding gallery?
            </h3>
            <p className="text-sm text-[#E2CFB4] mt-1 font-normal">
              We provide private full-event proof galleries upon request for prospective couples.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="eyebrow bg-[#C5A880] hover:bg-[#D4AF37] text-[#141211] font-bold px-7 py-3.5 rounded-sm transition-all text-xs shrink-0 shadow"
          >
            Request Private Gallery
          </button>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {currentPhoto && (
        <div
          id="lightbox-modal"
          className="fixed inset-0 z-[90] bg-[#141211]/98 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Top Controls */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              title="Share Gallery Link"
              className="p-2.5 rounded-full bg-[#23201E] border border-[#C5A880]/50 text-[#FAF7F2] hover:text-[#C5A880] transition-colors"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="p-2.5 rounded-full bg-[#23201E] border border-[#C5A880]/50 text-[#FAF7F2] hover:text-[#C5A880] transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevPhoto}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#23201E]/80 border border-[#C5A880]/40 text-[#FAF7F2] hover:bg-[#C5A880] hover:text-[#141211] transition-all z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextPhoto}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#23201E]/80 border border-[#C5A880]/40 text-[#FAF7F2] hover:bg-[#C5A880] hover:text-[#141211] transition-all z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Center Content */}
          <div 
            className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              className="max-h-[72vh] max-w-full object-contain rounded-sm shadow-2xl border border-[#38271E]"
            />
            
            <div className="mt-4 max-w-xl">
              <span className="eyebrow text-xs text-[#C5A880] font-bold">
                {currentPhoto.categoryLabel} · {currentPhoto.location}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-medium mt-1">
                {currentPhoto.title}
              </h4>
              <p className="text-xs text-[#E2CFB4] mt-1">
                Photograph {activePhotoIndex! + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};