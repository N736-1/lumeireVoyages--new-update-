/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripPlanner from './components/TripPlanner';
import DestinationGrid from './components/DestinationGrid';
import Packages from './components/Packages';
import MapsSection from './components/MapsSection';
import VisaSection from './components/VisaSection';
import Dashboard from './components/Dashboard';
import Testimonials from './components/Testimonials';
import BrandBanner from './components/BrandBanner';
import SaaSLandingPage from './components/SaaSLandingPage';
import CJAffiliateHub from './components/CJAffiliateHub';
import AdminBackend from './components/AdminBackend';
import AuthLandingPage from './components/AuthLandingPage';
import Footer from './components/Footer';
import { ItineraryPlan } from './types';
import { Subscriber, AuthUser } from './types/saas';

export default function App() {
  const [currentView, setCurrentView] = useState<'portal' | 'saas' | 'affiliate-hub' | 'admin' | 'auth'>('portal');
  
  // Persistent active logged-in user state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('lumiere_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleSetCurrentUser = (user: AuthUser | null) => {
    setCurrentUser(user);
    try {
      if (user) {
        localStorage.setItem('lumiere_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('lumiere_auth_user');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignOut = () => {
    handleSetCurrentUser(null);
    setCurrentView('portal');
  };

  // refresh trigger tag keeps dashboard listings perfectly synchronized in real-time
  const [refreshTag, setRefreshTag] = useState(0);

  const incrementRefresh = () => {
    setRefreshTag((prev) => prev + 1);
  };

  // Scrolls client smoothly to specific anchors
  const triggerScrollTo = (sectionId: string) => {
    if (currentView !== 'portal') {
      setCurrentView('portal');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenDashboard = () => {
    triggerScrollTo('bookings-dashboard');
  };

  const handleSelectDestination = (destName: string) => {
    triggerScrollTo('ai-planner');
    const customInput = document.querySelector('input[placeholder*="Type custom destination"]') as HTMLInputElement;
    if (customInput) {
      customInput.value = destName;
      const event = new Event('input', { bubbles: true });
      customInput.dispatchEvent(event);
    }
  };

  const handleSelectSavedPlan = (plan: ItineraryPlan) => {
    triggerScrollTo('ai-planner');
    console.log('Recalled Plan:', plan);
  };

  const handleNewSubscriberJoined = (sub: Subscriber) => {
    console.log('New subscriber registered:', sub);
    incrementRefresh();
  };

  return (
    <div id="main-root-frame" className="bg-stone-950 min-h-screen text-stone-200 selection:bg-gold-500 selection:text-stone-950 font-sans antialiased custom-scrollbar overflow-x-hidden">
      {/* Global Navigation Bar */}
      <Navbar 
        onNavClick={triggerScrollTo} 
        onOpenDashboard={handleOpenDashboard}
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main View Router */}
      {currentView === 'auth' && (
        <AuthLandingPage 
          onAuthSuccess={(user) => {
            handleSetCurrentUser(user);
            incrementRefresh();
            if (user.role === 'admin') {
              setCurrentView('admin');
            } else if (user.role === 'creator') {
              setCurrentView('affiliate-hub');
            } else {
              setCurrentView('portal');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'saas' && (
        <SaaSLandingPage 
          onSubscriptionSuccess={handleNewSubscriberJoined}
          onGoToAffiliateHub={() => {
            setCurrentView('affiliate-hub');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoToAdmin={() => {
            setCurrentView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'affiliate-hub' && (
        <CJAffiliateHub 
          onGoToPricing={() => {
            setCurrentView('saas');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoToAdmin={() => {
            setCurrentView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'admin' && (
        <AdminBackend 
          onGoToPricing={() => {
            setCurrentView('saas');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onGoToAffiliateHub={() => {
            setCurrentView('affiliate-hub');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'portal' && (
        <>
          {currentUser && (
            <div className="bg-stone-900/90 border-b border-gold-500/20 py-2 px-4 sticky top-16 z-30 backdrop-blur-md">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-serif text-gold-200">
                    Active Member: <strong className="text-gold-300">{currentUser.fullName}</strong>
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                    {currentUser.tier || 'Haute Member'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 font-mono text-[11px]">
                  {currentUser.role === 'creator' && (
                    <button
                      onClick={() => setCurrentView('affiliate-hub')}
                      className="text-gold-400 hover:underline cursor-pointer"
                    >
                      ✦ Open Affiliate Hub
                    </button>
                  )}
                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => setCurrentView('admin')}
                      className="text-emerald-400 hover:underline cursor-pointer"
                    >
                      ✦ Master Admin
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Panoramic Hero Screen */}
          <Hero 
            onCTA1={() => triggerScrollTo('ai-planner')}
            onCTA2={() => triggerScrollTo('destinations')}
          />

          {/* Featured Destination Matrix Grid */}
          <DestinationGrid 
            onSelectDestination={handleSelectDestination} 
          />

          {/* AI Powered Core Voyage Builder */}
          <TripPlanner 
            onItinerarySaved={incrementRefresh}
            onNewBookingAdded={incrementRefresh}
          />

          {/* Signature Holiday Suites & Packages */}
          <Packages 
            onBookingSuccess={incrementRefresh} 
          />

          {/* Luxury Private Fleet & Brand Banner Showcase */}
          <BrandBanner 
            onPlanTrip={() => triggerScrollTo('ai-planner')}
            onExplorePackages={() => {
              setCurrentView('saas');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Embedded Interactive Google Map */}
          <MapsSection />

          {/* Dedicated Diplomatic Visa Advisory Block */}
          <VisaSection />

          {/* Booking & Saved Timelines CRM Dashboard */}
          <Dashboard 
            refreshTrigger={refreshTag} 
            onSelectSavedPlan={handleSelectSavedPlan} 
          />

          {/* Global Testimonials Slides */}
          <Testimonials />
        </>
      )}

      {/* Multi-Column Footer with Subscribe Panel */}
      <Footer 
        onNavClick={triggerScrollTo} 
      />
    </div>
  );
}
