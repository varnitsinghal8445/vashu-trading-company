import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import { ShoppingCart } from 'lucide-react';
import { shopProducts, categories } from '../../data/shopProducts';
import WhatsAppOrderModal from '../../components/shop/WhatsAppOrderModal';

import { useCart } from '../../context/CartContext';

const Shop = () => {
  const [filter, setFilter] = useState('All');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantities, setQuantities] = useState({});
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeVariantString, setActiveVariantString] = useState(null);
  const [activeQuantity, setActiveQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { cartTotalItems } = useCart();

  const filtered = filter === 'All' ? shopProducts : shopProducts.filter(p => p.category === filter);

  const handleOptionChange = (productId, value) => {
    setSelectedOptions(prev => ({ ...prev, [productId]: value }));
  };

  const handleMultiOptionChange = (productId, optionId, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [`${productId}_${optionId}`]: value
    }));
  };

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const next = current + delta;
      return { ...prev, [productId]: next > 0 ? next : 1 };
    });
  };

  const handleEnquireClick = (product, finalPrice, finalImage, variantString, qty) => {
    setActiveProduct({ ...product, price: finalPrice, img: finalImage });
    setActiveVariantString(variantString);
    setActiveQuantity(qty);
    setIsModalOpen(true);
  };

  return (
    <PageWrapper className="bg-[#0a0a0a] pt-24 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-secondary font-bold mb-3">Vasu Trading Company</h2>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">The Studio Store</h1>
            <p className="text-gray-400 font-light text-sm">Premium products & photography supplies.</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-4">
            <Link to="/checkout" className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-3 text-sm uppercase tracking-widest hover:border-secondary transition-all duration-300 rounded-sm shadow-sm relative">
              <ShoppingCart size={18} className="text-secondary" /> Cart
              {cartTotalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartTotalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 rounded-sm border ${
                filter === c 
                  ? 'bg-secondary text-black font-bold border-secondary shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(product => {
            const isMulti = !!product.multiOptions;
            let currentPrice = product.price;
            let currentImage = product.img;
            let currentOptionString = "";
            
            if (isMulti) {
              const selectedValues = {};
              const currentOptionStringArray = [];
              
              product.multiOptions.forEach(opt => {
                const fallbackProp = `default${opt.id.charAt(0).toUpperCase() + opt.id.slice(1)}`;
                const val = selectedOptions[`${product.id}_${opt.id}`] || product[fallbackProp] || opt.choices[0];
                selectedValues[opt.id] = val;
                currentOptionStringArray.push(`${opt.name}: ${val}`);
              });
              
              currentOptionString = currentOptionStringArray.join(' | ');
              
              // Pricing Strategy
              if (product.pricesBySize && selectedValues['size']) {
                currentPrice = product.pricesBySize[selectedValues['size']] || product.price;
              } else if (product.pricesByCombination) {
                const comboKey = product.multiOptions.map(opt => selectedValues[opt.id]).join('_');
                currentPrice = product.pricesByCombination[comboKey] || product.price;
              }

              // Image Strategy
              if (product.imagesByMaterial && selectedValues['material']) {
                currentImage = product.imagesByMaterial[selectedValues['material']] || product.img;
              } else if (product.imagesByCombination) {
                const comboKey = product.multiOptions.map(opt => selectedValues[opt.id]).join('_');
                currentImage = product.imagesByCombination[comboKey] || product.img;
              }
            } else {
              const currentOption = selectedOptions[product.id] || (product.options ? product.options[0] : null);
              currentPrice = (product.prices && currentOption && product.prices[currentOption]) 
                ? product.prices[currentOption] 
                : product.price;
              currentImage = (product.images && currentOption && product.images[currentOption])
                ? product.images[currentOption]
                : product.img;
              currentOptionString = currentOption || "";
            }

            const qty = quantities[product.id] || 1;
            const totalPrice = currentPrice * qty;
            
            return (
              <div key={product.id} className="group bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-sm hover:border-secondary/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col relative overflow-hidden">
                
                <div className="aspect-[4/3] bg-black mb-6 overflow-hidden relative rounded-sm border border-white/10">
                  <img src={currentImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"></div>
                </div>
                
                <div className="flex-grow relative z-10 mb-4">
                  <p className="text-[10px] uppercase tracking-widest text-secondary mb-2 font-bold">{product.category}</p>
                  <h3 className="text-xl font-serif text-white mb-4 line-clamp-2 group-hover:text-[#fff5d1] transition-colors duration-300">{product.name}</h3>
                  
                  {isMulti ? (
                    <div className="space-y-3">
                      {product.multiOptions.map(opt => (
                        <div key={opt.id}>
                          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">{opt.name}</label>
                          <select 
                            className="w-full bg-black border border-white/10 text-white text-sm p-2.5 rounded-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors appearance-none cursor-pointer font-medium"
                            value={selectedOptions[`${product.id}_${opt.id}`] || product[`default${opt.id.charAt(0).toUpperCase() + opt.id.slice(1)}`] || opt.choices[0]}
                            onChange={(e) => handleMultiOptionChange(product.id, opt.id, e.target.value)}
                          >
                            {opt.choices.map((choice, i) => (
                              <option key={i} value={choice}>{choice}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  ) : (
                    product.options && (
                      <select 
                        className="w-full bg-black border border-white/10 text-white text-sm p-2.5 rounded-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors appearance-none cursor-pointer"
                        value={selectedOptions[product.id] || product.options[0]}
                        onChange={(e) => handleOptionChange(product.id, e.target.value)}
                      >
                        <option disabled value="">Select an option...</option>
                        {product.options.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )
                  )}

                  <div className="mt-5 flex items-center justify-between gap-4 bg-white/5 p-3 rounded-sm border border-white/10">
                    <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Quantity</span>
                    <div className="flex items-center border border-white/20 rounded-sm overflow-hidden bg-black shadow-sm">
                      <button onClick={() => handleQuantityChange(product.id, -1)} className="px-3 py-1 text-white hover:bg-white/10 hover:text-secondary transition-colors font-bold text-lg leading-none">-</button>
                      <span className="px-4 py-1 text-sm font-bold text-white min-w-[40px] text-center border-x border-white/20">{qty}</span>
                      <button onClick={() => handleQuantityChange(product.id, 1)} className="px-3 py-1 text-white hover:bg-white/10 hover:text-secondary transition-colors font-bold text-lg leading-none">+</button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-5 mt-auto border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                      {product.prices || isMulti ? 'Total Price' : 'Starting from'}
                    </span>
                    <p className="text-secondary font-bold text-2xl tracking-wide">₹{totalPrice.toLocaleString()}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleEnquireClick(product, totalPrice, currentImage, currentOptionString, qty)}
                    className="bg-secondary hover:bg-white text-black px-5 py-3 rounded-sm text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Enquire / Buy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-light tracking-wider">
            No products found in this category.
          </div>
        )}
      </div>

      {activeProduct && (
        <WhatsAppOrderModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={activeProduct}
          selectedVariant={activeVariantString}
          quantity={activeQuantity}
        />
      )}
    </PageWrapper>
  );
};

export default Shop;
