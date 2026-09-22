import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const PhotographyVideoFilm = () => {
  return (
    <section className="bg-transparent py-24 md:py-32 border-t border-white/5">
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
          className="relative w-full aspect-video max-w-5xl mx-auto rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
        >
          <video 
            className="w-full h-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster="/cinematic-wedding-memories-bg-v2.jpg"
          >
            <source src="/assets/wedding-highlight.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

      </div>
    </section>
  );
};

export default PhotographyVideoFilm;
