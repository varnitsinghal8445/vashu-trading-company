import { Phone, MessageCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const FamilyMemberCard = ({ name, role, description, image, imagePosition = "object-center", phoneDisplay, phoneRaw, email, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col h-full text-center"
    >
      <div className="pt-10 pb-4">
        <div className="relative overflow-hidden w-48 h-48 mx-auto rounded-full border-4 border-white shadow-lg bg-gray-50 group-hover:shadow-xl transition-shadow duration-500">
          <img 
            src={image} 
            alt={`Portrait of ${name}, ${role}`}
            loading="lazy"
            className={`w-full h-full object-cover ${imagePosition} scale-[1.15] transition-transform duration-700 group-hover:scale-[1.2]`}
          />
        </div>
      </div>
      
      <div className="p-8 pt-4 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif text-primary mb-1">{name}</h3>
        <p className="text-secondary tracking-widest uppercase text-xs font-medium mb-4">{role}</p>
        <p className="text-gray-500 font-light text-sm mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="border-t border-gray-100 pt-6 mt-auto">
          <div className="flex flex-col items-center gap-2 text-primary mb-6">
            <div className="flex items-center justify-center gap-3">
              <Phone size={18} className="text-gray-400" />
              <span className="font-medium tracking-wider">{phoneDisplay}</span>
            </div>
            {email && (
              <div className="flex items-center justify-center gap-3 mt-1">
                <Mail size={16} className="text-gray-400" />
                <a href={`mailto:${email}`} className="font-medium tracking-wider text-sm hover:text-secondary transition-colors">{email}</a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a 
              href={`tel:+${phoneRaw}`}
              aria-label={`Call ${name}`}
              className="flex items-center justify-center gap-2 border border-primary text-primary px-4 py-3 text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-colors"
            >
              <Phone size={16} /> Call Now
            </a>
            <a 
              href={`https://wa.me/${phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${name}`}
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 text-sm tracking-widest uppercase hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FamilyMemberCard;
