import { useState } from 'react';
import { format } from 'date-fns';
import { Search, Filter, Plus } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const mockLeads = [
  { id: 'L-101', name: 'Arjun Singh', phone: '+91 9876543210', event: 'Wedding', date: '2026-11-15', source: 'Instagram', status: 'New' },
  { id: 'L-102', name: 'Neha Gupta', phone: '+91 8765432109', event: 'Pre-Wedding', date: '2026-10-05', source: 'Website', status: 'Contacted' },
  { id: 'L-103', name: 'Vikram Patel', phone: '+91 7654321098', event: 'Wedding', date: '2026-12-20', source: 'Referral', status: 'Converted' },
];

const LeadsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif text-primary">Lead Management</h1>
          <p className="text-gray-500 text-sm mt-1">Track and convert your inquiries.</p>
        </div>
        <button className="bg-secondary text-primary px-4 py-2 text-sm font-medium rounded-sm flex items-center gap-2 hover:bg-opacity-90">
          <Plus size={16} /> Add Lead
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-600 px-4 py-2 border border-gray-200 rounded-sm hover:bg-gray-50 w-full sm:w-auto">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
                <th className="py-3 px-6 font-medium">Lead info</th>
                <th className="py-3 px-6 font-medium">Event & Date</th>
                <th className="py-3 px-6 font-medium">Source</th>
                <th className="py-3 px-6 font-medium">Status</th>
                <th className="py-3 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-gray-500 text-xs">{lead.phone}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-900">{lead.event}</p>
                    <p className="text-gray-500 text-xs">{format(new Date(lead.date), 'dd MMM yyyy')}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'Converted' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-secondary hover:text-primary transition-colors text-sm font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>Showing 1 to 3 of 3 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-sm hover:bg-gray-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-gray-200 rounded-sm hover:bg-gray-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LeadsManager;
