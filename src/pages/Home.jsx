import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChevronRight,
  Scissors,
  Star,
  Ruler,
  CheckCircle,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_BASE_URL from "../config";

// --- Hero Component ---
const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-cream"
    >
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-primary-light/10 rounded-l-[100px] z-0" />
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-secondary/5 rounded-r-[100px] z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-left"
          >
            <span className="inline-block py-1 px-4 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-bold tracking-wider mb-6">
              HANDMADE IN INDIA
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-dark mb-6 leading-tight">
              Custom Furniture <br />
              <span className="text-secondary relative">
                Made for You
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-secondary/30"
                  viewBox="0 0 200 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00025 6.99997C2.00025 6.99997 129.5 0.5 199.5 3"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></path>
                </svg>
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              We don't just sell furniture; we craft it. From Pure Silk Cotton
              Mattresses to custom-sized Sofas, get everything tailored to your
              home's needs.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-lg text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
              >
                Explore Collection <ChevronRight size={20} />
              </a>
              <a
                href="https://wa.me/919074140114?text=Need%20an%20enquiry%20on%20furnitures"
                target="_blank"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3.5 rounded-lg text-lg font-bold transition-all"
              >
                Custom Order
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm font-semibold text-gray-500">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded-full shadow-sm text-secondary">
                  <Scissors size={18} />
                </div>
                <span>Fully Customizable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded-full shadow-sm text-secondary">
                  <Truck size={18} />
                </div>
                <span>Direct Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop"
                alt="Handmade Sofa"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 border border-gray-100"
            >
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">100% Quality</p>
                <p className="text-xs text-gray-500">Verified Material</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Features Component ---
const Features = () => {
  const features = [
    {
      title: "Custom Sizing",
      desc: "Your room, your size. We build to fit exactly.",
      icon: Ruler,
    },
    {
      title: "Pure Silk Cotton",
      desc: "Chemical-free, organic cotton for cool sleep.",
      icon: Star,
    },
    {
      title: "Handcrafted",
      desc: "Made by skilled artisans, not machines.",
      icon: Scissors,
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary-dark mb-4">
            Why Choose Hindusthan Bedding?
          </h2>
          <p className="text-gray-600">
            We bring back the traditional comfort with modern durability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-cream p-8 rounded-2xl hover:shadow-lg transition-all border border-transparent hover:border-secondary/20 text-center"
            >
              <div className="w-16 h-16 bg-white shadow-md text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <f.icon size={30} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary-dark">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Products Component ---
const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reliable Static Data for "Small Company" feel
  const staticProducts = [
    {
      _id: 1,
      name: "Custom Teak Sofa",
      category: "Furniture",
      price: 28999,
      images: [
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2070&auto=format&fit=crop",
      ],
    },
    {
      _id: 2,
      name: "Pure Silk Cotton Bed",
      category: "Mattress",
      price: 8500,
      images: [
        "https://images.unsplash.com/photo-1629082598379-99c9616ae39b?q=80&w=2070&auto=format&fit=crop",
      ],
    },
    {
      _id: 3,
      name: "Hand-Stitched Pillow",
      category: "Accessories",
      price: 650,
      images: [
        "https://images.unsplash.com/photo-1584132905271-512c958d674a?q=80&w=2070&auto=format&fit=crop",
      ],
    },
    {
      _id: 4,
      name: "L-Shaped Sectional",
      category: "Furniture",
      price: 45000,
      images: [
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop",
      ],
    },
    {
      _id: 5,
      name: "Orthopedic Mattress",
      category: "Mattress",
      price: 12000,
      images: [
        "https://images.unsplash.com/photo-1505691938895-1758d7bab589?q=80&w=2070&auto=format&fit=crop",
      ],
    },
    {
      _id: 6,
      name: "Wooden Bed Frame",
      category: "Furniture",
      price: 18500,
      images: [
        "https://images.unsplash.com/photo-1505693416388-50efe58338d4?q=80&w=2070&auto=format&fit=crop",
      ],
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        if (res.data.length > 0) {
          // Randomize and take top 6
          const shuffled = res.data.sort(() => 0.5 - Math.random());
          setProducts(shuffled.slice(0, 6));
        } else {
          setProducts(staticProducts);
        }
      } catch (error) {
        setProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-secondary font-bold tracking-widest uppercase text-xs">
              Our Work
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-dark mt-2">
              Latest Creations
            </h2>
          </div>
          <a
            href="https://wa.me/919074140114?text=Need%20an%20enquiry%20on%20furnitures"
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors mt-4 md:mt-0"
          >
            Get Your Custom Quote <ChevronRight size={18} />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img
                    src={
                      p.images && p.images.length > 0
                        ? p.images[0].startsWith("http")
                          ? p.images[0]
                          : `${API_BASE_URL}${p.images[0]}`
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold text-primary-dark uppercase shadow-sm">
                    {p.category}
                  </div>
                  {p.originalPrice > p.price && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm animate-pulse">
                      {Math.round(
                        ((p.originalPrice - p.price) / p.originalPrice) * 100
                      )}
                      % OFF
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">
                    {p.name}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-500 text-sm">Made to Order</p>
                    <div className="text-right">
                      {p.originalPrice && p.originalPrice > p.price && (
                        <span className="block text-sm text-gray-400 line-through">
                          ₹{p.originalPrice}
                        </span>
                      )}
                      <p className="text-xl font-bold text-secondary">
                        ₹{p.price}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/919074140114?text=Need%20an%20enquiry%20on%20furnitures%20-%20${p.name}`}
                    target="_blank"
                    className="w-full block text-center bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <a
            href="https://wa.me/919074140114?text=Need%20an%20enquiry%20on%20furnitures"
            className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-bold inline-flex items-center gap-2"
          >
            View More on WhatsApp <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <ProductSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
