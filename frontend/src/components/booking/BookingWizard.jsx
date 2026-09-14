import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StepEvent from './StepEvent';
import StepFunctions from './StepFunctions';
import StepServices from './StepServices';
import StepPreWedding from './StepPreWedding';
import StepAlbums from './StepAlbums';
import StepDetails from './StepDetails';
import StepSummary from './StepSummary';

const BookingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // The Master State
  const [bookingState, setBookingState] = useState({
    eventId: null,
    functions: [], // array of function IDs
    services: {}, // Map of functionId -> array of service IDs
    preWedding: {
      needed: null, // null | boolean
      location: '',
      photography: '',
      video: '',
      days: ''
    },
    albums: [], // array of { id, size, pages, quantity }
    details: {
      teamPreference: '',
      date: '',
      location: '',
      guests: ''
    },
    selectedPackageId: null // if they opt for a preset package
  });

  const updateState = (key, value) => {
    setBookingState(prev => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step) => setCurrentStep(step);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepEvent state={bookingState} updateState={updateState} onNext={nextStep} />;
      case 2:
        return <StepFunctions state={bookingState} updateState={updateState} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <StepServices state={bookingState} updateState={updateState} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <StepPreWedding state={bookingState} updateState={updateState} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <StepAlbums state={bookingState} updateState={updateState} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <StepDetails state={bookingState} updateState={updateState} onNext={nextStep} onPrev={prevStep} />;
      case 7:
        return <StepSummary state={bookingState} updateState={updateState} onPrev={prevStep} onEdit={goToStep} />;
      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-2xl min-h-[600px] shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col relative overflow-hidden rounded-xl">
      
      {/* Glowing Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          className="h-full bg-secondary shadow-[0_0_10px_#d4af37]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Header Info */}
      <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-white/10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
          Step {currentStep} of {totalSteps}
        </span>
        <button 
          onClick={() => {
            // Reset to step 1
            if(window.confirm("Start over? Your progress will be lost.")) {
              window.location.reload();
            }
          }}
          className="text-xs text-gray-400 hover:text-secondary transition-colors uppercase tracking-widest"
        >
          Start Over
        </button>
      </div>

      {/* Dynamic Content */}
      <div className="p-8 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default BookingWizard;
