import { useState } from 'react';
import { CreditCard, Package, Calendar, Settings } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const mockPayments = [
  {
    id: 'pay_MOCK123',
    date: '10 Dec 2025',
    relatedTo: 'Wedding Booking (Advance)',
    total: 80000,
    paid: 30000,
    remaining: 50000,
    status: 'Partially Paid',
  },
  {
    id: 'pay_MOCK456',
    date: '12 Jan 2026',
    relatedTo: 'Order: Premium Photobook',
    total: 15000,
    paid: 15000,
    remaining: 0,
    status: 'Paid',
  }
];

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('payments');

  return (
    <PageWrapper className="bg-gray-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-primary mb-8">My Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'bookings' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <Calendar size={18} /> My Bookings
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <Package size={18} /> My Orders
            </button>
            <button 
              onClick={() => setActiveTab('payments')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'payments' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <CreditCard size={18} /> Payment History
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              <Settings size={18} /> Settings
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white p-8 shadow-sm border border-gray-100">
            {activeTab === 'payments' && (
              <div>
                <h2 className="text-2xl font-serif text-primary mb-6 border-b border-gray-100 pb-4">Payment History</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-sm tracking-widest uppercase text-gray-500">
                        <th className="py-4 px-4 font-medium">Date</th>
                        <th className="py-4 px-4 font-medium">Related To</th>
                        <th className="py-4 px-4 font-medium">Total</th>
                        <th className="py-4 px-4 font-medium">Paid</th>
                        <th className="py-4 px-4 font-medium">Remaining</th>
                        <th className="py-4 px-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPayments.map((pay, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 text-sm text-gray-600">{pay.date}</td>
                          <td className="py-4 px-4 text-sm font-medium text-primary">{pay.relatedTo}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">₹{pay.total.toLocaleString()}</td>
                          <td className="py-4 px-4 text-sm text-green-600">₹{pay.paid.toLocaleString()}</td>
                          <td className="py-4 px-4 text-sm text-red-500">₹{pay.remaining.toLocaleString()}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              pay.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                              pay.status === 'Partially Paid' ? 'bg-orange-100 text-orange-700' : 
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {pay.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab !== 'payments' && (
              <div className="text-center py-20 text-gray-500 font-light">
                This section is currently under construction.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CustomerDashboard;
