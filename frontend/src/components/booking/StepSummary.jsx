import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Edit2 } from 'lucide-react';
import { eventTypes, serviceOptions, packages, albumCustomization } from '../../data/eventServices';
import WhatsAppServiceModal from '../shop/WhatsAppServiceModal';

const StepSummary = ({ state, updateState, onPrev, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCustomQuote, setIsCustomQuote] = useState(false);

  const event = eventTypes.find(e => e.id === state.eventId);

  useEffect(() => {
    let price = 0;
    let custom = false;

    // Services Price
    Object.values(state.services).forEach(srvList => {
      srvList.forEach(srvId => {
        const srv = serviceOptions.find(s => s.id === srvId);
        if (srv) {
          if (srv.basePrice === 'Custom Quote') custom = true;
          else price += srv.basePrice;
        }
      });
    });

    // Album Price
    state.albums.forEach(album => {
      if (album.size && album.pages && album.quantity) {
        const sizeObj = albumCustomization.sizes.find(s => s.label === album.size);
        const pageObj = albumCustomization.pages.find(p => p.label === album.pages);
        if (sizeObj && pageObj) {
          if (pageObj.label === 'Custom') custom = true;
          else price += (sizeObj.basePrice * pageObj.multiplier * album.quantity);
        }
      }
    });

    setTotalPrice(price);
    setIsCustomQuote(custom);
  }, [state]);

  const generateVariantString = () => {
    let str = `Event: ${event?.name}\n\n`;
    
    // Functions
    const fnNames = state.functions.map(id => event?.functions.find(f => f.id === id)?.name).join(', ');
    if (fnNames) str += `Functions: ${fnNames}\n\n`;

    // Services
    str += `Services:\n`;
    Object.entries(state.services).forEach(([fnId, srvIds]) => {
      const fnName = event?.functions.find(f => f.id === fnId)?.name;
      const sNames = srvIds.map(id => serviceOptions.find(s => s.id === id)?.name).join(', ');
      if (sNames) str += `- ${fnName}: ${sNames}\n`;
    });
    str += '\n';

    // PreWedding
    if (state.preWedding.needed) {
      str += `Pre-Wedding: Yes (${state.preWedding.location}, ${state.preWedding.days})\n`;
      str += `- Photo: ${state.preWedding.photography}\n`;
      str += `- Video: ${state.preWedding.video}\n\n`;
    } else {
      str += `Pre-Wedding: No\n\n`;
    }

    // Albums
    if (state.albums.length > 0) {
      str += `Albums (${state.albums.length}):\n`;
      state.albums.forEach((a, i) => {
        str += `- Album ${i+1}: ${a.size} | ${a.pages} | Qty: ${a.quantity}\n`;
      });
      str += '\n';
    } else {
      str += `Albums: None\n\n`;
    }

    // Details
    str += `Event Details:\n`;
    str += `- Date: ${state.details.date}\n`;
    str += `- Location: ${state.details.location}\n`;
    str += `- Guests: ${state.details.guests}\n`;
    str += `- Team: ${state.details.teamPreference}\n`;

    return str.trim();
  };

  // Find a recommended package just as an example (if event is wedding)
  const recommendedPackage = state.eventId === 'e-wedding' 
    ? (state.functions.length > 3 ? packages[1] : packages[0]) 
    : null;

  return (
    <div className="space-y-8 flex flex-col h-full animate-fade-in-up">
      <div>
        <h2 className="text-3xl font-serif text-primary mb-2">Your Photography Plan</h2>
        <p className="text-gray-500 font-light text-sm">Review your custom package details below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Summary Details */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm relative">
            <button onClick={() => onEdit(2)} className="absolute top-6 right-6 text-gray-400 hover:text-secondary"><Edit2 size={16}/></button>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4 border-b border-gray-200 pb-2">Functions & Services</h3>
            {state.functions.map(fnId => {
              const fnName = event?.functions.find(f => f.id === fnId)?.name;
              const srvIds = state.services[fnId] || [];
              if (srvIds.length === 0) return null;
              
              return (
                <div key={fnId} className="mb-4 last:mb-0">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{fnName}</p>
                  <div className="flex flex-wrap gap-2">
                    {srvIds.map(sId => {
                      const sName = serviceOptions.find(s => s.id === sId)?.name;
                      return (
                        <span key={sId} className="bg-white border border-gray-200 px-2 py-1 text-xs text-gray-600 rounded-sm flex items-center gap-1">
                          <Check size={12} className="text-secondary"/> {sName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm relative">
              <button onClick={() => onEdit(4)} className="absolute top-6 right-6 text-gray-400 hover:text-secondary"><Edit2 size={16}/></button>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4 border-b border-gray-200 pb-2">Pre-Wedding</h3>
              {state.preWedding.needed ? (
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium text-gray-900">Location:</span> {state.preWedding.location}</p>
                  <p><span className="font-medium text-gray-900">Duration:</span> {state.preWedding.days}</p>
                  <p><span className="font-medium text-gray-900">Photo:</span> {state.preWedding.photography}</p>
                  <p><span className="font-medium text-gray-900">Video:</span> {state.preWedding.video}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Not Selected</p>
              )}
            </div>

            <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm relative">
              <button onClick={() => onEdit(5)} className="absolute top-6 right-6 text-gray-400 hover:text-secondary"><Edit2 size={16}/></button>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4 border-b border-gray-200 pb-2">Albums</h3>
              {state.albums.length > 0 ? (
                <div className="space-y-3">
                  {state.albums.map((a, i) => (
                    <div key={a.id} className="text-sm text-gray-600">
                      <p className="font-medium text-gray-900">Album {i+1}</p>
                      <p>{a.size} • {a.pages} • Qty: {a.quantity}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">None</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm relative">
            <button onClick={() => onEdit(6)} className="absolute top-6 right-6 text-gray-400 hover:text-secondary"><Edit2 size={16}/></button>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4 border-b border-gray-200 pb-2">Event Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p><span className="font-medium text-gray-900 block">Date</span> {state.details.date}</p>
              <p><span className="font-medium text-gray-900 block">Location</span> {state.details.location}</p>
              <p><span className="font-medium text-gray-900 block">Guests</span> {state.details.guests}</p>
              <p><span className="font-medium text-gray-900 block">Team</span> {state.details.teamPreference}</p>
            </div>
          </div>

        </div>

        {/* Right: Pricing & Booking */}
        <div>
          <div className="bg-primary text-white p-8 sticky top-24 shadow-xl">
            <h3 className="text-xl font-serif mb-6 border-b border-gray-700 pb-4">Estimate</h3>
            
            <div className="mb-8">
              {isCustomQuote ? (
                <div>
                  <p className="text-3xl font-bold text-secondary mb-2">Custom Quote</p>
                  <p className="text-xs text-gray-400">Your selection includes advanced services (e.g. Drone) that require a custom calculation.</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Starting From</p>
                  <p className="text-4xl font-bold text-secondary mb-2">₹{totalPrice.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500">*Final price may vary based on exact location logistics and dates.</p>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-secondary text-primary py-4 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors"
            >
              Send Enquiry
            </button>

            {recommendedPackage && (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Our Recommendation</p>
                <div className="bg-gray-800 p-4 rounded-sm border border-gray-700">
                  <p className="font-bold text-white mb-1">{recommendedPackage.name}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">{recommendedPackage.description}</p>
                  <p className="text-sm font-bold text-secondary">
                    {typeof recommendedPackage.basePrice === 'number' ? `₹${recommendedPackage.basePrice.toLocaleString()}` : recommendedPackage.basePrice}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-start items-center pt-8 border-t border-gray-100 mt-auto">
        <button 
          onClick={onPrev}
          className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={14} className="mr-2" /> Back to Details
        </button>
      </div>

      {/* WhatsApp Modal */}
      {isModalOpen && (
        <WhatsAppServiceModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          serviceDetails={{
            name: `${event?.name} Custom Package`,
            variantString: generateVariantString(),
            quantity: 1,
            totalPrice: isCustomQuote ? 0 : totalPrice,
            cartId: `srv_${Date.now()}`
          }}
        />
      )}
    </div>
  );
};

export default StepSummary;
