import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AlbumsBackground = () => {
  const { scrollYProgress } = useScroll();
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const yParallaxReverse = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const rotateSlow = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 bg-[#070707] overflow-hidden">
        
      {/* Album Photographic Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.25]"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2000&auto=format&fit=crop")',
          y: yParallaxSlow 
        }}
      />

        {/* Texture: Film Grain & subtle paper */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
        ></div>
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noisy.png")' }}
        ></div>

        {/* Floating Cinematic Light Leaks */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.05, 0.1, 0.05],
            x: [0, 30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-secondary/20 rounded-full blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.03, 0.08, 0.03],
            x: [0, -40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[50%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-white/10 rounded-full blur-[120px] mix-blend-screen"
        />

        {/* Subtle Parallax Album Pages/Fragments */}
        <motion.div style={{ y: yParallaxFast, rotate: rotateSlow }} className="absolute inset-0">
          <div className="absolute top-[10%] left-[5%] w-[350px] h-[450px] border border-white/[0.02] rotate-[-5deg] rounded-sm hidden lg:block bg-gradient-to-tr from-white/[0.01] to-transparent shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
          <div className="absolute top-[70%] right-[10%] w-[450px] h-[300px] border border-white/[0.01] rotate-[10deg] rounded-sm hidden lg:block bg-gradient-to-tr from-secondary/[0.01] to-transparent" />
        </motion.div>
        
        <motion.div style={{ y: yParallaxReverse }} className="absolute inset-0">
          <div className="absolute top-[40%] right-[15%] w-[250px] h-[350px] border border-secondary/[0.02] rotate-[3deg] rounded-sm hidden md:block shadow-2xl" />
          <div className="absolute top-[20%] right-[50%] w-[200px] h-[300px] bg-white/[0.005] rotate-[-12deg] rounded-sm hidden xl:block backdrop-blur-[1px]" />
        </motion.div>

        {/* Small floating dust particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 60 - 30, 0],
                opacity: [0, Math.random() * 0.4 + 0.1, 0],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute rounded-sm bg-white/30 backdrop-blur-md"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%"
              }}
            />
          ))}
        </div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.6)_80%,_#000_100%)]"></div>
    </div>
  );
};

export default AlbumsBackground;
