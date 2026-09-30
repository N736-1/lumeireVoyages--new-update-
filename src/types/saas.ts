export interface Subscriber {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  website: string;
  tier: 'Creator' | 'Haute Pro' | 'Enterprise Syndicate';
  billingCycle: 'monthly' | 'annual';
  monthlyRate: number;
  status: 'Active' | 'Trial' | 'Paused' | 'Suspended';
  cjPublisherId: string;
  defaultSubId: string;
  commissionSplit: number;
  travelNiche: string;
  clicksGenerated: number;
  conversions: number;
  totalEarnings: number;
  joinedAt: string;
  adminNotes: string;
}

export interface CJCampaign {
  id: string;
  advertiserName: string;
  category: string;
  commissionRate: string;
  avgBookingValue: string;
  epc: string;
  destinationUrl: string;
  cjTrackingTemplate: string;
  status: 'Active' | 'Featured' | 'Paused';
  logoBadge: string;
}

export interface SubscriptionFormData {
  fullName: string;
  email: string;
  password?: string;
  companyName: string;
  website: string;
  tier: 'Creator' | 'Haute Pro' | 'Enterprise Syndicate';
  billingCycle: 'monthly' | 'annual';
  travelNiche: string;
  customCjPublisherId?: string;
  defaultSubId?: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: 'member' | 'creator' | 'admin';
  tier?: string;
  companyName?: string;
  cjPublisherId?: string;
  joinedAt?: string;
}

