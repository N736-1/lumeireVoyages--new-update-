import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Calendar, DollarSign, Users, Sparkles, 
  MapPin, Check, Plus, Minus, ArrowRight, Save, 
  FileText, Mail, Hotel, CheckCircle, Utensils, Award
} from 'lucide-react';
import { ItineraryPlan } from '../types';
import { generateBespokeItinerary, saveStoredItinerary, saveStoredBooking } from '../data';

interface TripPlannerProps {
  onItinerarySaved: () => void;
  onNewBookingAdded: () => void;
}

const STYLE_OPTIONS = [
  { value: 'luxury', label: 'Bespoke Luxury', desc: 'Private palaces, yachts, and helicopter rides' },
  { value: 'adventure', label: 'Elite Adventure', desc: 'Active climbs, active sports, private instruction' },
  { value: 'cultural', label: 'Historical & Cultural', desc: 'Curator walk-throughs and ancient tastings' },
  { value: 'wellness', label: 'Holistic Wellness', desc: 'Sound bathing, thermal springs, and private organic yoga' },
  { value: 'honeymoon', label: 'Romantic Honeymoon', desc: 'Sunset photography, custom retreats, private pavilions' }
];

const QUICK_DESTINATIONS = ['Paris', 'Maldives', 'Santorini', 'Dubai', 'Bali', 'Amalfi Coast'];

export default function TripPlanner({ onItinerarySaved, onNewBookingAdded }: TripPlannerProps) {
  const [destination, setDestination] = useState('Paris');
  const [customDestination, setCustomDestination] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    return today.toISOString().split('T')[0];
  });
  const [duration, setDuration] = useState(4);
  const [budget, setBudget] = useState(15000);
  const [travelers, setTravelers] = useState(2);
  const [style, setStyle] = useState('luxury');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<ItineraryPlan | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const triggerPlanner = async () => {
    const targetDest = customDestination.trim() || destination;
    if (!targetDest) return;

    setIsLoading(true);
    setSaveSuccess(false);
    setBookingSuccess(false);

    // Dynamic loading transitions
    const updates = [
      'Analyzing requested travel preferences...',
      'Securing 5-star palace accommodation templates...',
      'Mapping executive tarmac pickup coordinates...',
      'Curating private chef & Michelin star reservation routes...',
      'Assembling your bespoke Lumière Masterpiece Plan...'
    ];

    let currentStep = 0;
    setLoadingText(updates[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < updates.length) {
        setLoadingText(updates[currentStep]);
      }
    }, 700);

    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: targetDest,
          duration,
          budget,
          travelersCount: travelers,
          travelStyle: style,
          startDate
        })
      });

      const data = await res.json();
      clearInterval(interval);

      if (data && data.success && data.itinerary) {
        const rawAi = data.itinerary;
        const plan: ItineraryPlan = {
          id: `voyage-${Math.floor(Math.random() * 900000 + 100000)}`,
          destination: rawAi.destination || targetDest,
          startDate,
          duration,
          budget,
          travelersCount: travelers,
          travelStyle: style,
          dayByDay: rawAi.dayByDay || [],
          hotels: rawAi.hotels || ['Grand Palace Resort', 'The Ritz Reserve'],
          totalEstimatedCost: rawAi.totalEstimatedCost || `$${budget.toLocaleString()}`,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setGeneratedPlan(plan);
      } else {
        // Local fallback
        const plan = generateBespokeItinerary(targetDest, duration, budget, travelers, style, startDate);
        setGeneratedPlan(plan);
      }
    } catch (err) {
      clearInterval(interval);
      const plan = generateBespokeItinerary(targetDest, duration, budget, travelers, style, startDate);
      setGeneratedPlan(plan);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!generatedPlan) return;
    saveStoredItinerary(generatedPlan);
    setSaveSuccess(true);
    onItinerarySaved();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleBookTrip = () => {
    if (!generatedPlan) return;
    
    // Choose dynamic image based on selected place
    const matchedPlace = QUICK_DESTINATIONS.find(d => 
      generatedPlan.destination.toLowerCase().includes(d.toLowerCase())
    );
    const defaultImg = matchedPlace 
      ? `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80`
      : `https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80`;

    const mappedImgs: Record<string, string> = {
      'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'Maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      'Santorini': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      'Dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'Bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'Amalfi Coast': 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80'
    };

    const finalBookingImage = mappedImgs[matchedPlace || ''] || defaultImg;

    saveStoredBooking({
      id: `BKG-${Math.floor(Math.random() * 90000 + 10000)}`,
      destination: generatedPlan.destination,
      tourName: `Bespoke AI ${generatedPlan.travelStyle.charAt(0).toUpperCase() + generatedPlan.travelStyle.slice(1)} Grand Holiday`,
      dates: `${generatedPlan.startDate} (${generatedPlan.duration} Days)`,
      travelers: generatedPlan.travelersCount,
      amount: generatedPlan.totalEstimatedCost,
      status: 'Confirmed',
      image: finalBookingImage
    });

    setBookingSuccess(true);
    onNewBookingAdded();
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  const getEmailLink = () => {
    if (!generatedPlan) return '#';
    const subject = encodeURIComponent(`My Lumière Voyages Itinerary - ${generatedPlan.destination}`);
    
    let text = `LUMIÈRE VOYAGES - BESPOKE AI TRAVEL PLAN\n`;
    text += `==============================================\n`;
    text += `Destination: ${generatedPlan.destination}\n`;
    text += `Dates: Starting on ${generatedPlan.startDate}\n`;
    text += `Duration: ${generatedPlan.duration} Days\n`;
    text += `Style: ${generatedPlan.travelStyle.toUpperCase()}\n`;
    text += `Travelers: ${generatedPlan.travelersCount}\n`;
    text += `Total Curated Estimate: ${generatedPlan.totalEstimatedCost}\n\n`;
    text += `HOTELS TO EXPERIENCE:\n`;
    generatedPlan.hotels.forEach(h => { text += `- ${h}\n`; });
    text += `\nDAY-BY-DAY ITINERARY:\n`;
    generatedPlan.dayByDay.forEach(day => {
      text += `\nDay ${day.day}: ${day.title}\n`;
      text += `  Accommodation: ${day.accommodation}\n`;
      text += `  Curated Activities:\n`;
      day.activities.forEach(a => { text += `   * ${a}\n`; });
      text += `  Dining suggestions: ${day.dining.join(', ')}\n`;
      text += `  Estimated daily spend: ${day.estimatedCost}\n`;
    });
    text += `\n==============================================\n`;
    text += `Trip initialized in luxury with Lumière Voyages © 2026`;

    return `mailto:?subject=${subject}&body=${encodeURIComponent(text)}`;
  };

  return (
    <section id="ai-planner" className="py-24 bg-stone-950 relative border-t border-stone-900 overflow-hidden">
      {/* Decorative ambient gold glow */}
      <div className="absolute right-[-10%] top-[10%] w-[35rem] h-[35rem] bg-gold-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[10%] w-[35rem] h-[35rem] bg-gold-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-gold-500 tracking-[0.2em] uppercase mb-3 block">
            ✦ AI-Powered Curation ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-gold-100 mb-6 font-semibold">
            Bespoke AI Trip Planner
          </h2>
          <div className="h-0.5 w-24 bg-gold-500/30 mx-auto mb-6" />
          <p className="font-sans text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Translate your visual imaginations of escape into detailed day-by-day itineraries. 
            Specify your style, select a destination, and let our private AI planner weave 
            an elite itinerary just for you.
          </p>
        </div>

        {/* Outer Bento Grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form controls (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900/60 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-stone-800 focus-within:border-gold-500/20 transition-all duration-300">
            <h3 className="font-serif text-lg tracking-wide text-gold-300 mb-6 flex items-center space-x-2">
              <Compass className="h-5 w-5 text-gold-500 animate-spin-slow" />
              <span>Configure Your Retreat</span>
            </h3>

            <div className="space-y-6">
              {/* Destination */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-stone-400 mb-2 font-medium">
                  Select Pre-curated Destination
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {QUICK_DESTINATIONS.map((place) => (
                    <button
                      key={place}
                      type="button"
                      onClick={() => {
                        setDestination(place);
                        setCustomDestination('');
                      }}
                      className={`py-2 px-1 text-[11px] font-mono tracking-wider rounded-sm border uppercase transition-all duration-300 ${
                        destination === place && !customDestination
                          ? 'border-gold-500 bg-gold-500/10 text-gold-400 font-bold'
                          : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      {place}
                    </button>
                  ))}
                </div>

                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-stone-500" />
                  </div>
                  <input
                    type="text"
                    value={customDestination}
                    onChange={(e) => {
                      setCustomDestination(e.target.value);
                      setDestination('');
                    }}
                    placeholder="Or type custom destination (e.g., Tokyo, Rome...)"
                    className="block w-full pl-10 pr-3 py-3 bg-stone-950 border border-stone-800 rounded-sm text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              {/* Start Date & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-stone-400 mb-2 font-medium">
                    Departure Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="block w-full px-3 py-3 bg-stone-950 border border-stone-800 rounded-sm text-sm text-stone-200 focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-sans text-xs uppercase tracking-widest text-stone-400 font-medium">
                      Duration
                    </label>
                    <span className="font-mono text-xs text-gold-400">{duration} Days</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-stone-950 px-3 py-1.5 border border-stone-800 rounded-sm">
                    <button
                      type="button"
                      disabled={duration === 1}
                      onClick={() => setDuration(d => Math.max(1, d - 1))}
                      className="p-1 px-2.5 text-stone-400 hover:text-gold-500 disabled:opacity-30 disabled:hover:text-stone-400"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="flex-1 text-center font-mono text-sm text-stone-200">{duration}</span>
                    <button
                      type="button"
                      disabled={duration === 14}
                      onClick={() => setDuration(d => Math.min(14, d + 1))}
                      className="p-1 px-2.5 text-stone-400 hover:text-gold-500 disabled:opacity-30"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Budget slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-stone-400 font-medium">
                    Budget Allocation
                  </label>
                  <span className="font-mono text-xs text-gold-400 font-bold">
                    ${(budget / 1000).toFixed(0)}k USD
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-gold-500 bg-stone-950 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9px] text-stone-500 mt-1">
                  <span>$2k</span>
                  <span>$25k</span>
                  <span>$50k</span>
                  <span>$75k</span>
                  <span>$100k+</span>
                </div>
              </div>

              {/* Travelers */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-[#a8a29e] font-medium">
                    Travelers Count
                  </label>
                  <span className="font-mono text-xs text-gold-400">{travelers} {travelers === 1 ? 'Solo Seeker' : 'Guests'}</span>
                </div>
                <div className="flex items-center space-x-3 bg-stone-950 px-3 py-1.5 border border-stone-800 rounded-sm">
                  <button
                    type="button"
                    disabled={travelers === 1}
                    onClick={() => setTravelers(t => Math.max(1, t - 1))}
                    className="p-1 px-2.5 text-stone-500 hover:text-gold-500 disabled:opacity-30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="flex-1 text-center font-mono text-sm text-stone-200">{travelers}</span>
                  <button
                    type="button"
                    disabled={travelers === 10}
                    onClick={() => setTravelers(t => Math.min(10, t + 1))}
                    className="p-1 px-2.5 text-stone-400 hover:text-gold-500 disabled:opacity-30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Travel Style Selection */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-widest text-stone-400 mb-2 font-medium">
                  Curation Theme & Style
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  {STYLE_OPTIONS.map((styleOpt) => (
                    <div
                      key={styleOpt.value}
                      onClick={() => setStyle(styleOpt.value)}
                      className={`p-2.5 rounded-sm border cursor-pointer transition-all duration-200 ${
                        style === styleOpt.value
                          ? 'border-gold-500/70 bg-stone-950'
                          : 'border-stone-800 hover:border-stone-700 bg-stone-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-serif uppercase tracking-wider ${
                          style === styleOpt.value ? 'text-gold-400 font-bold' : 'text-stone-300'
                        }`}>
                          {styleOpt.label}
                        </span>
                        {style === styleOpt.value && <div className="w-2 h-2 rounded-full bg-gold-400" />}
                      </div>
                      <p className="text-[10px] text-stone-500 font-sans mt-0.5">{styleOpt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={triggerPlanner}
                className="w-full mt-6 py-4 bg-gold-500 hover:bg-gold-400 text-stone-950 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.3)] flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>✦ Generate My AI Itinerary</span>
              </button>
            </div>
          </div>

          {/* Planner Outcome / Preloads (7 cols) */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              {isLoading ? (
                /* Dynamic Loader */
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center min-h-[580px] bg-stone-900/20 border border-stone-800 rounded-lg p-8 text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-stone-800 border-t-gold-500 animate-spin" />
                    <Sparkles className="absolute inset-x-0 mx-auto top-1/2 -translate-y-1/2 h-5 w-5 text-gold-400 animate-pulse" />
                  </div>
                  <h4 className="font-serif text-lg tracking-wider text-gold-300 mb-2">
                    Lumière Private Intellect
                  </h4>
                  <p className="font-mono text-[10px] text-gold-500/70 tracking-[0.25em] uppercase mb-4">
                    Our AI is crafting your bespoke journey...
                  </p>
                  
                  <div className="h-px w-16 bg-stone-800 mb-4" />
                  
                  {/* Rotating step status */}
                  <motion.p
                    key={loadingText}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-sans text-xs text-stone-400 italic max-w-sm mt-1"
                  >
                    "{loadingText}"
                  </motion.p>
                </motion.div>
              ) : generatedPlan ? (
                /* Beautiful Curated Results Card Component */
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-stone-900/50 backdrop-blur-md rounded-lg border border-stone-800 p-6 sm:p-8"
                >
                  {/* Results Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-800 pb-6 mb-6">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest text-gold-400 bg-gold-400/10 border border-gold-500/15 uppercase">
                          AI Curation Selected
                        </span>
                        <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                          ID: {generatedPlan.id}
                        </span>
                      </div>
                      <h4 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-gold-100 mt-2">
                        {generatedPlan.duration} Days in {generatedPlan.destination}
                      </h4>
                      <p className="font-sans text-xs text-stone-400 mt-1 uppercase tracking-widest">
                        Theme: {generatedPlan.travelStyle} • Guests: {generatedPlan.travelersCount} • Launching {generatedPlan.startDate}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 text-left sm:text-right">
                      <span className="font-sans text-[10px] text-stone-500 tracking-wider uppercase block">
                        Estimated Total Spend
                      </span>
                      <span className="font-mono text-2xl font-bold text-gold-400">
                        {generatedPlan.totalEstimatedCost}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap gap-2.5 mb-8 border-b border-stone-800 pb-6">
                    {/* Save itinerary */}
                    <button
                      onClick={handleSave}
                      disabled={saveSuccess}
                      className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm border flex items-center space-x-2 transition-all cursor-pointer ${
                        saveSuccess 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-gold-500 hover:text-gold-400'
                      }`}
                    >
                      {saveSuccess ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Saved Successfully ✓</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-3.5 w-3.5" />
                          <span>Save Itinerary</span>
                        </>
                      )}
                    </button>

                    {/* Book Now */}
                    <button
                      onClick={handleBookTrip}
                      disabled={bookingSuccess}
                      className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm border flex items-center space-x-2 transition-all cursor-pointer ${
                        bookingSuccess
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                          : 'bg-gold-500/15 border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-stone-950'
                      }`}
                    >
                      {bookingSuccess ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Booking Registered ✓</span>
                        </>
                      ) : (
                        <>
                          <Award className="h-3.5 w-3.5" />
                          <span>Secure & Book Trip</span>
                        </>
                      )}
                    </button>

                    {/* Export Docs */}
                    <a
                      href="https://docs.new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-stone-950 border border-stone-800 text-stone-300 hover:border-gold-500 hover:text-gold-400 text-xs font-mono tracking-wider uppercase rounded-sm flex items-center space-x-2 transition-all"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Export to Docs</span>
                    </a>

                    {/* Email Itinerary */}
                    <a
                      href={getEmailLink()}
                      className="px-4 py-2 bg-stone-950 border border-stone-800 text-stone-300 hover:border-gold-500 hover:text-gold-400 text-xs font-mono tracking-wider uppercase rounded-sm flex items-center space-x-2 transition-all"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Email Digest</span>
                    </a>
                  </div>

                  {saveSuccess && (
                    <div className="mb-4 text-xs font-sans text-emerald-400 bg-emerald-500/5 p-2 px-3 border border-emerald-500/20 rounded">
                      ✦ Saved! Go to the 'Saved Itineraries' tab under the 'Booking Management Dashboard' section below to view or reload this travel plan.
                    </div>
                  )}

                  {bookingSuccess && (
                    <div className="mb-4 text-xs font-sans text-gold-400 bg-gold-400/5 p-2 px-3 border border-gold-500/10 rounded">
                      ✦ Reservation logged! This dynamic trip is now added to your bookings database in real-time. View or track it in the 'My Bookings' tab below!
                    </div>
                  )}

                  {/* 5-Star Accommodations Panel */}
                  <div className="mb-8 bg-stone-950/50 p-4 rounded-sm border border-stone-800/80">
                    <h5 className="font-serif text-xs text-gold-400 tracking-wider uppercase mb-3 flex items-center space-x-1.5">
                      <Hotel className="h-3.5 w-3.5 text-gold-500" />
                      <span>Curated Elite Palaces</span>
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {generatedPlan.hotels.map((hotelName, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-sm text-[10px] font-mono tracking-wide text-stone-300 bg-stone-900 border border-stone-800/80"
                        >
                          🏨 {hotelName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Day by Day custom timelines */}
                  <h5 className="font-serif text-sm text-gold-300 tracking-wider uppercase mb-5">
                    Your Curated Daily Timelines
                  </h5>
                  <div className="space-y-6 max-h-[420px] overflow-y-auto custom-scrollbar pr-2">
                    {generatedPlan.dayByDay.map((day) => (
                      <div
                        key={day.day}
                        className="pl-4 border-l border-gold-500/20 hover:border-gold-500/50 transition-colors relative"
                      >
                        {/* Day indicator node */}
                        <div className="absolute left-[-4px] top-1 w-1.5 h-1.5 rounded-full bg-gold-500" />
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                          <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase">
                            DAY {day.day} ✦ {day.title}
                          </span>
                          <span className="font-mono text-[10px] text-stone-500">
                             Est. Day Budget: {day.estimatedCost}
                          </span>
                        </div>

                        <div className="text-xs font-sans text-stone-300 mb-2 mt-0.5">
                          <strong className="text-stone-400 font-medium">Residence:</strong> {day.accommodation}
                        </div>

                        {/* Activities */}
                        <div className="space-y-1 mb-2">
                          {day.activities.map((act, aIdx) => (
                            <div key={aIdx} className="flex items-start text-[11px] text-stone-400 line-clamp-2">
                              <span className="text-gold-500 mr-2">✦</span>
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>

                        {/* Dining */}
                        <div className="flex items-center text-[10px] text-stone-500">
                          <Utensils className="h-3 w-3 mr-1 text-gold-500/65" />
                          <span className="font-mono uppercase text-[9px] tracking-wider font-bold mr-1.5">Elite Dining:</span>
                          <span className="italic">{day.dining.join(', ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Initial Idle State / Quick Suggestions Panel */
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col justify-center min-h-[580px] bg-stone-900/10 border border-stone-850 rounded-lg p-8 p-10 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="p-4 rounded-full bg-stone-900/60 border border-gold-500/10 mb-6">
                      <Sparkles className="h-8 w-8 text-gold-500/80 animate-pulse" />
                    </div>
                    <h3 className="font-serif text-xl font-medium tracking-wider text-gold-200 mb-2">
                      Masterpiece Itinerary Preview
                    </h3>
                    <p className="font-sans text-xs text-stone-400 max-w-md mx-auto leading-relaxed mb-8">
                      Your customized itinerary will materialize in this frame. Select custom durations, budgets, and travelers on the left to activate the AI planner.
                    </p>

                    <div className="w-full max-w-md border-t border-stone-900 pt-6">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a8a29e] block mb-4">
                        Quick Launch Guides
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => { setDestination('Paris'); setDuration(4); setBudget(16000); setStyle('luxury'); }}
                          className="p-3 text-left bg-stone-900/40 hover:bg-stone-900 border border-stone-850 hover:border-gold-500/30 rounded-sm transition-all cursor-pointer group"
                        >
                          <span className="font-serif text-xs text-gold-300 block font-bold">Parisian Royal Walk</span>
                          <span className="font-mono text-[9px] text-[#78716c] group-hover:text-gold-500/70">4 Days • Bespoke Luxury</span>
                        </button>
                        <button
                          onClick={() => { setDestination('Maldives'); setDuration(7); setBudget(28000); setStyle('wellness'); }}
                          className="p-3 text-left bg-stone-900/40 hover:bg-stone-900 border border-stone-850 hover:border-gold-500/30 rounded-sm transition-all cursor-pointer group"
                        >
                          <span className="font-serif text-xs text-gold-300 block font-bold">Maldives Overwater Retreat</span>
                          <span className="font-mono text-[9px] text-[#78716c] group-hover:text-gold-500/70">7 Days • Holistic Wellness</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
