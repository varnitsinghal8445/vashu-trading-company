import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const heroImages = [
  '/images/ai-wedding/photography_hero_bg.jpg',
  '/images/ai-wedding/ceremony_large_1790110908785.jpg',
  '/images/ai-wedding/couple_large_1790110935148.jpg',
  '/images/ai-wedding/arrival_large_1790110816035.jpg',
  '/images/ai-wedding/haldi_large_1790110842290.jpg',
  '/images/ai-wedding/family_large_1790110958648.jpg'
];

const PhotographyHero = () => {
  const { scrollYProgress } = useScroll();
  // Very slow parallax for the hero image
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 12000); // Change image every 12 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-transparent flex items-center justify-center">
      
      {/* Background Layers Wrapper - Masked to fade into the page background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      >
        {/* Parallax Background Images Slideshow */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: yParallax,
            scale: scaleImage
          }}
        >
          {heroImages.map((img, index) => {
            const isActive = currentImageIndex === index;
            const isPrev = (currentImageIndex - 1 + heroImages.length) % heroImages.length === index;
            
            let zIndex = 0;
            if (isActive) zIndex = 20;
            else if (isPrev) zIndex = 10;

            return (
              <div
                key={img}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2500ms] ease-in-out"
                style={{ 
                  backgroundImage: `url("${img}")`,
                  opacity: isActive || isPrev ? 1 : 0,
                  zIndex 
                }}
              />
            );
          })}
        </motion.div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Radial gradient to darken only the center behind the text */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.7)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/80" />
        
        {/* Film Grain & Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noisy.png")' }}></div>

        {/* Light Leaks */}
        <motion.div
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{ 
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.5, 1],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-amber-600/10 rounded-full blur-[100px] mix-blend-screen"
        />
      </div>

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
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-wide leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
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
