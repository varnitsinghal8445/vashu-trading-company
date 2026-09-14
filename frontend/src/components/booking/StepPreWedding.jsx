import { preWeddingOptions } from '../../data/eventServices';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StepPreWedding = ({ state, updateState, onNext, onPrev }) => {
  const isNeeded = state.preWedding.needed;

  const handleChoice = (choice) => {
    updateState('preWedding', prev => ({ ...prev, needed: choice }));
    if (!choice) {
      // Small timeout for visual feedback before auto-advancing
      setTimeout(onNext, 400);
    }
  };

  return (
    <div className="space-y-8 flex flex-col h-full">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-wide">Pre-Wedding Shoot</h2>
        <p className="text-gray-400 font-light text-sm md:text-base">Would you like to add a pre-wedding shoot to your package?</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleChoice(true)}
          className={`flex-1 py-5 px-4 border rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
            isNeeded === true 
              ? 'bg-secondary/20 text-secondary border-secondary shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
              : 'border-white/10 text-gray-400 bg-black/40 hover:border-secondary/50 hover:bg-black/60 hover:text-white'
          }`}
        >
          Yes, Add Pre-Wedding
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleChoice(false)}
          className={`flex-1 py-5 px-4 border rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
            isNeeded === false 
              ? 'bg-white/10 text-white border-white/30' 
              : 'border-white/10 text-gray-400 bg-black/40 hover:border-white/30 hover:bg-black/60 hover:text-white'
          }`}
        >
          No, Skip
        </motion.button>
      </div>

      <AnimatePresence>
        {isNeeded && (
          <motion.div 
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-grow"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-black/30 p-6 md:p-8 border border-white/10 rounded-xl backdrop-blur-md mt-4">
              
              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Location Type</label>
                <select 
                  value={state.preWedding.location}
                  onChange={(e) => updateState('preWedding', prev => ({ ...prev, location: e.target.value }))}
                  className="w-full border border-white/20 p-3.5 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none bg-black/50 text-white rounded-lg transition-colors"
                >
                  <option value="" className="bg-gray-900">Select Location...</option>
                  {preWeddingOptions.locations.map(opt => <option key={opt} value={opt} className="bg-gray-900">{opt}</option>)}
                </select>
              </div>

              {/* Days */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Duration</label>
                <select 
                  value={state.preWedding.days}
                  onChange={(e) => updateState('preWedding', prev => ({ ...prev, days: e.target.value }))}
                  className="w-full border border-white/20 p-3.5 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none bg-black/50 text-white rounded-lg transition-colors"
                >
                  <option value="" className="bg-gray-900">Select Duration...</option>
                  {preWeddingOptions.days.map(opt => <option key={opt} value={opt} className="bg-gray-900">{opt}</option>)}
                </select>
              </div>

              {/* Photography */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Photography Style</label>
                <select 
                  value={state.preWedding.photography}
                  onChange={(e) => updateState('preWedding', prev => ({ ...prev, photography: e.target.value }))}
                  className="w-full border border-white/20 p-3.5 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none bg-black/50 text-white rounded-lg transition-colors"
                >
                  <option value="" className="bg-gray-900">Select Style...</option>
                  {preWeddingOptions.photography.map(opt => <option key={opt} value={opt} className="bg-gray-900">{opt}</option>)}
                </select>
              </div>

              {/* Video */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Video Coverage</label>
                <select 
                  value={state.preWedding.video}
                  onChange={(e) => updateState('preWedding', prev => ({ ...prev, video: e.target.value }))}
                  className="w-full border border-white/20 p-3.5 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none bg-black/50 text-white rounded-lg transition-colors"
                >
                  <option value="" className="bg-gray-900">Select Video...</option>
                  {preWeddingOptions.video.map(opt => <option key={opt} value={opt} className="bg-gray-900">{opt}</option>)}
                </select>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-auto">
        <button 
          onClick={onPrev}
          className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} className="mr-2" /> Back
        </button>
        
        <button 
          onClick={onNext}
          disabled={isNeeded === null}
          className={`flex items-center px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-sm ${
            isNeeded !== null
              ? 'bg-secondary text-black hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
              : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
          }`}
        >
          Continue <ArrowRight size={14} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepPreWedding;
