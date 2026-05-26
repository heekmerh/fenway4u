"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Briefcase, CheckCircle, Globe, Plane, 
  MapPin, DollarSign, ChevronDown, MessageCircle, ArrowRight,
  ShieldCheck, Zap, TrendingUp, Building, Stethoscope, Laptop, Wrench, 
  Truck, HardHat, PieChart, Users, Calculator, FileCheck, ClipboardList
} from "lucide-react";

// --- Data Structures ---

const whatWeHelpWith = [
  {
    title: "Eligibility Assessment",
    desc: "Evaluate your education, experience, age, and language skills against target country requirements.",
    icon: FileCheck,
  },
  {
    title: "Employer Sponsorship",
    desc: "Guidance on sponsorship requirements, employer documentation, and job offer verification.",
    icon: Building,
  },
  {
    title: "Job Search Assistance",
    desc: "International CV optimization, LinkedIn revamp, interview prep, and application strategies.",
    icon: Briefcase,
  },
  {
    title: "Application Support",
    desc: "End-to-end guidance for submission, documentation prep, and biometrics scheduling.",
    icon: ShieldCheck,
  },
  {
    title: "Immigration Pathways",
    desc: "Specialized guidance for temporary foreign worker programs, talent visas, and PR routes.",
    icon: TrendingUp,
  },
  {
    title: "Relocation Assistance",
    desc: "Travel preparation, accommodation guidance, and full settlement support post-approval.",
    icon: Plane,
  }
];

const countries = [
  {
    name: "Canada",
    flag: "🇨🇦",
    highlights: ["Express Entry", "Provincial Nominee Programs", "High-demand occupations"],
    stats: { salary: "$60k - $120k CAD", processing: "3 - 6 Months" }
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    highlights: ["Skilled Worker Visa", "Healthcare pathways", "Sponsorship system"],
    stats: { salary: "£40k - £90k", processing: "3 - 8 Weeks" }
  },
  {
    name: "United States",
    flag: "🇺🇸",
    highlights: ["H-1B opportunities", "STEM professions", "Corporate sponsorship"],
    stats: { salary: "$80k - $150k USD", processing: "Variable" }
  }
];

const industries = [
  { name: "Healthcare", icon: Stethoscope, demand: "Critical", salary: "$70k+" },
  { name: "Information Technology", icon: Laptop, demand: "High", salary: "$90k+" },
  { name: "Engineering", icon: Wrench, demand: "High", salary: "$85k+" },
  { name: "Trucking & Logistics", icon: Truck, demand: "Very High", salary: "$60k+" },
  { name: "Construction", icon: HardHat, demand: "High", salary: "$65k+" },
  { name: "Finance", icon: PieChart, demand: "Moderate", salary: "$80k+" }
];

const processSteps = [
  { title: "Consultation & Assessment", desc: "Evaluate skills, qualifications, and immigration goals." },
  { title: "Job & Sponsorship Strategy", desc: "Identify employers, sponsorship options, and strongest pathways." },
  { title: "Documentation & Application", desc: "Assist with forms, supporting documents, and submission." },
  { title: "Approval & Relocation", desc: "Relocation assistance, settlement guidance, and travel prep." }
];

const documents = [
  { name: "Passport", detail: "Valid for at least 6 months beyond the intended period of stay." },
  { name: "CV/Resume", detail: "Optimized for international standards highlighting relevant experience." },
  { name: "Degree Certificates", detail: "Verified educational credentials and transcripts." },
  { name: "Employment Letters", detail: "Reference letters proving previous work experience." },
  { name: "Language Test Results", detail: "IELTS, TEF, or equivalent proving language proficiency." },
  { name: "Job Offer Letter", detail: "Valid offer from a recognized employer in the destination country." }
];

const successStories = [
  {
    profession: "Registered Nurse",
    country: "Canada",
    improvement: "+120% Salary Increase",
    story: "Relocating to Canada transformed my nursing career. The team handled my provincial nomination perfectly.",
    image: "/images/success_nurse_canada_1778965675365.png"
  },
  {
    profession: "Software Engineer",
    country: "United Kingdom",
    improvement: "+80% Salary Increase",
    story: "Moving to London's tech scene was seamless. They helped me land a sponsored role within 2 months.",
    image: "/images/success_engineer_uk_1778965687939.png"
  },
  {
    profession: "Construction Manager",
    country: "United States",
    improvement: "+100% Salary Increase",
    story: "Securing an H-1B visa seemed impossible until I partnered with this incredible team.",
    image: "/images/success_construction_worker_1778965700326.png"
  }
];

const faqs = [
  { q: "Do I need a job offer first?", a: "While having a job offer significantly improves your chances and is required for many visas, some pathways like Canada's Express Entry evaluate you on a points system without a mandatory job offer." },
  { q: "Which countries sponsor foreign workers?", a: "Canada, the UK, the US, and Australia have robust sponsorship systems, especially for in-demand professions like tech, healthcare, and engineering." },
  { q: "Can my family relocate with me?", a: "Yes, most skilled worker visas allow you to bring your spouse and dependent children, often granting them open work permits or study permits." },
  { q: "How long does processing take?", a: "Processing times vary from a few weeks (e.g., UK Skilled Worker Priority) to several months (e.g., Canada Express Entry), depending on the specific pathway and country." },
  { q: "What professions are in demand?", a: "STEM roles, healthcare professionals, skilled trades (construction, plumbing), trucking, and advanced manufacturing are highly sought after globally." },
  { q: "Can work permits lead to permanent residency?", a: "Absolutely. Many countries design their work permit programs as direct stepping stones to Permanent Residency (PR), provided you meet duration and compliance requirements." }
];

export default function WorkPermitPage() {
  const [openDoc, setOpenDoc] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#040814] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#040814]">
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <Link href="#" className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg shadow-green-500/20 transition-all flex items-center justify-center group">
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero_work_permit_1778965659907.png" 
            alt="Corporate Professionals" 
            fill 
            className="object-cover opacity-20 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040814] via-[#040814]/80 to-[#040814]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-medium mb-6 uppercase tracking-wider"
          >
            <Globe className="w-4 h-4" /> Global Career Opportunities
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
          >
            Build Your Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3C332]">Abroad</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Professional work permit guidance and international relocation support for skilled workers, professionals, and global talent.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="#" className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#F3C332] text-[#040814] font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Book Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-full sm:w-auto glass text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 transition-all text-center">
              Check Eligibility
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Advanced Interactive Features Highlights */}
      <section className="py-12 border-y border-white/5 bg-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 blur-3xl rounded-full" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 text-white/80 group cursor-pointer">
              <div className="w-14 h-14 rounded-xl glass border border-[#D4AF37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                <ClipboardList className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg group-hover:text-[#D4AF37] transition-colors">Eligibility Quiz</h4>
                <p className="text-sm text-white/60 mt-1">Discover your best visa pathways in minutes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white/80 group cursor-pointer">
              <div className="w-14 h-14 rounded-xl glass border border-[#D4AF37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                <Calculator className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg group-hover:text-[#D4AF37] transition-colors">Salary Comparison</h4>
                <p className="text-sm text-white/60 mt-1">Compare local vs international benefits.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white/80 group cursor-pointer">
              <div className="w-14 h-14 rounded-xl glass border border-[#D4AF37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                <Zap className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg group-hover:text-[#D4AF37] transition-colors">AI Career Checker</h4>
                <p className="text-sm text-white/60 mt-1">Upload your CV for an instant assessment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: What We Help With */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Help With</h2>
            <p className="text-white/60 text-lg">Comprehensive corporate and individual immigration services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeHelpWith.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors" />
                <div className="w-14 h-14 bg-[#040814] border border-white/10 rounded-xl flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform relative z-10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-white/60 leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Destination Countries */}
      <section className="py-24 px-6 bg-gradient-to-b from-white/5 to-transparent relative border-t border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Destination Countries</h2>
            <p className="text-white/60 text-lg">Top economies actively seeking skilled global talent.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {countries.map((country, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-3xl p-8 border border-white/10 hover:border-[#D4AF37]/50 transition-colors group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#040814] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                <div className="relative z-10">
                  <div className="text-5xl mb-6">{country.flag}</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#D4AF37] transition-colors">{country.name}</h3>
                  
                  <ul className="space-y-3 mb-8">
                    {country.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                        <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 mb-8">
                    <div>
                      <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Est. Salary</p>
                      <p className="font-semibold text-sm text-[#D4AF37]">{country.stats.salary}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Processing</p>
                      <p className="font-semibold text-sm">{country.stats.processing}</p>
                    </div>
                  </div>
                  
                  <Link href="#" className="w-full block text-center bg-white/5 group-hover:bg-[#D4AF37] group-hover:text-[#040814] border border-white/10 group-hover:border-transparent py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(212,175,55,0)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    Explore Pathways
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Industries We Support */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Industries We Support</h2>
              <p className="text-white/60 text-lg">We match specialized talent with global industry demands.</p>
            </div>
            <Link href="#" className="hidden md:flex items-center gap-2 text-[#D4AF37] hover:text-[#F3C332] font-semibold transition-colors mt-4">
              View All Industries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl flex items-center justify-between border border-white/5 hover:border-[#D4AF37]/30 hover:bg-white/5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                    <ind.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">{ind.name}</h4>
                    <p className="text-xs text-[#D4AF37] mt-1">{ind.demand} Demand</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-white/40">Avg Salary</p>
                  <p className="font-semibold">{ind.salary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Our Process */}
      <section className="py-24 px-6 bg-white/5 border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Methodology</h2>
            <p className="text-white/60 text-lg">A structured, corporate approach to global relocation.</p>
          </div>
          
          <div className="relative">
            {/* Horizontal Line connecting steps */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2" />
            <div className="hidden md:block absolute top-1/2 left-0 w-1/3 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/10 -translate-y-1/2 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative text-center group"
                >
                  <div className="w-16 h-16 mx-auto bg-[#040814] border-2 border-white/20 group-hover:border-[#D4AF37] rounded-xl flex items-center justify-center text-xl font-bold text-white group-hover:text-[#D4AF37] relative z-10 mb-6 transition-colors shadow-lg shadow-black/50">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 & 6: Document Checklist & Why Choose Us */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Checklist */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Required Documents</h2>
            <div className="space-y-4">
              {documents.map((doc, idx) => (
                <div key={idx} className="glass border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                  <button 
                    onClick={() => setOpenDoc(openDoc === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <FileCheck className={`w-5 h-5 ${openDoc === idx ? 'text-[#D4AF37]' : 'text-white/40'}`} />
                      <span className={`font-semibold ${openDoc === idx ? 'text-white' : 'text-white/80'}`}>{doc.name}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${openDoc === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openDoc === idx && (
                    <div className="px-6 pb-5 pl-15 text-sm text-white/60 leading-relaxed border-t border-white/5 pt-4 mt-2">
                      {doc.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Why Professionals Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Personalized Pathways", desc: "Bespoke immigration solutions tailored to your career trajectory.", icon: MapPin },
                { title: "Corporate Expertise", desc: "Deep understanding of global labor markets and sponsorship laws.", icon: Building },
                { title: "Rapid Execution", desc: "Agile processing and consistent communication at every step.", icon: Zap },
                { title: "Complete Transition", desc: "Beyond the visa: full relocation and settlement support.", icon: Plane },
              ].map((item, idx) => (
                <div key={idx} className="glass p-8 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 bg-gradient-to-br from-white/5 to-transparent transition-colors group">
                  <item.icon className="w-8 h-8 text-[#D4AF37] mb-5 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Section 7: Success Stories */}
      <section className="py-24 px-6 bg-gradient-to-t from-white/5 to-transparent relative border-t border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional Success Stories</h2>
            <p className="text-white/60 text-lg">Real outcomes from ambitious professionals worldwide.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-3xl overflow-hidden border border-white/10 group hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image src={story.image} alt={story.profession} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/20 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#D4AF37] text-[#040814] px-2 py-0.5 rounded text-xs font-bold">{story.country}</span>
                      <span className="glass px-2 py-0.5 rounded text-xs text-white border border-white/20 font-semibold">{story.improvement}</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="font-bold text-xl mb-4 text-white">{story.profession}</p>
                  <p className="text-white/70 italic text-sm leading-relaxed mb-6">"{story.story}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className={`font-semibold text-lg ${openFaq === idx ? 'text-[#D4AF37]' : 'text-white'}`}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-8 pb-8 text-white/60 leading-relaxed border-t border-white/5 pt-6">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Final CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 leading-tight">Take The Next Step Toward Your <span className="text-[#D4AF37]">International Career</span></h2>
            <p className="text-xl text-white/70 mb-10 relative z-10 max-w-2xl mx-auto">
              We simplify the complex immigration process so you can focus on building your future abroad.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link href="#" className="bg-gradient-to-r from-[#D4AF37] to-[#F3C332] text-[#040814] font-bold px-10 py-5 rounded-xl hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all text-lg">
                Book Consultation
              </Link>
              <Link href="#" className="glass text-white font-bold px-10 py-5 rounded-xl hover:bg-white/10 border border-white/20 transition-all flex items-center justify-center gap-3 text-lg">
                <MessageCircle className="w-6 h-6 text-green-400" /> WhatsApp Support
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
