import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, DollarSign, Zap, Search, Filter, 
  Edit3, Trash2, Plus, Check, X, RefreshCw, AlertCircle, Save
} from 'lucide-react';
import { Subscriber, CJCampaign } from '../types/saas';

interface AdminBackendProps {
  onGoToPricing: () => void;
  onGoToAffiliateHub: () => void;
}

export default function AdminBackend({ onGoToPricing, onGoToAffiliateHub }: AdminBackendProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<CJCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Active Tab: Subscribers vs Campaigns
  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns'>('subscribers');

  // Edit Subscriber Modal State
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Edit Campaign Modal State
  const [editingCampaign, setEditingCampaign] = useState<CJCampaign | null>(null);

  // Create Subscriber Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newSubData, setNewSubData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    website: '',
    tier: 'Haute Pro' as const,
    travelNiche: 'Private Aviation & Luxury Palaces',
    customCjPublisherId: '',
    defaultSubId: ''
  });

  const fetchBackendData = async () => {
    setIsLoading(true);
    try {
      const [subRes, campRes] = await Promise.all([
        fetch('/api/subscribers'),
        fetch('/api/cj/campaigns')
      ]);
      const subData = await subRes.json();
      const campData = await campRes.json();

      if (subData.success) {
        setSubscribers(subData.subscribers);
      }
      if (campData.success) {
        setCampaigns(campData.campaigns);
      }
    } catch (err) {
      console.error('Admin backend fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  // Handle Edit Submit
  const handleSaveSubscriberEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubscriber) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/subscribers/${editingSubscriber.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSubscriber)
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccessMsg(`Successfully updated ${editingSubscriber.fullName}'s account!`);
        setTimeout(() => {
          setSaveSuccessMsg(null);
          setEditingSubscriber(null);
        }, 1800);
        fetchBackendData();
      }
    } catch (err) {
      console.error('Error saving subscriber:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Subscriber
  const handleDeleteSubscriber = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove subscriber account "${name}"?`)) return;

    try {
      const res = await fetch(`/api/subscribers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchBackendData();
      }
    } catch (err) {
      console.error('Error deleting subscriber:', err);
    }
  };

  // Handle Create New Subscriber
  const handleCreateSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubData.fullName || !newSubData.email) return;

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubData)
      });
      const data = await res.json();
      if (data.success) {
        setIsCreateModalOpen(false);
        setNewSubData({
          fullName: '',
          email: '',
          companyName: '',
          website: '',
          tier: 'Haute Pro',
          travelNiche: 'Private Aviation & Luxury Palaces',
          customCjPublisherId: '',
          defaultSubId: ''
        });
        fetchBackendData();
      }
    } catch (err) {
      console.error('Error creating subscriber:', err);
    }
  };

  // Handle Edit Campaign Save
  const handleSaveCampaignEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;

    try {
      const res = await fetch(`/api/cj/campaigns/${editingCampaign.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCampaign)
      });
      const data = await res.json();
      if (data.success) {
        setEditingCampaign(null);
        fetchBackendData();
      }
    } catch (err) {
      console.error('Error updating campaign:', err);
    }
  };

  // Filtered subscribers
  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch = 
      sub.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.cjPublisherId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = tierFilter === 'all' || sub.tier === tierFilter;
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;

    return matchesSearch && matchesTier && matchesStatus;
  });

  // Calculate Metrics
  const totalMRR = subscribers.reduce((acc, sub) => acc + (sub.status === 'Active' ? sub.monthlyRate : 0), 0);
  const totalCommissionVolume = subscribers.reduce((acc, sub) => acc + (sub.totalEarnings || 0), 0);
  const totalClicks = subscribers.reduce((acc, sub) => acc + (sub.clicksGenerated || 0), 0);

  return (
    <div className="bg-stone-950 text-stone-200 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Navigation Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-stone-900/90 border border-gold-500/30 p-4 rounded-lg shadow-xl backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gold-500/10 rounded-md border border-gold-500/30 text-gold-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-lg font-bold text-gold-100">
                  Lumière Master Admin Backend
                </h1>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded">
                  Live REST API
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono">
                Manage SaaS Subscribers, Override Commissions & Edit CJ Network Parameters
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <button
              onClick={onGoToPricing}
              className="px-3.5 py-1.5 bg-stone-850 hover:bg-stone-800 text-stone-300 rounded border border-stone-700 transition-colors cursor-pointer"
            >
              Subscription Page
            </button>
            <button
              onClick={onGoToAffiliateHub}
              className="px-3.5 py-1.5 bg-stone-850 hover:bg-stone-800 text-gold-300 rounded border border-gold-500/40 transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Affiliate Hub</span>
            </button>
            <button
              onClick={fetchBackendData}
              className="p-1.5 bg-stone-850 hover:bg-stone-800 text-stone-300 rounded border border-stone-700 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Executive KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl">
            <div className="flex items-center justify-between text-stone-400 text-xs font-mono mb-2">
              <span>TOTAL SUBSCRIBERS</span>
              <Users className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-gold-100">
              {subscribers.length}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">
              {subscribers.filter(s => s.status === 'Active').length} Active Accounts
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl">
            <div className="flex items-center justify-between text-stone-400 text-xs font-mono mb-2">
              <span>MONTHLY REVENUE (MRR)</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
              ${totalMRR.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-400 font-mono mt-1">
              Recurring SaaS billing
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl">
            <div className="flex items-center justify-between text-stone-400 text-xs font-mono mb-2">
              <span>CJ CLICKS ATTRIBUTED</span>
              <Zap className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-gold-200">
              {totalClicks.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-400 font-mono mt-1">
              Publisher link clicks
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl">
            <div className="flex items-center justify-between text-stone-400 text-xs font-mono mb-2">
              <span>TOTAL COMMISSIONS</span>
              <Shield className="w-4 h-4 text-gold-400" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-gold-400">
              ${totalCommissionVolume.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-400 font-mono mt-1">
              Gross affiliate payouts
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-stone-800 mb-6 space-x-6">
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`pb-3 text-sm font-serif uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === 'subscribers'
                ? 'border-gold-500 text-gold-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Subscribers & Publishers ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`pb-3 text-sm font-serif uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === 'campaigns'
                ? 'border-gold-500 text-gold-300 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            CJ Advertiser Campaigns ({campaigns.length})
          </button>
        </div>

        {/* TAB 1: Subscribers View */}
        {activeTab === 'subscribers' && (
          <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-xl">
            
            {/* Table Control Bar */}
            <div className="p-4 border-b border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-950/60">
              <div className="flex flex-1 items-center space-x-3 max-w-md bg-stone-900 border border-stone-800 rounded px-3 py-2">
                <Search className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, email, company, or CJ PID..."
                  className="w-full bg-transparent text-xs text-stone-200 outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <Filter className="w-3.5 h-3.5 text-stone-400" />
                  <select
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value)}
                    className="bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300 rounded px-2.5 py-1.5 outline-none cursor-pointer"
                  >
                    <option value="all">All Tiers</option>
                    <option value="Creator">Creator ($49)</option>
                    <option value="Haute Pro">Haute Pro ($149)</option>
                    <option value="Enterprise Syndicate">Enterprise ($399)</option>
                  </select>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300 rounded px-2.5 py-1.5 outline-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Trial">Trial</option>
                  <option value="Paused">Paused</option>
                  <option value="Suspended">Suspended</option>
                </select>

                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-3.5 py-1.5 bg-gold-500 hover:bg-gold-400 text-stone-950 text-xs font-serif font-bold uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center space-x-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Subscriber</span>
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-950/80 font-mono text-[10px] text-stone-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Subscriber</th>
                    <th className="py-3 px-4">Company / Channel</th>
                    <th className="py-3 px-4">Tier & Billing</th>
                    <th className="py-3 px-4">CJ Publisher ID (PID)</th>
                    <th className="py-3 px-4">Comm. Split</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Clicks & Earnings</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-850">
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-stone-850/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-serif font-bold text-stone-100">{sub.fullName}</div>
                        <div className="font-mono text-[10px] text-stone-400">{sub.email}</div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="text-stone-300 font-medium">{sub.companyName}</div>
                        <div className="font-mono text-[10px] text-gold-500/80 truncate max-w-[140px]">
                          {sub.website}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono text-gold-300 font-semibold">{sub.tier}</span>
                        <div className="text-[10px] text-stone-400 font-mono">${sub.monthlyRate}/mo ({sub.billingCycle})</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {sub.cjPublisherId}
                        </span>
                        <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                          SID: {sub.defaultSubId}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-gold-400">
                        {sub.commissionSplit}%
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          sub.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : sub.status === 'Trial'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                              : sub.status === 'Paused'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}>
                          {sub.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono">
                        <div className="text-stone-200">{sub.clicksGenerated.toLocaleString()} clicks</div>
                        <div className="text-emerald-400 font-bold">${sub.totalEarnings.toLocaleString()} USD</div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setEditingSubscriber({ ...sub })}
                            className="p-1.5 bg-stone-800 hover:bg-gold-500 hover:text-stone-950 text-gold-300 rounded transition-colors cursor-pointer border border-stone-700"
                            title="Edit Subscriber Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id, sub.fullName)}
                            className="p-1.5 bg-stone-800 hover:bg-rose-600 hover:text-white text-stone-400 rounded transition-colors cursor-pointer border border-stone-700"
                            title="Remove Subscriber"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredSubscribers.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-stone-500 font-mono">
                        No subscribers match the current search or filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: CJ Campaigns Management View */}
        {activeTab === 'campaigns' && (
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-gold-100">
                  CJ Advertiser Partner Campaign Rules
                </h3>
                <p className="text-stone-400 text-xs font-light">
                  Admin can adjust commission payouts, destination endpoints, and tracking templates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((camp) => (
                <div key={camp.id} className="bg-stone-950 border border-stone-850 p-5 rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-serif font-bold text-gold-200 text-base">
                      {camp.advertiserName}
                    </span>
                    <button
                      onClick={() => setEditingCampaign({ ...camp })}
                      className="px-2.5 py-1 bg-stone-900 hover:bg-gold-500 hover:text-stone-950 text-gold-300 border border-gold-500/30 text-[11px] font-mono rounded transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Rules</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Rate:</span>
                      <span className="text-emerald-400 font-bold">{camp.commissionRate}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Average Order Value:</span>
                      <span className="text-stone-200">{camp.avgBookingValue}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Target URL:</span>
                      <span className="text-gold-500/80 truncate max-w-[200px]">{camp.destinationUrl}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* EDIT SUBSCRIBER MODAL */}
      {editingSubscriber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-stone-900 border border-gold-500/50 rounded-xl shadow-2xl p-6 sm:p-8 my-8 text-stone-200">
            <button
              onClick={() => setEditingSubscriber(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-gold-400 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSaveSubscriberEdit} className="space-y-5">
              <div className="border-b border-stone-800 pb-3">
                <span className="font-mono text-[10px] text-gold-500 uppercase tracking-widest block">
                  ✦ Admin Override Controls ✦
                </span>
                <h3 className="font-serif text-2xl font-bold text-gold-100 mt-1">
                  Edit Subscriber: {editingSubscriber.fullName}
                </h3>
                <p className="text-stone-400 text-xs font-mono">
                  Account ID: {editingSubscriber.id} | Joined: {new Date(editingSubscriber.joinedAt).toLocaleDateString()}
                </p>
              </div>

              {saveSuccessMsg && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded text-emerald-300 text-xs font-mono flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSubscriber.fullName}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, fullName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={editingSubscriber.email}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={editingSubscriber.companyName}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, companyName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Website or Profile URL
                  </label>
                  <input
                    type="url"
                    value={editingSubscriber.website}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, website: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Subscription Tier
                  </label>
                  <select
                    value={editingSubscriber.tier}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, tier: e.target.value as any })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                  >
                    <option value="Creator">Creator ($49)</option>
                    <option value="Haute Pro">Haute Pro ($149)</option>
                    <option value="Enterprise Syndicate">Enterprise Syndicate ($399)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Account Status
                  </label>
                  <select
                    value={editingSubscriber.status}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, status: e.target.value as any })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Trial">Trial</option>
                    <option value="Paused">Paused</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Commission Split (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={editingSubscriber.commissionSplit}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, commissionSplit: Number(e.target.value) })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 font-mono focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    CJ Publisher ID (PID)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSubscriber.cjPublisherId}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, cjPublisherId: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs font-mono text-emerald-400 focus:border-gold-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Default SubID (SID) Tag
                  </label>
                  <input
                    type="text"
                    value={editingSubscriber.defaultSubId}
                    onChange={(e) => setEditingSubscriber({ ...editingSubscriber, defaultSubId: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs font-mono text-stone-200 focus:border-gold-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                  Internal Admin Notes
                </label>
                <textarea
                  rows={2}
                  value={editingSubscriber.adminNotes}
                  onChange={(e) => setEditingSubscriber({ ...editingSubscriber, adminNotes: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-200 focus:border-gold-500 outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingSubscriber(null)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-stone-300 font-mono text-xs rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-stone-950 font-serif text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving Changes...' : 'Save Subscriber Details'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE SUBSCRIBER MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-stone-900 border border-gold-500/50 rounded-xl shadow-2xl p-6 text-stone-200">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-gold-400 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleCreateSubscriber} className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="font-serif text-xl font-bold text-gold-100">
                  Provision New Subscriber
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newSubData.fullName}
                  onChange={(e) => setNewSubData({ ...newSubData, fullName: e.target.value })}
                  placeholder="Countess Vivienne Sterling"
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={newSubData.email}
                  onChange={(e) => setNewSubData({ ...newSubData, email: e.target.value })}
                  placeholder="vivienne@sterlingvoyages.com"
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={newSubData.companyName}
                    onChange={(e) => setNewSubData({ ...newSubData, companyName: e.target.value })}
                    placeholder="Sterling Voyages"
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                    Membership Tier
                  </label>
                  <select
                    value={newSubData.tier}
                    onChange={(e) => setNewSubData({ ...newSubData, tier: e.target.value as any })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                  >
                    <option value="Creator">Creator ($49)</option>
                    <option value="Haute Pro">Haute Pro ($149)</option>
                    <option value="Enterprise Syndicate">Enterprise Syndicate ($399)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-stone-800 text-stone-300 font-mono text-xs rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-stone-950 font-serif text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CAMPAIGN MODAL */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-stone-900 border border-gold-500/50 rounded-xl shadow-2xl p-6 text-stone-200">
            <button
              onClick={() => setEditingCampaign(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-gold-400 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSaveCampaignEdit} className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-gold-100">
                  Edit CJ Advertiser: {editingCampaign.advertiserName}
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                  Commission Rate String
                </label>
                <input
                  type="text"
                  value={editingCampaign.commissionRate}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, commissionRate: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone-300 uppercase mb-1">
                  Target Destination URL
                </label>
                <input
                  type="url"
                  value={editingCampaign.destinationUrl}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, destinationUrl: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:border-gold-500 outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingCampaign(null)}
                  className="px-4 py-2 bg-stone-800 text-stone-300 font-mono text-xs rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-stone-950 font-serif text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
