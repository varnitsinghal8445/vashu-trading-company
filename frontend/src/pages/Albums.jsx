import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Layers, Sparkles, Box, Check, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import { useCart } from '../context/CartContext';
import { shopProducts } from '../data/shopProducts';

const Albums = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find the Premium Hardbound Photo Book product
  const albumProduct = shopProducts.find(p => p.id === 'pa-1');
  
  // Extract options from product data
  const sizeOptions = albumProduct.multiOptions.find(opt => opt.id === 'size').choices;
  const pageOptions = albumProduct.multiOptions.find(opt => opt.id === 'pages').choices;
  const finishOptions = ['Matte', 'Glossy']; // Additional custom option

  // Form State
  const [selectedSize, setSelectedSize] = useState(albumProduct.defaultSize || sizeOptions[2]);
  const [selectedPages, setSelectedPages] = useState(albumProduct.defaultPages || pageOptions[0]);
  const [selectedFinish, setSelectedFinish] = useState('Matte');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate Price
  useEffect(() => {
    if (albumProduct && albumProduct.pricesByCombination) {
      const combinationKey = `${selectedSize}_${selectedPages}`;
      const basePrice = albumProduct.pricesByCombination[combinationKey] || albumProduct.price;
      setTotalPrice(basePrice * quantity);
    }
  }, [selectedSize, selectedPages, quantity, albumProduct]);

  const handleAddToCart = () => {
    const variantString = `Size: ${selectedSize} | Pages: ${selectedPages} | Finish: ${selectedFinish}`;
    const productToAdd = {
      id: albumProduct.id,
      name: albumProduct.name,
      unitPrice: totalPrice / quantity, // Single unit price
      quantity: quantity,
      variantString: variantString,
      img: albumProduct.img,
      boxIncluded: true
    };
    
    addToCart(productToAdd);
    navigate('/checkout'); // Or to /shop or cart view depending on preference
  };

  return (
    <PageWrapper className="bg-black text-white min-h-screen">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract/Cinematic Background representing an open album */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale-[30%]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
          >
            YOUR STORY, <br/><span className="text-secondary italic">BOUND FOREVER.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Your photographs shouldn't just live in a gallery. 
            They deserve to be held, opened, and remembered.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button 
              onClick={() => document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth' })}
              className="border border-white/20 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all"
            >
              Explore Your Album
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE ALBUM EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-8"
          >
            <BookOpen className="text-secondary mb-6" size={32} />
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">The Cover</h3>
            <h4 className="text-2xl font-serif mb-4">Premium Hardbound</h4>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Built to preserve your memories for years with elegant craftsmanship.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border-t border-white/10 pt-8"
          >
            <Layers className="text-secondary mb-6" size={32} />
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">The Pages</h3>
            <h4 className="text-2xl font-serif mb-4">Up to 50 Pages</h4>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Choose exactly how much of your story you want to preserve.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-t border-white/10 pt-8"
          >
            <Sparkles className="text-secondary mb-6" size={32} />
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">The Finish</h3>
            <h4 className="text-2xl font-serif mb-4">Matte or Glossy</h4>
            <p className="text-gray-400 font-light text-sm leading-relaxed">Choose the visual and tactile finish that matches your style.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border-t border-white/10 pt-8"
          >
            <Box className="text-secondary mb-6" size={32} />
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">The Box</h3>
            <h4 className="text-2xl font-serif mb-4">Premium Presentation</h4>
            <p className="text-gray-400 font-light text-sm leading-relaxed">A beautiful and protective home for your album. Included standard.</p>
          </motion.div>

        </div>
      </section>

      {/* SECTION 8: ALBUM + BOX REVEAL */}
      <section className="bg-white/5 py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">The Complete Memory Collection</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-16">Album + Premium Presentation Box</h3>
          
          <div className="relative max-w-5xl mx-auto aspect-video rounded-sm overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-left">
              <p className="text-2xl font-serif">Designed to be opened today,<br/>and treasured for years.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BUILDER SECTION */}
      <section id="builder-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Configurator */}
          <div className="lg:w-1/2 space-y-16">
            <div>
              <h2 className="text-4xl font-serif mb-4">Build Your Memory Collection</h2>
              <p className="text-gray-400 font-light">Choose the format, pages, and finish that feel right for your story.</p>
            </div>

            {/* Step 1: Size */}
            <div>
              <div className="flex items-center mb-6">
                <span className="text-secondary font-serif text-2xl mr-4">01</span>
                <h3 className="text-sm font-bold uppercase tracking-widest">Choose Your Album Size</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {sizeOptions.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-sm tracking-wider border transition-all ${
                      selectedSize === size 
                        ? 'border-secondary bg-secondary/10 text-secondary' 
                        : 'border-white/20 text-gray-400 hover:border-white/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pages */}
            <div>
              <div className="flex items-center mb-6">
                <span className="text-secondary font-serif text-2xl mr-4">02</span>
                <h3 className="text-sm font-bold uppercase tracking-widest">Choose Your Page Count</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {pageOptions.map(pages => (
                  <button
                    key={pages}
                    onClick={() => setSelectedPages(pages)}
                    className={`py-4 text-sm tracking-wider border transition-all ${
                      selectedPages === pages 
                        ? 'border-secondary bg-secondary/10 text-secondary' 
                        : 'border-white/20 text-gray-400 hover:border-white/50'
                    }`}
                  >
                    {pages}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Finish */}
            <div>
              <div className="flex items-center mb-6">
                <span className="text-secondary font-serif text-2xl mr-4">03</span>
                <h3 className="text-sm font-bold uppercase tracking-widest">Choose Your Finish</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {finishOptions.map(finish => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`py-4 text-sm tracking-wider border transition-all ${
                      selectedFinish === finish 
                        ? 'border-secondary bg-secondary/10 text-secondary' 
                        : 'border-white/20 text-gray-400 hover:border-white/50'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Box */}
            <div>
              <div className="flex items-center mb-6">
                <span className="text-secondary font-serif text-2xl mr-4">04</span>
                <h3 className="text-sm font-bold uppercase tracking-widest">Presentation Box</h3>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 flex items-center">
                <Check className="text-secondary mr-4" size={24} />
                <div>
                  <h4 className="text-lg font-serif">Premium Presentation Box Included</h4>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Standard Configuration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Live Preview & Summary */}
          <div className="lg:w-1/2">
            <div className="sticky top-32 space-y-8">
              
              {/* Visual Preview */}
              <div className="bg-white/5 border border-white/10 aspect-[4/3] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                {/* Abstract Book Shape */}
                <div className="w-64 h-48 bg-black border border-white/20 shadow-2xl relative flex items-center justify-center before:content-[''] before:absolute before:left-1/2 before:w-[1px] before:h-full before:bg-white/10 before:-translate-x-1/2 z-10">
                  <span className="font-serif text-xl opacity-30">Your Story</span>
                </div>
                
                {/* Details Overlay */}
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                  <p className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-2">Live Preview Configuration</p>
                  <p className="text-lg font-serif text-white">{selectedSize} · {selectedPages} · {selectedFinish}</p>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-white/5 border border-white/10 p-8">
                <h3 className="text-xl font-serif border-b border-white/10 pb-4 mb-6">Your Memory Collection</h3>
                
                <ul className="space-y-4 mb-8 text-sm font-light text-gray-300">
                  <li className="flex justify-between"><span>Album Size</span> <span className="text-white font-medium">{selectedSize}</span></li>
                  <li className="flex justify-between"><span>Pages</span> <span className="text-white font-medium">{selectedPages}</span></li>
                  <li className="flex justify-between"><span>Finish</span> <span className="text-white font-medium">{selectedFinish}</span></li>
                  <li className="flex justify-between"><span>Presentation Box</span> <span className="text-secondary font-medium">Included</span></li>
                </ul>

                <div className="flex items-center justify-between border-t border-white/10 pt-6 mb-8">
                  <span className="text-sm uppercase tracking-widest">Total</span>
                  <span className="text-3xl font-serif">₹{totalPrice.toLocaleString()}</span>
                </div>

                {/* Quantity & CTA */}
                <div className="flex gap-4">
                  <div className="flex items-center border border-white/20">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-4 hover:bg-white/10 transition-colors"><Minus size={16} /></button>
                    <span className="w-12 text-center text-sm">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-4 hover:bg-white/10 transition-colors"><Plus size={16} /></button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-grow bg-secondary text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center justify-center"
                  >
                    Create My Album <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: FROM YOUR SCREEN TO YOUR HANDS */}
      <section className="bg-white text-black py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif">FROM YOUR SCREEN <br/><span className="text-primary/40">TO YOUR HANDS.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { num: '01', title: 'YOUR PHOTOS', desc: 'You share the photographs that matter most.' },
              { num: '02', title: 'YOUR SELECTION', desc: 'Choose the moments you want to preserve.' },
              { num: '03', title: 'OUR DESIGN', desc: 'We carefully arrange your photographs into a beautiful story.' },
              { num: '04', title: 'PROFESSIONAL PRINTING', desc: 'Your memories are printed with premium quality.' },
              { num: '05', title: 'ALBUM + BOX', desc: 'Your finished memory collection is prepared and presented beautifully.' },
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <span className="text-6xl font-serif text-gray-200 block mb-6 transition-colors group-hover:text-secondary">{step.num}</span>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{step.desc}</p>
                {/* Connector Line (hidden on mobile) */}
                {idx !== 4 && <div className="hidden md:block absolute top-10 left-16 w-[calc(100%-2rem)] h-px bg-gray-200"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY A PRINTED ALBUM? */}
      <section className="py-32 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/5 blur-[120px] pointer-events-none w-1/2 h-1/2 left-1/4 top-1/4 rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 leading-relaxed">SOME MEMORIES DESERVE <br/>MORE THAN A SCREEN.</h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto italic">
            "Phones change. Hard drives fail. Social feeds disappear. 
            <br/><br/>
            But a photograph you can hold, open, and revisit years later becomes part of your family story."
          </p>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">YOUR MEMORIES, MADE PHYSICAL.</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Turn the photographs sitting in your gallery into something you can hold, open and remember.
          </p>
          <button 
            onClick={() => document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth' })}
            className="bg-secondary text-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all rounded-sm inline-flex items-center"
          >
            Create My Album <ArrowRight size={18} className="ml-3" />
          </button>
        </div>
      </section>

    </PageWrapper>
  );
};

export default Albums;