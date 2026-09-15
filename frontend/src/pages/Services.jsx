import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import { serviceCategories, allServices } from '../data/servicesList';
import CinematicMemoriesBackground from '../components/ui/CinematicMemoriesBackground';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const handleBuildPackage = (service = null) => {
    if (service) {
      navigate(`/book-now?prefill=${service.id}`);
    } else {
      navigate('/book-now');
    }
  };

  return (
    <PageWrapper className="bg-black text-white min-h-screen pb-32 relative">
      
      {/* Animated Cinematic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CinematicMemoriesBackground />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h4 className="text-secondary tracking-[0.2em] text-xs font-bold uppercase mb-6">Our Services</h4>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">More Than Just Photography</h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            We turn your moments into photographs, films, and stories that you can relive forever.
          </p>
        </motion.div>
      </section>

      {/* Services Grid by Category */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-10">
        {serviceCategories.map((category, catIndex) => {
          const categoryServices = allServices.filter(s => s.category === category.id);
          
          if (categoryServices.length === 0) return null;

          return (
            <div key={category.id} className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="border-b border-white/10 pb-6"
              >
                <h2 className="text-3xl font-serif mb-2">{category.label}</h2>
                <p className="text-gray-500 text-sm font-light tracking-wide">{category.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => setSelectedService(service)}
                    className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer"
                  >
                    {/* Background Media */}
                    {service.video ? (
                      <video 
                        src={service.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                    )}
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                      <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-300 font-light leading-relaxed mb-6 line-clamp-2">
                        {service.shortDesc}
                      </p>
                      
                      <div className="flex items-center text-xs font-bold uppercase tracking-widest text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        Explore <ArrowRight size={14} className="ml-2" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Not Sure What You Need CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10">
            <h2 className="text-3xl font-serif mb-4">Not Sure What You Need?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto font-light">
              Tell us about your event and we'll help you choose the right photography, films, albums, and add-ons to perfectly capture your story.
            </p>
            <button 
              onClick={() => handleBuildPackage()}
              className="bg-secondary text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all rounded-sm flex items-center justify-center mx-auto"
            >
              Build My Photography Package <ArrowRight size={16} className="ml-3" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: '100%', scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: '100%', scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:max-w-2xl bg-black border border-white/10 md:rounded-2xl rounded-t-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col"
            >
              {/* Modal Image Header */}
              <div className="relative h-64 shrink-0">
                {selectedService.video ? (
                  <video 
                    src={selectedService.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedService.image})` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-black to-gray-900">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-2 block">
                      {serviceCategories.find(c => c.id === selectedService.category)?.label}
                    </span>
                    <h2 className="text-3xl font-serif">{selectedService.title}</h2>
                  </div>
                </div>

                <p className="text-gray-400 font-light leading-relaxed mb-8">
                  {selectedService.longDesc}
                </p>

                <div className="mb-10">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center border-b border-white/10 pb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span>
                    What's Included
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-400">
                        <Check size={16} className="text-secondary mr-2 mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Starting From</p>
                    <p className="text-2xl font-bold text-white">{selectedService.startingPrice}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleBuildPackage(selectedService)}
                    className="w-full sm:w-auto bg-secondary text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all rounded-sm flex items-center justify-center"
                  >
                    {selectedService.category === 'memories' ? 'Customize Album' : 'Add to Package'} 
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </PageWrapper>
  );
};

export default Services;