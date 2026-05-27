"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe, Compass, Landmark } from "lucide-react";
import Link from "next/link";

const destinations = [
  {
    country: "Canada",
    slug: "canada",
    gradient: "from-red-950/80 to-[#0A0F1C]",
    borderGlow: "group-hover:border-red-500/50 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]",
    stats: "Top choice for skilled workers & students",
    benefits: ["Express Entry & PNP", "World-class Education", "High Quality of Life"],
  },
  {
    country: "United Kingdom",
    slug: "united-kingdom",
    gradient: "from-blue-950/80 to-[#0A0F1C]",
    borderGlow: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    stats: "Hub for global finance & education",
    benefits: ["Skilled Worker Visas", "Top Universities", "Rich Cultural Heritage"],
  },
  {
    country: "United States",
    slug: "united-states",
    gradient: "from-indigo-950/80 to-[#0A0F1C]",
    borderGlow: "group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
    stats: "Land of endless opportunities",
    benefits: ["STEM OPT & H1B", "Tech & Innovation", "Diverse Economy"],
  },
];

export function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Background blobs for luxury ambient depth */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] -z-10 rounded-full" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Global Opportunities</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Immersive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Destinations</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base md:text-lg font-light leading-relaxed"
          >
            Explore legal pathways, lifestyle guidelines, job markets, and local African communities within our complete global ecosystem hubs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative rounded-3xl overflow-hidden border border-white/5 bg-[#0c0c0c] shadow-2xl h-[480px] transition-all duration-500 flex flex-col justify-end p-8 ${dest.borderGlow}`}
            >
              {/* Backing Ambient Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />
              
              {/* Overlay shading to enforce text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10" />
              
              <div className="relative z-20 space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-white/40 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#D4AF37]" /> Relocation Guide
                  </span>
                  <h3 className="text-3xl font-black text-white mt-1 group-hover:text-[#D4AF37] transition-colors">{dest.country}</h3>
                </div>
                
                <p className="text-white/60 text-xs font-light leading-relaxed">{dest.stats}</p>
                
                <ul className="space-y-2.5 pt-2 border-t border-white/5">
                  {dest.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-white/80 text-xs font-light">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 mr-2.5 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4">
                  <Link 
                    href={`/destinations/${dest.slug}`}
                    className="w-full py-3.5 rounded-xl bg-white/5 group-hover:bg-[#D4AF37] text-white group-hover:text-black font-extrabold text-xs uppercase tracking-wider text-center transition-all duration-300 border border-white/10 group-hover:border-transparent flex items-center justify-center gap-1.5"
                  >
                    Explore {dest.country} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
