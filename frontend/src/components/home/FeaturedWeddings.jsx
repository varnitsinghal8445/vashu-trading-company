const weddings = [
  {
    title: "Rahul & Priya",
    location: "Udaipur, Rajasthan",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Vikram & Anjali",
    location: "Jaipur, Rajasthan",
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Arjun & Neha",
    location: "Goa, India",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
  }
];

const FeaturedWeddings = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold mb-3">Real Stories</h2>
          <h3 className="text-4xl font-serif text-primary">Featured Weddings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {weddings.map((wedding, index) => (
            <div key={index} className="group relative overflow-hidden cursor-pointer aspect-[3/4]">
              <img 
                src={wedding.img} 
                alt={wedding.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-secondary text-xs uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{wedding.location}</p>
                <h4 className="text-2xl font-serif text-white">{wedding.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWeddings;
