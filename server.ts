import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const STORE_PATH = path.join(process.cwd(), 'data', 'saas_store.json');

function loadStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading saas_store.json:', err);
  }
  return { subscribers: [], campaigns: [] };
}

function saveStore(data: any) {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving saas_store.json:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Lumière Voyages CJ SaaS Platform API' });
  });

  // --- SaaS Subscribers Endpoints ---
  app.get('/api/subscribers', (req, res) => {
    const store = loadStore();
    res.json({ success: true, subscribers: store.subscribers || [] });
  });

  app.post('/api/subscribers', (req, res) => {
    try {
      const store = loadStore();
      const {
        fullName,
        email,
        companyName,
        website,
        tier,
        billingCycle,
        travelNiche,
        customCjPublisherId,
        defaultSubId
      } = req.body;

      if (!fullName || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required.' });
      }

      // Rates by tier
      const rates: Record<string, number> = {
        'Creator': 49,
        'Haute Pro': 149,
        'Enterprise Syndicate': 399
      };

      const commissionSplits: Record<string, number> = {
        'Creator': 8,
        'Haute Pro': 12,
        'Enterprise Syndicate': 15
      };

      const monthlyRate = rates[tier] || 149;
      const commissionSplit = commissionSplits[tier] || 12;

      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const cjPublisherId = customCjPublisherId?.trim() ? customCjPublisherId.trim() : `CJ-PUB-${randomSuffix}`;
      const subId = defaultSubId?.trim() ? defaultSubId.trim() : `lum_${fullName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8)}`;

      const newSubscriber = {
        id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
        fullName,
        email,
        companyName: companyName || `${fullName} Luxury Travel`,
        website: website || 'https://lumierevoyage.com',
        tier: tier || 'Haute Pro',
        billingCycle: billingCycle || 'monthly',
        monthlyRate,
        status: 'Active',
        cjPublisherId,
        defaultSubId: subId,
        commissionSplit,
        travelNiche: travelNiche || 'Private Aviation & Luxury Palaces',
        clicksGenerated: 0,
        conversions: 0,
        totalEarnings: 0,
        joinedAt: new Date().toISOString(),
        adminNotes: 'Direct subscription onboarding via SaaS landing page.'
      };

      store.subscribers = [newSubscriber, ...(store.subscribers || [])];
      saveStore(store);

      return res.json({ success: true, subscriber: newSubscriber });
    } catch (err: any) {
      console.error('Subscriber creation error:', err);
      return res.status(500).json({ success: false, message: err.message || 'Creation failed' });
    }
  });

  // Admin edit subscriber
  app.put('/api/subscribers/:id', (req, res) => {
    try {
      const { id } = req.params;
      const store = loadStore();
      const idx = store.subscribers.findIndex((s: any) => s.id === id);

      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Subscriber not found' });
      }

      // Update allowed fields
      store.subscribers[idx] = {
        ...store.subscribers[idx],
        ...req.body,
        id // enforce ID immutability
      };

      saveStore(store);
      return res.json({ success: true, subscriber: store.subscribers[idx] });
    } catch (err: any) {
      console.error('Subscriber update error:', err);
      return res.status(500).json({ success: false, message: err.message || 'Update failed' });
    }
  });

  // Admin delete subscriber
  app.delete('/api/subscribers/:id', (req, res) => {
    try {
      const { id } = req.params;
      const store = loadStore();
      store.subscribers = store.subscribers.filter((s: any) => s.id !== id);
      saveStore(store);
      return res.json({ success: true, message: 'Subscriber removed successfully' });
    } catch (err: any) {
      console.error('Subscriber delete error:', err);
      return res.status(500).json({ success: false, message: err.message || 'Delete failed' });
    }
  });

  // --- CJ Affiliate Campaigns Endpoints ---
  app.get('/api/cj/campaigns', (req, res) => {
    const store = loadStore();
    res.json({ success: true, campaigns: store.campaigns || [] });
  });

  app.put('/api/cj/campaigns/:id', (req, res) => {
    try {
      const { id } = req.params;
      const store = loadStore();
      const idx = store.campaigns.findIndex((c: any) => c.id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Campaign not found' });
      }
      store.campaigns[idx] = { ...store.campaigns[idx], ...req.body, id };
      saveStore(store);
      return res.json({ success: true, campaign: store.campaigns[idx] });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message || 'Campaign update failed' });
    }
  });

  // Simulate click tracking & affiliate commission attribution
  app.post('/api/cj/track-click', (req, res) => {
    try {
      const { publisherId, campaignId, subId } = req.body;
      const store = loadStore();
      const subscriber = store.subscribers.find((s: any) => s.cjPublisherId === publisherId);

      if (subscriber) {
        subscriber.clicksGenerated = (subscriber.clicksGenerated || 0) + 1;
        // 1 in 8 simulated conversion chance
        if (Math.random() < 0.14) {
          subscriber.conversions = (subscriber.conversions || 0) + 1;
          const commEarned = Math.floor(450 + Math.random() * 850);
          subscriber.totalEarnings = (subscriber.totalEarnings || 0) + commEarned;
        }
        saveStore(store);
      }

      return res.json({
        success: true,
        tracked: {
          publisherId,
          campaignId,
          subId: subId || 'default',
          eventTimestamp: new Date().toISOString()
        }
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Tracking error' });
    }
  });

  // Server-side Gemini API endpoint for bespoke luxury trip generation
  app.post('/api/generate-itinerary', async (req, res) => {
    try {
      const { destination, duration, budget, travelersCount, travelStyle, startDate } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        return res.json({ success: false, reason: 'no_api_key' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a world-class luxury travel concierge at Lumière Voyages.
Create an exclusive ${duration}-day luxury travel itinerary for ${travelersCount} traveler(s) visiting ${destination}.
The total target budget is $${budget} and the travel style preference is "${travelStyle}". The trip starts on ${startDate}.

Respond ONLY with valid JSON in the following schema (no markdown, no backticks, no extra text):
{
  "destination": "${destination}",
  "hotels": ["5-Star Palace/Resort 1", "5-Star Palace/Resort 2"],
  "totalEstimatedCost": "$${Number(budget).toLocaleString()}",
  "dayByDay": [
    {
      "day": 1,
      "title": "Title of Day 1",
      "accommodation": "Name of Hotel/Resort",
      "activities": ["Exclusive Activity 1", "Exclusive Activity 2"],
      "dining": ["Michelin-Starred Restaurant"],
      "estimatedCost": "$1,200"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const textOutput = response.text || '';
      const cleanJson = textOutput
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      const itinerary = JSON.parse(cleanJson);
      return res.json({ success: true, itinerary });
    } catch (error: any) {
      console.error('Gemini itinerary generation error:', error);
      return res.json({ success: false, error: error.message || 'Generation failed' });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lumière Voyages server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
