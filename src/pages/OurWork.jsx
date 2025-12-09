import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "../config";

const OurWork = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const staticItems = [
        {
          id: 1,
          title: "Custom Bedroom Set",
          category: "Furniture",
          img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2070&auto=format&fit=crop",
        },
        {
          id: 2,
          title: "Royal Silk Mattress",
          category: "Mattress",
          img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
        },
        {
          id: 3,
          title: "Hand-Carved Sofa",
          category: "Living Room",
          img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop",
        },
        {
          id: 4,
          title: "Orthopedic Pillows",
          category: "Accessories",
          img: "https://images.unsplash.com/photo-1584132905271-512c958d674a?q=80&w=2070&auto=format&fit=crop",
        },
        {
          id: 5,
          title: "Teak Dining Table",
          category: "Dining",
          img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1932&auto=format&fit=crop",
        },
        {
          id: 6,
          title: "Kids Bunk Bed",
          category: "Kids",
          img: "https://images.unsplash.com/photo-1505693416388-50efe58338d4?q=80&w=2070&auto=format&fit=crop",
        },
      ];

      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        if (res.data && res.data.length > 0) {
          // Map API products to match gallery structure
          const apiProducts = res.data.map((p, idx) => ({
            id: p._id || idx + 100,
            title: p.name,
            category: p.category,
            img:
              p.images && p.images.length > 0
                ? p.images[0].startsWith("http")
                  ? p.images[0]
                  : `${API_BASE_URL}${p.images[0]}`
                : "https://via.placeholder.com/400x300?text=No+Image",
          }));
          const combined = [...apiProducts, ...staticItems];
          // Remove duplicates if any (based on name maybe? or just show all)
          setGalleryItems(combined);
        } else {
          setGalleryItems(staticItems);
        }
      } catch (error) {
        setGalleryItems(staticItems);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white">
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-12 bg-cream text-center px-6">
        <span className="text-secondary font-bold tracking-widest uppercase text-sm">
          Portfolio
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mt-2">
          Our Recent Projects
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Take a look at some of the custom furniture and bedding solutions
          we've crafted for our happy customers.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-secondary text-sm font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white text-2xl font-serif font-bold">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary text-white py-16 text-center px-6">
        <h2 className="text-3xl font-serif font-bold mb-6">
          See something you like?
        </h2>
        <a
          href="https://wa.me/919074140114?text=Need%20an%20enquiry%20on%20furnitures"
          target="_blank"
          className="bg-white text-primary-dark hover:bg-secondary hover:text-white px-8 py-3 rounded-full font-bold text-lg transition-colors inline-block"
        >
          Get a Quote
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default OurWork;
