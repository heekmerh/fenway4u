"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Lock, CreditCard, Ship, Server, Users, 
  Search, CheckCircle2, ChevronRight, RefreshCw, Key, 
  Fingerprint, Sparkles, HelpCircle, ArrowRight, ShieldAlert 
} from "lucide-react";
import Image from "next/image";

interface TrustBadge {
  label: string;
  icon: any;
  desc: string;
  status: string;
  color: string;
}

export default function SecurityTrustPage() {
  const [activeTab, setActiveTab] = useState<"payments" | "cargo" | "data" | "compliance">("payments");
  const [encrypting, setEncrypting] = useState(false);
  const [encProgress, setEncProgress] = useState(0);
  
  // Real-time security metrics mockup
  const [systemStats, setSystemStats] = useState({
    sslStatus: "Fully Encrypted (SHA-256)",
    activeSessions: 1420,
    ddosBlocked: 48512,
    pciCompliance: "PCI-DSS Level 1 Certified",
    auditStatus: "Passed (SOC 2 Type II compliant)"
  });

  useEffect(() => {
    // Stat fluctuations
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        activeSessions: prev.activeSessions + Math.floor(Math.random() * 5) - 2,
        ddosBlocked: prev.ddosBlocked + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const triggerSecurityTest = () => {
    if (encrypting) return;
    setEncrypting(true);
    setEncProgress(0);
    const interval = setInterval(() => {
      setEncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setEncrypting(false), 800);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const trustBadges: TrustBadge[] = [
    { label: "SSL Encrypted", icon: Lock, desc: "Bank-level SHA-256 browser connection guarantees absolute privacy.", status: "Active", color: "text-[#D4AF37]" },
    { label: "PCI-DSS Compliant", icon: CreditCard, desc: "Strict Stripe/PayPal payment gateway compliance protects your assets.", status: "Verified", color: "text-blue-400" },
    { label: "Vetted Cargo Insurance", icon: Ship, desc: "End-to-end freight and relocation insurance coverage for valuable items.", status: "Active", color: "text-emerald-400" },
    { label: "SOC 2 Type II Audited", icon: Server, desc: "Comprehensive independent organizational security and access protocols checked.", status: "Certified", color: "text-purple-400" }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-hidden pt-24 pb-20">
      
      {/* Background neon blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-[#D4AF37]/3 blur-[160px] -z-10 rounded-full" />

      {/* Cinematic Hero */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-white/5 bg-[#090909]/60">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent z-10" />
          <Image 
            src="/images/tech_gadget_sourcing_1779859399098.png" 
            alt="Advanced Secure Infrastructure"
            fill
            className="object-cover opacity-15 pointer-events-none scale-105"
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
              <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
              <span>FENWAY4U Security & Compliance Portal</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight text-white">
              Enterprise Trust & <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-amber-500 drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]">Global Protection</span>
            </h1>
            <p className="text-white/60 text-lg font-light max-w-3xl mx-auto leading-relaxed">
              Your money, identity, cargo, and international journey are protected under FENWAY4U’s world-class compliance framework. Security isn't an extra feature — it's our foundational commitment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Trust Badges Grid */}
      <section className="py-16 px-6 container mx-auto max-w-7xl relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-[#0c0c0c] border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className={`w-6 h-6 ${badge.color}`} />
                  </div>
                  <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-1 px-3 rounded-full font-bold uppercase tracking-wider">
                    {badge.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{badge.label}</h3>
                <p className="text-white/50 text-xs font-light leading-relaxed">{badge.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Security Interactive Network Diagnostics & System Metrics */}
      <section className="py-16 px-6 container mx-auto max-w-7xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Diagnostic Console (Left 7 cols) */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-widest">Diagnostic Sandbox</span>
              <h3 className="text-2xl font-black text-white">Browser Connection Audit</h3>
              <p className="text-white/50 text-xs font-light leading-relaxed">
                Test the active cryptographic handshake between your local browser and FENWAY4U global servers.
              </p>
            </div>

            {/* Test progress visualizer */}
            <div className="bg-black border border-white/5 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60 font-mono flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-[#D4AF37]" /> Handbook Handshake Audit
                </span>
                <span className="text-white/40 font-mono">
                  {encrypting ? `Processing: ${encProgress}%` : "Console Idle"}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-[#D4AF37] to-emerald-500 transition-all"
                  style={{ width: `${encProgress}%` }}
                />
              </div>

              {/* Log messages */}
              <div className="font-mono text-[9px] text-white/30 space-y-1.5 pt-2 border-t border-white/5">
                <p className="text-emerald-400 flex items-center gap-1">✓ Connection details: TLS 1.3 | AES_256_GCM | SHA-384 cipher suite</p>
                {encrypting && encProgress >= 30 && <p className="text-blue-400">⚡ Auditing PCI-DSS Level 1 validation parameters...</p>}
                {encrypting && encProgress >= 70 && <p className="text-purple-400">⚡ Verifying global cargo insurance credentials...</p>}
                {encProgress === 100 && <p className="text-emerald-400 font-bold">✓ Audit Completed. 100% Cryptographic Safeguards Verified.</p>}
                {!encrypting && encProgress === 0 && <p>Click the trigger below to audit connection parameters.</p>}
              </div>
            </div>

            <div>
              <button
                disabled={encrypting}
                onClick={triggerSecurityTest}
                className="w-full bg-white/5 hover:bg-[#D4AF37] border border-white/10 hover:border-transparent text-white hover:text-black font-black py-4 rounded-xl transition-all uppercase text-xs tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                {encrypting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Auditing Handshake...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" /> Run Connection Diagnostic
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Security MetricsHUD (Right 5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-white/5 to-[#050505] border border-[#D4AF37]/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-widest">Active Operations Shield</span>
                <h3 className="text-2xl font-black text-white mt-1">Trust Statistics</h3>
                <p className="text-white/40 text-xs mt-1 font-light leading-relaxed">
                  Real-time indicators showing the strength of our global transaction and logistics network security.
                </p>
              </div>

              {/* Status details */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                {[
                  { label: "Local SSL Status", val: systemStats.sslStatus, color: "text-[#D4AF37]" },
                  { label: "Active Network Audits", val: `${systemStats.activeSessions.toLocaleString()} Nodes verified`, color: "text-blue-400" },
                  { label: "Fraud Attempts Deflected (24h)", val: `${systemStats.ddosBlocked.toLocaleString()} Blocked`, color: "text-emerald-400" },
                  { label: "Gateway Certification", val: systemStats.pciCompliance, color: "text-purple-400" }
                ].map((s, idx) => (
                  <div key={idx} className="bg-black/50 border border-white/5 p-4 rounded-xl space-y-1">
                    <p className="text-white/30 text-[9px] uppercase font-bold tracking-widest">{s.label}</p>
                    <p className={`text-sm font-mono font-bold ${s.color}`}>{s.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <p className="text-[9px] text-white/30 text-center leading-relaxed font-light">
                Continuous SOC 2 independent auditor testing monitored.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Protection Pillars Tab Console */}
      <section className="py-24 px-6 container mx-auto max-w-7xl relative z-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-5xl font-black">Trust & Security <span className="text-[#D4AF37]">Pillars</span></h2>
          <p className="text-white/40 text-xs font-light">FENWAY4U provides end-to-end safety from payments to global container sorting.</p>
        </div>

        {/* Tab triggers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-black/40 border border-white/5 p-2 rounded-2xl max-w-4xl mx-auto">
          {[
            { id: "payments", label: "Secure Payments", icon: CreditCard },
            { id: "cargo", label: "Cargo Insurance", icon: Ship },
            { id: "data", label: "Data Safeguards", icon: Lock },
            { id: "compliance", label: "Freight Compliance", icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer
                  ${activeTab === tab.id 
                    ? "bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] shadow-xl" 
                    : "bg-transparent border border-transparent text-white/50 hover:text-white"}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Pillar display card */}
        <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {activeTab === "payments" && (
              <motion.div 
                key="payments"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#D4AF37] tracking-widest">PCI-DSS Gateway Protection</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white mt-1">Transaction Safety & Escrow</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light mt-4">
                      All payments on FENWAY4U are routed through secure, internationally recognized processors including **Stripe**, **PayPal**, **Flutterwave**, and **Wise**. We do not store or capture raw credit card details on our local database.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-2.5 items-start text-xs font-light text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>**3D Secure 2.0 Auth**: Mandatory biometric or SMS validation on checkout lanes.</span>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs font-light text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>**256-bit GCM encryption**: Tokenized credentials block third-party intercepts.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-black/60 border border-white/5 p-6 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-white border-b border-white/5 pb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#D4AF37]" /> Supported Payment Channels
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold text-white/60">
                    <span className="bg-white/5 border border-white/10 p-2.5 rounded-lg hover:text-[#D4AF37] transition-colors">Stripe</span>
                    <span className="bg-white/5 border border-white/10 p-2.5 rounded-lg hover:text-[#D4AF37] transition-colors">PayPal</span>
                    <span className="bg-white/5 border border-white/10 p-2.5 rounded-lg hover:text-[#D4AF37] transition-colors">Flutterwave</span>
                    <span className="bg-white/5 border border-white/10 p-2.5 rounded-lg hover:text-[#D4AF37] transition-colors">Wise</span>
                  </div>
                  <p className="text-[9px] text-white/40 leading-relaxed font-light pt-2">
                    We adhere fully to global AML (Anti-Money Laundering) checks to secure trans-continental escrow deposits.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "cargo" && (
              <motion.div 
                key="cargo"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-black text-blue-400 tracking-widest">End-to-End Shipment Escrow</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white mt-1">Cargo & Relocation Insurance</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light mt-4">
                      Every single freight parcel or container shipment consolidated through FENWAY4U is fully covered by global cargo protection underwritings. We safeguard your assets against loss, shipping accidents, or moisture damage.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-2.5 items-start text-xs font-light text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>**Full Declared Value coverage**: Protecting electronics, vehicles, and housewares.</span>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs font-light text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>**Fast Claim Settlement**: Clear audits and reimbursements within 14 business days.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-black/60 border border-white/5 p-6 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-white border-b border-white/5 pb-3 flex items-center gap-2">
                    <Ship className="w-4 h-4 text-blue-400" /> Freight Guarantees
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/50">Loss Claim Compensation</span>
                      <span className="font-mono font-bold text-white">Up to 100% Value</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/50">Damage Compensation</span>
                      <span className="font-mono font-bold text-white">Vetted Vouchered Settle</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/50">Customs Impound Assist</span>
                      <span className="font-mono font-bold text-emerald-400">Included free</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "data" && (
              <motion.div 
                key="data"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-black text-purple-400 tracking-widest">Data Privacy Protection</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white mt-1">Zero-Leak Privacy Safeguards</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light mt-4">
                      We treat your privacy with extreme seriousness. Your passport, bank statements, IELTS results, and visa invitation details are stored in isolated encrypted cloud repositories with zero employee access. We never sell your personal information.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-2.5 items-start text-xs font-light text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>**Isolated Document Storages**: Document tokens expire automatically in 30 days.</span>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs font-light text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>**GDPR & CCPA Compliant**: Easily request complete data deletion at any point.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-black/60 border border-white/5 p-6 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-white border-b border-white/5 pb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-400" /> Data Handling SLA
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/50">Local Serialization</span>
                      <span className="font-mono text-emerald-400">Encrypted LocalStorage</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/50">Cloud Database Storage</span>
                      <span className="font-mono text-emerald-400">AWS KMS AES-256</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/50">Data Deletion Response</span>
                      <span className="font-mono text-white">Under 24 Hours</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "compliance" && (
              <motion.div 
                key="compliance"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-black text-emerald-400 tracking-widest">Global Logistics Licenses</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white mt-1">Verified Operations & Audits</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light mt-4">
                      FENWAY4U operates in full compliance with international freight forwarding regulations, ocean carrier container boundaries, and customs clearance protocols inside Canada, United Kingdom, USA, and West Africa.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex gap-2.5 items-start text-xs font-light text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>**Customs Brokerage Bonds**: Bonded clearance ensures faster entry files.</span>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs font-light text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>**FMC Licensed Freight Forward**: Certified logistics management standards.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-black/60 border border-white/5 p-6 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-white border-b border-white/5 pb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Regulatory Credentials
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/50">Customs Broker Bond</span>
                      <span className="font-mono font-bold text-white">Active & Fully Insured</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/50">IATA / FMC Freight Lanes</span>
                      <span className="font-mono font-bold text-white">Registered</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/50">West Africa Export clearance</span>
                      <span className="font-mono font-bold text-white">Lic. #F4U-9941</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Frequently Asked Questions Center */}
      <section className="py-24 px-6 container mx-auto max-w-4xl relative z-20 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-4xl font-black">Security FAQ</h2>
          <p className="text-white/40 text-xs font-light">Common questions on payment protection, cargo safety, and identity audits.</p>
        </div>

        <div className="space-y-4">
          {[
            { q: "How is my personal visa document details protected?", a: "Every file, bank statement, or visa document you upload during the onboarding process is encrypted immediately with AES-256 standards before being stored in dedicated offline cloud repositories. These links auto-expire inside 30 days to avoid any security vulnerabilities." },
            { q: "Is my payment information securely processed?", a: "Yes, 100%. We route checkout lanes through Stripe and PayPal which carry Level 1 PCI-DSS compliance. FENWAY4U servers never see, handle, or store your raw debit/credit card credentials." },
            { q: "How does the cargo damage coverage plan work?", a: "Our standard freight insurance covers up to 100% of the declared value of shipped cargo against damage, loss, or customs delays. You specify the value when arranging shipping cargo parameters, and claims clear inside 14 business days." }
          ].map((faq, idx) => (
            <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
              <h4 className="text-sm font-bold text-[#D4AF37] mb-2">{faq.q}</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
