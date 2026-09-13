import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Upload } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';

const ProductDetails = () => {
  const { id } = useParams();
  
  // Mock product
  const product = {
    id,
    name: 'Premium Leather Photobook',
    category: 'Photobook',
    basePrice: 15000,
    desc: 'Our highest quality photobook, featuring lay-flat thick pages and a genuine Italian leather cover. Perfect for wedding memories.',
    img: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1974&auto=format&fit=crop',
    sizes: ['12x36', '12x24', '10x10'],
    covers: ['Genuine Leather', 'Premium Velvet', 'Acrylic Glass'],
  };

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedCover, setSelectedCover] = useState(product.covers[0]);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(product.basePrice);

  const handleAddToCart = () => {
    alert(`Added to cart: ${qty}x ${product.name} (${selectedSize}, ${selectedCover}) - ₹${price * qty}`);
  };

  return (
    <PageWrapper className="bg-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="text-sm text-gray-400 hover:text-primary uppercase tracking-widest mb-12 inline-block">
          ← Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image */}
          <div className="aspect-[4/5] bg-gray-100">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            <p className="text-secondary tracking-widest uppercase text-xs mb-2">{product.category}</p>
            <h1 className="text-4xl font-serif text-primary mb-4">{product.name}</h1>
            <p className="text-2xl font-light text-gray-900 mb-6">₹{price.toLocaleString()}</p>
            <p className="text-gray-500 font-light leading-relaxed mb-10">{product.desc}</p>

            {/* Configurator */}
            <div className="space-y-8 mb-10">
              
              <div>
                <label className="block text-sm font-medium uppercase tracking-widest text-primary mb-3">Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(s => (
                    <button 
                      key={s} 
                      onClick={() => setSelectedSize(s)}
                      className={`px-6 py-3 border text-sm transition-colors ${selectedSize === s ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium uppercase tracking-widest text-primary mb-3">Cover Material</label>
                <div className="flex flex-wrap gap-3">
                  {product.covers.map(c => (
                    <button 
                      key={c} 
                      onClick={() => setSelectedCover(c)}
                      className={`px-6 py-3 border text-sm transition-colors ${selectedCover === c ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium uppercase tracking-widest text-primary mb-3">Upload Photo (If required)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-none p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload cover photo</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-center border border-gray-300">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-gray-600 hover:bg-gray-100">-</button>
                <span className="px-4 py-3 text-primary font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-gray-600 hover:bg-gray-100">+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-3"
              >
                <ShoppingCart size={18} /> Add to Cart — ₹{(price * qty).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetails;
