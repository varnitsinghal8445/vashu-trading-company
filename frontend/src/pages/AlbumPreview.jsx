import { useState } from 'react';
import { Check, MessageSquare, AlertCircle } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';

const AlbumPreview = () => {
  const [status, setStatus] = useState('Customer Review');
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [revisions, setRevisions] = useState([]);

  // Mock album data
  const album = {
    id: 'ALB-2026-9021',
    eventName: 'Rahul & Priya Wedding',
    type: 'Premium Photobook',
    size: '12x36',
    pages: 40,
    sheets: 20,
    previewUrl: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1974&auto=format&fit=crop', // Placeholder for flipbook/PDF
  };

  const handleApprove = () => {
    setStatus('Approved');
    alert('Album design approved! Moving to printing.');
  };

  const handleRequestChanges = () => {
    if (!comment.trim()) {
      alert('Please enter a revision comment.');
      return;
    }
    
    setRevisions([{ date: new Date().toLocaleDateString(), text: comment }, ...revisions]);
    setStatus('Changes Requested');
    setComment('');
    setShowCommentBox(false);
    alert('Revision request sent to the designer.');
  };

  return (
    <PageWrapper className="bg-gray-50 min-h-screen pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <p className="text-secondary tracking-widest uppercase text-xs mb-1">Album Preview</p>
            <h1 className="text-3xl font-serif text-primary">{album.eventName}</h1>
            <p className="text-gray-500 text-sm font-light mt-1">
              {album.type} • {album.size} • {album.pages} Pages
            </p>
          </div>

          <div className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide ${
            status === 'Approved' ? 'bg-green-100 text-green-800' :
            status === 'Changes Requested' ? 'bg-orange-100 text-orange-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            Status: {status}
          </div>
        </div>

        {/* Viewer */}
        <div className="bg-white p-4 shadow-sm border border-gray-200 mb-8 rounded-sm">
          <div className="aspect-[2/1] bg-gray-100 flex items-center justify-center relative overflow-hidden">
            <img src={album.previewUrl} alt="Album Preview" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity">
              <button className="bg-white text-primary px-6 py-3 uppercase tracking-widest text-sm font-medium hover:bg-secondary hover:text-white transition-colors">
                Open Fullscreen Flipbook
              </button>
            </div>
          </div>
        </div>

        {/* Action Area */}
        {status === 'Customer Review' && (
          <div className="bg-white p-8 shadow-sm border border-gray-200">
            {!showCommentBox ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleApprove}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-green-700 transition-colors w-full sm:w-auto"
                >
                  <Check size={18} /> Approve Design
                </button>
                <button 
                  onClick={() => setShowCommentBox(true)}
                  className="flex items-center justify-center gap-2 border border-primary text-primary px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-primary hover:text-white transition-colors w-full sm:w-auto"
                >
                  <MessageSquare size={18} /> Request Changes
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h3 className="text-lg font-serif text-primary mb-4 flex items-center gap-2">
                  <AlertCircle size={20} className="text-secondary" /> Request Revisions
                </h3>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="e.g., Please replace the photo on page 12 with image #145..."
                  className="w-full border border-gray-300 p-4 min-h-[150px] focus:outline-none focus:border-secondary mb-4 text-sm font-light"
                ></textarea>
                <div className="flex justify-end gap-4">
                  <button 
                    onClick={() => setShowCommentBox(false)}
                    className="text-gray-500 hover:text-primary transition-colors text-sm uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleRequestChanges}
                    className="bg-primary text-white px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Revision History */}
        {revisions.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-serif text-primary mb-6">Revision History</h3>
            <div className="space-y-4">
              {revisions.map((rev, idx) => (
                <div key={idx} className="bg-white p-6 border-l-4 border-orange-400 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-primary text-sm">You requested changes</span>
                    <span className="text-gray-400 text-xs">{rev.date}</span>
                  </div>
                  <p className="text-gray-600 font-light text-sm">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default AlbumPreview;
