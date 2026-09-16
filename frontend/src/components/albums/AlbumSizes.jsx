import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sizes = [
  { w: 12, h: 9, label: '9x12' },
  { w: 20, h: 16, label: '16x20' },
  { w: 24, h: 12, label: '12x24 (Panoramic)' },
  { w: 24, h: 16, label: '16x24' },
  { w: 30, h: 20, label: '20x30' },
  { w: 36, h: 12, label: '12x36 (Panoramic)' },
  { w: 36, h: 24, label: '24x36' },
];

const AlbumSizes = () => {
  const [hoveredSize, setHoveredSize] = useState(sizes[0]); // Default 9x12

  // Find max dimension for scaling
  const maxDim = 36;
  const basePixels = 300; // Base width for max dimension

  return (
    <section className="relative z-10 py-32 bg-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h2 className="text-sm tracking-[0.3em] uppercase text-secondary font-bold mb-4">Formats</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white">Sizes & Dimensions</h3>
          <p className="text-gray-400 font-light mt-4 max-w-xl mx-auto">
            From intimate pocket books to grand panoramic spreads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Size List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {sizes.map((s, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredSize(s)}
                className={`p-4 border text-center cursor-pointer transition-all duration-300 ${
                  hoveredSize.label === s.label 
                    ? 'border-secondary bg-white/5 text-white' 
                    : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                }`}
              >
                <span className="font-serif text-lg tracking-widest">{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Right: Proportional Visualizer */}
          <div className="flex flex-col items-center justify-center h-[500px] border border-white/5 bg-black/50 rounded-sm relative">
            <p className="absolute top-8 text-xs uppercase tracking-widest text-gray-500">Visual Scale</p>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredSize.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white/10 border border-secondary flex items-center justify-center shadow-[0_0_40px_rgba(203,162,88,0.1)]"
                style={{
                  width: `${(hoveredSize.w / maxDim) * basePixels}px`,
                  height: `${(hoveredSize.h / maxDim) * basePixels}px`,
                }}
              >
                <div className="absolute -left-12 text-secondary text-sm tracking-widest -rotate-90 origin-right">
                  {hoveredSize.h}"
                </div>
                <div className="absolute -bottom-8 text-secondary text-sm tracking-widest">
                  {hoveredSize.w}"
                </div>
                
                <span className="font-serif text-white/50 text-xl tracking-widest">{hoveredSize.label}</span>
              </motion.div>
            </AnimatePresence>
            
            {/* Context human silhouette or hand could go here to show true scale, for now abstract scale */}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AlbumSizes;
