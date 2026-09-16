import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MemoryWall = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0.5, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0.5, 1], [50, -150]);
  const y3 = useTransform(scrollYProgress, [0.5, 1], [150, -50]);
  const y4 = useTransform(scrollYProgress, [0.5, 1], [0, -200]);

  const photos = [
    { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop", caption: "THE DAY WE MET", style: { top: '10%', left: '5%', rotate: '-5deg', y: y1 } },
    { url: "https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=1000&auto=format&fit=crop", caption: "FOREVER", style: { top: '40%', right: '10%', rotate: '3deg', y: y2 } },
    { url: "https://images.unsplash.com/photo-1607557165037-4d929bcf00e8?q=80&w=1000&auto=format&fit=crop", caption: "OUR STORY", style: { top: '60%', left: '15%', rotate: '-2deg', y: y3 } },
    { url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1000&auto=format&fit=crop", caption: "MEMORIES", style: { top: '20%', right: '25%', rotate: '5deg', y: y4 } },
  ];

  return (
    <div className="relative w-full py-40 overflow-hidden bg-[#030303] min-h-[80vh]">
      
      {/* Background soft blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#030303]"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-10 font-serif text-[15vw] whitespace-nowrap tracking-tighter">
        ETERNAL
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">A Wall of Memories</h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">Every captured moment becomes a piece of art waiting to be remembered.</p>
        </motion.div>

        <div className="relative h-[600px] w-full">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              style={{ ...photo.style }}
              className="absolute group shadow-2xl p-3 bg-white"
            >
              <div className="overflow-hidden w-48 h-56 md:w-64 md:h-72">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full bg-cover bg-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  style={{ backgroundImage: `url('${photo.url}')` }}
                />
              </div>
              <div className="mt-4 mb-2 text-center">
                <span className="font-serif text-black/70 text-sm tracking-[0.2em]">{photo.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryWall;
