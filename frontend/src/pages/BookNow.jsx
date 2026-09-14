import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import BookingWizard from '../components/booking/BookingWizard';
import bgImage from '../assets/cinematic-bg.jpg'; // or process-wedding-bg.jpg

const BookNow = () => {
  return (
    <PageWrapper className="relative min-h-screen pt-32 pb-32 overflow-hidden">
      {/* Cinematic Background Image with Parallax & Overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Dark gradient overlay so the white wizard pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[2px]" />
      </motion.div>

      {/* Floating Animated Wizard */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-5xl font-serif text-white mb-3"
          >
            Design Your Wedding Story
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-400 font-light tracking-wide text-sm max-w-2xl mx-auto"
          >
            A tailored, premium experience to customize every detail of your big day.
          </motion.p>
        </div>

        {/* Wizard Container with float */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <BookingWizard />
        </motion.div>
      </motion.div>
      
      {/* Decorative floating particles/lights can be added here if desired */}
    </PageWrapper>
  );
};

export default BookNow;