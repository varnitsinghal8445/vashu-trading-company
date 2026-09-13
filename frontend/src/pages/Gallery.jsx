import { useState } from 'react';
import { Heart, Check } from 'lucide-react';
import PhotoViewer from '../components/gallery/PhotoViewer';

// Mock data
const mockPhotos = Array.from({ length: 24 }).map((_, i) => ({
  id: `img-${i}`,
  url: `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop&sig=${i}`,
  category: i % 3 === 0 ? 'Haldi' : i % 2 === 0 ? 'Wedding' : 'Reception'
}));

const categories = ['All', 'Haldi', 'Wedding', 'Reception'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredPhotos = activeCategory === 'All' 
    ? mockPhotos 
    : mockPhotos.filter(p => p.category === activeCategory);

  const toggleFavorite = (id) => {
    if (isSubmitted) return;
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const openViewer = (index) => setViewerIndex(index);
  const closeViewer = () => setViewerIndex(null);

  const navigateViewer = (direction) => {
    if (direction === 'prev') {
      setViewerIndex(prev => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
    } else {
      setViewerIndex(prev => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Real implementation would POST to /api/galleries/:id/select
    alert("Selection submitted successfully to the admin!");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-secondary tracking-widest uppercase text-sm mb-2">Rahul & Priya</p>
          <h1 className="text-4xl font-serif text-primary mb-6">Wedding Memories</h1>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm tracking-wide transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => {
            const isFav = favorites.includes(photo.id);
            return (
              <div key={photo.id} className="relative group aspect-square bg-gray-100 overflow-hidden cursor-pointer">
                <img 
                  src={photo.url} 
                  alt="Gallery" 
                  onClick={() => openViewer(index)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(photo.id);
                  }}
                  disabled={isSubmitted}
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
                    isFav 
                      ? 'bg-secondary text-white opacity-100 shadow-md' 
                      : 'bg-white/50 text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-white'
                  }`}
                >
                  <Heart size={20} className={isFav ? 'fill-current' : ''} />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40 transform transition-transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Heart className="text-secondary fill-secondary" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-light">Album Selection</p>
              <p className="text-lg font-serif text-primary">{favorites.length} / 250 <span className="text-sm font-sans text-gray-400">Photos Selected</span></p>
            </div>
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={favorites.length === 0 || isSubmitted}
            className={`flex items-center gap-2 px-8 py-3 uppercase tracking-widest text-sm font-medium transition-colors ${
              isSubmitted 
                ? 'bg-green-600 text-white cursor-default' 
                : favorites.length === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-secondary'
            }`}
          >
            {isSubmitted ? (
              <>
                <Check size={18} /> Submitted
              </>
            ) : (
              'Submit Selection'
            )}
          </button>
        </div>
      </div>

      {/* Viewer Modal */}
      {viewerIndex !== null && (
        <PhotoViewer 
          photos={filteredPhotos}
          currentIndex={viewerIndex}
          favorites={favorites}
          onClose={closeViewer}
          onNavigate={navigateViewer}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default Gallery;
