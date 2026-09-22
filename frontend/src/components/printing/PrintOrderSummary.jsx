import React from 'react';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';

const PrintOrderSummary = ({ photos, onCheckout }) => {
  const totalPhotos = photos.length;
  const totalPrints = photos.reduce((acc, curr) => acc + curr.quantity, 0);
  
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

  const estimatedTotal = calculateTotal();

  // Get unique sizes selected
  const uniqueSizes = [...new Set(photos.map(p => p.size))];

  return (
    <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-sm p-6 sticky top-24 shadow-2xl">
      <h3 className="text-xl font-serif text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
        <ShoppingCart size={20} className="text-secondary" />
        YOUR PRINT ORDER
      </h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Photos Uploaded:</span>
          <span className="text-white font-medium">{totalPhotos}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Total Prints:</span>
          <span className="text-white font-medium">{totalPrints}</span>
        </div>
        
        {uniqueSizes.length > 0 && (
          <div className="pt-4 border-t border-white/5">
            <span className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Selected Sizes</span>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map(size => (
                <span key={size} className="text-xs bg-black/50 border border-white/10 px-2 py-1 text-gray-300 rounded-sm">
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 pt-6 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-400 uppercase tracking-widest">Estimated Total</span>
          <span className="text-3xl font-serif text-secondary">₹{estimatedTotal.toLocaleString()}</span>
        </div>
      </div>

      <button 
        onClick={onCheckout}
        disabled={totalPhotos === 0}
        className="w-full bg-secondary text-black py-4 uppercase tracking-[0.2em] text-sm font-bold hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
      >
        <CheckCircle2 size={18} />
        Continue Order
      </button>
    </div>
  );
};

export default PrintOrderSummary;
