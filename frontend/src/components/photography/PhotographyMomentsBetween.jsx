import React from 'react';
import { motion } from 'framer-motion';

const moments = [
  {
    id: 1,
    img: '/assets/album_story_1_1789587460396.jpg', 
    title: 'The Little Things',
    className: 'md:absolute md:top-[10%] md:left-[5%] md:w-64 md:h-80 rotate-[-4deg] z-10',
  },
  {
    id: 2,
    img: '/assets/album_story_2_1789587471642.jpg', 
    title: 'The Touch',
    className: 'md:absolute md:top-[40%] md:left-[25%] md:w-72 md:h-96 rotate-[3deg] z-30',
  },
  {
    id: 3,
    img: '/assets/album_story_3_1789587607665.jpg', 
    title: 'The Laughter',
    className: 'md:absolute md:top-[5%] md:right-[15%] md:w-[400px] md:h-[500px] rotate-[1deg] z-20',
  },
  {
    id: 4,
    img: '/assets/album_story_4_1789587629937.jpg', 
    title: 'The Details',
    className: 'md:absolute md:bottom-[5%] md:left-[10%] md:w-56 md:h-64 rotate-[-6deg] z-20',
  },
  {
    id: 5,
    img: '/assets/album_story_5_1789587642778.jpg', 
    title: 'The Look',
    className: 'md:absolute md:bottom-[15%] md:right-[20%] md:w-80 md:h-80 rotate-[4deg] z-40',
  }
];

const PhotographyMomentsBetween = () => {
  return (
    <section className="bg-transparent py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-0 relative z-50 md:pointer-events-none"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white italic drop-shadow-lg">
            The Moments <br />
            <span className="text-secondary font-normal not-italic">Between</span> Moments
          </h2>
        </motion.div>

        <div className="relative w-full md:h-[1000px] mt-12 flex flex-col md:block gap-8 items-center">
          {moments.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: parseFloat(moment.className.match(/rotate-\[?(-?\d+)deg\]?/) ? moment.className.match(/rotate-\[?(-?\d+)deg\]?/)[1] : 0) }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, zIndex: 100, rotate: 0 }}
              className={`relative group cursor-pointer shadow-2xl p-2 bg-white/5 backdrop-blur-sm border border-white/10 ${moment.className.replace(/rotate-\[.*?\]/, '')} ${!moment.className.includes('md:absolute') ? 'w-full max-w-sm' : ''}`}
            >
              <div className="overflow-hidden w-full h-full">
                <img 
                  src={moment.img} 
                  alt={moment.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-serif italic text-2xl text-white drop-shadow-md">{moment.title}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PhotographyMomentsBetween;
