import { eventTypes } from '../../data/eventServices';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const StepEvent = ({ state, updateState, onNext }) => {
  const handleSelect = (id) => {
    updateState('eventId', id);
    updateState('functions', []);
    updateState('services', {});
    updateState('preWedding', { needed: null, location: '', photography: '', video: '', days: '' });
    updateState('albums', []);
    setTimeout(onNext, 400); // Slightly longer for the click animation to finish
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-wide">What are you celebrating?</h2>
        <p className="text-gray-400 font-light text-sm md:text-base">Select your main event type to begin building your custom package.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {eventTypes.map((event, index) => {
          const isSelected = state.eventId === event.id;
          return (
            <motion.button
              key={event.id}
              onClick={() => handleSelect(event.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 text-left border rounded-xl transition-all duration-300 group flex flex-col justify-between min-h-[160px] ${
                isSelected 
                  ? 'border-secondary bg-secondary/10 shadow-[0_0_30px_rgba(212,175,55,0.2)]' 
                  : 'border-white/10 bg-black/40 hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:bg-black/60'
              }`}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                  {event.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed mb-4">
                  {event.description}
                </p>
              </div>
              
              <div className={`flex items-center text-xs font-bold uppercase tracking-widest transition-colors ${isSelected ? 'text-secondary' : 'text-gray-500 group-hover:text-secondary'}`}>
                Select <ArrowRight size={14} className={`ml-2 transition-transform ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
              </div>
            </motion.button>
          );
        })}
      </div>
      
      <div className="h-12"></div>
    </div>
  );
};

export default StepEvent;
