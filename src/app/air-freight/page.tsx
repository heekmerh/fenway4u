"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Plane, Package, Smartphone, FileText, Wrench, HeartPulse, 
  User, Zap, Globe, ShieldCheck, Search, FileCheck, MapPin, 
  Clock, TrendingDown, Building2, ShoppingBag, Car, Laptop, 
  Briefcase, MessageCircle, ChevronDown, ArrowRight, PlaneTakeoff, 
  Map, CheckCircle, Mail
} from "lucide-react";

// --- Data Structures ---

const whatWeShip = [
  { title: "Commercial Cargo", desc: "Inventory, retail products, equipment, and urgent business supplies.", icon: Package },
  { title: "Electronics & Tech", desc: "Safe shipping for phones, laptops, servers, and high-value electronics.", icon: Smartphone },
  { title: "Documents & Parcels", desc: "Fast worldwide delivery for legal documents, contracts, and urgent packages.", icon: FileText },
  { title: "Automotive Parts", desc: "Car engines, vehicle accessories, and critical mechanical parts.", icon: Wrench },
  { title: "Medical & Sensitive", desc: "Priority handling for medical supplies and temperature-sensitive goods.", icon: HeartPulse },
  { title: "Personal Shipments", desc: "For students, travelers, relocating families, and international buyers.", icon: User }
];

const whyChooseUs = [
  { title: "Fastest Delivery Method", desc: "Ideal for urgent shipments and time-sensitive commercial cargo.", icon: Zap },
  { title: "Global Coverage", desc: "Worldwide air cargo routes from Canada, UK, USA, and Europe.", icon: Globe },
  { title: "Secure Cargo Handling", desc: "Professional packaging and 24/7 monitoring systems.", icon: ShieldCheck },
  { title: "Real-Time Tracking", desc: "Track shipments precisely from departure to final delivery.", icon: Search },
  { title: "Customs Support", desc: "End-to-end customs assistance and complex clearance handling.", icon: FileCheck }
];

const freightOptions = [
  {
    title: "Express Air Freight",
    bestFor: "Urgent packages & high-priority deliveries",
    features: ["Fastest transit times (1-3 days)", "Priority handling & boarding", "Premium 24/7 support"]
  },
  {
    title: "Standard Air Freight",
    bestFor: "Commercial shipments & regular cargo",
    features: ["Reliable timelines (4-7 days)", "Affordable premium rates", "Secure cargo handling"]
  },
  {
    title: "Consolidated Cargo",
    bestFor: "Smaller shipments & cost optimization",
    features: ["Grouped cargo networks", "Reduced pricing structure", "Efficient scheduled delivery"]
  }
];

const industries = [
  { name: "Retail & E-commerce", icon: ShoppingBag },
  { name: "Automotive", icon: Car },
  { name: "Technology", icon: Laptop },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Construction", icon: Building2 },
  { name: "Manufacturing", icon: Wrench }
];

const processSteps = [
  { step: "01", title: "Submit Cargo Details", desc: "Enter shipment type, dimensions, destination, and urgency." },
  { step: "02", title: "Pickup & Packaging", desc: "Cargo inspection and secure preparation for flight." },
  { step: "03", title: "Air Transit", desc: "Shipment transported via our global air freight network." },
  { step: "04", title: "Customs & Delivery", desc: "Clearance processing and final destination delivery." }
];

const testimonials = [
  {
    quote: "Our urgent medical supply cargo was delivered across the world in record time. Absolute lifesavers.",
    author: "Director of Operations, Global Health",
    image: "/images/air_freight_test_1_1779128249470.png"
  },
  {
    quote: "We ship commercial retail inventory monthly. The reliability and speed of their air freight is unmatched.",
    author: "Logistics Manager, TechRetail Inc.",
    image: "/images/air_freight_test_2_1779128261920.png"
  }
];

const faqs = [
  { q: "How fast is air freight?", a: "Express air freight can deliver within 1-3 business days globally, while standard air freight typically takes 4-7 days depending on customs." },
  { q: "What items can be shipped?", a: "We ship almost anything: commercial goods, electronics, auto parts, documents, and medical supplies. Dangerous goods are subject to strict regulations." },
  { q: "Do you offer insurance?", a: "Yes, we offer comprehensive cargo insurance to protect the full value of your shipments against any transit risks." },
  { q: "How are shipping costs calculated?", a: "Costs are based on the chargeable weight (actual weight vs. volumetric weight), destination, and chosen service speed (Express vs. Standard)." },
  { q: "Do you handle customs clearance?", a: "Absolutely. Our expert brokers handle all export and import documentation to ensure swift clearance at the destination." },
  { q: "Can businesses use recurring freight services?", a: "Yes, we offer dedicated B2B wholesale logistics, warehouse consolidation, and recurring cargo contracts at discounted rates." }
];

export default function AirFreightPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const origin = (form.elements[0] as HTMLInputElement).value;
    const destination = (form.elements[1] as HTMLInputElement).value;
    const cargoType = (form.elements[2] as HTMLSelectElement).value;
    const weight = (form.elements[3] as HTMLInputElement).value;

    const subject = encodeURIComponent("Air Freight Cargo Quote Request — INTMOVE");
    const bodyText = `Hi INTMOVE Cargo Team,

I would like to request an Air Freight cargo quote.

Quote Details:
- Origin: ${origin}
- Destination: ${destination}
- Cargo Type: ${cargoType}
- Estimated Weight: ${weight} kg

Thank you.`;

    const body = encodeURIComponent(bodyText);
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="bg-[#020617] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#020617]">
      


      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden px-6 bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617]/50" />
          <Image 
            src="/images/hero_air_freight_1779128222057.png" 
            alt="Cargo aircraft loading at night" 
            fill 
            className="object-cover opacity-30 mix-blend-screen pointer-events-none"
          />
          
          {/* Animated Flight Path lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M -100 800 Q 400 200 1200 100" 
              fill="transparent" stroke="#D4AF37" strokeWidth="2" strokeDasharray="10 10"
              initial={{ strokeDashoffset: 1000 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.path 
              d="M 1200 800 Q 800 400 -100 300" 
              fill="transparent" stroke="#3B82F6" strokeWidth="2" strokeDasharray="15 15"
              initial={{ strokeDashoffset: -1000 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold mb-8 uppercase tracking-widest backdrop-blur-md"
            >
              <PlaneTakeoff className="w-4 h-4" /> Global Air Logistics
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white"
            >
              Fast Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Air Freight</span> Solutions
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed font-light"
            >
              Express international cargo shipping designed for speed, security, and reliable worldwide delivery.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#quote" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 text-lg">
                Request Freight Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="bg-white/5 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm group">
                <Search className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /> Track Cargo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Features Placeholder Banner */}
      <div className="border-y border-white/5 bg-[#0A0F1C] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-12 relative z-10 text-white/50 text-sm font-medium tracking-widest uppercase">
          <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#D4AF37]" /> Worldwide Reach</span>
          <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-blue-400" /> AI Freight Assistant</span>
          <span className="flex items-center gap-2"><Search className="w-4 h-4 text-green-400" /> Live Tracking</span>
        </div>
      </div>

      {/* Section 1: What We Ship */}
      <section className="py-24 px-6 relative bg-[#020617]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Cargo We <span className="text-[#D4AF37]">Ship Globally</span></h2>
            <p className="text-white/50 text-lg">Specialized handling for all types of international air freight.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeShip.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0A0F1C] p-8 rounded-3xl border border-white/5 hover:border-[#D4AF37]/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors" />
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <Zap className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Why Choose Air Freight */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-[#020617] to-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose <span className="text-[#D4AF37]">Air Freight</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChooseUs.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#020617] p-6 rounded-2xl border border-white/10 text-center hover:-translate-y-2 transition-transform shadow-xl"
              >
                <div className="w-12 h-12 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 & 4: Air Freight Options & Industries */}
      <section className="py-24 px-6 relative bg-[#020617]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Options (Left 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-bold mb-8">Freight Options</h2>
              {freightOptions.map((opt, idx) => (
                <div key={idx} className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:border-[#D4AF37]/50 transition-colors">
                  <div className="shrink-0 bg-[#020617] w-16 h-16 rounded-full flex items-center justify-center border border-white/5 shadow-inner">
                    <Plane className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-1">{opt.title}</h3>
                    <p className="text-blue-400 text-sm font-medium mb-4">Best for: {opt.bestFor}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {opt.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Industries (Right 5 cols) */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold mb-8">Industries We Serve</h2>
              <div className="grid grid-cols-2 gap-4">
                {industries.map((ind, idx) => (
                  <div key={idx} className="bg-[#0A0F1C] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <ind.icon className="w-8 h-8 text-blue-400 mb-3" />
                    <span className="font-bold text-sm text-white/90">{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 8 & 7: Tracking Portal UI & Global Map */}
      <section className="py-24 px-6 bg-[#0A0F1C] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Map className="w-full h-full text-white" strokeWidth={0.5} />
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Live Tracking & <span className="text-[#D4AF37]">Global Routes</span></h2>
          </div>
          
          <div className="bg-[#020617] border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Portal Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <PlaneTakeoff className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <h3 className="text-xl font-bold text-white">AWB: 112-892441-X</h3>
                  <p className="text-sm text-white/50">JFK (New York) &rarr; LHR (London)</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg font-bold text-sm uppercase flex items-center gap-2 border border-blue-500/30">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> In Transit - Over Atlantic
              </div>
            </div>

            {/* Portal Tracking Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 -z-0" />
              <div className="hidden md:block absolute top-1/2 left-0 w-[40%] h-[2px] bg-[#D4AF37] -translate-y-1/2 shadow-[0_0_10px_rgba(212,175,55,0.8)] -z-0" />
              
              {[
                { label: "Cargo Received", time: "Oct 12, 08:00 AM", done: true },
                { label: "Customs Origin", time: "Oct 12, 11:30 AM", done: true },
                { label: "In Transit", time: "Oct 12, 14:45 PM", done: true, active: true },
                { label: "Customs Dest.", time: "Pending", done: false },
                { label: "Delivered", time: "Est: Oct 14", done: false },
              ].map((milestone, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left bg-[#020617] md:bg-transparent p-2 md:p-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 border-4 border-[#020617] 
                    ${milestone.active ? 'bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.8)]' : milestone.done ? 'bg-blue-500' : 'bg-white/20'}`}
                  >
                    {milestone.done && !milestone.active && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <p className={`font-bold text-sm ${milestone.active ? 'text-[#D4AF37]' : milestone.done ? 'text-white' : 'text-white/40'}`}>{milestone.label}</p>
                  <p className="text-xs text-white/40">{milestone.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Request Quote Form (Conversion Optimized) */}
      <section id="quote" className="py-24 px-6 relative bg-[#020617]">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-[#0A0F1C] rounded-3xl p-8 md:p-12 border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Freight Quote</h2>
              <p className="text-white/60">Fill in the cargo details and submit to instantly pre-fill your email consultation request.</p>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Origin</label>
                  <input type="text" required className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors" placeholder="e.g. London, UK" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Destination</label>
                  <input type="text" required className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors" placeholder="e.g. Lagos, NG" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Cargo Type</label>
                  <select className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                    <option>Commercial Goods</option>
                    <option>Electronics</option>
                    <option>Medical Supplies</option>
                    <option>Auto Parts</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Est. Weight (kg)</label>
                  <input type="number" className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors" placeholder="e.g. 500" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-lg flex items-center justify-center gap-2">
                <Mail className="w-6 h-6" /> Send Email Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section className="py-24 px-6 bg-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How Air Freight Works</h2>
            <p className="text-white/50 text-lg">Four simple steps to global delivery.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/50 to-[#D4AF37]/20 -z-0" />
            
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-[#020617] border-2 border-[#D4AF37]/50 rounded-xl flex items-center justify-center text-xl font-bold text-[#D4AF37] mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Business Freight Solutions & Testimonials */}
      <section className="py-24 px-6 relative bg-[#020617]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* B2B Section */}
            <div className="flex flex-col justify-center">
              <Building2 className="w-12 h-12 text-[#D4AF37] mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Business Freight <span className="text-blue-400">Solutions</span></h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed font-light">
                For commercial importers and wholesalers, we offer dedicated wholesale logistics, warehouse consolidation, and recurring cargo contracts to optimize your supply chain.
              </p>
              <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10 mb-8">
                 <Image src="/images/air_freight_b2b_1779128236940.png" alt="Logistics Control Room" fill className="object-cover" />
              </div>
              <a href="mailto:consult@fenway4u.com?subject=Discuss B2B Logistics Partnership — INTMOVE" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/10 transition-all text-lg w-full sm:w-auto">
                Discuss B2B Partnerships <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Testimonials */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
              {testimonials.map((test, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0A0F1C] rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col sm:flex-row"
                >
                  <div className="relative h-48 sm:h-auto sm:w-2/5 shrink-0">
                    <Image src={test.image} alt="Cargo Delivery" fill className="object-cover" />
                  </div>
                  <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                    <p className="text-white/80 italic text-sm leading-relaxed mb-4 font-light">"{test.quote}"</p>
                    <p className="font-bold text-white text-xs uppercase tracking-wider text-[#D4AF37]">— {test.author}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <section className="py-24 px-6 relative bg-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#020617] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left outline-none"
                >
                  <span className={`font-medium text-lg ${openFaq === idx ? 'text-white' : 'text-white/70'}`}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-[#D4AF37]' : 'text-white/30'}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-8 pb-8 text-white/50 leading-relaxed font-light border-t border-white/5 pt-6">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 12: Final CTA */}
      <section className="py-24 px-6 bg-[#020617]">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#0A0F1C] to-[#020617] rounded-3xl p-12 md:p-24 text-center relative overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 leading-tight text-white">Move Cargo Across The World <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">— Faster.</span></h2>
            <p className="text-xl text-white/50 mb-12 relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
              Premium global air freight solutions built for speed, security, and reliability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link href="#quote" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2">
                Get Freight Quote
              </Link>
              <a href="https://t.me/fenway4u_logistics" target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-[#0088cc] to-[#24A1DE] hover:from-[#24A1DE] hover:to-[#0088cc] text-white font-medium px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_20px_rgba(0,136,204,0.3)] flex items-center justify-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.47-.8-.26-1.42-.4-1.36-.85.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.11.17.26.19.37.01.07.03.22.02.39z"/>
                </svg>
                Telegram Freight Support
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
