import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Wedding Photography',
    desc: 'Candid and traditional coverage of your special day.',
    img: 'https://images.jdmagicbox.com/v2/comp/jalandhar/g7/0181px181.x181.170606144505.q7g7/catalogue/raja-film-s-studio-phillaur-jalandhar-photographers-1c11r25ou9.jpg',
    link: '/photography'
  },
  {
    title: 'Premium Albums',
    desc: 'Handcrafted luxury albums to preserve your memories.',
    img: 'https://foryou.ie/wp-content/uploads/2024/01/P1012A76_6-1-scaled.jpg',
    link: '/albums'
  },
  {
    title: 'Custom Frames',
    desc: 'Elegant framing solutions for your home walls.',
    img: 'https://m.media-amazon.com/images/I/71xFR6DSk5L._AC_UF894,1000_QL80_.jpg',
    link: '/frames'
  }
];

const ServicesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src="/testimonials-bg.jpg" 
          alt="Wedding Venue Background" 
          className="w-full h-full object-cover object-center opacity-70"
        />
        {/* Standard clean dark overlay, NO blue, NO blur */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold mb-3 drop-shadow-sm">Our Expertise</h2>
          <h3 className="text-4xl font-serif text-white drop-shadow-sm">Everything Under One Roof</h3>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <Link to={service.link} className="group block">
                <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-white/5 border border-white/10 shadow-md transition-all duration-700 ease-out group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/40 group-hover:p-4 group-hover:-translate-y-3 group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] group-hover:rounded-2xl">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover rounded-none transition-all duration-700 ease-out group-hover:rounded-xl group-hover:scale-105 group-hover:rotate-1"
                  />
                </div>
                <h4 className="text-xl font-serif text-white mb-2 group-hover:text-[#d4af37] transition-colors text-center">{service.title}</h4>
                <p className="text-gray-300 font-light text-sm text-center transition-colors duration-500 group-hover:text-white">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-16">
          <Link to="/services" className="inline-block border-b border-white/50 pb-1 uppercase tracking-widest text-sm font-medium text-gray-300 hover:text-secondary hover:border-secondary transition-colors">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
