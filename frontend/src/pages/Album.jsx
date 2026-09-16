import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import AlbumBackground from '../components/ui/AlbumBackground';
import AlbumVideoBox from '../components/ui/AlbumVideoBox';
import AlbumConfigurator from '../components/ui/AlbumConfigurator';
import MemoryWall from '../components/ui/MemoryWall';

const Album = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper className="relative bg-[#070707] min-h-screen text-white overflow-hidden">
      
      {/* Immersive Background */}
      <AlbumBackground />

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="h-[1px] w-20 bg-secondary/50 mx-auto mb-6"></div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
            YOUR STORY, <br/>
            <span className="text-secondary italic">BOUND FOREVER.</span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-400 font-light text-lg md:text-xl max-w-2xl mx-auto"
        >
          Your photographs shouldn't just live in a gallery. <br/>
          They deserve to be held, opened, and remembered.
        </motion.p>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"
          />
        </motion.div>
      </section>

      {/* ALBUM MAKING VIDEO SECTION */}
      <section className="relative z-10 py-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <AlbumVideoBox 
            videoSrc="https://vimeo.com/712398501" 
            title="The Making of Your Album"
            desc="From carefully selected photographs to handcrafted pages, every album is created to preserve your story."
            bgImage="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1000&auto=format&fit=crop"
          />
          <AlbumVideoBox 
            videoSrc="https://vimeo.com/712398501" 
            title="Behind the Scenes"
            desc="Watch our master craftsmen bind, stitch, and finish your luxury memory collection."
            bgImage="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop"
          />
        </div>
      </section>

      {/* THE ALBUM EXPERIENCE / CONFIGURATOR */}
      <section className="relative z-10 py-20 border-t border-white/[0.03] bg-black/40 backdrop-blur-sm">
        <div className="text-center mb-10 px-4">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">The Album Experience</h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">Crafted with archival papers, premium bindings, and meticulous attention to detail.</p>
        </div>
        <AlbumConfigurator />
      </section>

      {/* THE MEMORY WALL */}
      <section className="relative z-10">
        <MemoryWall />
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative z-10 py-32 px-4 bg-gradient-to-b from-[#030303] to-[#0a0a0a] flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif mb-6"
        >
          Some moments deserve <br/><span className="text-secondary italic">more than a screen.</span>
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button 
            onClick={() => navigate('/albums')} 
            className="mt-8 relative overflow-hidden group border border-secondary px-10 py-4"
          >
            <div className="absolute inset-0 bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors duration-500">
              CREATE YOUR ALBUM
            </span>
          </button>
        </motion.div>
      </section>

    </PageWrapper>
  );
};

export default Album;
