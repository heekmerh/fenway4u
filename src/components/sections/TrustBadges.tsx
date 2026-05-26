"use client";

import { motion } from "framer-motion";
import { Globe2, FastForward, ShieldCheck, FileCheck, Clock, Users } from "lucide-react";

const badges = [
  { icon: Globe2, label: "Worldwide Shipping", desc: "190+ Countries" },
  { icon: FastForward, label: "Fast Delivery", desc: "Express Options" },
  { icon: ShieldCheck, label: "Secure Handling", desc: "100% Insured" },
  { icon: FileCheck, label: "Licensed Support", desc: "Visa & Immigration" },
  { icon: Clock, label: "24/7 Assistance", desc: "Global Support" },
  { icon: Users, label: "Happy Customers", desc: "10k+ Relocations" },
];

export function TrustBadges() {
  return (
    <section className="bg-white py-16 border-b border-gray-100 relative z-20 -mt-10 mx-4 md:mx-12 rounded-2xl shadow-xl shadow-black/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-[#0B132B]/5 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/10 transition-colors">
                <badge.icon className="w-8 h-8 text-[#0B132B] group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <h3 className="font-bold text-[#0B132B] mb-1">{badge.label}</h3>
              <p className="text-sm text-gray-500 font-medium">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
