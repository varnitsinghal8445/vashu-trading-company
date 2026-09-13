import { Link } from 'react-router-dom';

const photographers = [
  {
    name: "Amit Sharma",
    style: "Candid & Fine Art",
    exp: "12 Years",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    name: "Rohan Kapoor",
    style: "Traditional & Portrait",
    exp: "8 Years",
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop"
  },
  {
    name: "Sneha Desai",
    style: "Pre-Wedding & Editorial",
    exp: "5 Years",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop"
  }
];

const PhotographerShowcase = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0a0a0a]" id="team">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/family-bg.jpg" 
          alt="Team Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold mb-3 drop-shadow-sm">Our Masters</h2>
          <h3 className="text-4xl font-serif text-white drop-shadow-md">Meet Our Photographers</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {photographers.map((p, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="overflow-hidden rounded-full aspect-square w-48 h-48 mx-auto mb-6 bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
              </div>
              <h4 className="text-xl font-serif text-white mb-1 group-hover:text-secondary transition-colors drop-shadow-md">{p.name}</h4>
              <p className="text-secondary text-sm font-medium mb-1 drop-shadow-md">{p.style}</p>
              <p className="text-gray-400 font-light text-sm">{p.exp} Experience</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographerShowcase;
