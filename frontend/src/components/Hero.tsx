import React from 'react';
import { Calendar, ChevronDown, Sparkles, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/initialData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section 
      id="hero-section"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#141211] text-[#FAF7F2] pt-20"
    >
      {/* Background Image with Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-wedding-QV1LCGwi.jpg"
          alt="Traditional South Indian Wedding Ceremony - Aaruthra Studio"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-[10000ms]"
        />
        {/* Deep contrast gradient overlay so text is 100% visible and legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/65 to-[#141211]/85"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#141211]/40 to-[#141211]/90"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141211]/90 border border-[#C5A880]/60 shadow-lg mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="eyebrow text-[0.65rem] sm:text-xs text-[#FAF7F2] font-semibold tracking-[0.2em]">
            Booking 2026 · 2027 Wedding Season
          </span>
          <span className="text-[#C5A880] text-xs font-bold">|</span>
          <span className="eyebrow text-[0.62rem] text-[#E2CFB4] font-medium hidden sm:inline">
            Madurai & Worldwide
          </span>
        </div>

        {/* Main Display Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[1.08] tracking-tight font-medium text-[#FAF7F2] drop-shadow-md">
          Capturing Sacred Moments, <br />
          <span className="italic font-normal text-[#C5A880]">Preserving Family Legacies.</span>
        </h1>

        {/* Subtitle - Crisp, high contrast, non-fading */}
        <p className="mt-6 sm:mt-8 max-w-2xl mx-auto font-sans text-base sm:text-lg md:text-xl text-[#FAF7F2] leading-relaxed font-normal bg-[#141211]/40 sm:bg-transparent p-2 rounded-lg backdrop-blur-sm sm:backdrop-blur-none">
          We quietly step inside the sacred rituals of South Indian weddings — honoring the jasmine, the sacred fire, and the authentic tears of loved ones with timeless, fine-art craftsmanship.
        </p>

        {/* CTAs */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            id="hero-cta-booking"
            onClick={onOpenBooking}
            className="w-full sm:w-auto eyebrow bg-[#C5A880] hover:bg-[#D4AF37] text-[#141211] font-bold px-9 py-4 rounded-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg flex items-center justify-center gap-2.5 text-xs sm:text-sm tracking-[0.2em]"
          >
            <Calendar className="w-4 h-4" />
            <span>Check Wedding Availability</span>
          </button>

          <a
            id="hero-cta-stories"
            href="#stories"
            className="w-full sm:w-auto eyebrow bg-[#141211]/80 hover:bg-[#38271E] text-[#FAF7F2] hover:text-[#C5A880] border border-[#C5A880]/60 px-8 py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.2em]"
          >
            <span>Explore Visual Stories</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </a>
        </div>

        {/* Quick Contact Micro-bar */}
        <div className="mt-12 pt-8 border-t border-[#C5A880]/30 max-w-xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#FAF7F2]">
          <a 
            href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Aaruthra Studio! I want to check wedding date availability.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span className="font-medium">Direct WhatsApp: +91 98765 43210</span>
          </a>
          <a 
            href={`tel:${STUDIO_INFO.phone}`}
            className="flex items-center gap-2 hover:text-[#C5A880] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#C5A880]" />
            <span className="font-medium">Studio Line: 0452-243210</span>
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <a 
        href="#stories"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-[#C5A880] hover:text-[#FAF7F2] transition-colors group"
      >
        <span className="eyebrow text-[0.58rem] tracking-[0.25em] mb-1 font-semibold text-[#FAF7F2]">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#C5A880]" />
      </a>
    </section>
  );
};
