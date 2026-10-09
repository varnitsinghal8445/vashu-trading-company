import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, CheckCircle, XCircle, Trash2, Clock, Filter } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews/admin');
      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/reviews/${id}/status`, { status });
      // Update local state
      setReviews(reviews.map(r => r._id === id ? { ...r, status } : r));
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update status");
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review permanently?")) return;
    try {
      await axios.delete(`/api/reviews/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
    } catch (error) {
      console.error("Error deleting review", error);
      alert("Failed to delete review");
    }
  };

  const filteredReviews = filter === 'all' ? reviews : reviews.filter(r => r.status === filter);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900 mb-2">Customer Reviews</h1>
          <p className="text-gray-500">Manage, approve, or reject customer stories.</p>
        </div>
        
        <div className="flex bg-white rounded-md shadow-sm border border-gray-200 p-1">
          {['all', 'pending', 'approved', 'rejected'].map(f => (
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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Filter size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Reviews Found</h3>
          <p className="text-gray-500">No customer reviews match the current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredReviews.map(review => (
            <div key={review._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
              
              <div className="w-full md:w-1/4 bg-gray-50 p-6 flex flex-col border-b md:border-b-0 md:border-r border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  {review.status === 'pending' && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 uppercase tracking-wider font-bold rounded flex items-center gap-1"><Clock size={12}/> Pending</span>}
                  {review.status === 'approved' && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 uppercase tracking-wider font-bold rounded flex items-center gap-1"><CheckCircle size={12}/> Approved</span>}
                  {review.status === 'rejected' && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 uppercase tracking-wider font-bold rounded flex items-center gap-1"><XCircle size={12}/> Rejected</span>}
                </div>
                
                <h3 className="font-medium text-gray-900 mb-1">{review.customerName}</h3>
                {review.partnerName && <p className="text-sm text-gray-500 mb-3">& {review.partnerName}</p>}
                
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>{review.email}</p>
                  <p>{review.phone}</p>
                  <p>{review.city}</p>
                </div>
                
                <div className="mt-auto">
                  <p className="text-xs uppercase tracking-widest text-secondary font-bold">{review.eventType}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="w-full md:w-3/4 p-6 flex flex-col">
                <div className="flex gap-1 text-secondary mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                
                <p className="text-gray-800 italic mb-6 leading-relaxed flex-grow">
                  "{review.story}"
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    {review.status !== 'approved' && (
                      <button 
                        onClick={() => updateStatus(review._id, 'approved')}
                        className="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                    )}
                    {review.status !== 'rejected' && (
                      <button 
                        onClick={() => updateStatus(review._id, 'rejected')}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => deleteReview(review._id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-md transition-colors"
                    title="Delete permanently"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default ReviewsManager;
