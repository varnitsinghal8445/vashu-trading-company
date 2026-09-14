export const eventTypes = [
  {
    id: 'e-wedding',
    name: 'Wedding',
    description: 'Build a complete, custom photography package for your special wedding journey.',
    icon: 'Heart', // just an identifier to use an icon
    functions: [
      { id: 'f-engagement', name: 'Engagement' },
      { id: 'f-haldi', name: 'Haldi' },
      { id: 'f-mehendi', name: 'Mehendi' },
      { id: 'f-sangeet', name: 'Sangeet' },
      { id: 'f-wedding', name: 'Main Wedding Day' },
      { id: 'f-reception', name: 'Reception' },
      { id: 'f-other', name: 'Other' }
    ]
  },
  {
    id: 'e-maternity',
    name: 'Maternity / Baby Shower',
    description: 'Document the beautiful journey of parenthood.',
    icon: 'Baby',
    functions: [
      { id: 'f-maternity', name: 'Maternity Shoot' },
      { id: 'f-babyshower', name: 'Baby Shower' }
    ]
  },
  {
    id: 'e-birthday',
    name: 'Birthday Party',
    description: 'Capture the joy and celebrations.',
    icon: 'Cake',
    functions: [
      { id: 'f-bday', name: 'Birthday Party' }
    ]
  }
];

// Define what services are available for which function types.
// We map them so the UI can dynamically generate the checkboxes per function.
export const serviceOptions = [
  { id: 's-trad-photo', name: 'Traditional Photography', basePrice: 5000 },
  { id: 's-cand-photo', name: 'Candid Photography', basePrice: 8000 },
  { id: 's-trad-video', name: 'Traditional Videography', basePrice: 7000 },
  { id: 's-cine-video', name: 'Cinematic Video', basePrice: 15000 },
  { id: 's-drone', name: 'Drone Photography/Video', basePrice: 'Custom Quote' },
  { id: 's-reels', name: 'Instagram Reels / Short Videos', basePrice: 5000 },
  { id: 's-live', name: 'Live Streaming', basePrice: 10000 },
  { id: 's-sde', name: 'Same-Day Edit', basePrice: 15000 }
];

export const functionSpecificServices = {
  'f-haldi': ['s-trad-photo', 's-cand-photo', 's-trad-video', 's-cine-video', 's-reels', 's-drone'],
  'f-mehendi': ['s-trad-photo', 's-cand-photo', 's-trad-video', 's-cine-video', 's-reels'],
  'f-sangeet': ['s-trad-photo', 's-cand-photo', 's-trad-video', 's-cine-video', 's-reels', 's-drone'],
  'f-wedding': ['s-trad-photo', 's-cand-photo', 's-trad-video', 's-cine-video', 's-drone', 's-live', 's-sde'],
  'f-reception': ['s-trad-photo', 's-cand-photo', 's-trad-video', 's-cine-video', 's-drone', 's-live'],
  'default': ['s-trad-photo', 's-cand-photo', 's-trad-video', 's-cine-video'] // fallback for others
};

export const preWeddingOptions = {
  locations: ['Local', 'Outstation', 'Destination'],
  photography: ['Candid', 'Traditional', 'Both'],
  video: ['Cinematic', 'Short Reel', 'Both'],
  days: ['1 Day', '2 Days', 'Custom']
};

export const albumCustomization = {
  sizes: [
    { label: '4 × 6', basePrice: 500 },
    { label: '5 × 7', basePrice: 800 },
    { label: '6 × 8', basePrice: 1200 },
    { label: '10 × 12', basePrice: 2000 },
    { label: '12 × 15', basePrice: 2500 },
    { label: '12 × 18', basePrice: 3000 },
    { label: '12 × 36', basePrice: 5000 },
    { label: '16 × 20', basePrice: 6000 },
    { label: '16 × 24', basePrice: 7000 },
    { label: '20 × 30', basePrice: 9000 },
    { label: '24 × 36', basePrice: 12000 }
  ],
  pages: [
    { label: '20 Pages', multiplier: 1.0 },
    { label: '30 Pages', multiplier: 1.3 },
    { label: '40 Pages', multiplier: 1.6 },
    { label: '50 Pages', multiplier: 1.9 },
    { label: '60 Pages', multiplier: 2.2 },
    { label: 'Custom', multiplier: 1.0 } // Requires quote
  ]
};

export const teamOptions = [
  '1 Photographer',
  '2 Photographers',
  '1 Photographer + 1 Candid Photographer',
  '2 Photographers + 2 Candid Photographers',
  'Not Sure — Recommend for me'
];

export const guestCounts = [
  'Under 100',
  '100–250',
  '250–500',
  '500+'
];

export const packages = [
  {
    id: 'pkg-essential',
    name: 'Essential Coverage',
    description: 'Perfect for simple, elegant coverage without the complexity.',
    features: ['Traditional Photography', 'Traditional Video', '12x18 Album (30 Pages)', 'Standard Editing'],
    basePrice: 40000 // Just an example base
  },
  {
    id: 'pkg-premium',
    name: 'Premium Cinematic',
    description: 'Our most popular choice. Beautiful candid moments and cinematic storytelling.',
    features: ['Candid + Traditional Photo', 'Cinematic + Traditional Video', 'Drone (Wedding Day)', '12x36 Premium Album (40 Pages)', 'Short Reels'],
    basePrice: 95000
  },
  {
    id: 'pkg-luxury',
    name: 'Luxury Wedding',
    description: 'Complete uncompromised coverage. The absolute best for your big day.',
    features: ['2 Candid + 2 Traditional Photographers', 'Complete Cinematic Crew', 'Drone (All Events)', 'Live Streaming', 'Same-Day Edit', '3 Premium Albums'],
    basePrice: 'Custom Quote'
  }
];
