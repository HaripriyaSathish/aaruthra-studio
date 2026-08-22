import React from 'react';
import { Check, Sparkles, MessageCircle, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { PackageItem } from '../types';
import { STUDIO_INFO } from '../data/initialData';

interface InvestmentPackagesProps {
  packages: PackageItem[];
  onSelectPackage: (pkg: PackageItem) => void;
}

export const InvestmentPackages: React.FC<InvestmentPackagesProps> = ({ 
  packages, 
  onSelectPackage 
}) => {
  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#141211] text-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span className="eyebrow text-[#C5A880] font-bold">Investment Suites</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal leading-tight">
            Transparent <span className="italic text-[#C5A880]">Photography Packages</span>
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-[#E2CFB4] leading-relaxed font-normal">
            No hidden fees, no rushed timelines. Every collection includes complete rights to your high-resolution photographs and handcrafted heirloom albums.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              id={`package-card-${pkg.id}`}
              className={`rounded-sm flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-[#23201E] border-2 border-[#C5A880] shadow-2xl scale-100 lg:-translate-y-2'
                  : 'bg-[#1C1A18] border border-[#38271E] hover:border-[#C5A880]/50 shadow-lg'
              } p-8 sm:p-10`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5A880] text-[#141211] eyebrow text-[0.62rem] font-bold px-4 py-1 rounded-full shadow-md tracking-[0.2em]">
                  {pkg.badge || "MOST CHERISHED"}
                </div>
              )}

              <div>
                {!pkg.popular && pkg.badge && (
                  <span className="eyebrow text-[0.65rem] text-[#C5A880] font-semibold block mb-2">
                    {pkg.badge}
                  </span>
                )}

                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-medium">
                  {pkg.name}
                </h3>
                
                <p className="text-xs text-[#E2CFB4] mt-2 leading-relaxed font-normal">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="mt-6 pb-6 border-b border-[#38271E]">
                  <span className="font-serif text-4xl sm:text-5xl text-[#C5A880] font-normal">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-[#E2CFB4] ml-2 block sm:inline font-medium">
                    / All Inclusive
                  </span>
                </div>

                {/* Logistics */}
                <div className="py-4 border-b border-[#38271E] space-y-2 text-xs text-[#FAF7F2]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#E2CFB4]">Duration:</span>
                    <span className="font-semibold text-[#FAF7F2]">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#E2CFB4]">Team:</span>
                    <span className="font-semibold text-[#FAF7F2]">{pkg.photographers}</span>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="mt-6 space-y-3">
                  <p className="eyebrow text-[0.65rem] text-[#C5A880] font-bold">What is Included:</p>
                  {pkg.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#FAF7F2]">
                      <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#38271E] space-y-3">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full eyebrow py-3.5 px-6 rounded-sm text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-[#C5A880] hover:bg-[#D4AF37] text-[#141211] shadow-lg'
                      : 'bg-[#23201E] hover:bg-[#C5A880] text-[#FAF7F2] hover:text-[#141211] border border-[#C5A880]/50'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve This Package</span>
                </button>

                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Aaruthra Studio! I am interested in booking "${pkg.name}" (${pkg.price}). Can you verify date availability?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-sm border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
