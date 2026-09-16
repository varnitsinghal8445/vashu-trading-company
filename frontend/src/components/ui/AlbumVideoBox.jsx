import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const AlbumVideoBox = ({ videoSrc, title, desc, bgImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-full max-w-5xl mx-auto my-10 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(videoSrc || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')} // Placeholder action
    >
      {/* Animated Border Sweep */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,223,115,0.4)_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        />
      </div>

      {/* Main Content Container (Pads the animated border) */}
      <div className="absolute inset-[1px] rounded-2xl bg-black overflow-hidden z-10">
        
        {/* Video / Image Background */}
        <motion.div 
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${bgImage || 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2000&auto=format&fit=crop'}')` }}
        >
          {/* Replace this with an actual <video> tag if videoSrc is provided and direct playback is desired */}
        </motion.div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          
          {/* Play Button */}
          <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:border-secondary/50 group-hover:bg-secondary/10 transition-colors duration-500"
          >
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-2 opacity-80 group-hover:opacity-100 group-hover:text-secondary transition-all" />
          </motion.div>
          
          {/* Text Content */}
          <div className="text-center mt-auto">
            <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-secondary mb-3">
              {title || 'The Making of Your Album'}
            </h3>
            <p className="text-gray-300 font-light text-xs md:text-sm max-w-lg mx-auto leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
              {desc || 'From carefully selected photographs to handcrafted pages, every album is created to preserve your story.'}
            </p>
          </div>
        </div>

      </div>

      {/* Aspect Ratio Sizer */}
      <div className="w-full pb-[56.25%] relative z-[-1]" /> {/* 16:9 Aspect Ratio */}
    </motion.div>
  );
};

export default AlbumVideoBox;
