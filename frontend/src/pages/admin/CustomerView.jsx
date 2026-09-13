import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, ShoppingBag, BookOpen } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const CustomerView = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Bookings', 'Orders', 'Payments', 'Albums', 'Galleries', 'Notes'];

  // Mock aggregated data
  const customer = {
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    phone: "+91 9876543210",
    location: "Mumbai, MH",
    joinDate: "Aug 2025",
    totalSpent: 120000,
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-primary">Customer Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Aggregated 360° view of customer interactions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-serif text-gray-500">
              {customer.name.charAt(0)}
            </div>
            <h2 className="text-xl font-medium text-primary mb-1">{customer.name}</h2>
            <p className="text-sm text-gray-500 mb-6">Customer since {customer.joinDate}</p>

            <div className="space-y-4 text-sm text-left border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} className="text-gray-400" /> {customer.email}
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={16} className="text-gray-400" /> {customer.phone}
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={16} className="text-gray-400" /> {customer.location}
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-4 rounded-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Lifetime Value</p>
              <p className="text-2xl font-serif text-primary">₹{customer.totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'border-b-2 border-secondary text-primary' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'Overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quick Cards */}
                  <div className="border border-gray-100 p-4 rounded-sm flex items-start gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Calendar size={20} /></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Active Bookings</h4>
                      <p className="text-sm text-gray-500 mt-1">1 upcoming event (Wedding)</p>
                    </div>
                  </div>
                  <div className="border border-gray-100 p-4 rounded-sm flex items-start gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CreditCard size={20} /></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Payment Status</h4>
                      <p className="text-sm text-gray-500 mt-1">All clear. No pending dues.</p>
                    </div>
                  </div>
                  <div className="border border-gray-100 p-4 rounded-sm flex items-start gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><ShoppingBag size={20} /></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Recent Orders</h4>
                      <p className="text-sm text-gray-500 mt-1">2 Photobooks ordered</p>
                    </div>
                  </div>
                  <div className="border border-gray-100 p-4 rounded-sm flex items-start gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><BookOpen size={20} /></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Album Design</h4>
                      <p className="text-sm text-gray-500 mt-1">Pending Customer Approval</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab !== 'Overview' && (
                <div className="py-20 text-center text-gray-400 font-light text-sm">
                  {activeTab} data will be populated here by the API.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default CustomerView;
