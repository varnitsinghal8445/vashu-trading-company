import { teamOptions, guestCounts } from '../../data/eventServices';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const StepDetails = ({ state, updateState, onNext, onPrev }) => {
  
  const updateDetail = (field, value) => {
    updateState('details', prev => ({ ...prev, [field]: value }));
  };

  const { details } = state;
  const isComplete = details.date && details.location && details.guests && details.teamPreference;

  return (
    <div className="space-y-8 flex flex-col h-full">
      <div>
        <h2 className="text-3xl font-serif text-primary mb-2">Event Details & Team</h2>
        <p className="text-gray-500 font-light text-sm">Tell us a little more about your event so we can prepare accurately.</p>
      </div>

      <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar max-h-[50vh]">
        
        {/* Date & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 border border-gray-100 rounded-sm">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Event Date (or Approx)</label>
            <input 
              type="date" 
              value={details.date}
              onChange={(e) => updateDetail('date', e.target.value)}
              className="w-full border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none bg-white rounded-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">City / Location</label>
            <input 
              type="text" 
              placeholder="e.g. Jalandhar, Punjab"
              value={details.location}
              onChange={(e) => updateDetail('location', e.target.value)}
              className="w-full border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none bg-white rounded-sm"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4">How many guests?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {guestCounts.map(count => (
              <button
                key={count}
                onClick={() => updateDetail('guests', count)}
                className={`py-3 text-sm border rounded-sm transition-colors ${
                  details.guests === count 
                    ? 'bg-secondary text-primary border-secondary font-bold' 
                    : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4">Photography Team Requirement</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teamOptions.map(team => (
              <label 
                key={team} 
                className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${
                  details.teamPreference === team 
                    ? 'border-secondary bg-secondary/5' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input 
                  type="radio" 
                  name="teamPreference"
                  checked={details.teamPreference === team}
                  onChange={() => updateDetail('teamPreference', team)}
                  className="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary cursor-pointer"
                />
                <span className={`text-sm ${details.teamPreference === team ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                  {team}
                </span>
              </label>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">* If you select "Recommend for me", we'll choose the best team based on your functions and guests.</p>
        </div>

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
          disabled={!isComplete}
          className={`flex items-center px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
            isComplete
              ? 'bg-secondary text-primary hover:bg-black hover:text-white' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          See My Plan <ArrowRight size={14} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepDetails;
