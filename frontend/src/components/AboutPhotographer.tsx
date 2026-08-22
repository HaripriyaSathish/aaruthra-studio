import React from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';

export const AboutPhotographer: React.FC = () => {
  const { studioInfo } = useStudioData();
  const pillars = [
    {
      title: "Authentic Emotion",
      desc: "Zero forced artificial poses. We capture tears, laughter, and genuine family interactions as they naturally occur."
    },
    {
      title: "Reverence for Rituals",
      desc: "Deep cultural fluency with Tamil and South Indian wedding customs — we anticipate every sacred ritual before it happens."
    },
    {
      title: "Cinematic Fine Art",
      desc: "Frames composed with architectural balance, warm golden hour tones, and painterly depth."
    },
    {
      title: "Heirloom Longevity",
      desc: "Photographs color-graded to look just as breathtaking 50 years from now as they do today."
    }
  ];

  return (
    <section id="about" className="py-14 sm:py-20 bg-[#FAF7F2] text-[#141211] border-t border-[#E6DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Photo + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Photographer Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-[#141211] border-2 border-[#C5A880]/60 shadow-2xl">
                {studioInfo.photographerImage ? (
                  <img
                    src={studioInfo.photographerImage}
                    alt={`${studioInfo.leadPhotographer} - Founder & Lead Photographer`}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#38271E] via-[#141211] to-[#141211]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 text-[#FAF7F2]">
                  <p className="font-serif text-2xl font-medium">{studioInfo.leadPhotographer}</p>
                  <p className="eyebrow text-[0.62rem] text-[#C5A880] tracking-[0.25em] font-semibold mt-0.5">
                    Founder & Lead Visual Storyteller
                  </p>
                </div>
              </div>

              {/* Decorative Corner Tag */}
              <div className="absolute -top-4 -left-4 bg-[#38271E] text-[#FAF7F2] border border-[#C5A880] p-3 rounded-sm shadow-lg hidden sm:block">
                <Camera className="w-5 h-5 text-[#C5A880]" />
              </div>
            </div>
          </div>

          {/* Narrative / Bio */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#A75D3F]" />
              <span className="eyebrow text-[#A75D3F] font-bold">The Storyteller</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#141211] leading-tight">
              Rooted in the Soul of <span className="italic text-[#A75D3F]">Madurai</span>
            </h2>

            <div className="mt-6 border-l-2 border-[#C5A880] pl-6 py-1">
              <p className="font-serif text-xl sm:text-2xl italic text-[#38271E] leading-relaxed">
                “I grew up in Madurai, where every wedding spilled out into the streets — jasmine garlands, brass lamps, and drums at dawn. That is the feeling I chase in every frame.”
              </p>
            </div>

            <p className="mt-6 text-base text-[#38271E] leading-relaxed font-normal">
              For over a decade, my team and I have photographed weddings with quiet observation. We do not bring loud commands or intrusive setups into sacred spaces. Instead, we stay close to the rituals and closer to the people, ensuring what remains in your family album is genuine emotion, not a staged performance.
            </p>

            {/* 4 Pillars */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((p, idx) => (
                <div key={idx} className="p-4 rounded-sm bg-[#FFFFFF] border border-[#E6DFD5]">
                  <h3 className="font-serif text-lg font-semibold text-[#141211]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#38271E] mt-1 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-20 pt-12 border-t border-[#E6DFD5] grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {studioInfo.stats.map((stat, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#A75D3F]">
                {stat.value}
              </p>
              <p className="eyebrow text-xs sm:text-sm text-[#141211] font-semibold tracking-[0.18em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};