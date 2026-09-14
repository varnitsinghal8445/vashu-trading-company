import { eventTypes, serviceOptions, functionSpecificServices } from '../../data/eventServices';
import { ArrowLeft, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StepServices = ({ state, updateState, onNext, onPrev }) => {
  const selectedEvent = eventTypes.find(e => e.id === state.eventId);
  
  const getServicesForFunction = (fnId) => {
    const srvIds = functionSpecificServices[fnId] || functionSpecificServices['default'];
    return serviceOptions.filter(s => srvIds.includes(s.id));
  };

  const toggleService = (fnId, srvId) => {
    updateState('services', prev => {
      const currentForFn = prev[fnId] || [];
      const newForFn = currentForFn.includes(srvId)
        ? currentForFn.filter(id => id !== srvId)
        : [...currentForFn, srvId];
        
      return {
        ...prev,
        [fnId]: newForFn
      };
    });
  };

  return (
    <div className="space-y-8 flex flex-col h-full">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-wide">What services do you need?</h2>
        <p className="text-gray-400 font-light text-sm md:text-base">Select the type of coverage you want for each specific event.</p>
      </div>

      <div className="flex-grow space-y-8 overflow-y-auto pr-4 custom-scrollbar max-h-[50vh]">
        {state.functions.map((fnId, index) => {
          const fn = selectedEvent.functions.find(f => f.id === fnId);
          const availableSrvs = getServicesForFunction(fnId);
          const selectedSrvs = state.services[fnId] || [];

          return (
            <motion.div 
              key={fnId} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/30 p-6 border border-white/10 rounded-xl backdrop-blur-md"
            >
              <h3 className="text-lg font-bold text-white mb-4 pb-3 border-b border-white/10 flex items-center">
                <span className="w-2 h-2 rounded-full bg-secondary mr-3 shadow-[0_0_8px_#d4af37]"></span>
                {fn.name}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableSrvs.map(srv => {
                  const isSelected = selectedSrvs.includes(srv.id);
                  return (
                    <motion.button
                      key={srv.id}
                      onClick={() => toggleService(fnId, srv.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-start text-left gap-4 p-4 transition-all duration-300 rounded-lg ${
                        isSelected 
                          ? 'bg-secondary/10 border border-secondary/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                          : 'bg-black/40 border border-white/5 hover:bg-black/60 hover:border-secondary/30'
                      }`}
                    >
                      <div className={`mt-0.5 shrink-0 transition-colors ${isSelected ? 'text-secondary' : 'text-gray-500'}`}>
                        {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium transition-colors ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                          {srv.name}
                        </p>
                        {srv.basePrice === 'Custom Quote' ? (
                          <p className="text-[10px] text-secondary uppercase tracking-widest mt-1 opacity-80">Requires Quote</p>
                        ) : null}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
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
          className="flex items-center px-8 py-4 text-xs font-bold uppercase tracking-widest bg-secondary text-black hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all rounded-sm"
        >
          Continue <ArrowRight size={14} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepServices;
