import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PhotographyHero = () => {
  const { scrollYProgress } = useScroll();
  // Very slow parallax for the hero image
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-transparent flex items-center justify-center">
      
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop")',
          y: yParallax,
          scale: scaleImage
        }}
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-0 bg-black/40" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]" />
      
      {/* Film Grain & Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noisy.png")' }}></div>

      {/* Light Leaks */}
      <motion.div
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-[10%] w-[50vw] h-[50vw] bg-secondary/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />

      {/* Typography Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-5xl"
        style={{ opacity: opacityText, y: yText }}
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-300 font-light mb-6"
        >
          A Cinematic Experience
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-wide leading-tight drop-shadow-2xl"
        >
          Every Love Story Deserves To Be <br className="hidden md:block"/> 
          <span className="italic text-white/90">Remembered.</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          className="mt-16 flex justify-center"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
      
    </section>
  );
};

export default PhotographyHero;
