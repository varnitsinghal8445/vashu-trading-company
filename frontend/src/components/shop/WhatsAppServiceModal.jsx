import { useState } from 'react';
import { X, Send, CheckCircle2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const WhatsAppServiceModal = ({ isOpen, onClose, serviceDetails }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !phone) return;

    const businessNumber = "919761841098";
    
    let message = `📷 *New Photography Service Enquiry*\n\n`;
    
    message += `👤 *Customer Details*\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n\n`;
    
    message += `📝 *Service Details*\n`;
    message += `Package/Event: ${serviceDetails.name}\n`;
    
    if (serviceDetails.variantString) {
      message += `\n*Configuration:*\n${serviceDetails.variantString}\n`;
    }
    
    message += `\nQuantity: ${serviceDetails.quantity}\n`;
    message += `Estimated Price: ₹${serviceDetails.totalPrice.toLocaleString()}\n`;
    
    message += `\n🔗 *Booking Link*\n`;
    message += window.location.href;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;
    
    // Add to Global Cart
    const cartItem = {
      id: serviceDetails.cartId || `srv_${Date.now()}`,
      name: serviceDetails.name,
      category: 'Photography Service',
      variantString: serviceDetails.variantString,
      unitPrice: serviceDetails.totalPrice / serviceDetails.quantity,
      quantity: serviceDetails.quantity
    };
    
    addToCart(cartItem);

    window.open(whatsappUrl, '_blank');
    
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white w-full max-w-md shadow-2xl relative flex flex-col max-h-[90vh] rounded-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 className="text-xl font-serif text-gray-900">{isSuccess ? "Success" : "Book Service"}</h3>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h4 className="text-2xl font-serif text-gray-900 mb-2">Service Added to Cart!</h4>
                <p className="text-gray-500 text-sm mb-8 px-4">
                  Your customized photography package has been added to your cart. We also opened WhatsApp so you can chat with us directly.
                </p>
                <div className="flex flex-col w-full gap-3">
                  <Link 
                    to="/checkout"
                    onClick={handleClose}
                    className="w-full bg-gray-900 hover:bg-black text-white px-6 py-4 text-sm font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-3 rounded-sm shadow-md"
                  >
                    <ShoppingCart size={18} />
                    View Cart
                  </Link>
                  <button 
                    onClick={handleClose}
                    className="w-full bg-white border border-gray-200 hover:border-gray-900 hover:text-gray-900 text-gray-500 px-6 py-4 text-sm font-bold tracking-widest uppercase transition-colors flex items-center justify-center rounded-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Summary */}
                <div className="mb-8 bg-gray-50 p-4 border border-gray-100 rounded-sm">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Photography Service</p>
                  <h4 className="font-semibold text-gray-900 leading-tight mb-3">{serviceDetails.name}</h4>
                  
                  {serviceDetails.variantString && (
                    <div className="text-xs text-gray-600 font-medium whitespace-pre-line border-l-2 border-secondary pl-3 py-1">
                      {serviceDetails.variantString}
                    </div>
                  )}
                  
                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">Est. Total</span>
                    <span className="text-sm font-bold text-secondary">₹{serviceDetails.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Kumar"
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors rounded-sm"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 text-sm font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-3 mt-4 rounded-sm shadow-md"
                  >
                    <Send size={18} />
                    Send Enquiry on WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WhatsAppServiceModal;
