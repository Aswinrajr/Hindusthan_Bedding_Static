import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-primary-dark text-white pt-20 pb-8 mt-12"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-16 border-b border-white/10 pb-12">
          {/* Brand Info */}
          <div className="col-span-1">
            <div className="text-2xl font-serif font-bold text-white mb-6">
              Hindusthan<span className="text-secondary">Bedding</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your local expert in handcrafted furniture and natural sleep
              solutions. We build what fits your home.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-6 text-secondary">Visit Us</h4>
            <div className="flex gap-3 text-gray-300 text-sm mb-4">
              <MapPin className="shrink-0 text-secondary" size={18} />
              <span>
                53, 9th Cross Rd, Opp. Balaji Medical,
                <br />
                Shakambari Nagar, 1st Phase,
                <br />
                J. P. Nagar, Bengaluru, Karnataka 560078
              </span>
            </div>
          </div>

          {/* Map Integration */}
          <div className="col-span-1 md:col-span-2 h-64 rounded-xl overflow-hidden shadow-lg border-2 border-white/10 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.756786523178!2d77.57507837482025!3d12.910378987399436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15086d7088d1%3A0xc3f34585c544078e!2s9th%20Cross%20Rd%2C%20Shakambari%20Nagar%2C%201st%20Phase%2C%20J.%20P.%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560078!5e0!3m2!1sen!2sin!4v1709230000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shop Location"
            ></iframe>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4 mb-4">
          <div className="flex gap-6">
            <div className="flex gap-2 items-center hover:text-white transition-colors">
              <Phone size={16} className="text-secondary" />
              <a href="tel:9074140114">+91 90741 40114</a>
            </div>
            <div className="flex gap-2 items-center hover:text-white transition-colors">
              <Mail size={16} className="text-secondary" />
              <span>sales@hindusthanbedding.com</span>
            </div>
          </div>
          <p>&copy; 2025 Hindusthan Bedding. Handcrafted with Love.</p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919074140114?text=Need%20an%20enquiry%20on%20furnitures"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group animate-bounce"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={32} fill="white" className="text-white" />
      </a>
    </footer>
  );
};

export default Footer;
