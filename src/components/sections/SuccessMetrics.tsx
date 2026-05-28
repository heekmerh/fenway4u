"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Compass, ShieldAlert, BadgeCheck } from "lucide-react";

interface MetricItem {
  id: string;
  targetNum: number;
  suffix: string;
  label: string;
  sub: string;
  icon: any;
  color: string;
}

export function SuccessMetrics() {
  const [counts, setCounts] = useState<Record<string, number>>({
    packages: 0,
    relocations: 0,
    satisfaction: 0,
    routes: 0
  });

  const metricsData: MetricItem[] = [
    { id: "packages", targetNum: 5200, suffix: "+", label: "Sourced & Delivered", sub: "Groceries, packages, and luxury sourcing", icon: TrendingUp, color: "text-[#D4AF37] border-[#D4AF37]/20 hover:shadow-[#D4AF37]/10" },
    { id: "relocations", targetNum: 2450, suffix: "+", label: "Successful Relocations", sub: "Students, professionals & families settled", icon: Users, color: "text-blue-400 border-blue-500/20 hover:shadow-blue-500/10" },
    { id: "satisfaction", targetNum: 98, suffix: "%", label: "Client Satisfaction", sub: "Accurate documentation and cargo safety", icon: BadgeCheck, color: "text-emerald-400 border-emerald-500/20 hover:shadow-emerald-500/10" },
    { id: "routes", targetNum: 55, suffix: "+", label: "Active Global Routes", sub: "Connecting Africa, UK, US, and Canada", icon: Compass, color: "text-purple-400 border-purple-500/20 hover:shadow-purple-500/10" }
  ];

  useEffect(() => {
    // Dynamic counter increment logic on mount / viewport intersection
    const duration = 2000; // 2 seconds counting animation
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setCounts(() => {
        const next: Record<string, number> = {};
        metricsData.forEach(m => {
          const increment = Math.ceil(m.targetNum / steps);
          next[m.id] = Math.min(increment * stepCount, m.targetNum);
        });
        return next;
      });

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Background visual overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-16">
        
        {/* Storytelling stats intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-widest bg-[#D4AF37]/10 py-1 px-3.5 border border-[#D4AF37]/35 rounded-full inline-block">
              Proven Global Excellence
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Bridging the Distance with <span className="text-[#D4AF37]">Trust</span>
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Every statistic represents an international student finding their footing, a family enjoying a hot meal of authentic homeland groceries, or a diaspora professional stepping into their dream career abroad. We are proud of our milestones.
            </p>
          </div>

          {/* Interactive Stat Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metricsData.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className={`bg-[#0c0c0c]/80 border ${m.color} p-6 rounded-3xl relative overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/10 group`}
                >
                  {/* Top slide-down glow lines */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest">{m.label}</p>
                      <h3 className="text-4xl font-black font-mono tracking-tight text-white mt-1">
                        {counts[m.id]?.toLocaleString()}{m.suffix}
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white/70" />
                    </div>
                  </div>

                  <p className="text-white/50 text-xs font-light leading-relaxed mt-4 pt-4 border-t border-white/5">
                    {m.sub}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
