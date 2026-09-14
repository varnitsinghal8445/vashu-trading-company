import { albumCustomization } from '../../data/eventServices';
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';

const StepAlbums = ({ state, updateState, onNext, onPrev }) => {
  const albums = state.albums || [];

  const handleNeedsAlbum = (needs) => {
    if (needs) {
      if (albums.length === 0) {
        // Add a default album
        addAlbum();
      }
    } else {
      updateState('albums', []);
      // Auto advance on skip
      setTimeout(onNext, 300);
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
        <h2 className="text-3xl font-serif text-primary mb-2">Wedding Albums</h2>
        <p className="text-gray-500 font-light text-sm">Would you like to include premium printed albums?</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleNeedsAlbum(true)}
          className={`flex-1 py-4 border rounded-sm font-bold uppercase tracking-widest text-sm transition-all ${
            hasAlbums 
              ? 'bg-secondary text-primary border-secondary' 
              : 'border-gray-200 text-gray-500 hover:border-secondary'
          }`}
        >
          Yes, Add Album(s)
        </button>
        <button
          onClick={() => handleNeedsAlbum(false)}
          className={`flex-1 py-4 border rounded-sm font-bold uppercase tracking-widest text-sm transition-all ${
            !hasAlbums && state.albums.length === 0 // Need to know if they actually clicked No, but empty array means no
              ? 'border-gray-200 text-gray-500 hover:border-gray-300' 
              : 'border-gray-200 text-gray-500 hover:border-gray-300'
          }`}
        >
          No, Skip Albums
        </button>
      </div>

      {hasAlbums && (
        <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar max-h-[50vh]">
          {albums.map((album, index) => (
            <div key={album.id} className="bg-gray-50 p-6 border border-gray-100 rounded-sm relative animate-fade-in-up">
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800">
                  Album {index + 1}
                </h3>
                {albums.length > 1 && (
                  <button onClick={() => removeAlbum(album.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Size */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Size</label>
                  <select 
                    value={album.size}
                    onChange={(e) => updateAlbum(album.id, 'size', e.target.value)}
                    className="w-full border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none bg-white rounded-sm"
                  >
                    <option value="">Select Size...</option>
                    {albumCustomization.sizes.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
                  </select>
                </div>

                {/* Pages */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Pages</label>
                  <select 
                    value={album.pages}
                    onChange={(e) => updateAlbum(album.id, 'pages', e.target.value)}
                    className="w-full border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none bg-white rounded-sm"
                  >
                    <option value="">Select Pages...</option>
                    {albumCustomization.pages.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Quantity</label>
                  <div className="flex items-center h-[46px] border border-gray-300 rounded-sm bg-white">
                    <button 
                      onClick={() => updateAlbum(album.id, 'quantity', Math.max(1, album.quantity - 1))}
                      className="px-4 text-gray-500 hover:text-black"
                    >-</button>
                    <span className="flex-grow text-center text-sm">{album.quantity}</span>
                    <button 
                      onClick={() => updateAlbum(album.id, 'quantity', album.quantity + 1)}
                      className="px-4 text-gray-500 hover:text-black"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={addAlbum}
            className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-500 hover:border-secondary hover:text-secondary transition-colors font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Another Album
          </button>
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
          disabled={!isComplete}
          className={`flex items-center px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
            isComplete
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

export default StepAlbums;
