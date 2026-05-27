"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Plane, MapPin, Home, Briefcase, FileText, CheckCircle, 
  Search, ShieldCheck, Heart, UserPlus, FileCheck, 
  Car, Clock, Users, ArrowRight, MessageCircle, 
  ChevronDown, PlaneTakeoff, Navigation, Smartphone,
  CreditCard, Compass, Globe, Mail
} from "lucide-react";

// --- Data Structures ---

const mainServices = [
  { title: "Visiting Visa Assistance", desc: "Expert support for tourist, family, and business visitor visas.", icon: PlaneTakeoff },
  { title: "Relocation Planning", desc: "Comprehensive guidance for moving and settling internationally.", icon: Navigation },
  { title: "Family Support", desc: "Specialized visa and travel services for spouses and dependents.", icon: Users },
  { title: "Travel Documentation", desc: "Assistance with passports, insurance, and proof of funds.", icon: FileText },
  { title: "Accommodation Help", desc: "Support finding temporary housing and rental guidance.", icon: Home },
  { title: "Airport Pickup", desc: "Coordinated transportation and immediate arrival assistance.", icon: Car },
  { title: "Settlement Assistance", desc: "Help with SIM cards, banking, and community integration.", icon: Heart }
];

const visaSupport = [
  { title: "Tourist Visas", desc: "End-to-end processing for vacations and temporary travel.", icon: Compass },
  { title: "Family Visit Visas", desc: "Smooth applications for attending ceremonies and reuniting with family.", icon: Heart },
  { title: "Business Visit Visas", desc: "Fast-tracked support for conferences, meetings, and networking.", icon: Briefcase },
  { title: "Invitation Letters", desc: "Guidance on structuring documents to strengthen your application.", icon: FileCheck }
];

const destinations = [
  { name: "Canada", desc: "Visitor visa pathways, relocation support, and multicultural lifestyle guidance.", flag: "🇨🇦" },
  { name: "United Kingdom", desc: "Tourist visits, family reunification, and business travel opportunities.", flag: "🇬🇧" },
  { name: "United States", desc: "Tourism, business visits, and unmatched travel experiences.", flag: "🇺🇸" }
];

const relocationServices = [
  { title: "International Moving", desc: "Logistics and cargo support for a seamless move.", icon: Plane },
  { title: "Housing Guidance", desc: "Find apartments, student housing, or temporary accommodation.", icon: Home },
  { title: "Local Orientation", desc: "Learn the transportation systems, shopping areas, and banking setup.", icon: MapPin },
  { title: "Cultural Transition", desc: "Adjust easily to the climate, lifestyle, and local systems.", icon: Users }
];

const processSteps = [
  { step: "01", title: "Consultation & Assessment", desc: "We review your travel goals, destination, and eligibility." },
  { step: "02", title: "Documentation Prep", desc: "We assist with forms, supporting documents, and review." },
  { step: "03", title: "Application Processing", desc: "Guidance through submission, biometrics, and interview prep." },
  { step: "04", title: "Travel & Settlement", desc: "We provide travel guidance, airport pickup, and relocation support." }
];

const requiredDocuments = [
  { name: "Valid International Passport", desc: "Must be valid for at least 6 months beyond your intended stay." },
  { name: "Proof of Financial Support", desc: "Recent bank statements showing sufficient funds for your trip." },
  { name: "Invitation Letter", desc: "If applicable, a formal letter from your host detailing the visit." },
  { name: "Employment/Business Letter", desc: "Proof of ties to your home country to demonstrate intent to return." },
  { name: "Travel Itinerary", desc: "Flight reservations and planned schedule of activities." },
  { name: "Proof of Accommodation", desc: "Hotel bookings or host's residential proof." }
];

const whyChooseUs = [
  { title: "Personalized Guidance", desc: "Tailored travel and relocation support for your unique needs." },
  { title: "Fast Communication", desc: "Highly responsive support throughout the entire process." },
  { title: "End-to-End Assistance", desc: "We are with you from the visa application all the way to settlement." },
  { title: "Professional Review", desc: "Careful preparation to avoid common application mistakes." }
];

const premiumServices = [
  { title: "VIP Airport Concierge", desc: "Fast-track support, luggage assistance, and airport guidance.", icon: ShieldCheck },
  { title: "Travel Itinerary Planning", desc: "Organize schedules, find affordable flights, and plan stays.", icon: MapPin },
  { title: "SIM & Banking Setup", desc: "Stay connected and access financial services immediately upon arrival.", icon: Smartphone },
  { title: "Vacation Packages", desc: "Optional partnerships for city tours and local experiences.", icon: Compass }
];

const testimonials = [
  {
    quote: "They handled my family's visit visa to the UK perfectly. The invitation letter guidance was exactly what we needed for a quick approval.",
    author: "The Ojo Family",
    image: "/images/success_story_uk_1778964893701.png"
  },
  {
    quote: "My relocation to Canada was so smooth. From sorting out my initial apartment to having a SIM card ready at the airport, they are the best.",
    author: "Daniel E.",
    image: "/images/sea_freight_test_2_1779128978575.png"
  }
];

const faqs = [
  { q: "How long does visitor visa processing take?", a: "Processing times vary by country and embassy volume, typically ranging from 2 weeks to 2 months. We help ensure your application is perfect to avoid unnecessary delays." },
  { q: "Can you help with invitation letters?", a: "Yes, we provide templates and structure guidance to ensure your sponsor's invitation letter meets embassy standards." },
  { q: "Do you assist after arrival?", a: "Absolutely. Our relocation services include airport pickup, temporary housing assistance, and local settlement guidance." },
  { q: "Can families apply together?", a: "Yes, we handle family group applications and dependent visas to ensure you can travel or relocate together." },
  { q: "What documents are required?", a: "Generally, you need a passport, bank statements, proof of ties to your home country, and travel itineraries. We provide a personalized checklist based on your profile." },
  { q: "Do you provide relocation assistance?", a: "Yes, we offer comprehensive relocation support including international moving logistics, housing searches, and cultural orientation." }
];

export default function RelocationSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openDoc, setOpenDoc] = useState<number | null>(null);

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const service = (form.elements[0] as HTMLSelectElement).value;
    const destination = (form.elements[1] as HTMLSelectElement).value;
    const details = (form.elements[2] as HTMLInputElement).value;

    const subject = encodeURIComponent("Global Relocation & Travel Assessment — FENWAY4U");
    const bodyText = `Hi FENWAY4U Relocation Team,

I would like to request a free travel and relocation assessment.

Details:
- Service Needed: ${service}
- Target Destination: ${destination}
- Number of Travelers / Details: ${details}

Thank you.`;

    const body = encodeURIComponent(bodyText);
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="bg-[#020617] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#020617]">
      


      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden px-6 bg-[#020617]">
        <div className="absolute inset-0 z-0">
          {/* Premium CSS Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-[#020617] to-[#020617]" />
          <Image 
            src="/images/hero_relocation_support_1778967828049.png" 
            alt="International relocation support" 
            fill 
            className="object-cover opacity-20 pointer-events-none mix-blend-screen"
          />
          
          {/* Animated Travel Routes / Glowing indicators */}
          <motion.div 
            animate={{ x: [-100, 1000], y: [100, -100] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-0 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_20px_4px_rgba(59,130,246,0.8)] opacity-50 hidden md:block"
          />
          <motion.div 
            animate={{ x: [1000, -100], y: [-50, 150] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 right-0 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_20px_4px_rgba(212,175,55,0.8)] opacity-50 hidden md:block"
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold mb-8 uppercase tracking-widest backdrop-blur-md"
            >
              <Globe className="w-4 h-4" /> Global Transition Partner
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white"
            >
              Move, Visit & Settle Abroad <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#D4AF37]">With Confidence</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed font-light mx-auto max-w-3xl"
            >
              Professional relocation and visiting visa support designed to simplify international travel, temporary stays, and long-term settlement.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="#assessment" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 text-lg">
                Start Your Application <ArrowRight className="w-5 h-5" />
              </Link>
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))} className="bg-white/5 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm group">
                <Mail className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" /> Book Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Features Placeholder Banner */}
      <div className="border-y border-white/5 bg-[#0A0F1C] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-12 relative z-10 text-white/50 text-sm font-medium tracking-widest uppercase">
          <span className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors"><Search className="w-4 h-4 text-blue-400" /> AI Eligibility Assistant</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><CreditCard className="w-4 h-4 text-green-400" /> Travel Cost Estimator</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-colors"><FileCheck className="w-4 h-4 text-[#D4AF37]" /> Relocation Checklist</span>
        </div>
      </div>

      {/* Section 1: Services We Provide */}
      <section className="py-24 px-6 relative bg-[#020617]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Comprehensive <span className="text-blue-400">Support</span></h2>
            <p className="text-white/50 text-lg">End-to-end guidance for every stage of your international journey.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-[#0A0F1C] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden ${idx === 0 ? 'lg:col-span-2' : ''}`}
              >
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
                <service.icon className="w-10 h-10 text-blue-400 mb-6 relative z-10 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3 relative z-10">{service.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm relative z-10">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Visiting Visa Support */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-[#020617] to-[#0A0F1C] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Visiting Visa <span className="text-[#D4AF37]">Support</span></h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed font-light">
                Whether you are traveling for a quick vacation, attending a family wedding, or flying in for a business conference, we ensure your visa application is flawless.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white/80"><CheckCircle className="w-5 h-5 text-green-500" /> Professional eligibility checks</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle className="w-5 h-5 text-green-500" /> Financial proof formatting</li>
                <li className="flex items-center gap-3 text-white/80"><CheckCircle className="w-5 h-5 text-green-500" /> Interview preparation</li>
              </ul>
              <Link href="#assessment" className="inline-flex items-center gap-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] font-bold px-8 py-4 rounded-xl border border-[#D4AF37]/30 transition-all">
                Start Visa Application <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {visaSupport.map((visa, idx) => (
                <div key={idx} className="bg-[#020617] border border-white/10 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-colors group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <visa.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{visa.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{visa.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Destination Countries */}
      <section className="py-24 px-6 relative bg-[#0A0F1C]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Top Destinations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.map((dest, idx) => (
              <div key={idx} className="bg-[#020617] border border-white/5 rounded-3xl p-8 flex flex-col hover:border-blue-500/30 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 text-6xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all z-0">
                  {dest.flag}
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="font-bold text-2xl mb-4 text-white group-hover:text-blue-400 transition-colors">{dest.name}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-8 flex-grow">{dest.desc}</p>
                  <button className="text-sm font-bold text-blue-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore {dest.name} Visas <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 & 5: Relocation Services & Process */}
      <section className="py-24 px-6 relative bg-[#020617] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Relocation Services */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase border border-blue-500/20 mb-6">
                <Home className="w-3 h-3" /> Relocation Support
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Settle In <br/>Seamlessly</h2>
              <div className="space-y-6">
                {relocationServices.map((service, idx) => (
                  <div key={idx} className="bg-[#0A0F1C] border border-white/5 p-6 rounded-2xl flex items-start gap-4">
                    <div className="bg-[#020617] p-3 rounded-xl border border-white/5">
                      <service.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{service.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Process */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Process</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[23px] before:h-full before:w-[2px] before:bg-white/10">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-[#020617] border-2 border-blue-500 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <span className="text-blue-400 font-bold text-sm">{step.step}</span>
                    </div>
                    <div className="pt-2">
                      <h4 className="font-bold text-xl mb-2">{step.title}</h4>
                      <p className="text-white/50 leading-relaxed text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 6: Required Documents (Interactive Checklist) */}
      <section className="py-24 px-6 bg-[#0A0F1C]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Required Documents</h2>
            <p className="text-white/50 text-lg">Prepare these essentials. We will help you structure them perfectly.</p>
          </div>

          <div className="bg-[#020617] border border-white/10 rounded-3xl p-4 md:p-8 shadow-2xl">
            {requiredDocuments.map((doc, idx) => (
              <div key={idx} className="border-b border-white/5 last:border-0">
                <button 
                  onClick={() => setOpenDoc(openDoc === idx ? null : idx)}
                  className="w-full px-4 py-6 flex items-center justify-between text-left outline-none group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-colors ${openDoc === idx ? 'bg-blue-500 border-blue-500 text-white' : 'text-transparent'}`}>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className={`font-medium text-lg transition-colors ${openDoc === idx ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>{doc.name}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openDoc === idx ? 'rotate-180 text-blue-400' : 'text-white/30'}`} />
                </button>
                {openDoc === idx && (
                  <div className="pl-14 pr-8 pb-6 text-white/50 leading-relaxed font-light text-sm">
                    {doc.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 & 8: Why Choose Us & Premium Services */}
      <section className="py-24 px-6 relative bg-[#020617] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Why Choose Us */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUs.map((reason, idx) => (
                  <div key={idx} className="bg-[#0A0F1C] border border-[#D4AF37]/20 p-6 rounded-2xl hover:border-[#D4AF37]/50 transition-colors">
                    <ShieldCheck className="w-8 h-8 text-[#D4AF37] mb-4" />
                    <h4 className="font-bold text-lg mb-2">{reason.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{reason.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Additional Services */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Premium Add-ons</h2>
              <div className="space-y-4">
                {premiumServices.map((service, idx) => (
                  <div key={idx} className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-6 flex items-center gap-6 hover:bg-white/5 transition-colors">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                      <service.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{service.title}</h4>
                      <p className="text-white/50 text-sm">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 9: Lead Generation Form (Assessment) */}
      <section id="assessment" className="py-24 px-6 relative bg-[#0A0F1C]">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-b from-[#020617] to-[#0A0F1C] rounded-3xl p-8 md:p-12 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Free Relocation Assessment</h2>
              <p className="text-white/60">Share your travel goals with us. Our experts will review your eligibility and guide your next steps via secure email channels.</p>
            </div>

            <form onSubmit={handleAssessmentSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Service Needed</label>
                  <select className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors appearance-none">
                    <option>Tourist Visa Application</option>
                    <option>Family Visit Visa</option>
                    <option>Permanent Relocation Guidance</option>
                    <option>Airport & Settlement Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Target Destination</label>
                  <select className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors appearance-none">
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>United States</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/70 mb-2">Number of Travelers / Additional Details</label>
                  <input type="text" className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors" placeholder="e.g. 'Family of 4 traveling for a summer vacation'" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] text-lg flex items-center justify-center gap-2">
                <Mail className="w-6 h-6" /> Send Email Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section 10: Testimonials */}
      <section className="py-24 px-6 bg-[#020617] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Successful <span className="text-[#D4AF37]">Journeys</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0A0F1C] rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col xl:flex-row"
              >
                <div className="relative h-64 xl:h-auto xl:w-2/5 shrink-0">
                  <Image src={test.image} alt="Customer Success" fill className="object-cover" />
                </div>
                <div className="p-8 xl:w-3/5 flex flex-col justify-center relative">
                  <div className="text-[#D4AF37] text-6xl font-serif absolute top-4 left-6 opacity-10">"</div>
                  <p className="text-white/80 italic leading-relaxed mb-6 font-light relative z-10">"{test.quote}"</p>
                  <p className="font-bold text-white/90 tracking-wider text-sm text-blue-400">— {test.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <section className="py-24 px-6 relative bg-[#0A0F1C]">
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
      <section className="py-24 px-6 bg-[#020617] border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#0A0F1C] to-[#020617] rounded-3xl p-12 md:p-24 text-center relative overflow-hidden border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 leading-tight text-white">Your International <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#D4AF37]">Journey Starts Here</span></h2>
            <p className="text-xl text-white/50 mb-12 relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
              From visitor visas to full relocation support — we simplify your move abroad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))} className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Book Consultation
              </button>
              <a href="https://t.me/fenway4u_visa" target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-[#0088cc] to-[#24A1DE] hover:from-[#24A1DE] hover:to-[#0088cc] text-white font-bold px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_20px_rgba(36,161,222,0.3)] flex items-center justify-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.47-.8-.26-1.42-.4-1.36-.85.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.11.17.26.19.37.01.07.03.22.02.39z"/>
                </svg>
                Telegram Relocation Support
              </a>
              <a href="mailto:consult@fenway4u.com?subject=Global Relocation & Travel Assessment — FENWAY4U&body=Hi FENWAY4U Relocation Team,%0A%0AI would like to request a travel and relocation assessment.%0A%0AName:%0ACurrent Location:%0ADestination Country:%0ATimeline:%0A%0AThank you." className="glass text-white font-bold px-10 py-5 rounded-xl hover:bg-white/10 border border-white/20 transition-all flex items-center justify-center gap-3 text-lg">
                <Mail className="w-5 h-5 text-[#D4AF37]" /> Email Travel Advisor
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
