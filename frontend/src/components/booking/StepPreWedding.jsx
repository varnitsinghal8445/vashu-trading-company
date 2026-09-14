import { preWeddingOptions } from '../../data/eventServices';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const StepPreWedding = ({ state, updateState, onNext, onPrev }) => {
  const isNeeded = state.preWedding.needed;

  const handleChoice = (choice) => {
    updateState('preWedding', prev => ({ ...prev, needed: choice }));
    if (!choice) {
      // Small timeout for visual feedback before auto-advancing
      setTimeout(onNext, 300);
    }
  };

  return (
    <div className="space-y-8 flex flex-col h-full">
      <div>
        <h2 className="text-3xl font-serif text-primary mb-2">Pre-Wedding Shoot</h2>
        <p className="text-gray-500 font-light text-sm">Would you like to add a pre-wedding shoot to your package?</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleChoice(true)}
          className={`flex-1 py-4 border rounded-sm font-bold uppercase tracking-widest text-sm transition-all ${
            isNeeded === true 
              ? 'bg-secondary text-primary border-secondary' 
              : 'border-gray-200 text-gray-500 hover:border-secondary'
          }`}
        >
          Yes, Add Pre-Wedding
        </button>
        <button
          onClick={() => handleChoice(false)}
          className={`flex-1 py-4 border rounded-sm font-bold uppercase tracking-widest text-sm transition-all ${
            isNeeded === false 
              ? 'bg-gray-100 text-gray-900 border-gray-300' 
              : 'border-gray-200 text-gray-500 hover:border-gray-300'
          }`}
        >
          No, Skip
        </button>
      </div>

      {isNeeded && (
        <div className="space-y-6 animate-fade-in-up flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 border border-gray-100 rounded-sm">
            
            {/* Location */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Location Type</label>
              <select 
                value={state.preWedding.location}
                onChange={(e) => updateState('preWedding', prev => ({ ...prev, location: e.target.value }))}
                className="w-full border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none bg-white rounded-sm"
              >
                <option value="">Select Location...</option>
                {preWeddingOptions.locations.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Days */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Duration</label>
              <select 
                value={state.preWedding.days}
                onChange={(e) => updateState('preWedding', prev => ({ ...prev, days: e.target.value }))}
                className="w-full border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none bg-white rounded-sm"
              >
                <option value="">Select Duration...</option>
                {preWeddingOptions.days.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Photography */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Photography Style</label>
              <select 
                value={state.preWedding.photography}
                onChange={(e) => updateState('preWedding', prev => ({ ...prev, photography: e.target.value }))}
                className="w-full border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none bg-white rounded-sm"
              >
                <option value="">Select Style...</option>
                {preWeddingOptions.photography.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Video */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Video Coverage</label>
              <select 
                value={state.preWedding.video}
                onChange={(e) => updateState('preWedding', prev => ({ ...prev, video: e.target.value }))}
                className="w-full border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none bg-white rounded-sm"
              >
                <option value="">Select Video...</option>
                {preWeddingOptions.video.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

          </div>
        </div>
      )}

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
          disabled={isNeeded === null}
          className={`flex items-center px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
            isNeeded !== null
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

export default StepPreWedding;
