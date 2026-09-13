import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const PhotoViewer = ({ photos, currentIndex, onClose, onNavigate, onToggleFavorite, favorites }) => {
  const currentPhoto = photos[currentIndex];
  const isFavorite = favorites.includes(currentPhoto.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
        >
          <X size={32} />
        </button>

        <div className="absolute top-6 left-6 text-white/70 font-light tracking-wider">
          {currentIndex + 1} / {photos.length}
        </div>

        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-6 text-white/50 hover:text-white transition-colors z-50"
        >
          <ChevronLeft size={48} />
        </button>

        <button
          onClick={() => onNavigate('next')}
          className="absolute right-6 text-white/50 hover:text-white transition-colors z-50"
        >
          <ChevronRight size={48} />
        </button>

        <button
          onClick={() => onToggleFavorite(currentPhoto.id)}
          className={`absolute bottom-8 right-8 p-4 rounded-full transition-all duration-300 z-50 ${
            isFavorite ? 'bg-secondary text-white shadow-[0_0_20px_rgba(203,162,88,0.4)]' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Heart size={28} className={isFavorite ? 'fill-current' : ''} />
        </button>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[90vh]"
        >
          <img
            src={currentPhoto.url}
            alt="Gallery Fullscreen"
            className="max-w-full max-h-[90vh] object-contain rounded-sm"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoViewer;
