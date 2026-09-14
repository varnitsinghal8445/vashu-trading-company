import { eventTypes, serviceOptions, functionSpecificServices } from '../../data/eventServices';
import { ArrowLeft, ArrowRight, CheckSquare, Square } from 'lucide-react';

const StepServices = ({ state, updateState, onNext, onPrev }) => {
  const selectedEvent = eventTypes.find(e => e.id === state.eventId);
  
  // Create a helper to safely get services for a function, or default
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
        <h2 className="text-3xl font-serif text-primary mb-2">What services do you need?</h2>
        <p className="text-gray-500 font-light text-sm">Select the type of coverage you want for each specific event.</p>
      </div>

      <div className="flex-grow space-y-10 overflow-y-auto pr-2 custom-scrollbar max-h-[50vh]">
        {state.functions.map(fnId => {
          const fn = selectedEvent.functions.find(f => f.id === fnId);
          const availableSrvs = getServicesForFunction(fnId);
          const selectedSrvs = state.services[fnId] || [];

          return (
            <div key={fnId} className="bg-gray-50 p-6 border border-gray-100 rounded-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {fn.name}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableSrvs.map(srv => {
                  const isSelected = selectedSrvs.includes(srv.id);
                  return (
                    <button
                      key={srv.id}
                      onClick={() => toggleService(fnId, srv.id)}
                      className={`flex items-start text-left gap-3 p-3 transition-colors ${
                        isSelected ? 'bg-white shadow-sm border border-secondary/30 rounded-sm' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="mt-0.5 text-secondary shrink-0">
                        {isSelected ? <CheckSquare size={18} /> : <Square size={18} className="text-gray-400" />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                          {srv.name}
                        </p>
                        {srv.basePrice === 'Custom Quote' ? (
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Requires Quote</p>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-auto">
        <button 
          onClick={onPrev}
          className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={14} className="mr-2" /> Back
        </button>
        
        <button 
          onClick={onNext}
          className="flex items-center px-6 py-3 text-xs font-bold uppercase tracking-widest bg-secondary text-primary hover:bg-black hover:text-white transition-colors"
        >
          Continue <ArrowRight size={14} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepServices;
