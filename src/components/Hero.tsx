import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';

const SLIDES = [
  {
    image: '/src/assets/images/lumiere_banner_1790751921492.jpg',
    title: 'Haute Voyage',
    tagline: 'LUMIÈRE VOYAGE — Elevate Every Journey'
  },
  {
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=85',
    title: 'Private Aviation',
    tagline: 'LUMIÈRE VOYAGE — Bespoke Private Jet Charters'
  },
  {
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
    title: 'Paris',
    tagline: 'Refined Parisian Palaces & Hidden Secret Courtyards'
  },
  {
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=85',
    title: 'Maldives',
    tagline: 'Private Islands, Sound Bathing & Azure Water Reserves'
  },
  {
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=85',
    title: 'Santorini',
    tagline: 'Volcanic Sunsets & Hand-Curated Catamaran Sails'
  },
  {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    title: 'Dubai',
    tagline: 'Golden Sky Penthouses & Whispering Desert Dunes'
  },
  {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85',
    title: 'Bali',
    tagline: 'Temples in the Mist, Private Blessings & Organic Forest Spas'
  },
  {
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=1920&q=85',
    title: 'Amalfi Coast',
    tagline: 'Vintage Alfa Romeo Coastal Escapades & Romantic Clifftops'
  }
];

interface HeroProps {
  onCTA1: () => void; // Plan My Journey
  onCTA2: () => void; // Explore Destinations
}

export default function Hero({ onCTA1, onCTA2 }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((p) => (p + 1) % SLIDES.length);
  };

  const headlineText = "DISCOVER THE WORLD IN LUXURY";
  const letters = Array.from(headlineText);

  return (
    <section id="home" className="relative h-screen w-full bg-stone-950 overflow-hidden flex items-center justify-center">
      {/* Background Image Carousel Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(12,10,9,0.95) 0%, rgba(12,10,9,0.3) 50%, rgba(12,10,9,0.8) 100%), url(${SLIDES[currentIndex].image})`
            }}
          />
        </AnimatePresence>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 text-center max-w-4xl px-4 mt-16 flex flex-col items-center">
        {/* Brand Crest / Monogram Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-4 flex flex-col items-center"
        >
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-gold-600/40 via-gold-400 to-gold-600/40 shadow-2xl shadow-black ring-1 ring-gold-500/40">
            <img
              src="/src/assets/images/lumiere_logo_1790751906590.jpg"
              alt="Lumière Voyage Crest"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-gold-400 uppercase mt-2 font-medium">
            Maison de Haute Voyage
          </span>
        </motion.div>

        {/* Animated Headline letter-by-letter */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold tracking-widest text-[#fbf7ed] mb-4 flex flex-wrap justify-center select-none leading-none">
          {letters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Dynamic Tagline */}
        <motion.p
          key={`tagline-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-mono text-xs sm:text-sm tracking-[0.25em] text-gold-400 uppercase font-medium mb-6 min-h-[24px]"
        >
          {SLIDES[currentIndex].tagline}
        </motion.p>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="font-sans text-sm sm:text-lg text-stone-300 font-light tracking-wide max-w-2xl mb-10 text-stone-200/80"
        >
          Bespoke journeys crafted by AI & curated for seekers of the extraordinary. Experienced by you.
        </motion.p>

        {/* Call to Actions (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onCTA1}
            className="group px-8 py-4 bg-gold-500 text-stone-950 font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center space-x-2 rounded-sm cursor-pointer"
          >
            <span>Plan My Journey</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
          <button
            onClick={onCTA2}
            className="px-8 py-4 bg-transparent border border-stone-200 text-[#fbf7ed] hover:border-gold-500 hover:text-gold-400 font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 rounded-sm cursor-pointer"
          >
            Explore Destinations
          </button>
        </motion.div>
      </div>

      {/* Slider Left/Right Arrows */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-25 flex justify-between pointer-events-none">
        <button
          onClick={handlePrev}
          className="p-2 sm:p-3 rounded-full bg-stone-900/45 text-[#fbf7ed] border border-stone-800/10 hover:border-gold-500/40 hover:text-gold-400 transition-all pointer-events-auto cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 sm:p-3 rounded-full bg-stone-900/45 text-[#fbf7ed] border border-stone-800/10 hover:border-gold-500/40 hover:text-gold-400 transition-all pointer-events-auto cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide Navigation Indicators */}
      <div className="absolute bottom-16 sm:bottom-12 z-20 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-gold-500' : 'w-2 bg-stone-700 hover:bg-stone-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Animated Scroll Indicator */}
      <div
        onClick={onCTA2}
        className="absolute bottom-4 sm:bottom-6 z-20 flex flex-col items-center cursor-pointer group"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] text-stone-500 uppercase mb-2 group-hover:text-gold-400 transition-colors">
          Scroll
        </span>
        <div className="w-[18px] h-[30px] rounded-full border border-stone-600 flex justify-center p-1 group-hover:border-gold-500/50 transition-colors">
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-1 h-1.5 bg-gold-500 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
