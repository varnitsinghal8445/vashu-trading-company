import { eventTypes } from '../../data/eventServices';
import { ArrowRight } from 'lucide-react';

const StepEvent = ({ state, updateState, onNext }) => {
  const handleSelect = (id) => {
    updateState('eventId', id);
    // Reset downstream state when event changes
    updateState('functions', []);
    updateState('services', {});
    updateState('preWedding', { needed: null, location: '', photography: '', video: '', days: '' });
    updateState('albums', []);
    
    // Automatically advance after a short delay for smoothness
    setTimeout(onNext, 300);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-primary mb-2">What are you celebrating?</h2>
        <p className="text-gray-500 font-light text-sm">Select your main event type to begin building your custom package.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {eventTypes.map(event => {
          const isSelected = state.eventId === event.id;
          return (
            <button
              key={event.id}
              onClick={() => handleSelect(event.id)}
              className={`p-6 text-left border rounded-sm transition-all duration-300 group ${
                isSelected 
                  ? 'border-secondary bg-secondary/5 ring-1 ring-secondary' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
                {event.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {event.description}
              </p>
              
              <div className={`flex items-center text-xs font-bold uppercase tracking-widest ${isSelected ? 'text-secondary' : 'text-gray-400 group-hover:text-gray-900'}`}>
                Select <ArrowRight size={14} className="ml-2" />
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Empty space to ensure min height */}
      <div className="h-12"></div>
    </div>
  );
};

export default StepEvent;
