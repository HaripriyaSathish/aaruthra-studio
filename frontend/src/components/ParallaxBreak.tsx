import React from 'react';
import { Sparkles } from 'lucide-react';

export const ParallaxBreak: React.FC = () => {
  return (
    <section 
      id="quote-break-section"
      className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#141211] text-[#FAF7F2] py-20"
    >
      {/* Background Image with Fixed/Parallax Feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/break-parallax-DXD94pgG.jpg"
          alt="Traditional South Indian Wedding Oonjal Ritual - Aaruthra Studio"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Dark contrast gradient so text is 100% visible and vivid */}
        <div className="absolute inset-0 bg-[#141211]/75 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-transparent to-[#141211]"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#C5A880]" />
          <span className="eyebrow text-[#C5A880] font-bold text-xs tracking-[0.25em]">
            Studio Philosophy
          </span>
          <Sparkles className="w-5 h-5 text-[#C5A880]" />
        </div>

        <blockquote className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal leading-tight italic drop-shadow-md">
          “We do not simply photograph what happens.<br className="hidden sm:inline" />
          <span className="text-[#C5A880] not-italic font-medium"> We preserve how it felt.</span>”
        </blockquote>

        <p className="mt-8 max-w-xl mx-auto font-sans text-sm sm:text-base text-[#E2CFB4] font-normal leading-relaxed">
          Through the fragrance of fresh jasmine, the resonant notes of nadaswaram, and the warmth of ancestral blessings, we immortalize your legacy.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#C5A880]/60"></span>
          <span className="eyebrow text-[0.65rem] text-[#FAF7F2] tracking-[0.3em] font-semibold">
            AARUTHRA SELVAN · LEAD PHOTOGRAPHER
          </span>
          <span className="h-px w-12 bg-[#C5A880]/60"></span>
        </div>
      </div>
    </section>
  );
};
