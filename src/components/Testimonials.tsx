import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((p) => (p + 1) % TESTIMONIALS.length);
    }, 4000); // rotates every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIdx((p) => (p + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-stone-950 border-t border-stone-900 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Decorative ambient gold glow */}
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-gold-500/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <span className="font-mono text-xs text-gold-500 tracking-[0.25em] uppercase mb-3 block">
          ✦ Global Distinctions ✦
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-gold-100 mb-14 font-semibold">
          What Seekers Say
        </h2>

        {/* Carousel Container */}
        <div className="relative min-h-[220px] max-w-2xl mx-auto flex flex-col items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <Quote className="h-10 w-10 text-gold-500/25 mb-6 rotate-180 shrink-0" />
              
              <blockquote className="font-serif text-base sm:text-lg md:text-xl text-stone-200 tracking-wide font-medium italic leading-relaxed mb-6">
                "{TESTIMONIALS[currentIdx].quote}"
              </blockquote>

              {/* Star Rating */}
              <div className="flex space-x-1 mb-4 justify-center">
                {[...Array(TESTIMONIALS[currentIdx].rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gold-500 fill-gold-500" />
                ))}
              </div>

              {/* Client Profile */}
              <div className="flex items-center space-x-3 mt-1 justify-center">
                <img
                  src={TESTIMONIALS[currentIdx].avatar}
                  alt={TESTIMONIALS[currentIdx].name}
                  className="w-10 h-10 rounded-full border border-gold-500/25 object-cover"
                />
                <div className="text-left">
                  <h4 className="font-serif text-xs font-bold text-gold-100 uppercase tracking-widest leading-none mb-1">
                    {TESTIMONIALS[currentIdx].name}
                  </h4>
                  <span className="font-mono text-[9px] text-stone-500 uppercase tracking-wider block">
                    Verified {TESTIMONIALS[currentIdx].nationality} Traveler
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual navigation controls */}
        <div className="flex gap-4 mt-10 justify-center">
          <button
            onClick={handlePrev}
            className="p-1 px-3 bg-stone-900 border border-stone-850 hover:border-gold-500/20 text-stone-400 hover:text-gold-400 transition-colors rounded-sm cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {/* Bullet Indicators */}
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIdx === idx ? 'w-5 bg-gold-400' : 'w-1.5 bg-stone-700 hover:bg-stone-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-1 px-3 bg-stone-900 border border-stone-850 hover:border-gold-500/20 text-stone-400 hover:text-gold-400 transition-colors rounded-sm cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
