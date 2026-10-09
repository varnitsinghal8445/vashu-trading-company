import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Camera, Video, CheckCircle2, Heart } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import { Link } from 'react-router-dom';
import axios from 'axios';

const STEPS = {
  INTRO: 0,
  EVENT: 1,
  RATING: 2,
  STORY: 3,
  DETAILS: 4,
  MEDIA: 5,
  SUCCESS: 6
};

const EVENT_TYPES = [
  'Wedding', 'Pre-Wedding', 'Haldi', 'Mehndi', 'Birthday', 'Family Event', 'Other'
];

const SubmitReview = () => {
  const [step, setStep] = useState(STEPS.INTRO);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    eventType: '',
    rating: 0,
    story: '',
    customerName: '',
    partnerName: '',
    email: '',
    phone: '',
    city: '',
    imageUrl: '', // Hardcoded/Placeholder for now, typically handled by S3/Cloudinary
    videoUrl: '',
    permission: false
  });

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      await axios.post('/api/reviews', formData);
      setStep(STEPS.SUCCESS);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting your story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case STEPS.INTRO:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white">WE'D LOVE TO HEAR<br/>YOUR STORY.</h1>
            <p className="text-gray-400 font-light mb-12 max-w-lg mx-auto">
              Your story could help another couple choose their photographer. Let us know how your experience was.
            </p>
            <button 
              onClick={handleNext}
              className="bg-secondary text-black px-12 py-4 uppercase tracking-[0.2em] text-sm font-bold hover:bg-white transition-colors flex items-center gap-4 mx-auto"
            >
              Begin Your Story <ArrowRight size={18} />
            </button>
          </motion.div>
        );

      case STEPS.EVENT:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h2 className="text-sm uppercase tracking-[0.3em] text-secondary mb-2 text-center">Step 1 of 5</h2>
            <h3 className="text-3xl font-serif text-white mb-10 text-center">Tell us about your celebration</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {EVENT_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setFormData({...formData, eventType: type});
                    handleNext();
                  }}
                  className={`p-4 border text-sm uppercase tracking-wider transition-all duration-300 ${
                    formData.eventType === type 
                      ? 'border-secondary bg-secondary/10 text-secondary' 
                      : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case STEPS.RATING:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
            <h2 className="text-sm uppercase tracking-[0.3em] text-secondary mb-2">Step 2 of 5</h2>
            <h3 className="text-3xl font-serif text-white mb-10">How was your experience?</h3>
            
            <div className="flex justify-center gap-4 mb-12">
              {[1, 2, 3, 4, 5].map(star => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => {
                    setFormData({...formData, rating: star});
                    setTimeout(handleNext, 400); // Small delay for UX
                  }}
                  className="text-white/20 focus:outline-none transition-colors duration-200"
                >
                  <Star 
                    size={48} 
                    fill={(hoveredStar || formData.rating) >= star ? '#C19A6B' : 'none'} 
                    color={(hoveredStar || formData.rating) >= star ? '#C19A6B' : 'currentColor'}
                    className="transition-all duration-200"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case STEPS.STORY:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h2 className="text-sm uppercase tracking-[0.3em] text-secondary mb-2 text-center">Step 3 of 5</h2>
            <h3 className="text-3xl font-serif text-white mb-10 text-center">Tell us your story</h3>
            
            <div className="max-w-2xl mx-auto">
              <label className="block text-gray-400 text-sm mb-4">What did you love most about your experience?</label>
              <textarea
                value={formData.story}
                onChange={e => setFormData({...formData, story: e.target.value})}
                placeholder="Share your favorite moments, how the team made you feel, and your thoughts on the final photographs..."
                className="w-full bg-white/5 border border-white/10 p-6 text-white h-48 focus:outline-none focus:border-secondary mb-8 resize-none"
              />
              <div className="flex justify-between">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white uppercase tracking-widest text-xs">Back</button>
                <button 
                  onClick={handleNext} 
                  disabled={!formData.story.trim()}
                  className="bg-secondary text-black px-8 py-3 uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        );

      case STEPS.DETAILS:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h2 className="text-sm uppercase tracking-[0.3em] text-secondary mb-2 text-center">Step 4 of 5</h2>
            <h3 className="text-3xl font-serif text-white mb-10 text-center">Your details</h3>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Your Name *</label>
                  <input 
                    type="text" required
                    value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-secondary" 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Partner's Name (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.partnerName} onChange={e => setFormData({...formData, partnerName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-secondary" 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email *</label>
                  <input 
                    type="email" required
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-secondary" 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-secondary" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">City</label>
                  <input 
                    type="text" 
                    value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-secondary" 
                  />
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white uppercase tracking-widest text-xs">Back</button>
                <button 
                  onClick={handleNext} 
                  disabled={!formData.customerName || !formData.email}
                  className="bg-secondary text-black px-8 py-3 uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        );

      case STEPS.MEDIA:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h2 className="text-sm uppercase tracking-[0.3em] text-secondary mb-2 text-center">Final Step</h2>
            <h3 className="text-3xl font-serif text-white mb-10 text-center">Share the memory</h3>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="border border-dashed border-white/20 bg-white/5 p-8 text-center cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-colors">
                  <Camera size={32} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-sm text-gray-400">Upload a Photo (Optional)</p>
                </div>
                <div className="border border-dashed border-white/20 bg-white/5 p-8 text-center cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-colors">
                  <Video size={32} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-sm text-gray-400">Upload a Video (Optional)</p>
                </div>
              </div>

              <label className="flex items-start gap-4 mb-10 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1 w-5 h-5 accent-secondary"
                  checked={formData.permission}
                  onChange={e => setFormData({...formData, permission: e.target.checked})}
                />
                <span className="text-sm text-gray-400 leading-relaxed">
                  I give permission for my review and uploaded media to be displayed publicly on the website and social media channels.
                </span>
              </label>

              <div className="flex justify-between items-center pt-8 border-t border-white/10">
                <button onClick={handlePrev} className="text-gray-500 hover:text-white uppercase tracking-widest text-xs">Back</button>
                <button 
                  onClick={submitForm} 
                  disabled={!formData.permission || isSubmitting}
                  className="bg-white text-black px-10 py-4 uppercase tracking-[0.2em] text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit My Story'}
                </button>
              </div>
            </div>
          </motion.div>
        );

      case STEPS.SUCCESS:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <Heart size={64} className="text-secondary mx-auto mb-8" fill="currentColor" />
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              THANK YOU FOR TRUSTING US<br/>WITH YOUR STORY.
            </h1>
            <p className="text-xl text-gray-400 font-light italic mb-12">
              "Your words mean more than you know."
            </p>
            
            <div className="aspect-video max-w-sm mx-auto bg-white/5 border border-white/10 p-2 rounded-sm rotate-2 mb-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/ai-wedding/couple_small.jpg')] bg-cover bg-center opacity-50 grayscale mix-blend-screen"></div>
              {/* Film grain effect overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
            </div>

            <Link to="/reviews" className="inline-block border border-white/30 text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
              Return to Our Stories
            </Link>
          </motion.div>
        );
      
      default: return null;
    }
  };

  return (
    <PageWrapper className="bg-[#0a0a0a] min-h-screen pt-24 md:pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {step > STEPS.INTRO && step < STEPS.SUCCESS && (
          <div className="w-full bg-white/10 h-1 mb-16 rounded-full overflow-hidden">
            <div 
              className="bg-secondary h-full transition-all duration-500 ease-out" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};

export default SubmitReview;
