import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Save, ClipboardList, Trash2, Calendar, 
  MapPin, CheckCircle, Clock, ChevronDown, ChevronUp, Check, 
  RefreshCw, Globe, HelpCircle, FileText, ArrowRight
} from 'lucide-react';
import { Booking, ItineraryPlan, TravelDocument } from '../types';
import { 
  loadStoredBookings, deleteStoredBooking, 
  loadStoredItineraries, deleteStoredItinerary,
  loadStoredDocuments, saveStoredDocuments, DocumentItem
} from '../data';

interface DashboardProps {
  refreshTrigger: number;
  onSelectSavedPlan: (plan: ItineraryPlan) => void;
}

export default function Dashboard({ refreshTrigger, onSelectSavedPlan }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'itineraries' | 'documents'>('bookings');
  
  // Storage synced states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [itineraries, setItineraries] = useState<ItineraryPlan[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  
  // Expansion manager for nested itinerary lists
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Load everything on mount & whenever parent signals changes
  useEffect(() => {
    setBookings(loadStoredBookings());
    setItineraries(loadStoredItineraries());
    setDocuments(loadStoredDocuments());
  }, [refreshTrigger]);

  const handleDeleteBooking = (id: string) => {
    const list = deleteStoredBooking(id);
    setBookings(list);
  };

  const handleDeleteItinerary = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const list = deleteStoredItinerary(id);
    setItineraries(list);
    if (expandedId === id) setExpandedId(null);
  };

  const handleToggleDoc = (docId: string) => {
    const updated = documents.map(d => {
      if (d.id === docId) {
        return { ...d, completed: !d.completed };
      }
      return d;
    });
    setDocuments(updated);
    saveStoredDocuments(updated);
  };

  return (
    <section id="bookings-dashboard" className="py-24 bg-stone-900/50 border-t border-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs text-gold-500 tracking-[0.25em] uppercase mb-3 block">
              ✦ Personal Workspace ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-gold-100">
              LUMIÈRE VOYAGES Portal
            </h2>
            <div className="h-0.5 w-24 bg-gold-500/35 mt-3 mb-4 md:mb-0" />
          </div>
          <p className="font-sans text-xs sm:text-sm text-stone-400 font-light max-w-sm md:text-right leading-relaxed">
            Manage your logged reservations, recall generated itineraries, and audit physical document checklists before boarding.
          </p>
        </div>

        {/* Tab Controls Navigation */}
        <div className="flex border-b border-stone-800 mb-8 max-w-3xl mx-auto justify-center bg-stone-950 p-1.5 rounded-md border border-stone-850/80">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded transition-all duration-300 font-serif text-xs uppercase tracking-widest cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-gold-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-gold-400'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">My Bookings</span>
            <span className="inline-flex sm:hidden">Bookings</span>
            {bookings.length > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                activeTab === 'bookings' ? 'bg-stone-950 text-gold-400' : 'bg-stone-900 text-stone-400'
              }`}>
                {bookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('itineraries')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded transition-all duration-300 font-serif text-xs uppercase tracking-widest cursor-pointer ${
              activeTab === 'itineraries'
                ? 'bg-gold-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-gold-400'
            }`}
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Saved Itineraries</span>
            <span className="inline-flex sm:hidden">Plans</span>
            {itineraries.length > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                activeTab === 'itineraries' ? 'bg-stone-950 text-gold-400' : 'bg-stone-900 text-stone-400'
              }`}>
                {itineraries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded transition-all duration-300 font-serif text-xs uppercase tracking-widest cursor-pointer ${
              activeTab === 'documents'
                ? 'bg-gold-500 text-stone-950 font-bold'
                : 'text-stone-400 hover:text-gold-400'
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Travel Documents</span>
            <span className="inline-flex sm:hidden">Visa Checklist</span>
          </button>
        </div>

        {/* Tab Contents Frame */}
        <div className="max-w-4xl mx-auto">
          
          {/* BOOKINGS TABLE */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {bookings.length === 0 ? (
                <div className="text-center py-12 bg-stone-900/20 border border-stone-850 rounded p-6">
                  <p className="text-stone-500 text-sm">No reservations logged. Configure any custom trip above or book a package to populate your roster.</p>
                </div>
              ) : (
                bookings.map((bkg) => (
                  <div
                    key={bkg.id}
                    className="bg-stone-950 rounded-md border border-stone-850 overflow-hidden flex flex-col md:flex-row shadow group"
                  >
                    {/* Tiny thumbnail frame */}
                    <div className="w-full md:w-44 h-32 md:h-auto overflow-hidden relative">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${bkg.image})` }}
                      />
                    </div>

                    {/* Booking metadata */}
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                        <div>
                          <span className="font-mono text-[9px] text-stone-500 tracking-wider block uppercase">
                            BOOKING REFERENCE: {bkg.id}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-gold-100">
                            {bkg.destination}
                          </h4>
                        </div>
                        <span className={`mt-2 sm:mt-0 px-2 py-0.5 rounded text-[9px] font-mono flex items-center space-x-1 border ${
                          bkg.status === 'Confirmed'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        }`}>
                          <span>{bkg.status === 'Confirmed' ? '✓' : '⟳'}</span>
                          <span className="uppercase tracking-widest">{bkg.status}</span>
                        </span>
                      </div>

                      <p className="text-xs text-stone-400 font-light mb-4 italic">
                        "{bkg.tourName}"
                      </p>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-stone-900 pt-4 gap-4">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                          <div>
                            <span className="text-[9px] text-stone-500 font-mono block">DATE REF</span>
                            <span className="text-[11px] text-stone-300 font-medium">{bkg.dates}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-stone-500 font-mono block">COMPANIONS</span>
                            <span className="text-[11px] text-stone-300 font-medium">{bkg.travelers} Guests</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div>
                            <span className="text-[9px] text-stone-500 font-mono block text-left sm:text-right">SUBTOTAL REC</span>
                            <span className="font-mono text-sm font-bold text-gold-400">{bkg.amount}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteBooking(bkg.id)}
                            className="p-1 px-2 border border-stone-800 text-stone-500 hover:border-red-500/30 hover:text-red-400 transition-all rounded-sm cursor-pointer"
                            title="Cancel Booking Order"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* SAVED ITINERARIES PANEL */}
          {activeTab === 'itineraries' && (
            <div className="space-y-4">
              {itineraries.length === 0 ? (
                <div className="text-center py-12 bg-stone-900/20 border border-stone-850 rounded p-6">
                  <p className="text-stone-500 text-sm">No itineraries saved. Complete an AI planner profile above to save a customized itinerary.</p>
                </div>
              ) : (
                itineraries.map((plan) => {
                  const isExpanded = expandedId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className="bg-stone-950 rounded border border-stone-850 overflow-hidden transition-all duration-300 shadow"
                    >
                      {/* Accordion parent trigger */}
                      <div
                        onClick={() => setExpandedId(isExpanded ? null : plan.id)}
                        className="p-4 flex justify-between items-center cursor-pointer hover:bg-stone-900/30 transition-colors"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase bg-gold-500/10 text-gold-400 border border-gold-500/15">
                              {plan.travelStyle} Theme
                            </span>
                            <span className="text-[9px] font-mono text-stone-500">Ref: {plan.id}</span>
                          </div>
                          <h4 className="font-serif text-lg font-bold text-gold-100 mt-1">
                            {plan.duration} Days in {plan.destination}
                          </h4>
                          <span className="text-[10px] text-stone-400 font-mono">
                            🛫 Start: {plan.startDate} • Total cost: {plan.totalEstimatedCost}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* Load button */}
                          <button
                            onClick={(e) => { e.stopPropagation(); onSelectSavedPlan(plan); }}
                            className="p-1 px-2.5 bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-stone-950 text-[10px] font-mono uppercase rounded border border-gold-500/20 transition-all"
                            title="Recall Itinerary in Preview"
                          >
                            Recall
                          </button>
                          
                          {/* Delete */}
                          <button
                            onClick={(e) => handleDeleteItinerary(plan.id, e)}
                            className="p-2 border border-stone-850 text-stone-500 hover:border-red-500/30 hover:text-red-400 transition-colors rounded-sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          {isExpanded ? <ChevronUp className="h-4 w-4 text-stone-400" /> : <ChevronDown className="h-4 w-4 text-stone-400" />}
                        </div>
                      </div>

                      {/* Expanded day-by-day nested checklist */}
                      {isExpanded && (
                        <div className="p-4 pt-1 border-t border-stone-900 bg-stone-900/15 animate-fade-in max-h-72 overflow-y-auto custom-scrollbar">
                          <p className="text-[10px] text-[#78716c] font-mono uppercase tracking-widest mb-3 border-b border-stone-900 pb-2">RECOMMENDED SUITES:</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {plan.hotels.map((h, i) => (
                              <span key={i} className="px-2 py-1 bg-stone-950 border border-stone-850 text-[9px] text-stone-300 rounded font-mono">🏨 {h}</span>
                            ))}
                          </div>

                          <p className="text-[10px] text-[#78716c] font-mono uppercase tracking-widest mb-2">TIMELINE OVERVIEW:</p>
                          <div className="space-y-4">
                            {plan.dayByDay.map((day) => (
                              <div key={day.day} className="text-xs border-b border-stone-900 pb-3 last:border-0">
                                <div className="flex justify-between font-mono text-[9px] text-gold-500 mb-1 font-bold">
                                  <span>DAY {day.day} // {day.title}</span>
                                  <span>{day.estimatedCost}</span>
                                </div>
                                <div className="text-stone-300 pl-2">
                                  🏢 <span className="font-semibold text-stone-400">Accom:</span> {day.accommodation}
                                </div>
                                <div className="mt-1.5 pl-2 space-y-1">
                                  {day.activities.map((act, idx) => (
                                    <div key={idx} className="text-stone-400 text-[11px] flex items-start">
                                      <span className="text-gold-500 mr-1.5 shrink-0">✦</span>
                                      <span>{act}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TRAVEL DOCUMENTS DISCHARGE */}
          {activeTab === 'documents' && (
            <div className="bg-stone-950 border border-stone-850 p-6 rounded-md">
              <div className="flex items-center space-x-2 text-gold-300 mb-4 pb-2 border-b border-stone-800">
                <ClipboardList className="h-5 w-5 text-gold-500" />
                <h4 className="font-serif text-lg font-bold tracking-wide">Departure Documentation Audit</h4>
              </div>

              <p className="text-xs text-stone-400 font-light leading-relaxed mb-6">
                Ensure all required documentation is safely compiled. Check off items as you secure them to prevent travel disruptions at customs check-ins.
              </p>

              {/* Dynamic checklist */}
              <div className="space-y-3.5">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleToggleDoc(doc.id)}
                    className={`flex items-center p-3.5 rounded border border-stone-850 bg-stone-900/20 hover:bg-stone-900/40 cursor-pointer transition-all ${
                      doc.completed ? 'border-emerald-500/30' : 'hover:border-stone-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center mr-4 shrink-0 transition-all ${
                      doc.completed 
                        ? 'bg-emerald-500 border-emerald-500 text-stone-950' 
                        : 'border-stone-600 bg-stone-950'
                    }`}>
                      {doc.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                    
                    <span className={`text-xs font-sans select-none ${
                      doc.completed ? 'text-stone-400 line-through' : 'text-stone-200'
                    }`}>
                      {doc.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Secure reminder footer */}
              <div className="mt-8 pt-4 border-t border-stone-900 text-center">
                <span className="inline-flex items-center text-[10px] font-mono uppercase tracking-[0.2em] text-gold-500/70">
                  🛡️ SSL Encrypted client credentials protocol
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
