import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const products = [
  {
    title: "Wedding Cinematic Video",
    desc: "Capture breathtaking, authentic wedding moments and relive your stories in motion with our expert cinematography services.",
    img: "/product_ai_video.jpg",
    link: "/shop",
    hasMotion: true // Flag to add continuous motion
  },
  {
    title: "Premium Photobook Album",
    desc: "Exquisite hardbound wedding albums printed on archival quality fine art paper.",
    img: "/product_photobook_new.webp",
    link: "/shop"
  },
  {
    title: "Photo Box Cover",
    desc: "Luxurious crafted presentation boxes to safeguard your most precious memories.",
    img: "/product_photo_box.jpg",
    link: "/shop"
  }
];

const ProductsSection = () => {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" id="products">
      
      {/* Simple, Cute Wedding Image Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src="/dreamy_wedding_bg.jpg" 
          alt="Dreamy Wedding Background"
          className="w-full h-full object-cover"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.75, 0.6],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* High Contrast Overlay: Ensures text readability without making the image too dark */}
      <div className="absolute inset-0 bg-[#0a0a0a]/60 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold mb-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">Our Store</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white drop-shadow-lg">Products & Supplies</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link key={index} to={product.link}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group h-full bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-sm transition-all duration-500 hover:bg-white/10 hover:border-secondary/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
              >
                {/* Glowing Gold Accent on Hover */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="overflow-hidden rounded-sm mb-6 aspect-square relative z-10 bg-black border border-white/10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 z-10 pointer-events-none"></div>
                  
                  {product.hasMotion ? (
                    <motion.img 
                      src={product.img} 
                      alt={product.title} 
                      className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ) : (
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                  )}
                </div>
                
                <div className="relative z-10 px-2 pb-2 text-center">
                  <h4 className="text-lg font-serif text-white mb-2 group-hover:text-[#fff5d1] transition-colors duration-300">{product.title}</h4>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{product.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        {/* Subtle View Store Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center relative z-10"
        >
          <Link to="/shop" className="inline-flex items-center gap-2 text-secondary hover:text-white uppercase tracking-widest text-sm font-bold transition-colors duration-300 group">
            Explore All Products
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
