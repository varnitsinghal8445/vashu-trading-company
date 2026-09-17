import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PhotographyCTA = () => {
  return (
    <section className="bg-transparent py-32 relative overflow-hidden flex items-center justify-center text-center">
      
      {/* Background with slight gradient to transition to footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111]" />
      
      <div className="relative z-10 px-4 max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 mb-8"
        >
          Your wedding will last a day.
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-white mb-12 italic"
        >
          Your memories should last forever.
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            to="/contact"
            className="group relative px-8 py-4 bg-white text-[#050505] overflow-hidden rounded-sm transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center font-serif text-lg">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <Link 
            to="/albums"
            className="px-8 py-4 bg-transparent border border-white/20 text-white hover:bg-white/5 transition-colors rounded-sm font-serif text-lg"
          >
            Explore Albums
          </Link>
        </motion.div>
      </div>

    </section>
  );
};

export default PhotographyCTA;
