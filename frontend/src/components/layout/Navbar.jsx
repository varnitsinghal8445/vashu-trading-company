import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Photography', path: '/photography' },
    { name: 'Products', path: '/shop' },
    { name: 'Albums', path: '/albums' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Dynamic styling for premium cinematic look
  const navBg = scrolled 
    ? 'bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/10 shadow-lg py-3' 
    : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${navBg}`}>
      <div className="w-full px-4 md:px-6 lg:px-6">
        <div className="flex justify-between items-center">
          
          {/* FAR LEFT: Logo */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="relative overflow-hidden flex items-center justify-center h-8 w-8 bg-white rounded-sm p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-105">
              <img 
                src="/vasu-logo.jpg" 
                alt="Vasu Trading Company Logo" 
                className="w-full h-full object-cover rounded-sm mix-blend-multiply"
              />
            </div>
            
            <span className="text-lg md:text-xl font-serif font-bold tracking-widest hidden sm:block text-white transition-colors duration-300 group-hover:text-[#d4af37]">
              VASU<span className="text-[#d4af37] font-light text-[11px] ml-1.5 tracking-[0.3em] uppercase">Trading Co.</span>
            </span>
          </Link>

          {/* FAR RIGHT: Desktop Nav */}
          <div className="hidden lg:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 focus:outline-none group ${
                  location.pathname === link.path ? 'text-[#d4af37] font-bold' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {/* Animated Underline */}
                <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-[#d4af37] transform origin-left transition-transform duration-300 ${
                  location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
            
            <Link
              to="/book-now"
              className="ml-4 px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 rounded-sm focus:outline-none border border-[#d4af37]/60 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none hover:text-[#d4af37] transition-colors">
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a0a] border-t border-white/10 mt-4 shadow-2xl"
          >
            <div className="px-6 pt-6 pb-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-4 py-4 text-sm uppercase tracking-[0.2em] text-gray-300 border-b border-white/5 hover:text-[#d4af37] hover:bg-white/5 transition-colors focus:outline-none"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/book-now"
                className="block mt-8 text-center bg-[#d4af37] text-[#0a0a0a] px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all focus:outline-none"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
