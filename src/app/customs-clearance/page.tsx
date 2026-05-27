"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ShieldCheck, FileCheck, Car, Package, Smartphone, User, 
  Clock, TrendingDown, CheckCircle, Search, FileText, 
  MapPin, Anchor, Building2, ShoppingBag, Laptop, Wrench, 
  MessageCircle, ChevronDown, ArrowRight, Scan, Fingerprint,
  Globe, PlaneTakeoff, UploadCloud, Mail
} from "lucide-react";

// --- Data Structures ---

const whatWeHandle = [
  { title: "Import Clearance", desc: "Assistance for imported cargo, commercial inventory, and personal goods.", icon: Globe },
  { title: "Export Processing", desc: "Support for export documentation, shipment declarations, and compliance.", icon: PlaneTakeoff },
  { title: "Vehicle Clearance", desc: "Handling for imported vehicles, auction cars, and dealership shipments.", icon: Car },
  { title: "Commercial Cargo", desc: "Dedicated services for wholesalers, importers, and retail businesses.", icon: Package },
  { title: "High-Value Goods", desc: "Secure processing for electronics, phones, and luxury appliances.", icon: Smartphone },
  { title: "Personal Shipments", desc: "Clearance for relocating families, students, and international shoppers.", icon: User }
];

const whyItMatters = [
  { title: "Avoid Delays", desc: "Incorrect documentation can freeze your shipments at the port. We ensure everything is perfect.", icon: Clock },
  { title: "Prevent Extra Charges", desc: "Proper handling minimizes unnecessary penalties, storage fees, and unexpected taxes.", icon: TrendingDown },
  { title: "Total Compliance", desc: "We ensure all shipments meet complex international import regulations and export laws.", icon: ShieldCheck },
  { title: "Faster Cargo Release", desc: "Professional brokerage significantly speeds up customs clearance and final delivery.", icon: CheckCircle }
];

const servicesIncluded = [
  { title: "Documentation Prep", desc: "Support with commercial invoices, declarations, permits, and shipping paperwork.", icon: FileText },
  { title: "Duty & Tax Guidance", desc: "Clear breakdowns of import duties, VAT, customs taxes, and clearance fees.", icon: CalculatorIcon },
  { title: "Customs Brokerage", desc: "Direct coordination with international customs authorities for smooth processing.", icon: Building2 },
  { title: "Inspection Coordination", desc: "Assistance with physical cargo inspections, verification, and release approvals.", icon: Search }
];

const industries = [
  { name: "Automotive", icon: Car },
  { name: "Retail Trade", icon: ShoppingBag },
  { name: "Electronics", icon: Laptop },
  { name: "Manufacturing", icon: Wrench },
  { name: "Relocation", icon: HomeIcon },
  { name: "E-commerce", icon: Globe }
];

const processSteps = [
  { step: "01", title: "Shipment Review", desc: "We review your cargo details, shipping documents, and destination regulations." },
  { step: "02", title: "Document Processing", desc: "Our experts prepare, verify, and submit all required customs paperwork." },
  { step: "03", title: "Customs Coordination", desc: "We communicate directly with customs authorities and inspection agencies." },
  { step: "04", title: "Cargo Release", desc: "Shipment is legally cleared and released for immediate final delivery." }
];

const countries = [
  { name: "United States", flag: "🇺🇸", ports: ["Los Angeles", "New York", "Miami", "Houston"] },
  { name: "United Kingdom", flag: "🇬🇧", ports: ["London Heathrow", "Felixstowe", "Southampton"] },
  { name: "Canada", flag: "🇨🇦", ports: ["Vancouver", "Toronto", "Montreal", "Halifax"] }
];

const testimonials = [
  {
    quote: "They handled the customs clearance for our entire commercial inventory. Zero delays, zero hidden fees.",
    author: "Logistics Manager, TechRetail Inc.",
    image: "/images/air_freight_test_1_1779128249470.png"
  },
  {
    quote: "Importing a vehicle seemed like a nightmare until they took over. They handled all the VIN verification and duty paperwork perfectly.",
    author: "David M., Private Importer",
    image: "/images/sea_freight_test_1_1779128965828.png"
  }
];

const faqs = [
  { q: "What documents are required for customs clearance?", a: "Typically, you need a Commercial Invoice, Packing List, Bill of Lading (or Airway Bill), and sometimes specific permits depending on the goods." },
  { q: "How long does customs clearance take?", a: "If all documentation is correct, clearance can take anywhere from a few hours to 3 days. Inspections may add additional time." },
  { q: "What fees should I expect?", a: "You can expect to pay Import Duties, VAT (Value Added Tax), customs processing fees, and our standard brokerage fee." },
  { q: "Can you clear imported vehicles?", a: "Yes. We specialize in vehicle customs clearance, handling VIN verifications, duty estimations, and compliance documentation." },
  { q: "Do you handle commercial cargo?", a: "Absolutely. We manage bulk commercial clearances for wholesalers, retailers, and manufacturing importers." },
  { q: "What happens if cargo is delayed by customs?", a: "We immediately contact the authorities to resolve any documentation holds, coordinate inspections, and expedite the release." }
];

// Helper icons
function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <line x1="8" y1="6" x2="16" y2="6"></line>
      <line x1="16" y1="14" x2="16" y2="14.01"></line>
      <line x1="16" y1="18" x2="16" y2="18.01"></line>
      <line x1="12" y1="14" x2="12" y2="14.01"></line>
      <line x1="12" y1="18" x2="12" y2="18.01"></line>
      <line x1="8" y1="14" x2="8" y2="14.01"></line>
      <line x1="8" y1="18" x2="8" y2="18.01"></line>
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}

export default function CustomsClearancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const type = (form.elements[0] as HTMLSelectElement).value;
    const destination = (form.elements[1] as HTMLSelectElement).value;
    const details = (form.elements[2] as HTMLInputElement).value;

    const subject = encodeURIComponent("Customs Clearance Brokerage Request — INTMOVE");
    const bodyText = `Hi INTMOVE Customs Clearance Team,

I need assistance with customs clearance and brokerage.

Details:
- Shipment Type: ${type}
- Destination Country: ${destination}
- Estimated Cargo Value / Details: ${details}

Thank you.`;

    const body = encodeURIComponent(bodyText);
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="bg-[#0f1115] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#0f1115]">
      


      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden px-6 bg-[#0f1115]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/80 to-transparent" />
          <Image 
            src="/images/hero_customs_1779129505412.png" 
            alt="Digital Customs Tracking Portal at Port" 
            fill 
            className="object-cover opacity-35 mix-blend-screen pointer-events-none"
          />
          
          {/* Animated Scanning Line */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.8)] z-0 hidden md:block" 
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold mb-8 uppercase tracking-widest backdrop-blur-md"
            >
              <Fingerprint className="w-4 h-4" /> Trusted Compliance Hub
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white"
            >
              Smooth & Hassle-Free <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#D4AF37]">Customs Clearance</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed font-light"
            >
              Professional customs clearance solutions for international cargo, vehicles, electronics, commercial goods, and personal shipments.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#support" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 text-lg">
                Request Clearance Support <ArrowRight className="w-5 h-5" />
              </Link>
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))} className="bg-white/5 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm group">
                <Mail className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" /> Speak With An Expert
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Features Placeholder Banner */}
      <div className="border-y border-white/5 bg-[#171A21] relative overflow-hidden">
        <div className="absolute left-0 w-32 h-full bg-blue-500/10 blur-2xl" />
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-12 relative z-10 text-white/60 text-sm font-medium tracking-widest uppercase">
          <span className="flex items-center gap-2"><Scan className="w-4 h-4 text-blue-400" /> AI Customs Assistant</span>
          <span className="flex items-center gap-2"><CalculatorIcon className="w-4 h-4 text-[#D4AF37]" /> Duty Calculator</span>
          <span className="flex items-center gap-2"><UploadCloud className="w-4 h-4 text-green-400" /> Secure Document Upload</span>
        </div>
      </div>

      {/* Section 1: What We Handle */}
      <section className="py-24 px-6 relative bg-[#0f1115]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Cargo <span className="text-blue-400">We Clear</span></h2>
            <p className="text-white/50 text-lg">Comprehensive import and export processing across all sectors.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeHandle.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#171A21] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-14 h-14 bg-[#0f1115] border border-white/5 rounded-xl flex items-center justify-center text-white/80 group-hover:text-blue-400 group-hover:scale-110 transition-all">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <ShieldCheck className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Why Customs Clearance Matters */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-[#0f1115] to-[#171A21] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Expert Clearance <span className="text-[#D4AF37]">Matters</span></h2>
            <p className="text-white/50 text-lg">Don't let complex regulations delay your business or relocation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItMatters.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0f1115] p-8 rounded-2xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full" />
                <feature.icon className="w-8 h-8 text-[#D4AF37] mb-6 relative z-10" />
                <h3 className="font-bold text-lg mb-3 relative z-10">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Tracking & Status Updates Portal */}
      <section className="py-24 px-6 bg-[#171A21] border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Real-Time <br/><span className="text-blue-400">Clearance Tracking</span></h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed font-light">
                No more guessing. Our premium digital tracking portal provides transparent, milestone-by-milestone updates on your cargo's customs status.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white/80"><CheckCircle className="w-5 h-5 text-blue-400" /> Instant SMS & Email Notifications</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle className="w-5 h-5 text-blue-400" /> Document Verification Alerts</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle className="w-5 h-5 text-blue-400" /> Live Port Status Updates</li>
              </ul>
            </div>

            <div className="lg:col-span-7 bg-[#0f1115] border border-blue-500/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-widest font-mono">AWB: 884-2199-B</h3>
                  <p className="text-sm text-white/50">Commercial Electronics Shipment</p>
                </div>
                <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded text-xs font-bold uppercase animate-pulse">
                  Under Customs Review
                </div>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:h-full before:w-[2px] before:bg-white/10">
                {[
                  { label: "Documents Received", desc: "Commercial Invoice & Packing List verified.", done: true, active: false },
                  { label: "Duty Assessment", desc: "Taxes and duties calculated and paid.", done: true, active: false },
                  { label: "Under Customs Review", desc: "Awaiting final clearance stamp from authorities.", done: false, active: true },
                  { label: "Cleared for Release", desc: "Pending", done: false, active: false },
                  { label: "Ready For Delivery", desc: "Pending", done: false, active: false },
                ].map((status, idx) => (
                  <div key={idx} className="relative flex items-start gap-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0f1115] z-10
                      ${status.active ? 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : status.done ? 'bg-green-500' : 'bg-white/10'}`}
                    >
                      {status.done && !status.active && <CheckCircle className="w-4 h-4 text-[#0f1115]" />}
                    </div>
                    <div className="pt-1">
                      <p className={`font-bold text-sm ${status.active ? 'text-yellow-400' : status.done ? 'text-white' : 'text-white/40'}`}>{status.label}</p>
                      <p className="text-xs text-white/50 mt-1">{status.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Vehicle Clearance Services */}
      <section className="py-24 px-6 relative bg-[#0f1115]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl">
              <Image src="/images/customs_vehicle_1779129519773.png" alt="Luxury Vehicle Customs Inspection" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] to-transparent opacity-90" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md border border-[#D4AF37]/30 mb-3">
                  <Scan className="w-3 h-3" /> VIP Handling
                </div>
                <h3 className="text-white font-bold text-2xl">Dedicated Vehicle Processing</h3>
              </div>
            </div>
            
            <div>
              <Car className="w-12 h-12 text-[#D4AF37] mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Vehicle Clearance <span className="text-blue-400">Services</span></h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed font-light">
                Importing a vehicle requires strict adherence to regulations. We provide specialized brokerage for luxury cars, auction vehicles, and dealership shipments.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#171A21] border border-white/5 p-4 rounded-xl flex items-center gap-3"><FileCheck className="w-5 h-5 text-[#D4AF37]" /><span className="text-sm font-bold text-white/90">VIN Verification</span></div>
                <div className="bg-[#171A21] border border-white/5 p-4 rounded-xl flex items-center gap-3"><CalculatorIcon className="w-5 h-5 text-[#D4AF37]" /><span className="text-sm font-bold text-white/90">Duty Estimation</span></div>
                <div className="bg-[#171A21] border border-white/5 p-4 rounded-xl flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-[#D4AF37]" /><span className="text-sm font-bold text-white/90">Compliance Docs</span></div>
                <div className="bg-[#171A21] border border-white/5 p-4 rounded-xl flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#D4AF37]" /><span className="text-sm font-bold text-white/90">Port Release</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 & 7: Countries and Industries */}
      <section className="py-24 px-6 relative bg-[#171A21] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Countries/Ports */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Global Networks</h2>
              <div className="space-y-4">
                {countries.map((country, idx) => (
                  <div key={idx} className="bg-[#0f1115] border border-white/5 rounded-2xl p-6 flex items-center gap-6">
                    <div className="text-4xl">{country.flag}</div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{country.name}</h3>
                      <p className="text-sm text-white/50 tracking-wide">MAJOR PORTS: {country.ports.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Industries We Serve</h2>
              <div className="grid grid-cols-2 gap-4">
                {industries.map((ind, idx) => (
                  <div key={idx} className="bg-[#0f1115] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-colors">
                    <ind.icon className="w-8 h-8 text-blue-400 mb-3" />
                    <span className="font-bold text-sm text-white/90">{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 9: Lead Generation Form (Optimized) */}
      <section id="support" className="py-24 px-6 relative bg-[#0f1115]">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-b from-[#171A21] to-[#0f1115] rounded-3xl p-8 md:p-12 border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Clearance Quote</h2>
              <p className="text-white/60">Upload details securely. Our experts will calculate your duties, review documents, and ensure compliance via secure email channels.</p>
            </div>

            <form onSubmit={handleSupportSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Shipment Type</label>
                  <select className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors appearance-none">
                    <option>Commercial Goods (Import/Export)</option>
                    <option>Vehicle Import</option>
                    <option>Personal Effects / Relocation</option>
                    <option>Electronics / High-Value</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Destination Country</label>
                  <select className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors appearance-none">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Other / International</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/70 mb-2">Estimated Cargo Value (USD) / Details</label>
                  <input type="text" className="w-full bg-[#0f1115] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" placeholder="e.g. $45,000 or '2019 Range Rover'" />
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-200/70 font-light">You will be redirected to your secure email client where you can safely attach your Commercial Invoices, Bills of Lading, and IDs.</p>
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-lg flex items-center justify-center gap-2">
                <Mail className="w-6 h-6" /> Connect With Customs Team
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section 5: How It Works Timeline */}
      <section className="py-24 px-6 bg-[#171A21] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Clearance Process</h2>
            <p className="text-white/50 text-lg">Four steps to a legally compliant release.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/50 to-[#D4AF37]/10 -z-0" />
            
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-[#0f1115] border-2 border-[#D4AF37]/40 rounded-xl flex items-center justify-center text-xl font-bold text-[#D4AF37] mb-6 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Testimonials */}
      <section className="py-24 px-6 bg-[#0f1115]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted <span className="text-blue-400">Compliance</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#171A21] rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col sm:flex-row"
              >
                <div className="relative h-48 sm:h-auto sm:w-2/5 shrink-0">
                  <Image src={test.image} alt="Clearance Success" fill className="object-cover" />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                  <p className="text-white/80 italic leading-relaxed mb-6 font-light">"{test.quote}"</p>
                  <p className="font-bold text-white/90 uppercase tracking-wider text-xs text-[#D4AF37]">— {test.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <section className="py-24 px-6 relative bg-[#171A21] border-y border-white/5">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0f1115] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
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
      <section className="py-24 px-6 bg-[#0f1115]">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#171A21] to-[#0f1115] rounded-3xl p-12 md:p-24 text-center relative overflow-hidden border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 leading-tight text-white">Clear Customs <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Without The Stress</span></h2>
            <p className="text-xl text-white/50 mb-12 relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
              Expert customs solutions designed for fast, compliant, and hassle-free international shipping.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link href="#support" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Get Clearance Assistance
              </Link>
              <a href="https://t.me/fenway4u_logistics" target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-[#0088cc] to-[#24A1DE] hover:from-[#24A1DE] hover:to-[#0088cc] text-white font-medium px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_20px_rgba(0,136,204,0.3)] flex items-center justify-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.47-.8-.26-1.42-.4-1.36-.85.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.11.17.26.19.37.01.07.03.22.02.39z"/>
                </svg>
                Telegram Clearance Assistance
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
