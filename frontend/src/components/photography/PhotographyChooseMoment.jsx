import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['LOVE', 'FAMILY', 'EMOTIONS', 'CELEBRATION', 'DETAILS', 'CANDIDS'];

const allPhotos = [
  { id: 1, cat: 'LOVE', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop' },
  { id: 2, cat: 'FAMILY', src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop' },
  { id: 3, cat: 'EMOTIONS', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
  { id: 4, cat: 'CELEBRATION', src: 'https://images.unsplash.com/photo-1530103862676-de8892bf30b8?q=80&w=800&auto=format&fit=crop' },
  { id: 5, cat: 'DETAILS', src: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop' },
  { id: 6, cat: 'CANDIDS', src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop' },
  { id: 7, cat: 'LOVE', src: 'https://images.unsplash.com/photo-1538356111053-748a48e1acb8?q=80&w=800&auto=format&fit=crop' },
  { id: 8, cat: 'FAMILY', src: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=800&auto=format&fit=crop' },
  { id: 9, cat: 'EMOTIONS', src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop' },
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
