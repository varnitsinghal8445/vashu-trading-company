import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Image as ImageIcon, Sparkles, CheckCircle, CopyX, ScanFace, ListOrdered, Camera } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const AIAlbumSelection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { name: 'Wedding Photos Uploaded', icon: <Camera size={24} />, desc: '3,450 raw photos found.' },
    { name: 'AI Processing Engine', icon: <BrainCircuit size={24} />, desc: 'Initializing neural networks...' },
    { name: 'Duplicate Detection', icon: <CopyX size={24} />, desc: 'Removed 1,200 burst shots and duplicates.' },
    { name: 'Blur Detection', icon: <ImageIcon size={24} />, desc: 'Filtered 140 out-of-focus images.' },
    { name: 'Face Grouping', icon: <ScanFace size={24} />, desc: 'Identified key family members and couple.' },
    { name: 'Best Photo Ranking', icon: <ListOrdered size={24} />, desc: 'Scoring based on lighting, emotion, and framing.' },
    { name: 'Recommended Album', icon: <Sparkles size={24} />, desc: 'Curated 250 perfect moments.' },
  ];

  const startProcessing = () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setIsComplete(false);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setIsComplete(true);
      }
    }, 1500); // 1.5 seconds per step
  };

  return (
    <PageWrapper className="bg-gray-50 pt-24 pb-32 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <p className="text-secondary tracking-widest uppercase text-sm mb-2">Smart Curation</p>
          <h1 className="text-4xl font-serif text-primary mb-4">Vasu Trading Company AI Culling</h1>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            Our intelligent pipeline analyzes thousands of wedding photos to automatically detect duplicates, out-of-focus shots, and blinkers, curating the absolute best moments for your final album.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-sm">
          {!isProcessing && !isComplete && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <BrainCircuit size={40} />
              </div>
              <h2 className="text-2xl font-serif text-primary mb-2">Ready to Process 3,450 Photos</h2>
              <p className="text-gray-500 mb-8 font-light">Estimated time: ~10 seconds (Demo)</p>
              <button 
                onClick={startProcessing}
                className="bg-primary text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-secondary transition-colors inline-flex items-center gap-2"
              >
                <Sparkles size={18} /> Run AI Analysis
              </button>
            </div>
          )}

          {(isProcessing || isComplete) && (
            <div className="max-w-2xl mx-auto">
              <div className="relative border-l-2 border-gray-200 ml-6 md:ml-8 py-4">
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isDone = index < currentStep || isComplete;
                  
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: isDone || isActive ? 1 : 0.3, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`mb-10 last:mb-0 relative pl-10 md:pl-12 ${isActive ? 'scale-105 origin-left transition-transform' : ''}`}
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white ${
                        isDone ? 'bg-green-500 text-white' : 
                        isActive ? 'bg-secondary text-white animate-pulse' : 
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {isDone ? <CheckCircle size={14} /> : <span className="w-2 h-2 rounded-full bg-current"></span>}
                      </div>

                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${isDone || isActive ? 'bg-primary/5 text-primary' : 'bg-gray-50 text-gray-400'}`}>
                          {step.icon}
                        </div>
                        <div>
                          <h3 className={`text-lg font-medium ${isDone || isActive ? 'text-primary' : 'text-gray-400'}`}>
                            {step.name}
                          </h3>
                          <p className={`text-sm mt-1 font-light ${isActive ? 'text-secondary font-medium' : 'text-gray-500'}`}>
                            {isDone || isActive ? step.desc : 'Waiting...'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {isComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-gray-100 text-center"
            >
              <h3 className="text-2xl font-serif text-primary mb-4">Analysis Complete</h3>
              <p className="text-gray-600 mb-6 font-light">We have successfully curated a recommended selection of 250 photos from the original 3,450.</p>
              <button className="bg-green-600 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-green-700 transition-colors inline-flex items-center gap-2">
                View Recommended Selection
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </PageWrapper>
  );
};

export default AIAlbumSelection;
