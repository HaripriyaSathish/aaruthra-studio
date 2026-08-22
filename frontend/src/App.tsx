/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { AdminPanel } from './components/AdminPanel';
import { FloatingActions } from './components/FloatingActions';
import { StorageService } from './services/storage';
import { PackageItem, GalleryPhoto, TestimonialItem, BookingRequest } from './types';
import { INITIAL_TESTIMONIALS } from './data/initialData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  
  // Dynamic App State
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [testimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);

  const refreshData = () => {
    setPackages(StorageService.getPackages());
    setGalleryPhotos(StorageService.getGallery());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleOpenBookingWithPackage = (pkg?: PackageItem) => {
    if (pkg) {
      setSelectedPackage(pkg);
    }
    setIsBookingOpen(true);
  };

  const handleBookingCreated = (booking: BookingRequest) => {
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#141211] selection:bg-[#C5A880] selection:text-[#141211] font-sans antialiased">
      
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBookingWithPackage()}
        onOpenAdmin={() => setIsAdminOpen(true)}
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
          galleryItems={galleryPhotos}
          onOpenBooking={() => handleOpenBookingWithPackage()}
        />

        {/* 5. Parallax Aesthetic Break */}
        <ParallaxBreak />

        {/* 6. About the Storyteller / Pillars */}
        <AboutPhotographer />

        {/* 7. Investment Packages */}
        <InvestmentPackages
          packages={packages}
          onSelectPackage={(pkg) => handleOpenBookingWithPackage(pkg)}
        />

        {/* 8. Testimonials & Reflections */}
        <Testimonials
          testimonials={testimonials}
        />

        {/* 9. Contact, Google Map & Integrations */}
        <ContactAndLocation />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBookingWithPackage()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Booking / Date Checker Modal */}
      <BookingCalendarModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedPackage(null);
        }}
        selectedPackage={selectedPackage}
        packages={packages}
        onBookingCreated={handleBookingCreated}
      />

      {/* Full Django & SQL Admin Management Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataUpdated={refreshData}
      />

      {/* Floating Action Controls */}
      <FloatingActions
        onOpenBooking={() => handleOpenBookingWithPackage()}
      />

    </div>
  );
}
