import React from 'react';
import { Camera, Phone, Mail, MessageCircle, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { STUDIO_INFO } from '../data/initialData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  return (
    <footer id="main-footer" className="bg-[#141211] text-[#FAF7F2] border-t border-[#38271E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#38271E]">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-[#C5A880]" />
              <span className="font-display font-bold tracking-[0.25em] text-xl text-[#FAF7F2] uppercase">
                Aaruthra
              </span>
              <span className="font-display tracking-[0.25em] text-xl text-[#C5A880] font-light uppercase">
                Studio
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#E2CFB4] max-w-sm leading-relaxed font-normal">
              A South Indian wedding & heritage photography atelier keeping the sanctity of rituals, the joy of families, and the unspoken emotion of love exactly as it was felt.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#23201E] border border-[#38271E] text-[#25D366] hover:border-[#25D366] transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="p-2.5 rounded-full bg-[#23201E] border border-[#38271E] text-[#C5A880] hover:border-[#C5A880] transition-colors"
                title="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="p-2.5 rounded-full bg-[#23201E] border border-[#38271E] text-[#FAF7F2] hover:border-[#C5A880] transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="eyebrow text-xs text-[#C5A880] font-bold">Exploration</h4>
            <ul className="space-y-2 text-xs text-[#E2CFB4]">
              <li><a href="#stories" className="hover:text-[#C5A880] transition-colors">Featured Archives</a></li>
              <li><a href="#services" className="hover:text-[#C5A880] transition-colors">Signature Offerings</a></li>
              <li><a href="#portfolio" className="hover:text-[#C5A880] transition-colors">Curated Portfolio</a></li>
              <li><a href="#packages" className="hover:text-[#C5A880] transition-colors">Investment Suites</a></li>
              <li><a href="#about" className="hover:text-[#C5A880] transition-colors">About Aaruthra Selvan</a></li>
              <li><a href="#testimonials" className="hover:text-[#C5A880] transition-colors">Client Reflections</a></li>
            </ul>
          </div>

          {/* Studio Credentials */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="eyebrow text-xs text-[#C5A880] font-bold">Studio Headquarters</h4>
            <div className="space-y-2 text-xs text-[#E2CFB4]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{STUDIO_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{STUDIO_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{STUDIO_INFO.email}</span>
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="eyebrow bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold px-5 py-2.5 rounded-sm text-xs transition-all shadow"
              >
                Check 2026/2027 Dates
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E2CFB4]">
          <p>© {new Date().getFullYear()} Aaruthra Studio. All Rights Reserved. Crafted with reverence.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#C5A880] transition-colors flex items-center gap-1 text-[0.72rem] font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Studio Admin Panel</span>
            </button>
            <span>·</span>
            <span>React + Vite & Django SQL Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
