import React from 'react';
import { Star, Quote, Sparkles, MapPin } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

export const Testimonials: React.FC = () => {
  const { testimonials } = useStudioData();
  return (
    <section id="testimonials" className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#E6DFD5] text-[#141211]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#A75D3F]" />
            <span className="eyebrow text-[#A75D3F] font-bold">Client Words</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#141211] leading-tight">
            Loved Across <span className="italic text-[#A75D3F]">Generations</span>
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-[#38271E] font-medium leading-relaxed">
            Read reflections from the couples, parents, and families who trusted us with their most cherished memories.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              id={`testimonial-${t.id}`}
              className="bg-[#FFFFFF] p-8 rounded-sm border border-[#E6DFD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#C5A880]"
            >
              <div>
                {/* Top: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#C5A880]/30 group-hover:text-[#C5A880]/60 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="font-serif text-lg text-[#141211] leading-relaxed italic font-normal">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Details */}
              <div className="mt-8 pt-6 border-t border-[#E6DFD5] flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#C5A880]"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#141211]">
                    {t.name}
                  </h3>
                  <p className="text-xs text-[#A75D3F] font-semibold">
                    {t.role}
                  </p>
                  <p className="text-xs text-[#38271E] flex items-center gap-1 font-medium mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C5A880]" />
                    {t.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};