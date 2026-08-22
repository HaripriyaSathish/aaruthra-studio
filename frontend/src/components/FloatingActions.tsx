import React from 'react';
import { MessageCircle, Calendar, Phone, Mail } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const { studioInfo } = useStudioData();
  return (
    <aside
      id="floating-actions-bar"
      aria-label="Quick contact and booking options"
      className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {/* Floating Call Button */}
      <a
        id="floating-call-btn"
        href={`tel:${studioInfo.phone}`}
        title="Call Aaruthra Studio"
        className="flex items-center gap-2 bg-[#141211] hover:bg-[#23201E] text-[#FAF7F2] p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#C5A880]/50 group"
      >
        <Phone className="w-5 h-5 text-[#C5A880]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pr-2">
          Call Studio
        </span>
      </a>

      {/* Floating Email Button */}
      <a
        id="floating-email-btn"
        href={`mailto:${studioInfo.email}`}
        title="Email Aaruthra Studio"
        className="flex items-center gap-2 bg-[#141211] hover:bg-[#23201E] text-[#FAF7F2] p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#C5A880]/50 group"
      >
        <Mail className="w-5 h-5 text-[#C5A880]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pr-2">
          Email Us
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent("Hello Aaruthra Studio! I would like to check wedding date availability.")}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Direct WhatsApp Chat"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 group"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pr-2">
          Chat on WhatsApp
        </span>
      </a>

      {/* Floating Check Date Button */}
      <button
        id="floating-book-btn"
        onClick={onOpenBooking}
        title="Check Availability"
        className="flex items-center gap-2 bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#FAF7F2]/40 group"
      >
        <Calendar className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pr-2">
          Check Dates
        </span>
      </button>
    </aside>
  );
};