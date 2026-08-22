/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedStories } from './components/FeaturedStories';
import { SignatureServices } from './components/SignatureServices';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ParallaxBreak } from './components/ParallaxBreak';
import { AboutPhotographer } from './components/AboutPhotographer';
import { Testimonials } from './components/Testimonials';
import { InvestmentPackages } from './components/InvestmentPackages';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { BookingCalendarModal } from './components/BookingCalendarModal';
import { FloatingActions } from './components/FloatingActions';
import { useStudioData } from './context/StudioDataContext';
import { PackageItem } from './types';

export default function App() {
  const { loading, error, refreshAll } = useStudioData();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  const handleOpenBookingWithPackage = (pkg?: PackageItem) => {
    if (pkg) {
      setSelectedPackage(pkg);
    }
    setIsBookingOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141211] text-[#FAF7F2] flex flex-col items-center justify-center gap-4">
        <RefreshCw className="w-8 h-8 text-[#C5A880] animate-spin" />
        <p className="eyebrow text-xs text-[#E2CFB4]">Loading Aaruthra Studio…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#141211] text-[#FAF7F2] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <WifiOff className="w-10 h-10 text-[#A75D3F]" />
        <h1 className="font-serif text-2xl">Cannot Reach the Studio Backend</h1>
        <p className="text-sm text-[#E2CFB4] max-w-md">
          The Django API isn't responding. Make sure the backend server is running, then try again. ({error})
        </p>
        <button
          onClick={() => refreshAll()}
          className="eyebrow bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold px-6 py-3 rounded-sm text-xs transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#141211] selection:bg-[#C5A880] selection:text-[#141211] font-sans antialiased">

      {/* Top Fixed Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBookingWithPackage()}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBookingWithPackage()}
        />

        {/* 2. Featured Stories (Sacred Archives) */}
        <FeaturedStories
          onOpenBooking={() => handleOpenBookingWithPackage()}
        />

        {/* 3. Signature Offerings */}
        <SignatureServices
          onOpenBooking={() => handleOpenBookingWithPackage()}
        />

        {/* 4. Curated Living Portfolio */}
        <PortfolioGallery
          onOpenBooking={() => handleOpenBookingWithPackage()}
        />

        {/* 5. Parallax Aesthetic Break */}
        <ParallaxBreak />

        {/* 6. About the Storyteller / Pillars */}
        <AboutPhotographer />

        {/* 7. Investment Packages */}
        <InvestmentPackages
          onSelectPackage={(pkg) => handleOpenBookingWithPackage(pkg)}
        />

        {/* 8. Testimonials & Reflections */}
        <Testimonials />

        {/* 9. Contact, Google Map & Integrations */}
        <ContactAndLocation />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBookingWithPackage()}
      />

      {/* Interactive Booking / Date Checker Modal */}
      <BookingCalendarModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedPackage(null);
        }}
        selectedPackage={selectedPackage}
      />

      {/* Floating Action Controls */}
      <FloatingActions
        onOpenBooking={() => handleOpenBookingWithPackage()}
      />

    </div>
  );
}