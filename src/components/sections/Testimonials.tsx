"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Relocated to UK",
    text: "INTMOVE made my move from Toronto to London completely stress-free. They handled everything from my visa to shipping my car.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    text: "I use their shop-for-me service for my electronics business. The speed and security of their air freight is unmatched. Highly recommended.",
    rating: 5,
  },
  {
    name: "Amina Yusuf",
    role: "International Student",
    text: "Getting my study visa and moving to Canada seemed impossible until I found them. The 24/7 support team is simply amazing.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0B132B] mb-6"
          >
            Trusted by <span className="text-[#D4AF37]">Thousands</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            Don't just take our word for it. Read what our clients have to say about their global journeys with us.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-3xl p-8 relative hover:shadow-xl transition-shadow border border-gray-100"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-[#D4AF37]/20" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              
              <p className="text-gray-700 italic mb-8 relative z-10 leading-relaxed">
                "{test.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0B132B] flex items-center justify-center text-white font-bold text-xl">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[#0B132B]">{test.name}</h4>
                  <p className="text-sm text-gray-500">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
