import { albumCustomization } from '../../data/eventServices';
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StepAlbums = ({ state, updateState, onNext, onPrev }) => {
  const albums = state.albums || [];

  const handleNeedsAlbum = (needs) => {
    if (needs) {
      if (albums.length === 0) {
        addAlbum();
      }
    } else {
      updateState('albums', []);
      setTimeout(onNext, 400);
    }
  };

  const addAlbum = () => {
    updateState('albums', prev => [
      ...prev, 
      { id: Date.now().toString(), size: '', pages: '', quantity: 1 }
    ]);
  };

  const removeAlbum = (id) => {
    updateState('albums', prev => prev.filter(a => a.id !== id));
  };

  const updateAlbum = (id, field, value) => {
    updateState('albums', prev => 
      prev.map(a => a.id === id ? { ...a, [field]: value } : a)
    );
  };

  const hasAlbums = albums.length > 0;
  const isComplete = !hasAlbums || albums.every(a => a.size && a.pages && a.quantity > 0);

  return (
    <div className="space-y-8 flex flex-col h-full">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-wide">Wedding Albums</h2>
        <p className="text-gray-400 font-light text-sm md:text-base">Would you like to include premium printed albums?</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNeedsAlbum(true)}
          className={`flex-1 py-5 px-4 border rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
            hasAlbums 
              ? 'bg-secondary/20 text-secondary border-secondary shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
              : 'border-white/10 text-gray-400 bg-black/40 hover:border-secondary/50 hover:bg-black/60 hover:text-white'
          }`}
        >
          Yes, Add Album(s)
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNeedsAlbum(false)}
          className={`flex-1 py-5 px-4 border rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
            !hasAlbums && state.albums.length === 0
              ? 'border-white/10 text-gray-400 bg-black/40 hover:border-white/30 hover:bg-black/60 hover:text-white' 
              : 'border-white/10 text-gray-400 bg-black/40 hover:border-white/30 hover:bg-black/60 hover:text-white'
          }`}
        >
          No, Skip Albums
        </motion.button>
      </div>

      <AnimatePresence>
        {hasAlbums && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 flex-grow overflow-y-auto pr-4 custom-scrollbar max-h-[50vh] mt-4"
          >
            {albums.map((album, index) => (
              <motion.div 
                key={album.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                className="bg-black/30 p-6 md:p-8 border border-white/10 rounded-xl backdrop-blur-md relative"
              >
                
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center">
                    <span className="w-2 h-2 rounded-full bg-secondary mr-3 shadow-[0_0_8px_#d4af37]"></span>
                    Album {index + 1}
                  </h3>
                  {albums.length > 1 && (
                    <button onClick={() => removeAlbum(album.id)} className="text-gray-500 hover:text-red-500 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Size */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Size</label>
                    <select 
                      value={album.size}
                      onChange={(e) => updateAlbum(album.id, 'size', e.target.value)}
                      className="w-full border border-white/20 p-3.5 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none bg-black/50 text-white rounded-lg transition-colors"
                    >
                      <option value="" className="bg-gray-900">Select Size...</option>
                      {albumCustomization.sizes.map(opt => <option key={opt.label} value={opt.label} className="bg-gray-900">{opt.label}</option>)}
                    </select>
                  </div>

                  {/* Pages */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Pages</label>
                    <select 
                      value={album.pages}
                      onChange={(e) => updateAlbum(album.id, 'pages', e.target.value)}
                      className="w-full border border-white/20 p-3.5 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none bg-black/50 text-white rounded-lg transition-colors"
                    >
                      <option value="" className="bg-gray-900">Select Pages...</option>
                      {albumCustomization.pages.map(opt => <option key={opt.label} value={opt.label} className="bg-gray-900">{opt.label}</option>)}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Quantity</label>
                    <div className="flex items-center h-[46px] border border-white/20 rounded-lg bg-black/50 overflow-hidden">
                      <button 
                        onClick={() => updateAlbum(album.id, 'quantity', Math.max(1, album.quantity - 1))}
                        className="px-4 h-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >-</button>
                      <span className="flex-grow text-center text-sm font-bold text-white">{album.quantity}</span>
                      <button 
                        onClick={() => updateAlbum(album.id, 'quantity', album.quantity + 1)}
                        className="px-4 h-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >+</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={addAlbum}
              className="w-full py-5 border-2 border-dashed border-white/20 text-gray-400 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Another Album
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

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
          Continue <ArrowRight size={14} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StepAlbums;
