import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['LOVE', 'FAMILY', 'EMOTIONS', 'CELEBRATION', 'DETAILS', 'CANDIDS'];

const allPhotos = [
  // LOVE
  { id: 1, cat: 'LOVE', src: '/assets/prewedding_album_1_1789587891262.jpg' },
  { id: 2, cat: 'LOVE', src: '/journey_bg_romantic.jpg' },
  { id: 3, cat: 'LOVE', src: '/dreamy_wedding_bg.jpg' },
  
  // FAMILY
  { id: 4, cat: 'FAMILY', src: '/images/ai-wedding/family_large_1790110958648.jpg' },
  { id: 5, cat: 'FAMILY', src: '/images/ai-wedding/haldi_large_1790110842290.jpg' },
  { id: 6, cat: 'FAMILY', src: '/images/ai-wedding/mehndi_large_1790110868877.jpg' },
  
  // EMOTIONS
  { id: 7, cat: 'EMOTIONS', src: '/images/ai-wedding/couple_large_1790110935148.jpg' },
  { id: 8, cat: 'EMOTIONS', src: '/images/ai-wedding/haldi_small_1790110853050.jpg' },
  { id: 9, cat: 'EMOTIONS', src: '/images/ai-wedding/arrival_small_1790110830739.jpg' },
  
  // CELEBRATION
  { id: 10, cat: 'CELEBRATION', src: '/images/ai-wedding/arrival_large_1790110816035.jpg' },
  { id: 11, cat: 'CELEBRATION', src: '/assets/album_story_4_1789587629937.jpg' },
  { id: 12, cat: 'CELEBRATION', src: '/assets/album_story_3_1789587607665.jpg' },
  
  // DETAILS
  { id: 13, cat: 'DETAILS', src: '/assets/album_story_1_1789587460396.jpg' },
  { id: 14, cat: 'DETAILS', src: '/images/ai-wedding/couple_small_1790110948339.jpg' },
  { id: 15, cat: 'DETAILS', src: '/images/ai-wedding/ceremony_small_1790110921505.jpg' },
  
  // CANDIDS
  { id: 16, cat: 'CANDIDS', src: '/images/ai-wedding/family_small_1790110972742.jpg' },
  { id: 17, cat: 'CANDIDS', src: '/images/ai-wedding/haldi_small_1790110853050.jpg' },
  { id: 18, cat: 'CANDIDS', src: '/images/ai-wedding/mehndi_small_1790110882760.jpg' },
];

const PhotographyChooseMoment = () => {
  const [activeTab, setActiveTab] = useState('LOVE');

  const filteredPhotos = allPhotos.filter(photo => photo.cat === activeTab);

  return (
    <section className="bg-transparent py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-6">What do you want to remember?</h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-sm md:text-base font-serif tracking-wide transition-colors duration-300 relative px-2 py-1 ${activeTab === cat ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {cat}
                {activeTab === cat && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 right-0 h-[1px] bg-secondary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="aspect-[4/5] overflow-hidden rounded-sm relative group cursor-pointer"
              >
                <img 
                  src={photo.src} 
                  alt={photo.cat} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default PhotographyChooseMoment;
