const ReviewsSection = () => {
  const reviews = [
    {
      name: "Priya & Rahul",
      event: "Wedding",
      text: "We hired Vasu Trading Company for our destination wedding in Udaipur. The team was highly professional and captured every raw emotion. The premium photobook exceeded all expectations. Truly a premium experience from start to finish.",
    },
    {
      name: "Neha Sharma",
      event: "Pre-Wedding",
      text: "The photographers were so professional and made us feel at ease. The digital gallery was delivered so fast!",
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#0d0d0d]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/testimonials-bg.jpg" 
          alt="Indian Wedding Scene" 
          className="w-full h-full object-cover object-center"
        />
        {/* Seamless blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-black/70 to-[#0d0d0d] z-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-secondary font-bold mb-3">Testimonials</h2>
          <h3 className="text-4xl font-serif text-white">Client Stories</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="bg-black/40 backdrop-blur-md p-10 border border-white/10 relative shadow-2xl transition-transform hover:-translate-y-1 duration-300">
              <span className="text-6xl text-secondary/30 absolute top-4 left-6 font-serif">"</span>
              <p className="text-gray-200 font-light italic mb-8 relative z-10 leading-relaxed text-lg">{review.text}</p>
              <div>
                <p className="text-white font-serif text-lg tracking-wide">{review.name}</p>
                <p className="text-secondary text-xs uppercase tracking-widest mt-1">{review.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
