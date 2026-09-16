import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary/50 backdrop-blur-2xl border-t border-white/5 text-white pt-16 pb-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif font-bold tracking-wider mb-4">Vasu Trading Company<span className="text-secondary">.</span></h2>
            <p className="text-gray-400 font-light text-sm max-w-sm">
              36 Years of Turning Moments Into Memories. Premium photography and cinematography based in India. From capturing intimate moments to creating beautiful albums, frames and digital memories — everything under one roof.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-serif mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-3 font-light text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Journey</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Customer Reviews</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif mb-6 text-secondary">Services</h4>
            <ul className="space-y-3 font-light text-sm text-gray-400">
              <li><Link to="/photography" className="hover:text-white transition-colors">Wedding Photography</Link></li>
              <li><Link to="/albums" className="hover:text-white transition-colors">Premium Albums</Link></li>
              <li><Link to="/frames" className="hover:text-white transition-colors">Custom Frames</Link></li>
              <li><Link to="/photo-printing" className="hover:text-white transition-colors">Photo Printing</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-light">
          <p className="text-sm font-light uppercase tracking-widest text-center">&copy; {new Date().getFullYear()} Vasu Trading Company. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
