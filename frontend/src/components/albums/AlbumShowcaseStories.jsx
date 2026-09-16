import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Replace these with your actual album images
const storyImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607557165037-4d929bcf00e8?q=80&w=800&auto=format&fit=crop"
];

const AlbumShowcaseStories = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax effects for different images
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [-50, -100]);

  return (
    <section className="relative z-10 py-32 overflow-hidden bg-black/40 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <h2 className="text-sm tracking-[0.3em] uppercase text-secondary font-bold mb-4">Gallery</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white">Album Stories</h3>
          <p className="text-gray-400 font-light mt-4 max-w-xl mx-auto">
            Every spread is designed to pace your memories, creating a visual rhythm that brings your story back to life.
          </p>
        </div>

        <div className="relative min-h-[800px] w-full flex items-center justify-center perspective-[1000px]">
          
          {/* Main Large Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute z-20 w-[80%] md:w-[60%] shadow-[0_30px_60px_rgba(0,0,0,0.8)] preserve-3d"
            style={{ y: y1 }}
          >
            <div className="relative aspect-[3/2] bg-white p-2">
               <div className="w-full h-full bg-cover bg-center grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url('${storyImages[0]}')` }}></div>
            </div>
          </motion.div>

          {/* Floating Image 1 (Top Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -10 }}
            whileInView={{ opacity: 1, x: 0, rotate: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute z-30 top-[10%] left-[5%] md:left-[15%] w-[40%] md:w-[25%] shadow-2xl p-2 bg-white"
            style={{ y: y2 }}
          >
             <div className="aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: `url('${storyImages[1]}')` }}></div>
             <p className="text-center font-serif text-xs mt-2 tracking-widest text-black/70">THE VOWS</p>
          </motion.div>

          {/* Floating Image 2 (Bottom Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 10 }}
            whileInView={{ opacity: 1, x: 0, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute z-30 bottom-[10%] right-[5%] md:right-[15%] w-[45%] md:w-[30%] shadow-2xl p-2 bg-white"
            style={{ y: y3 }}
          >
             <div className="aspect-[3/2] bg-cover bg-center" style={{ backgroundImage: `url('${storyImages[2]}')` }}></div>
          </motion.div>

          {/* Floating Image 3 (Top Right Background) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute z-10 top-[5%] right-[10%] w-[35%] md:w-[20%] shadow-xl opacity-60 mix-blend-luminosity"
            style={{ y: y4, rotate: 15 }}
          >
             <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url('${storyImages[3]}')` }}></div>
          </motion.div>
          
          {/* Floating Image 4 (Bottom Left Background) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute z-10 bottom-[20%] left-[10%] w-[30%] md:w-[15%] shadow-xl opacity-80"
            style={{ y: y2, rotate: -15 }}
          >
             <div className="aspect-[3/4] bg-cover bg-center" style={{ backgroundImage: `url('${storyImages[4]}')` }}></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AlbumShowcaseStories;
