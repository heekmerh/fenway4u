"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0B132B]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark border border-[#D4AF37]/20 rounded-3xl p-12 md:p-20 shadow-2xl shadow-black/50"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to start your <br className="hidden md:block" />
            <span className="text-[#D4AF37]">global journey?</span>
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Contact our experts today for a free consultation. We'll handle the logistics so you can focus on the destination.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="#" 
              className="flex items-center justify-center gap-2 px-10 py-5 bg-[#D4AF37] hover:bg-[#F3C332] text-[#0B132B] font-bold text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] w-full sm:w-auto group"
            >
              Start Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="#" 
              className="flex items-center justify-center gap-2 px-10 py-5 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] w-full sm:w-auto"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
