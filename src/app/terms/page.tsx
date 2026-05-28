"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ShieldCheck, ChevronDown, Search, HelpCircle, Scale } from "lucide-react";

interface TermsSection {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string[];
}

export default function TermsConditionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSections, setOpenSections] = useState<string[]>(["shipping-terms", "customs-obligations"]);

  const sections: TermsSection[] = [
    {
      id: "shipping-terms",
      title: "1. Sourcing & Shipping Responsibilities",
      category: "Freight Sourcing",
      summary: "Outlines our consolidation logistics channels, volume estimation metrics, and carrier shipping terms (ocean containers, air priority freight).",
      details: [
        "FENWAY4U operates as a licensed freight consolidator and purchasing concierge agent.",
        "Timelines provided for standard sea freight (28-35 days) or priority air cargo (3-5 days) are estimates subject to weather, port, or terminal congestion.",
        "Users ordering via the 'Shop For Me' service must provide accurate product details, store URLs, and specifications before procurement.",
        "We audit all purchased packages physically at our Lagos hub to vet dimensions and freshness protection vacuum-seals."
      ]
    },
    {
      id: "customs-obligations",
      title: "2. Customs Clearances & Duties",
      category: "Border Customs",
      summary: "Defines HS Code classifications, custom duty filings, tariff responsibilities, and border entry clearance audits.",
      details: [
        "All shipments are subject to local customs audits, inspections, and import tax rates at target destinations (Canada, UK, USA).",
        "FENWAY4U manages complete customs brokerage documentation and HS code filings automatically for our consolidated LCL cargo.",
        "Any additional country-specific customs tariffs, raw food levies, or excise duties assessed by border controllers remain the legal responsibility of the importer/customer.",
        "We block and impound prohibited imports immediately at our Lagos warehouse to prevent legal penalties."
      ]
    },
    {
      id: "consultation-terms",
      title: "3. Relocation & Visas Consultation",
      category: "Migration Advisory",
      summary: "Terms governing booking hours, advisory sessions, file audits, and immigration advisory parameters.",
      details: [
        "Consultation bookings on FENWAY4U scheduling calendars are subject to verified slot availability.",
        "We offer the first 30 minutes of advisory sessions entirely free. Subsequent hours are billed based on the designated visa tier rules.",
        "Our coordinators review documentation (bank statements, WES assessments, letter of admission) to strengthen files, but FENWAY4U does not guarantee final visa approval, which remains the sole decision of the respective state immigration authorities."
      ]
    },
    {
      id: "prohibited-items",
      title: "4. Prohibited & Restricted Cargo",
      category: "Logistics Safety",
      summary: "List of illegal items, dangerous items, and agricultural restrictions banned from aviation or ocean shipments.",
      details: [
        "FENWAY4U strictly prohibits the shipment of flammable aerosols, lithium batteries, toxic chemicals, illegal drugs, or counterfeit products.",
        "Fresh perishables (raw meats, unvetted plants) are barred from standard air/sea lanes unless pre-cleared by specific agricultural compliance checks.",
        "Any attempt to ship restricted items will lead to immediate cargo forfeiture, account termination, and reporting to local port authorities."
      ]
    },
    {
      id: "refunds-disputes",
      title: "5. Billing, Cancellations & Refund Rules",
      category: "Financial Compliance",
      summary: "Defines retainer cancellation timelines, escrow refund terms, and dispute channels.",
      details: [
        "Concierge sourcing fees and priority shipping deposits are calculated in USD/CAD/GBP/NGN dynamically. Member discounts apply.",
        "Standard shipping deposits are refundable if canceled prior to physical warehouse loading at our Lagos terminal.",
        "Once cargo is packed, palletized, and custom-entered onto our trans-continental manifest, refunds cannot be initiated.",
        "All billing disputes are managed through independent arbitration channels before formal litigation."
      ]
    },
    {
      id: "liability-limits",
      title: "6. Limitations of Liability & Insurance",
      category: "Risk Protection",
      summary: "Detailing cargo values, insurance claims, and liability limits for accidents or weather constraints.",
      details: [
        "Our maximum liability for lost or damaged cargo is strictly limited to the verified declared value of the cargo indicated during booking.",
        "Custom compensation claims must be filed in writing with complete photo evidence within 14 days of package arrival.",
        "FENWAY4U is exempt from liability for force majeure delays including extreme weather, aviation strikes, border lockdowns, or sudden regulatory changes."
      ]
    }
  ];

  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredSections = sections.filter(
    s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-hidden pt-24 pb-20">
      
      {/* Background blobs for luxury depth */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />

      {/* Header */}
      <section className="py-16 px-6 border-b border-white/5 bg-[#090909]/40 relative z-20">
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Framework</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Conditions</span>
          </h1>
          <p className="text-white/60 text-base font-light max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before booking container cargo, buying groceries, or scheduling visa assessments.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto pt-4">
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal clauses (e.g. 'refund', 'prohibited')"
              className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-xs text-white/80 focus:border-[#D4AF37] outline-none"
            />
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-16 px-6 container mx-auto max-w-4xl relative z-20">
        <div className="space-y-6">
          
          {/* Compliance badge */}
          <div className="bg-gradient-to-r from-purple-950/10 to-[#0c0c0c] border border-purple-500/20 p-6 rounded-3xl flex gap-4 items-center shadow-xl">
            <ShieldCheck className="w-10 h-10 text-purple-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">SOC 2 compliant Operations Vetted</h4>
              <p className="text-[11px] text-white/55 font-light leading-relaxed mt-0.5">
                Our terms are optimized to protect both diaspora consumers and wholesale enterprise logistics operations.
              </p>
            </div>
          </div>

          {/* Accordions */}
          <div className="space-y-4">
            {filteredSections.length > 0 ? (
              filteredSections.map((s, idx) => {
                const isOpen = openSections.includes(s.id);
                return (
                  <div 
                    key={s.id} 
                    className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors shadow-xl"
                  >
                    <button
                      onClick={() => toggleSection(s.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left outline-none cursor-pointer"
                    >
                      <div className="space-y-1 pr-6">
                        <span className="text-[8px] font-black uppercase text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/25 px-2 py-0.5 rounded">
                          {s.category}
                        </span>
                        <h3 className={`text-base font-bold transition-colors ${isOpen ? "text-[#D4AF37]" : "text-white"}`}>
                          {s.title}
                        </h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#D4AF37]" : "text-white/30"}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-white/5 bg-black/40"
                        >
                          <div className="p-6 space-y-4">
                            <p className="text-xs text-white/55 leading-relaxed font-light italic">
                              {s.summary}
                            </p>

                            <ul className="space-y-3 pt-2 border-t border-white/5">
                              {s.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2.5 text-xs text-white/70 font-light leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-12 text-center text-white/50 space-y-4 shadow-xl">
                <FileText className="w-12 h-12 text-[#D4AF37]/40 mx-auto" />
                <p className="text-sm">No legal sections match your query. Try searching for 'refund' or 'shipping'.</p>
              </div>
            )}
          </div>

          {/* Legal help callout */}
          <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl mt-8">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-white">Need formal corporate agreements?</h4>
              <p className="text-[11px] text-white/50 font-light">Custom volume cargo SLA contracts can be arranged for certified wholesale partnerships.</p>
            </div>
            <button 
              onClick={() => {
                const event = new CustomEvent("open-contact-modal");
                window.dispatchEvent(event);
              }}
              className="bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold px-6 py-3 rounded-xl transition-all uppercase text-[10px] tracking-wider shrink-0 cursor-pointer"
            >
              Request Custom SLA
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
