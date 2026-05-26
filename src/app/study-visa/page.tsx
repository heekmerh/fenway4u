"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  GraduationCap, BookOpen, FileText, CheckCircle, Globe, Plane, 
  MapPin, Clock, DollarSign, ChevronDown, MessageCircle, ArrowRight,
  ShieldCheck, Zap, HeadphonesIcon, Award, Search, Sparkles, Mail
} from "lucide-react";

// --- Data Structures ---

const whatWeHelpWith = [
  {
    title: "University Selection",
    desc: "We help identify the best schools based on budget, goals, and visa strength.",
    icon: GraduationCap,
  },
  {
    title: "Admission Processing",
    desc: "Assistance with applications, document submission, and offer letters.",
    icon: BookOpen,
  },
  {
    title: "Visa Documentation",
    desc: "Preparation of SOPs, financial proofs, sponsorship letters, and more.",
    icon: FileText,
  },
  {
    title: "Visa Application",
    desc: "Step-by-step guidance for filing, biometrics, and interviews.",
    icon: ShieldCheck,
  },
  {
    title: "Scholarship Assistance",
    desc: "Discover grants, bursaries, and funding opportunities.",
    icon: Award,
  },
  {
    title: "Pre-Departure Support",
    desc: "Travel guidance, accommodation, and packing tips.",
    icon: Plane,
  }
];

const countries = [
  {
    name: "Canada",
    flag: "🇨🇦",
    highlights: ["Post-Graduate Work Permit", "PR Pathways", "High-Quality Education"],
    stats: { tuition: "$15k - $30k CAD/yr", processing: "8 - 12 Weeks" }
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    highlights: ["Shorter Degree Duration", "Graduate Route Visa", "Globally Recognized"],
    stats: { tuition: "£12k - £25k/yr", processing: "3 - 4 Weeks" }
  },
  {
    name: "United States",
    flag: "🇺🇸",
    highlights: ["Top-Ranked Universities", "STEM Opportunities", "Networking Advantages"],
    stats: { tuition: "$20k - $50k USD/yr", processing: "4 - 8 Weeks" }
  }
];

const processSteps = [
  { title: "Consultation", desc: "We assess your background, finances, and goals." },
  { title: "School Application", desc: "Apply to suitable and prestigious institutions." },
  { title: "Visa Preparation", desc: "Document review and application guidance." },
  { title: "Approval & Travel", desc: "Travel preparation and relocation assistance." }
];

const documents = [
  { name: "International Passport", detail: "Must be valid for at least 6 months beyond your intended stay." },
  { name: "Academic Transcripts", detail: "Official records from your previous educational institutions." },
  { name: "WAEC/NECO/IELTS", detail: "Standardized test scores proving English proficiency and academic readiness." },
  { name: "Bank Statements", detail: "Proof of sufficient funds to cover tuition and living expenses." },
  { name: "Sponsor Letter", detail: "Notarized letter from your financial sponsor confirming support." },
  { name: "Admission Letter", detail: "Unconditional offer letter from your chosen university." }
];

const successStories = [
  {
    name: "Sarah M.",
    country: "Canada",
    school: "University of Toronto",
    story: "INTMOVE made my Canadian dream a reality. Their SOP guidance was unmatched!",
    image: "/images/success_story_canada_1778964878996.png"
  },
  {
    name: "David K.",
    country: "United Kingdom",
    school: "Imperial College London",
    story: "I got my UK visa in just 2 weeks. The team was supportive every step of the way.",
    image: "/images/success_story_uk_1778964891370.png"
  },
  {
    name: "Amara J.",
    country: "United States",
    school: "NYU",
    story: "Navigating the US visa process seemed daunting, but they simplified everything perfectly.",
    image: "/images/success_story_us_1778964904364.png"
  }
];

const faqs = [
  { q: "How long does the process take?", a: "Processing times vary by country, typically taking between 3 to 12 weeks after application submission." },
  { q: "Can I work while studying?", a: "Yes, most countries allow international students to work part-time (e.g., 20 hours/week) during sessions." },
  { q: "What if my visa gets refused?", a: "We meticulously review all documents to minimize risk, but if refused, we assist with reapplications or appeals." },
  { q: "Do I need IELTS?", a: "It depends on the country and university. We'll guide you on exemptions or test preparation if required." },
  { q: "Can you help with scholarships?", a: "Absolutely! We actively help our students find and apply for relevant scholarships and grants." }
];

export default function StudyVisaPage() {
  const [openDoc, setOpenDoc] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#0B132B] min-h-screen font-sans text-white pb-20">
      


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero_study_abroad_1778964865442.png" 
            alt="International Student" 
            fill 
            className="object-cover opacity-20 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B] via-[#0B132B]/80 to-[#0B132B]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" /> Trusted Education Consultants
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Study Abroad With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3C332]">Confidence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            End-to-end guidance for students pursuing education opportunities in Canada, the United Kingdom, and the United States. Your future starts here.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))} className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#F3C332] text-[#0B132B] font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2">
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </button>
            <Link href="#" className="w-full sm:w-auto glass text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-center">
              Start Your Application
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interactive Tool Highlights */}
      <section className="py-12 border-y border-white/5 bg-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <Search className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-bold text-white">University Search</h4>
                <p className="text-sm">Find the perfect program & ranking</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-bold text-white">Tuition Estimator</h4>
                <p className="text-sm">Calculate study and living costs</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-bold text-white">AI Student Assistant</h4>
                <p className="text-sm">Instant answers to your queries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: What We Help With */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Help With</h2>
            <p className="text-white/60">From application to arrival, we simplify the journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeHelpWith.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-xl flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Countries We Support */}
      <section className="py-24 px-6 bg-[#0B132B] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Countries We Support</h2>
            <p className="text-white/60">Explore top destinations for international students.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {countries.map((country, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-3xl p-8 border border-white/10 hover:border-[#D4AF37]/50 transition-colors relative overflow-hidden group"
              >
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
                    <p className="text-xs text-white/40 mb-1">Avg Tuition</p>
                    <p className="font-semibold text-sm">{country.stats.tuition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Processing</p>
                    <p className="font-semibold text-sm">{country.stats.processing}</p>
                  </div>
                </div>
                
                <Link href="#" className="w-full block text-center bg-white/5 hover:bg-[#D4AF37] hover:text-[#0B132B] border border-white/10 hover:border-transparent py-3 rounded-xl font-bold transition-all">
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Our Process */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-white/60">A streamlined approach to secure your academic future.</p>
          </div>
          
          <div className="relative">
            {/* Horizontal Line connecting steps */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full" />
            <div className="hidden md:block absolute top-1/2 left-0 w-1/3 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent -translate-y-1/2 rounded-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-[#0B132B] border-4 border-[#D4AF37] rounded-full flex items-center justify-center text-xl font-bold text-[#D4AF37] relative z-10 mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 & 5: Document Checklist & Why Choose Us */}
      <section className="py-24 px-6 bg-white/5 border-y border-white/5">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Checklist */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Document Checklist</h2>
            <div className="space-y-4">
              {documents.map((doc, idx) => (
                <div key={idx} className="glass border border-white/10 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setOpenDoc(openDoc === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-white/90">{doc.name}</span>
                    <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${openDoc === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openDoc === idx && (
                    <div className="px-6 pb-4 text-sm text-white/60">
                      {doc.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Personalized Guidance", desc: "Tailored advice for every unique student journey.", icon: Globe },
                { title: "High Attention to Detail", desc: "Thorough document review to ensure 100% compliance.", icon: ShieldCheck },
                { title: "Fast Communication", desc: "Quick updates and dedicated support team.", icon: Zap },
                { title: "Relocation Support", desc: "We assist you long after your visa is approved.", icon: HeadphonesIcon },
              ].map((item, idx) => (
                <div key={idx} className="glass p-6 rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/5 to-transparent">
                  <item.icon className="w-8 h-8 text-[#D4AF37] mb-4" />
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Success Stories */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-white/60">Join thousands of students who achieved their study abroad dreams.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-3xl overflow-hidden border border-white/10"
              >
                <div className="relative h-64 w-full">
                  <Image src={story.image} alt={story.name} fill className="object-cover" />
                  <div className="absolute top-4 right-4 bg-[#0B132B]/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#D4AF37]">
                    {story.country}
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-white/80 italic mb-6">"{story.story}"</p>
                  <div>
                    <p className="font-bold text-white">{story.name}</p>
                    <p className="text-sm text-[#D4AF37]">{story.school}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass border border-white/10 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-8 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-[#D4AF37]/30">
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">Your International Education Journey Starts Here</h2>
            <p className="text-xl text-white/70 mb-10 relative z-10 max-w-2xl mx-auto">
              Let us simplify the process and help you achieve your study abroad dreams with expert, tailored guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))} className="bg-gradient-to-r from-[#D4AF37] to-[#F3C332] text-[#0B132B] font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
                Book Free Consultation
              </button>
              <a href="https://t.me/fenway4u_visa" target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-[#0088cc] to-[#24A1DE] hover:from-[#24A1DE] hover:to-[#0088cc] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(36,161,222,0.3)] flex items-center justify-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.47-.8-.26-1.42-.4-1.36-.85.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.11.17.26.19.37.01.07.03.22.02.39z"/>
                </svg>
                Chat on Telegram
              </a>
              <a href="mailto:consult@fenway4u.com?subject=Study Visa Academic Advisory Request — INTMOVE&body=Hi INTMOVE Visa Team,%0A%0AI would like to request academic study visa advisory support.%0A%0AName:%0ACountry of Interest:%0AIntended Course:%0A%0AThank you." className="glass text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 text-[#D4AF37]" /> Email An Advisor
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
