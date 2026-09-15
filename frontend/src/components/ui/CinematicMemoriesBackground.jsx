import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// A collection of elegant wedding/memory images to float
const memoryImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1000&auto=format&fit=crop',
];

const CinematicMemoriesBackground = () => {
  // Generate random properties for floating images
  const floatingMemories = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const isForeground = Math.random() > 0.7;
      const isBackground = Math.random() < 0.3;
      
      let scale, blur, opacity, zIndex;
      
      if (isForeground) {
        scale = Math.random() * 0.5 + 0.8; // Large
        blur = Math.random() * 2; // Very slight blur
        opacity = Math.random() * 0.15 + 0.05; // Low opacity so it doesn't distract
        zIndex = 30;
      } else if (isBackground) {
        scale = Math.random() * 0.3 + 0.2; // Small
        blur = Math.random() * 8 + 4; // High blur
        opacity = Math.random() * 0.3 + 0.1;
        zIndex = 10;
      } else {
        scale = Math.random() * 0.4 + 0.4; // Medium
        blur = Math.random() * 4 + 1; // Medium blur
        opacity = Math.random() * 0.2 + 0.05;
        zIndex = 20;
      }

      return {
        id: i,
        src: memoryImages[i % memoryImages.length],
        scale,
        blur,
        opacity,
        zIndex,
        initialX: `${Math.random() * 100}%`,
        initialY: `${Math.random() * 120 - 10}%`,
        targetX: `${Math.random() * 100}%`,
        targetY: `${Math.random() * 120 - 10}%`,
        rotation: Math.random() * 40 - 20,
        duration: Math.random() * 60 + 60, // Very slow (60-120 seconds)
        delay: Math.random() * -60, // Start at different times
      };
    });
  }, []);

  // Generate dust particles
  const dustParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none">
      
      {/* Base Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black z-0"></div>

      {/* Floating Memories (Images) */}
      <div className="absolute inset-0 z-10">
        {floatingMemories.map((memory) => (
          <motion.div
            key={memory.id}
            initial={{ 
              x: memory.initialX, 
              y: memory.initialY, 
              rotate: memory.rotation,
              opacity: 0
            }}
            animate={{ 
              x: [memory.initialX, memory.targetX, memory.initialX],
              y: [memory.initialY, memory.targetY, memory.initialY],
              rotate: [memory.rotation, memory.rotation + 15, memory.rotation],
              opacity: [0, memory.opacity, memory.opacity, 0]
            }}
            transition={{
              duration: memory.duration,
              delay: memory.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/5 rounded-sm overflow-hidden"
            style={{
              width: `${memory.scale * 300}px`,
              height: `${memory.scale * 400}px`,
              filter: `blur(${memory.blur}px) grayscale(30%) sepia(20%)`,
              zIndex: memory.zIndex
            }}
          >
            <img src={memory.src} alt="" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-black/30 mix-blend-overlay"></div>
          </motion.div>
        ))}
      </div>

      {/* Champagne Gold Light Leaks */}
      <div className="absolute inset-0 z-20 mix-blend-screen opacity-30">
        <motion.div 
          animate={{ 
            x: ['-50%', '50%', '-50%'], 
            y: ['-20%', '20%', '-20%'],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[600px] bg-[#d4af37]/20 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            x: ['50%', '-50%', '50%'], 
            y: ['20%', '-20%', '20%'],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[800px] bg-[#ffd700]/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Cinematic Dust Particles */}
      <div className="absolute inset-0 z-30">
        {dustParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, y: particle.top, x: particle.left }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [`${parseFloat(particle.top)}%`, `${parseFloat(particle.top) - 20}%`],
              x: [`${parseFloat(particle.left)}%`, `${parseFloat(particle.left) + (Math.random() * 10 - 5)}%`] 
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full bg-[#ffeedd]"
            style={{
              width: particle.size,
              height: particle.size,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255, 238, 221, 0.4)`
            }}
          />
        ))}
      </div>

      {/* Center Dark Vignette to protect text readability */}
      <div className="absolute inset-0 z-40 bg-radial-gradient from-transparent via-black/40 to-black pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 70%, black 100%)' }}></div>
      <div className="absolute inset-0 z-40 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none"></div>

    </div>
  );
};

export default CinematicMemoriesBackground;
