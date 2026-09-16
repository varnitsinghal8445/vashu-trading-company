import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import { shopProducts } from '../data/shopProducts';
import { Check, Info, Frame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Frames = () => {
  const navigate = useNavigate();
  const frameData = shopProducts.find((p) => p.id === 'wd-1');
  const sizes = frameData.multiOptions.find((opt) => opt.id === 'size').choices;
  const materials = frameData.multiOptions.find((opt) => opt.id === 'material').choices;

  // Hero Section Scroll Animation
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Demo frame images from Unsplash for luxury presentation
  const showcaseFrames = [
    {
      url: "/assets/frame_wooden.jpg",
      title: "Classic Wooden",
      y: y1,
      delay: 0.2
    },
    {
      url: "/assets/frame_acrylic.jpg",
      title: "Premium Acrylic",
      y: y2,
      delay: 0.4
    },
    {
      url: "/assets/frame_canvas.jpg",
      title: "Gallery Canvas",
      y: y3,
      delay: 0.6
    }
  ];

  return (
    <PageWrapper className="bg-[#050505] text-white min-h-screen overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      {/* Hero Showcase Section */}
      <section ref={heroRef} className="relative z-10 pt-40 pb-32 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center">
        
        <motion.div 
          style={{ opacity }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-secondary/50"></div>
            <Frame className="text-secondary w-5 h-5" />
            <h4 className="text-secondary tracking-[0.3em] text-xs font-bold uppercase">Wall Decor</h4>
            <div className="h-[1px] w-12 bg-secondary/50"></div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight"
          >
            Your Memories,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-[#ffdf73]">Beautifully Framed.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Turn your photographs into timeless art pieces. Explore our luxury collection of custom frames designed to elevate your space.
          </motion.p>
        </motion.div>

        {/* 3 Floating Frames Showcase */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 h-[60vh] md:h-[500px]">
          {showcaseFrames.map((frame, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: frame.delay, type: "spring", bounce: 0.3 }}
              style={{ y: frame.y }}
              className={`relative group rounded-xl overflow-hidden shadow-2xl shadow-black border border-white/10 ${idx === 1 ? 'md:-mt-20' : 'md:mt-10'}`}
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${frame.url})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-serif text-white tracking-wide">{frame.title}</h3>
                <div className="w-8 h-[1px] bg-secondary mt-3 group-hover:w-16 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Details & Sizes Section */}
      <section className="relative z-10 py-32 bg-black/40 border-t border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif mb-4"
            >
              Available Sizes & Pricing
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-light"
            >
              Choose from a wide range of dimensions tailored to your wall space.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sizes Table */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl"
            >
              <h3 className="text-2xl font-serif mb-8 text-secondary flex items-center gap-3">
                <Frame className="w-6 h-6" /> Dimensions Tracker
              </h3>
              
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 text-xs tracking-[0.2em] uppercase text-gray-500 font-medium">Size (Inches)</th>
                      <th className="py-4 text-xs tracking-[0.2em] uppercase text-gray-500 font-medium">Starting Price</th>
                      <th className="py-4 text-xs tracking-[0.2em] uppercase text-gray-500 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size, i) => (
                      <motion.tr 
                        key={size}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="py-5 font-serif text-lg">{size}</td>
                        <td className="py-5 text-gray-300">₹{frameData.pricesBySize[size]}</td>
                        <td className="py-5 text-right">
                          <button 
                            onClick={() => navigate('/products')}
                            className="text-xs text-secondary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest hover:text-white"
                          >
                            Order Now &rarr;
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Materials & Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 space-y-8"
            >
              {/* Materials Card */}
              <div className="bg-gradient-to-br from-white/5 to-transparent rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] group-hover:bg-secondary/20 transition-colors"></div>
                <h3 className="text-xl font-serif mb-6 text-white">Premium Materials</h3>
                <ul className="space-y-4">
                  {materials.map((material, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-400">
                      <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                        <Check size={10} className="text-secondary" />
                      </div>
                      {material} Finish
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notice Card */}
              <div className="bg-[#0f0f0f] rounded-3xl p-8 border border-white/5">
                <Info className="text-gray-500 w-6 h-6 mb-4" />
                <h4 className="text-white font-medium mb-2">Custom Requirements?</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Need a size not listed here? We offer fully customized framing solutions tailored to your specific artwork or space.
                </p>
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full py-4 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </PageWrapper>
  );
};

export default Frames;