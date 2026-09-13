import { MessageCircle } from 'lucide-react';

const WhatsAppCTA = () => {
  return (
    <a 
      href="https://wa.me/919876543210" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 md:hidden flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppCTA;
