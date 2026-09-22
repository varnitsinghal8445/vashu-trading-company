import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, Plus, Image as ImageIcon, Settings2, Info, FileArchive } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import PrintOrderSummary from '../components/printing/PrintOrderSummary';
import PrintCheckoutModal from '../components/printing/PrintCheckoutModal';

const PAPER_TYPES = ['Glossy', 'Matte', 'HD Glossy', 'Professional'];
const SIZES = ['4×6', '5×7', '6×8', '8×10', '8×12', '10×12', '12×15', '12×18', '12×36', '16×20', '16×24', '20×30', '24×36'];

const PhotoPrinting = () => {
  const [photos, setPhotos] = useState([]);
  const [activePhotoId, setActivePhotoId] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPhotos = files.map(file => {
      const isZip = file.name.toLowerCase().endsWith('.zip') || file.type.includes('zip');
      return {
        id: Math.random().toString(36).substr(2, 9),
        file: file,
        fileName: file.name,
        isZip: isZip,
        fileUrl: isZip ? null : URL.createObjectURL(file), // Local preview for images only
        size: '4×6',
        paper: 'Glossy',
        quantity: 1,
        orientation: 'Portrait',
        finish: 'Standard'
      };
    });

    setPhotos(prev => [...prev, ...newPhotos]);
    if (!activePhotoId) setActivePhotoId(newPhotos[0].id);
  };

  const removePhoto = (id, e) => {
    e.stopPropagation();
    const filtered = photos.filter(p => p.id !== id);
    setPhotos(filtered);
    if (activePhotoId === id) {
      setActivePhotoId(filtered.length > 0 ? filtered[0].id : null);
    }
  };

  const updateActivePhoto = (field, value) => {
    setPhotos(photos.map(p => p.id === activePhotoId ? { ...p, [field]: value } : p));
  };

  const activePhoto = photos.find(p => p.id === activePhotoId);

  // Exact pricing logic provided by user
  const calculateTotal = () => {
    let total = 0;
    photos.forEach(p => {
      let basePrice = 8; // default 4x6
      
      switch (p.size) {
        case '4×6': basePrice = 8; break;
        case '5×7': basePrice = 10; break;
        case '6×8': basePrice = 15; break;
        case '8×10': basePrice = 30; break;
        case '8×12': basePrice = 30; break;
        case '10×12': basePrice = 50; break;
        case '12×15': basePrice = 80; break;
        case '12×18': basePrice = 80; break;
        case '12×36': basePrice = 100; break;
        case '16×20': basePrice = 120; break;
        case '16×24': basePrice = 150; break;
        case '20×30': basePrice = 200; break;
        case '24×36': basePrice = 250; break;
        default: basePrice = 8;
      }
      
      let paperExtra = 0;
      if (p.paper === 'Matte') paperExtra = 20;
      if (p.paper === 'HD Glossy') paperExtra = 40;
      if (p.paper === 'Professional') paperExtra = 60;

      total += (basePrice + paperExtra) * p.quantity;
    });
    return total;
  };

  return (
    <PageWrapper className="min-h-screen text-white relative">
      
      {/* GLOBAL AMBIENT BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/images/ai-wedding/couple_large.jpg" 
          alt="Studio Background" 
          className="w-full h-full object-cover opacity-20 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#1a1a1a]/95 backdrop-blur-xl"></div>
        {/* Subtle radial glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>
      </div>
      
      {/* 1. HERO SECTION */}
      <section className="relative z-10 py-24 md:py-32 px-4 flex items-center justify-center border-b border-white/5">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            <ImageIcon size={24} className="text-secondary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif mb-6 leading-tight tracking-tight text-white/90"
          >
            THE PRINT STUDIO.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto italic"
          >
            "From your phone gallery to a timeless physical photograph. Choose your size, finish, and quantity, and let us masterfully craft the rest."
          </motion.p>
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} 
            className="bg-transparent border border-secondary text-secondary px-10 py-4 uppercase tracking-[0.2em] text-sm font-bold hover:bg-secondary hover:text-black transition-all duration-500 rounded-sm hover:shadow-[0_0_30px_rgba(193,154,107,0.3)]"
          >
            Enter Studio
          </motion.button>
        </div>
      </section>

      {/* 16. PROCESS VISUALIZER */}
      <section className="relative z-10 py-16 px-4 border-b border-white/5 hidden md:block">
        <div className="max-w-6xl mx-auto flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent -z-10"></div>
          {[
            { num: '01', title: 'Upload', desc: 'Drop your memories.' },
            { num: '02', title: 'Craft', desc: 'Select dimensions.' },
            { num: '03', title: 'Details', desc: 'Confirm delivery.' },
            { num: '04', title: 'Print', desc: 'We do the rest.' }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 px-8 py-5 text-center rounded-sm shadow-xl"
            >
              <h4 className="text-xs text-secondary uppercase tracking-widest mb-2 font-bold">{step.num} — {step.title}</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE CORE STUDIO */}
      <section className="relative z-10 py-20 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* UPLOADER (THE PRINT TRAY) */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative overflow-hidden border-2 border-dashed border-secondary/30 bg-black/40 backdrop-blur-xl hover:border-secondary transition-all duration-500 p-16 rounded-sm text-center cursor-pointer group shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                multiple 
                accept="image/jpeg, image/png, image/webp, application/zip, application/x-zip-compressed, .zip" 
                className="hidden" 
              />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                   <UploadCloud size={32} className="text-gray-400 group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="text-3xl font-serif text-white mb-3">Drop to Develop</h3>
                <p className="text-gray-400 font-light text-sm tracking-wide">Upload single photographs or Bulk ZIP archives.<br/><span className="text-xs text-gray-500 mt-2 block">Supports High-Res JPG, PNG, WEBP, and .ZIP.</span></p>
              </div>
            </div>

            {/* DIGITAL PRINT TABLE */}
            {photos.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-secondary mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                  <ImageIcon size={16} /> Digital Print Table ({photos.length})
                </h3>
                
                <div className="flex overflow-x-auto gap-4 pb-6 custom-scrollbar">
                  {photos.map((p) => (
                    <div 
                      key={p.id} 
                      onClick={() => setActivePhotoId(p.id)}
                      className={`relative w-24 h-24 shrink-0 rounded-sm cursor-pointer border-2 transition-all duration-300 ${
                        activePhotoId === p.id ? 'border-secondary scale-105 shadow-[0_0_20px_rgba(193,154,107,0.3)]' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="w-full h-full rounded-sm overflow-hidden flex items-center justify-center bg-[#050505]">
                        {p.isZip ? (
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <FileArchive size={24} />
                            <span className="text-[8px] uppercase mt-1 truncate w-16 text-center">{p.fileName}</span>
                          </div>
                        ) : (
                          <img src={p.fileUrl} alt="Upload" className="w-full h-full object-cover rounded-sm" />
                        )}
                      </div>
                      <button 
                        onClick={(e) => removePhoto(p.id, e)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        style={{ opacity: activePhotoId === p.id ? 1 : undefined }}
                      >
                        <X size={12} />
                      </button>
                      <div className="absolute bottom-0 left-0 w-full bg-black/80 text-[9px] text-center py-1 truncate px-1 text-white/80">
                        {p.size} • x{p.quantity}
                      </div>
                    </div>
                  ))}
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 shrink-0 rounded-sm border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:border-secondary transition-colors"
                  >
                    <Plus size={24} className="text-gray-500" />
                  </div>
                </div>
              </div>
            )}

            {/* INDIVIDUAL CONFIGURATION PANEL */}
            {activePhoto && (
              <motion.div 
                key={activePhoto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-2xl relative overflow-hidden"
              >
                {/* Subtle corner glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row gap-12 relative z-10">
                  
                  {/* LIVE PREVIEW */}
                  <div className="w-full md:w-2/5 flex flex-col items-center">
                    <h4 className="text-[10px] uppercase tracking-widest text-gray-500 mb-6">Live Print Preview</h4>
                    <div className="w-full aspect-square bg-[#050505] border border-white/5 rounded-sm flex items-center justify-center p-4 relative overflow-hidden shadow-[inset_0_4px_30px_rgba(0,0,0,0.5)]">
                       {activePhoto.isZip ? (
                         <div className="text-center">
                           <FileArchive size={64} className="text-secondary/50 mx-auto mb-4" />
                           <p className="text-xs text-gray-400 uppercase tracking-widest leading-relaxed">Bulk ZIP Archive</p>
                           <p className="text-[10px] text-gray-500 mt-2 truncate w-40">{activePhoto.fileName}</p>
                         </div>
                       ) : (
                         <img 
                          src={activePhoto.fileUrl} 
                          className="max-w-full max-h-full object-contain shadow-2xl border border-white/5"
                          style={{ filter: activePhoto.paper.includes('HD') ? 'contrast(1.1) saturate(1.1)' : activePhoto.paper === 'Matte' ? 'contrast(0.95) brightness(0.95)' : 'none' }}
                          alt="Preview" 
                        />
                       )}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-xs text-secondary font-medium tracking-widest bg-secondary/5 px-6 py-3 border border-secondary/20 rounded-sm shadow-[0_0_15px_rgba(193,154,107,0.1)]">
                      {activePhoto.size} INCH
                    </div>

                    <div className="mt-8 flex items-start gap-3 bg-yellow-500/5 border border-yellow-500/10 p-5 rounded-sm text-yellow-500/80">
                       <Info size={16} className="shrink-0 mt-0.5" />
                       <p className="text-[10px] uppercase tracking-widest leading-relaxed">
                         {activePhoto.isZip 
                           ? "The selected settings below will be applied to ALL photographs found inside this ZIP archive."
                           : "If aspect ratios differ, your photo may be cropped slightly during printing."}
                       </p>
                    </div>
                  </div>

                  {/* SETTINGS */}
                  <div className="w-full md:w-3/5 space-y-8">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <Settings2 className="text-secondary" />
                      <h3 className="text-xl font-serif text-white">Print Settings</h3>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Print Size</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {SIZES.map(s => (
                          <button
                            key={s}
                            onClick={() => updateActivePhoto('size', s)}
                            className={`p-3 text-xs text-center border rounded-sm transition-all duration-300 ${
                              activePhoto.size === s 
                                ? 'border-secondary bg-secondary/10 text-white shadow-[0_0_10px_rgba(193,154,107,0.2)]' 
                                : 'border-white/5 bg-white/5 text-gray-500 hover:border-white/20 hover:bg-white/10'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Paper Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        {PAPER_TYPES.map(p => (
                          <button
                            key={p}
                            onClick={() => updateActivePhoto('paper', p)}
                            className={`p-4 text-sm text-left border rounded-sm transition-all duration-300 ${
                              activePhoto.paper === p 
                                ? 'border-secondary bg-secondary/10 text-white shadow-[0_0_10px_rgba(193,154,107,0.2)]' 
                                : 'border-white/5 bg-white/5 text-gray-500 hover:border-white/20 hover:bg-white/10'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Quantity</label>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => updateActivePhoto('quantity', Math.max(1, activePhoto.quantity - 1))}
                          className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center hover:border-secondary hover:text-secondary rounded-sm transition-colors"
                        >-</button>
                        <span className="text-2xl font-medium w-12 text-center text-white">{activePhoto.quantity}</span>
                        <button 
                          onClick={() => updateActivePhoto('quantity', activePhoto.quantity + 1)}
                          className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center hover:border-secondary hover:text-secondary rounded-sm transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {!activePhoto && photos.length === 0 && (
              <div className="bg-black/40 backdrop-blur-md border border-white/5 p-16 text-center rounded-sm">
                <p className="text-gray-500 uppercase tracking-widest text-sm">Upload a photo to unveil the studio.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <PrintOrderSummary 
              photos={photos} 
              onCheckout={() => setIsCheckoutOpen(true)}
            />
          </div>

        </div>
      </section>

      {/* CHECKOUT MODAL */}
      <PrintCheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        photos={photos}
        totalAmount={calculateTotal()}
      />

    </PageWrapper>
  );
};

export default PhotoPrinting;