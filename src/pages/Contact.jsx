import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct WhatsApp Message
    const text = `Hi, I am ${formData.name}. Phone: ${formData.phone}. Message: ${formData.message}`;
    window.open(
      `https://wa.me/919074140114?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      <Navbar />

      <div className="pt-32 pb-12 bg-cream text-center px-6">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mt-2">
          Get in Touch
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Have a custom requirement? Or just want to say hi? We'd love to hear
          from you.
        </p>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-primary-dark mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-0 outline-none transition-colors"
                  placeholder="John Doe"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-0 outline-none transition-colors"
                  placeholder="+91 98765 43210"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Requirement
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-secondary focus:ring-0 outline-none transition-colors"
                  placeholder="I need a custom size mattress..."
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-all"
              >
                <Send size={18} /> Send Message via WhatsApp
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Phone</p>
                    <p className="font-bold cursor-pointer hover:text-secondary">
                      +91 90741 40114
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Email</p>
                    <p className="font-bold">sales@hindusthanbedding.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Address</p>
                    <p className="font-bold leading-relaxed">
                      53, 9th Cross Rd, Opp. Balaji Medical,
                      <br />
                      Shakambari Nagar, 1st Phase,
                      <br />
                      J. P. Nagar, Bengaluru, Karnataka 560078
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.756786523178!2d77.57507837482025!3d12.910378987399436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15086d7088d1%3A0xc3f34585c544078e!2s9th%20Cross%20Rd%2C%20Shakambari%20Nagar%2C%201st%20Phase%2C%20J.%20P.%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560078!5e0!3m2!1sen!2sin!4v1709230000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
