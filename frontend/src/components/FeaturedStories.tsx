import React, { useState } from 'react';
import { MapPin, Eye, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import { StoryItem } from '../types';

interface FeaturedStoriesProps {
  onOpenBooking: () => void;
}

export const FeaturedStories: React.FC<FeaturedStoriesProps> = ({ onOpenBooking }) => {
  const { stories } = useStudioData();
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  return (
    <section id="stories" className="py-14 sm:py-20 bg-[#FAF7F2] text-[#141211] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6DFD5] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span className="eyebrow text-[#A75D3F] font-bold">Featured Archives</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#141211] font-normal leading-tight">
              Every Frame Tells A <span className="italic text-[#A75D3F]">Sacred Story</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-[#38271E] leading-relaxed font-medium">
            Immerse yourself in authentic visual chronicles of South Indian heritage, temple traditions, and multi-generational familial love.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {stories.map((story) => (
            <div
              key={story.id}
              id={`story-card-${story.id}`}
              onClick={() => setSelectedStory(story)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-sm overflow-hidden border border-[#E6DFD5] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#141211]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Category & Location Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="eyebrow bg-[#141211]/90 text-[#C5A880] border border-[#C5A880]/50 px-3 py-1 text-[0.62rem] font-bold rounded-sm backdrop-blur-sm">
                    {story.date}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#FAF7F2]">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{story.location}</span>
                  </div>
                  <span className="eyebrow text-[0.65rem] text-[#FAF7F2] bg-[#38271E]/80 px-2.5 py-1 rounded border border-[#C5A880]/40 group-hover:bg-[#C5A880] group-hover:text-[#141211] transition-colors flex items-center gap-1">
                    <Eye className="w-3 h-3" /> View Archive
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#141211] font-medium leading-snug group-hover:text-[#A75D3F] transition-colors">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#38271E] font-normal leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>

                {/* Rituals tags */}
                <div className="mt-6 pt-5 border-t border-[#E6DFD5] flex flex-wrap gap-2">
                  {story.highlights.map((r, rIdx) => (
                    <span
                      key={rIdx}
                      className="text-xs px-2.5 py-1 rounded bg-[#FAF7F2] text-[#38271E] border border-[#E6DFD5] font-medium"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Story Detailed Reader Modal */}
      {selectedStory && (
        <div 
          id="story-modal-overlay"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-[#141211]/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedStory(null)}
        >
          <div 
            id="story-modal-content"
            className="bg-[#FFFFFF] text-[#141211] w-full max-w-3xl rounded-sm border border-[#C5A880]/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Image banner */}
            <div className="relative h-64 sm:h-80 bg-[#141211] shrink-0">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/40 to-transparent"></div>
              
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#141211]/80 text-[#FAF7F2] hover:text-[#C5A880] transition-colors border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-[#FAF7F2]">
                <span className="eyebrow text-[#C5A880] font-bold text-xs bg-[#141211]/80 px-2.5 py-1 rounded border border-[#C5A880]/40">
                  {selectedStory.date}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-medium mt-2 text-[#FAF7F2]">
                  {selectedStory.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E2CFB4] flex items-center gap-1.5 mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  {selectedStory.location}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="eyebrow text-[#A75D3F] font-bold text-xs">The Narrative</h4>
                <p className="mt-2 text-base text-[#23201E] leading-relaxed font-normal">
                  {selectedStory.fullStory}
                </p>
              </div>

              <div>
                <h4 className="eyebrow text-[#A75D3F] font-bold text-xs">Documented Rituals</h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedStory.highlights.map((ritual, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#38271E] bg-[#FAF7F2] p-2.5 rounded border border-[#E6DFD5]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span className="font-medium">{ritual}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#38271E] font-medium">
                  Want your wedding story documented like this?
                </p>
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    onOpenBooking();
                  }}
                  className="w-full sm:w-auto eyebrow bg-[#C5A880] hover:bg-[#B8966C] text-[#141211] font-bold px-6 py-3 rounded-sm text-xs transition-colors shadow"
                >
                  Book Your Wedding Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};