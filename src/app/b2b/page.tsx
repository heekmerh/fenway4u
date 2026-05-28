"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, ShieldCheck, Ship, Plane, Compass, Award, 
  ArrowRight, CheckCircle2, ChevronRight, FileSpreadsheet, 
  Clock, DollarSign, Send, Loader2, Phone, MessageSquare, Mail 
} from "lucide-react";
import Image from "next/image";

interface B2BService {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  desc: string;
  benefits: string[];
  specs: string[];
  color: string;
  glow: string;
}

export default function B2BCommercialPage() {
  const [activeService, setActiveService] = useState<string>("import");
  
  // Freight Calculator State
  const [calcState, setCalcState] = useState({
    cargoType: "lcl",
    weight: 500,
    origin: "lagos",
    destination: "toronto",
    priority: "standard"
  });

  // Onboarding Form State
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "e-commerce",
    volume: "monthly-pallets",
    frequency: "monthly",
    customsRequired: "yes",
    notes: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const b2bServices: B2BService[] = [
    {
      id: "import",
      title: "Import Consulting",
      subtitle: "Regulatory & Compliance Guidance",
      icon: Briefcase,
      desc: "Navigate international trade regulations, customs code tariffs, and legal certifications without friction. We review documentation beforehand to ensure zero impound delays at global ports.",
      benefits: [
        "Phytosanitary certification vetting",
        "HS Code tariff lookup & optimization",
        "Anti-dumping duty and escrow audits",
        "Pre-customs clearance verification"
      ],
      specs: [
        "Accuracy Rate: 99.8%",
        "Response SLA: Under 4 Hours",
        "Compliance Scope: Canada, UK, USA, Africa"
      ],
      color: "text-[#D4AF37]",
      glow: "shadow-[#D4AF37]/10 border-[#D4AF37]/25"
    },
    {
      id: "sourcing",
      title: "Supplier Sourcing",
      subtitle: "Manufacturer Vetting & Audits",
      icon: Compass,
      desc: "Find verified, premium manufacturers of raw goods, agricultural commodities, fashion textiles, and custom items across Africa. We conduct physical factory audits to guarantee quality standards.",
      benefits: [
        "On-site quality control inspections",
        "Price & production term negotiations",
        "Sample acquisition and courier testing",
        "Supplier reputation background checks"
      ],
      specs: [
        "Active Manufacturers: 120+",
        "Vetting Checkpoints: 24-point audit",
        "Product Sectors: Agriculture, Textiles, Home Decor"
      ],
      color: "text-blue-400",
      glow: "shadow-blue-500/10 border-blue-500/25"
    },
    {
      id: "wholesale",
      title: "Wholesale Logistics",
      subtitle: "Bulk Cargo & Consolidation",
      icon: Ship,
      desc: "Optimize shipping costs through consolidated bulk freight scheduling. We handle FCL/LCL ocean container shipping, priority air charter lines, and secure warehouse consolidation at key diaspora portals.",
      benefits: [
        "LCL (Less than Container Load) consolidation",
        "FCL (Full Container Load) direct chartering",
        "Cold-chain refrigerated food shipping",
        "Diaspora warehouse palletizing and sorting"
      ],
      specs: [
        "Global Warehouses: 4 Core Hubs",
        "Ocean Transit: 28-35 Days",
        "Priority Air Cargo: 3-5 Days"
      ],
      color: "text-emerald-400",
      glow: "shadow-emerald-500/10 border-emerald-500/25"
    },
    {
      id: "partnerships",
      title: "Freight Partnerships",
      subtitle: "E-Commerce & Retail Integrations",
      icon: Plane,
      desc: "Strategic long-term shipping agreements for recurring retailers, wholesalers, and e-commerce brands. Access locked-in low rates, dedicated supply managers, and VIP custom queues.",
      benefits: [
        "Locked-in annual volume discount rates",
        "Dedicated logistics account managers",
        "Priority cargo sifting during peak seasons",
        "Custom API tracking feeds for retailers"
      ],
      specs: [
        "Member Discount: Up to 25% Off",
        "Queue Priority: Tier 1 Immediate",
        "API Integration: Yes (Custom Webhook)"
      ],
      color: "text-purple-400",
      glow: "shadow-purple-500/10 border-purple-500/25"
    }
  ];

  // Freight Pricing Calculations
  const calculateFreightQuote = () => {
    let baseRate = 2.5; // per KG or unit modifier
    if (calcState.cargoType === "pallet") baseRate = 380;
    else if (calcState.cargoType === "container-20") baseRate = 3400;
    else if (calcState.cargoType === "container-40") baseRate = 5800;

    let multiplier = 1.0;
    if (calcState.origin === "lagos" && calcState.destination === "toronto") multiplier = 1.25;
    else if (calcState.origin === "lagos" && calcState.destination === "london") multiplier = 1.15;
    else if (calcState.origin === "lagos" && calcState.destination === "newyork") multiplier = 1.35;

    let weightCost = 0;
    if (calcState.cargoType === "lcl") {
      weightCost = calcState.weight * 5.2; // $5.2 per KG
    } else if (calcState.cargoType === "pallet") {
      weightCost = calcState.weight * 0.8 * baseRate;
    } else {
      weightCost = baseRate; // flat container rate
    }

    let prioritySurcharge = 0;
    if (calcState.priority === "express") prioritySurcharge = calcState.cargoType === "lcl" ? 150 : 600;

    const totalCost = Math.round(weightCost * multiplier + prioritySurcharge);
    return {
      freight: Math.round(weightCost * multiplier),
      priority: prioritySurcharge,
      total: totalCost
    };
  };

  const quoteBreakdown = calculateFreightQuote();

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Submit mailto trigger
      const subject = encodeURIComponent(`B2B Corporate Onboarding Request — ${formData.companyName}`);
      const bodyText = `Hi FENWAY4U B2B team,

We would like to request corporate B2B onboarding support.

Company Name: ${formData.companyName}
Contact Representative: ${formData.contactName}
Email Address: ${formData.email}
Phone Number: ${formData.phone}
Business Industry: ${formData.industry}
Target Shipping Volume: ${formData.volume}
Frequency: ${formData.frequency}
Customs Clearance Advisory Needed: ${formData.customsRequired}

Miscellaneous Notes:
${formData.notes}

Sent via FENWAY4U Corporate B2B Portal.`;

      window.location.href = `mailto:b2b@fenway4u.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    }, 1500);
  };

  const selectedService = b2bServices.find(s => s.id === activeService)!;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-hidden pt-24 pb-20">
      
      {/* Background blobs for luxury depth */}
      <div className="absolute top-[10%] left-[-10%] w-[550px] h-[550px] bg-[#D4AF37]/5 blur-[160px] -z-10 rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[550px] h-[550px] bg-blue-500/5 blur-[160px] -z-10 rounded-full" />
      <div className="absolute bottom-[10%] left-[20%] w-[550px] h-[550px] bg-purple-500/5 blur-[160px] -z-10 rounded-full" />

      {/* Cinematic Hero */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-white/5 bg-[#090909]/60">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10" />
          <Image 
            src="/images/sea_freight_test_1_1779128965828.png" 
            alt="Cinematic Container Port Terminal"
            fill
            className="object-cover opacity-20 pointer-events-none"
            priority
          />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>Enterprise Commercial Network</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight text-white">
              Luxury Logistics <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Built For Scale</span>
            </h1>
            <p className="text-white/60 text-lg font-light max-w-3xl mx-auto leading-relaxed">
              Wholesale freight, custom clearing audits, raw supplier vetting, and long-term freight partnerships. Optimize your global supply chains between Africa and diaspora corridors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <a 
              href="#estimator" 
              className="bg-[#D4AF37] text-black font-extrabold px-8 py-4 rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all uppercase text-xs tracking-wider"
            >
              Freight Cost Estimator
            </a>
            <a 
              href="#onboarding"
              className="bg-white/5 text-white font-extrabold px-8 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors uppercase text-xs tracking-wider"
            >
              Corporate Onboarding
            </a>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Services Console */}
      <section className="py-24 px-6 container mx-auto max-w-7xl relative z-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-5xl font-black">B2B Service <span className="text-[#D4AF37]">Console</span></h2>
          <p className="text-white/40 text-xs font-light">Select an enterprise sector to explore features, metrics, and compliance guidelines.</p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-black/40 border border-white/5 p-2 rounded-2xl max-w-4xl mx-auto">
          {b2bServices.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer
                  ${activeService === s.id 
                    ? "bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] shadow-xl" 
                    : "bg-transparent border border-transparent text-white/50 hover:text-white"}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Service Display Grid */}
        <div className={`bg-[#0c0c0c] border rounded-3xl p-6 md:p-10 shadow-2xl transition-all duration-300 max-w-5xl mx-auto ${selectedService.glow}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Description Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-widest">{selectedService.subtitle}</span>
                <h3 className="text-2xl md:text-3xl font-black text-white">{selectedService.title}</h3>
              </div>
              
              <p className="text-white/60 text-sm leading-relaxed font-light">
                {selectedService.desc}
              </p>

              {/* Bullet list benefits */}
              <div className="space-y-3.5">
                <h4 className="text-[10px] font-black uppercase text-white/40 tracking-wider">Enterprise Inclusions</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-white/70 font-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Specs Column (5 cols) */}
            <div className="lg:col-span-5 bg-black/60 border border-white/5 p-6 rounded-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl pointer-events-none" />
              
              <div className="space-y-1 border-b border-white/5 pb-4">
                <span className="text-[9px] uppercase tracking-wider font-bold text-white/30">Service Performance</span>
                <h4 className="text-sm font-bold text-white">SLA Benchmarks & Thresholds</h4>
              </div>

              <div className="space-y-3.5">
                {selectedService.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-white/50 font-light">{spec.split(":")[0]}</span>
                    <span className="font-mono font-bold text-[#D4AF37]">{spec.split(":")[1]}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a 
                  href="#onboarding"
                  className="w-full bg-white/5 hover:bg-[#D4AF37] text-white hover:text-black font-extrabold py-3.5 rounded-xl border border-white/10 hover:border-transparent transition-all uppercase text-[10px] tracking-widest text-center block cursor-pointer"
                >
                  Onboard For {selectedService.title}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Freight Quote Estimator Widget */}
      <section id="estimator" className="py-24 px-6 border-y border-white/5 bg-[#090909]/80 relative z-20">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-5xl font-black">Interactive Freight <span className="text-[#D4AF37]">Estimator</span></h2>
            <p className="text-white/40 text-xs font-light">Configure shipment matrices to evaluate freight bulk container and shipping estimates.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Controls Column (7 cols) */}
            <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
              
              {/* Cargo Classification */}
              <div>
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">1. Cargo & Freight Classification</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "lcl", label: "LCL Loose Box" },
                    { id: "pallet", label: "Consolidated Pallet" },
                    { id: "container-20", label: "20ft FCL Container" },
                    { id: "container-40", label: "40ft FCL Container" }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setCalcState({...calcState, cargoType: c.id})}
                      className={`py-2.5 px-1 rounded-xl border text-[10px] font-bold transition-all truncate cursor-pointer
                        ${calcState.cargoType === c.id 
                          ? "bg-blue-600/10 border-blue-500 text-blue-400" 
                          : "bg-black border-white/5 text-white/50 hover:border-white/20"}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Modifier */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest">2. Total Cargo Gross Weight (Est.)</label>
                  <span className="text-xs font-bold text-white font-mono">{calcState.weight} KG</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="15000"
                  step="50"
                  value={calcState.weight}
                  onChange={(e) => setCalcState({...calcState, weight: Number(e.target.value)})}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              {/* Routing lanes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2.5">3. Origin Hub</label>
                  <select 
                    value={calcState.origin}
                    onChange={(e) => setCalcState({...calcState, origin: e.target.value})}
                    className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                  >
                    <option value="lagos">Lagos, Nigeria Hub (LOS)</option>
                    <option value="accra">Accra, Ghana Hub (ACC)</option>
                    <option value="nairobi">Nairobi, Kenya Hub (NBO)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2.5">4. Destination Corridor</label>
                  <select 
                    value={calcState.destination}
                    onChange={(e) => setCalcState({...calcState, destination: e.target.value})}
                    className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                  >
                    <option value="toronto">Toronto, Canada (YYZ)</option>
                    <option value="london">London, United Kingdom (LHR)</option>
                    <option value="newyork">New York, USA (JFK)</option>
                  </select>
                </div>
              </div>

              {/* Shipping priority */}
              <div>
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">5. Logistics Urgency Speed</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "standard", label: "Standard Ocean/Air Routing" },
                    { id: "express", label: "Priority Expedited Charter" }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setCalcState({...calcState, priority: p.id})}
                      className={`py-3 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer
                        ${calcState.priority === p.id 
                          ? "bg-purple-600/10 border-purple-500 text-purple-400 font-bold" 
                          : "bg-black border-white/5 text-white/50 hover:border-white/20"}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Invoice Column (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-white/5 to-[#050505] border border-[#D4AF37]/35 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
              
              <div>
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#D4AF37]" /> Bulk Freight Invoice Estimate
                </h4>
                
                <div className="space-y-4 text-xs border-b border-white/5 pb-5">
                  <div className="flex justify-between">
                    <span className="text-white/60 font-light">Base Freight Cargo Fees</span>
                    <span className="font-mono text-white">${quoteBreakdown.freight.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 font-light">Priority Speed Surcharge</span>
                    <span className="font-mono text-white">${quoteBreakdown.priority.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 font-light">Customs Entry Filing (Est.)</span>
                    <span className="font-mono text-emerald-400">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60 font-light">B2B Member Subsidy</span>
                    <span className="font-mono text-purple-400">-10% Applied</span>
                  </div>
                </div>

                <div className="pt-5 flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">Total Retainer Estimate</span>
                  <div className="text-right">
                    <span className="text-3xl font-black font-mono text-[#D4AF37] tracking-tight">
                      ${Math.round(quoteBreakdown.total * 0.9).toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold text-white/30 block mt-0.5">USD Retainer</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <a 
                  href="#onboarding"
                  className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all uppercase text-xs tracking-wider text-center block cursor-pointer"
                >
                  Book Bulk Freight shipment
                </a>
                <p className="text-[9px] text-white/30 text-center leading-relaxed font-light">
                  Estimates exclude remote area delivery fees or unique customs structural duties.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Account Manager simulated live panel & timeline HUD */}
      <section className="py-24 px-6 container mx-auto max-w-6xl relative z-20 space-y-12">
        <div className="bg-[#0c0c0c] border border-white/5 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Account Manager card (4 cols) */}
            <div className="lg:col-span-4 bg-black/60 border border-white/5 p-6 rounded-2xl space-y-4 text-center">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border border-[#D4AF37]">
                <Image 
                  src="/images/tech_gadget_sourcing_1779859399098.png" 
                  alt="Senior B2B Account Lead"
                  fill
                  className="object-cover pointer-events-none scale-110 opacity-90"
                />
              </div>
              
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">David Adeleke</h4>
                <p className="text-[9px] uppercase tracking-wider font-black text-[#D4AF37]">Global Account Director</p>
              </div>

              <p className="text-[10px] text-white/50 leading-relaxed font-light">
                David has over 8 years managing containerized consolidation lanes between Nigeria, Canada, and USA ports.
              </p>

              {/* Direct links */}
              <div className="flex gap-2 justify-center pt-2">
                <a href="mailto:consult@fenway4u.com" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center text-white/70">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="tel:+1000000000" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center text-white/70">
                  <Phone className="w-4 h-4" />
                </a>
                <a href="https://t.me/fenway4u" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center text-white/70">
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Active Freight Timeline Tracker (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-widest font-black text-[#D4AF37]">Global Control Room</span>
                <h3 className="text-xl font-black text-white mt-0.5">Live Freight Route status</h3>
                <p className="text-white/40 text-xs font-light mt-1">Simulated status feed for cargo carrier F4U-882 (Kano to Houston Ocean Consolidation).</p>
              </div>

              {/* Vertical timelines */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                {[
                  { step: "Port Houston Arrival", desc: "US Customs & Border Protection entry documents cleared. Moving to inland distribution yard.", time: "Scheduled: May 30", active: true, done: false },
                  { step: "Lagos Port Departure", desc: "Sea freight carrier loaded with FCL 20ft custom textiles. Clearance approved.", time: "Completed: May 12", active: false, done: true },
                  { step: "Kano Factory Vetting", desc: "Audit checks completed at Kaduna/Kano weaving factories. Cargo verified and packed.", time: "Completed: May 02", active: false, done: true }
                ].map((t, idx) => (
                  <div key={idx} className="flex gap-4 items-start relative">
                    <div className="flex flex-col items-center shrink-0">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border
                        ${t.done && "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"}
                        ${t.active && "bg-blue-500/10 border-blue-500/35 text-blue-400 animate-pulse"}
                      `}>
                        {t.done ? "✓" : "⏳"}
                      </span>
                      {idx < 2 && <div className="w-[1px] h-10 bg-white/10 mt-1" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h4 className="text-xs font-black text-white">{t.step}</h4>
                        <span className="text-[9px] text-white/30 font-mono">{t.time}</span>
                      </div>
                      <p className="text-[10px] text-white/50 leading-relaxed font-light">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Onboarding Multi-Step Form */}
      <section id="onboarding" className="py-24 px-6 relative z-20">
        <div className="container mx-auto max-w-3xl bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-widest">Partner Onboarding</span>
            <h2 className="text-3xl font-black text-white">B2B Corporate Application</h2>
            <p className="text-white/40 text-xs font-light">Apply for locked wholesale logistics rates, vetted sourcing channels, and custom clearances.</p>
          </div>

          <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden mb-8 relative">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-[#D4AF37] transition-all duration-300"
              style={{ width: `${(formStep / 3) * 100}%` }}
            />
          </div>

          {/* Form Content */}
          {!formSubmitted ? (
            <form onSubmit={handleOnboardingSubmit} className="space-y-6">
              
              {formStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Step 1: Corporate Profile</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-black">Company Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                        placeholder="e.g. Amina Textiles LLC"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-black">Contact Representative</label>
                      <input 
                        required
                        type="text" 
                        value={formData.contactName}
                        onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-black">Work Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-black">Phone Number (WhatsApp/Telegram)</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3.5 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Step 2: Freight & Sourcing Matrix</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-black">Industry Classification</label>
                      <select 
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                      >
                        <option value="e-commerce">E-Commerce Retailer</option>
                        <option value="agriculture">Agricultural Importer</option>
                        <option value="fashion">Fashion & Textile Brand</option>
                        <option value="electronics">Devices Wholesaler</option>
                        <option value="raw-butter">Organic Materials / Shea Butter</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-black">Expected Shipping Volume</label>
                      <select 
                        value={formData.volume}
                        onChange={(e) => setFormData({...formData, volume: e.target.value})}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                      >
                        <option value="monthly-lcl">Loose boxes monthly (under 300 KG)</option>
                        <option value="monthly-pallets">Multiple Pallets / Consolidated monthly</option>
                        <option value="monthly-20">20ft Ocean Container monthly</option>
                        <option value="monthly-40">40ft Ocean Container monthly</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-black">Shipping Frequency</label>
                      <select 
                        value={formData.frequency}
                        onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                      >
                        <option value="one-time">One-time shipment</option>
                        <option value="monthly">Monthly recurring</option>
                        <option value="biweekly">Bi-weekly freight</option>
                        <option value="quarterly">Quarterly consolidation</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/50 uppercase font-black">Customs Clearance Support Needed?</label>
                      <select 
                        value={formData.customsRequired}
                        onChange={(e) => setFormData({...formData, customsRequired: e.target.value})}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
                      >
                        <option value="yes">Yes, complete brokerage needed</option>
                        <option value="no">No, we have an active customs broker</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {formStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Step 3: Sourcing Specifications</h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-white/50 uppercase font-black">Detailed Sourcing Vetting & Freight Requirements</label>
                    <textarea 
                      required
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full bg-black border border-white/5 rounded-xl p-4 text-xs text-white/80 focus:border-[#D4AF37] outline-none h-32 resize-none"
                      placeholder="List any Kano/Lagos manufacturing hubs, cargo specs, volume schedules, or customs clearances required."
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-4">
                {formStep > 1 ? (
                  <button 
                    type="button"
                    onClick={() => setFormStep(prev => prev - 1)}
                    className="px-6 py-3 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors text-xs font-extrabold uppercase tracking-widest cursor-pointer"
                  >
                    Back
                  </button>
                ) : <div />}

                {formStep < 3 ? (
                  <button 
                    type="button"
                    onClick={() => setFormStep(prev => prev + 1)}
                    className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black hover:bg-yellow-400 transition-all text-xs font-extrabold uppercase tracking-widest cursor-pointer"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-[#D4AF37] to-amber-500 text-black hover:opacity-90 font-extrabold transition-all text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Corporate Application</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Application Sifted Successfully</h3>
                <p className="text-white/50 text-xs font-light max-w-sm mx-auto leading-relaxed">
                  Your corporate details have been compiled and sent to our wholesale logistics desk. An account director will reach out within 4 business hours.
                </p>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </section>

    </div>
  );
}
