import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Mail, User, Shield, Sparkles, Check, Eye, EyeOff, 
  ArrowRight, Key, Plane, Compass, Building, CheckCircle2, AlertCircle
} from 'lucide-react';
import { AuthUser, Subscriber } from '../types/saas';

interface AuthLandingPageProps {
  onAuthSuccess: (user: AuthUser) => void;
  onNavigate: (view: 'portal' | 'saas' | 'affiliate-hub' | 'admin') => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthLandingPage({ 
  onAuthSuccess, 
  onNavigate, 
  initialMode = 'signup' 
}: AuthLandingPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [accountType, setAccountType] = useState<'traveler' | 'creator' | 'agency'>('creator');
  const [tier, setTier] = useState<'Creator' | 'Haute Pro' | 'Enterprise Syndicate'>('Haute Pro');
  const [rememberMe, setRememberMe] = useState(true);

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setErrorMsg(null);

    if (mode === 'signup') {
      if (!fullName.trim() || !email.trim() || !password.trim()) {
        setErrorMsg('Please fill in your name, email, and password.');
        return;
      }

      setIsSubmitting(true);
      try {
        // Register new subscriber / user into the backend
        const res = await fetch('/api/subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            companyName: companyName.trim() || `${fullName} Private Travel`,
            tier,
            travelNiche: accountType === 'creator' 
              ? 'Private Aviation & Luxury Palaces' 
              : 'Ultra-Luxury Global Itineraries'
          })
        });

        const data = await res.json();
        if (data.success && data.subscriber) {
          const authUser: AuthUser = {
            id: data.subscriber.id,
            fullName: data.subscriber.fullName,
            email: data.subscriber.email,
            role: accountType === 'creator' ? 'creator' : 'member',
            tier: data.subscriber.tier,
            companyName: data.subscriber.companyName,
            cjPublisherId: data.subscriber.cjPublisherId,
            joinedAt: data.subscriber.joinedAt
          };

          setSuccessMsg(`Welcome to Lumière Voyage, ${authUser.fullName}! Your membership is active.`);
          setTimeout(() => {
            onAuthSuccess(authUser);
          }, 1200);
        } else {
          setErrorMsg(data.message || 'Account registration could not be completed.');
        }
      } catch (err: any) {
        setErrorMsg('Network error. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Sign In Flow
      if (!email.trim() || !password.trim()) {
        setErrorMsg('Please enter your email and password.');
        return;
      }

      setIsSubmitting(true);
      try {
        // Lookup existing subscriber in database
        const res = await fetch('/api/subscribers');
        const data = await res.json();
        const existing = data.subscribers?.find(
          (s: Subscriber) => s.email.toLowerCase() === email.trim().toLowerCase() || s.cjPublisherId === email.trim()
        );

        if (existing) {
          const authUser: AuthUser = {
            id: existing.id,
            fullName: existing.fullName,
            email: existing.email,
            role: existing.tier === 'Enterprise Syndicate' ? 'admin' : 'creator',
            tier: existing.tier,
            companyName: existing.companyName,
            cjPublisherId: existing.cjPublisherId,
            joinedAt: existing.joinedAt
          };

          setSuccessMsg(`Welcome back, ${authUser.fullName}. Access granted.`);
          setTimeout(() => {
            onAuthSuccess(authUser);
          }, 1000);
        } else {
          // Allow instant member login for new credentials in demo
          const authUser: AuthUser = {
            id: `MEM-${Math.floor(1000 + Math.random() * 9000)}`,
            fullName: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Distinguished Member',
            email: email.trim().toLowerCase(),
            role: 'member',
            tier: 'Haute Member',
            companyName: 'Private Luxury Client',
            joinedAt: new Date().toISOString()
          };

          setSuccessMsg(`Authenticated as ${authUser.fullName}. Loading your concierge...`);
          setTimeout(() => {
            onAuthSuccess(authUser);
          }, 1000);
        }
      } catch (err) {
        setErrorMsg('Sign in failed. Please verify your credentials.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Quick Demo Login Handler
  const handleQuickDemoLogin = (demoType: 'julian' | 'elena' | 'admin') => {
    if (demoType === 'julian') {
      const user: AuthUser = {
        id: 'SUB-101',
        fullName: 'Julian Vance',
        email: 'julian.vance@vancemedia.co.uk',
        role: 'creator',
        tier: 'Haute Pro',
        companyName: 'Vance Luxury Media Group',
        cjPublisherId: 'CJ-PUB-992104'
      };
      setSuccessMsg('Signing in as Lord Julian Vance (Haute Pro Creator)...');
      setTimeout(() => onAuthSuccess(user), 800);
    } else if (demoType === 'elena') {
      const user: AuthUser = {
        id: 'SUB-102',
        fullName: 'Elena Rostova',
        email: 'elena@rivierajetclub.mc',
        role: 'creator',
        tier: 'Enterprise Syndicate',
        companyName: 'Riviera Jet & Yacht Syndicate',
        cjPublisherId: 'CJ-PUB-448219'
      };
      setSuccessMsg('Signing in as Elena Rostova (Enterprise Syndicate)...');
      setTimeout(() => onAuthSuccess(user), 800);
    } else {
      const user: AuthUser = {
        id: 'ADMIN-01',
        fullName: 'Lumière Master Concierge',
        email: 'admin@lumierevoyage.com',
        role: 'admin',
        tier: 'Master Administrator',
        companyName: 'Lumière International Head Office'
      };
      setSuccessMsg('Signing in with Master Admin Privileges...');
      setTimeout(() => onAuthSuccess(user), 800);
    }
  };

  return (
    <div className="bg-stone-950 text-stone-200 min-h-screen pt-20 pb-16 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        
        {/* Main Split Grid Card */}
        <div className="bg-stone-900 border border-gold-500/30 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT COLUMN: Panoramic Banner & Brand Showcase */}
          <div className="lg:col-span-6 relative overflow-hidden min-h-[420px] lg:min-h-[720px] flex flex-col justify-between p-8 sm:p-12 text-[#fbf7ed]">
            
            {/* Background Image: The uploaded luxury banner */}
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/lumiere_auth_banner_1790752636525.jpg"
                alt="Lumière Voyage Private Jet Banner"
                className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
                referrerPolicy="no-referrer"
              />
              {/* Opulent gradient overlays for pristine typography contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/80" />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/40" />
            </div>

            {/* Top Brand Crest & Tagline */}
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full border border-gold-400 bg-stone-950/80 p-0.5 shadow-xl shadow-black">
                  <img
                    src="/src/assets/images/lumiere_logo_1790751906590.jpg"
                    alt="Lumière Crest"
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold tracking-widest text-[#fbf7ed] block">
                    LUMIÈRE <span className="text-gold-400 text-sm font-sans">VOYAGE</span>
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-gold-400 uppercase">
                    Haute Aviation & Private Charters
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Feature Highlights */}
            <div className="relative z-10 my-auto py-8 max-w-md">
              <div className="inline-flex items-center space-x-2 bg-stone-950/80 border border-gold-500/40 px-3 py-1 rounded-full text-gold-400 font-mono text-[10px] tracking-widest uppercase mb-4 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Elevate Every Journey</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#fbf7ed] leading-tight mb-4 drop-shadow-md">
                Your Portal to High-Ticket Travel & CJ Monetization
              </h2>

              <p className="font-sans text-xs sm:text-sm text-stone-200 font-light leading-relaxed mb-6 drop-shadow">
                Whether commanding bespoke transatlantic Gulfstream flights or scaling six-figure affiliate revenue across premier global luxury travel brands, your voyage begins here.
              </p>

              {/* Bullet perks */}
              <div className="space-y-3 font-sans text-xs text-stone-300">
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Instant access to authenticated CJ deep link generators</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Direct private jet fleet & mega-yacht booking clearance</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Real-time click attribution and high-tier commission tracking</span>
                </div>
              </div>
            </div>

            {/* Bottom Sub-Id & Verification Badge */}
            <div className="relative z-10 pt-4 border-t border-gold-500/20 flex items-center justify-between">
              <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
                Tail Number: N780LV • Terminal Gate VIP-01
              </span>
              <span className="font-mono text-[10px] text-gold-400 font-bold bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/30">
                256-Bit SSL
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Sign In / Sign Up Form */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-stone-900/95 backdrop-blur-md">
            
            <div>
              {/* Mode Toggle Switcher */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-5 mb-6">
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setMode('signup');
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
                    className={`font-serif text-sm uppercase tracking-wider pb-2 transition-all cursor-pointer border-b-2 ${
                      mode === 'signup'
                        ? 'border-gold-500 text-gold-300 font-bold'
                        : 'border-transparent text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Create Account
                  </button>

                  <button
                    onClick={() => {
                      setMode('signin');
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
                    className={`font-serif text-sm uppercase tracking-wider pb-2 transition-all cursor-pointer border-b-2 ${
                      mode === 'signin'
                        ? 'border-gold-500 text-gold-300 font-bold'
                        : 'border-transparent text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Member Sign In
                  </button>
                </div>

                <button
                  onClick={() => onNavigate('portal')}
                  className="text-stone-400 hover:text-gold-400 text-xs font-mono transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span>Explore Site</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Title & subtitle */}
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-gold-100">
                  {mode === 'signup' ? 'Join the Lumière Syndicate' : 'Welcome Back, Luminary'}
                </h3>
                <p className="text-stone-400 text-xs font-light mt-1">
                  {mode === 'signup'
                    ? 'Register your credentials to configure your CJ affiliate tracking and bespoke travel portfolio.'
                    : 'Access your reserved flights, commission balances, and marketing campaigns.'}
                </p>
              </div>

              {/* Feedback Notifications */}
              {errorMsg && (
                <div className="mb-4 p-3 bg-rose-950/80 border border-rose-500/50 rounded text-rose-300 text-xs font-mono flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-500/50 rounded text-emerald-300 text-xs font-mono flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Main Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Lord Alexander Sterling"
                          className="w-full bg-stone-950 border border-stone-800 rounded pl-9 pr-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Account Type Selector */}
                    <div>
                      <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                        Account Purpose
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setAccountType('creator')}
                          className={`py-2 px-2 text-center rounded text-[11px] font-mono border transition-all cursor-pointer ${
                            accountType === 'creator'
                              ? 'border-gold-500 bg-gold-500/10 text-gold-300 font-bold'
                              : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          CJ Affiliate
                        </button>
                        <button
                          type="button"
                          onClick={() => setAccountType('traveler')}
                          className={`py-2 px-2 text-center rounded text-[11px] font-mono border transition-all cursor-pointer ${
                            accountType === 'traveler'
                              ? 'border-gold-500 bg-gold-500/10 text-gold-300 font-bold'
                              : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          VIP Traveler
                        </button>
                        <button
                          type="button"
                          onClick={() => setAccountType('agency')}
                          className={`py-2 px-2 text-center rounded text-[11px] font-mono border transition-all cursor-pointer ${
                            accountType === 'agency'
                              ? 'border-gold-500 bg-gold-500/10 text-gold-300 font-bold'
                              : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Agency Fleet
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                          Company / Brand
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Sterling Luxury Media"
                          className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                          Membership Tier
                        </label>
                        <select
                          value={tier}
                          onChange={(e) => setTier(e.target.value as any)}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none font-mono"
                        >
                          <option value="Creator">Creator ($49/mo)</option>
                          <option value="Haute Pro">Haute Pro ($149/mo)</option>
                          <option value="Enterprise Syndicate">Enterprise ($399/mo)</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Email Input */}
                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    {mode === 'signup' ? 'Work / Creator Email *' : 'Email or CJ Publisher ID *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={mode === 'signup' ? 'alexander@sterlingvoyage.com' : 'julian.vance@vancemedia.co.uk or CJ-PUB-992104'}
                      className="w-full bg-stone-950 border border-stone-800 rounded pl-9 pr-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[11px] font-mono text-stone-300 uppercase">
                      Password *
                    </label>
                    {mode === 'signin' && (
                      <span className="text-[10px] font-mono text-gold-400 hover:underline cursor-pointer">
                        Forgot key?
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-stone-950 border border-stone-800 rounded pl-9 pr-10 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-stone-500 hover:text-stone-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-stone-950 font-serif text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Authenticating with Network...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{mode === 'signup' ? 'Create Account & Launch Workspace' : 'Sign In to Workspace'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* 1-Click Demo Logins for Instant Testing */}
              <div className="mt-6 pt-5 border-t border-stone-800">
                <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest block mb-2 text-center">
                  ✦ Fast 1-Click Demo Testing ✦
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('julian')}
                    className="p-2 bg-stone-950 hover:bg-stone-850 border border-stone-800 hover:border-gold-500/50 rounded text-center transition-all cursor-pointer"
                  >
                    <span className="text-[11px] font-serif font-bold text-gold-300 block">Julian Vance</span>
                    <span className="text-[9px] font-mono text-stone-400">Haute Pro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('elena')}
                    className="p-2 bg-stone-950 hover:bg-stone-850 border border-stone-800 hover:border-gold-500/50 rounded text-center transition-all cursor-pointer"
                  >
                    <span className="text-[11px] font-serif font-bold text-gold-300 block">Elena Rostova</span>
                    <span className="text-[9px] font-mono text-stone-400">Enterprise</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="p-2 bg-stone-950 hover:bg-stone-850 border border-stone-800 hover:border-gold-500/50 rounded text-center transition-all cursor-pointer"
                  >
                    <span className="text-[11px] font-serif font-bold text-emerald-400 block">Concierge</span>
                    <span className="text-[9px] font-mono text-stone-400">Admin Panel</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-6 pt-4 border-t border-stone-850 text-center text-[11px] text-stone-500">
              By accessing Lumière Voyage, you agree to our Private Aviation & CJ Affiliate Terms of Service.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
