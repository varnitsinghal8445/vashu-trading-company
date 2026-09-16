import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const paperOptions = [
  { id: 'glossy', name: 'Glossy', desc: 'High reflection, vibrant colors' },
  { id: 'hd-glossy', name: 'HD Glossy', desc: 'Ultimate photographic clarity' },
  { id: 'matte', name: 'Matte', desc: 'Soft diffused elegant surface' },
  { id: 'ntr', name: 'NTR', desc: 'Premium textured feel' },
  { id: 'heavy-ntr', name: 'Heavy NTR', desc: 'Thick, profound texture' },
  { id: 'embossed', name: 'Embossed', desc: 'Visible raised depth' },
];

const finishOptions = [
  { id: 'normal', name: 'Normal', desc: 'Standard archival finish' },
  { id: '3d', name: '3D', desc: 'Realistic cover depth' },
  { id: 'sparkle', name: 'Sparkle', desc: 'Subtle light catching particles' },
  { id: 'velvet', name: 'Velvet', desc: 'Soft fabric-like touch' },
  { id: 'holography', name: 'Holography', desc: 'Iridescent light sweep' },
];

const AlbumConfigurator = () => {
  const [selectedPaper, setSelectedPaper] = useState(paperOptions[2]); // Default Matte
  const [selectedFinishes, setSelectedFinishes] = useState([finishOptions[0]]); // Default Normal

  const toggleFinish = (finish) => {
    if (finish.id === 'normal') {
      setSelectedFinishes([finishOptions[0]]);
      return;
    }
    
    let newFinishes = selectedFinishes.filter(f => f.id !== 'normal');
    const exists = newFinishes.find(f => f.id === finish.id);
    
    if (exists) {
      newFinishes = newFinishes.filter(f => f.id !== finish.id);
      if (newFinishes.length === 0) newFinishes = [finishOptions[0]];
    } else {
      newFinishes.push(finish);
    }
    
    setSelectedFinishes(newFinishes);
  };

  const hasFinish = (id) => selectedFinishes.some(f => f.id === id);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8 z-10 font-sans">
      
      {/* Title */}
      <div className="text-center mb-24">
        <h2 className="text-sm tracking-[0.3em] uppercase text-secondary font-bold mb-4">Build Your Album</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-white">Interactive Album Studio</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Controls */}
        <div className="lg:col-span-4 flex flex-col space-y-16">
          
          {/* Paper Selection */}
          <div>
            <h4 className="text-2xl font-serif text-white mb-6">Choose Your Paper</h4>
            <div className="space-y-3">
              {paperOptions.map(paper => (
                <motion.div
                  key={paper.id}
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedPaper(paper)}
                  className={`group relative p-4 cursor-pointer border-l-2 transition-all duration-300 ${
                    selectedPaper.id === paper.id ? 'border-secondary bg-white/5' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-sm uppercase tracking-widest font-semibold ${selectedPaper.id === paper.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                      {paper.name}
                    </span>
                    {selectedPaper.id === paper.id && <motion.div layoutId="check-paper"><Check size={16} className="text-secondary" /></motion.div>}
                  </div>
                  <AnimatePresence>
                    {selectedPaper.id === paper.id && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-gray-500 font-light mt-2"
                      >
                        {paper.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Finish Selection */}
          <div>
            <h4 className="text-2xl font-serif text-white mb-6">Choose Your Finish <span className="text-xs font-sans text-gray-500 uppercase tracking-widest ml-2">(Combine options)</span></h4>
            <div className="space-y-3">
              {finishOptions.map(finish => (
                <motion.div
                  key={finish.id}
                  whileHover={{ x: 5 }}
                  onClick={() => toggleFinish(finish)}
                  className={`group relative p-4 cursor-pointer border-l-2 transition-all duration-300 ${
                    hasFinish(finish.id) ? 'border-secondary bg-white/5' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-sm uppercase tracking-widest font-semibold ${hasFinish(finish.id) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                      {finish.name}
                    </span>
                    {hasFinish(finish.id) && <motion.div layoutId={`check-finish-${finish.id}`}><Check size={16} className="text-secondary" /></motion.div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 3D Visualizer */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[600px] perspective-[2000px]">
          
          {/* Selected Combo Display */}
          <div className="absolute top-0 w-full text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2">Your Combination</p>
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm md:text-base font-serif">
              <span className="text-white">{selectedPaper.name}</span>
              <span className="text-secondary mx-2">+</span>
              {selectedFinishes.map((f, i) => (
                <React.Fragment key={f.id}>
                  <span className="text-gray-300">{f.name}</span>
                  {i < selectedFinishes.length - 1 && <span className="text-secondary mx-2">&</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 3D Mockup Container */}
          <motion.div 
            className="relative w-full max-w-[500px] aspect-[4/3] preserve-3d mt-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            animate={{ rotateX: 20, rotateY: -15, rotateZ: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            whileHover={{ rotateY: -5, rotateX: 10 }}
          >
            {/* The Album Cover */}
            <div 
              className="absolute inset-0 bg-cover bg-center rounded-sm border border-white/10 overflow-hidden transform-style-3d"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop")' }}
            >
              
              {/* Dark overlay to ensure text visibility and texture blending */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Paper Texture Overlay */}
              <div className={`absolute inset-0 transition-opacity duration-1000 mix-blend-overlay ${selectedPaper.id.includes('ntr') ? 'opacity-40' : 'opacity-10'}`} 
                   style={{ backgroundImage: selectedPaper.id.includes('ntr') ? 'url("https://www.transparenttextures.com/patterns/leather.png")' : 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}>
              </div>

              {/* Glossy Reflection */}
              {selectedPaper.id.includes('glossy') && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60 mix-blend-screen pointer-events-none transform -skew-x-12 translate-x-[-100%] animate-[shine_4s_infinite]"></div>
              )}

              {/* Embossed Depth */}
              {selectedPaper.id === 'embossed' && (
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"></div>
              )}

              {/* FINISH: Holography */}
              {hasFinish('holography') && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-cyan-500/20 mix-blend-screen opacity-60 pointer-events-none animate-[shine_6s_infinite_linear]"></div>
              )}

              {/* FINISH: Sparkle */}
              {hasFinish('sparkle') && (
                <div className="absolute inset-0 mix-blend-screen opacity-50" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
              )}
              
              {/* FINISH: Velvet */}
              {hasFinish('velvet') && (
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-felt.png")' }}></div>
              )}

              {/* Cover Artwork/Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-3/4 h-1/2 border ${hasFinish('3d') ? 'border-secondary/80 shadow-[2px_2px_10px_rgba(203,162,88,0.5)] translate-z-[10px]' : 'border-white/20'} flex items-center justify-center transition-all duration-700`}>
                   <div className="text-center">
                     <h5 className={`font-serif text-2xl tracking-widest ${hasFinish('3d') ? 'text-secondary drop-shadow-lg' : 'text-white/60'} transition-all`}>V & S</h5>
                     <p className="text-[8px] uppercase tracking-[0.4em] text-white/40 mt-2">Premium Album</p>
                   </div>
                </div>
              </div>

            </div>

            {/* Album Pages Edge (Thickness) */}
            <div className="absolute right-[-20px] top-[10px] w-[20px] h-full bg-[#efefef] rounded-r-sm transform origin-left rotate-y-90 border-y border-r border-black/20 flex flex-col justify-evenly">
              {/* Lines to simulate pages */}
              {[...Array(15)].map((_, i) => <div key={i} className="w-full h-[1px] bg-black/10"></div>)}
            </div>

            {/* Bottom Edge */}
            <div className="absolute bottom-[-10px] left-[10px] w-full h-[10px] bg-[#dfdfdf] rounded-b-sm transform origin-top rotate-x-[-90deg] border-x border-b border-black/20"></div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default AlbumConfigurator;
