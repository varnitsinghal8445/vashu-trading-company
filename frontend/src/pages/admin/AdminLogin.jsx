import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Camera, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, userInfo } = useAuth();

  useEffect(() => {
    // If already logged in as admin, redirect
    if (userInfo && userInfo.role === 'Admin') {
      navigate('/admin');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      if (data.role !== 'Admin') {
        throw new Error('Access denied. Admin role required.');
      }

      login(data);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center rounded-full mx-auto mb-6">
            <Camera className="text-secondary" size={28} />
          </div>
          <h2 className="text-3xl font-serif text-white mb-2">Studio Portal</h2>
          <p className="text-gray-500 font-light text-xs uppercase tracking-[0.2em]">Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-2xl">
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-sm flex items-start gap-3 text-red-500">
              <Lock size={16} className="mt-0.5" />
              <p className="text-xs font-medium tracking-wide">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                placeholder="admin@vasustudio.com"
              />
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary text-black font-bold uppercase tracking-widest text-xs py-4 rounded-sm hover:bg-white transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <p className="text-center text-gray-600 text-[10px] uppercase tracking-widest mt-12">
          &copy; {new Date().getFullYear()} Vasu Trading Company
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
