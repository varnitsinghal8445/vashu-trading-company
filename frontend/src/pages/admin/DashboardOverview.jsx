import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';

const data = [
  { name: 'Jan', revenue: 400000 },
  { name: 'Feb', revenue: 300000 },
  { name: 'Mar', revenue: 550000 },
  { name: 'Apr', revenue: 450000 },
  { name: 'May', revenue: 800000 }, // Peak wedding season
  { name: 'Jun', revenue: 200000 },
];

const DashboardOverview = () => {
  const stats = [
    { label: 'New Enquiries', value: '24', color: 'text-blue-600' },
    { label: 'Confirmed Bookings', value: '12', color: 'text-green-600' },
    { label: 'Upcoming Events', value: '8', color: 'text-purple-600' },
    { label: 'Pending Payments', value: '₹1.2L', color: 'text-red-600' },
    { label: 'Albums in Design', value: '5', color: 'text-orange-600' },
    { label: 'Printing Orders', value: '18', color: 'text-teal-600' },
    { label: 'Frame Orders', value: '7', color: 'text-cyan-600' },
    { label: 'Pending Deliveries', value: '4', color: 'text-pink-600' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-primary">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
            <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
            <span className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Revenue Trend (YTD)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#1a1a1a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Placeholder for other tables/charts */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Upcoming Events</h3>
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Calendar Feed Placeholder
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardOverview;
