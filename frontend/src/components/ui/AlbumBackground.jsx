import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AlbumBackground = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const yParallaxReverse = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#070707] overflow-hidden">
      {/* Film Grain & Texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
      ></div>

      {/* Floating Light Leaks / Soft Blooms */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-secondary/10 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.05, 0.1, 0.05],
          x: [0, -30, 0],
          y: [0, -40, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-white/5 rounded-full blur-[100px] mix-blend-screen"
      />

      {/* Subtle Parallax Fragments (Abstract frames or paper pieces) */}
      <motion.div style={{ y: yParallaxFast }} className="absolute inset-0">
        <div className="absolute top-[15%] left-[5%] w-[300px] h-[400px] border border-white/[0.02] rotate-[-5deg] rounded-md hidden lg:block" />
        <div className="absolute top-[60%] right-[10%] w-[400px] h-[250px] bg-gradient-to-tr from-white/[0.01] to-transparent border border-white/[0.01] rotate-[10deg] rounded-md hidden lg:block" />
      </motion.div>
      
      <motion.div style={{ y: yParallaxReverse }} className="absolute inset-0">
        <div className="absolute top-[30%] right-[20%] w-[200px] h-[300px] border border-secondary/[0.02] rotate-[3deg] rounded-sm hidden md:block" />
      </motion.div>

      {/* Small floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, Math.random() * 0.5 + 0.1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumBackground;
