import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Phone, 
  MessageCircle, 
  Calendar, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { STUDIO_INFO } from '../data/initialData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  pendingBookingsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onOpenAdmin,
  pendingBookingsCount = 0
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Stories", href: "#stories" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Photographer", href: "#about" },
    { label: "Packages", href: "#packages" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#141211]/95 backdrop-blur-md py-3.5 border-b border-[#38271E]/60 shadow-xl' 
          : 'bg-gradient-to-b from-[#141211]/90 via-[#141211]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            id="nav-logo" 
            href="#" 
            className="flex flex-col group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#C5A880] transition-transform group-hover:scale-110" />
              <span className="font-display font-bold tracking-[0.25em] text-lg sm:text-xl text-[#FAF7F2] uppercase">
                Aaruthra
              </span>
              <span className="font-display tracking-[0.25em] text-lg sm:text-xl text-[#C5A880] font-light uppercase">
                Studio
              </span>
            </div>
            <span className="eyebrow text-[0.58rem] tracking-[0.3em] text-[#C5A880] mt-0.5 font-semibold">
              Heritage & Wedding Photography · Madurai
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className="eyebrow text-[0.72rem] tracking-[0.22em] text-[#FAF7F2] hover:text-[#C5A880] transition-colors py-1 relative group font-semibold"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A880] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Call */}
            <a
              id="nav-btn-call"
              href={`tel:${STUDIO_INFO.phone}`}
              title="Call Aaruthra Studio"
              className="p-2.5 rounded-full border border-[#C5A880]/40 text-[#FAF7F2] hover:text-[#C5A880] hover:border-[#C5A880] hover:bg-[#C5A880]/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Quick WhatsApp */}
            <a
              id="nav-btn-whatsapp"
              href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Aaruthra Studio! I would like to inquire about wedding photography availability.")}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              className="p-2.5 rounded-full border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Admin Portal Toggle */}
            <button
              id="nav-btn-admin"
              onClick={onOpenAdmin}
              className="relative px-3 py-2 rounded border border-[#C5A880]/30 text-[#E2CFB4] hover:text-white hover:border-[#C5A880] hover:bg-[#38271E]/60 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Admin</span>
              {pendingBookingsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>

            {/* Check Availability CTA */}
            <button
              id="nav-btn-booking"
              onClick={onOpenBooking}
              className="eyebrow bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold px-5 py-2.5 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-md flex items-center gap-2 text-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Check Dates</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-btn-booking-quick"
              onClick={onOpenBooking}
              className="bg-[#C5A880] text-[#141211] px-3 py-1.5 rounded text-xs font-semibold eyebrow"
            >
              Book
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded border border-[#C5A880]/40 text-[#FAF7F2] hover:text-[#C5A880]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu-drawer"
          className="lg:hidden bg-[#141211] border-b border-[#38271E] px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#38271E]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="eyebrow text-xs text-[#FAF7F2] hover:text-[#C5A880] py-2 px-3 rounded hover:bg-[#23201E] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3 h-3 text-[#C5A880]" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded border border-[#C5A880]/40 text-[#FAF7F2] text-xs font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Call Studio</span>
              </a>
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Aaruthra Studio! I would like to inquire about wedding photography availability.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded border border-[#38271E] bg-[#23201E] text-[#FAF7F2] text-xs font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Admin Panel</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded bg-[#C5A880] text-[#141211] text-xs font-bold eyebrow"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Check Dates</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
