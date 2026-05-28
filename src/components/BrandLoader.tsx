"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Compass, Globe } from "lucide-react";

export function BrandLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  const statusTexts = [
    "Initializing Diaspora Gateway...",
    "Securing Intercontinental Routes...",
    "Bridging Communities & Families...",
    "Sourcing Cultural Comforts...",
    "Global Connection System Ready."
  ];

  useEffect(() => {
    // Check if the loader has already run in this browser session
    const hasLoaded = sessionStorage.getItem("fenway4u_loader_played");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Block page scrolling while loading
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 120);

    // Status text cycle
    const statusInterval = setInterval(() => {
      setStatusIdx((prev) => (prev < statusTexts.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("fenway4u_loader_played", "true");
        document.body.style.overflow = "unset";
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center text-white px-6 overflow-hidden select-none"
        >
          {/* Ambient Glowing Blobs */}
          <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full" />

          <div className="relative z-10 w-full max-w-lg flex flex-col items-center space-y-12">
            
            {/* Spinning Golden Globe & Flight Arcs */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              
              {/* External Flight Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-[#D4AF37]/10 border-t-[#D4AF37]/40 border-r-[#D4AF37]/40 rounded-full"
              />

              {/* Inner Counter-rotating Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute w-28 h-28 border border-white/5 border-b-blue-500/40 border-l-blue-500/40 rounded-full"
              />

              {/* Flying Airplane Vector */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-start justify-center"
              >
                <div className="transform -rotate-45 -translate-y-2">
                  <Plane className="w-5 h-5 text-[#D4AF37] drop-shadow-[0_0_10px_#D4AF37]" />
                </div>
              </motion.div>

              {/* Core Icon */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 bg-[#0c0c0c] border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.15)]"
              >
                <Compass className="w-8 h-8 text-[#D4AF37]" />
              </motion.div>
            </div>

            {/* Platform Branding & Status */}
            <div className="text-center space-y-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-2xl font-black tracking-[0.2em] text-white">FENWAY4U</span>
              </motion.div>
              <p className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold">Global Connectivity Network</p>

              {/* Status bar */}
              <div className="w-48 h-[2px] bg-white/5 mx-auto rounded-full overflow-hidden relative mt-6">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 via-[#D4AF37] to-amber-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Percentage & Dynamic Text */}
              <div className="space-y-1.5 pt-2">
                <p className="font-mono text-xl font-bold text-[#D4AF37]">{progress}%</p>
                <p className="text-white/50 text-[10px] tracking-wide font-light h-4">
                  {statusTexts[statusIdx]}
                </p>
              </div>
            </div>

          </div>

          {/* Luxury Footer Accents */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[9px] tracking-widest text-white/20 uppercase font-black">
            <span>Canada</span>
            <div className="w-1.5 h-1.5 bg-[#D4AF37]/30 rounded-full" />
            <span>UK</span>
            <div className="w-1.5 h-1.5 bg-[#D4AF37]/30 rounded-full" />
            <span>US</span>
            <div className="w-1.5 h-1.5 bg-[#D4AF37]/30 rounded-full" />
            <span>Africa</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
