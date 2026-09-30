import { motion } from 'motion/react';
import { Plane, Compass, Sparkles, Shield, Anchor } from 'lucide-react';

interface BrandBannerProps {
  onPlanTrip: () => void;
  onExplorePackages: () => void;
}

export default function BrandBanner({ onPlanTrip, onExplorePackages }: BrandBannerProps) {
  return (
    <section className="relative py-20 bg-stone-950 overflow-hidden border-y border-gold-500/20">
      {/* Background Banner with Opulent Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/lumiere_banner_1790751921492.jpg"
          alt="Lumière Voyage Private Fleet & Luxury Banner"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Emblem & Messaging */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-600 shadow-xl shadow-black ring-1 ring-gold-400/50">
                <img
                  src="/src/assets/images/lumiere_logo_1790751906590.jpg"
                  alt="Lumière Voyage Crest"
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-mono text-xs text-gold-400 tracking-[0.25em] uppercase block font-semibold">
                  ✦ LUMIÈRE PRIVÉ ✦
                </span>
                <span className="text-stone-300 text-xs font-serif tracking-widest uppercase">
                  Bespoke Aviation & Maritime Division
                </span>
              </div>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#fbf7ed] tracking-tight leading-tight">
              Elevate Every Journey Across Sea & Sky
            </h2>

            <p className="font-sans text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              Experience unparalleled privacy and bespoke luxury. From transatlantic Gulfstream charters with personalized culinary service to 80-meter Mediterranean superyachts awaiting your arrival, Lumière Voyage transforms journeying into an art form.
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center space-x-2.5 bg-stone-900/80 backdrop-blur-sm border border-gold-500/20 px-3.5 py-2.5 rounded">
                <Plane className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-xs font-serif tracking-wide text-stone-200">Private Jets</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-stone-900/80 backdrop-blur-sm border border-gold-500/20 px-3.5 py-2.5 rounded">
                <Anchor className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-xs font-serif tracking-wide text-stone-200">Superyachts</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-stone-900/80 backdrop-blur-sm border border-gold-500/20 px-3.5 py-2.5 rounded col-span-2 sm:col-span-1">
                <Shield className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-xs font-serif tracking-wide text-stone-200">VIP Concierge</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onPlanTrip}
                className="px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-stone-950 font-sans text-xs uppercase tracking-widest font-bold rounded-sm transition-all shadow-lg hover:shadow-gold-500/20 flex items-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Craft Custom Itinerary</span>
              </button>
              <button
                onClick={onExplorePackages}
                className="px-6 py-3.5 bg-stone-900/90 hover:bg-stone-850 text-gold-300 border border-gold-500/40 hover:border-gold-400 font-sans text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-gold-400" />
                <span>Join CJ Affiliate SaaS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-3 rounded-lg bg-gradient-to-b from-gold-500/20 via-stone-900/40 to-stone-950/80 border border-gold-500/30 shadow-2xl backdrop-blur-md"
            >
              <div className="overflow-hidden rounded-md relative aspect-video">
                <img
                  src="/src/assets/images/lumiere_banner_1790751921492.jpg"
                  alt="Lumière Private Fleet"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-stone-950/85 backdrop-blur-md p-3 rounded border border-gold-500/30 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src="/src/assets/images/lumiere_logo_1790751906590.jpg"
                      alt="Emblem"
                      className="w-7 h-7 rounded-full object-cover border border-gold-400/40"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-[11px] font-serif font-bold text-gold-200 leading-tight">
                        LUMIÈRE GLOBAL FLEET
                      </p>
                      <p className="text-[9px] font-mono text-stone-400 tracking-wider">
                        140+ Private Air & Marine Terminals
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-gold-400 font-bold bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                    24/7 VIP
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
