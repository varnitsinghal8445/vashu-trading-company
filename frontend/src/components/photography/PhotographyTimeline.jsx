import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineData = [
  {
    id: '01',
    title: 'The Arrival',
    subtitle: 'Bride & Groom Preparation',
    largeImage: '/images/ai-wedding/arrival_large_1790110816035.jpg', 
    smallImage: '/images/ai-wedding/arrival_small_1790110830739.jpg', 
    desc: 'The quiet anticipation before the storm of emotions. The small details, the nervous smiles, the final touches.',
    layout: 'left'
  },
  {
    id: '02',
    title: 'The Colors',
    subtitle: 'Haldi Ceremony',
    largeImage: '/images/ai-wedding/haldi_large_1790110842290.jpg', 
    smallImage: '/images/ai-wedding/haldi_small_1790110853050.jpg', 
    desc: 'Vibrant yellows, laughter, and blessings. A beautiful mess of traditions that bring everyone closer together.',
    layout: 'right'
  },
  {
    id: '03',
    title: 'The Celebration',
    subtitle: 'Mehndi & Sangeet',
    largeImage: '/images/ai-wedding/mehndi_large_1790110868877.jpg', 
    smallImage: '/images/ai-wedding/mehndi_small_1790110882760.jpg', 
    desc: 'Intricate henna designs, synchronized dances, and a night of pure joy and celebration under the lights.',
    layout: 'left'
  },
  {
    id: '04',
    title: 'The Promise',
    subtitle: 'Wedding Ceremony',
    largeImage: '/images/ai-wedding/ceremony_large_1790110908785.jpg', 
    smallImage: '/images/ai-wedding/ceremony_small_1790110921505.jpg', 
    desc: 'Sacred vows exchanged around the fire. The beautiful culmination of two families becoming one forever.',
    layout: 'right'
  },
  {
    id: '05',
    title: 'The Emotion',
    subtitle: 'Couple Portraits',
    largeImage: '/images/ai-wedding/couple_large_1790110935148.jpg', 
    smallImage: '/images/ai-wedding/couple_small_1790110948339.jpg', 
    desc: 'A private moment suspended in time. Just the two of you, realizing that forever starts today.',
    layout: 'left'
  },
  {
    id: '06',
    title: 'The People',
    subtitle: 'Family & Candid Moments',
    largeImage: '/images/ai-wedding/family_large_1790110958648.jpg', 
    smallImage: '/images/ai-wedding/family_small_1790110972742.jpg', 
    desc: 'The stolen glances, the proud tears of parents, the warm hugs. The real, unscripted moments that matter most.',
    layout: 'right'
  }
];

const TimelineSection = ({ data }) => {
  const isLeft = data.layout === 'left';
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax for the large background image
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  // Subtle parallax for the small image to create depth
  const yParallaxSmall = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  
  return (
    <div ref={containerRef} className="relative py-24 md:py-40 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
      {/* Timeline Node Line */}
      <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
      
      {/* Content Side */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full lg:w-5/12 flex flex-col ${isLeft ? 'lg:items-end lg:text-right' : 'lg:order-2 lg:items-start lg:text-left'} text-center`}
      >
        <span className="text-secondary font-serif text-2xl md:text-3xl italic mb-2">{data.id}</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">{data.title}</h2>
        <h3 className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-6">{data.subtitle}</h3>
        <p className="text-gray-300 font-light leading-relaxed max-w-md">{data.desc}</p>
      </motion.div>

      {/* Image Side - Two Image Story Composition */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        className={`w-full lg:w-5/12 relative h-[500px] md:h-[650px] ${isLeft ? 'lg:order-2' : ''}`}
      >
        
        {/* Large Cinematic Background Image */}
        <div className="absolute inset-0 bg-[#050505] overflow-hidden rounded-sm group z-0">
          <motion.div 
            style={{ y: yParallax }} 
            className="w-full h-[110%] relative -top-[5%]"
          >
            <motion.img 
              animate={{ scale: [1, 1.06] }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
              src={data.largeImage} 
              alt={`${data.title} Atmosphere`} 
              className="w-full h-full object-cover opacity-75 brightness-90 blur-[1px] contrast-110 saturate-75"
            />
            {/* Grain & Vignette Overlay */}
            <div className="absolute inset-0 bg-black/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/60 mix-blend-multiply" />
          </motion.div>
        </div>
        
        {/* Small Highlight Image */}
        <motion.div 
          style={{ y: yParallaxSmall }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`absolute ${isLeft ? 'bottom-0 -left-6 md:-left-12' : 'bottom-0 -right-6 md:-right-12'} top-1/4 w-[75%] md:w-[70%] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden rounded-sm z-10 group`}
        >
          <img 
            src={data.smallImage} 
            alt={`${data.title} Highlight`} 
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          />
          {/* Subtle overlay on small image */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>

      </motion.div>
    </div>
  );
};

const PhotographyTimeline = () => {
  return (
    <section className="bg-transparent py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-400 mb-4">A Cinematic Journey</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white">The Wedding Story</h3>
          <div className="w-12 h-[1px] bg-secondary mx-auto mt-8" />
        </motion.div>

        <div className="relative">
          {timelineData.map((item) => (
            <TimelineSection key={item.id} data={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PhotographyTimeline;
