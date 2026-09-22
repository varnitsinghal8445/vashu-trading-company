import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, MapPin, Search, Printer, Download, Clock, CheckCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const PrintOrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/print-orders');
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching print orders", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/print-orders/${id}/status`, { status });
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update status");
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter.toUpperCase());

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900 mb-2">Print Orders</h1>
          <p className="text-gray-500">Manage customer photo printing requests.</p>
        </div>
        
        <div className="flex bg-white rounded-md shadow-sm border border-gray-200 p-1">
          {['all', 'new', 'printing', 'ready', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm capitalize font-medium rounded-md transition-colors ${
                filter === f ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Orders List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-200px)] flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Order ID or Name..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>
          
          <div className="overflow-y-auto flex-1 p-2">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center p-8 text-gray-500">
                <Printer size={32} className="mx-auto mb-4 opacity-50" />
                <p>No print orders found.</p>
              </div>
            ) : (
              filteredOrders.map(order => (
                <div 
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors mb-2 border ${
                    selectedOrder?._id === order._id 
                      ? 'bg-primary/5 border-primary text-primary' 
                      : 'bg-white border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold">{order.orderId}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${
                      order.status === 'NEW' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'PRINTING' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'READY' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{order.customerDetails.fullName}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.totals.totalPhotos} Photos • {order.totals.totalPrints} Prints</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Details View */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif text-gray-900 mb-1">{selectedOrder.orderId}</h2>
                  <p className="text-sm text-gray-500">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
                
                <div className="flex gap-2">
                  <select 
                    value={selectedOrder.status}
                    onChange={(e) => updateStatus(selectedOrder._id, e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="NEW">New Order</option>
                    <option value="PRINTING">Printing in Progress</option>
                    <option value="READY">Ready for Pickup/Delivery</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                  <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                    <Download size={16} /> Download All
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-6 grid grid-cols-2 gap-8 border-b border-gray-100">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Customer Details</h3>
                  <div className="space-y-2 text-sm text-gray-800">
                    <p><strong className="text-gray-500 w-24 inline-block">Name:</strong> {selectedOrder.customerDetails.fullName}</p>
                    <p><strong className="text-gray-500 w-24 inline-block">Mobile:</strong> {selectedOrder.customerDetails.mobileNumber}</p>
                    <p><strong className="text-gray-500 w-24 inline-block">WhatsApp:</strong> {selectedOrder.customerDetails.whatsappNumber}</p>
                    {selectedOrder.customerDetails.email && (
                      <p><strong className="text-gray-500 w-24 inline-block">Email:</strong> {selectedOrder.customerDetails.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Delivery & Payment</h3>
                  <div className="space-y-2 text-sm text-gray-800">
                    <p className="flex items-center gap-2">
                      {selectedOrder.deliveryMethod === 'Home Delivery' ? <Package size={16} className="text-blue-500"/> : <MapPin size={16} className="text-green-500"/>}
                      <strong>{selectedOrder.deliveryMethod}</strong>
                    </p>
                    <p><strong className="text-gray-500 w-24 inline-block">City:</strong> {selectedOrder.customerDetails.city}</p>
                    {selectedOrder.deliveryMethod === 'Home Delivery' && (
                       <p><strong className="text-gray-500 w-24 inline-block align-top">Address:</strong> <span className="inline-block max-w-[200px]">{selectedOrder.customerDetails.address}</span></p>
                    )}
                    <p className="mt-4 pt-2 border-t border-gray-100"><strong className="text-gray-500 w-24 inline-block">Est. Total:</strong> <span className="text-lg font-serif text-primary">₹{selectedOrder.totals.estimatedPrice}</span></p>
                  </div>
                </div>
              </div>

              {selectedOrder.customerDetails.specialInstructions && (
                <div className="p-6 bg-yellow-50 border-b border-yellow-100 text-yellow-800 text-sm">
                  <strong>Instructions: </strong> {selectedOrder.customerDetails.specialInstructions}
                </div>
              )}

              {/* Photos List */}
              <div className="p-6">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 flex justify-between">
                  <span>Configured Prints ({selectedOrder.totals.totalPhotos})</span>
                  <span>Total Qty: {selectedOrder.totals.totalPrints}</span>
                </h3>
                
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                  {selectedOrder.photos.map((photo, index) => (
                    <div key={photo._id || index} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col group">
                      <div className="aspect-square bg-gray-100 relative">
                        <img 
                          src={photo.imageUrl} 
                          alt={`Print ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="bg-white text-gray-900 px-3 py-1 rounded-sm text-xs font-medium flex items-center gap-1 shadow-lg">
                            <Download size={14} /> High-Res
                          </button>
                        </div>
                      </div>
                      <div className="p-3 bg-white text-xs space-y-1 relative">
                         <div className="absolute top-0 right-0 bg-gray-900 text-white px-2 py-1 rounded-bl-lg font-bold">
                           x{photo.quantity}
                         </div>
                         <p><strong className="text-gray-500">Size:</strong> {photo.size}</p>
                         <p><strong className="text-gray-500">Paper:</strong> {photo.paper}</p>
                         <p><strong className="text-gray-500">Orientation:</strong> {photo.orientation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex flex-col items-center justify-center text-gray-400">
              <Printer size={64} className="mb-6 opacity-20" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">Select an Order</h2>
              <p>Click on a print order from the list to view its details and download photos.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PrintOrdersManager;
