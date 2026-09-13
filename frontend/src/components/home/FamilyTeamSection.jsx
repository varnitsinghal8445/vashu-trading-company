import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { familyContactConfig } from '../../config/contactConfig';
import FamilyMemberCard from './FamilyMemberCard';

const FamilyTeamSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0d0d0d]" id="family-team">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/family-bg.jpg" 
          alt="Royal Palace Venue" 
          className="w-full h-full object-cover object-center"
        />
        {/* Seamless blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-black/70 to-[#0d0d0d] z-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-secondary tracking-widest uppercase text-sm mb-4 font-bold">Meet Our Family</p>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Three Decades of Trust, Now Continuing Into the Next Generation.
          </h2>
          <p className="text-gray-300 font-light text-lg">
            From one generation to the next, our passion has always been the same — preserving your most important memories. A legacy built by family, continued by the next generation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-20 relative z-10">
          <FamilyMemberCard 
            {...familyContactConfig.father} 
            delay={0.1}
          />
          <FamilyMemberCard 
            {...familyContactConfig.brother} 
            delay={0.3}
          />
        </div>

      </div>
    </section>
  );
};

export default FamilyTeamSection;
