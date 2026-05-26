"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Truck, Home } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "1. Consultation", desc: "Speak with our experts to plan your move or shipment and get a tailored strategy." },
  { icon: FileText, title: "2. Documentation", desc: "We handle all visas, customs forms, and required paperwork seamlessly." },
  { icon: Truck, title: "3. Shipping & Processing", desc: "Your items are securely packaged and shipped via optimal global routes." },
  { icon: Home, title: "4. Delivery & Settlement", desc: "Arrive at your new destination with everything delivered right to your door." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0B132B] mb-6"
          >
            How It <span className="text-[#D4AF37]">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            A simple, transparent, and seamless 4-step process to get you where you need to be.
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white p-8 rounded-2xl shadow-xl shadow-black/5 flex flex-col items-center text-center z-10 border border-gray-100 hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="w-20 h-20 rounded-full bg-[#0B132B] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#0B132B]/20 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37] animate-ping opacity-20" />
                  <step.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B132B] mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
