"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Smartphone, Laptop, Tv, Gamepad2, Camera, ShieldCheck, 
  Plane, Ship, Home, Box, FileCheck, CheckCircle, 
  ChevronDown, MessageCircle, ArrowRight, UploadCloud,
  Zap, Building2, MapPin, Search, Lock, Mail
} from "lucide-react";

// --- Data Structures ---

const whatWeShip = [
  { title: "Smartphones", desc: "iPhones, Samsung Galaxy, Google Pixel, and high-end mobile devices.", icon: Smartphone },
  { title: "Laptops & Computers", desc: "MacBooks, gaming PCs, office systems, and peripherals.", icon: Laptop },
  { title: "Televisions", desc: "Smart TVs, OLED/QLED displays, and home entertainment setups.", icon: Tv },
  { title: "Gaming Consoles", desc: "PlayStation 5, Xbox Series X, Nintendo Switch, and VR systems.", icon: Gamepad2 },
  { title: "Home Appliances", desc: "Smart microwaves, high-end refrigerators, and automated vacuums.", icon: Home },
  { title: "Cameras & Studio Gear", desc: "Professional DSLRs, lenses, lighting equipment, and drones.", icon: Camera }
];

const shippingOptions = [
  {
    title: "Air Freight",
    icon: Plane,
    bestFor: "Urgent deliveries, premium electronics.",
    features: ["Faster transit (3-5 days)", "Priority handling", "Express doorstep delivery"]
  },
  {
    title: "Sea Freight",
    icon: Ship,
    bestFor: "Bulk electronics, large TVs, appliances.",
    features: ["Cost-effective for heavy items", "Container shipping", "Large-volume capacity"]
  },
  {
    title: "Door-to-Door",
    icon: MapPin,
    bestFor: "Ultimate convenience and safety.",
    features: ["Pickup from origin", "Full packaging", "Customs clearance included"]
  }
];

const safetyFeatures = [
  { title: "Secure Packaging", desc: "We use anti-shock foam, reinforced outer boxes, and waterproof materials.", icon: Box },
  { title: "Shipment Insurance", desc: "Full coverage against damage, loss, or theft during international transit.", icon: ShieldCheck },
  { title: "Real-Time Tracking", desc: "Monitor your shipment status and exact location 24/7 via our portal.", icon: Search },
  { title: "Customs Assistance", desc: "We handle all declarations, import regulations, and clearance fees.", icon: FileCheck }
];

const processSteps = [
  { step: "01", title: "Submit Request", desc: "Enter item details, dimensions, and your destination country." },
  { step: "02", title: "Packaging & Inspection", desc: "We inspect and securely prepare your electronics for safe transit." },
  { step: "03", title: "International Transit", desc: "Your items fly or sail securely via our trusted logistics network." },
  { step: "04", title: "Customs & Delivery", desc: "We clear customs and deliver the package directly to your door." }
];

const countries = [
  { name: "Canada", flag: "🇨🇦", popular: ["iPhones", "Gaming Systems", "OLED TVs"] },
  { name: "United Kingdom", flag: "🇬🇧", popular: ["Home Appliances", "Studio Equipment", "Bundles"] },
  { name: "United States", flag: "🇺🇸", popular: ["Apple Products", "Gaming PCs", "Entertainment"] }
];

const testimonials = [
  {
    quote: "My 65-inch OLED TV arrived perfectly intact. The packaging was incredibly secure.",
    author: "Michael R.",
    image: "/images/testimonial_tv_1779126360743.png",
    rating: 5
  },
  {
    quote: "Used the Shop For Me service to get the new iPhone from the US. Fast, reliable, and exactly as promised.",
    author: "Sarah L.",
    image: "/images/testimonial_iphone_1779126374105.png",
    rating: 5
  }
];

const faqs = [
  { q: "How long does electronics shipping take?", a: "Air freight typically takes 3-7 business days, while sea freight can take 3-6 weeks depending on the destination." },
  { q: "Are my electronics fully insured?", a: "Yes. We offer comprehensive insurance that covers the full declared value of your electronics against loss, theft, or damage." },
  { q: "Do you ship large, fragile items like TVs?", a: "Absolutely. We use custom crating, anti-shock foam, and reinforced packaging specifically designed for large screens." },
  { q: "Can you buy products on my behalf?", a: "Yes! Use our 'Shop For Me' service. Just send us the link (Amazon, BestBuy, Apple), and we'll purchase and ship it to you." },
  { q: "Which countries do you deliver to?", a: "We ship globally, with our most popular routes originating from the USA, UK, and Canada to destinations worldwide." },
  { q: "Do you handle customs clearance?", a: "Yes, our door-to-door service includes full customs brokerage. We handle the paperwork and notify you of any duties owed." }
];

export default function ElectronicsShippingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [shopUrl, setShopUrl] = useState("");

  const handleShopForMeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Shop For Me Purchasing Order — FENWAY4U");
    const bodyText = `Hi FENWAY4U Sourcing Concierge Team,

I would like to use the Shop For Me concierge service to buy electronics.

Details:
- Product Store Link: ${shopUrl}

Thank you.`;
    const body = encodeURIComponent(bodyText);
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="bg-[#030712] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#030712]">
      


      {/* Sticky Quote Button (Desktop) */}
      <div className="fixed top-24 right-0 z-40 hidden lg:block">
        <Link href="#quote" className="bg-gradient-to-r from-[#D4AF37] to-[#F3C332] hover:from-[#F3C332] hover:to-[#D4AF37] text-black font-bold py-3 px-6 rounded-l-full shadow-lg transition-transform hover:-translate-x-2 flex items-center gap-2">
          Request Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden px-6 bg-[#030712]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-[#030712]" />
          <Image 
            src="/images/hero_electronics_shipping_1779126332225.png" 
            alt="Secure electronics warehouse" 
            fill 
            className="object-cover opacity-25 object-center mix-blend-screen pointer-events-none"
          />
          
          {/* Animated Scanning Line */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.5)] z-0 hidden md:block" 
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold mb-8 uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              <Lock className="w-4 h-4" /> Premium Secure Logistics
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white"
            >
              Secure Global <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#D4AF37] to-blue-400 animate-gradient-x">Electronics Shipping</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed font-light"
            >
              Fast, safe, and reliable international shipping for phones, laptops, televisions, gaming consoles, appliances, and high-value tech.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#quote" className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 text-lg">
                Request Shipping Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="bg-white/5 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm group">
                <Search className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" /> Track Shipment
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Features Placeholder Banner */}
      <div className="border-y border-white/5 bg-[#0A0F1C] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-3xl" />
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center md:justify-between gap-6 relative z-10">
          <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-pointer group">
            <Zap className="w-5 h-5 text-[#D4AF37] group-hover:animate-pulse" />
            <span className="font-medium text-sm tracking-wide">AI Shipping Assistant (Beta)</span>
          </div>
          <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-pointer group">
            <Search className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
            <span className="font-medium text-sm tracking-wide">Advanced Tracking Portal</span>
          </div>
        </div>
      </div>

      {/* Section 1: What We Ship */}
      <section className="py-24 px-6 relative bg-[#030712]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">High-Value Cargo <span className="text-[#D4AF37]">We Protect</span></h2>
            <p className="text-white/50 text-lg">Specialized handling for delicate and expensive electronics.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeShip.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0A0F1C] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 hover:bg-[#0D1526] transition-all group relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="flex items-center gap-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] uppercase font-bold px-2 py-1 rounded">
                    <ShieldCheck className="w-3 h-3" /> Insured
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Safety & Protection */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-[#030712] to-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-green-500/20">
                Zero Compromise
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Your Electronics Are <br /><span className="text-[#D4AF37]">Safe With Us</span></h2>
              <p className="text-white/60 text-lg mb-10 leading-relaxed font-light">
                We understand the value of your technology. Our logistics network is engineered specifically to prevent damage, theft, and delays.
              </p>
              
              <div className="space-y-6">
                {safetyFeatures.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#111A2E] flex items-center justify-center shrink-0 border border-white/10 text-[#D4AF37]">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-white/90">{feature.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-full border border-blue-500/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] animate-[spin_60s_linear_infinite]" />
              <div className="aspect-square rounded-full border border-[#D4AF37]/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] animate-[spin_40s_linear_infinite_reverse]" />
              
              <div className="bg-[#0D1526] rounded-3xl p-8 border border-white/10 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                  <span className="font-mono text-blue-400 font-bold">TRK-892441-X</span>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-bold uppercase">In Transit</span>
                </div>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-0.5 before:bg-white/10">
                  <div className="relative flex items-center gap-6">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 z-10 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                      <CheckCircle className="w-4 h-4 text-[#0D1526]" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Origin Facility</p>
                      <p className="text-xs text-white/40">Packaged with anti-shock foam</p>
                    </div>
                  </div>
                  <div className="relative flex items-center gap-6 opacity-50">
                    <div className="w-6 h-6 rounded-full bg-white/20 border-2 border-[#0D1526] shrink-0 z-10" />
                    <div>
                      <p className="font-bold text-white">Customs Clearance</p>
                      <p className="text-xs text-white/40">Pending arrival at destination port</p>
                    </div>
                  </div>
                  <div className="relative flex items-center gap-6 opacity-50">
                    <div className="w-6 h-6 rounded-full bg-white/20 border-2 border-[#0D1526] shrink-0 z-10" />
                    <div>
                      <p className="font-bold text-white">Out for Delivery</p>
                      <p className="text-xs text-white/40">Secure doorstep handover</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Shipping Options */}
      <section className="py-24 px-6 relative bg-[#030712]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Tailored <span className="text-[#D4AF37]">Logistics</span></h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {shippingOptions.map((opt, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0A0F1C] border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-colors"
              >
                <opt.icon className="w-10 h-10 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-2">{opt.title}</h3>
                <p className="text-white/60 text-sm mb-6 pb-6 border-b border-white/5">Best for: {opt.bestFor}</p>
                
                <ul className="space-y-4">
                  {opt.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/80 font-light">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37]" /> {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Shop For Me Service */}
      <section className="py-24 px-6 relative bg-[#0A0F1C] border-y border-white/5">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none z-0">
          <Image src="/images/shop_for_me_electronics_1779126348241.png" alt="Premium electronics boxes" fill className="object-cover mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C] via-[#0A0F1C]/90 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-[#D4AF37]/20 uppercase tracking-widest">
              Premium Concierge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Can't Buy It Yourself? <br />We'll <span className="text-blue-400">Buy & Ship It</span> For You.</h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed font-light">
              Want the latest Apple device or a laptop from Best Buy US, but they don't accept your card? Paste the product URL below. We buy it, receive it, and ship it directly to you.
            </p>
            
            <form onSubmit={handleShopForMeSubmit} className="bg-[#030712]/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
              <label className="block text-sm font-medium text-white/70 mb-2">Paste Product Link (Amazon, Best Buy, Apple, etc.)</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <UploadCloud className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input 
                    type="url" 
                    required 
                    value={shopUrl}
                    onChange={(e) => setShopUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500 focus:bg-white/10 transition-colors" 
                    placeholder="https://www.amazon.com/dp/..." 
                  />
                </div>
                <button type="submit" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] whitespace-nowrap flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" /> Request via Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Section 6: Countries We Ship From */}
      <section className="py-24 px-6 relative bg-[#030712]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Global <span className="text-blue-400">Origins</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {countries.map((country, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0A0F1C] rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="text-5xl mb-6">{country.flag}</div>
                <h3 className="text-2xl font-bold mb-6 text-white/90">{country.name}</h3>
                
                <p className="text-white/40 text-sm mb-3 uppercase tracking-wider">Popular Exports:</p>
                <div className="flex flex-wrap gap-2">
                  {country.popular.map((item, i) => (
                    <span key={i} className="bg-white/5 border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-lg">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="py-24 px-6 bg-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-white/50 text-lg">Four simple steps to global delivery.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/20 via-[#D4AF37]/50 to-blue-500/20 -z-0" />
            
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-[#030712] border-2 border-blue-500/30 rounded-xl flex items-center justify-center text-xl font-bold text-blue-400 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Business & Bulk Shipping */}
      <section className="py-24 px-6 relative bg-[#030712]">
        <div className="container mx-auto max-w-5xl text-center">
          <Building2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Business & Bulk Shipping</h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto font-light">
            Are you an electronics retailer, wholesaler, or commercial importer? We provide dedicated container shipping, pallet consolidation, and recurring logistics services.
          </p>
          <a href="mailto:consult@fenway4u.com?subject=Contact Electronics B2B Logistics Sales — FENWAY4U" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/10 transition-all text-lg">
            Contact B2B Sales <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Section 9: Testimonials */}
      <section className="py-24 px-6 bg-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Proven <span className="text-blue-400">Reliability</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#030712] rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col sm:flex-row"
              >
                <div className="relative h-64 sm:h-auto sm:w-2/5 shrink-0">
                  <Image src={test.image} alt="Delivery Success" fill className="object-cover" />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                  <div className="flex gap-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />)}
                  </div>
                  <p className="text-white/80 italic leading-relaxed mb-6 font-light">"{test.quote}"</p>
                  <p className="font-bold text-white/90">— {test.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: FAQ */}
      <section className="py-24 px-6 relative bg-[#030712]">
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

      {/* Section 11: Final CTA */}
      <section id="quote" className="py-24 px-6 bg-[#030712]">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#0A0F1C] to-[#030712] rounded-3xl p-12 md:p-24 text-center relative overflow-hidden border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 leading-tight text-white">Ship Your Electronics <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#D4AF37]">With Confidence</span></h2>
            <p className="text-xl text-white/50 mb-12 relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
              Premium international logistics designed for speed, safety, and reliability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <a href="https://t.me/fenway4u_logistics" target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-[#0088cc] to-[#24A1DE] hover:from-[#24A1DE] hover:to-[#0088cc] text-white font-bold px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_20px_rgba(36,161,222,0.3)] flex items-center justify-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.47-.8-.26-1.42-.4-1.36-.85.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.11.17.26.19.37.01.07.03.22.02.39z"/>
                </svg>
                Telegram Shipping Support
              </a>
              <a href="mailto:consult@fenway4u.com?subject=Electronics Shipping Quote Request — FENWAY4U&body=Hi FENWAY4U Shipping Team,%0A%0AI would like to request an electronics shipping quote.%0A%0AItems to ship:%0AOrigin:%0ADestination:%0A%0AThank you." className="bg-[#0A0F1C]/80 border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 text-lg flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                Email Shipping Department
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Ensure Star component exists or use Lucide
function Star({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  )
}
