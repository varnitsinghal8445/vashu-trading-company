import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*New Inquiry via Contact Page*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Event Date:* ${formData.date}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/918445100650?text=${text}`, '_blank');
  };

  return (
    <PageWrapper className="relative bg-[#070707] min-h-screen text-white overflow-hidden">
      
      {/* Cinematic Animated Hero Background */}
      <div className="absolute inset-0 z-0 h-[70vh] opacity-35 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-cover bg-center origin-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#070707]/90 to-[#070707]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <div className="h-[1px] w-20 bg-secondary/50 mx-auto mb-8"></div>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight mb-6">
            Let's create something <span className="text-secondary italic">timeless.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
            Whether you're planning an intimate gathering or a grand celebration, we'd love to hear your story. Reach out to check our availability and discuss your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-8">Studio Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start group hover:-translate-y-1 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-secondary mt-1 mr-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h3 className="font-serif text-xl text-white mb-2">Visit Us</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Durga Photo Studio<br />
                      On Road Ambedkar Market<br />
                      Thana Bhawan, Shamli (U.P.) - 247777
                    </p>
                  </div>
                </div>

                <div className="flex items-start group hover:-translate-y-1 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-secondary mt-1 mr-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h3 className="font-serif text-xl text-white mb-2">Call Us</h3>
                    <p className="text-gray-400 font-light">+91 84451 00650<br />+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start group hover:-translate-y-1 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-secondary mt-1 mr-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h3 className="font-serif text-xl text-white mb-2">Email Us</h3>
                    <p className="text-gray-400 font-light">hello@vasutrading.com<br />bookings@vasutrading.com</p>
                  </div>
                </div>

                <div className="flex items-start group hover:-translate-y-1 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-secondary mt-1 mr-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h3 className="font-serif text-xl text-white mb-2">Studio Hours</h3>
                    <p className="text-gray-400 font-light">Tuesday - Sunday<br />10:00 AM - 7:00 PM<br />(By Appointment Only)</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-6">Connect</h2>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors p-3 border border-white/10 rounded-full hover:border-secondary hover:bg-secondary/10">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors p-3 border border-white/10 rounded-full hover:border-secondary hover:bg-secondary/10">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-7 bg-[#0f0f0f] p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Cinematic subtle glow in form */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <h2 className="text-3xl font-serif text-white mb-2">Send an Inquiry</h2>
            <p className="text-gray-400 font-light mb-10 text-sm">Fill out the form below and we will get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                  />
                  <label className="absolute left-0 top-3 text-gray-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-secondary peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                    Your Name
                  </label>
                </div>
                <div className="relative group">
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                  />
                  <label className="absolute left-0 top-3 text-gray-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-secondary peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                  />
                  <label className="absolute left-0 top-3 text-gray-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-secondary peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                    Phone Number
                  </label>
                </div>
                <div className="relative group">
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-secondary transition-colors min-h-[48px]"
                  />
                  <label className="absolute left-0 -top-4 text-xs text-gray-500 transition-all peer-focus:text-secondary pointer-events-none">
                    Event Date (Optional)
                  </label>
                </div>
              </div>

              <div className="relative group pt-4">
                <textarea 
                  name="message" 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  rows="4"
                  className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-secondary transition-colors resize-none"
                ></textarea>
                <label className="absolute left-0 top-7 text-gray-500 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-secondary peer-valid:top-0 peer-valid:text-xs pointer-events-none">
                  Tell us about your event / Inquiry
                </label>
              </div>

              <button 
                type="submit" 
                className="mt-8 w-full relative overflow-hidden group border border-secondary px-12 py-5 bg-black"
              >
                <div className="absolute inset-0 bg-secondary w-0 group-hover:w-full transition-all duration-700 ease-out z-0"></div>
                <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-700">
                  Send Message
                </span>
              </button>
            </form>
          </motion.div>
        </div>

        {/* Dark Google Map Embed */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 w-full h-[400px] border border-white/10 p-2 bg-[#0f0f0f] rounded-sm grayscale-[80%] hover:grayscale-0 transition-all duration-1000"
        >
          <iframe 
            src="https://www.google.com/maps?q=Durga+Photo+Studio,+Ambedkar+Market,+Thana+Bhawan,+Shamli,+UP&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(80%) contrast(120%)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

      </div>
    </PageWrapper>
  );
};

export default Contact;