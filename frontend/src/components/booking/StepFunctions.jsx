import { eventTypes } from '../../data/eventServices';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

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
        <h2 className="text-3xl font-serif text-primary mb-2">Which functions do you have?</h2>
        <p className="text-gray-500 font-light text-sm">Select all the events you need coverage for. (You can select multiple)</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-grow">
        {selectedEvent.functions.map(fn => {
          const isSelected = state.functions.includes(fn.id);
          return (
            <button
              key={fn.id}
              onClick={() => toggleFunction(fn.id)}
              className={`p-4 border rounded-sm text-left transition-all duration-200 flex flex-col justify-between h-24 ${
                isSelected 
                  ? 'border-secondary bg-secondary/5 ring-1 ring-secondary' 
                  : 'border-gray-200 hover:border-gray-400 bg-white'
              }`}
            >
              <div className="flex justify-end w-full">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-secondary border-secondary' : 'border-gray-300'}`}>
                  {isSelected && <Check size={10} className="text-white" />}
                </div>
              </div>
              <span className={`font-medium text-sm mt-2 ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                {fn.name}
              </span>
            </button>
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
          disabled={state.functions.length === 0}
          className={`flex items-center px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
            state.functions.length > 0 
              ? 'bg-secondary text-primary hover:bg-black hover:text-white' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue <ArrowRight size={14} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepFunctions;
