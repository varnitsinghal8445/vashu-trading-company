import { motion } from 'framer-motion';

const PageWrapper = ({ children, className = 'pt-24' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen flex flex-col"
    >
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
    </motion.div>
  );
};

export default PageWrapper;
