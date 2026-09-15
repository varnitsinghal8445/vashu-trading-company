import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const backgrounds = [
  '/dreamy_wedding_bg.jpg',
  '/journey_bg_romantic.jpg',
  '/testimonials-bg.jpg'
];

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);

  // Background slideshow logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(timer);
  }, []);

  // Generate random particles for the magical gold dust effect
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      
      {/* Animated Slideshow Background */}
      <AnimatePresence mode="popLayout">
        <motion.img 
          key={currentBg}
          src={backgrounds[currentBg]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.7, scale: 1.15 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ 
            opacity: { duration: 2.5, ease: "easeInOut" },
            scale: { duration: 12, ease: "linear" }
          }}
          alt="Cinematic Wedding Background" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
      </AnimatePresence>

      {/* Advanced Gradient Overlays for Depth and Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-transparent z-10 pointer-events-none"></div>

      {/* Golden Dust Particles Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, y: "110%", x: "-50%" }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0],
              y: "-10%",
              x: ["-50%", "50%", "-50%"] 
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full bg-[#d4af37]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.left}%`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(212, 175, 55, 0.8)`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <motion.p 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="text-[#d4af37] tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-bold drop-shadow-lg"
        >
          Established 1990
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl"
        >
          36 Years of Turning <br/>
          <span className="italic text-gray-200 font-light relative inline-block mt-2">
            Moments Into Memories.
            {/* Elegant underline animation */}
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
              className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent origin-left"
            ></motion.span>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="text-gray-300 text-base md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          Photography, premium albums, photobooks, frames, printing and digital memories — all beautifully crafted under one roof.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            to="/book-now" 
            className="group relative px-10 py-4 bg-[#d4af37] overflow-hidden rounded-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative text-[#0a0a0a] uppercase tracking-[0.2em] text-xs font-bold z-10">
              Book a Photographer
            </span>
          </Link>
          <Link 
            to="/services" 
            className="px-10 py-4 border border-white/30 text-white uppercase tracking-[0.2em] text-xs font-bold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors rounded-sm bg-black/20 backdrop-blur-sm"
          >
            Explore Our Work
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
