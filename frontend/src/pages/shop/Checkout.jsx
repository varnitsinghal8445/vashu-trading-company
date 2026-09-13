import { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cartTotal = 15000;

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    
    // MOCK RAZORPAY FLOW
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <PageWrapper className="bg-gray-50 flex items-center justify-center pt-24 pb-32">
        <div className="bg-white p-12 shadow-sm border border-gray-200 text-center max-w-lg w-full mx-4">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-primary mb-4">Payment Successful!</h2>
          <p className="text-gray-600 font-light mb-8">
            Thank you for your order. Transaction ID: <span className="font-medium text-gray-800">pay_MOCK{Math.floor(Math.random() * 1000000)}</span>
          </p>
          <a href="/shop" className="bg-primary text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-secondary transition-colors">
            Return to Store
          </a>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="bg-gray-50 pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-primary mb-12">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Address */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg uppercase tracking-widest text-primary mb-6 border-b border-gray-100 pb-4">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none" />
                <input type="text" placeholder="Last Name" className="border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none" />
                <input type="text" placeholder="Address" className="col-span-2 border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none" />
                <input type="text" placeholder="City" className="border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none" />
                <input type="text" placeholder="PIN Code" className="border border-gray-300 p-3 text-sm focus:border-secondary focus:outline-none" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg uppercase tracking-widest text-primary mb-6 border-b border-gray-100 pb-4">Payment Method</h3>
              <div className="border border-secondary bg-secondary/5 p-4 flex items-center gap-4 cursor-pointer">
                <CreditCard className="text-secondary" />
                <div>
                  <p className="font-medium text-primary">Razorpay (Test Mode)</p>
                  <p className="text-xs text-gray-500">Pay securely via UPI, Cards, NetBanking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-primary text-white p-8 sticky top-24">
              <h3 className="text-lg font-serif mb-6 border-b border-gray-700 pb-4">Order Summary</h3>
              <div className="space-y-4 mb-6 text-sm font-light text-gray-300">
                <div className="flex justify-between">
                  <span>1x Premium Leather Photobook</span>
                  <span>₹15,000</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Size: 12x36 | Cover: Velvet</span>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4 mb-8 flex justify-between items-center text-lg font-medium">
                <span>Total</span>
                <span className="text-secondary">₹{cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={handleRazorpayPayment}
                disabled={isProcessing}
                className="w-full bg-secondary text-primary py-4 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors flex justify-center items-center gap-2"
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
