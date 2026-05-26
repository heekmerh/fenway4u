"use client";

import { motion } from "framer-motion";
import { Car, Smartphone, Monitor, Bike, Sofa, WashingMachine } from "lucide-react";

const categories = [
  { icon: Car, name: "Vehicles", desc: "Cars, motorcycles & boats" },
  { icon: Smartphone, name: "Phones & Tech", desc: "Laptops, phones & tablets" },
  { icon: Monitor, name: "TVs & Displays", desc: "Fragile monitors & TVs" },
  { icon: Bike, name: "Bicycles", desc: "Sports equipment" },
  { icon: Sofa, name: "Furniture", desc: "Home & office furniture" },
  { icon: WashingMachine, name: "Appliances", desc: "Heavy home appliances" },
];

export function ShippingCategories() {
  return (
    <section className="py-24 bg-[#0B132B] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              What Do You Need To <span className="text-[#D4AF37]">Ship?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/70 text-lg"
            >
              We handle items of all sizes with the utmost care. Specialized packaging and logistics for every category.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="glass p-6 rounded-2xl flex flex-col items-center text-center group cursor-pointer border border-white/10 hover:border-[#D4AF37]/50"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                <cat.icon className="w-8 h-8 text-white group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <h3 className="font-bold text-white mb-1">{cat.name}</h3>
              <p className="text-xs text-white/50">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
