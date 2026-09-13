import { motion } from 'framer-motion';

const milestones = [
  { year: '1990', title: 'Founded', desc: 'Started with a single film camera.' },
  { year: '2000', title: 'Expansion', desc: 'Expanded our services across the region.' },
  { year: '2010', title: 'Pro Lab', desc: 'Introduced professional album printing.' },
  { year: '2020', title: 'Digital', desc: 'Transitioned fully to digital photography.' },
  { year: '2026', title: 'New Era', desc: 'Digital transformation of our legacy.' },
];

const JourneySection = () => {
  return (
    <section className="relative py-24 min-h-[600px] flex flex-col justify-center bg-[#0d0d0d] overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          src="/journey_bg_romantic.jpg" 
          alt="Romantic Fairy Light Tunnel" 
          className="w-full h-full object-cover object-center opacity-60"
        />
        {/* Seamless dark vignette for flawless continuity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-black/40 to-[#0d0d0d] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-transparent to-[#0d0d0d] z-10"></div>
      </div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold mb-2 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">Our Legacy</h2>
          <h3 className="text-3xl md:text-4xl font-serif text-white drop-shadow-lg">36-Year Journey</h3>
        </motion.div>
        
        {/* Horizontal Timeline Container */}
        <div className="relative w-full">
          {/* Main Horizontal Line */}
          <div className="hidden lg:block absolute top-[28px] left-0 w-full h-[2px] bg-white/10 z-0">
            {/* Animated Horizontal Beam */}
            <div className="absolute top-0 left-0 h-full w-[20%] bg-gradient-to-r from-transparent via-secondary to-transparent blur-[2px] animate-[shine_8s_linear_infinite] opacity-80"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {milestones.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                key={index} 
                className="flex flex-col items-center group relative"
              >
                
                {/* Timeline Dot (Glowing Node) */}
                <div className="hidden lg:flex items-center justify-center w-14 h-14 mb-8 relative">
                  <div className="absolute w-4 h-4 rounded-full bg-secondary ring-4 ring-[#050505] transition-all duration-500 group-hover:scale-150 group-hover:bg-[#fff5d1] group-hover:shadow-[0_0_20px_rgba(212,175,55,1)] z-20"></div>
                </div>
                
                {/* Content Card (Glassmorphism) */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl w-full text-center transition-all duration-500 hover:bg-white/10 hover:border-secondary/50 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <span className="text-secondary font-serif text-3xl mb-2 block drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] group-hover:text-[#fff5d1] transition-colors duration-500">
                    {item.year}
                  </span>
                  <h4 className="text-lg font-semibold tracking-wide text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
