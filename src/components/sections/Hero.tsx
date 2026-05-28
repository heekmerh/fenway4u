"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageSearch, PlaneTakeoff } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#050505]">
      {/* Background Image & Dual Dark Gradient Masks */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="International Logistics"
          fill
          className="object-cover opacity-35 mix-blend-luminosity scale-105 pointer-events-none"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-6 md:px-12 max-w-7xl h-full flex items-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[760px] flex flex-col items-start space-y-6 md:space-y-8"
        >
          {/* Subtitle tag */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.2em] uppercase">The Bridge Between Continents</span>
          </motion.div>

          {/* Premium Clamp Headline */}
          <h1 className="text-[clamp(2.2rem,7.5vw,3.8rem)] md:text-[clamp(3.8rem,7vw,5.2rem)] font-black text-white leading-[1.0] tracking-tighter max-w-[700px]">
            Connecting Families. <br className="hidden sm:inline" />
            Enabling <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-300 to-amber-500 drop-shadow-[0_2px_10px_rgba(212,175,55,0.15)]">Opportunities.</span>
          </h1>
          
          {/* Supporting Paragraph with optimized size and width */}
          <p className="text-sm md:text-base text-white/70 max-w-[620px] leading-relaxed font-light backdrop-blur-[0.5px] bg-[#050505]/10 p-1 rounded-lg">
            We are not just a logistics or relocation agency. FENWAY4U is a global connection platform, a diaspora lifestyle brand, and your bridge between families, cultures, and dreams. Move toward better opportunities with complete comfort and trust.
          </p>

          {/* Call to actions with clear spacing */}
          <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto pt-2">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] group uppercase text-xs tracking-wider cursor-pointer w-full sm:w-auto"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <Link 
              href="#quote" 
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 text-white font-extrabold rounded-xl hover:bg-white/10 transition-all border border-white/10 uppercase text-xs tracking-wider w-full sm:w-auto text-center"
            >
              <PlaneTakeoff className="w-4 h-4 text-[#D4AF37]" />
              Estimate Route Costs
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Repositioned & elegant scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-20 select-none opacity-45 hover:opacity-80 transition-opacity"
      >
        <span className="text-white/40 text-[9px] tracking-[0.25em] uppercase font-bold">Scroll Explore</span>
        <div className="w-[1px] h-9 bg-white/15 relative overflow-hidden rounded-full">
          <motion.div 
            animate={{ y: [0, 36] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-full h-1/3 bg-[#D4AF37] absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
