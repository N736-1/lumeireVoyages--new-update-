import { ExternalLink, Award, FileCheck, CheckCircle2 } from 'lucide-react';

const EMBASSY_LINK = 'https://ai.studio/apps/fc069696-9b75-4e45-8c63-e2f0e6a5f8d9?fullscreenApplet=true';

export default function VisaSection() {
  return (
    <section id="visa" className="py-24 bg-stone-950 border-t border-stone-900 relative">
      <div className="absolute right-[5%] bottom-[15%] w-[18rem] h-[18rem] bg-gold-500/2 rounded-full filter blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge on section */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-gold-400 bg-gold-400/10 border border-gold-500/20 mb-6 shadow">
          <Award className="h-3.5 w-3.5" />
          <span>✦ AI-POWERED GUIDANCE</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-gold-100 mb-4 uppercase">
          TRAVELLING TO USA OR UK?
        </h2>
        
        {/* Subtext */}
        <p className="font-sans text-xs sm:text-sm text-stone-400 font-light max-w-xl mx-auto leading-relaxed mb-10">
          Get complete visa guidance, document checklists, and step-by-step process 
          information powered by AI. Navigate diplomatic procedures through automated filing checklists effortlessly.
        </p>

        {/* Major CTA Button */}
        <div className="mb-14">
          <a
            href={EMBASSY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-stone-950 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:-translate-y-0.5 group"
          >
            <span className="text-sm">🛂</span>
            <span>Check USA & UK Visa Requirements →</span>
            <ExternalLink className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Info Cards below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* USA VISA CARD */}
          <div className="p-6 bg-stone-900/40 rounded-md border text-left flex flex-col justify-between animate-gold-pulse transition-all hover:bg-stone-900/60 relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-xl font-bold tracking-wide text-gold-100 flex items-center space-x-2">
                  <span className="text-xl">🇺🇸</span>
                  <span>USA VISA</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[8px] font-mono uppercase bg-gold-400/10 text-gold-400 border border-gold-500/20">
                  Tourist & Student
                </span>
              </div>
              <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-6">
                "B1/B2 Tourist, F1 Student, H1B Work & more"
              </p>
              <div className="space-y-2 mb-6 text-[11px] text-stone-500">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold-500/60" />
                  <span>DS-160 Filing & SEVIS fee protocols</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold-500/60" />
                  <span>Interview slots, biometric details & checks</span>
                </div>
              </div>
            </div>
            <a
              href={EMBASSY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono tracking-widest uppercase text-gold-400 hover:text-gold-300 flex items-center space-x-1 transition-colors group-hover:translate-x-1"
            >
              <span>Learn More →</span>
            </a>
          </div>

          {/* UK VISA CARD */}
          <div className="p-6 bg-stone-900/40 rounded-md border text-left flex flex-col justify-between animate-gold-pulse transition-all hover:bg-stone-900/60 relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-xl font-bold tracking-wide text-gold-100 flex items-center space-x-2">
                  <span className="text-xl">🇬🇧</span>
                  <span>UK VISA</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[8px] font-mono uppercase bg-gold-400/10 text-gold-400 border border-gold-500/20">
                  Standard Visitor
                </span>
              </div>
              <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-6">
                "Standard Visitor, Student, Skilled Worker & more"
              </p>
              <div className="space-y-2 mb-6 text-[11px] text-stone-500">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold-500/60" />
                  <span>Online entry credentials check list</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold-500/60" />
                  <span>VFS service appointments & biometrics</span>
                </div>
              </div>
            </div>
            <a
              href={EMBASSY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono tracking-widest uppercase text-gold-400 hover:text-gold-300 flex items-center space-x-1 transition-colors group-hover:translate-x-1"
            >
              <span>Learn More →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
