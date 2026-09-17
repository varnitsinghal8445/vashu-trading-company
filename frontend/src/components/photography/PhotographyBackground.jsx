import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PhotographyBackground = () => {
  // Generate random particles for a romantic bokeh/dust/petal effect
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 8 + 3, // px
      duration: Math.random() * 25 + 15, // seconds
      delay: Math.random() * 15,
      type: Math.random() > 0.8 ? 'sparkle' : 'bokeh'
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
      {/* Very romantic, unique cinematic background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop")',
          filter: 'blur(5px) brightness(0.7)'
        }}
      />
      
      {/* Gradient overlays to ensure text remains highly readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#0a0505]/60 to-[#050505]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/15 via-transparent to-transparent opacity-40" />

      {/* Floating Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full pointer-events-none ${particle.type === 'sparkle' ? 'bg-white shadow-[0_0_10px_white]' : 'bg-secondary/20 blur-[2px]'}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: particle.type === 'sparkle' ? [0, 1, 0] : [0, 0.6, 0],
            scale: particle.type === 'sparkle' ? [1, 1.5, 1] : [1, 2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Animated Light Leaks */}
      <motion.div
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] bg-secondary/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute -bottom-1/4 -left-1/4 w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />
    </div>
  );
};

export default PhotographyBackground;
