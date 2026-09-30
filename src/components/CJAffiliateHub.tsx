import { useState, useEffect } from 'react';
import { 
  Zap, Copy, Check, ExternalLink, RefreshCw, 
  BarChart3, DollarSign, MousePointer, Shield, Sparkles, User, ArrowRight
} from 'lucide-react';
import { Subscriber, CJCampaign } from '../types/saas';

interface CJAffiliateHubProps {
  onGoToPricing: () => void;
  onGoToAdmin: () => void;
}

export default function CJAffiliateHub({ onGoToPricing, onGoToAdmin }: CJAffiliateHubProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [selectedSubscriberId, setSelectedSubscriberId] = useState<string>('');
  const [campaigns, setCampaigns] = useState<CJCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Link Generator State
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');
  const [customDestination, setCustomDestination] = useState<string>('');
  const [customSubId, setCustomSubId] = useState<string>('lumiere_campaign');
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [trackFeedback, setTrackFeedback] = useState<string | null>(null);

  // Fetch subscribers and campaigns
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [subRes, campRes] = await Promise.all([
        fetch('/api/subscribers'),
        fetch('/api/cj/campaigns')
      ]);
      const subData = await subRes.json();
      const campData = await campRes.json();

      if (subData.success && subData.subscribers.length > 0) {
        setSubscribers(subData.subscribers);
        if (!selectedSubscriberId) {
          setSelectedSubscriberId(subData.subscribers[0].id);
        }
      }

      if (campData.success && campData.campaigns.length > 0) {
        setCampaigns(campData.campaigns);
        if (!selectedCampaignId) {
          setSelectedCampaignId(campData.campaigns[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching affiliate hub data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeSubscriber = subscribers.find(s => s.id === selectedSubscriberId) || subscribers[0];
  const activeCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  // Update generated link whenever params change
  useEffect(() => {
    if (!activeSubscriber) return;
    const pid = activeSubscriber.cjPublisherId || 'CJ-PUB-000000';
    const sid = customSubId.trim() || activeSubscriber.defaultSubId || 'lumiere';
    const dest = customDestination.trim() || activeCampaign?.destinationUrl || 'https://lumierevoyage.com';
    
    // Standard CJ Affiliate Deep Link format
    const link = `https://www.anrdoezrs.net/links/${pid}/type/dlg/sid/${encodeURIComponent(sid)}/${encodeURIComponent(dest)}`;
    setGeneratedLink(link);
  }, [activeSubscriber, activeCampaign, customSubId, customDestination]);

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Simulate click tracking & update DB
  const handleSimulateClick = async () => {
    if (!activeSubscriber) return;
    try {
      const res = await fetch('/api/cj/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publisherId: activeSubscriber.cjPublisherId,
          campaignId: activeCampaign?.id || 'CJ-CAMP-1',
          subId: customSubId
        })
      });
      const data = await res.json();
      if (data.success) {
        setTrackFeedback(`Tracked click for ${activeSubscriber.fullName}! Database updated.`);
        setTimeout(() => setTrackFeedback(null), 3500);
        // Refresh subscriber counts
        fetchData();
      }
    } catch (err) {
      console.error('Track click error:', err);
    }
  };

  return (
    <div className="bg-stone-950 text-stone-200 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-stone-900/80 border border-gold-500/25 p-4 rounded-lg backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gold-500/10 rounded-md border border-gold-500/30 text-gold-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-gold-100">
                CJ Affiliate Publisher Workspace
              </h1>
              <p className="text-[11px] text-stone-400 font-mono">
                Real-Time Deep Linking, SubID Tagging & Commission Tracking
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onGoToPricing}
              className="px-3.5 py-1.5 bg-stone-850 hover:bg-stone-800 text-stone-300 text-xs font-mono rounded border border-stone-700 transition-colors cursor-pointer"
            >
              Subscription Plans
            </button>
            <button
              onClick={onGoToAdmin}
              className="px-3.5 py-1.5 bg-gold-500 hover:bg-gold-400 text-stone-950 text-xs font-mono font-bold rounded transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Backend</span>
            </button>
          </div>
        </div>

        {/* Publisher Identity Selector */}
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gold-400" />
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">
                  Logged In Publisher Account
                </span>
                <span className="font-serif text-base font-bold text-gold-200">
                  {activeSubscriber ? `${activeSubscriber.fullName} (${activeSubscriber.companyName})` : 'Loading...'}
                </span>
              </div>
            </div>

            {/* Switch user dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-stone-400">Switch Publisher:</span>
              <select
                value={selectedSubscriberId}
                onChange={(e) => setSelectedSubscriberId(e.target.value)}
                className="bg-stone-950 border border-gold-500/40 text-gold-300 text-xs font-mono rounded px-3 py-1.5 outline-none cursor-pointer"
              >
                {subscribers.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.fullName} — {sub.tier} ({sub.cjPublisherId})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Metrics Bar for Active Publisher */}
          {activeSubscriber && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-stone-800">
              <div className="bg-stone-950 p-3.5 rounded border border-stone-850">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">CJ Publisher ID (PID)</span>
                <span className="font-mono text-sm font-bold text-emerald-400 mt-1 block">
                  {activeSubscriber.cjPublisherId}
                </span>
              </div>

              <div className="bg-stone-950 p-3.5 rounded border border-stone-850">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Commission Split</span>
                <span className="font-mono text-sm font-bold text-gold-400 mt-1 block">
                  {activeSubscriber.commissionSplit}% per booking
                </span>
              </div>

              <div className="bg-stone-950 p-3.5 rounded border border-stone-850">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Tracked Clicks</span>
                <span className="font-mono text-sm font-bold text-stone-200 mt-1 block">
                  {activeSubscriber.clicksGenerated.toLocaleString()} clicks
                </span>
              </div>

              <div className="bg-stone-950 p-3.5 rounded border border-stone-850">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Total Net Commission</span>
                <span className="font-mono text-sm font-bold text-gold-300 mt-1 block">
                  ${activeSubscriber.totalEarnings.toLocaleString()} USD
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Link Generator Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Generator Controls */}
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 p-6 rounded-xl space-y-5">
            <div className="border-b border-stone-800 pb-4">
              <span className="font-mono text-[10px] text-gold-500 uppercase tracking-widest block">
                ✦ CJ Affiliate Deep Link Engine ✦
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#fbf7ed] mt-1">
                Generate Custom Tracking Link
              </h2>
              <p className="text-stone-400 text-xs font-light mt-1">
                Embed your authenticated CJ Publisher ID and SubID parameter to attribute high-ticket luxury commissions.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1.5">
                1. Select Premier CJ Luxury Advertiser
              </label>
              <select
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 focus:border-gold-500 outline-none"
              >
                {campaigns.map((camp) => (
                  <option key={camp.id} value={camp.id}>
                    {camp.advertiserName} — {camp.commissionRate} (Avg: {camp.avgBookingValue})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1.5">
                2. Custom Campaign SubID (SID) Tag
              </label>
              <input
                type="text"
                value={customSubId}
                onChange={(e) => setCustomSubId(e.target.value)}
                placeholder="e.g. instagram_bio, paris_jet_post, vip_newsletter"
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 font-mono focus:border-gold-500 outline-none"
              />
              <span className="text-[10px] text-stone-500 font-mono mt-1 block">
                Use distinct SubIDs to track conversions from different channels (Instagram, TikTok, Newsletter).
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1.5">
                3. Optional Deep Link Destination Override
              </label>
              <input
                type="url"
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                placeholder={activeCampaign?.destinationUrl || 'https://www.ritzcarlton.com'}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2.5 text-xs text-stone-100 font-mono focus:border-gold-500 outline-none"
              />
            </div>

            {/* Generated Link Display Box */}
            <div className="bg-stone-950 p-4 rounded border border-gold-500/30 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-mono text-gold-400 font-bold uppercase tracking-wider">
                  Active CJ Tracking Link
                </span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  Ready to Publish
                </span>
              </div>

              <div className="bg-stone-900 p-2.5 rounded border border-stone-800 break-all font-mono text-[11px] text-gold-200">
                {generatedLink}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2.5 bg-gold-500 hover:bg-gold-400 text-stone-950 font-serif text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy CJ Affiliate Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSimulateClick}
                  className="px-4 py-2.5 bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700 hover:border-gold-500 text-xs font-mono rounded transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <MousePointer className="w-3.5 h-3.5 text-gold-400" />
                  <span>Test Click Attribution</span>
                </button>
              </div>

              {trackFeedback && (
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/40 rounded text-[11px] text-emerald-300 font-mono flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{trackFeedback}</span>
                </div>
              )}
            </div>
          </div>

          {/* Advertiser Card Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl space-y-4">
              <span className="font-mono text-[10px] text-gold-500 uppercase tracking-widest block">
                ✦ Partner Intelligence ✦
              </span>

              <h3 className="font-serif text-xl font-bold text-gold-100">
                {activeCampaign?.advertiserName}
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-400">Category:</span>
                  <span className="text-stone-200">{activeCampaign?.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-400">Publisher Commission:</span>
                  <span className="text-emerald-400 font-bold">{activeCampaign?.commissionRate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-400">Average Order Value (AOV):</span>
                  <span className="text-gold-300 font-bold">{activeCampaign?.avgBookingValue}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-400">3-Month Network EPC:</span>
                  <span className="text-stone-200">{activeCampaign?.epc}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-400">Cookie Window:</span>
                  <span className="text-stone-200">60 Days (First-Party)</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={activeCampaign?.destinationUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full py-2.5 bg-stone-950 hover:bg-stone-850 text-gold-400 border border-gold-500/30 rounded text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Visit Advertiser Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-stone-900/50 border border-gold-500/20 p-5 rounded-xl space-y-2 text-xs">
              <span className="font-mono text-gold-400 font-bold uppercase tracking-wider block">
                Best Practice for High Conversions:
              </span>
              <p className="text-stone-400 font-light leading-relaxed">
                When sharing private jet charters and luxury suites, deep-link directly to specific fleet models or seasonal villa suites rather than general homepages to boost conversion by 3.2x.
              </p>
            </div>
          </div>

        </div>

        {/* Full Directory of CJ Affiliate Campaigns */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="font-mono text-[10px] text-gold-500 uppercase tracking-widest block">
                ✦ Available Advertisers ✦
              </span>
              <h3 className="font-serif text-2xl font-bold text-gold-100 mt-1">
                Lumière CJ Luxury Network Directory
              </h3>
            </div>
            <button
              onClick={fetchData}
              className="p-2 text-stone-400 hover:text-gold-400 transition-colors"
              title="Refresh Campaigns"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className={`bg-stone-950 border p-5 rounded-lg flex flex-col justify-between transition-all ${
                  selectedCampaignId === camp.id
                    ? 'border-gold-500 shadow-md shadow-gold-950/30'
                    : 'border-stone-800 hover:border-gold-500/40'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-mono text-[10px] bg-gold-500/10 text-gold-400 px-2 py-0.5 rounded border border-gold-500/20">
                      {camp.logoBadge}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {camp.status}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#fbf7ed] mb-1">
                    {camp.advertiserName}
                  </h4>
                  <p className="text-stone-400 text-xs mb-4">{camp.category}</p>

                  <div className="space-y-1.5 font-mono text-xs mb-5">
                    <div className="flex justify-between text-stone-400">
                      <span>Rate:</span>
                      <span className="text-gold-300 font-bold">{camp.commissionRate}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>AOV:</span>
                      <span className="text-stone-200">{camp.avgBookingValue}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>EPC:</span>
                      <span className="text-stone-200">{camp.epc}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCampaignId(camp.id);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="w-full py-2 bg-stone-900 hover:bg-gold-500 hover:text-stone-950 text-gold-300 text-xs font-serif uppercase tracking-wider rounded border border-stone-800 hover:border-gold-500 transition-colors cursor-pointer"
                >
                  Generate Link for this Partner
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
