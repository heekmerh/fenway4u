"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, Compass, Clock, ShieldCheck, MapPin, Globe } from "lucide-react";

interface WorldClock {
  city: string;
  country: string;
  timezone: string;
  time: string;
  status: string;
}

export function GlobalMap() {
  const [clocks, setClocks] = useState<WorldClock[]>([
    { city: "Lagos", country: "Nigeria", timezone: "Africa/Lagos", time: "--:--:--", status: "Hub Active" },
    { city: "London", country: "United Kingdom", timezone: "Europe/London", time: "--:--:--", status: "Duty Open" },
    { city: "New York", country: "United States", timezone: "America/New_York", time: "--:--:--", status: "Office Open" },
    { city: "Toronto", country: "Canada", timezone: "America/Toronto", time: "--:--:--", status: "Border Open" }
  ]);

  // Live Shipment Counter metrics
  const [metrics, setMetrics] = useState({
    activeShipments: 1248,
    packagesDelivered: 42805,
    currentRelocations: 342,
    efficiencyRate: "99.2%"
  });

  useEffect(() => {
    // Clock tick timer
    const updateTime = () => {
      setClocks(prev =>
        prev.map(c => {
          try {
            const formatter = new Intl.DateTimeFormat("en-US", {
              timeZone: c.timezone,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true
            });
            return { ...c, time: formatter.format(new Date()) };
          } catch (e) {
            return c;
          }
        })
      );
    };

    updateTime();
    const clockTimer = setInterval(updateTime, 1000);

    // Dynamic metrics increment simulation
    const metricsTimer = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeShipments: prev.activeShipments + (Math.random() > 0.65 ? 1 : 0),
        packagesDelivered: prev.packagesDelivered + (Math.random() > 0.4 ? 1 : 0),
        currentRelocations: prev.currentRelocations + (Math.random() > 0.85 ? 1 : 0)
      }));
    }, 4000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(metricsTimer);
    };
  }, []);

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Visual Ambient Light Fields */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-16">
        
        {/* Storytelling Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
          >
            <Globe className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Interactive Logistics Map</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            Where We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Connect</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base font-light leading-relaxed"
          >
            We are not just moving boxes. We are bridging continents, connecting families, delivering comfort, and opening doors of global opportunities. Explore our active routes and live network nodes.
          </motion.p>
        </div>

        {/* Dynamic World Clocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {clocks.map((clock, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0c0c0c] border border-white/5 p-5 rounded-2xl flex items-center justify-between shadow-xl relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors"
            >
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-black text-white/40 tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" /> {clock.city}
                </p>
                <h4 className="text-lg font-mono font-bold text-white tracking-tight">{clock.time}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">{clock.status}</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-white/10 group-hover:text-[#D4AF37]/20 transition-colors shrink-0" />
            </motion.div>
          ))}
        </div>

        {/* Map Canvas & Metrics grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Immersive Animated SVG Map (Left 8 cols) */}
          <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col justify-center min-h-[480px] shadow-2xl">
            
            {/* Ambient map backgrounds */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

            {/* Glowing Map Connections Grid */}
            <svg 
              viewBox="0 0 800 400" 
              className="w-full h-auto relative z-10 select-none opacity-85"
            >
              <defs>
                {/* Neon Route Gradients */}
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                </linearGradient>
                
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Draw continental route curves */}
              {/* Lagos (400, 290) -> London (380, 100) */}
              <motion.path
                d="M 400 290 Q 350 190 380 100"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="2.5"
                strokeDasharray="6, 6"
                filter="url(#glow)"
                className="opacity-75"
              />

              {/* Lagos (400, 290) -> Toronto (200, 110) */}
              <motion.path
                d="M 400 290 Q 250 200 200 110"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="2.5"
                strokeDasharray="6, 6"
                filter="url(#glow)"
                className="opacity-75"
              />

              {/* Lagos (400, 290) -> New York (220, 130) */}
              <motion.path
                d="M 400 290 Q 280 220 220 130"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="2.5"
                strokeDasharray="6, 6"
                filter="url(#glow)"
                className="opacity-75"
              />

              {/* Nairobi (460, 280) -> London (380, 100) */}
              <motion.path
                d="M 460 280 Q 420 190 380 100"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="2"
                strokeDasharray="6, 6"
                className="opacity-50"
              />

              {/* Accra (380, 292) -> London (380, 100) */}
              <motion.path
                d="M 380 292 Q 340 190 380 100"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="2"
                strokeDasharray="6, 6"
                className="opacity-50"
              />

              {/* Dynamic Plane Sifting Paths */}
              {/* Lagos -> Toronto Plane */}
              <motion.g
                initial={{ offset: 0 }}
                animate={{ 
                  offset: [0, 1] 
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <circle r="4" fill="#D4AF37" filter="url(#glow)">
                  <animateMotion 
                    path="M 400 290 Q 250 200 200 110" 
                    dur="15s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </motion.g>

              {/* Lagos -> London Plane */}
              <motion.g>
                <circle r="4" fill="#3b82f6" filter="url(#glow)">
                  <animateMotion 
                    path="M 400 290 Q 350 190 380 100" 
                    dur="12s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </motion.g>

              {/* NY -> Lagos Vessel (Container Ocean Cargo path) */}
              <motion.g>
                <circle r="3.5" fill="#f59e0b" filter="url(#glow)">
                  <animateMotion 
                    path="M 220 130 Q 280 220 400 290" 
                    dur="20s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </motion.g>

              {/* Glowing Destination Hub Nodes */}
              {/* Toronto Node */}
              <g transform="translate(200, 110)">
                <circle r="12" fill="#ef4444" fillOpacity="0.15" className="animate-pulse" />
                <circle r="5" fill="#ef4444" filter="url(#glow)" />
                <text y="-14" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" letterSpacing="0.05em">Toronto</text>
              </g>

              {/* New York Node */}
              <g transform="translate(220, 130)">
                <circle r="12" fill="#3b82f6" fillOpacity="0.15" className="animate-pulse" />
                <circle r="5" fill="#3b82f6" filter="url(#glow)" />
                <text y="20" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" letterSpacing="0.05em">New York</text>
              </g>

              {/* London Node */}
              <g transform="translate(380, 100)">
                <circle r="12" fill="#8b5cf6" fillOpacity="0.15" className="animate-pulse" />
                <circle r="5" fill="#8b5cf6" filter="url(#glow)" />
                <text y="-14" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" letterSpacing="0.05em">London</text>
              </g>

              {/* Lagos Core Hub */}
              <g transform="translate(400, 290)">
                <circle r="18" fill="#D4AF37" fillOpacity="0.2" className="animate-pulse" />
                <circle r="7" fill="#D4AF37" filter="url(#glow)" />
                <text y="24" textAnchor="middle" fill="#D4AF37" fontSize="10" fontWeight="black" letterSpacing="0.1em">Lagos Hub</text>
              </g>

              {/* Accra Node */}
              <g transform="translate(355, 290)">
                <circle r="4" fill="#10b981" filter="url(#glow)" />
                <text y="14" textAnchor="end" fill="#ffffff" fontSize="8" fontWeight="bold" opacity="0.6">Accra</text>
              </g>

              {/* Nairobi Node */}
              <g transform="translate(460, 280)">
                <circle r="4" fill="#10b981" filter="url(#glow)" />
                <text x="8" y="4" textAnchor="start" fill="#ffffff" fontSize="8" fontWeight="bold" opacity="0.6">Nairobi</text>
              </g>
            </svg>

            {/* Float HUD Details */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-center gap-4 bg-black/80 border border-white/5 p-4 rounded-xl backdrop-blur-md relative z-20">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#D4AF37] animate-spin-slow" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-white/40">Active Channels</p>
                  <p className="text-xs font-bold text-white">LCL Ocean Container, Cargo Freighters, Visa Pipelines</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] text-white/60 bg-white/5 border border-white/10 py-1 px-3 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>End-to-End Customs Monitored</span>
              </div>
            </div>

          </div>

          {/* Active Logistics Metric Card (Right 4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-white/5 to-[#050505] border border-[#D4AF37]/35 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-widest">Active Operations</span>
                <h3 className="text-2xl font-black text-white mt-1">Live Shipment Track</h3>
                <p className="text-white/40 text-xs mt-1.5 font-light leading-relaxed">
                  Real-time synchronization across regional borders, customs checkpoints, and aviation terminals.
                </p>
              </div>

              {/* Status Metric Bars */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                
                {/* Active shipments */}
                <div className="bg-black/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-[9px] uppercase font-bold text-white/40 tracking-widest">Cargo Active in Transit</p>
                  <div className="flex justify-between items-baseline mt-1">
                    <p className="text-2xl font-mono font-bold text-white tracking-tight">
                      {metrics.activeShipments.toLocaleString()}
                    </p>
                    <span className="text-[9px] bg-blue-500/10 text-blue-400 py-0.5 px-2 rounded-full font-bold">Live</span>
                  </div>
                </div>

                {/* Delivered today */}
                <div className="bg-black/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-[9px] uppercase font-bold text-white/40 tracking-widest">Packages Delivered Today</p>
                  <div className="flex justify-between items-baseline mt-1">
                    <p className="text-2xl font-mono font-bold text-[#D4AF37] tracking-tight">
                      {metrics.packagesDelivered.toLocaleString()}
                    </p>
                    <span className="text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] py-0.5 px-2 rounded-full font-bold">+12/Min</span>
                  </div>
                </div>

                {/* Relocations in progress */}
                <div className="bg-black/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-[9px] uppercase font-bold text-white/40 tracking-widest">Active Families Relocating</p>
                  <div className="flex justify-between items-baseline mt-1">
                    <p className="text-2xl font-mono font-bold text-purple-400 tracking-tight">
                      {metrics.currentRelocations.toLocaleString()}
                    </p>
                    <span className="text-[9px] bg-purple-500/10 text-purple-400 py-0.5 px-2 rounded-full font-bold">Global</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => {
                  const event = new CustomEvent("open-contact-modal");
                  window.dispatchEvent(event);
                }}
                className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all uppercase text-xs tracking-wider text-center cursor-pointer"
              >
                Track / Start Your Move
              </button>
              <p className="text-[9px] text-white/30 text-center mt-2.5">Safe. Secure. Document-Assured Cargo.</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
