"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Info, Plane, Ship, Clock, DollarSign, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DisclaimerBlock {
  title: string;
  category: string;
  icon: any;
  desc: string;
  details: string[];
}

export default function DisclaimerPage() {
  const blocks: DisclaimerBlock[] = [
    {
      title: "Visa Approval Outcomes",
      category: "Immigration Advisory",
      icon: ShieldAlert,
      desc: "Immigration visa decisions are entirely under the sovereign jurisdiction of the destination state authorities (Canada, United Kingdom, USA).",
      details: [
        "FENWAY4U provides advisory reviews, academic admission processing, document sifting, and visa checklists.",
        "We do not influence, represent, or secure direct guarantees for final visa approvals.",
        "Consultation fees do not cover third-party government application charges or SEVIS registry fees."
      ]
    },
    {
      title: "Cargo & Shipping Timelines",
      category: "Logistics Carriage",
      icon: Ship,
      desc: "Ocean freight and priority aviation shipping timelines represent standard operational targets rather than guaranteed intervals.",
      details: [
        "Transit estimates (e.g. 28-35 days ocean cargo, 3-5 days air cargo) exclude customs inspections, carrier issues, or port terminal backlogs.",
        "We are not liable for delayed perishables unless shipped specifically under priority vacuum-sealed freshness protection lanes.",
        "Volumetric cargo dimensions are calculated and audited strictly at our Lagos sorting hub."
      ]
    },
    {
      title: "Customs Inspections & Tariffs",
      category: "Border Customs",
      icon: Clock,
      desc: "Border clearances and customs duties are subject to changing international regulatory frameworks.",
      details: [
        "Customs clearances are navigated based on active import codes at the destination.",
        "Any unexpected storage demurrage, physical search fees, or customs duties levied by border control agencies are the responsibility of the client.",
        "If illegal or prohibited items are identified, cargo is confiscated and reported immediately."
      ]
    },
    {
      title: "Procurement & Sourcing Availability",
      category: "Concierge Purchase",
      icon: Info,
      desc: "Concierge sourcing requests via our 'Shop For Me' service are subject to real-time manufacturer inventory limits.",
      details: [
        "Preset survival boxes or custom food builder requests are sourced directly from authentic Nigerian and West African agricultural markets.",
        "If specific food brands or spice components are out of stock, we source equivalent-quality alternatives.",
        "Procuring third-party luxury items or custom electronics is subject to store refund parameters."
      ]
    },
    {
      title: "Currency Conversion Fluctuations",
      category: "Financial Disclosures",
      icon: DollarSign,
      desc: "Billing estimates and invoice calculations fluctuate dynamically based on interbank financial rate indexes.",
      details: [
        "Our standard quote models calculate in USD/CAD/GBP/NGN based on live conversion values.",
        "Quotes are valid for 7 business days from date of issue.",
        "Escrow refunds are settled using the base transaction currency values at the time of payment."
      ]
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-hidden pt-24 pb-20">
      
      {/* Background visual glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />

      {/* Header */}
      <section className="py-16 px-6 border-b border-white/5 bg-[#090909]/40 relative z-20">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Regulatory Disclaimers</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Disclaimer & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Notices</span>
          </h1>
          <p className="text-white/60 text-base font-light max-w-2xl mx-auto leading-relaxed">
            Transparent disclosure of regulatory limits, visa parameters, shipping variables, and payment exchange rates.
          </p>
        </div>
      </section>

      {/* Main Grid content */}
      <section className="py-16 px-6 container mx-auto max-w-5xl relative z-20 space-y-8">
        
        {/* Compliance highlight card */}
        <div className="bg-gradient-to-r from-amber-500/5 to-[#0c0c0c] border border-amber-500/20 p-6 rounded-3xl flex gap-4 items-center shadow-xl">
          <Info className="w-10 h-10 text-amber-400 shrink-0 animate-bounce-slow" />
          <div>
            <h4 className="text-sm font-bold text-white">Our Promise of Absolute Transparency</h4>
            <p className="text-[11px] text-white/55 font-light leading-relaxed mt-0.5">
              By clearly mapping regulatory and carrier boundaries, we avoid unrealistic expectations and deliver reliable service.
            </p>
          </div>
        </div>

        {/* List of disclaimers */}
        <div className="space-y-6">
          {blocks.map((block, idx) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-[#0c0c0c] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6 hover:border-amber-500/20 transition-colors shadow-2xl relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{block.title}</h3>
                      <p className="text-white/30 text-[9px] uppercase tracking-wider font-bold mt-0.5">{block.category}</p>
                    </div>
                  </div>
                </div>

                <p className="text-white/70 text-xs font-light leading-relaxed">
                  {block.desc}
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-white/5">
                  {block.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-white/60 font-light leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to Consultation Booking */}
        <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
          
          <div className="max-w-xl mx-auto space-y-3">
            <h4 className="text-lg font-bold text-white">Have visa or relocation questions?</h4>
            <p className="text-xs text-white/50 font-light">
              Speak directly with our expert advisory coordinates to review your profile eligibility in full detail.
            </p>
          </div>
          
          <div>
            <button
              onClick={() => {
                const event = new CustomEvent("open-contact-modal");
                window.dispatchEvent(event);
              }}
              className="bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold px-8 py-4 rounded-xl transition-all uppercase text-xs tracking-wider flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              Start Free Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}
