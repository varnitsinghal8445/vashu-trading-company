import React from 'react';
import { motion } from 'framer-motion';

const craftedImages = [
  "/assets/prewedding_album_1_1789587891262.jpg", // Main Spread (Epic Mountain Prewedding)
  "/assets/album_story_3_1789587607665.jpg",      // Scattered 1 (Sparklers Couple)
  "/assets/album_story_1_1789587460396.jpg",      // Scattered 2 (Bridal Portrait)
  "/assets/album_story_5_1789587642778.jpg"       // Scattered 3 (Groom Portrait)
];

const AlbumShowcaseCrafted = () => {
  return (
    <section className="relative z-10 py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h2 className="text-sm tracking-[0.3em] uppercase text-secondary font-bold mb-4">Craftsmanship</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white">Crafted For Your Memories</h3>
          <p className="text-gray-400 font-light mt-4 max-w-xl mx-auto">
            Every album is a handcrafted piece of art, designed to sit beautifully in your home.
          </p>
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] flex items-center justify-center perspective-[1500px]">
          
          {/* Table Surface Simulation */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0 pointer-events-none"></div>

          {/* Main Open Spread */}
          <motion.div 
            initial={{ rotateX: 60, y: 100, opacity: 0 }}
            whileInView={{ rotateX: 45, y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            whileHover={{ rotateX: 40, scale: 1.02 }}
            className="relative z-10 w-[70%] max-w-[1000px] aspect-[2/1] shadow-[0_50px_100px_rgba(0,0,0,0.9)] preserve-3d cursor-pointer"
          >
            {/* Left Page */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-white rounded-l-sm overflow-hidden">
               <div className="absolute inset-4 bg-gray-100"></div>
               {/* Image representation on page */}
               <div className="absolute inset-[10%] bg-cover bg-center grayscale-[10%]" style={{ backgroundImage: `url('${craftedImages[0]}')` }}></div>
               {/* Page Center Shadow/Gradient */}
               <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/20 to-transparent mix-blend-multiply"></div>
            </div>
            
            {/* Right Page */}
            <div className="absolute inset-y-0 right-0 w-1/2 bg-white rounded-r-sm overflow-hidden">
               <div className="absolute inset-4 bg-gray-100"></div>
               <div className="absolute inset-[10%] bg-cover bg-center grayscale-[10%]" style={{ backgroundImage: `url('${craftedImages[0]}')`, backgroundPosition: 'right' }}></div>
               {/* Page Center Shadow/Gradient */}
               <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply"></div>
               
               {/* Glossy Reflection Sweep */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 pointer-events-none"></div>
            </div>

            {/* Album Thickness Bottom */}
            <div className="absolute bottom-[-10px] left-[5px] right-[5px] h-[10px] bg-[#d0d0d0] rounded-b-sm transform origin-top rotate-x-[-90deg] border-x border-b border-black/20"></div>
          </motion.div>

          {/* Scattered Photo 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -100, y: 50, rotateZ: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotateZ: -12 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.05, rotateZ: -8 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute z-20 bottom-[10%] left-[5%] md:left-[15%] w-[25%] md:w-[15%] aspect-[3/4] bg-white p-2 shadow-2xl cursor-pointer"
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${craftedImages[1]}')` }}></div>
          </motion.div>

          {/* Scattered Photo 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 100, y: 80, rotateZ: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotateZ: 15 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.05, rotateZ: 10 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute z-20 bottom-[-5%] right-[10%] md:right-[20%] w-[25%] md:w-[18%] aspect-square bg-white p-2 shadow-2xl cursor-pointer"
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${craftedImages[2]}')` }}></div>
          </motion.div>

          {/* Scattered Photo 3 (Behind) */}
          <motion.div 
            initial={{ opacity: 0, y: -50, rotateZ: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 5 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            className="absolute z-0 top-[10%] right-[25%] w-[20%] md:w-[12%] aspect-[4/3] bg-white p-1 shadow-lg opacity-50"
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${craftedImages[3]}')` }}></div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AlbumShowcaseCrafted;
