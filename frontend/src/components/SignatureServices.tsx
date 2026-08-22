import React from 'react';
import { Check, Sparkles, MessageCircle } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

interface SignatureServicesProps {
  onOpenBooking: () => void;
}

export const SignatureServices: React.FC<SignatureServicesProps> = ({ onOpenBooking }) => {
  const { services, studioInfo } = useStudioData();
  return (
    <section id="services" className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#E6DFD5] text-[#141211]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#A75D3F]" />
            <span className="eyebrow text-[#A75D3F] font-bold">Signature Offerings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#141211] leading-tight">
            Crafted for <span className="italic text-[#A75D3F]">Generations to Come</span>
          </h2>
          <p className="mt-4 font-sans text-base text-[#38271E] font-medium leading-relaxed">
            From sunrise Muhurtham to grand evening receptions, we provide tailored photography suites that capture every nuanced tradition and authentic emotional beat.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-[#FFFFFF] border border-[#E6DFD5] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#C5A880] transition-all duration-300 hover:shadow-xl group"
            >
              {/* Image Preview */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#141211]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#FAF7F2]">
                  <span className="eyebrow text-xs text-[#E2CFB4] font-bold">
                    From {service.startingPrice}
                  </span>
                </div>
              </div>

              {/* Service Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#141211] font-semibold group-hover:text-[#A75D3F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#A75D3F] mt-1 font-sans">
                    {service.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-[#38271E] leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="mt-5 space-y-2 border-t border-[#E6DFD5] pt-4">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#38271E]">
                        <Check className="w-3.5 h-3.5 text-[#A75D3F] shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-[#E6DFD5] flex items-center gap-2">
                  <button
                    onClick={onOpenBooking}
                    className="flex-1 eyebrow bg-[#FAF7F2] hover:bg-[#C5A880] text-[#141211] hover:text-[#141211] border border-[#E6DFD5] hover:border-[#C5A880] py-2.5 px-3 rounded-sm text-[0.68rem] font-bold transition-all text-center"
                  >
                    Select Service
                  </button>

                  <a
                    href={`https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent(`Hello Aaruthra Studio, I would like more details and availability for "${service.title}".`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Inquire via WhatsApp"
                    className="p-2.5 rounded-sm border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};