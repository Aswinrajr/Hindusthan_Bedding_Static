import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const reviews = [
    {
      name: "Priya Sharma",
      role: "Homeowner",
      review:
        "I ordered a custom-size silk cotton mattress for my antique bed. It fits perfectly and serves the best comfort. The team was very patient with my measurements.",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Interior Designer",
      review:
        "Hindusthan Bedding is my go-to for client projects. Their teak finishing is authentic and the delivery is always on time. Highly recommended for custom work.",
      rating: 5,
    },
    {
      name: "Anita Desai",
      role: "Bangalore Resident",
      review:
        "Finally found a place that makes real cotton pillows! No more neck pain. The quality reminds me of my grandmother's home.",
      rating: 5,
    },
    {
      name: "Suresh Menon",
      role: "Hotel Owner",
      review:
        "We outfitted our boutique hotel with their beds. Guests love them. Durable and very elegant looking.",
      rating: 4,
    },
    {
      name: "Meera K",
      role: "Architect",
      review:
        "The craftsmanship is visible in the details. I appreciate that they don't use cheap plywood. Solid wood all the way.",
      rating: 5,
    },
    {
      name: "John D'Souza",
      role: "Software Engineer",
      review:
        "Great service. I customized a sofa for my small apartment, and they optimized the design to save space.",
      rating: 5,
    },
  ];

  return (
    <div className="font-sans text-gray-800 bg-white">
      <Navbar />

      <div className="pt-32 pb-16 bg-cream text-center px-6">
        <span className="text-secondary font-bold tracking-widest uppercase text-sm">
          Testimonials
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mt-2">
          What Our Clients Say
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          We take pride in every piece we make. Here is what our happy families
          have to say about their experience.
        </p>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative"
            >
              <Quote
                className="absolute top-6 right-6 text-secondary/20"
                size={40}
              />
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                "{r.review}"
              </p>
              <div>
                <h4 className="font-bold text-primary-dark text-lg">
                  {r.name}
                </h4>
                <span className="text-sm text-gray-400 uppercase tracking-wide">
                  {r.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Testimonials;
