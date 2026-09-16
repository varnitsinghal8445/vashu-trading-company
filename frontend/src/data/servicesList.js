export const serviceCategories = [
  { id: 'capture', label: 'CAPTURE', description: 'Photographic documentation of your moments.' },
  { id: 'films', label: 'FILMS', description: 'Cinematic storytelling through motion.' },
  { id: 'memories', label: 'MEMORIES', description: 'Physical and digital keepsakes.' },
  { id: 'experience', label: 'EXPERIENCE', description: 'Unique perspectives and fast turnarounds.' }
];

export const allServices = [
  // FILMS
  {
    id: 'wedding-films',
    category: 'films',
    title: 'Wedding Films',
    shortDesc: 'Your wedding day, transformed into a cinematic story you\'ll want to watch again and again.',
    longDesc: 'Our wedding films go beyond simple videography. We craft a narrative-driven cinematic experience, meticulously editing the most emotional, joyous, and significant moments of your celebration into a timeless movie.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
    video: '/assets/wedding-films-bg.mp4',
    features: ['Multi-camera setup', 'Cinematic color grading', 'Professional audio capture', '30-45 minute feature length'],
    startingPrice: '₹50,000',
    builderTarget: 'services' // Where it routes in the builder
  },
  {
    id: 'cinematic-wedding-video',
    category: 'films',
    title: 'Cinematic Wedding Video',
    shortDesc: 'Not just a video — a cinematic film crafted from your most meaningful moments.',
    longDesc: 'A shorter, highly stylized representation of your wedding day. We focus on dramatic lighting, artistic composition, and emotional music to create a breathtaking highlight reel.',
    image: 'https://images.unsplash.com/photo-1583939000340-c6e73680fa2a?q=80&w=2070&auto=format&fit=crop',
    video: '/assets/cinematic-wedding-video.mp4',
    features: ['5-10 minute highlight film', 'Artistic transitions', 'Licensed music', '4K Delivery'],
    startingPrice: '₹35,000',
    builderTarget: 'services'
  },
  {
    id: 'love-story-film',
    category: 'films',
    title: 'Couple Story / Love Story Film',
    shortDesc: 'Your journey, your personalities, your story — captured as a film that\'s uniquely yours.',
    longDesc: 'A documentary-style film detailing how you met, your favorite moments, and your journey to the altar. Perfect for playing at your reception or sharing with family.',
    image: 'https://images.unsplash.com/photo-1522851496357-55097fdbd5bb?q=80&w=2070&auto=format&fit=crop',
    features: ['Interviews with the couple', 'Lifestyle b-roll', 'Custom script/narrative', 'Location scouting'],
    startingPrice: '₹25,000',
    builderTarget: 'prewedding'
  },
  {
    id: 'wedding-teaser',
    category: 'films',
    title: 'Wedding Teaser',
    shortDesc: 'A short cinematic glimpse of your story, designed to make you want to watch the full film.',
    longDesc: 'Delivered shortly after your wedding, this 60-second teaser is perfect for social media, giving a high-energy or deeply emotional sneak peek of your final wedding film.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop',
    video: '/assets/wedding-teaser.mp4',
    features: ['60-second duration', 'Fast delivery', 'Social media optimized format', 'Dynamic editing'],
    startingPrice: '₹15,000',
    builderTarget: 'services'
  },
  {
    id: 'haldi-film',
    category: 'films',
    title: 'Haldi Ceremony Film',
    shortDesc: 'A vibrant and playful cinematic capture of your beautiful Haldi moments.',
    longDesc: 'The Haldi ceremony is full of colors, laughter, and playful moments. We create a dedicated mini-film focusing purely on the vibrant energy of this beautiful tradition.',
    image: 'https://images.unsplash.com/photo-1627555694723-1eeaa4847e00?q=80&w=2070&auto=format&fit=crop',
    features: ['Vibrant color grading', 'Candid captures', 'Emotional moments', 'Slow-motion highlights'],
    startingPrice: '₹12,000',
    builderTarget: 'services'
  },
  {
    id: 'birthday-film',
    category: 'films',
    title: 'Birthday Cinematic Film',
    shortDesc: 'Celebrate your special day with a joyful and vibrant cinematic video.',
    longDesc: 'From the cake cutting to the late-night dancing, we capture the joy and energy of your birthday celebration in a high-quality cinematic film.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8892bf309c?q=80&w=2070&auto=format&fit=crop',
    features: ['Event coverage', 'Highlight reel', 'Fun transitions', 'Upbeat licensed music'],
    startingPrice: '₹10,000',
    builderTarget: 'services'
  },

  // CAPTURE
  {
    id: 'pre-wedding-shoot',
    category: 'capture',
    title: 'Pre-Wedding Shoot',
    shortDesc: 'Beautiful locations, real emotions, and your story captured before the big day.',
    longDesc: 'A dedicated session to capture your chemistry in a relaxed, stunning environment. From epic landscapes to intimate indoor setups, we craft images that celebrate your unique bond.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    video: '/pre-wedding.mp4',
    features: ['Multiple locations', 'Outfit changes', 'Styling assistance', 'High-res retouched images'],
    startingPrice: '₹20,000',
    builderTarget: 'prewedding'
  },
  {
    id: 'candid-photography',
    category: 'capture',
    title: 'Candid Photography',
    shortDesc: 'Real smiles. Real emotions. Real moments — captured without asking you to pose.',
    longDesc: 'We blend into the background to capture the genuine, unscripted moments of your celebration. The laughter, the tears, and the stolen glances—preserved forever.',
    image: 'https://imgs.search.brave.com/5hJP_DSOZ2G_t0FTVMf_OI6eRkDfhQKe1JCwEzfpChw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YnJpdHRhbnluaWVo/YXVzcGhvdG9ncmFw/aHkuY2Evd3AtY29u/dGVudC91cGxvYWRz/LzIwMjUvMDkvbXkt/YXBwcm9hY2gtdG8t/Y2FuZGlkLXBob3Rv/Z3JhcGh5LTQtMTAy/NHg2ODMuanBn',
    features: ['Unobtrusive coverage', 'Photojournalistic approach', 'Emotionally driven', 'Extensive digital gallery'],
    startingPrice: '₹25,000',
    builderTarget: 'services'
  },
  {
    id: 'traditional-photography',
    category: 'capture',
    title: 'Traditional Photography',
    shortDesc: 'Every important ritual, family moment, and tradition captured beautifully.',
    longDesc: 'Ensuring that every guest, every ritual, and every family member is documented clearly and beautifully. The classic approach that guarantees no important moment is missed.',
    image: 'https://imgs.search.brave.com/zJ5ZZBd6zX07gUZvIGepilMvH_wYSjbzHdu6WCH6uJ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ha3No/aXRwaG90b2dyYXBo/eS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjIvMDUvNjU4/QTA5NTktNzY4eDUx/Mi5qcGc',
    features: ['Stage coverage', 'Group portraits', 'Ritual documentation', 'Comprehensive lighting setup'],
    startingPrice: '₹15,000',
    builderTarget: 'services'
  },

  // MEMORIES
  {
    id: 'open-book-album',
    category: 'memories',
    title: 'Open Book Album',
    shortDesc: 'Turn your favourite memories into a premium album made to be opened, shared, and remembered.',
    longDesc: 'Our luxury lay-flat albums are handcrafted using premium archival paper and binding materials. Designed to be a family heirloom passed down through generations.',
    image: 'https://images.unsplash.com/photo-1628123984606-d248ef98cf29?q=80&w=2070&auto=format&fit=crop',
    features: ['Lay-flat binding', 'Archival quality paper', 'Custom cover designs', 'Curated layouts'],
    startingPrice: '₹12,000',
    builderTarget: 'albums'
  },
  {
    id: 'photo-slideshow',
    category: 'memories',
    title: 'Photo Slideshow / Memory Film',
    shortDesc: 'Your photographs brought to life through music, motion, and storytelling.',
    longDesc: 'A beautifully paced slideshow of your best photographs, set to emotional music. A wonderful way to experience your wedding gallery as a continuous story.',
    image: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2080&auto=format&fit=crop',
    features: ['Custom music selection', 'Elegant transitions', 'Chronological storytelling', 'HD Video delivery'],
    startingPrice: '₹5,000',
    builderTarget: 'services'
  },

  // EXPERIENCE
  {
    id: 'same-day-edit',
    category: 'experience',
    title: 'Same-Day Edit',
    shortDesc: 'Relive today\'s most beautiful moments before the celebration even ends.',
    longDesc: 'Our editing team works on-site during your wedding to produce a breathtaking highlight film that is played for you and your guests at the reception.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop',
    features: ['On-site dedicated editor', 'Reception screening', 'High emotional impact', 'Immediate gratification'],
    startingPrice: '₹30,000',
    builderTarget: 'services'
  },
  {
    id: 'wedding-reels',
    category: 'experience',
    title: 'Wedding Reels & Short Films',
    shortDesc: 'Fast, emotional, shareable stories made for Instagram, Reels, and memories.',
    longDesc: 'Vertical cinematic edits optimized specifically for modern social media platforms. Fast-paced, trendy, and instantly shareable with your friends and followers.',
    image: 'https://images.unsplash.com/photo-1516962080544-eac695c93791?q=80&w=2070&auto=format&fit=crop',
    features: ['9:16 Vertical format', 'Trending audio integration', 'Fast cuts', 'Optimized for mobile'],
    startingPrice: '₹10,000',
    builderTarget: 'services'
  },
  {
    id: 'drone-cinematography',
    category: 'experience',
    title: 'Drone Photography & Cinematography',
    shortDesc: 'See your celebration from a completely different perspective.',
    longDesc: 'Breathtaking aerial views of your wedding venue, outdoor ceremonies, and grand entrances. Adds a massive cinematic scale to your final wedding film.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop',
    features: ['Licensed drone operators', '4K Aerial footage', 'Venue showcases', 'Creative angles'],
    startingPrice: '₹15,000',
    builderTarget: 'services'
  }
];
