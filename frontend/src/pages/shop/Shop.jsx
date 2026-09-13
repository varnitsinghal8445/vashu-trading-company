import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import { ShoppingCart } from 'lucide-react';
import { shopProducts, categories } from '../../data/shopProducts';

const Shop = () => {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? shopProducts : shopProducts.filter(p => p.category === filter);

  return (
    <PageWrapper className="bg-white pt-24 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-8">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-secondary font-bold mb-3">Vasu Trading Company</h2>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">The Studio Store</h1>
            <p className="text-gray-500 font-light text-sm">Premium products & photography supplies.</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-4">
            <Link to="/checkout" className="flex items-center gap-2 bg-white border border-gray-200 text-gray-800 px-6 py-3 text-sm uppercase tracking-widest hover:border-gray-900 transition-all duration-300 rounded-sm shadow-sm">
              <ShoppingCart size={18} className="text-secondary" /> Cart (0)
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 rounded-sm ${
                filter === c 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(product => (
            <div key={product.id} className="group bg-white border border-gray-100 p-5 rounded-sm hover:border-gray-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col relative overflow-hidden">
              
              <div className="aspect-[4/3] bg-gray-50 mb-6 overflow-hidden relative rounded-sm border border-gray-100">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"></div>
              </div>
              
              <div className="flex-grow relative z-10 mb-4">
                <p className="text-[10px] uppercase tracking-widest text-secondary mb-2 font-bold">{product.category}</p>
                <h3 className="text-xl font-serif text-gray-900 mb-4 line-clamp-2 group-hover:text-black transition-colors duration-300">{product.name}</h3>
                
                {product.options && (
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm p-2.5 rounded-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors appearance-none cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    <option disabled selected>Select an option...</option>
                    {product.options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Starting from</span>
                  <p className="text-gray-900 font-bold text-xl tracking-wide">₹{product.price.toLocaleString()}</p>
                </div>
                
                <a 
                  href={`https://wa.me/919761841098?text=${encodeURIComponent(`Hi, I am interested in buying the ${product.name} from the Vasu Trading Company store.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-900 text-gray-900 hover:text-white border border-gray-300 hover:border-gray-900 px-4 py-2.5 rounded-sm text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  Enquire / Buy
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-light tracking-wider">
            No products found in this category.
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Shop;
