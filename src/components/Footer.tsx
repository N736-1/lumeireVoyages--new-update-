import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Instagram, Twitter, Linkedin, Sparkles, Send, Check } from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-stone-950 text-stone-400 border-t-2 border-gold-500/25 relative pl-4 pr-4">
      {/* Decorative top border glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Logo & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 cursor-pointer mb-4" onClick={() => onNavClick('home')}>
              <img
                src="/src/assets/images/lumiere_logo_1790751906590.jpg"
                alt="Lumière Voyage Logo"
                className="w-8 h-8 rounded-full object-cover border border-gold-400/50 shadow-md shadow-black"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif text-lg font-bold tracking-widest text-[#fbf7ed]">
                LUMIÈRE <span className="text-gold-500 text-xs font-sans">VOYAGE</span>
              </span>
            </div>
            
            <p className="font-serif text-sm italic text-stone-300 max-w-sm mb-6 leading-relaxed">
              "Elevate Every Journey — Where every voyage becomes an extraordinary masterpiece."
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-4">
              <a href="#" className="p-2 bg-stone-900 hover:bg-gold-500 hover:text-stone-950 rounded-full transition-all border border-stone-850" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-stone-900 hover:bg-gold-500 hover:text-stone-950 rounded-full transition-all border border-stone-850" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-stone-900 hover:bg-gold-500 hover:text-stone-950 rounded-full transition-all border border-stone-850" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Destinations */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-gold-200 mb-4">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              {['Paris, France', 'Maldives Private Islands', 'Santorini Caldera', 'Dubai Skyline', 'Ubud, Bali', 'Amalfi, Italy'].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavClick('destinations')}
                    className="hover:text-gold-400 hover:underline transition-colors block text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-gold-200 mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              {['AI Custom Curation', 'Private Aviation Charters', 'Exclusive Villa Escapes', 'VIP Tarmac Fast-tracks', 'Personal On-Island butler', 'Diplomatic Document Advisory'].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavClick('ai-planner')}
                    className="hover:text-gold-400 hover:underline transition-colors block text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Sign-up */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-gold-200 mb-4">
              Subscribe
            </h4>
            <p className="text-stone-500 text-[11px] mb-4 leading-relaxed font-sans">
              Enter email below to receive rare travel offerings, cultural dispatches, and private itineraries.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="concierge@example.com"
                className="w-full bg-stone-900 border border-stone-800 text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold-500 text-stone-100 pr-10 transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 p-1.5 px-2 bg-stone-950 text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
                aria-label="Send Email"
              >
                {subscribed ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Send className="h-3.5 w-3.5" />}
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-emerald-400 mt-2 block font-mono"
                >
                  ✓ Registered in list digest. Thank you!
                </motion.span>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Column 5: Contact Info / Corporate bar */}
        <div className="mt-16 pt-8 border-t border-stone-900 flex flex-col sm:flex-row justify-between items-center text-xs font-sans text-stone-500">
          <p className="mb-4 sm:mb-0 text-[11px]">
            &copy; {new Date().getFullYear()} Lumière Voyages. All rights reserved. 
            Designed for seeker clientele.
          </p>
          <div className="flex space-x-6 text-[10px] uppercase font-mono tracking-wider">
            <a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Cookies Configuration</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
