import { teamOptions, guestCounts } from '../../data/eventServices';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const StepDetails = ({ state, updateState, onNext, onPrev }) => {
  
  const updateDetail = (field, value) => {
    updateState('details', prev => ({ ...prev, [field]: value }));
  };

  const { details } = state;
  const isComplete = details.date && details.location && details.guests && details.teamPreference;

  return (
    <div className="space-y-8 flex flex-col h-full">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-wide">Event Details & Team</h2>
        <p className="text-gray-400 font-light text-sm md:text-base">Tell us a little more about your event so we can prepare accurately.</p>
      </motion.div>

      <div className="space-y-8 flex-grow overflow-y-auto pr-4 custom-scrollbar max-h-[50vh]">
        
        {/* Date & Location */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-black/30 p-6 md:p-8 border border-white/10 rounded-xl backdrop-blur-md"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Event Date (or Approx)</label>
            <input 
              type="date" 
              value={details.date}
              onChange={(e) => updateDetail('date', e.target.value)}
              className="w-full border border-white/20 p-3.5 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none bg-black/50 text-white rounded-lg transition-colors color-scheme-dark"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">City / Location</label>
            <input 
              type="text" 
              placeholder="e.g. Jalandhar, Punjab"
              value={details.location}
              onChange={(e) => updateDetail('location', e.target.value)}
              className="w-full border border-white/20 p-3.5 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none bg-black/50 text-white rounded-lg transition-colors placeholder-gray-600"
            />
          </div>
        </motion.div>

        {/* Guests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center">
            <span className="w-2 h-2 rounded-full bg-secondary mr-3 shadow-[0_0_8px_#d4af37]"></span>
            How many guests?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {guestCounts.map(count => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={count}
                onClick={() => updateDetail('guests', count)}
                className={`py-4 text-sm border rounded-xl transition-all duration-300 font-bold ${
                  details.guests === count 
                    ? 'bg-secondary/20 text-secondary border-secondary shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                    : 'border-white/10 text-gray-400 bg-black/40 hover:border-secondary/50 hover:bg-black/60 hover:text-white'
                }`}
              >
                {count}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center">
            <span className="w-2 h-2 rounded-full bg-secondary mr-3 shadow-[0_0_8px_#d4af37]"></span>
            Photography Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamOptions.map(team => (
              <motion.label 
                whileHover={{ scale: 1.02 }}
                key={team} 
                className={`flex items-center gap-4 p-5 border rounded-xl cursor-pointer transition-all duration-300 ${
                  details.teamPreference === team 
                    ? 'border-secondary bg-secondary/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                    : 'border-white/10 hover:border-secondary/30 bg-black/40 hover:bg-black/60'
                }`}
              >
                <input 
                  type="radio" 
                  name="teamPreference"
                  checked={details.teamPreference === team}
                  onChange={() => updateDetail('teamPreference', team)}
                  className="w-4 h-4 text-secondary border-white/20 bg-black/50 focus:ring-secondary focus:ring-offset-gray-900 cursor-pointer"
                />
                <span className={`text-sm transition-colors ${details.teamPreference === team ? 'font-bold text-secondary' : 'text-gray-300'}`}>
                  {team}
                </span>
              </motion.label>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 mt-4 italic">* If you select "Recommend for me", we'll choose the best team based on your functions and guests.</p>
        </motion.div>

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
          disabled={!isComplete}
          className={`flex items-center px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-sm ${
            isComplete
              ? 'bg-secondary text-black hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
              : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
          }`}
        >
          See My Plan <ArrowRight size={14} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepDetails;
