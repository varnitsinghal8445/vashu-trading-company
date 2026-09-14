import { useState } from 'react';
import { X, Send, CheckCircle2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const WhatsAppOrderModal = ({ isOpen, onClose, product, selectedVariant, quantity = 1 }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !phone) return;

    // Build the formatted WhatsApp message exactly as requested
    const businessNumber = "919761841098";
    
    let message = `🛍️ *New Product Inquiry*\n\n`;
    
    message += `👤 *Customer Details*\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n\n`;
    
    message += `📦 *Product Details*\n`;
    message += `Product: ${product.name}\n`;
    if (product.id) message += `Product ID/SKU: ${product.id}\n`;
    if (product.category) message += `Category: ${product.category}\n`;
    
    // Check if price is a number to use toLocaleString, otherwise just display it
    const formattedPrice = typeof product.price === 'number' 
      ? `₹${product.price.toLocaleString()}` 
      : (product.price || product.basePrice);
    
    message += `Price: ${formattedPrice}\n`;
    message += `Quantity: ${quantity}\n`;
    
    if (selectedVariant) {
      message += `Selected Option: ${selectedVariant}\n`;
    }
    
    message += `\n🔗 *Product Link*\n`;
    message += window.location.href;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;
    
    // Add exactly this configured product to the Global Cart
    const cartItem = {
      id: product.id,
      name: product.name,
      category: product.category,
      img: product.img,
      variantString: selectedVariant,
      unitPrice: typeof product.price === 'number' ? product.price : (product.basePrice || 0),
      quantity: quantity
    };
    
    addToCart(cartItem);

    window.open(whatsappUrl, '_blank');
    
    // Show success confirmation instead of closing immediately
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
            <h3 className="text-xl font-serif text-gray-900">{isSuccess ? "Success" : "Enquire via WhatsApp"}</h3>
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
                <h4 className="text-2xl font-serif text-gray-900 mb-2">Item Added to Cart!</h4>
                <p className="text-gray-500 text-sm mb-8 px-4">
                  Product selected successfully and added to your cart. We also opened WhatsApp so you can chat with us.
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
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Product Summary */}
            <div className="flex gap-4 mb-8 bg-gray-50 p-4 border border-gray-100 rounded-sm items-center">
              {product.img && (
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-sm shrink-0 overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.category}</p>
                <h4 className="font-semibold text-gray-900 leading-tight mb-1">{product.name}</h4>
                {selectedVariant && (
                  <p className="text-xs text-secondary font-medium">Variant: {selectedVariant}</p>
                )}
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
                Send Inquiry on WhatsApp
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

export default WhatsAppOrderModal;
