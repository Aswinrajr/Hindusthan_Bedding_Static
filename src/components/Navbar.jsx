import React, { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Our Work", path: "/our-work" },
    { name: "Packages", path: "/combinations" },
    { name: "Reviews", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  const isHome = location.pathname === "/";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || !isHome ? "bg-white shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Hindusthan Bedding"
            className="h-10 w-auto object-contain"
          />
          <div className="text-2xl font-serif font-bold">
            <span className="text-primary-dark transition-colors">
              Hindusthan
            </span>
            <span className="text-secondary">Bedding</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium tracking-wide hover:text-secondary transition-colors relative group ${
                scrolled || !isHome ? "text-gray-800" : "text-primary-dark"
              }`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <a
            href="https://wa.me/919074140114?text=Need%20an%20enquiry%20on%20furnitures"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondary-dark text-white px-5 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-md flex items-center gap-2 font-medium"
          >
            <MessageCircle size={18} />
            <span>Chat Now</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-primary-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-lg font-medium text-gray-800 hover:text-secondary py-2 border-b border-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://wa.me/919074140114?text=Need%20an%20enquiry%20on%20furnitures"
                target="_blank"
                className="bg-green-500 text-white py-3 rounded-lg flex justify-center items-center gap-2 font-bold shadow-md"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
