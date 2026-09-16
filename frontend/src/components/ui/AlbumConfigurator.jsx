import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AlbumConfigurator = () => {
  // Configurator Options
  const coverOptions = ['Linen', 'Leather', 'Hard Cover', 'Photo Cover'];
  const pagesOptions = ['Thick Matte', 'Fine Art', 'Premium Gloss'];
  const finishOptions = ['Matte', 'Gloss', 'Velvet'];

  // State
  const [selectedCover, setSelectedCover] = useState(coverOptions[0]);
  const [selectedPages, setSelectedPages] = useState(pagesOptions[0]);
  const [selectedFinish, setSelectedFinish] = useState(finishOptions[0]);
  const [isOpen, setIsOpen] = useState(false);

  // Trigger opening animation on mount/scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // Wait 1.5s then open
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 z-10">
      
      {/* 3D Visual Mockup Area */}
      <div className="lg:col-span-8 flex items-center justify-center min-h-[500px] relative perspective-[2000px]">
        {/* Soft light halo behind album */}
        <div className="absolute inset-0 bg-secondary/10 blur-[100px] rounded-full scale-75" />
        
        {/* The Album */}
        <motion.div 
          className="relative w-full max-w-[600px] aspect-[3/2] preserve-3d"
          animate={{
            rotateX: isOpen ? 15 : 25,
            rotateY: isOpen ? -10 : -20,
            z: isOpen ? 50 : 0
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* Cover Layer (Rotates open) */}
          <motion.div 
            className="absolute inset-y-0 left-0 w-1/2 origin-left shadow-2xl preserve-3d z-20"
            animate={{ rotateY: isOpen ? -170 : 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          >
            {/* Front of Cover */}
            <div 
              className="absolute inset-0 bg-[#2a2a2a] rounded-l-md border-r border-white/10 backface-hidden flex items-center justify-center overflow-hidden"
            >
               {/* Dynamic Texture based on selection */}
               <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{
                 backgroundImage: selectedCover === 'Leather' ? 'url("https://www.transparenttextures.com/patterns/leather.png")' :
                                  selectedCover === 'Linen' ? 'url("https://www.transparenttextures.com/patterns/linen.png")' : 'none'
               }}></div>
               <div className="w-[60%] h-[40%] border border-white/20 rounded flex items-center justify-center">
                  <span className="font-serif text-white/50 tracking-widest text-sm">OUR STORY</span>
               </div>
            </div>
            {/* Inside of Cover */}
            <div className="absolute inset-0 bg-[#1a1a1a] rounded-l-md border-r border-black/50 rotate-y-180 backface-hidden shadow-inner"></div>
          </motion.div>

          {/* Pages Layer (Right side of open book) */}
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[#efefef] rounded-r-md shadow-xl z-10 overflow-hidden flex flex-col justify-center border-l border-black/10">
            {/* Page texture/finish effect */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${selectedFinish === 'Gloss' ? 'opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent mix-blend-overlay' : 'opacity-0'}`}></div>
            
            {/* Mock Content */}
            <AnimatePresence mode='wait'>
              <motion.div 
                key={selectedPages + selectedFinish}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-4 bg-gray-300 shadow-inner bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop")'}}
              />
            </AnimatePresence>
          </div>

          {/* Spine (visible when closed, hidden when open mostly) */}
          <div className="absolute inset-y-0 left-1/2 w-4 -ml-2 bg-[#1a1a1a] transform rotate-y-90 origin-left backface-hidden"></div>

        </motion.div>
      </div>

      {/* Interactive Controls Area */}
      <div className="lg:col-span-4 flex flex-col justify-center space-y-10">
        <div>
          <h2 className="text-3xl font-serif text-white mb-2">Design Your Album</h2>
          <p className="text-gray-400 font-light text-sm">Customize every detail of your luxury memory collection.</p>
        </div>

        {/* Cover Options */}
        <div>
          <h3 className="text-xs font-bold tracking-widest text-secondary uppercase mb-4">1. The Cover</h3>
          <div className="flex flex-wrap gap-3">
            {coverOptions.map(opt => (
              <button 
                key={opt}
                onClick={() => setSelectedCover(opt)}
                className={`px-4 py-2 text-sm rounded border transition-all duration-300 ${selectedCover === opt ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Pages Options */}
        <div>
          <h3 className="text-xs font-bold tracking-widest text-secondary uppercase mb-4">2. The Pages</h3>
          <div className="flex flex-wrap gap-3">
            {pagesOptions.map(opt => (
              <button 
                key={opt}
                onClick={() => setSelectedPages(opt)}
                className={`px-4 py-2 text-sm rounded border transition-all duration-300 ${selectedPages === opt ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Finish Options */}
        <div>
          <h3 className="text-xs font-bold tracking-widest text-secondary uppercase mb-4">3. The Finish</h3>
          <div className="flex flex-wrap gap-3">
            {finishOptions.map(opt => (
              <button 
                key={opt}
                onClick={() => setSelectedFinish(opt)}
                className={`px-4 py-2 text-sm rounded border transition-all duration-300 ${selectedFinish === opt ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AlbumConfigurator;
