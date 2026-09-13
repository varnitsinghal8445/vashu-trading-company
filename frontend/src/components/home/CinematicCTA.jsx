import { motion } from 'framer-motion';
import { familyContactConfig } from '../../config/contactConfig';
import cinematicBg from '../../assets/cinematic-bg.jpg';
import { useState, useEffect } from 'react';

const CinematicCTA = () => {
  // Generate random floating particles
  const [particles] = useState(() => 
    Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${Math.random() * 4 + 1}px`,
    }))
  );

  return (
    <section className="relative w-full h-[600px] sm:h-[700px] overflow-hidden bg-[#0d0d0d]">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={cinematicBg} 
          alt="Dark Moody Night Wedding Venue" 
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        {/* Seamless Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-black/60 to-[#0d0d0d] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0d0d0d] z-10"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p, i) => (
          <div 
            key={i}
            className="absolute bg-secondary/40 rounded-full animate-particle blur-[1px]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay
            }}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full h-full flex items-center pr-[120px] sm:pr-[300px]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full text-center px-4 sm:px-12 lg:px-24"
        >
          {/* Luxury Gold Foil Heading with Light Sweep */}
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-serif mb-6 tracking-wide relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d4af37] via-[#fff5d1] to-[#d4af37] animate-shine">
              Ready to Capture Your Story?
            </span>
          </h2>
          <p className="text-gray-300 font-light text-lg md:text-xl max-w-2xl mx-auto mb-12 drop-shadow-md">
            Let our experienced team preserve your memories with the care they deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href={`tel:+${familyContactConfig.general.phoneRaw}`}
              className="bg-black/40 backdrop-blur-md border border-secondary/30 text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-secondary hover:text-black hover:border-secondary transition-all duration-500 w-full sm:w-auto text-center shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine z-0"></div>
              <span className="relative z-10">BOOK NOW</span>
            </a>
            <a 
              href={`https://wa.me/${familyContactConfig.general.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-white/10 hover:border-white transition-all duration-500 w-full sm:w-auto text-center shadow-[0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine z-0"></div>
              <span className="relative z-10">WHATSAPP US</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Side Panel (Right Grid) - High Impact B&W */}
      <div className="absolute top-0 right-0 h-full w-[120px] sm:w-[280px] z-20 bg-black/80 shadow-[-30px_0_60px_rgba(0,0,0,0.8)] border-l border-white/5 overflow-hidden">
        <div className="flex flex-col h-full w-full p-3 sm:p-5 gap-4">
          
          {/* Box 1: Bride's Ring Close-Up */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="flex-1 w-full relative overflow-hidden border border-secondary/40 shadow-[0_0_15px_rgba(212,175,55,0.1)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 5, ease: "linear" }}
              src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&auto=format&fit=crop&q=80" 
              alt="Bride ring closeup" 
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 relative z-0"
            />
          </motion.div>

          {/* Box 2: Emotional Couple Moment */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="flex-1 w-full relative overflow-hidden border border-secondary/40 shadow-[0_0_15px_rgba(212,175,55,0.1)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 5, ease: "linear" }}
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80" 
              alt="Emotional couple moment" 
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 relative z-0"
            />
          </motion.div>

          {/* Box 3: Royal Venue Setup */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="flex-1 w-full relative overflow-hidden border border-secondary/40 shadow-[0_0_15px_rgba(212,175,55,0.1)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 5, ease: "linear" }}
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&auto=format&fit=crop&q=80" 
              alt="Royal venue setup" 
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 relative z-0"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CinematicCTA;
