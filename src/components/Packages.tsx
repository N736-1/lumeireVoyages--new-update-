import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Check, Award, X, Sparkles, Calendar, Users, Briefcase } from 'lucide-react';
import { LUXURY_PACKAGES, saveStoredBooking, LuxuryPackage } from '../data';

interface PackagesProps {
  onBookingSuccess: () => void;
}

export default function Packages({ onBookingSuccess }: PackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState<LuxuryPackage | null>(null);
  const [bkgDate, setBkgDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().split('T')[0];
  });
  const [guestCount, setGuestCount] = useState(2);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    const totalCost = selectedPackage.price * guestCount;

    saveStoredBooking({
      id: `BKG-${Math.floor(Math.random() * 90000 + 10000)}`,
      destination: selectedPackage.title.includes('European') 
        ? 'Europe (Multi-City)' 
        : selectedPackage.title.includes('Maldives') 
          ? 'Maldives Private Islands' 
          : 'Dubai & Abu Dhabi',
      tourName: selectedPackage.title,
      dates: `${bkgDate} (${selectedPackage.duration})`,
      travelers: guestCount,
      amount: `$${totalCost.toLocaleString()}`,
      status: 'Confirmed',
      image: selectedPackage.image
    });

    setIsSuccess(true);
    onBookingSuccess();

    setTimeout(() => {
      setIsSuccess(false);
      setSelectedPackage(null);
    }, 2800);
  };

  return (
    <section id="packages" className="py-24 bg-stone-950 border-t border-stone-900 relative">
      <div className="absolute left-[5%] top-[15%] w-[20rem] h-[20rem] bg-gold-500/3 rounded-full filter blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-gold-500 tracking-[0.25em] uppercase mb-3 block">
            ✦ Signature Itineraries ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-gold-100 mb-6 font-semibold">
            All-Inclusive Luxury Packages
          </h2>
          <div className="h-0.5 w-16 bg-gold-400/30 mx-auto mb-6" />
          <p className="font-sans text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
            Our legendary signature escapes. Fully orchestrated private chartered aviation, 
            exclusive palace suite bookings, and round-the-clock white-glove concierge arrangements.
          </p>
        </div>

        {/* Premium Packages Grid - horizontal cards on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {LUXURY_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-stone-900/40 rounded-lg overflow-hidden border border-stone-850 hover:border-gold-500/35 transition-all duration-500 flex flex-col h-full group hover:shadow-[0_15px_35px_rgba(212,175,55,0.06)]"
            >
              {/* Full bleed image with duration badge */}
              <div className="relative h-60 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10" />
                
                {/* Duration Badge */}
                <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-stone-900/90 backdrop-blur-md text-gold-400 font-mono text-[10px] uppercase tracking-wider rounded-sm border border-gold-500/20">
                  <Clock className="h-3.5 w-3.5 inline mr-1 text-gold-500" />
                  {pkg.duration}
                </span>
              </div>

              {/* Package Details */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif text-xl font-bold tracking-wide text-gold-100 mb-4 group-hover:text-gold-300 transition-colors">
                  {pkg.title}
                </h3>

                {/* Inclusions checklist */}
                <div className="space-y-3 mb-8 flex-1">
                  {pkg.inclusions.map((inc, iIdx) => (
                    <div key={iIdx} className="flex items-start text-xs text-stone-400">
                      <Check className="h-4 w-4 text-gold-500 mr-2 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Booking Action */}
                <div className="pt-6 border-t border-stone-800/85">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-[10px] text-stone-500 tracking-widest uppercase font-mono">ALL-INCLUSIVE</span>
                    <span className="font-mono text-xl font-extrabold text-gold-400">
                      ${pkg.price.toLocaleString()} <span className="text-[11px] text-stone-500 font-light font-sans tracking-tight">/ Guest</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="w-full py-3 bg-stone-950 hover:bg-gold-500 hover:text-stone-950 border border-gold-500/40 hover:border-gold-500 text-gold-400 text-xs font-serif tracking-widest uppercase font-bold text-center rounded-sm transition-all duration-300 cursor-pointer"
                  >
                    ✦ Book This Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Micro Booking modal fly-out */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-90 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-stone-900 border border-gold-500/25 rounded-md overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-gold-400 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Form Content */}
              {!isSuccess ? (
                <form onSubmit={handleBookingConfirm} className="p-6 sm:p-8">
                  <div className="flex items-center space-x-2 text-gold-400 mb-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em]">CURATED ESCAPE REGISTRY</span>
                  </div>
                  
                  <h4 className="font-serif text-xl font-bold tracking-wide text-gold-100 mb-6 border-b border-stone-800 pb-3">
                    {selectedPackage.title}
                  </h4>

                  <div className="space-y-4 mb-6">
                    {/* Departure Date */}
                    <div>
                      <label className="block text-stone-400 text-xs tracking-widest uppercase font-mono mb-2">
                        Preferred Departure Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={bkgDate}
                          onChange={(e) => setBkgDate(e.target.value)}
                          className="w-full px-3 py-2.5 bg-stone-950 border border-stone-850 rounded text-sm text-stone-100 focus:outline-none focus:border-gold-500 cursor-pointer"
                          required
                        />
                      </div>
                    </div>

                    {/* Guest Counter */}
                    <div>
                      <label className="block text-stone-400 text-xs tracking-widest uppercase font-mono mb-2">
                        Companions & Guest Count
                      </label>
                      <div className="flex items-center justify-between bg-stone-950 py-1.5 px-3 border border-stone-850 rounded">
                        <button
                          type="button"
                          disabled={guestCount === 1}
                          onClick={() => setGuestCount(g => Math.max(1, g - 1))}
                          className="p-1 px-3 text-stone-400 hover:text-gold-500 disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className="font-mono text-sm text-[#fbf7ed]">{guestCount} Guest{guestCount > 1 ? 's' : ''}</span>
                        <button
                          type="button"
                          disabled={guestCount === 8}
                          onClick={() => setGuestCount(g => Math.min(8, g + 1))}
                          className="p-1 px-3 text-stone-400 hover:text-gold-500"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Luxury details */}
                    <div className="bg-stone-950 p-3 rounded border border-stone-850 text-[11px] text-stone-400 flex items-start space-x-2">
                      <Award className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>Complimentary vintage Dom Pérignon champagne welcome & express tarmac transfers included.</span>
                    </div>

                    {/* Calculated Price */}
                    <div className="flex justify-between items-center py-3 border-t border-stone-800/80 mt-4">
                      <span className="text-xs text-stone-400 font-mono">TOTAL ESTIMATED INVESTMENT</span>
                      <span className="font-mono text-lg font-bold text-gold-400">
                        ${(selectedPackage.price * guestCount).toLocaleString()} USD
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4.5 bg-gold-500 hover:bg-gold-400 text-stone-950 font-sans text-xs font-bold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>✦ Finalize & Log Confirmed Booking</span>
                  </button>
                </form>
              ) : (
                /* Success Feedback Screen */
                <div className="p-8 text-center py-16 flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full border border-emerald-500/40 flex items-center justify-center mb-6 text-emerald-400">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold tracking-wider text-gold-100 mb-2">
                    Booking Confirmed!
                  </h4>
                  <p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-4">
                    Authenticated Transaction Complete
                  </p>
                  <p className="text-stone-400 text-xs font-light max-w-xs leading-relaxed">
                    "{selectedPackage.title}" has been successfully booked for {guestCount} travelers on {bkgDate}. 
                    Check your reservations panel on the Dashboard below to view and track your vouchers.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
