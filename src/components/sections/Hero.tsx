"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageSearch, PlaneTakeoff } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="International Logistics"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#0B132B]/60 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-7xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-[#D4AF37]/35"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[#D4AF37] text-xs font-black tracking-widest uppercase">The Bridge Between Continents</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
            Connecting Families. <br />
            Enabling <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-100">Opportunities.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl font-light">
            We are not just a logistics or relocation agency. FENWAY4U is a global connection platform, a diaspora lifestyle brand, and your bridge between families, cultures, and dreams. Move toward better opportunities with comfort.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#D4AF37] hover:bg-[#F3C332] text-black font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] group uppercase text-xs tracking-wider cursor-pointer"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <Link 
              href="#quote" 
              className="flex items-center justify-center gap-2.5 px-8 py-4 glass text-white font-extrabold rounded-xl hover:bg-white/10 transition-all border border-white/20 uppercase text-xs tracking-wider"
            >
              <PlaneTakeoff className="w-4 h-4 text-[#D4AF37]" />
              Estimate Route Costs
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/50 text-sm tracking-widest uppercase">Scroll Explore</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-[#D4AF37] absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
