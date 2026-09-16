import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import AlbumsBackground from '../components/albums/AlbumsBackground';
import AlbumConfigurator from '../components/albums/AlbumConfigurator';
import AlbumShowcaseStories from '../components/albums/AlbumShowcaseStories';
import AlbumShowcaseCrafted from '../components/albums/AlbumShowcaseCrafted';
import AlbumSizes from '../components/albums/AlbumSizes';
import { useNavigate } from 'react-router-dom';

const Albums = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className="relative bg-[#070707] min-h-screen text-white overflow-hidden">
      
      <AlbumsBackground />

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="h-[1px] w-20 bg-secondary/50 mx-auto mb-8"></div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif leading-[1.1] tracking-tight">
            ALBUMS
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-secondary font-serif italic text-xl md:text-3xl max-w-2xl mx-auto"
        >
          Turn your memories into something you can hold.
        </motion.p>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-secondary to-transparent"
          />
        </motion.div>
      </section>

      {/* INTERACTIVE CONFIGURATOR */}
      <AlbumConfigurator />

      {/* PHOTO SHOWCASES */}
      <AlbumShowcaseStories />
      <AlbumShowcaseCrafted />

      {/* SIZES */}
      <AlbumSizes />

      {/* FINAL CTA SECTION */}
      <section className="relative z-10 py-40 px-4 bg-transparent flex flex-col items-center text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-8">
            Some moments deserve <br/><span className="text-secondary italic">more than a screen.</span>
          </h2>
          
          <button 
            onClick={() => navigate('/contact')} 
            className="mt-8 relative overflow-hidden group border border-secondary px-12 py-5 bg-black"
          >
            <div className="absolute inset-0 bg-secondary w-0 group-hover:w-full transition-all duration-700 ease-out z-0"></div>
            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-700">
              CREATE YOUR ALBUM
            </span>
          </button>
        </motion.div>
      </section>

    </PageWrapper>
  );
};

export default Albums;