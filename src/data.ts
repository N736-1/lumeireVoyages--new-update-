import { ItineraryPlan, ItineraryDay, Booking } from './types';

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  price: number;
  rating: number;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description: 'The City of Light in absolute refinement. Stay in historical palaces, enjoy Michelin-starred culinary artistry, and enjoy private, after-hours museum encounters.',
    price: 6800,
    rating: 5.0
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Indian Ocean',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    description: 'An idyllic overwater escape of unmatched seclusion. Coral-rimmed islands, white-sand channels, personal island hosts, and underwater fine dining.',
    price: 8900,
    rating: 5.0
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    description: 'Dramatic caldera cliffs framed by pristine white dwellings. Sail the azure Aegean in private catamarans and dine under romantic volcanic sunsets.',
    price: 5200,
    rating: 4.9
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    description: 'Ultraluxury skyscrapers meeting gold-spun desert dunes. Indulge in penthouses, private helicopter transfers, and exclusive VIP desert exploration.',
    price: 7400,
    rating: 4.9
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Deep spiritual sanctuaries nestled in lush jungle terraces. Experience private spiritual blessings, hidden crater pools, and boutique rainforest villas.',
    price: 4800,
    rating: 5.0
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80',
    description: 'Clifftop pastel villages leaning gracefully over deep blue waves. Rent an Italian vintage convertible and navigate historic coastlines in sheer style.',
    price: 8100,
    rating: 5.0
  }
];

export interface LuxuryPackage {
  id: string;
  title: string;
  duration: string;
  price: number;
  image: string;
  inclusions: string[];
}

export const LUXURY_PACKAGES: LuxuryPackage[] = [
  {
    id: 'pkg-europe',
    title: 'The Grand European Tour',
    duration: '14 Days',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Private jet transfers between Paris, Venice & Santorini',
      'Ultra-luxury 5-star historic palace suites',
      'Exclusive curator-led after-hours tours of Museé du Louvre',
      'Michelin 3-star dining pairings throughout the journey',
      'Dedicated local white-glove concierges available 24/7'
    ]
  },
  {
    id: 'pkg-maldives',
    title: 'Maldives Private Island Escape',
    duration: '7 Days',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Secluded ultra-lux overwater villa with private infinity pool',
      'Roundtrip scenic seaplane transfers with VIP lounge access',
      '24-Hour dedicated personal island Butler service',
      'In-villa gourmet meals prepared by a private award chef',
      'Velaa island private yacht charter with sunset snorkeling'
    ]
  },
  {
    id: 'pkg-dubai',
    title: 'Dubai & Abu Dhabi Elite',
    duration: '10 Days',
    price: 9750,
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8ea?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Royal Suite at Atlantis The Royal / Burj Al Arab Jumeirah',
      'Supercar rental or chauffeur-driven Rolls-Royce Ghost',
      'Private desert dunes expedition with hot air balloon ascent',
      'Exclusive VIP private yacht cruising with gourmet dining',
      'Private personal shopper access at the boutique gallerias'
    ]
  }
];

export interface Testimonial {
  name: string;
  nationality: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ahmed K.',
    nationality: '🇵🇰 Pakistan',
    quote: 'Lumière planned our honeymoon to Santorini flawlessly. Stayed in the caldera cliffs with private infinity pools. Pure, unadulterated magic.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Sarah M.',
    nationality: '🇬🇧 United Kingdom',
    quote: 'The AI itinerary was more intuitive and tailored than anything our private human booking agents could assemble. Saved us countless hours.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'James T.',
    nationality: '🇺🇸 United States',
    quote: 'Booked the Dubai & Abu Dhabi Elite package. The attention to detail from the private lounge welcome down to the yacht charter was spectacular.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

// Rich day templates for structured rendering
const HISTORIC_ITINERARIES: Record<string, { hotels: string[], days: Omit<ItineraryDay, 'day'>[] }> = {
  paris: {
    hotels: ['The Ritz Paris', 'Hôtel de Crillon (A Rosewood Hotel)', 'Le Meurice'],
    days: [
      {
        title: 'Arrival & Royal Welcome',
        accommodation: 'The Ritz Paris (Imperial Suite)',
        activities: ['Chauffeur arrival in Bentley Mulsanne', 'In-suite vintage champagne check-in', 'Private sunset yacht cruise along the Seine with live harp accompaniment'],
        dining: ['Le Jules Verne (Eiffel Tower Private Lounge)'],
        estimatedCost: '$2,400'
      },
      {
        title: 'Masterpieces & Privileged After-hours',
        accommodation: 'The Ritz Paris',
        activities: ['Curator-led private after-hours walkthrough of Musée du Louvre', 'Exclusive high-jewelry viewing at Place Vendôme ateliers'],
        dining: ['L\'Ambroisie (3 Michelin Stars)'],
        estimatedCost: '$3,100'
      },
      {
        title: 'Helicopter Versailles & Royal Gardens',
        accommodation: 'The Ritz Paris',
        activities: ['Private helicopter flight to Château de Versailles', 'Exclusive royal gardens golf ride with estate keeper', 'Aromatherapy spa at Sothys Ritz'],
        dining: ['Plénitude by Sébastienillon (La Samaritaine)'],
        estimatedCost: '$4,500'
      },
      {
        title: 'Artisan Culinary & Farewell',
        accommodation: 'The Ritz Paris',
        activities: ['Private baking masterclass with Ritz pastry chef', 'Custom couture tailored shopping assistant on Avenue Montaigne'],
        dining: ['Epicure at Le Bristol'],
        estimatedCost: '$1,900'
      }
    ]
  },
  maldives: {
    hotels: ['Soneva Jani', 'Velaa Private Island', 'One&Only Reethi Rah'],
    days: [
      {
        title: 'Seaplane Grandeur & Sunset Overwater',
        accommodation: 'Soneva Jani (Chapter Two Water Reserve)',
        activities: ['Scenic private charter seaplane with luxury champagne terminal', 'Sunset dolphin cruise on custom crafted double-deck wood catamaran'],
        dining: ['The Gathering (Ocean Overwater Gazebo)'],
        estimatedCost: '$3,800'
      },
      {
        title: 'Marine Sanctuary & Subaquatic Dining',
        accommodation: 'Soneva Jani (Private slide overwater pool villa)',
        activities: ['Private marine biologist-guided manta ray swim', 'Overwater cinema under the Equator stars with organic refreshments'],
        dining: ['5.8 Undersea Restaurant (5 meters sub-surface)'],
        estimatedCost: '$2,500'
      },
      {
        title: 'Private Sandbank Picnic & Wellness',
        accommodation: 'Soneva Jani',
        activities: ['Secluded sandbar drop-off with bespoke crystal tenting & massage', 'Holistic Ayurveda sound therapy massage in treetop sanctuary'],
        dining: ['Fresh in the Garden (suspended among organic farm canopy)'],
        estimatedCost: '$1,800'
      }
    ]
  },
  santorini: {
    hotels: ['Grace Hotel, Auberge Resorts Collection', 'Canaves Oia Epitome', 'Katikies Santorini'],
    days: [
      {
        title: 'Sunset Cliffs Welcome & Infinite Basin',
        accommodation: 'Grace Hotel (Grace Suite with Caldera pool view)',
        activities: ['VIP helicopter transfer from Athens Executive Airport', 'Bespoke Caldera walking tour with private local historian'],
        dining: ['Lycabettus Restaurant (Oia edge balcony pod)'],
        estimatedCost: '$1,900'
      },
      {
        title: 'Aegean Yacht Charter & Ancient Vineyard Tasting',
        accommodation: 'Grace Hotel',
        activities: ['Exclusive 40ft private Riva yacht sailing across the volcanic caldera', 'Private estate wine tasting featuring rare ancient Assyrtiko grapes'],
        dining: ['Selene (within historic 18th-century monastery structure)'],
        estimatedCost: '$2,800'
      },
      {
        title: 'Volcanic Springs & Sunset Photography',
        accommodation: 'Grace Hotel',
        activities: ['Private hot springs dip away from crowd channels', 'Professional fly-on-the-wall sunset travel catalog photoshoot in Oia clifftops'],
        dining: ['Petra Restaurant (Grace pool terrace)'],
        estimatedCost: '$1,500'
      }
    ]
  },
  dubai: {
    hotels: ['Burj Al Arab Jumeirah', 'One&Only The Palm', 'Armani Hotel Dubai'],
    days: [
      {
        title: 'The Royal Sovereign Arrival',
        accommodation: 'Burj Al Arab Jumeirah (Two-story Deluxe Suite with private butler)',
        activities: ['Rolls-Royce Phantom tarmac pickup', 'Private private lounge welcome in the sky lobby'],
        dining: ['Al Mahara Nathan Outlaw (underwater aquarium room)'],
        estimatedCost: '$3,500'
      },
      {
        title: 'Royal Dunes & Desert Ballooning',
        accommodation: 'Burj Al Arab Jumeirah',
        activities: ['Before-dawn private hot air balloon over Arabian Desert with falconry show', 'Safari in vintage 1950 Land Rovers across Royal Desert Reserve'],
        dining: ['Bespoke Oasis oasis tent banquet bonfire cooked by private chef'],
        estimatedCost: '$2,400'
      },
      {
        title: 'Mega Yacht Cruise & High Fashion Concierge',
        accommodation: 'Burj Al Arab Jumeirah',
        activities: ['Private luxury motor yacht cruise with gourmet sushi pairings', 'After-hours VIP personal shopping lounge access in Dubai Mall'],
        dining: ['Ossiano (Michelin-starred underwater masterpiece)'],
        estimatedCost: '$2,900'
      }
    ]
  },
  bali: {
    hotels: ['Mandapa, a Ritz-Carlton Reserve', 'Amandari', 'Four Seasons Resort Bali at Sayan'],
    days: [
      {
        title: 'Rainforest Sanctuary & Purification Blessing',
        accommodation: 'Mandapa, a Ritz-Carlton Reserve (Pool Villa)',
        activities: ['Luxury Mercedes G-Class transfer through Ubud valleys', 'Private morning water purification blessing at sacred Sebatu Temple with high priest'],
        dining: ['Kubu Restaurant (private bamboo cocoons by Ayung River)'],
        estimatedCost: '$1,600'
      },
      {
        title: 'Helicopter Volcano Flight & Organic Plantations',
        accommodation: 'Mandapa, a Ritz-Carlton Reserve',
        activities: ['Private helicopter ride circling active Mount Batur caldera', 'Tour of organic Luwak coffee forest estate with rare roast sampling'],
        dining: ['Locavore NXT (15-course progressive chef menu)'],
        estimatedCost: '$2,300'
      },
      {
        title: 'Sacred Rice Terrace Yoga & Deep Massage',
        accommodation: 'Mandapa, a Ritz-Carlton Reserve',
        activities: ['Sunrise yoga facing cascading Tegallalang terraces', '2-hour traditional Balinese flower petal bath & warm herbal pouch massage'],
        dining: ['Room4Dessert by Will Goldfarb'],
        estimatedCost: '$900'
      }
    ]
  },
  amalfi: {
    hotels: ['Belmond Hotel Caruso', 'Le Sirenuse (Positano)', 'Il San Pietro di Positano'],
    days: [
      {
        title: 'Amalfi Coast Panorama & Vintage Ride',
        accommodation: 'Belmond Hotel Caruso (Ravello Prestige Suite)',
        activities: ['Chauffeur drive or vintage red Alfa Romeo Giulietta Spider drop-off', 'Ravello historic infinity gardens evening walkthrough overlooking Salerno'],
        dining: ['La Sponda (Positano - illuminated by 400 candles)'],
        estimatedCost: '$2,200'
      },
      {
        title: 'Capri Riva Yacht & Blue Grotto Exclusive',
        accommodation: 'Belmond Hotel Caruso',
        activities: ['Bespoke Riva boat excursion around Faraglioni rock formations', 'After-hours custom access into legendary glowing Blue Grotto caves'],
        dining: ['Rossellinis (clifftop visual Michelin star dining)'],
        estimatedCost: '$3,100'
      },
      {
        title: 'Limoncello Paths & Pompeii Private Flight',
        accommodation: 'Belmond Hotel Caruso',
        activities: ['Orchard tour with lemon-grower ancestor with family reserve tasting', 'Charter flight or private elite guide around historic ruins of Pompeii'],
        dining: ['Da Don Alfonso 1890 (iconic gastronomy)'],
        estimatedCost: '$1,800'
      }
    ]
  }
};

export function generateBespokeItinerary(
  destination: string,
  duration: number,
  budget: number,
  travelersCount: number,
  travelStyle: string,
  startDate: string
): ItineraryPlan {
  const normDest = destination.toLowerCase().trim();
  const matchedKey = Object.keys(HISTORIC_ITINERARIES).find(
    (key) => normDest.includes(key) || key.includes(normDest)
  );

  const finalId = `voyage-${Math.floor(Math.random() * 900000 + 100000)}`;
  const createdAtStr = new Date().toISOString().split('T')[0];

  // If matched to preloaded premium destinations:
  if (matchedKey) {
    const data = HISTORIC_ITINERARIES[matchedKey];
    const originalDays = data.days;
    const finalDays: ItineraryDay[] = [];

    // Loop/stretch/crop original days to fit requested duration
    for (let i = 0; i < duration; i++) {
      const origDay = originalDays[i % originalDays.length];
      
      // Scale costs based on travelers and budget tier
      const costScaler = 0.8 + (travelersCount * 0.2);
      const scaledCostVal = Math.round(Number(origDay.estimatedCost.replace(/[^0-9]/g, '')) * costScaler);

      // Travel style variations
      let styleActivity = '';
      if (travelStyle === 'adventure') {
        styleActivity = 'Elite active excursion: paragliding or rock exploration with top coach';
      } else if (travelStyle === 'cultural') {
        styleActivity = 'Exclusive meeting with historical artifact conservator at local estate';
      } else if (travelStyle === 'wellness') {
        styleActivity = 'Dedicated restorative sensory deprivation or botanical therapeutic session';
      } else if (travelStyle === 'honeymoon') {
        styleActivity = 'Bespoke custom golden hour private champagne picnic pod';
      }

      const activitiesWithStyle = styleActivity 
        ? [styleActivity, ...origDay.activities] 
        : origDay.activities;

      finalDays.push({
        day: i + 1,
        title: origDay.title,
        accommodation: i === 0 ? data.hotels[0] : (data.hotels[i % data.hotels.length]),
        activities: activitiesWithStyle,
        dining: origDay.dining,
        estimatedCost: `$${scaledCostVal.toLocaleString()}`
      });
    }

    const totalCostNum = finalDays.reduce((acc, d) => acc + Number(d.estimatedCost.replace(/[^0-9]/g, '')), 0);

    return {
      id: finalId,
      destination: destination.charAt(0).toUpperCase() + destination.slice(1),
      startDate,
      duration,
      budget,
      travelersCount,
      travelStyle,
      dayByDay: finalDays,
      hotels: data.hotels,
      totalEstimatedCost: `$${totalCostNum.toLocaleString()}`,
      createdAt: createdAtStr
    };
  }

  // Generate dynamic customized travel plans for any written-in client query
  const customHotels = [
    `Grand Hyatt ${destination} Elite`,
    `Aman Resort & Sanctuary ${destination}`,
    `The Ritz-Carlton Reserve ${destination}`
  ];

  const genericActivities = [
    'Private local tour with historical concierge',
    'Custom tailored shopping or artisan gallery encounter with personal assistant',
    'Bespoke sunset yacht or scenic cruise around the local landscape highlights',
    'Private tasting experience with local multi-generation vintage growers',
    'Elite organic spa treatment with therapeutic active essences'
  ];

  const genericDining = [
    'The Michelin Star Table (Modern Fusion)',
    'Panoramic Horizon Gazebo & Grill',
    'Historical Castle Vault (Grand Vintage Select)'
  ];

  const finalDays: ItineraryDay[] = [];
  const baseDayCost = Math.round((budget * 0.7) / duration);

  for (let i = 0; i < duration; i++) {
    const act1 = genericActivities[i % genericActivities.length];
    const act2 = genericActivities[(i + 1) % genericActivities.length];
    const din1 = genericDining[i % genericDining.length];
    const dailyCost = Math.round((baseDayCost * (0.8 + Math.random() * 0.4)) * (0.7 + travelersCount * 0.15));

    finalDays.push({
      day: i + 1,
      title: i === 0 ? `Arrival & Grand Welcome to ${destination}` : i === duration - 1 ? 'Vintage Departure & Final Moments' : `Exploring the Wonders of ${destination}`,
      accommodation: customHotels[i % customHotels.length],
      activities: [act1, act2],
      dining: [din1],
      estimatedCost: `$${dailyCost.toLocaleString()}`
    });
  }

  const calculatedTotal = finalDays.reduce((acc, d) => acc + Number(d.estimatedCost.replace(/[^0-9]/g, '')), 0);

  return {
    id: finalId,
    destination,
    startDate,
    duration,
    budget,
    travelersCount,
    travelStyle,
    dayByDay: finalDays,
    hotels: customHotels,
    totalEstimatedCost: `$${calculatedTotal.toLocaleString()}`,
    createdAt: createdAtStr
  };
}

export function loadStoredItineraries(): ItineraryPlan[] {
  try {
    const data = localStorage.getItem('lumiere_saved_itineraries');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveStoredItinerary(plan: ItineraryPlan) {
  try {
    const list = loadStoredItineraries();
    if (!list.some((it) => it.id === plan.id)) {
      list.unshift(plan);
      localStorage.setItem('lumiere_saved_itineraries', JSON.stringify(list));
    }
  } catch (e) {
    console.error(e);
  }
}

export function deleteStoredItinerary(id: string): ItineraryPlan[] {
  try {
    let list = loadStoredItineraries();
    list = list.filter((it) => it.id !== id);
    localStorage.setItem('lumiere_saved_itineraries', JSON.stringify(list));
    return list;
  } catch (e) {
    return [];
  }
}

// Default luxury initial sample bookings in cloud DB representation (localStorage synced)
export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BKG-77291',
    destination: 'Santorini, Greece',
    tourName: 'Bespoke Volcanic caldera Sunset Villa Escape',
    dates: 'Aug 14 - Aug 18, 2026',
    travelers: 2,
    amount: '$5,200',
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'BKG-99214',
    destination: 'Maldives Private Islands',
    tourName: 'Maldives Treetop Canopy & Water Reserve Oasis',
    dates: 'Dec 22 - Dec 29, 2026',
    travelers: 2,
    amount: '$17,800',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80'
  }
];

export function loadStoredBookings(): Booking[] {
  try {
    const data = localStorage.getItem('lumiere_bookings');
    if (!data) {
      localStorage.setItem('lumiere_bookings', JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_BOOKINGS;
  }
}

export function saveStoredBooking(b: Booking) {
  try {
    const list = loadStoredBookings();
    list.unshift(b);
    localStorage.setItem('lumiere_bookings', JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

export function deleteStoredBooking(id: string): Booking[] {
  try {
    let list = loadStoredBookings();
    list = list.filter((b) => b.id !== id);
    localStorage.setItem('lumiere_bookings', JSON.stringify(list));
    return list;
  } catch (e) {
    return [];
  }
}

export interface DocumentItem {
  id: string;
  name: string;
  completed: boolean;
}

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  { id: 'doc-passport', name: 'Original Passport (valid for 6 months minimum)', completed: true },
  { id: 'doc-visa', name: 'Official USA B1/B2 or Approved UK eVisa Document', completed: false },
  { id: 'doc-insurance', name: 'Comprehensive Premium World Travel Insurance Certificate', completed: true },
  { id: 'doc-vax', name: 'Updated Digital International Health & Vaccination Record', completed: false },
  { id: 'doc-ticket', name: 'Confirmed First Class Flight E-Tickets loaded', completed: false }
];

export function loadStoredDocuments(): DocumentItem[] {
  try {
    const data = localStorage.getItem('lumiere_documents');
    if (!data) {
      localStorage.setItem('lumiere_documents', JSON.stringify(INITIAL_DOCUMENTS));
      return INITIAL_DOCUMENTS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_DOCUMENTS;
  }
}

export function saveStoredDocuments(docs: DocumentItem[]) {
  try {
    localStorage.setItem('lumiere_documents', JSON.stringify(docs));
  } catch (e) {
    console.error(e);
  }
}
