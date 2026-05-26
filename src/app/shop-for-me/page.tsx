"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ShoppingBag, Package, Smartphone, Car, Shirt, 
  Coffee, Gift, Heart, Star, Search, ShieldCheck, 
  Globe, Truck, ChevronDown, ArrowRight, MessageCircle, 
  UploadCloud, Compass, CreditCard, Building2, MapPin
} from "lucide-react";

// --- Data Structures ---

const howItWorks = [
  { step: "01", title: "Send Product Link", desc: "Share the URL, description, or your shopping list from Amazon, Best Buy, Walmart, or African local markets.", icon: Search },
  { step: "02", title: "We Purchase It", desc: "Our personal shoppers buy the item, verify its condition, and receive it at our secure international warehouse.", icon: CreditCard },
  { step: "03", title: "Packaging & Shipping", desc: "Items are meticulously inspected, securely packaged, and shipped via our global logistics network.", icon: Package },
  { step: "04", title: "Delivery To You", desc: "Enjoy fast, tracked doorstep delivery anywhere in the world.", icon: Truck }
];

const whatWeBuy = [
  { 
    title: "Electronics & Gadgets", 
    desc: "iPhones, gaming consoles, laptops, and smart TVs.", 
    icon: Smartphone,
    color: "from-blue-500/20 to-cyan-500/5",
    border: "group-hover:border-blue-500/50"
  },
  { 
    title: "Vehicles & Car Parts", 
    desc: "Auction vehicles, luxury cars, and hard-to-find auto parts.", 
    icon: Car,
    color: "from-purple-500/20 to-fuchsia-500/5",
    border: "group-hover:border-purple-500/50"
  },
  { 
    title: "Fashion & Luxury Goods", 
    desc: "Designer stores, outlet malls, and luxury brand sourcing.", 
    icon: Shirt,
    color: "from-[#D4AF37]/20 to-yellow-500/5",
    border: "group-hover:border-[#D4AF37]/50"
  },
  { 
    title: "Furniture & Home", 
    desc: "Office furniture, luxury home décor, and kitchen appliances.", 
    icon: Compass,
    color: "from-emerald-500/20 to-teal-500/5",
    border: "group-hover:border-emerald-500/50"
  }
];

const premiumServices = [
  { title: "Personal Shopper Service", desc: "Dedicated assistant, product recommendations, and price comparisons for busy professionals.", icon: UserIcon },
  { title: "Gift Purchase & Delivery", desc: "Buy gifts internationally, add personalized messages, and request premium packaging.", icon: Gift },
  { title: "Exclusive Item Sourcing", desc: "We find rare or hard-to-get products like sold-out electronics or limited luxury bags.", icon: Star },
  { title: "Bulk Buying Assistance", desc: "Sourcing wholesale inventory and commercial goods for resellers and small businesses.", icon: Building2 },
  { title: "African Care Packages", desc: "Emotional 'Taste of Home' boxes, student survival packages, and local snacks.", icon: Heart },
  { title: "Warehouse Consolidation", desc: "Combine multiple orders to reduce shipping costs and store items temporarily.", icon: Package }
];

const africanMarketplace = [
  { title: "Authentic Ingredients", desc: "Garri, Egusi, Fufu, Yam Flour, Dried Fish, Spices, and Palm Oil.", tag: "Most Requested" },
  { title: "Local Snacks & Beverages", desc: "Milo, Plantain Chips, Cabin Biscuits, and regional favorites.", tag: "Nostalgic" },
  { title: "Traditional Fabrics", desc: "Ankara, Lace, Aso Oke, and custom tailored traditional wear.", tag: "Cultural" },
  { title: "International Groceries to Africa", desc: "Imported chocolates, cereals, baby products, and supplements sent back home.", tag: "Global -> Local" }
];

const destinations = [
  { name: "Canada", desc: "Electronics, winter clothing, supplements.", flag: "🇨🇦" },
  { name: "United Kingdom", desc: "Fashion, appliances, groceries.", flag: "🇬🇧" },
  { name: "United States", desc: "Apple products, gaming equipment, luxury retail.", flag: "🇺🇸" },
  { name: "Africa", desc: "Local foods, traditional items, handmade goods.", flag: "🌍" }
];

const testimonials = [
  {
    quote: "I sent them a link for a sold-out MacBook in the US. They sourced it, bought it, and shipped it to me in Lagos perfectly.",
    author: "Tech Entrepreneur, Nigeria"
  },
  {
    quote: "Living in Canada, I missed authentic Nigerian food. The 'Taste of Home' care package they put together for me actually made me cry.",
    author: "Sarah O., Student in Toronto"
  },
  {
    quote: "I use their bulk buying service to stock my boutique in London with authentic African fabrics. Flawless service every time.",
    author: "Boutique Owner, UK"
  }
];

const faqs = [
  { q: "Can you buy products on my behalf?", a: "Yes. You simply send us the link or tell us what you want, and our personal shoppers will purchase it using our local payment methods." },
  { q: "Which countries do you ship to?", a: "We ship globally, with specialized high-speed routes covering the US, UK, Canada, and across Africa." },
  { q: "Can I request specific African foods?", a: "Absolutely. Our 'African Care Package' service sources authentic local foods, spices, and snacks directly from local markets and ships them to you internationally." },
  { q: "Do you combine multiple packages?", a: "Yes. We offer warehouse consolidation. You can buy items from multiple stores, and we will package them into a single shipment to save you money." },
  { q: "How long does delivery take?", a: "Depending on the shipping method chosen (Air or Sea) and the destination, delivery can take anywhere from 3 to 14 days after we receive the item at our warehouse." },
  { q: "Can businesses use this service?", a: "Yes, we offer Bulk Buying Assistance to help businesses and resellers source wholesale inventory internationally." }
];

// Helper icons
function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

export default function ShopForMePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = encodeURIComponent("Hi, I want to use the Shop For Me service. Here are the details of what I want to buy: ");
    window.open(`https://wa.me/1234567890?text=${whatsappMsg}`, '_blank');
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#0a0a0a]">
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center group hover:scale-110">
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden px-6 bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0">
          {/* Animated Background Gradients instead of Image for clean luxury UI */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          
          {/* Animated floating elements */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-[10%] w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hidden md:flex"
          >
            <ShoppingBag className="w-10 h-10 text-[#D4AF37]" />
          </motion.div>

          <motion.div 
            animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 right-[25%] w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hidden lg:flex"
          >
            <Package className="w-8 h-8 text-blue-400" />
          </motion.div>

          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-[35%] w-16 h-16 bg-[#D4AF37]/10 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center shadow-2xl hidden xl:flex"
          >
            <Gift className="w-6 h-6 text-[#D4AF37]" />
          </motion.div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold mb-8 uppercase tracking-widest backdrop-blur-md"
            >
              <Star className="w-4 h-4" /> Global Concierge
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white"
            >
              Buy Anything <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">From Anywhere</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed font-light max-w-2xl"
            >
              Your personal international buying assistant. We purchase, receive, package, and ship luxury products, electronics, and emotional care packages globally.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#request" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 text-lg">
                Request A Purchase <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="bg-white/5 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm group">
                <Truck className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" /> Get Shipping Estimate
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Features Placeholder Banner */}
      <div className="border-y border-white/5 bg-[#111] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-12 relative z-10 text-white/50 text-sm font-medium tracking-widest uppercase">
          <span className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors"><Search className="w-4 h-4 text-blue-400" /> AI Product Hunt</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><CreditCard className="w-4 h-4 text-green-400" /> Smart Currency Converter</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-colors"><Heart className="w-4 h-4 text-[#D4AF37]" /> Save to Wishlist</span>
        </div>
      </div>

      {/* Section 1: How It Works Timeline */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How The Service Works</h2>
            <p className="text-white/50 text-lg">Four steps to receiving your international items.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/50 to-[#D4AF37]/10 -z-0" />
            
            {howItWorks.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-[#0a0a0a] border-2 border-[#D4AF37]/40 rounded-xl flex items-center justify-center text-xl font-bold text-[#D4AF37] mb-6 shadow-[0_0_15px_rgba(212,175,55,0.15)] group hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: What We Can Buy (Focus on emotional African Foods) */}
      <section className="py-24 px-6 relative bg-[#111] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Source <span className="text-[#D4AF37]">For You</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {whatWeBuy.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 transition-all group relative overflow-hidden ${item.border}`}
              >
                <div className={`absolute -inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <item.icon className="w-10 h-10 text-white/80 group-hover:text-white mb-6 relative z-10 transition-colors" />
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Dedicated African Care Package Banner */}
          <div className="bg-gradient-to-r from-orange-900/40 to-red-900/20 border border-orange-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-64 h-full bg-orange-500/10 blur-3xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md border border-orange-500/30 mb-4">
                  <Heart className="w-3 h-3 fill-orange-400" /> Highly Emotional Service
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">African Foods & <br/>Care Packages</h2>
                <p className="text-xl text-white/80 italic font-light mb-6">"A taste of home, delivered worldwide."</p>
                <p className="text-white/60 mb-8 leading-relaxed">
                  For Africans abroad, we source authentic Garri, Egusi, Yam Flour, spices, and local snacks directly from local markets and ship them fresh to your door in the US, UK, or Canada.
                </p>
                <Link href="#request" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all">
                  Request Taste of Home <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-center">
                  <Coffee className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="font-bold text-sm text-white/90">Local Snacks & Beverages</p>
                </div>
                <div className="bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-center">
                  <Package className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="font-bold text-sm text-white/90">Student Survival Boxes</p>
                </div>
                <div className="bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-center col-span-2">
                  <p className="font-bold text-sm text-white/90 mb-1">International Groceries to Africa</p>
                  <p className="text-xs text-white/50">Send imported chocolates & baby products back home.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: African Marketplace Experience UI */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">The Marketplace</h2>
              <p className="text-white/50">Trending requests & cultural aesthetics.</p>
            </div>
            <button className="text-[#D4AF37] hover:text-white font-medium flex items-center gap-2 transition-colors mt-4 md:mt-0">
              View All Categories <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {africanMarketplace.map((item, idx) => (
              <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-colors relative group">
                <div className="absolute top-4 right-4 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  {item.tag}
                </div>
                <div className="w-12 h-12 bg-[#0a0a0a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-white/70" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Premium Services */}
      <section className="py-24 px-6 relative bg-[#111] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Concierge <span className="text-[#D4AF37]">Services</span></h2>
            <p className="text-white/50 text-lg">Eye-catching services designed for convenience and luxury.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumServices.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 hover:border-[#D4AF37]/20 transition-colors relative overflow-hidden"
              >
                <service.icon className="w-8 h-8 text-[#D4AF37] mb-6" />
                <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Live Product Request Form (WhatsApp Funnel) */}
      <section id="request" className="py-24 px-6 relative bg-[#0a0a0a]">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Product Request</h2>
              <p className="text-white/60">Paste a URL or describe what you need. Our personal shoppers will get you a quote instantly.</p>
            </div>

            <form onSubmit={handleRequestSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Product URL or Item Description</label>
                <textarea rows={3} required className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors resize-none" placeholder="e.g. https://amazon.com/iphone15 OR 'Please source 5 bags of Ijebu Garri...'" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Destination Country</label>
                  <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Nigeria / Africa</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Urgency / Shipping Preference</label>
                  <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                    <option>Express Air (Fastest)</option>
                    <option>Standard Delivery</option>
                    <option>Sea Freight (Bulk/Cheapest)</option>
                  </select>
                </div>
              </div>

              {/* Fake Upload Area for UI Polish */}
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-white/30 transition-colors cursor-pointer bg-white/5">
                <UploadCloud className="w-8 h-8 text-white/30 mx-auto mb-2" />
                <p className="text-sm text-white/50">Upload screenshots of the item (Optional)</p>
              </div>

              <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-lg flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6" /> Connect With Concierge on WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section 6: Shopping Destinations */}
      <section className="py-24 px-6 relative bg-[#111] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Top Sourcing Destinations</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#D4AF37]/30 transition-colors">
                <div className="text-5xl mb-4">{dest.flag}</div>
                <h3 className="font-bold text-lg mb-2">{dest.name}</h3>
                <p className="text-sm text-white/50">{dest.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted Worldwide</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111] rounded-3xl p-8 border border-white/5 relative"
              >
                <div className="text-[#D4AF37] text-4xl font-serif absolute top-4 left-6 opacity-20">"</div>
                <p className="text-white/80 italic leading-relaxed mb-6 font-light relative z-10 pt-4">"{test.quote}"</p>
                <p className="font-bold text-white/90 text-sm text-[#D4AF37]">— {test.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="py-24 px-6 relative bg-[#111] border-y border-white/5">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
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

      {/* Section 9: Final CTA */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-3xl p-12 md:p-24 text-center relative overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 leading-tight text-white">Shop Globally <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Without Limits</span></h2>
            <p className="text-xl text-white/50 mb-12 relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
              From electronics and luxury products to African groceries and personal gifts — we bring the world to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link href="#request" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Start Shopping
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 text-white font-medium px-10 py-5 rounded-xl border border-white/10 transition-all text-lg backdrop-blur-sm flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
