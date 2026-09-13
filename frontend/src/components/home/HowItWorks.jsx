import { motion } from 'framer-motion';
import processBg from '../../assets/process-wedding-bg.jpg';
import { useState } from 'react';

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Consultation', desc: 'Discuss your vision, budget, and requirements with our experts.' },
    { num: '02', title: 'Booking', desc: 'Select your package and secure your date with an advance payment.' },
    { num: '03', title: 'The Event', desc: 'Our team captures your moments seamlessly and professionally.' },
    { num: '04', title: 'Gallery Selection', desc: 'Access your private digital gallery to select photos for printing.' },
    { num: '05', title: 'Design Approval', desc: 'Review the custom album design online and request changes.' },
    { num: '06', title: 'Delivery', desc: 'Receive your premium albums, frames, and digital media.' },
  ];

  // Generate some subtle floating particles
  const [particles] = useState(() => 
    Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 6 + 6}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${Math.random() * 3 + 1}px`,
    }))
  );

  return (
    <section className="relative py-24 min-h-[700px] flex flex-col justify-center bg-[#0d0d0d] overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={processBg} 
          alt="Dark moody elegant wedding background" 
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        {/* Seamless blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-black/40 to-[#0d0d0d] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-transparent to-[#0d0d0d] z-10"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p, i) => (
          <div 
            key={i}
            className="absolute bg-[#d4af37] rounded-full animate-particle blur-[1px]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay
            }}
          />
        ))}
      </div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20 relative z-30"
        >
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold mb-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">The Process</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white drop-shadow-lg">How It Works</h3>
        </motion.div>
        
        {/* Simple 6 Step Cards Grid */}
        <div className="relative w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                key={index} 
                className="relative group flex justify-center"
              >
                {/* Content Card (Sharp Glassmorphism, Compact Size) */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 lg:p-8 rounded-none w-full max-w-[320px] transition-all duration-500 hover:bg-white/10 hover:border-secondary/50 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
                  
                  {/* Glowing Node / Number indicator */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none"></div>
                  
                  <div className="relative z-10">
                    <span className="text-secondary/40 font-serif text-4xl mb-3 block drop-shadow-[0_0_10px_rgba(212,175,55,0.1)] group-hover:text-[#d4af37] transition-colors duration-500 font-bold">
                      {step.num}
                    </span>
                    <h4 className="text-lg font-semibold tracking-wide text-white mb-2 group-hover:text-[#fff5d1] transition-colors duration-500">{step.title}</h4>
                    <p className="text-gray-400 font-light text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
