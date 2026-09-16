import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const PhotographyVideoFilm = () => {
  return (
    <section className="bg-[#050505] py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-white mb-6"
          >
            Relive the Day.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto font-light"
          >
            We don’t just photograph weddings. We preserve the feeling of them. Watch a glimpse of the cinematic memories we create.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-full aspect-video max-w-5xl mx-auto rounded-lg overflow-hidden group cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
        >
          {/* Placeholder Image for Video */}
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop" 
            alt="Wedding Film" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out grayscale-[20%] group-hover:grayscale-0"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noisy.png")' }}></div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" fill="white" />
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default PhotographyVideoFilm;
