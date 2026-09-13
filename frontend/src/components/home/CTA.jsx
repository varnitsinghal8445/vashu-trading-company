import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Ready to Capture Your Story?</h2>
        <p className="text-gray-600 mb-10 font-light text-lg">Let our experienced team preserve your memories with the care they deserve.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/book-now" className="bg-primary text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-secondary transition-colors w-full sm:w-auto">
            Book Now
          </Link>
          <a href="#" className="border border-primary text-primary px-10 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-colors w-full sm:w-auto">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
