import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, Sparkles, Shield, ArrowRight, X, Lock, 
  CreditCard, Globe, Compass, ExternalLink, Zap
} from 'lucide-react';
import { Subscriber } from '../types/saas';

interface SaaSLandingPageProps {
  onSubscriptionSuccess: (subscriber: Subscriber) => void;
  onGoToAffiliateHub: () => void;
  onGoToAdmin: () => void;
}

export default function SaaSLandingPage({ 
  onSubscriptionSuccess, 
  onGoToAffiliateHub, 
  onGoToAdmin 
}: SaaSLandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlan, setSelectedPlan] = useState<'Creator' | 'Haute Pro' | 'Enterprise Syndicate'>('Haute Pro');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<Subscriber | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    website: '',
    travelNiche: 'Private Aviation & Luxury Palaces',
    customCjPublisherId: '',
    defaultSubId: '',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const handleOpenSubscribe = (tier: 'Creator' | 'Haute Pro' | 'Enterprise Syndicate') => {
    setSelectedPlan(tier);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          companyName: formData.companyName,
          website: formData.website,
          tier: selectedPlan,
          billingCycle,
          travelNiche: formData.travelNiche,
          customCjPublisherId: formData.customCjPublisherId,
          defaultSubId: formData.defaultSubId
        })
      });

      const data = await res.json();
      if (data.success && data.subscriber) {
        setRegisteredUser(data.subscriber);
        onSubscriptionSuccess(data.subscriber);
      }
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-950 text-stone-200 min-h-screen pt-24 pb-20">
      
      {/* Top Banner Navigation Pill */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-900/90 border border-gold-500/30 p-4 rounded-lg shadow-xl backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="font-serif text-sm font-semibold tracking-wider text-gold-200">
              LUMIÈRE VOYAGE CJ AFFILIATE SAAS
            </span>
            <span className="hidden sm:inline-block bg-gold-500/10 text-gold-400 text-[10px] font-mono px-2 py-0.5 rounded border border-gold-500/25">
              Live Network
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <button
              onClick={onGoToAffiliateHub}
              className="px-3.5 py-1.5 bg-stone-850 hover:bg-stone-800 text-gold-300 rounded border border-stone-700 hover:border-gold-500/50 transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-gold-400" />
              <span>Affiliate Hub</span>
            </button>
            <button
              onClick={onGoToAdmin}
              className="px-3.5 py-1.5 bg-gold-500 hover:bg-gold-400 text-stone-950 font-bold rounded transition-colors cursor-pointer flex items-center space-x-1.5 shadow"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Backend</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 border-b border-stone-900">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 rounded-full mb-6 text-gold-400 font-mono text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CJ Affiliate Luxury Travel Network</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fbf7ed] mb-6 leading-tight">
              Monetize High-Ticket Luxury Travel with <span className="text-gold-400">CJ Affiliate</span>
            </h1>

            <p className="font-sans text-base sm:text-xl text-stone-300 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
              The premier turnkey SaaS for luxury creators, private concierges, and travel media agencies. Plug into top-tier CJ Affiliate campaigns with automated tracking, custom sub-IDs, and up to 15% revenue share.
            </p>

            {/* Quick stats ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <div className="bg-stone-900/60 border border-gold-500/20 p-4 rounded text-center">
                <div className="font-mono text-2xl font-bold text-gold-400">$35,000+</div>
                <div className="text-[11px] text-stone-400 font-serif tracking-wider uppercase mt-1">Average Order Value</div>
              </div>
              <div className="bg-stone-900/60 border border-gold-500/20 p-4 rounded text-center">
                <div className="font-mono text-2xl font-bold text-gold-400">Up to 15%</div>
                <div className="text-[11px] text-stone-400 font-serif tracking-wider uppercase mt-1">Affiliate Commission</div>
              </div>
              <div className="bg-stone-900/60 border border-gold-500/20 p-4 rounded text-center">
                <div className="font-mono text-2xl font-bold text-gold-400">$1,200</div>
                <div className="text-[11px] text-stone-400 font-serif tracking-wider uppercase mt-1">Jet Charter Bounty</div>
              </div>
              <div className="bg-stone-900/60 border border-gold-500/20 p-4 rounded text-center">
                <div className="font-mono text-2xl font-bold text-gold-400">Instant</div>
                <div className="text-[11px] text-stone-400 font-serif tracking-wider uppercase mt-1">CJ Pre-Approval</div>
              </div>
            </div>

            {/* Billing toggle */}
            <div className="inline-flex items-center space-x-3 bg-stone-900 border border-stone-800 p-1.5 rounded-full">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-serif uppercase tracking-widest transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-gold-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-xs font-serif uppercase tracking-widest transition-all cursor-pointer flex items-center space-x-2 ${
                  billingCycle === 'annual'
                    ? 'bg-gold-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-emerald-500 text-stone-950 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  SAVE 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold-100 mb-3">
            Select Your Membership Tier
          </h2>
          <p className="text-stone-400 text-sm max-w-xl mx-auto font-light">
            Every plan includes immediate CJ Publisher link generation, branded client portals, and real-time commission tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tier 1: Creator */}
          <div className="bg-stone-900/60 border border-stone-800 hover:border-gold-500/40 rounded-xl p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-serif text-xl font-bold text-[#fbf7ed]">Creator</span>
                <span className="text-[11px] font-mono text-stone-400 bg-stone-950 px-2.5 py-1 rounded border border-stone-800">
                  Solo Affiliates
                </span>
              </div>
              <p className="text-stone-400 text-xs mb-6 font-light">
                Ideal for luxury travel bloggers, Instagram creators, and boutique content publishers.
              </p>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="font-mono text-4xl font-bold text-gold-400">
                  ${billingCycle === 'annual' ? '39' : '49'}
                </span>
                <span className="text-xs text-stone-400 font-mono">/ month</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs text-stone-300">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Up to 15,000 tracked clicks / month</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span><strong>8% Revenue Share</strong> on all verified CJ bookings</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Dynamic CJ deep link generator</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>SubID campaign tagging</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Standard 48-hour email support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenSubscribe('Creator')}
              className="w-full py-3.5 bg-stone-850 hover:bg-gold-500 hover:text-stone-950 text-gold-300 font-serif text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer border border-stone-700 hover:border-gold-500"
            >
              Start Creator Membership
            </button>
          </div>

          {/* Tier 2: Haute Pro (Featured) */}
          <div className="relative bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border-2 border-gold-500 rounded-xl p-8 flex flex-col justify-between shadow-2xl shadow-gold-950/40">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-500 text-stone-950 text-[10px] font-mono uppercase tracking-widest px-3.5 py-1 rounded-full font-bold shadow-md">
              ✦ MOST POPULAR ✦
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 mt-2">
                <span className="font-serif text-xl font-bold text-gold-300">Haute Pro</span>
                <span className="text-[11px] font-mono text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded border border-gold-500/30">
                  Top Producers
                </span>
              </div>
              <p className="text-stone-300 text-xs mb-6 font-light">
                Tailored for serious luxury travel affiliates, VIP concierge advisors, and editorial publishers.
              </p>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="font-mono text-4xl font-bold text-gold-400">
                  ${billingCycle === 'annual' ? '119' : '149'}
                </span>
                <span className="text-xs text-stone-400 font-mono">/ month</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs text-stone-200">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span><strong>Unlimited</strong> tracked clicks & conversions</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span><strong>12% Revenue Share</strong> on all verified CJ bookings</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Priority approval to NetJets & Ritz-Carlton</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Automated client itinerary link embedding</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Dedicated VIP Telegram / Slack channel</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenSubscribe('Haute Pro')}
              className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-stone-950 font-serif text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer shadow-lg hover:shadow-gold-500/25 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Subscribe to Haute Pro</span>
            </button>
          </div>

          {/* Tier 3: Enterprise Syndicate */}
          <div className="bg-stone-900/60 border border-stone-800 hover:border-gold-500/40 rounded-xl p-8 flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-serif text-xl font-bold text-[#fbf7ed]">Enterprise Syndicate</span>
                <span className="text-[11px] font-mono text-stone-400 bg-stone-950 px-2.5 py-1 rounded border border-stone-800">
                  Agencies & Fleets
                </span>
              </div>
              <p className="text-stone-400 text-xs mb-6 font-light">
                Complete white-label solution for jet charter brokers, luxury agencies, and family offices.
              </p>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="font-mono text-4xl font-bold text-gold-400">
                  ${billingCycle === 'annual' ? '319' : '399'}
                </span>
                <span className="text-xs text-stone-400 font-mono">/ month</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs text-stone-300">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span><strong>15% Maximum Revenue Split</strong> override</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>White-label branded client itinerary domain</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Multi-seat account access (Up to 10 agents)</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>REST API & Webhook data stream</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>1-on-1 Dedicated Account Executive</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenSubscribe('Enterprise Syndicate')}
              className="w-full py-3.5 bg-stone-850 hover:bg-gold-500 hover:text-stone-950 text-gold-300 font-serif text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer border border-stone-700 hover:border-gold-500"
            >
              Deploy Enterprise Syndicate
            </button>
          </div>

        </div>
      </section>

      {/* Subscription & Account Creation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-stone-900 border border-gold-500/40 rounded-xl shadow-2xl p-6 sm:p-8 my-8 text-stone-200"
            >
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setRegisteredUser(null);
                }}
                className="absolute top-5 right-5 text-stone-400 hover:text-gold-400 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!registeredUser ? (
                /* Registration & Checkout Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-stone-800 pb-4">
                    <span className="font-mono text-[10px] text-gold-500 uppercase tracking-widest block">
                      ✦ New Subscriber Onboarding ✦
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-gold-100 mt-1">
                      Activate Your {selectedPlan} Membership
                    </h3>
                    <p className="text-stone-400 text-xs font-light mt-1">
                      Billed {billingCycle === 'annual' ? 'Annually with 20% discount' : 'Monthly'}. Instant access to the CJ Affiliate Hub.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Lord Alexander Sterling"
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                        Work / Creator Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alexander@sterlingluxury.com"
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                        Company / Agency Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Sterling Haute Media Ltd"
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                        Website or Instagram URL
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://instagram.com/sterling_luxury"
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                        Primary Travel Niche
                      </label>
                      <select
                        value={formData.travelNiche}
                        onChange={(e) => setFormData({ ...formData, travelNiche: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none"
                      >
                        <option value="Private Aviation & Luxury Palaces">Private Aviation & Luxury Palaces</option>
                        <option value="Monaco & Mediterranean Mega-Yachts">Monaco & Mediterranean Mega-Yachts</option>
                        <option value="5-Star Island Resorts & Overwater Villas">5-Star Island Resorts & Overwater Villas</option>
                        <option value="Exotic Safari & Alpine Chalets">Exotic Safari & Alpine Chalets</option>
                        <option value="Michelin Gastronomy & Wine Estates">Michelin Gastronomy & Wine Estates</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                        Existing CJ Publisher ID <span className="text-stone-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.customCjPublisherId}
                        onChange={(e) => setFormData({ ...formData, customCjPublisherId: e.target.value })}
                        placeholder="Leave blank to auto-generate"
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Payment Details Section */}
                  <div className="bg-stone-950 p-4 rounded border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gold-400 flex items-center space-x-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Secure 256-Bit Encrypted Subscription</span>
                      </span>
                      <CreditCard className="w-4 h-4 text-stone-400" />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <input
                          type="text"
                          readOnly
                          value={formData.cardNumber}
                          className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs font-mono text-stone-300"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          readOnly
                          value={`${formData.cardExp} - ${formData.cardCvc}`}
                          className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs font-mono text-stone-300 text-center"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-stone-500">
                      Demo billing environment. No real funds will be charged. Account details will instantly populate in the Admin Backend.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-stone-950 font-serif text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span>Provisioning CJ Publisher Account...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Complete Registration & Launch Workspace</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success Confirmation Receipt */
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="font-mono text-xs text-gold-400 uppercase tracking-widest block mb-1">
                      ✦ Subscription Activated ✦
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#fbf7ed]">
                      Welcome, {registeredUser.fullName}
                    </h3>
                    <p className="text-stone-400 text-xs max-w-md mx-auto mt-2">
                      Your publisher account has been provisioned and synced with the backend management database.
                    </p>
                  </div>

                  {/* Account Summary Box */}
                  <div className="bg-stone-950 p-4 rounded-lg border border-gold-500/30 text-left max-w-md mx-auto space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between border-b border-stone-850 pb-2">
                      <span className="text-stone-400">Account ID:</span>
                      <span className="text-gold-300 font-bold">{registeredUser.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-850 pb-2">
                      <span className="text-stone-400">Assigned CJ Publisher ID:</span>
                      <span className="text-emerald-400 font-bold">{registeredUser.cjPublisherId}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-850 pb-2">
                      <span className="text-stone-400">Membership Tier:</span>
                      <span className="text-gold-400">{registeredUser.tier}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-850 pb-2">
                      <span className="text-stone-400">Commission Share:</span>
                      <span className="text-gold-300">{registeredUser.commissionSplit}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Default Campaign SubID:</span>
                      <span className="text-stone-300">{registeredUser.defaultSubId}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        onGoToAffiliateHub();
                      }}
                      className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-stone-950 font-serif text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer flex items-center justify-center space-x-2 shadow"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Launch CJ Link Generator</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        onGoToAdmin();
                      }}
                      className="px-6 py-3 bg-stone-850 hover:bg-stone-800 text-gold-300 border border-gold-500/40 font-serif text-xs font-semibold uppercase tracking-widest rounded transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Inspect in Admin Backend</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
