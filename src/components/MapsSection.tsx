import { MapPin, Globe, ZoomIn } from 'lucide-react';

export default function MapsSection() {
  return (
    <section id="explore-map" className="py-24 bg-stone-900/35 border-t border-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs text-gold-500 tracking-[0.25em] uppercase mb-3 block">
            ✦ Worldwide Seclusion ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-gold-100 mb-6 font-semibold">
            Explore Our Destinations
          </h2>
          <div className="h-0.5 w-16 bg-gold-400/30 mx-auto" />
        </div>

        {/* Beautiful high-end frame container */}
        <div className="bg-stone-900 border border-gold-500/20 p-2 sm:p-4 rounded-lg shadow-2xl relative overflow-hidden">
          {/* Top golden bar accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

          {/* Golden bezel wrapper */}
          <div className="relative w-full h-[400px] sm:h-[480px] bg-stone-950 rounded border border-stone-800 overflow-hidden">
            <iframe
              id="maps-iframe"
              title="Lumière World Grid Map"
              src="https://www.google.com/maps/embed/v1/view?key=AIzaSyD-placeholder&center=20,0&zoom=2"
              className="w-full h-full border-0 filter grayscale inset-0 absolute transition-all duration-700 ease-in-out hover:grayscale-0 opacity-80 hover:opacity-100"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Elegant overlay panel for alignment with high craftsmanship */}
            <div className="absolute bottom-4 left-4 z-20 max-w-xs bg-stone-950/90 backdrop-blur-md px-4 py-3.5 rounded border border-gold-500/15 shadow-xl pointer-events-none">
              <div className="flex items-center space-x-1 text-gold-400 font-serif text-xs font-bold mb-1">
                <Globe className="h-3.5 w-3.5 animate-spin-slow" />
                <span>🌐 LUMIÈRE TRAVEL PLATFORM</span>
              </div>
              <p className="text-[10px] text-stone-400 font-sans leading-relaxed">
                Click any destination pin to explore. Zoom in on any country to review secluded ports of call available for private charter.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-stone-400 text-xs px-2">
            <div className="flex items-center space-x-1.5 font-mono text-[10px] sm:text-xs">
              <MapPin className="h-4 w-4 text-gold-500" />
              <span>📍 Interactive map — zoom in to explore each destination</span>
            </div>
            
            <div className="flex items-center space-x-1.5 text-stone-500 text-[10px] sm:text-xs font-mono mt-2 sm:mt-0 uppercase tracking-widest">
              <ZoomIn className="h-3.5 w-3.5" />
              <span>Scale: Mercator projection grid setup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
