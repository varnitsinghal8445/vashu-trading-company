import { eventTypes } from '../../data/eventServices';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const StepFunctions = ({ state, updateState, onNext, onPrev }) => {
  const selectedEvent = eventTypes.find(e => e.id === state.eventId);
  
  if (!selectedEvent) return null;

  const toggleFunction = (fnId) => {
    updateState('functions', prev => {
      if (prev.includes(fnId)) {
        return prev.filter(id => id !== fnId);
      }
      return [...prev, fnId];
    });
  };

  return (
    <div className="space-y-8 flex flex-col h-full">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-wide">Which functions do you have?</h2>
        <p className="text-gray-400 font-light text-sm md:text-base">Select all the events you need coverage for. (You can select multiple)</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-grow">
        {selectedEvent.functions.map((fn, index) => {
          const isSelected = state.functions.includes(fn.id);
          return (
            <motion.button
              key={fn.id}
              onClick={() => toggleFunction(fn.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-5 border rounded-xl text-left transition-all duration-300 flex flex-col justify-between h-28 ${
                isSelected 
                  ? 'border-secondary bg-secondary/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                  : 'border-white/10 bg-black/40 hover:border-secondary/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)]'
              }`}
            >
              <div className="flex justify-end w-full">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'bg-secondary border-secondary shadow-[0_0_8px_#d4af37]' : 'border-gray-500'}`}>
                  {isSelected && <Check size={12} className="text-black" />}
                </div>
              </div>
              <span className={`font-medium text-sm md:text-base mt-2 transition-colors ${isSelected ? 'text-secondary' : 'text-gray-300'}`}>
                {fn.name}
              </span>
            </motion.button>
          );
        })}
      </div>

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
          disabled={state.functions.length === 0}
          className={`flex items-center px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-sm ${
            state.functions.length > 0 
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

export default StepFunctions;
