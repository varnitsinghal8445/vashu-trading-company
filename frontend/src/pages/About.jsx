import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Award, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';

const About = () => {
  return (
    <PageWrapper className="bg-[#0a0a0a] min-h-screen text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/ai-wedding/photography_hero_bg.jpg" 
            alt="The Studio" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a]"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h4 className="text-secondary uppercase tracking-[0.3em] text-xs font-bold mb-4">Who We Are</h4>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-white/90">
              THE ARTISTS BEHIND <br/><span className="text-white italic">THE LENS</span>
            </h1>
            <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">
              We don't just take photographs; we preserve the fleeting, unscripted emotions of your legacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR STORY / PHILOSOPHY */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-serif leading-tight">
              A Decade of Capturing <br/><span className="text-secondary italic">Timeless Romance.</span>
            </h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
              <p>
                Founded with a singular vision to redefine wedding photography, our studio blends cinematic storytelling with fine-art portraiture. We believe that every couple has a unique rhythm, a quiet language of their own.
              </p>
              <p>
                For over 10 years, we have traveled across the globe, stepping into the sacred spaces of love, celebration, and family. Our approach is entirely unobtrusive—allowing the magic to unfold naturally while we masterfully document the light, the tears, and the joy.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h4 className="text-3xl font-serif text-white mb-2">500+</h4>
                <p className="text-[10px] uppercase tracking-widest text-secondary">Weddings Documented</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-white mb-2">15+</h4>
                <p className="text-[10px] uppercase tracking-widest text-secondary">Cities Travelled</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-white/5 border border-white/10 p-4 rounded-sm transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="/images/ai-wedding/couple_large.jpg" 
                alt="Our Journey" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR VALUES */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif mb-4">Our Core Philosophy</h3>
            <p className="text-gray-400 font-light text-sm tracking-wide">The principles that guide our every click.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Heart className="text-secondary mb-4" size={32} />, title: 'Authenticity', desc: 'We do not manufacture moments. We observe, wait, and capture the raw truth of your emotions.' },
              { icon: <Camera className="text-secondary mb-4" size={32} />, title: 'Cinematic Aesthetics', desc: 'Every frame is carefully composed using light, shadow, and architecture to create fine-art masterpieces.' },
              { icon: <Award className="text-secondary mb-4" size={32} />, title: 'Heirloom Quality', desc: 'From our digital delivery to our physical print studio, we ensure your memories last for generations.' }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="bg-[#0a0a0a] p-8 border border-white/5 hover:border-secondary/50 transition-colors rounded-sm"
              >
                {value.icon}
                <h4 className="text-xl font-serif text-white mb-3">{value.title}</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE TEAM */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-serif mb-4">Meet The Collective</h2>
              <p className="text-gray-400 font-light max-w-xl">A curated team of visual storytellers, cinematographers, and editors dedicated to your perfect day.</p>
            </div>
            <Link to="/contact" className="mt-6 md:mt-0 flex items-center gap-2 text-xs uppercase tracking-widest text-secondary hover:text-white transition-colors">
              Join Our Team <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Arjun Mehta', role: 'Lead Photographer & Founder', img: '/images/ai-wedding/mehndi_large.jpg' },
              { name: 'Kavya Singh', role: 'Cinematography Director', img: '/images/ai-wedding/haldi_large.jpg' },
              { name: 'Rahul Verma', role: 'Candid Specialist', img: '/images/ai-wedding/ceremony_large.jpg' },
              { name: 'Sneha Kapoor', role: 'Creative Editor', img: '/images/ai-wedding/family_large.jpg' }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-xl font-serif text-white mb-1">{member.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-secondary">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-32 px-4 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0a0a]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <Users className="text-secondary mx-auto mb-6" size={40} />
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Let's Create History.</h2>
          <p className="text-gray-400 font-light mb-10">We take on a limited number of commissions each year to ensure every couple receives our undivided creative attention.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/book-now" className="bg-secondary text-black px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white transition-colors">
              Book Now
            </Link>
            <Link to="/contact" className="border border-white/20 text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white/10 transition-colors">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
};

export default About;