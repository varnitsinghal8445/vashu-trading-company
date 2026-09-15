import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, X, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import { serviceCategories, allServices } from '../data/servicesList';

// Premium 3D Tilt Card Component
const ServiceCard = ({ service, index, onClick }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onClick={() => onClick(service)}
      className="group relative h-[450px] rounded-2xl cursor-pointer"
    >
      {/* 3D Container */}
      <div 
        className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 bg-black"
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Background Media */}
        {service.video ? (
          <video 
            src={service.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-60 opacity-80"
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-60 opacity-80"
            style={{ backgroundImage: `url(${service.image})` }}
          />
        )}
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Interactive Glow Effect tracking mouse */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([latestX, latestY]) => `radial-gradient(circle at ${(latestX + 0.5) * 100}% ${(latestY + 0.5) * 100}%, rgba(212,175,55,0.8) 0%, transparent 50%)`
            )
          }}
        />
      </div>
      
      {/* 3D Content popping out */}
      <div 
        className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none"
        style={{ transform: "translateZ(50px)" }}
      >
        <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-secondary transition-colors duration-300 transform group-hover:-translate-y-2">
          {service.title}
        </h3>
        <p className="text-sm text-gray-300 font-light leading-relaxed mb-6 line-clamp-2 transform group-hover:-translate-y-2 transition-transform duration-500 delay-75">
          {service.shortDesc}
        </p>
        
        <div className="flex items-center text-xs font-bold uppercase tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:-translate-y-2">
          Explore <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

// Animated Text Reveal Component
const RevealText = ({ text, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <div className="overflow-hidden flex flex-wrap justify-center gap-x-4 gap-y-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0, rotate: 10 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.2, 0.6, 0.2, 1],
          }}
          className="inline-block origin-bottom-left"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleBuildPackage = (service = null) => {
    if (service) {
      navigate(`/book-now?prefill=${service.id}`);
    } else {
      navigate('/book-now');
    }
  };

  return (
    <PageWrapper className="bg-[#050505] text-white min-h-screen pb-32 relative overflow-hidden">
      
      {/* Static Cinematic Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url('/cinematic-wedding-memories-bg-v2.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
      </div>

      {/* Subtle Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -left-[20%] w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[150px]"
        />
      </div>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: opacityHero, y: yBg }}
        className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto min-h-[50vh] flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-[1px] w-12 bg-secondary/50"></div>
          <Sparkles className="text-secondary w-4 h-4" />
          <h4 className="text-secondary tracking-[0.3em] text-xs font-bold uppercase">Our Services</h4>
          <div className="h-[1px] w-12 bg-secondary/50"></div>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight tracking-tight">
          <RevealText text="More Than Just Photography" delay={0.2} />
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-400 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed"
        >
          We turn your moments into photographs, films, and stories that you can relive forever.
        </motion.p>
      </motion.section>

      {/* Services Grid by Category */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40 py-10" style={{ perspective: "1000px" }}>
        {serviceCategories.map((category, catIndex) => {
          const categoryServices = allServices.filter(s => s.category === category.id);
          
          if (categoryServices.length === 0) return null;

          return (
            <div key={category.id} className="space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: -50, rotateX: 20 }}
                whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring" }}
                className="flex items-end gap-6 border-b border-white/10 pb-6 relative"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif mb-3 text-white/90">{category.label}</h2>
                  <p className="text-secondary/80 text-sm font-medium tracking-[0.2em] uppercase">{category.description}</p>
                </div>
                {/* Decorative animated line */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                  className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-secondary to-transparent"
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categoryServices.map((service, index) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    index={index} 
                    onClick={setSelectedService} 
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Not Sure What You Need CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="group bg-gradient-to-br from-white/5 to-white-[0.01] border border-white/10 rounded-[2rem] p-16 text-center backdrop-blur-xl relative overflow-hidden"
        >
          {/* Animated Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/20 transition-colors duration-1000" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 group-hover:bg-white/10 transition-colors duration-1000" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ rotate: 180, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-8 text-secondary"
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Not Sure What You Need?</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto font-light text-lg">
              Tell us about your event and we'll help you choose the right photography, films, albums, and add-ons to perfectly capture your story.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBuildPackage()}
              className="bg-secondary text-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all rounded-full flex items-center justify-center mx-auto"
            >
              Build My Photography Package <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: '100%', scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: '100%', scale: 0.9, rotateX: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ perspective: "1000px" }}
              className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-3xl bg-[#0a0a0a] border border-white/10 md:rounded-3xl rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,1)] max-h-[90vh] flex flex-col"
            >
              {/* Modal Image Header */}
              <div className="relative h-72 shrink-0 group overflow-hidden">
                {selectedService.video ? (
                  <video 
                    src={selectedService.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                ) : (
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: `url(${selectedService.image})` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 bg-black/40 p-3 rounded-full text-white hover:bg-white hover:text-black transition-colors backdrop-blur-xl border border-white/10"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-10 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-[#0a0a0a] to-black relative">
                <div className="flex justify-between items-start mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block flex items-center">
                      <Sparkles className="w-3 h-3 mr-2 inline" />
                      {serviceCategories.find(c => c.id === selectedService.category)?.label}
                    </span>
                    <h2 className="text-4xl font-serif text-white/90">{selectedService.title}</h2>
                  </motion.div>
                </div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 font-light leading-relaxed mb-10 text-lg"
                >
                  {selectedService.longDesc}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-6 flex items-center border-b border-white/5 pb-4">
                    What's Included
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedService.features.map((feature, i) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        key={i} 
                        className="flex items-center text-sm text-gray-400 group"
                      >
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-secondary/20 transition-colors">
                          <Check size={12} className="text-secondary" />
                        </div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5"
                >
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">Starting From</p>
                    <p className="text-3xl font-serif text-white">{selectedService.startingPrice}</p>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBuildPackage(selectedService)}
                    className="w-full sm:w-auto bg-secondary text-black px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all rounded-full flex items-center justify-center"
                  >
                    {selectedService.category === 'memories' ? 'Customize Album' : 'Add to Package'} 
                    <ArrowRight size={16} className="ml-3" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </PageWrapper>
  );
};

export default Services;