import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MapPin, Package, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const PrintCheckoutModal = ({ isOpen, onClose, photos, totalAmount }) => {
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    city: '',
    address: '',
    specialInstructions: '',
    deliveryMethod: 'Studio Pickup',
    sameAsMobile: false
  });

  if (!isOpen) return null;

  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    setFormData({
      ...formData,
      sameAsMobile: checked,
      whatsappNumber: checked ? formData.mobileNumber : formData.whatsappNumber
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit Order to Backend
      const totalPrints = photos.reduce((acc, curr) => acc + curr.quantity, 0);
      
      const payload = {
        customerDetails: {
          fullName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          whatsappNumber: formData.whatsappNumber,
          email: formData.email,
          city: formData.city,
          address: formData.address,
          specialInstructions: formData.specialInstructions,
        },
        deliveryMethod: formData.deliveryMethod,
        photos: photos.map(p => ({
          imageUrl: p.fileUrl || '/images/ai-wedding/couple_large.jpg', // Fallback for local testing without real upload
          size: p.size,
          paper: p.paper,
          finish: p.finish,
          quantity: p.quantity,
          orientation: p.orientation
        })),
        totals: {
          totalPhotos: photos.length,
          totalPrints: totalPrints,
          estimatedPrice: totalAmount
        }
      };

      const response = await axios.post('http://localhost:5000/api/print-orders', payload);
      const newOrderId = response.data.data.orderId;
      setOrderId(newOrderId);

      // 2. Generate WhatsApp Message
      const businessNumber = "919761841098";
      let message = `📸 *NEW PHOTO PRINT ORDER*\n\n`;
      message += `Order ID: *${newOrderId}*\n`;
      message += `Customer: ${formData.fullName}\n`;
      message += `Phone: ${formData.mobileNumber}\n\n`;
      
      message += `Photos: ${photos.length}\n`;
      message += `Total Prints: ${totalPrints}\n`;
      message += `Total Amount: ₹${totalAmount}\n\n`;
      
      message += `*Order Details:*\n`;
      photos.forEach((p, idx) => {
        message += `\nPhoto ${idx + 1}\n`;
        message += `Size: ${p.size}\n`;
        message += `Paper: ${p.paper}\n`;
        message += `Qty: ${p.quantity}\n`;
      });

      message += `\n\n*Secure Admin Access to Download Photos:*\n`;
      message += `http://localhost:5173/admin/print-orders\n`; // Adjust domain in prod

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      setStep(2);

    } catch (error) {
      console.error("Error submitting order", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl shadow-2xl relative rounded-sm my-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#0a0a0a] z-10">
            <h3 className="text-xl font-serif text-white uppercase tracking-widest">
              {step === 1 ? "Complete Your Order" : "Order Confirmed"}
            </h3>
            {step === 1 && (
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            )}
          </div>

          <div className="p-6 md:p-8">
            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Delivery Options */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-secondary mb-4">How would you like to receive your prints?</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, deliveryMethod: 'Studio Pickup'})}
                      className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${
                        formData.deliveryMethod === 'Studio Pickup' 
                          ? 'border-secondary bg-secondary/10 text-white' 
                          : 'border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <MapPin size={24} className={formData.deliveryMethod === 'Studio Pickup' ? 'text-secondary' : ''} />
                      <span className="text-sm tracking-wider uppercase">Studio Pickup</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, deliveryMethod: 'Home Delivery'})}
                      className={`p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${
                        formData.deliveryMethod === 'Home Delivery' 
                          ? 'border-secondary bg-secondary/10 text-white' 
                          : 'border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <Package size={24} className={formData.deliveryMethod === 'Home Delivery' ? 'text-secondary' : ''} />
                      <span className="text-sm tracking-wider uppercase">Home Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-secondary mb-4">Where should we contact you?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Full Name *</label>
                      <input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-secondary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Email (Optional)</label>
                      <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-secondary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Mobile Number *</label>
                      <input type="tel" required value={formData.mobileNumber} onChange={e => {
                        setFormData(prev => ({
                          ...prev, 
                          mobileNumber: e.target.value,
                          whatsappNumber: prev.sameAsMobile ? e.target.value : prev.whatsappNumber
                        }));
                      }} className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-secondary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">WhatsApp Number *</label>
                      <input type="tel" required value={formData.whatsappNumber} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} disabled={formData.sameAsMobile} className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-secondary focus:outline-none disabled:opacity-50" />
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input type="checkbox" checked={formData.sameAsMobile} onChange={handleCheckbox} className="accent-secondary" />
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Same as mobile</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Delivery Details */}
                {formData.deliveryMethod === 'Home Delivery' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-secondary mb-4">Delivery Address</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">City *</label>
                        <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-secondary focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Complete Address *</label>
                        <textarea required rows="3" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-secondary focus:outline-none resize-none"></textarea>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Pick up detail */}
                 {formData.deliveryMethod === 'Studio Pickup' && (
                   <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">City *</label>
                      <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-secondary focus:outline-none" />
                   </div>
                 )}

                {/* Instructions */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Special Instructions (Optional)</label>
                  <input type="text" placeholder="e.g. Please keep colors natural..." value={formData.specialInstructions} onChange={e => setFormData({...formData, specialInstructions: e.target.value})} className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-secondary focus:outline-none" />
                </div>

                {/* Submit */}
                <div className="pt-6 border-t border-white/10">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 uppercase tracking-[0.2em] text-sm font-bold transition-colors flex items-center justify-center gap-3 rounded-sm disabled:opacity-50 shadow-lg"
                  >
                    <Send size={18} />
                    {isSubmitting ? 'Processing Order...' : 'Send Order on WhatsApp'}
                  </button>
                  <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-4">
                    Your photos will be securely uploaded and attached to the order.
                  </p>
                </div>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <CheckCircle2 size={64} className="text-secondary mx-auto mb-6" />
                <h2 className="text-3xl font-serif text-white mb-2">YOUR MEMORIES ARE ON THEIR WAY.</h2>
                <p className="text-gray-400 font-light mb-8">Your photo printing request has been successfully received.</p>
                
                <div className="bg-white/5 border border-white/10 p-6 inline-block text-left mx-auto mb-10 rounded-sm">
                  <p className="text-sm text-gray-300 mb-2">Order ID: <span className="text-white font-medium">{orderId}</span></p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Photos uploaded securely</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> Print configuration received</li>
                    <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-green-500"/> WhatsApp notification sent</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <button onClick={() => window.location.reload()} className="border border-white/30 text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-sm">
                    Back to Photo Printing
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PrintCheckoutModal;
