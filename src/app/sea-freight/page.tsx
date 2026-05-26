"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Ship, Package, Car, Settings, Tv, Home, CheckCircle, 
  Search, ShieldCheck, FileCheck, Anchor, MapPin, 
  Building2, ShoppingBag, Laptop, Wrench, Briefcase, 
  MessageCircle, ChevronDown, ArrowRight, Map, 
  Calculator, Truck
} from "lucide-react";

// --- Data Structures ---

const whatWeShip = [
  { title: "Container Cargo", desc: "Commercial inventory, wholesale goods, and bulk retail products.", icon: Package },
  { title: "Vehicle Shipping", desc: "Safe ocean transport for cars, SUVs, motorcycles, and trucks.", icon: Car },
  { title: "Heavy Equipment", desc: "Industrial machinery, construction equipment, and oversized cargo.", icon: Settings },
  { title: "Electronics & Appliances", desc: "Cost-effective bulk transport for TVs, refrigerators, and appliances.", icon: Tv },
  { title: "Household Goods", desc: "Ideal for international family relocations and office moves.", icon: Home },
  { title: "Bulk Freight", desc: "Large-scale shipping solutions for commercial importers and exporters.", icon: Anchor }
];

const freightOptions = [
  {
    title: "Full Container Load (FCL)",
    bestFor: "Large commercial shipments & full household relocations",
    features: ["Private 20ft or 40ft container", "Maximum cargo security", "Faster port processing"]
  },
  {
    title: "Less Than Container (LCL)",
    bestFor: "Smaller shipments & affordable shared shipping",
    features: ["Highly cost-efficient", "Flexible cargo sizing", "Consolidated freight network"]
  },
  {
    title: "Roll-On Roll-Off (RoRo)",
    bestFor: "Vehicles, trucks, and heavy machinery",
    features: ["Easy drive-on loading", "Vehicle-focused transport", "Available at major global ports"]
  }
];

const whyChooseUs = [
  { title: "Cost-Effective", desc: "Significantly lower costs for large, heavy, and bulk cargo.", icon: TrendingDownIcon },
  { title: "Global Port Network", desc: "Worldwide shipping routes and trusted international port partnerships.", icon: MapPin },
  { title: "Massive Capacity", desc: "Ideal for oversized freight, machinery, and multi-container shipments.", icon: Anchor },
  { title: "Secure Handling", desc: "Professional crane loading, storage, and secure transit procedures.", icon: ShieldCheck },
  { title: "Customs Support", desc: "Expert assistance with complex import/export documentation.", icon: FileCheck }
];

const industries = [
  { name: "Automotive", icon: Car },
  { name: "Retail & Wholesale", icon: ShoppingBag },
  { name: "Construction", icon: Building2 },
  { name: "Manufacturing", icon: Wrench },
  { name: "Relocation", icon: Home },
  { name: "Electronics", icon: Laptop }
];

const processSteps = [
  { step: "01", title: "Cargo Booking", desc: "Submit your shipment details, dimensions, and destination port." },
  { step: "02", title: "Preparation", desc: "Professional inspection, packaging, and container arrangement." },
  { step: "03", title: "Ocean Transit", desc: "Secure transport through our established global sea routes." },
  { step: "04", title: "Port Clearance", desc: "Destination customs processing and final delivery coordination." }
];

const testimonials = [
  {
    quote: "Our commercial container arrived perfectly intact. The entire logistics process from origin to our warehouse was flawless.",
    author: "Supply Chain Director, Global Imports",
    image: "/images/sea_freight_test_1_1779128965828.png"
  },
  {
    quote: "Moving our family overseas was stressful, but their sea freight service handled all our household goods with incredible care.",
    author: "The Martinez Family, International Relocation",
    image: "/images/sea_freight_test_2_1779128978575.png"
  }
];

const faqs = [
  { q: "How long does sea freight take?", a: "Sea freight timelines vary by destination, typically ranging from 14 to 45 days depending on the specific port-to-port route." },
  { q: "What is the difference between FCL and LCL?", a: "FCL (Full Container Load) means you rent the entire container exclusively. LCL (Less Than Container Load) means you share container space with others, which is cheaper for smaller shipments." },
  { q: "Do you ship vehicles internationally?", a: "Yes, we offer both dedicated container shipping for luxury cars and RoRo (Roll-on/Roll-off) services for standard vehicles and heavy machinery." },
  { q: "Can I track my container?", a: "Yes. Our premium tracking dashboard provides real-time updates on your container's status, from port departure to customs clearance." },
  { q: "Is sea freight cheaper than air freight?", a: "Significantly. Sea freight is the most cost-effective method for shipping large, heavy, or bulk goods over long distances." },
  { q: "Do you handle customs clearance?", a: "Yes, our team manages all necessary export and import documentation to ensure smooth port clearance." }
];

// Helper icon component since TrendingDown is not imported from lucide above
function TrendingDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
      <polyline points="16 17 22 17 22 11"></polyline>
    </svg>
  );
}

export default function SeaFreightPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = encodeURIComponent("Hi, I would like to request a Sea Freight quote. Here are my details: ");
    window.open(`https://wa.me/1234567890?text=${whatsappMsg}`, '_blank');
  };

  return (
    <div className="bg-[#020617] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#020617]">
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center group hover:scale-110">
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden px-6 bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero_sea_freight_1779128923450.png" 
            alt="Massive cargo container ship" 
            fill 
            className="object-cover opacity-50 mix-blend-screen object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/50 to-transparent" />
          
          {/* Animated Water Reflection / Glowing elements */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent blur-3xl mix-blend-screen" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold mb-8 uppercase tracking-widest backdrop-blur-md"
            >
              <Ship className="w-4 h-4" /> Industrial Ocean Logistics
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white"
            >
              Reliable Global <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Sea Freight</span> Solutions
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed font-light"
            >
              Cost-effective international cargo shipping for containers, commercial goods, vehicles, and bulk freight worldwide.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#quote" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 text-lg">
                Request Shipping Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="bg-white/5 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm group">
                <Search className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /> Track Container
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Features Placeholder Banner */}
      <div className="border-y border-white/5 bg-[#0A0F1C] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-12 relative z-10 text-white/50 text-sm font-medium tracking-widest uppercase">
          <span className="flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-colors"><Calculator className="w-4 h-4 text-[#D4AF37]" /> Container Cost Estimator</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors"><Car className="w-4 h-4 text-blue-400" /> Vehicle Shipping Calculator</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><Package className="w-4 h-4 text-green-400" /> Cargo Volume Calculator</span>
        </div>
      </div>

      {/* Section 1: What We Ship */}
      <section className="py-24 px-6 relative bg-[#020617]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Massive <span className="text-[#D4AF37]">Capabilities</span></h2>
            <p className="text-white/50 text-lg">We have the capacity to handle any size of international shipment.</p>
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
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-[#D4AF37]/20 transition-colors" />
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-blue-400 group-hover:text-[#D4AF37] group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <item.icon className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Dedicated Vehicle Shipping */}
      <section className="py-24 px-6 relative bg-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image src="/images/sea_freight_vehicles_1779128939861.png" alt="RoRo Vehicle Shipping" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md border border-[#D4AF37]/30 mb-2">
                  <Anchor className="w-3 h-3" /> RoRo Shipping
                </div>
                <h3 className="text-white font-bold text-xl">Specialized Vehicle Transport</h3>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Car className="w-12 h-12 text-[#D4AF37] mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Global <span className="text-blue-400">Vehicle Shipping</span></h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed font-light">
                Whether you are exporting luxury cars, moving dealership inventory, or relocating your personal vehicle, we provide specialized Roll-on/Roll-off (RoRo) and dedicated container shipping for maximum security.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white/80"><CheckCircle className="w-5 h-5 text-green-500" /> Auction vehicle export handling</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle className="w-5 h-5 text-green-500" /> Full customs and inspection support</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle className="w-5 h-5 text-green-500" /> Secure container loading for luxury cars</li>
              </ul>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/10 transition-all">
                Consult Vehicle Specialist <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 & 3: Sea Freight Options & Why Choose Us */}
      <section className="py-24 px-6 relative bg-[#020617]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Options (Left 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-bold mb-8">Freight Options</h2>
              {freightOptions.map((opt, idx) => (
                <div key={idx} className="bg-[#0A0F1C] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:border-blue-500/30 transition-colors">
                  <div className="shrink-0 bg-[#020617] w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                    <Ship className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-1">{opt.title}</h3>
                    <p className="text-[#D4AF37] text-sm font-medium mb-4">Best for: {opt.bestFor}</p>
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

            {/* Why Choose Us (Right 5 cols) */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold mb-8">Why Sea Freight?</h2>
              <div className="space-y-4">
                {whyChooseUs.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div className="w-12 h-12 rounded-full bg-[#0A0F1C] flex items-center justify-center shrink-0 border border-white/10 text-[#D4AF37]">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-white/90">{feature.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 6 & 7: Container Tracking Dashboard UI & Global Map */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0A0F1C] to-[#020617] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Map className="w-full h-full text-blue-400" strokeWidth={0.5} />
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Live Container <span className="text-blue-400">Tracking</span></h2>
          </div>
          
          <div className="bg-[#020617] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-full bg-blue-500/5 blur-3xl pointer-events-none" />
            
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Ship className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-widest">MSC-U77892</h3>
                  <p className="text-sm text-white/50">40ft High Cube Container</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-lg font-bold text-sm uppercase flex items-center gap-2 border border-[#D4AF37]/30">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" /> In Transit - Ocean
              </div>
            </div>

            {/* Dashboard Tracking Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 -z-0" />
              <div className="hidden md:block absolute top-1/2 left-0 w-[60%] h-[2px] bg-blue-500 -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)] -z-0" />
              
              {[
                { label: "Container Loaded", time: "Nov 02", port: "New York", done: true },
                { label: "Port Departure", time: "Nov 05", port: "NYC Terminal", done: true },
                { label: "Ocean Transit", time: "Current Status", port: "Mid-Atlantic", done: true, active: true },
                { label: "Customs Clearance", time: "Est. Nov 22", port: "Rotterdam", done: false },
                { label: "Final Delivery", time: "Est. Nov 25", port: "Amsterdam HQ", done: false },
              ].map((milestone, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left bg-[#020617] md:bg-transparent p-2 md:p-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 border-4 border-[#020617] 
                    ${milestone.active ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : milestone.done ? 'bg-white/40' : 'bg-white/10'}`}
                  >
                    {milestone.done && !milestone.active && <CheckCircle className="w-4 h-4 text-[#020617]" />}
                  </div>
                  <p className={`font-bold text-sm ${milestone.active ? 'text-blue-400' : milestone.done ? 'text-white' : 'text-white/40'}`}>{milestone.label}</p>
                  <p className="text-xs text-[#D4AF37] font-medium">{milestone.port}</p>
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
          <div className="bg-[#0A0F1C] rounded-3xl p-8 md:p-12 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.05)] relative overflow-hidden">
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Sea Freight Quote</h2>
              <p className="text-white/60">Provide your cargo details to receive an instant, accurate estimate from our maritime logistics team.</p>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Origin Port/City</label>
                  <input type="text" required className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors" placeholder="e.g. Los Angeles, USA" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Destination Port/City</label>
                  <input type="text" required className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors" placeholder="e.g. Lagos, Nigeria" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Service Type</label>
                  <select className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                    <option>Full Container Load (FCL)</option>
                    <option>Less Than Container (LCL)</option>
                    <option>Vehicle Shipping (RoRo)</option>
                    <option>Bulk / Break Bulk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Estimated Volume (CBM) / Details</label>
                  <input type="text" className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors" placeholder="e.g. 20 CBM or '1x SUV'" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-lg flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6" /> Lock In Quote via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section className="py-24 px-6 bg-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The Shipping Process</h2>
            <p className="text-white/50 text-lg">Four steps to seamless international logistics.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/20 via-blue-500/50 to-blue-500/20 -z-0" />
            
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-[#020617] border-2 border-blue-500/50 rounded-xl flex items-center justify-center text-xl font-bold text-blue-400 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Business Freight Solutions */}
      <section className="py-24 px-6 relative bg-[#020617]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative h-96 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image src="/images/sea_freight_b2b_1779128953546.png" alt="Commercial Container Port" fill className="object-cover" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase border border-blue-500/20 mb-6">
                <Briefcase className="w-3 h-3" /> B2B Logistics
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Business Freight <span className="text-[#D4AF37]">Solutions</span></h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed font-light">
                We empower commercial distributors, importers, and exporters with dedicated supply chain logistics. From warehouse consolidation to managing recurring container shipments, we scale with your business.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0A0F1C] border border-white/5 p-4 rounded-xl"><p className="text-white font-bold">Recurring Shipments</p></div>
                <div className="bg-[#0A0F1C] border border-white/5 p-4 rounded-xl"><p className="text-white font-bold">Warehouse Consolidation</p></div>
                <div className="bg-[#0A0F1C] border border-white/5 p-4 rounded-xl"><p className="text-white font-bold">Container Management</p></div>
                <div className="bg-[#0A0F1C] border border-white/5 p-4 rounded-xl"><p className="text-white font-bold">Supply Chain Logistics</p></div>
              </div>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/10 transition-all w-full sm:w-auto">
                Corporate Inquiry <ArrowRight className="w-5 h-5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Section 10: Testimonials */}
      <section className="py-24 px-6 bg-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted <span className="text-blue-400">Globally</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#020617] rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col xl:flex-row"
              >
                <div className="relative h-64 xl:h-auto xl:w-2/5 shrink-0">
                  <Image src={test.image} alt="Customer Delivery" fill className="object-cover" />
                </div>
                <div className="p-8 xl:w-3/5 flex flex-col justify-center">
                  <p className="text-white/80 italic leading-relaxed mb-6 font-light">"{test.quote}"</p>
                  <p className="font-bold text-white/90 uppercase tracking-wider text-xs text-[#D4AF37]">— {test.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <section className="py-24 px-6 relative bg-[#020617]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0A0F1C] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left outline-none"
                >
                  <span className={`font-medium text-lg ${openFaq === idx ? 'text-white' : 'text-white/70'}`}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-400' : 'text-white/30'}`} />
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 leading-tight text-white">Ship Globally With <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#D4AF37]">Reliable Ocean Freight</span></h2>
            <p className="text-xl text-white/50 mb-12 relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
              Affordable international cargo solutions built for businesses, relocations, and global trade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link href="#quote" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Get Shipping Quote
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 text-white font-medium px-10 py-5 rounded-xl border border-white/10 transition-all text-lg backdrop-blur-sm flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
