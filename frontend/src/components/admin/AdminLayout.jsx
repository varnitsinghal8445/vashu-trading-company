import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, CalendarCheck, Users, Target, Camera, 
  Settings, BookOpen, Layers, Image as ImageIcon, Box, 
  Printer, Square, ShoppingBag, CreditCard, Star, Bell, Menu, X,
  Briefcase
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin' },
    { name: 'Bookings', icon: <CalendarCheck size={18} />, path: '/admin/bookings' },
    { name: 'Customers', icon: <Users size={18} />, path: '/admin/customers' },
    { name: 'Leads', icon: <Target size={18} />, path: '/admin/leads' },
    { name: 'Photographers', icon: <Camera size={18} />, path: '/admin/photographers' },
    { name: 'Services', icon: <Briefcase size={18} />, path: '/admin/services' },
    { name: 'Packages', icon: <Layers size={18} />, path: '/admin/packages' },
    { name: 'Albums', icon: <BookOpen size={18} />, path: '/admin/albums' },
    { name: 'Galleries', icon: <ImageIcon size={18} />, path: '/admin/galleries' },
    { name: 'Products', icon: <Box size={18} />, path: '/admin/products' },
    { name: 'Printing', icon: <Printer size={18} />, path: '/admin/printing' },
    { name: 'Frames', icon: <Square size={18} />, path: '/admin/frames' },
    { name: 'Orders', icon: <ShoppingBag size={18} />, path: '/admin/orders' },
    { name: 'Payments', icon: <CreditCard size={18} />, path: '/admin/payments' },
    { name: 'Portfolio', icon: <ImageIcon size={18} />, path: '/admin/portfolio' },
    { name: 'Reviews', icon: <Star size={18} />, path: '/admin/reviews' },
    { name: 'Notifications', icon: <Bell size={18} />, path: '/admin/notifications' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 h-screen w-64 bg-primary text-gray-300 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 flex flex-col`}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <Link to="/admin" className="flex items-center gap-2">
            <img src="/vasu-logo.jpg" alt="Logo" className="w-8 h-8 object-cover rounded-sm" />
            <span className="text-xl font-serif font-bold text-white tracking-wider hidden sm:block">Vasu<span className="text-secondary">Admin</span></span>
          </Link>
          <button className="md:hidden text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-800">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-6 py-2.5 text-sm transition-colors ${
                    location.pathname === link.path 
                      ? 'bg-secondary/10 text-secondary border-r-2 border-secondary' 
                      : 'hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between sticky top-0 z-30">
          <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Admin User</span>
            <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
