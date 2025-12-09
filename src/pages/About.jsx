import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Heart, Users, Clock, Award } from "lucide-react";

const About = () => {
  return (
    <div className="font-sans text-gray-800 bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-cream text-center px-6">
        <span className="text-secondary font-bold tracking-widest uppercase text-sm">
          Since 1995
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mt-2">
          Crafting Comfort with Tradition
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          We are a family-run business dedicated to bringing you the finest
          handmade mattresses and custom furniture.
        </p>
      </div>

      {/* Our Story */}
      <section className="py-20 px-6 container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src="/images/artisan.png"
              alt="Artisan working"
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-primary-dark mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              It started as a small workshop with a single goal: to make
              mattresses that last a lifetime. In a world of mass-produced foam,
              we stuck to our roots—pure, organic silk cotton and solid teak
              wood.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, Hindusthan Bedding is known not just for sleeping solutions
              but for transforming entire homes with custom furniture that fits
              your space perfectly. We don't have a factory line; we have
              artisans who pour their heart into every stitch and every cut.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Handmade with Love",
                desc: "Every piece is crafted by hand, ensuring unique quality.",
              },
              {
                icon: Users,
                title: "Customer Focused",
                desc: "We customize everything to your exact needs and measurements.",
              },
              {
                icon: Clock,
                title: "Timeless Durability",
                desc: "Built to last for generations, using only the best materials.",
              },
              {
                icon: Award,
                title: "Quality Guarantee",
                desc: "We stand by our work. If it's not right, we fix it.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100"
              >
                <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center text-secondary mx-auto mb-4">
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-primary-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
