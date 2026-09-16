import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PhotographyPhotoWall = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax effects for different wall elements to create depth
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section className="bg-[#070707] py-24 md:py-40 overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20 relative z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-400 mb-4"
          >
            A Wall of Memories
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-white italic"
          >
            Some moments stay forever.
          </motion.h3>
        </div>

        {/* Cinematic Wall Container */}
        <div className="relative w-full h-[800px] md:h-[1200px] perspective-[2000px] mt-12">
          
          {/* Main Huge Center Image */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[20%] left-[10%] right-[10%] md:left-[25%] md:right-[25%] h-[400px] md:h-[600px] z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden border border-white/5"
          >
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1500&auto=format&fit=crop" className="w-full h-full object-cover grayscale-[20%]" alt="Wedding Wall Main" />
          </motion.div>

          {/* Floating Image 1 (Top Left) */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute top-[5%] left-[5%] md:left-[10%] w-[200px] md:w-[350px] aspect-square z-20 shadow-2xl rounded-sm overflow-hidden border-4 border-[#070707] rotate-[-5deg]"
          >
            <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Wall Detail 1" />
          </motion.div>

          {/* Floating Image 2 (Top Right) */}
          <motion.div 
            style={{ y: y3 }}
            className="absolute top-[15%] right-[5%] md:right-[5%] w-[150px] md:w-[250px] aspect-[3/4] z-0 shadow-xl rounded-sm overflow-hidden border border-white/10 rotate-[8deg]"
          >
            <img src="https://images.unsplash.com/photo-1538356111053-748a48e1acb8?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Wall Detail 2" />
          </motion.div>

          {/* Floating Image 3 (Bottom Left) */}
          <motion.div 
            style={{ y: y4 }}
            className="absolute bottom-[15%] left-[2%] md:left-[15%] w-[180px] md:w-[300px] aspect-[4/3] z-20 shadow-2xl rounded-sm overflow-hidden border border-white/5 rotate-[3deg]"
          >
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Wall Detail 3" />
          </motion.div>

          {/* Floating Image 4 (Bottom Right) */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-[25%] right-[2%] md:right-[15%] w-[220px] md:w-[400px] aspect-video z-30 shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden border-8 border-[#070707] rotate-[-2deg]"
          >
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Wall Detail 4" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PhotographyPhotoWall;
