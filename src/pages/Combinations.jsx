import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { BedDouble, Sofa, PackageCheck } from "lucide-react";
import Loader from "../components/Loader";

const Combinations = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const comboPackages = [
    {
      title: "The Master Bedroom Set",
      description:
        "Complete luxury with a King Size Teak Bed, Orthopedic Mattress, and 2 Memory Foam Pillows.",
      items: ["King Size Bed", "Orthopedic Mattress", "2x Pillows"],
      price: "₹35,000",
      originalPrice: "₹45,000",
      icon: <BedDouble size={48} className="text-secondary" />,
      color: "bg-blue-50",
    },
    {
      title: "Living Room Comfort",
      description:
        "Upgrade your hall with a 3-Seater Sofa and a matching Center Table.",
      items: ["3-Seater Sofa", "Teak Center Table", "2x Cushions"],
      price: "₹28,000",
      originalPrice: "₹38,000",
      icon: <Sofa size={48} className="text-secondary" />,
      color: "bg-orange-50",
    },
    {
      title: "Guest Room Essentials",
      description: "Compact Queen Bed set perfect for guest rooms.",
      items: ["Queen Size Bed", "Foam Mattress", "2x Pillows"],
      price: "₹22,000",
      originalPrice: "₹30,000",
      icon: <PackageCheck size={48} className="text-secondary" />,
      color: "bg-green-50",
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-4">
              Curated Combinations
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked sets designed to perfectly match your space and needs.
              Save more when you buy together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {comboPackages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all ${pkg.color}`}
              >
                <div className="mb-6 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-sm mx-auto">
                  {pkg.icon}
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-2 font-serif">
                  {pkg.title}
                </h3>
                <p className="text-center text-gray-600 text-sm mb-6">
                  {pkg.description}
                </p>

                <div className="bg-white rounded-xl p-4 mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Includes
                  </p>
                  <ul className="space-y-2">
                    {pkg.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center border-t border-gray-200 pt-6">
                  <p className="text-gray-400 line-through text-sm">
                    {pkg.originalPrice}
                  </p>
                  <p className="text-3xl font-bold text-primary-dark">
                    {pkg.price}
                  </p>
                  <a
                    href={`https://wa.me/919074140114?text=Hi, I am interested in the ${pkg.title} package offer.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full py-3 bg-secondary text-white rounded-lg font-bold hover:bg-secondary-dark transition-colors"
                  >
                    Enquire Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Combinations;
