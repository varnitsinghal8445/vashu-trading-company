import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    id: '01',
    title: 'The Arrival',
    subtitle: 'Bride & Groom Preparation',
    image1: 'https://images.unsplash.com/photo-1596489370823-3e74d1c4793b?q=80&w=1000&auto=format&fit=crop', // Bride prep
    image2: 'https://images.unsplash.com/photo-1607557165037-4d929bcf00e8?q=80&w=1000&auto=format&fit=crop', // Details/Rings
    desc: 'The quiet anticipation before the storm of emotions. The small details, the nervous smiles, the final touches.',
    layout: 'left'
  },
  {
    id: '02',
    title: 'The First Look',
    subtitle: 'Anticipation & Emotions',
    image1: 'https://images.unsplash.com/photo-1538356111053-748a48e1acb8?q=80&w=1000&auto=format&fit=crop', // Couple
    image2: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop', // Romantic
    desc: 'A private moment suspended in time. Seeing each other for the first time, realizing forever starts today.',
    layout: 'right'
  },
  {
    id: '03',
    title: 'The Ceremony',
    subtitle: 'Rituals & Promises',
    image1: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop', // Ceremony
    image2: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop', // Wide shot
    desc: 'Surrounded by loved ones, sacred vows are exchanged. The beautiful culmination of two families becoming one.',
    layout: 'left'
  },
  {
    id: '04',
    title: 'The Celebration',
    subtitle: 'Dance, Music & Joy',
    image1: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=1000&auto=format&fit=crop', // Dance/Party
    image2: 'https://images.unsplash.com/photo-1530103862676-de8892bf30b8?q=80&w=1000&auto=format&fit=crop', // Celebration
    desc: 'Letting go of the nerves and embracing the joy. Music, laughter, and a night that nobody wants to end.',
    layout: 'right'
  }
];

const TimelineSection = ({ data, index }) => {
  const isLeft = data.layout === 'left';
  
  return (
    <div className="relative py-24 md:py-40 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
      {/* Timeline Node Line (Hidden on mobile for cleaner look) */}
      <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
      
      {/* Content Side */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`w-full lg:w-5/12 flex flex-col ${isLeft ? 'lg:items-end lg:text-right' : 'lg:order-2 lg:items-start lg:text-left'} text-center`}
      >
        <span className="text-secondary font-serif text-2xl md:text-3xl italic mb-2">{data.id}</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">{data.title}</h2>
        <h3 className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-6">{data.subtitle}</h3>
        <p className="text-gray-300 font-light leading-relaxed max-w-md">{data.desc}</p>
      </motion.div>

      {/* Image Side */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`w-full lg:w-5/12 relative h-[500px] md:h-[600px] ${isLeft ? 'lg:order-2' : ''}`}
      >
        <div className="absolute inset-0 bg-[#111] overflow-hidden rounded-sm group">
          <img 
            src={data.image1} 
            alt={data.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-105"
          />
        </div>
        
        {/* Floating secondary image for depth */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`absolute ${isLeft ? '-bottom-12 -left-12' : '-bottom-12 -right-12'} w-2/3 h-2/3 border-4 border-[#070707] shadow-2xl overflow-hidden rounded-sm hidden md:block group z-10`}
        >
          <img 
            src={data.image2} 
            alt={`${data.title} details`} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out"
          />
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
          className="text-center mb-24"
        >
          <h2 className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-400 mb-4">A Cinematic Journey</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white">The Wedding Day</h3>
          <div className="w-12 h-[1px] bg-secondary mx-auto mt-8" />
        </motion.div>

        <div className="relative">
          {timelineData.map((item, index) => (
            <TimelineSection key={item.id} data={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PhotographyTimeline;
