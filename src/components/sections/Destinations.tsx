"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const destinations = [
  {
    country: "Canada",
    gradient: "from-red-900/80 to-[#0B132B]",
    stats: "Top choice for skilled workers & students",
    benefits: ["Express Entry", "World-class Education", "High Quality of Life"],
  },
  {
    country: "United Kingdom",
    gradient: "from-blue-900/80 to-[#0B132B]",
    stats: "Hub for global finance & education",
    benefits: ["Tier 2 Work Visas", "Top Universities", "Rich Cultural Heritage"],
  },
  {
    country: "United States",
    gradient: "from-indigo-900/80 to-[#0B132B]",
    stats: "Land of endless opportunities",
    benefits: ["H1B Visas", "Tech & Innovation", "Diverse Economy"],
  },
];

export function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0B132B] mb-6"
          >
            Top <span className="text-[#D4AF37]">Destinations</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            Discover the most sought-after countries for relocation, work, and study.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden shadow-2xl h-[450px] cursor-pointer"
            >
              {/* Background Placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} transition-transform duration-700 group-hover:scale-110`} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/50 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-white mb-2">{dest.country}</h3>
                <p className="text-[#D4AF37] font-medium mb-6">{dest.stats}</p>
                
                <ul className="space-y-3 mb-8 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {dest.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-white/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mr-2 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="#" 
                  className="w-full text-center py-3 rounded-lg glass text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Explore {dest.country}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
