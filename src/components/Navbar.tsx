import { useState, useEffect } from 'react';
import { Menu, X, Compass, Globe, User, LogOut, Key, Sparkles } from 'lucide-react';
import { AuthUser } from '../types/saas';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  onOpenDashboard: () => void;
  currentView: 'portal' | 'saas' | 'affiliate-hub' | 'admin' | 'auth';
  onSelectView: (view: 'portal' | 'saas' | 'affiliate-hub' | 'admin' | 'auth') => void;
  currentUser?: AuthUser | null;
  onSignOut?: () => void;
}

export default function Navbar({ 
  onNavClick, 
  onOpenDashboard, 
  currentView, 
  onSelectView,
  currentUser,
  onSignOut
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavClick(id);
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-stone-900/85 backdrop-blur-md border-b border-gold-500/15 py-3 shadow-lg'
            : 'bg-gradient-to-b from-stone-950/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleLinkClick('home')}
            >
              <img
                src="/src/assets/images/lumiere_logo_1790751906590.jpg"
                alt="Lumière Voyage Logo"
                className="w-9 h-9 rounded-full object-cover border border-gold-400/50 group-hover:border-gold-300 group-hover:scale-105 transition-all duration-300 shadow-md shadow-black"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-gold-100 group-hover:text-gold-300 transition-colors duration-300">
                LUMIÈRE <span className="text-gold-500 text-sm font-sans">VOYAGE</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => {
                  onSelectView('portal');
                  handleLinkClick('home');
                }}
                className={`font-sans text-xs tracking-widest uppercase transition-all duration-300 font-medium ${
                  currentView === 'portal' ? 'text-gold-400 font-bold border-b border-gold-500 pb-0.5' : 'text-stone-300 hover:text-gold-400'
                }`}
              >
                Travel Experience
              </button>

              <button
                onClick={() => onSelectView('saas')}
                className={`font-sans text-xs tracking-widest uppercase transition-all duration-300 font-medium ${
                  currentView === 'saas' ? 'text-gold-400 font-bold border-b border-gold-500 pb-0.5' : 'text-stone-300 hover:text-gold-400'
                }`}
              >
                SaaS Pricing & Join
              </button>

              <button
                onClick={() => onSelectView('affiliate-hub')}
                className={`font-sans text-xs tracking-widest uppercase transition-all duration-300 font-medium ${
                  currentView === 'affiliate-hub' ? 'text-gold-400 font-bold border-b border-gold-500 pb-0.5' : 'text-stone-300 hover:text-gold-400'
                }`}
              >
                CJ Affiliate Hub
              </button>

              <button
                onClick={() => onSelectView('admin')}
                className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  currentView === 'admin'
                    ? 'bg-gold-500 text-stone-950 font-bold shadow'
                    : 'bg-stone-900 text-gold-300 border border-gold-500/40 hover:bg-stone-850'
                }`}
              >
                ✦ Admin Portal
              </button>
            </div>

            {/* Right side Auth & Book Travel CTAs */}
            <div className="hidden lg:flex items-center space-x-3">
              {currentUser ? (
                <div className="flex items-center space-x-2 bg-stone-900 border border-gold-500/30 rounded-full px-3 py-1">
                  <div className="w-5 h-5 rounded-full bg-gold-500 text-stone-950 flex items-center justify-center text-[10px] font-bold">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <span className="font-serif text-xs text-gold-200 font-bold max-w-[110px] truncate">
                    {currentUser.fullName}
                  </span>
                  <button
                    onClick={onSignOut}
                    title="Sign Out"
                    className="text-stone-400 hover:text-rose-400 p-0.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onSelectView('auth')}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                    currentView === 'auth'
                      ? 'bg-gold-500 text-stone-950 font-bold shadow'
                      : 'text-stone-300 hover:text-gold-300 border border-stone-700 hover:border-gold-500/50 bg-stone-900/60'
                  }`}
                >
                  <Key className="w-3 h-3 text-gold-400" />
                  <span>Sign In / Join</span>
                </button>
              )}

              <button
                onClick={() => {
                  onSelectView('portal');
                  handleLinkClick('ai-planner');
                }}
                className="px-4 py-2 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-stone-950 text-xs tracking-widest uppercase transition-all duration-500 rounded-sm font-semibold hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] cursor-pointer"
              >
                Book Travel
              </button>
            </div>

            {/* Mobile hamburger menu */}
            <div className="md:hidden">
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-stone-300 hover:text-gold-500 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-in mobile menu drawer */}
      <div
        id="mobile-drawer"
        className={`fixed inset-y-0 right-0 w-80 bg-stone-950 border-l border-gold-500/10 z-55 shadow-2xl transition-transform duration-500 ease-out transform md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full py-6 px-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-6 mb-8">
            <div className="flex items-center space-x-2.5">
              <img
                src="/src/assets/images/lumiere_logo_1790751906590.jpg"
                alt="Lumière Voyage Logo"
                className="w-7 h-7 rounded-full object-cover border border-gold-400/50"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif text-lg font-bold tracking-wider text-gold-300">
                LUMIÈRE VOYAGES
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-stone-400 hover:text-gold-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            {currentUser ? (
              <div className="p-3 bg-stone-900 border border-gold-500/40 rounded-lg flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-gold-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-serif text-xs font-bold text-gold-200">
                      {currentUser.fullName}
                    </div>
                    <div className="text-[10px] font-mono text-stone-400">
                      {currentUser.tier || 'Member'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onSignOut?.();
                  }}
                  className="text-stone-400 hover:text-rose-400 p-1"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSelectView('auth');
                }}
                className="w-full py-2.5 bg-gold-500 text-stone-950 font-serif text-xs tracking-widest uppercase font-bold text-center rounded transition-colors hover:bg-gold-400 flex items-center justify-center space-x-2"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Sign In / Create Account</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onSelectView('portal');
                handleLinkClick('home');
              }}
              className="text-left font-sans text-sm tracking-widest text-stone-200 hover:text-gold-400 uppercase transition-colors py-1 font-semibold"
            >
              ✦ Travel Portal
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onSelectView('saas');
              }}
              className="text-left font-sans text-sm tracking-widest text-gold-300 hover:text-gold-400 uppercase transition-colors py-1 font-semibold"
            >
              ✦ SaaS Pricing & Join
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onSelectView('affiliate-hub');
              }}
              className="text-left font-sans text-sm tracking-widest text-stone-300 hover:text-gold-400 uppercase transition-colors py-1"
            >
              ✦ CJ Affiliate Hub
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onSelectView('admin');
              }}
              className="text-left font-mono text-sm tracking-wider text-emerald-400 hover:text-emerald-300 uppercase transition-colors py-1 font-bold"
            >
              ✦ Admin Management Backend
            </button>

            <div className="border-t border-stone-850 my-2 pt-2">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block mb-2">
                Travel Destinations
              </span>
              {[
                { label: 'Destinations Matrix', id: 'destinations' },
                { label: 'AI Trip Planner', id: 'ai-planner' },
                { label: 'Luxury Packages', id: 'packages' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectView('portal');
                    handleLinkClick(link.id);
                  }}
                  className="text-left font-sans text-xs tracking-wider text-stone-400 hover:text-gold-400 uppercase transition-colors py-1 block"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onSelectView('portal');
                onOpenDashboard();
              }}
              className="text-left font-sans text-xs tracking-widest text-stone-400 hover:text-gold-400 uppercase transition-colors py-1"
            >
              Client Dashboard
            </button>
          </div>

          <div className="mt-auto border-t border-stone-900 pt-6">
            <p className="text-stone-500 text-xs font-mono tracking-wider mb-2">
              Bespoke travel curated by AI.
            </p>
            <p className="text-gold-500/65 text-[10px] font-mono uppercase tracking-widest">
              © 2026 Lumière Voyages
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-stone-950/65 backdrop-blur-xs z-40 md:hidden"
        />
      )}
    </>
  );
}
