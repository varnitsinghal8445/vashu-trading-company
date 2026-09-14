export const categories = [
  'All', 
  'Digital Media & Memory', 
  'Photo Albums & Print Media', 
  'Camera Gear & Accessories', 
  'Wall Decor & Framing', 
  'Personalized Photo Gifts'
];

export const shopProducts = [
  {
    id: 'pa-1',
    name: 'Premium Hardbound Photo Book',
    category: 'Photo Albums & Print Media',
    multiOptions: [
      {
        id: 'size',
        name: 'Album Size',
        choices: ['4 × 6', '5 × 7', '9 × 12', '12 × 36', '14 × 40', '20 × 30']
      },
      {
        id: 'pages',
        name: 'Number of Pages',
        choices: ['20 Pages', '30 Pages', '40 Pages', '50 Pages']
      }
    ],
    pricesByCombination: {
      '4 × 6_20 Pages': 1500,
      '4 × 6_30 Pages': 2200,
      '4 × 6_40 Pages': 2800,
      '4 × 6_50 Pages': 3400,
      
      '5 × 7_20 Pages': 2500,
      '5 × 7_30 Pages': 3500,
      '5 × 7_40 Pages': 4500,
      '5 × 7_50 Pages': 5500,
      
      '9 × 12_20 Pages': 4500,
      '9 × 12_30 Pages': 5500,
      '9 × 12_40 Pages': 6500,
      '9 × 12_50 Pages': 7500,

      '12 × 36_20 Pages': 7000,
      '12 × 36_30 Pages': 8500,
      '12 × 36_40 Pages': 10000,
      '12 × 36_50 Pages': 11500,

      '14 × 40_20 Pages': 9000,
      '14 × 40_30 Pages': 11000,
      '14 × 40_40 Pages': 13000,
      '14 × 40_50 Pages': 15000,

      '20 × 30_20 Pages': 12000,
      '20 × 30_30 Pages': 14500,
      '20 × 30_40 Pages': 17000,
      '20 × 30_50 Pages': 19500
    },
    defaultSize: '9 × 12',
    defaultPages: '20 Pages',
    price: 4500,
    img: '/hardbound-album.jpg'
  },
  {
    id: 'wd-1',
    name: 'Customized Photo Frames',
    category: 'Wall Decor & Framing',
    multiOptions: [
      {
        id: 'material',
        name: 'Frame Material',
        choices: ['Wooden', 'Synthetic', 'Glass', 'Acrylic', 'Canvas Print']
      },
      {
        id: 'size',
        name: 'Frame Size',
        choices: ['4 × 6', '5 × 7', '6 × 8', '10 × 12', '12 × 15', '12 × 18', '12 × 36', '16 × 24', '16 × 20', '20 × 30', '24 × 36']
      }
    ],
    pricesBySize: {
      '4 × 6': 500,
      '5 × 7': 600,
      '6 × 8': 800,
      '10 × 12': 1200,
      '12 × 15': 1500,
      '12 × 18': 1800,
      '12 × 36': 3000,
      '16 × 24': 3200,
      '16 × 20': 2800,
      '20 × 30': 4000,
      '24 × 36': 5000
    },
    imagesByMaterial: {
      'Wooden': '/frame-wooden.jpg',
      'Synthetic': '/frame-synthetic.jpg',
      'Glass': '/frame-glass.jpg',
      'Acrylic': '/frame-acrylic.jpg',
      'Canvas Print': '/frame-canvas.jpg'
    },
    defaultMaterial: 'Wooden',
    defaultSize: '4 × 6',
    price: 500, // fallback
    img: '/frame-wooden.jpg' // fallback
  },
  {
    id: 'pg-2',
    name: 'Magic & Ceramic Photo Mugs',
    category: 'Personalized Photo Gifts',
    price: 450,
    options: ['White Ceramic', 'Black Magic Mug', 'Inside Color'],
    images: {
      'White Ceramic': '/white-mug.jpg',
      'Black Magic Mug': '/black-mug.jpg',
      'Inside Color': '/inside-color-mug.jpg'
    },
    img: '/white-mug.jpg'
  },
  {
    id: 'pg-3',
    name: 'Custom Photo Keychains',
    category: 'Personalized Photo Gifts',
    price: 250,
    options: ['Acrylic Square', 'Metal Heart', 'Wooden Circle'],
    images: {
      'Acrylic Square': '/acrylic-keychain.jpg',
      'Metal Heart': '/metal-heart-keychain.jpg',
      'Wooden Circle': '/wooden-circle-keychain.jpg'
    },
    img: '/acrylic-keychain.jpg' // Default image
  },
  {
    id: 'dm-1',
    name: 'Custom Wooden USB Pendrive',
    category: 'Digital Media & Memory',
    price: 499,
    options: ['16 GB', '32 GB', '64 GB', '128 GB', '256 GB'],
    prices: {
      '16 GB': 499,
      '32 GB': 699,
      '64 GB': 999,
      '128 GB': 1099,
      '256 GB': 1499
    },
    img: '/wooden-pendrive.jpg'
  },
  {
    id: 'dm-2',
    name: 'Metal & Crystal USB Pendrive',
    category: 'Digital Media & Memory',
    price: 499, // default starting price
    options: ['16 GB', '32 GB', '64 GB', '128 GB', '256 GB'],
    prices: {
      '16 GB': 499,
      '32 GB': 699,
      '64 GB': 999,
      '128 GB': 1099,
      '256 GB': 1499
    },
    img: '/metal-pendrive-screenshot.png'
  },
  {
    id: 'cg-2',
    name: 'KingMa Dual USB Charger + 2 Batteries Combo (LP-E6)',
    category: 'Camera Gear & Accessories',
    price: 3500,
    img: '/camera-battery.webp'
  },
  {
    id: 'cg-5',
    name: 'High-Capacity Rechargeable AA Cells + Charger',
    category: 'Camera Gear & Accessories',
    price: 1200,
    img: '/cell-charger.jpg'
  },
  {
    id: 'pa-2',
    name: 'Professional Photo Paper Pack',
    category: 'Photo Albums & Print Media',
    price: 1800,
    options: ['4x6 (Glossy)', '5x7 (Matte)', '8x10 (Velvet)', '12x18 (Metallic)'],
    img: '/photo-paper.webp'
  },

  {
    id: 'cg-1',
    name: 'Original Printer Ink Bottles',
    category: 'Camera Gear & Accessories',
    price: 4800,
    options: ['HP Set (CMYK)', 'Canon Set (CMYK)', 'Epson Set (CMYK)'],
    img: '/ink-bottles.webp'
  },
  {
    id: 'cg-3',
    name: 'Professional Camera Lenses',
    category: 'Camera Gear & Accessories',
    price: 28000,
    options: ['50mm f/1.8 Prime', '35mm f/1.4', '24-70mm f/2.8', '85mm Portrait'],
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop'
  },
  {
    id: 'cg-6',
    name: 'Godox LDP8Bi Bi-Colour On-Camera LED Light Panel',
    category: 'Camera Gear & Accessories',
    price: 2800,
    img: '/camera-light.webp'
  }
];
