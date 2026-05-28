"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, Mail, FileText, Search, ArrowRight, Eye, Key, ChevronRight } from "lucide-react";

interface PrivacySection {
  id: string;
  title: string;
  category: string;
  content: string;
  bullets: string[];
}

export default function PrivacyPolicyPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const sections: PrivacySection[] = [
    {
      id: "data-collection",
      title: "1. Information We Collect",
      category: "Personal Details",
      content: "We collect personal details to provide global relocation, customs clearance, and courier freight solutions. This includes profile info, contact details, destination choices, and required immigration visa papers.",
      bullets: [
        "Name, email address, work phone number, and physical mailing address.",
        "Passports, educational transcripts, and bank statements uploaded for travel support.",
        "Cargo dimensions, list of items, and commercial store URLs supplied for Shop For Me concierge purchases."
      ]
    },
    {
      id: "payment-safety",
      title: "2. Payment & Billing Integrity",
      category: "Financial Safety",
      content: "All payments and deposits are handled with strict security protocols. We utilize PCI-DSS compliant third-party gateways (Stripe, PayPal, Wise, Flutterwave) to process transactions safely.",
      bullets: [
        "FENWAY4U servers never store, handle, or serialize your raw debit or credit card details.",
        "Escrow deposits for cargo or relocations are safeguarded in certified partner bank accounts.",
        "Transactions leverage mandatory 3D Secure 2.0 biometric and SMS checks to deflection fraud attempts."
      ]
    },
    {
      id: "cookies-tracking",
      title: "3. Cookies & Local Storage Cache",
      category: "Local Cache Rules",
      content: "We utilize cookies, browser session tokens, and local cache settings to save inquiry form progress and grocery marketplace baskets, ensuring a seamless user experience.",
      bullets: [
        "Checklist progress is serialized inside your local browser cache (`localStorage`) under the key `fenway4u_checklist`.",
        "Food baskets and custom sourcing row builder drafts are cached securely inside your browser session.",
        "We utilize anonymous analytics cookies to track routing traffic and optimize freight lanes."
      ]
    },
    {
      id: "data-protection",
      title: "4. Cryptographic Data Safeguards",
      category: "Isolated cloud storage",
      content: "We implement multi-factor safeguards to prevent data leakage, unauthorized access, or modification. Your files are stored in isolated encrypted cloud storage arrays.",
      bullets: [
        "Standard AES-256 standard encryption keys guard files uploaded onto the FENWAY4U platform.",
        "Uploaded visa documents, SOP copies, and invite files auto-expire in our records within 30 days.",
        "Continuous security penetration monitoring prevents unauthorized API accesses."
      ]
    },
    {
      id: "gdpr-ccpa",
      title: "5. Your Legal Rights (GDPR & CCPA)",
      category: "Legal Compliance",
      content: "Regardless of your region, we respect your rights to complete transparency and data ownership. You have complete rights to view, export, or permanently erase your data.",
      bullets: [
        "Request a complete structural export of all personal details held in FENWAY4U records.",
        "Request the immediate, permanent deletion of your profile, forms, and documents.",
        "Opt-out of any marketing, newsletter subscription lists, or seasonal freight advisories easily."
      ]
    },
    {
      id: "international-laws",
      title: "6. Trans-Border Data Handling",
      category: "Global Operations",
      content: "Since we serve as a bridge between Africa and the global diaspora (Canada, UK, USA), data must clear border checkpoints to compile custom import entries.",
      bullets: [
        "Data is processed in full compliance with Canadian PIPEDA, UK Data Protection Act, and USA Privacy policies.",
        "Consolidated ocean and air manifests are securely dispatched to local border custom clearance agents.",
        "Customs data is archived strictly based on local border control storage compliance guidelines."
      ]
    }
  ];

  // Filter sections by query
  const filteredSections = sections.filter(
    s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-hidden pt-24 pb-20">
      
      {/* Background blobs for luxury ambient depth */}
      <div className="absolute top-[15%] left-[-10%] w-[450px] h-[450px] bg-[#D4AF37]/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />

      {/* Header */}
      <section className="py-16 px-6 border-b border-white/5 bg-[#090909]/40 relative z-20">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            <span>Compliance Integrity</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Privacy & Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Protection</span>
          </h1>
          <p className="text-white/60 text-base font-light max-w-2xl mx-auto leading-relaxed">
            Learn how we encrypt your files, secure trans-continental payments, and manage customs clearance data to connect you safely.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto pt-4">
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal clauses (e.g. 'Stripe', 'delete')"
              className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
            />
          </div>
        </div>
      </section>

      {/* Sticky Grid Layout */}
      <section className="py-16 px-6 container mx-auto max-w-7xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sticky Navigation Sidebar (Left 3 cols) */}
          <div className="lg:col-span-3 lg:sticky lg:top-28 space-y-4 bg-black/40 border border-white/5 p-5 rounded-2xl hidden lg:block">
            <h4 className="text-[10px] uppercase font-black text-white/40 tracking-widest border-b border-white/5 pb-3">
              Document Chapters
            </h4>
            <div className="flex flex-col gap-2.5">
              {sections.map(s => (
                <a 
                  key={s.id}
                  href={`#${s.id}`} 
                  className="text-xs text-white/60 hover:text-[#D4AF37] font-semibold transition-colors py-1 flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37]" />
                  <span>{s.title.substring(3)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal Documents Cards (Right 9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Encryption notification alert */}
            <div className="bg-gradient-to-r from-blue-900/10 to-[#0c0c0c] border border-blue-500/20 p-6 rounded-3xl flex gap-4 items-center shadow-xl">
              <ShieldCheck className="w-10 h-10 text-blue-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Full AES-256 Cryptographic Standards Verified</h4>
                <p className="text-[11px] text-white/55 font-light leading-relaxed mt-0.5">
                  FENWAY4U data grids undergo continuous structural vulnerability scans to safeguard your sensitive documents.
                </p>
              </div>
            </div>

            {/* List of sections */}
            <div className="space-y-6">
              {filteredSections.length > 0 ? (
                filteredSections.map((s, idx) => (
                  <div 
                    id={s.id} 
                    key={idx}
                    className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-8 space-y-5 hover:border-white/10 transition-colors shadow-2xl relative scroll-mt-28"
                  >
                    <span className="absolute top-6 right-6 text-[9px] font-black uppercase text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/20 py-1 px-3 rounded-md">
                      {s.category}
                    </span>

                    <h3 className="text-xl font-bold text-white tracking-tight">{s.title}</h3>
                    <p className="text-white/60 text-xs font-light leading-relaxed">{s.content}</p>

                    <ul className="space-y-2.5 pt-4 border-t border-white/5">
                      {s.bullets.map((b, bIdx) => {
                        // Bold the start of bullet points dynamically for readability
                        const parts = b.split(":");
                        return (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs text-white/75 font-light leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                            <span>
                              {parts.length > 1 ? (
                                <>
                                  <strong className="text-white font-bold">{parts[0]}</strong>: {parts.slice(1).join(":")}
                                </>
                              ) : b}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-12 text-center text-white/50 space-y-4 shadow-xl">
                  <Eye className="w-12 h-12 text-[#D4AF37]/40 mx-auto" />
                  <p className="text-sm">No legal sections match your query. Try searching for 'Stripe', 'visa', or 'delete'.</p>
                </div>
              )}
            </div>

            {/* Help / Advisory Contact card */}
            <div className="bg-[#0c0c0c] border border-[#D4AF37]/25 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-base font-bold text-white">Have privacy or data questions?</h4>
                <p className="text-[11px] text-white/50 font-light">Contact our certified data safety compliance desk for quick clarifications.</p>
              </div>
              <a 
                href="mailto:support@fenway4u.com?subject=Data Privacy Inquiry"
                className="bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold px-6 py-3 rounded-xl transition-all uppercase text-[10px] tracking-wider shrink-0"
              >
                Contact Data Desk
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
