import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, ChevronDown, CheckCircle, Camera } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import { Link } from 'react-router-dom';

const categories = [
  "ALL", "WEDDING", "PRE-WEDDING", "HALDI", "MEHNDI", "BIRTHDAY", "FAMILY"
];

// Placeholder reviews until API is connected
const MOCK_REVIEWS = [
  {
    id: 1,
    customerName: "Aarav & Riya",
    eventType: "WEDDING",
    location: "Agra",
    rating: 5,
    story: "Every photograph brought us back to the exact moment. The entire experience was flawless from start to finish. You didn't just take pictures; you captured the soul of our celebration.",
    imageUrl: "/images/ai-wedding/couple_large.jpg",
    date: "Dec 2025",
    isFeatured: true
  },
  {
    id: 2,
    customerName: "Sneha & Vikram",
    eventType: "PRE-WEDDING",
    location: "Udaipur",
    rating: 5,
    story: "Working with you wasn't just about getting beautiful photographs. You made every moment feel comfortable, natural and special. We couldn't be happier.",
    imageUrl: "/images/ai-wedding/haldi_small.jpg",
    date: "Oct 2025",
    isFeatured: false
  },
  {
    id: 3,
    customerName: "The Sharma Family",
    eventType: "FAMILY",
    location: "Delhi",
    rating: 5,
    story: "The moment we saw these photographs, we relived the entire day. Truly magical.",
    imageUrl: "/images/ai-wedding/family_large.jpg",
    date: "Nov 2025",
    isFeatured: false
  },
  {
    id: 4,
    customerName: "Priya's Haldi",
    eventType: "HALDI",
    location: "Jaipur",
    rating: 5,
    story: "You captured the emotion perfectly. Every vibrant color and every smile was immortalized.",
    imageUrl: "/images/ai-wedding/haldi_large.jpg",
    date: "Jan 2026",
    isFeatured: false
  },
  {
    id: 5,
    customerName: "Rahul & Anjali",
    eventType: "MEHNDI",
    location: "Agra",
    rating: 5,
    story: "A phenomenal experience. The team was invisible yet present for every crucial second.",
    imageUrl: "/images/ai-wedding/mehndi_large.jpg",
    date: "Feb 2026",
    isFeatured: false
  }
];

const Reviews = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState(MOCK_REVIEWS); // Eventually fetch from API
  
  const filteredReviews = activeCategory === "ALL" 
    ? reviews 
    : reviews.filter(r => r.eventType === activeCategory);

  const featuredReview = reviews.find(r => r.isFeatured) || reviews[0];
  const wallReviews = filteredReviews.filter(r => r.id !== featuredReview?.id);

  return (
    <PageWrapper className="bg-[#0a0a0a] min-h-screen text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/ai-wedding/photography_hero_bg.jpg" 
            alt="Real Stories Hero" 
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif mb-6 tracking-tight leading-tight"
          >
            THE STORIES<br/>THEY LEFT BEHIND.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl mx-auto italic"
          >
            "More than photographs, it's about how the experience made you feel."
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll to Explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. REVIEW STATISTICS */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="px-4 py-8 md:py-0"
          >
            <div className="flex justify-center text-secondary mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
            </div>
            <h3 className="text-5xl font-serif mb-2">5.0</h3>
            <p className="text-sm uppercase tracking-widest text-gray-400">Average Experience</p>
          </motion.div>
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="px-4 py-8 md:py-0"
          >
            <h3 className="text-5xl font-serif mb-2">100+</h3>
            <p className="text-sm uppercase tracking-widest text-gray-400">Celebrations Captured</p>
          </motion.div>
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="px-4 py-8 md:py-0"
          >
            <h3 className="text-5xl font-serif mb-2">98%</h3>
            <p className="text-sm uppercase tracking-widest text-gray-400">Clients Recommend Us</p>
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED CLIENT STORY */}
      {featuredReview && (
        <section className="py-32 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-secondary border border-secondary/30 px-4 py-1 rounded-full">Featured Story</span>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -30 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 relative"
              >
                <div className="aspect-[4/5] relative bg-white/5 p-2 rounded-sm transform -rotate-2 hover:rotate-0 transition-all duration-700">
                  <img src={featuredReview.imageUrl} alt={featuredReview.customerName} className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </motion.div>
              
              <motion.div 
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 30 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="flex text-secondary mb-8">
                  {[...Array(featuredReview.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-10 italic text-white/90">
                  "{featuredReview.story}"
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-secondary"></div>
                  <div>
                    <h4 className="text-xl font-medium tracking-wide">{featuredReview.customerName}</h4>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">{featuredReview.eventType} • {featuredReview.location}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 5. REVIEW CATEGORIES */}
      <section className="pt-20 pb-10 px-4 sticky top-16 md:top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar gap-2 md:gap-4 md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-secondary text-black font-bold' 
                  : 'bg-transparent text-gray-500 hover:text-white border border-transparent hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4 & 6. MASONRY REVIEW GRID / MEMORY WALL */}
      <section className="py-20 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">The Memory Wall</h2>
            <p className="text-gray-400 font-light">Every review represents a real person, a real celebration, and a real photograph.</p>
          </div>

          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            <AnimatePresence>
              {wallReviews.map((review, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={review.id}
                  onClick={() => setSelectedReview(review)}
                  className="break-inside-avoid relative group cursor-pointer"
                >
                  <div className="bg-white/5 border border-white/10 p-2 rounded-sm overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:bg-white/10">
                    <div className="relative overflow-hidden mb-6 rounded-sm">
                      <img 
                        src={review.imageUrl} 
                        alt={review.customerName} 
                        className="w-full h-auto object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                      <div className="absolute bottom-4 left-4 flex gap-1 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                    
                    <div className="px-6 pb-6">
                      <p className="text-lg font-serif italic text-gray-300 mb-6 leading-relaxed line-clamp-3 group-hover:text-white transition-colors">
                        "{review.story}"
                      </p>
                      
                      <div className="flex justify-between items-end border-t border-white/10 pt-4">
                        <div>
                          <h4 className="font-medium text-white/90">{review.customerName}</h4>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                            {review.eventType} • {review.date}
                          </p>
                        </div>
                        <CheckCircle size={16} className="text-green-500/50" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* EMPTY STATE */}
          {wallReviews.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera size={32} className="text-gray-500" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Your Story Could Be Here.</h3>
              <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
                Be one of the first couples to share your experience in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 7. REVIEW -> PHOTOGRAPH CONNECTION MODAL */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedReview(null)}
                className="absolute top-4 right-4 z-20 text-white/50 hover:text-white bg-black/50 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              >
                ✕
              </button>
              
              <div className="w-full md:w-3/5 relative bg-black">
                <img 
                  src={selectedReview.imageUrl} 
                  alt={selectedReview.customerName} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col justify-center bg-white/5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-8">The moment behind the review</span>
                <div className="flex text-secondary mb-6">
                  {[...Array(selectedReview.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <h3 className="text-2xl font-serif italic leading-relaxed mb-8 text-white/90">
                  "{selectedReview.story}"
                </h3>
                <div className="mt-auto pt-8 border-t border-white/10">
                  <h4 className="text-lg font-medium tracking-wide">{selectedReview.customerName}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{selectedReview.eventType} • {selectedReview.location}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. VIDEO TESTIMONIALS (EMPTY STATE) */}
      <section className="py-24 bg-white/5 border-y border-white/10 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-serif mb-6">Hear It From Them</h2>
        <p className="text-gray-400 font-light max-w-xl mx-auto mb-12">
          Watch cinematic stories and personal experiences from the couples who trusted us.
        </p>
        <div className="w-full max-w-4xl mx-auto aspect-video bg-black border border-white/10 rounded-sm flex items-center justify-center relative group cursor-not-allowed">
          <div className="absolute inset-0 bg-[url('/images/ai-wedding/ceremony_large.jpg')] bg-cover bg-center opacity-30 grayscale mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center mb-6">
              <Play size={24} className="text-white/50 ml-1" />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/50">Cinematic Stories Coming Soon</p>
          </div>
        </div>
      </section>

      {/* 18. FINAL CTA */}
      <section className="relative py-32 px-4 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/ai-wedding/arrival_large.jpg" 
            alt="Final CTA Background" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">YOUR STORY DESERVES TO BE REMEMBERED.</h2>
          <p className="text-xl text-gray-400 font-light italic mb-12">
            "Let us turn your moments into memories you'll return to for years."
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/book-now" className="bg-secondary text-black px-10 py-4 uppercase tracking-[0.2em] text-sm font-bold hover:bg-white transition-colors duration-300">
              Book Your Date
            </Link>
            <Link to="/review" className="bg-transparent border border-white/30 text-white px-10 py-4 uppercase tracking-[0.2em] text-sm font-bold hover:bg-white hover:text-black transition-colors duration-300">
              Share Your Experience
            </Link>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
};

export default Reviews;