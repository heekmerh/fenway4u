"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Quote, Compass, Calendar, Award, Plane } from "lucide-react";
import Image from "next/image";

interface Journey {
  title: string;
  category: string;
  client: string;
  destination: string;
  storyQuote: string;
  description: string;
  image: string;
  timeline: { step: string; desc: string; date: string }[];
  transformation: { before: string; after: string };
  metrics: { label: string; val: string }[];
}

export function ClientJourneys() {
  const [activeIdx, setActiveIdx] = useState(0);

  const journeys: Journey[] = [
    {
      title: "Oluwaseun's Canadian Tech Relocation",
      category: "Skilled Migration",
      client: "Oluwaseun A. (Senior Software Engineer)",
      destination: "Lagos, Nigeria ➔ Toronto, Canada",
      storyQuote: "Fenway4u handled everything. From certifying my skilled worker visa papers to bulk shipping my native books, clothes, and spices right to my doorstep in North York.",
      description: "Oluwaseun secured a tech role in Toronto but was overwhelmed by relocation logistics. We managed his Express Entry visa processing and arranged air cargo delivery for all his personal effects.",
      image: "/images/hero_customs_1779129505412.png",
      timeline: [
        { step: "Visa Strategy", desc: "Optimized CRS points profile & validated credential assessment", date: "Month 1" },
        { step: "Cargo Sourcing", desc: "Consolidated personal library, tech gears, and spices with Fenway4u", date: "Month 3" },
        { step: "Arrival Settle", desc: "Landed in Ontario with temporary hosting pre-arranged", date: "Month 4" }
      ],
      transformation: {
        before: "Stuck in long visas backlog and worried about leaving valuable personal belongings behind.",
        after: "Settled in a modern Toronto flat with his tech lab and native food cabinets fully stocked."
      },
      metrics: [
        { label: "Visa Timeline", val: "4.5 Months" },
        { label: "Cargo Volume", val: "120 KG Express" },
        { label: "Settlement Delay", val: "0 Days" }
      ]
    },
    {
      title: "The Amadi Family Visitor Super Visa",
      category: "Family Reunification",
      client: "The Amadi Family & Grandparents",
      destination: "Enugu, Nigeria ➔ Birmingham, United Kingdom",
      storyQuote: "To see my parents hugging my kids at Birmingham Airport after three years of separation was emotional. The travel logistics were absolutely flawless.",
      description: "Dr. Amadi wanted to invite his elderly parents to stay with his family in the UK. We optimized their medical insurance verification, completed visa routing, and managed express flight assistance.",
      image: "/images/hero_relocation_support_1778967828049.png",
      timeline: [
        { step: "Medical Escrow", desc: "Set up compulsory UK travel health clearances & visa paperwork", date: "Week 1" },
        { step: "Biometric Pass", desc: "Arranged express biometric scanning at Enugu VFS Center", date: "Week 3" },
        { step: "Airport Reunion", desc: "Welcome assist and private transition from London Heathrow to West Midlands", date: "Week 5" }
      ],
      transformation: {
        before: "Separated by thousands of miles, confused by complex visitor health insurance terms.",
        after: "United under one roof, hosting family weekend barbecues in their British garden."
      },
      metrics: [
        { label: "Process Time", val: "5 Weeks" },
        { label: "NHS Coverage", val: "100% Verified" },
        { label: "Invite Duration", val: "2 Years Valid" }
      ]
    },
    {
      title: "Taste of Home Grocery Delivery",
      category: "Diaspora Sourcing",
      client: "Chinedu O. (International Student)",
      destination: "Accra, Ghana ➔ London, United Kingdom",
      storyQuote: "I never have to worry about sourcing genuine garri, fresh egusi, or local palm oil. It arrives vacuum-sealed, perfectly preserved.",
      description: "Chinedu is a postgraduate student at a UK university who missed authentic home-cooked meals. We enrolled him in our monthly grocery box subscription, handling phytosanitary inspections and priority shipping.",
      image: "/images/african_groceries_banner.png",
      timeline: [
        { step: "Custom Box Pack", desc: "Student selected egusi, yams, dry fish, and spices in custom quantities", date: "Day 1" },
        { step: "Vacuum Seal", desc: "Double-layered heat packing to guarantee standard freshness borders", date: "Day 2" },
        { step: "Dorm Delivery", desc: "Express delivery straight to student accommodation halls in London", date: "Day 4" }
      ],
      transformation: {
        before: "Wasting hours searching local markets for overpriced, stale native goods.",
        after: "Receiving fresh, affordable culinary supplies every month without lifting a finger."
      },
      metrics: [
        { label: "Sourcing Cost", val: "$99 / Month" },
        { label: "Freshness Seal", val: "100% Sealed" },
        { label: "Delivery Time", val: "3 Days Air" }
      ]
    },
    {
      title: "Wholesale Textile & Sourcing Freight",
      category: "Business B2B",
      client: "Amina K. (Fashion Boutique Owner)",
      destination: "Lagos, Nigeria ➔ Houston, Texas (USA)",
      storyQuote: "Fenway4u is my strategic B2B partner. They consolidated shipments from 4 weavers in Kano and shipped a full ocean container with complete customs clearances.",
      description: "Amina runs an African-inspired luxury boutique in Texas. We verify Kano and Lagos weavers, consolidate bulk rolls, handle export clearances, and manage container shipping directly to her warehouse.",
      image: "/images/luxury_fashion_sourcing.png",
      timeline: [
        { step: "Factory Vetting", desc: "Physically audited weaving compounds in Kano to check material volume", date: "Month 1" },
        { step: "Warehouse Pack", desc: "Palletized, labeled, and container-packed rolls at Lagos shipping yard", date: "Month 2" },
        { step: "Port Clearance", desc: "Navigated US Customs & Border Protection entry protocols automatically", date: "Month 3" }
      ],
      transformation: {
        before: "Struggling with fragmented weavers, custom clearance delays, and high shipping rates.",
        after: "Reliable B2B logistics lane delivering seasonal inventories on a predictable schedule."
      },
      metrics: [
        { label: "Shipment Load", val: "20ft Container" },
        { label: "Supplier Check", val: "4 Factories Verified" },
        { label: "Freight Savings", val: "24% Saved FCL" }
      ]
    }
  ];

  const nextSlide = () => {
    setActiveIdx((prev) => (prev < journeys.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : journeys.length - 1));
  };

  const active = journeys[activeIdx];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      
      {/* Background blobs for luxury ambient depth */}
      <div className="absolute top-[30%] left-[-10%] w-[450px] h-[450px] bg-purple-500/5 blur-[150px] -z-10 rounded-full animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-[#D4AF37]/5 blur-[150px] -z-10 rounded-full animate-pulse" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-widest bg-[#D4AF37]/10 py-1 px-3.5 border border-[#D4AF37]/35 rounded-full inline-block">
              Diaspora Journeys
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Featured Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#D4AF37]">Stories</span>
            </h2>
            <p className="text-white/50 text-sm font-light max-w-2xl leading-relaxed">
              Real stories of ambition, family reunion, and international success. Follow their timeline and see how we build the bridge between Africa and the world.
            </p>
          </div>

          {/* Slide Controls */}
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Canvas */}
        <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              
              {/* Left Cinematic Image & Metrics Panel (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative h-[280px] md:h-[360px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                  <Image 
                    src={active.image} 
                    alt={active.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none opacity-90"
                  />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 z-20 text-[9px] font-black uppercase tracking-widest text-[#D4AF37] bg-[#050505]/95 border border-[#D4AF37]/30 py-1.5 px-3 rounded-md">
                    {active.category}
                  </span>

                  {/* Destination overlay */}
                  <div className="absolute bottom-4 left-4 z-20 text-white space-y-1">
                    <p className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Migration Lane</p>
                    <p className="text-xs font-black tracking-tight">{active.destination}</p>
                  </div>
                </div>

                {/* Custom numeric metrics */}
                <div className="grid grid-cols-3 gap-2 bg-black/60 border border-white/5 p-4 rounded-xl">
                  {active.metrics.map((m, idx) => (
                    <div key={idx} className="text-center space-y-1">
                      <p className="text-[9px] text-white/40 uppercase tracking-wider font-bold">{m.label}</p>
                      <p className="text-xs font-black font-mono text-[#D4AF37] tracking-tight">{m.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content & Story Timeline Panel (7 cols) */}
              <div className="lg:col-span-7 space-y-8 flex flex-col justify-between h-full">
                
                {/* Story headers */}
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-snug tracking-tight">
                    {active.title}
                  </h3>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{active.client}</p>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    {active.description}
                  </p>
                </div>

                {/* Blockquote quote area */}
                <div className="bg-[#141414] border-l-2 border-[#D4AF37] p-5 rounded-r-xl relative">
                  <Quote className="w-10 h-10 text-[#D4AF37]/5 absolute top-2 right-4 pointer-events-none" />
                  <p className="text-xs italic text-white/80 font-light leading-relaxed">
                    "{active.storyQuote}"
                  </p>
                </div>

                {/* Timeline checkpoints */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Journey Checkpoints</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {active.timeline.map((item, idx) => (
                      <div key={idx} className="bg-black/40 border border-white/5 p-4 rounded-xl relative space-y-1 group hover:border-blue-500/20 transition-all">
                        <div className="flex justify-between items-start">
                          <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[9px] font-mono text-blue-400 font-bold shrink-0">{idx + 1}</span>
                          <span className="text-[8px] font-mono font-bold text-white/30 uppercase">{item.date}</span>
                        </div>
                        <h5 className="text-[11px] font-black text-white mt-1.5">{item.step}</h5>
                        <p className="text-[10px] text-white/55 font-light leading-snug">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before / After Transformation specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-6">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-wider font-bold text-red-400">Before Fenway4u</p>
                    <p className="text-[10px] text-white/50 leading-relaxed font-light">{active.transformation.before}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-wider font-bold text-emerald-400">After Fenway4u</p>
                    <p className="text-[10px] text-white/80 leading-relaxed font-light">{active.transformation.after}</p>
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
