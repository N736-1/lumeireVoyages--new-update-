import { Star, MapPin, Compass } from 'lucide-react';
import { DESTINATIONS } from '../data';

interface DestinationGridProps {
  onSelectDestination: (name: string) => void;
}

export default function DestinationGrid({ onSelectDestination }: DestinationGridProps) {
  return (
    <section id="destinations" className="py-24 bg-stone-900/35 border-t border-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-gold-500 tracking-[0.25em] uppercase mb-3 block">
              ✦ Curated Destinations ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-gold-100 mb-4">
              Featured Wonderlands
            </h2>
            <div className="h-0.5 w-20 bg-gold-500/30 mb-4" />
          </div>
          <p className="font-sans text-xs sm:text-sm text-stone-400 font-light max-w-md md:text-right mt-4 md:mt-0 leading-relaxed">
            Our private concierges scour the globe to ensure every destination meets 
            the uncompromising standards of the Lumière clientele. Select a wonderland below to construct your voyage.
          </p>
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, idx) => (
            <div
              key={dest.id}
              className={`group relative overflow-hidden rounded-md bg-stone-950 border border-stone-850/80 transition-all duration-500 hover:border-gold-500/30 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(212,175,55,0.08)] flex flex-col justify-end min-h-[420px]`}
            >
              {/* Full-bleed background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 z-0"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(12,10,9,0.98) 0%, rgba(12,10,9,0.3) 45%, rgba(12,10,9,0.1) 100%), url(${dest.image})`
                }}
              />

              {/* Status Badge in the top right corner */}
              <div className="absolute top-4 right-4 z-20 flex items-center space-x-1 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-sm border border-gold-500/20 shadow">
                <Star className="h-3.5 w-3.5 text-gold-500 fill-gold-500" />
                <span className="font-mono text-[10px] text-gold-100 font-bold">{dest.rating.toFixed(1)}</span>
              </div>

              {/* Destination Card Body (Z-10) */}
              <div className="p-6 relative z-10 transition-all duration-500">
                <div className="flex items-center text-[10px] text-stone-400 font-mono tracking-widest uppercase mb-1.5">
                  <MapPin className="h-3 w-3 text-gold-500 mr-1" />
                  <span>{dest.country}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#fbf7ed] mb-1.5 tracking-wide">
                  {dest.name}
                </h3>

                <div className="flex justify-between items-baseline mb-4">
                  <span className="font-mono text-xs text-gold-400 font-medium">
                    From ${dest.price.toLocaleString()} USD <span className="text-[10px] text-stone-500 italic">/ person</span>
                  </span>
                </div>

                {/* Animated description on hover (slides/fades up) */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden mb-6">
                  <p className="font-sans text-xs text-stone-400 font-light leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                {/* CTA Action Bar */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectDestination(dest.name)}
                    className="flex-1 py-2.5 px-4 bg-gold-500 text-stone-950 text-xs font-sans tracking-wider uppercase font-bold text-center rounded-sm transition-all duration-300 group-hover:bg-gold-400 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Compass className="h-3.5 w-3.5" />
                    <span>Plan Itinerary</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
