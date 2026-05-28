"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Warehouse, Package, ShieldCheck, Layers, ChevronDown, 
  ChevronUp, GraduationCap, Briefcase, Home, ShoppingBag, 
  Lock, Shield, Info, Clock, ArrowRight, Check, 
  CheckCircle, MessageCircle, Settings, Plus, Search, 
  HelpCircle, Send, Smartphone, Sparkles, MapPin, 
  Maximize2, FileText, Globe, Percent, Truck, Boxes, Trash2
} from "lucide-react";

// --- Types & Data Structures ---

interface InventoryItem {
  id: string;
  name: string;
  hub: string;
  status: string;
  weight: string;
  receivedDate: string;
  selected: boolean;
}

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}

const storageServices = [
  {
    title: "Temporary Warehouse Storage",
    desc: "Premium climate-controlled storage designed for relocation transitions, transit gaps, or travel delays.",
    details: [
      "Secure short-term holding (1 week to 6+ months)",
      "24/7 guarded CCTV monitored vaults",
      "Temperature-regulated environments for delicate cargo",
      "Direct handover to global air or sea freight carriers"
    ],
    icon: Warehouse,
    badge: "Flexible Holding",
    accent: "text-amber-400 bg-amber-500/10 border-amber-500/25"
  },
  {
    title: "Package Holding Service",
    desc: "A secure mailing address to hold individual store packages from Amazon, eBay, or boutique local markets.",
    details: [
      "Receive items directly from online merchants globally",
      "Up to 30 days of complimentary storage holding",
      "Automated package check-in notifications with photos",
      "Verify item contents and condition on arrival"
    ],
    icon: Package,
    badge: "Online Shoppers",
    accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25"
  },
  {
    title: "Shipment Consolidation",
    desc: "Merge multiple separate packages into a single optimized shipping parcel to slash international fees by up to 70%.",
    details: [
      "Remove heavy unnecessary retail merchant boxes",
      "Custom protective shrink-wrap and corner guards",
      "Single customs documentation clearance tracking ID",
      "Dramatically lower dimensional weight metrics"
    ],
    icon: Layers,
    badge: "Cost Saver",
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
  }
];

const customerProfiles = [
  {
    title: "Students Abroad",
    desc: "Receive parcels from home, store belongings securely during academic summer breaks, and consolidate shipments back home affordably without paying expensive city rent.",
    flag: "🎓",
    tag: "Academic Logistics"
  },
  {
    title: "Frequent Buyers",
    desc: "Order from top merchants across the US, UK, and Canada, aggregate packages into our hubs over 30 days, and consolidate them into a single cost-effective global air-freight parcel.",
    flag: "🛍️",
    tag: "Smart Shopping"
  },
  {
    title: "Relocating Families",
    desc: "Bridge the gap between visa issuance, house hunting, and container delivery. Store your heavy furniture, valuables, and vehicle parts safely while you settle in.",
    flag: "🏠",
    tag: "Transition Hub"
  },
  {
    title: "Small Businesses",
    desc: "Manage international product supply chains, store bulk inventory batch orders, and utilize our automated warehousing portals for local fulfillment dispatch.",
    flag: "💼",
    tag: "B2B Logistics"
  }
];

const timelineSteps = [
  {
    step: "01",
    title: "Send Items to Hub",
    desc: "Ship online purchases or drop off belongings at our secure hubs in Canada, the UK, the USA, or local centers."
  },
  {
    step: "02",
    title: "Secure Log & Track",
    desc: "Packages are weighed, photographed, security screened, and instantly cataloged into your real-time virtual inventory dashboard."
  },
  {
    step: "03",
    title: "Smart Consolidation",
    desc: "Request package merging. Our experts remove excess packaging, vacuum seal contents, and optimize boxing to save you cash."
  },
  {
    step: "04",
    title: "Forward & Deliver",
    desc: "We dispatch your optimized package globally with full end-to-end customs handling, arriving directly at your doorstep."
  }
];

const storageFeatures = [
  {
    title: "Real-Time Inventory Tracking",
    desc: "See exact weight, dimension, status, and arrival photographs of every parcel inside our facilities instantly.",
    icon: ActivityIcon
  },
  {
    title: "Flexible Storage Durations",
    desc: "No long-term contracts. Store items for a few days during shipping lags or open-ended months for complete ease.",
    icon: Clock
  },
  {
    title: "Insured Handling & Protection",
    desc: "Every package is backed by integrated logistics transit insurance and handled inside 24/7 CCTV surveillance vaults.",
    icon: ShieldCheck
  },
  {
    title: "Global Forwarding Sync",
    desc: "One-click transition from holding vault to sea container or priority air cargo routing with pre-cleared customs codes.",
    icon: Globe
  }
];

const warehouseLocations = [
  { name: "Toronto Hub, Canada", items: 4200, status: "Normal Operations", delay: "0 hours", color: "from-red-500/20 to-red-650/5", border: "border-red-500/20" },
  { name: "London Hub, United Kingdom", items: 5800, status: "Normal Operations", delay: "0 hours", color: "from-blue-500/20 to-blue-650/5", border: "border-blue-500/20" },
  { name: "Houston Hub, United States", items: 7100, status: "Peak Traffic", delay: "2 hours", color: "from-amber-500/20 to-amber-650/5", border: "border-amber-500/20" },
  { name: "Lagos Hub, Nigeria", items: 3100, status: "Normal Operations", delay: "0 hours", color: "from-emerald-500/20 to-emerald-650/5", border: "border-emerald-500/20" }
];

const faqs = [
  { 
    q: "How long can I store items in your international warehouses?", 
    a: "We offer completely flexible storage durations. Package holding for shopping consolidation is free for the first 30 days. For relocation storage or business inventory, you can store items for months or years under our highly customizable warehousing plans, invoiced monthly." 
  },
  { 
    q: "How does the shipment consolidation service save me money?", 
    a: "Shipping companies charge based on volumetric weight (size) or actual weight—whichever is greater. When you order from multiple merchants, each sends items in oversized cardboard boxes filled with bubble wrap. Our experts open your packages, inspect contents, discard outer commercial packaging, vacuum-wrap materials, and combine everything into a single, compact cargo-approved container. This eliminates multiple carrier base fees and reduces volumetric dimensions, saving up to 70%." 
  },
  { 
    q: "Are my stored items insured against damage or loss?", 
    a: "Yes. All items stored inside our global hub network are fully covered by our comprehensive logistics warehouse insurance. Furthermore, we maintain strict secure climate control and physical security parameters to guarantee that your belongings remain in pristine condition." 
  },
  { 
    q: "Can businesses use these storage facilities for wholesale supply?", 
    a: "Absolutely. FENWAY4U provides customized B2B storage, freight consolidation, and dropshipping solutions. Small businesses can forward bulk goods to our US, UK, or Canada warehouses, where we store, inventory-log, and ship packages on-demand to individual end customers." 
  },
  { 
    q: "What items are prohibited from being stored in your facilities?", 
    a: "We strictly comply with international customs regulations. Prohibited storage items include hazardous chemicals, flammable liquids, pressurized cans, lithium batteries (unless properly packaged and declared), fresh perishable agricultural foods (unless priority temperature-certified), illicit materials, and weapons. Feel free to contact our support desk for custom guidance." 
  }
];

const testimonials = [
  {
    quote: "As a student moving from Lagos to Toronto, storing my trunks in FENWAY4U's hub while I secured campus housing saved me a fortune in apartment rent.",
    author: "Tobi A., University of Toronto Student"
  },
  {
    quote: "I order fashion pieces from UK outlets and tech accessories from Amazon US. FENWAY4U holds them at their hubs, consolidates them, and ships them to me in Lagos. Slashes shipping costs by more than half!",
    author: "Halima B., Online Retailer in Nigeria"
  },
  {
    quote: "During our relocation transition to London, our housing container got delayed. FENWAY4U held our entire family's belongings in their climate-controlled London hub. Pure lifesaver.",
    author: "The Harrison Family, Relocated to the UK"
  }
];

// Helper Icons
function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

export default function StoragePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // --- Calculator State ---
  const [packagesCount, setPackagesCount] = useState<number>(3);
  const [storageDuration, setStorageDuration] = useState<number>(4); // in weeks
  const [itemType, setItemType] = useState<string>("General Merchandise");
  const [hubLocation, setHubLocation] = useState<string>("Canada Hub");

  // --- Inventory Dashboard Simulator State ---
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: "inv-1", name: "Sony PlayStation 5 Console", hub: "Canada Hub", status: "Stored Securely", weight: "4.5 kg", receivedDate: "2026-05-15", selected: false },
    { id: "inv-2", name: "Designer Winter Apparel Pack", hub: "London Hub", status: "Stored Securely", weight: "6.0 kg", receivedDate: "2026-05-20", selected: false },
    { id: "inv-3", name: "Authentic Foods & Seasonings Bundle", hub: "Lagos Hub", status: "Stored Securely", weight: "12.2 kg", receivedDate: "2026-05-27", selected: false },
    { id: "inv-4", name: "Premium iPhone 16 Pro Max", hub: "Houston Hub", status: "Stored Securely", weight: "0.3 kg", receivedDate: "2026-05-26", selected: false }
  ]);
  const [dashboardLogs, setDashboardLogs] = useState<string[]>([
    "[08:15 AM] System Initialized. Global security grids verified.",
    "[10:30 AM] Lagos Hub: Scanned inventory node inv-3.",
    "[Yesterday] Canada Hub: Barcode scan verified for package inv-1."
  ]);
  const [isConsolidating, setIsConsolidating] = useState<boolean>(false);
  const [isShipping, setIsShipping] = useState<boolean>(false);

  // --- AI Storage Assistant Chatbot State ---
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: "assistant", text: "Hello! I am your FENWAY4U AI Storage Concierge. Ask me about storage durations, consolidation benefits, prohibited cargo, or international hub regulations." }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // --- Dynamic Calculator Formulas ---
  const calculateCosts = () => {
    let ratePerWeek = 3; // base general
    if (itemType === "Electronics & Tech") ratePerWeek = 6;
    else if (itemType === "Clothing & Fashion") ratePerWeek = 2;
    else if (itemType === "Groceries & Spices") ratePerWeek = 4;

    let hubMultiplier = 1.0;
    if (hubLocation === "London Hub") hubMultiplier = 1.25;
    else if (hubLocation === "Canada Hub") hubMultiplier = 1.15;
    else if (hubLocation === "Lagos Hub") hubMultiplier = 0.85;

    const rawStorage = packagesCount * storageDuration * ratePerWeek * hubMultiplier;

    // Consolidation savings logic
    let discountPct = 0;
    if (packagesCount >= 20) discountPct = 0.50;
    else if (packagesCount >= 10) discountPct = 0.40;
    else if (packagesCount >= 5) discountPct = 0.25;
    else if (packagesCount >= 3) discountPct = 0.15;

    const discountAmount = rawStorage * discountPct;
    const finalStorage = rawStorage - discountAmount;

    // Shipping estimates
    const baseShipping = 45;
    const perPackageShip = 15;
    const rawShipping = baseShipping + (packagesCount * perPackageShip);
    const shippingDiscount = rawShipping * (discountPct * 0.8); // slight ship discount too
    const finalShipping = rawShipping - shippingDiscount;

    return {
      rawStorage: Math.round(rawStorage),
      discountAmount: Math.round(discountAmount),
      discountPct: Math.round(discountPct * 100),
      finalStorage: Math.round(finalStorage),
      estimatedShipping: Math.round(finalShipping),
      totalSavings: Math.round(discountAmount + shippingDiscount),
      depositTotal: Math.round(finalStorage + finalShipping)
    };
  };

  const costData = calculateCosts();

  // --- Dashboard Action Handlers ---
  const toggleSelectItem = (id: string) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleDashboardConsolidate = () => {
    const selectedItems = inventory.filter(item => item.selected);
    if (selectedItems.length < 2) {
      alert("Please select at least 2 items to trigger package consolidation.");
      return;
    }
    
    setIsConsolidating(true);
    const newLog = `[${new Date().toLocaleTimeString()}] Consolidation triggered for ${selectedItems.length} parcels. Re-boxing...`;
    setDashboardLogs(prev => [newLog, ...prev]);

    setTimeout(() => {
      setInventory(prev => {
        const remaining = prev.filter(item => !item.selected);
        const consolidatedItem: InventoryItem = {
          id: `inv-c-${Math.floor(1000 + Math.random() * 9000)}`,
          name: `Merged Bundle (${selectedItems.length} items)`,
          hub: selectedItems[0].hub,
          status: "Merged & Vacuum-Sealed",
          weight: `${(selectedItems.reduce((acc, curr) => acc + parseFloat(curr.weight), 0) * 0.9).toFixed(1)} kg`,
          receivedDate: new Date().toISOString().split("T")[0],
          selected: false
        };
        return [consolidatedItem, ...remaining];
      });
      setIsConsolidating(false);
      setDashboardLogs(prev => [
        `[${new Date().toLocaleTimeString()}] Consolidation completed. Volumetric bulk dimensions reduced.`,
        ...prev
      ]);
    }, 2000);
  };

  const handleDashboardShip = () => {
    const selectedItems = inventory.filter(item => item.selected);
    if (selectedItems.length === 0) {
      alert("Please select at least 1 item to dispatch.");
      return;
    }

    setIsShipping(true);
    const newLog = `[${new Date().toLocaleTimeString()}] Preparing shipping label for ${selectedItems.length} parcels. Custom paperwork capture...`;
    setDashboardLogs(prev => [newLog, ...prev]);

    setTimeout(() => {
      setInventory(prev => prev.map(item => 
        item.selected ? { ...item, status: "In Transit / Out for Delivery", selected: false } : item
      ));
      setIsShipping(false);
      setDashboardLogs(prev => [
        `[${new Date().toLocaleTimeString()}] Waybills generated. Packages handed over to priority air cargo carriers.`,
        ...prev
      ]);
    }, 2000);
  };

  const handleDeleteItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    setDashboardLogs(prev => [
      `[${new Date().toLocaleTimeString()}] Package ${id} cleared / checked out manually.`,
      ...prev
    ]);
  };

  // --- AI Chatbot Handlers ---
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    triggerChatMessage(userInput);
  };

  const triggerChatMessage = (text: string) => {
    setChatMessages(prev => [...prev, { sender: "user", text }]);
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "That is an excellent logistics question. Storage rules depend heavily on customs parameters and specific airline rules. Contact our concierge desk via WhatsApp for precise guidelines.";
      
      const q = text.toLowerCase();
      if (q.includes("consolidation") || q.includes("save") || q.includes("70%")) {
        reply = "Package consolidation saves money by removing individual commercial merchants' heavy outer boxes. Our team bundles multiple items into a single optimized double-walled shipping container. This eliminates duplicate base courier fee levies and minimizes volumetric shipping weights.";
      } else if (q.includes("prohibited") || q.includes("cannot be stored")) {
        reply = "We strictly exclude hazardous items, explosive compressed cans, highly flammable chemical elements, uncertified raw agricultural foods, weapons, and loose lithium batteries. Standard retail electronics with enclosed batteries are perfectly acceptable when declared.";
      } else if (q.includes("insurance") || q.includes("insured") || q.includes("safe")) {
        reply = "Every storage hub maintains active industrial insurance. Your packages are backed against damage, theft, or fire by cargo logistics assurance. Physical access is isolated behind locked biometrics and 24/7 armed CCTV logs.";
      } else if (q.includes("indefinitely") || q.includes("time limit") || q.includes("how long")) {
        reply = "Shopping package holding is 100% free for the first 30 days. Relocation boxes, container shipments, and business inventory can be stored indefinitely. We provide highly competitive monthly rates based on cubic feet requirements.";
      }

      setChatMessages(prev => [...prev, { sender: "assistant", text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-hidden pb-16">
      
      {/* Ambient background glows */}
      <div className="absolute top-[5%] left-[-15%] w-[600px] h-[600px] bg-blue-950/15 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[-15%] w-[600px] h-[600px] bg-amber-950/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[80%] left-[-10%] w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 px-6 bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/95 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-[#050505]/90 to-[#050505]" />
          <Image 
            src="/images/warehouse_storage.png" 
            alt="Futuristic Logistics Storage Hub" 
            fill 
            priority
            className="object-cover opacity-30 pointer-events-none mix-blend-screen"
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold mb-8 uppercase tracking-widest backdrop-blur-md"
            >
              <Shield className="w-3.5 h-3.5 fill-[#D4AF37]/20" /> Premium Security Vaults
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] text-white"
            >
              Secure International <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#D4AF37] to-cyan-400">
                Storage, Anywhere.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-light max-w-3xl"
            >
              Temporary warehouse holding, smart package consolidation, and safe secure lockers across Canada, the UK, the United States, and African ports. Perfect storage flexibility tailored for students, relocating families, online buyers, and global businesses.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => {
                  const event = new CustomEvent("open-contact-modal");
                  window.dispatchEvent(event);
                }}
                className="bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 text-md"
              >
                Store My Items <Warehouse className="w-4 h-4" />
              </button>
              <Link
                href="#calculator"
                className="bg-white/5 text-white hover:bg-white/10 border border-white/10 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-md backdrop-blur-sm group"
              >
                Get Storage Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Checkpoints Ribbon */}
      <div className="border-y border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md py-6 relative z-10 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-center lg:justify-between gap-6 text-sm text-white/50 font-medium">
          <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-400" /> Biometric Guard Access</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyan-400" /> Full Cargo Value Insurance</span>
          <span className="flex items-center gap-2"><Boxes className="w-4 h-4 text-[#D4AF37]" /> Free 30-Day Holding</span>
          <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" /> Climate Control Regulation</span>
        </div>
      </div>

      {/* Section 1: Storage Services */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Our Storage <span className="text-[#D4AF37]">Solutions</span></h2>
          <p className="text-white/50 text-sm md:text-md">Premium logistics support designed to facilitate smooth international shipping, cargo pooling, and personal relocation storage.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {storageServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0b0c10] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#D4AF37]/10 transition-colors" />
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 ${service.accent}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-white/50 mb-4">{service.badge}</div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">{service.desc}</p>
                <ul className="space-y-3 mb-8">
                  {service.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-white/40 leading-normal">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => {
                  const event = new CustomEvent("open-contact-modal");
                  window.dispatchEvent(event);
                }}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-extrabold text-xs tracking-wider uppercase transition-all duration-300"
              >
                Inquire Service
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 2: Who This Service Is For */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-[#09090c]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Tailored for <span className="text-[#D4AF37]">Global Lifestyles</span></h2>
            <p className="text-white/50 text-sm">Providing direct logistics support for critical lifestyle transitions, school logistics, and commerce operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerProfiles.map((profile, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b0c10] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-4">{profile.flag}</div>
                  <h3 className="font-extrabold text-lg text-white mb-2">{profile.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-6">{profile.desc}</p>
                </div>
                <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider bg-[#D4AF37]/5 border border-[#D4AF37]/15 py-1 px-2.5 rounded-full inline-block self-start">
                  {profile.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Timeline Step Process */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">How Storage <span className="text-[#D4AF37]">Works</span></h2>
          <p className="text-white/50 text-sm">Four seamless steps to log, consolidate, and ship packages with complete confidence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6 relative">
          <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />
          
          {timelineSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0c0d12]/80 backdrop-blur border border-white/5 p-8 rounded-3xl relative hover:border-[#D4AF37]/20 transition-all text-center"
            >
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-lg text-[#D4AF37] mx-auto mb-6 shadow-lg shadow-black/30">
                {step.step}
              </div>
              <h4 className="font-extrabold text-white text-md mb-2">{step.title}</h4>
              <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 4: Premium Storage Features Grid */}
      <section className="py-24 px-6 relative z-10 bg-[#09090c] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Features Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                <Sparkles className="w-3 h-3" /> Core Infrastructure
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-[1.15]">Premium Logistics Advantages</h2>
              <p className="text-white/50 text-md leading-relaxed mb-10 max-w-xl">
                We bridge continents by operating structured storage networks governed by active digital logistics logs. Our facilities provide absolute safety so you can plan travel and purchase goods without stress.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {storageFeatures.map((feat, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                    <feat.icon className="w-6 h-6 text-[#D4AF37] mb-4" />
                    <h4 className="font-bold text-white text-sm mb-2">{feat.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Live Feed / Network Node Visualization */}
            <div className="bg-[#0b0c10] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute" />
                  <h3 className="font-bold text-sm tracking-wider text-white">LIVE HUB CAPACITIES</h3>
                </div>
                <div className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded font-mono text-white/50">SYSTEM ACTIVE</div>
              </div>

              <div className="space-y-4">
                {warehouseLocations.map((loc, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-xs text-white flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {loc.name}
                      </h4>
                      <p className="text-[10px] text-white/40 mt-1">Active Lockers: {loc.items} units</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{loc.status}</span>
                      <p className="text-[10px] text-white/40 mt-1 font-mono">Delay: {loc.delay}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <p className="text-[10px] text-white/30 italic">Biometric cargo locks and active climate monitors synchronized globally. Last scan: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 5: Interactive Storage & Consolidation Calculator */}
      <section id="calculator" className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Form Left Side (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/25 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                <Percent className="w-3.5 h-3.5" /> Instant Slicing Estimator
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">Calculate Your <br /><span className="text-[#D4AF37]">Consolidation Savings</span></h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Slide the package selectors to see exactly how consolidating online parcels in our hubs eliminates duplicate base fees and optimizes shipping rates.
              </p>
            </div>

            <div className="bg-[#0b0c10] border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
              
              {/* Packages Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-white/70 mb-2">
                  <label className="uppercase tracking-wider">Number of Packages</label>
                  <span className="text-[#D4AF37] font-bold">{packagesCount} Items</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={packagesCount} 
                  onChange={(e) => setPackagesCount(parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1">
                  <span>1 Item</span>
                  <span>5 (25% off)</span>
                  <span>10 (40% off)</span>
                  <span>30 Items Max</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-white/70 mb-2">
                  <label className="uppercase tracking-wider">Storage Duration</label>
                  <span className="text-[#D4AF37] font-bold">{storageDuration} Weeks</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="24" 
                  value={storageDuration} 
                  onChange={(e) => setStorageDuration(parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1">
                  <span>1 Week</span>
                  <span>4 Weeks</span>
                  <span>12 Weeks</span>
                  <span>24 Weeks</span>
                </div>
              </div>

              {/* Item Type & Hub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/60 mb-2">Item Classification</label>
                  <select 
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                  >
                    <option>General Merchandise</option>
                    <option>Electronics & Tech</option>
                    <option>Clothing & Fashion</option>
                    <option>Groceries & Spices</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/60 mb-2">Warehouse Hub</label>
                  <select 
                    value={hubLocation}
                    onChange={(e) => setHubLocation(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                  >
                    <option>Canada Hub</option>
                    <option>London Hub</option>
                    <option>Houston Hub</option>
                    <option>Lagos Hub</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Estimates Right Side (7 columns) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#0b0c10] to-[#050505] border border-[#D4AF37]/35 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.05)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <h3 className="font-extrabold text-xl mb-6 text-white tracking-wide border-b border-white/5 pb-4 flex justify-between items-center">
              <span>ESTIMATED CONSOLE SUMMARY</span>
              {costData.discountPct > 0 && (
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full uppercase font-mono tracking-widest">{costData.discountPct}% BUNDLE DISCOUNT</span>
              )}
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex justify-between items-center text-white/60">
                <span>Base Storage Value ({packagesCount} items / {storageDuration} wks)</span>
                <span className="font-mono text-white">${costData.rawStorage} USD</span>
              </div>

              {costData.discountPct > 0 && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span>Consolidation Storage Rebate (-{costData.discountPct}%)</span>
                  <span className="font-mono font-bold">-${costData.discountAmount} USD</span>
                </div>
              )}

              <div className="flex justify-between items-center text-white/60 border-t border-white/5 pt-4">
                <span>Net Storage Fee</span>
                <span className="font-mono text-white">${costData.finalStorage} USD</span>
              </div>

              <div className="flex justify-between items-center text-white/60">
                <span>Estimated Consolidated Global Shipping Rate</span>
                <span className="font-mono text-white">${costData.estimatedShipping} USD</span>
              </div>

              {costData.discountPct > 0 && (
                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-xl p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Boxes className="w-5 h-5 text-[#D4AF37]" />
                    <div className="text-left">
                      <p className="font-bold text-xs text-[#D4AF37]">Estimated Volume Bundling Savings</p>
                      <p className="text-[10px] text-white/40 mt-0.5">Slashed shipping courier dimensions</p>
                    </div>
                  </div>
                  <span className="font-mono font-black text-[#D4AF37] text-md">${costData.totalSavings} USD Saved</span>
                </div>
              )}

              <div className="border-t-2 border-dashed border-white/10 pt-6 mt-6 flex justify-between items-end">
                <div>
                  <h4 className="font-extrabold text-md text-white">Estimated Retainer Deposit</h4>
                  <p className="text-[10px] text-white/40 mt-1">Includes secure check-in, tracking, and holding</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#D4AF37] font-mono">${costData.depositTotal} USD</p>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => {
                    const subject = encodeURIComponent("Custom Storage & Consolidation Quote Request");
                    const bodyText = `Hi FENWAY4U Logistics Sourcing Team,
                    
I have generated a storage estimate using the website portal:
- Number of Packages: ${packagesCount} Items
- Item classification: ${itemType}
- Duration of Storage: ${storageDuration} Weeks
- Warehouse Location: ${hubLocation}

Estimates:
- Storage Net: $${costData.finalStorage} USD
- Shipping Estimate: $${costData.estimatedShipping} USD
- Savings: $${costData.totalSavings} USD
- Total Retainer: $${costData.depositTotal} USD

I would like to start this holding request. Thank you.`;
                    const body = encodeURIComponent(bodyText);
                    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
                  }}
                  className="w-full bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Reserve Storage Vault & Lockers <Truck className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Smart Inventory Dashboard Simulator */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-[#09090c]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              <Boxes className="w-3.5 h-3.5 inline-block mr-1" /> Virtual Sourcing Center
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Smart Inventory <span className="text-[#D4AF37]">Dashboard</span></h2>
            <p className="text-white/50 text-sm">Simulate active warehouse management. Tick stored boxes to request bulk consolidation or shipping dispatch instantly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Inventory Table (8 columns) */}
            <div className="lg:col-span-8 bg-[#0b0c10] border border-white/5 rounded-3xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-white/5">
                <div>
                  <h3 className="font-bold text-md text-white">Your Mock Active Lockers</h3>
                  <p className="text-xs text-white/40 mt-0.5">Toggle checkboxes to simulate automated multi-package operations.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    disabled={isConsolidating || isShipping}
                    onClick={handleDashboardConsolidate}
                    className="px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/35 hover:bg-[#D4AF37] hover:text-black text-amber-400 text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    {isConsolidating ? <span className="w-3 h-3 rounded-full border border-black border-t-transparent animate-spin" /> : <Layers className="w-3.5 h-3.5" />}
                    Consolidate Selected
                  </button>
                  <button 
                    disabled={isConsolidating || isShipping}
                    onClick={handleDashboardShip}
                    className="px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/35 hover:bg-emerald-500 hover:text-black text-emerald-400 text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    {isShipping ? <span className="w-3 h-3 rounded-full border border-black border-t-transparent animate-spin" /> : <Truck className="w-3.5 h-3.5" />}
                    Ship Selected
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-white/40 uppercase tracking-widest border-b border-white/5 pb-3">
                      <th className="py-3 px-3">Select</th>
                      <th className="py-3">Cargo Item</th>
                      <th className="py-3">Warehouse Hub</th>
                      <th className="py-3">Secure Status</th>
                      <th className="py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inventory.map((item) => (
                      <tr key={item.id} className={`hover:bg-white/5 transition-colors ${item.selected ? 'bg-white/5' : ''}`}>
                        <td className="py-4 px-3">
                          <input 
                            type="checkbox" 
                            checked={item.selected} 
                            onChange={() => toggleSelectItem(item.id)}
                            className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer"
                          />
                        </td>
                        <td className="py-4 font-bold text-white">
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span className="text-[10px] text-white/30 mt-0.5 font-mono">{item.id} • {item.weight} • Checked-in: {item.receivedDate}</span>
                          </div>
                        </td>
                        <td className="py-4 text-white/70">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#D4AF37]" /> {item.hub}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase
                            ${item.status.includes("Merged") ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' : 
                              item.status.includes("Transit") ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 
                              'bg-blue-500/10 text-blue-400 border border-blue-500/25'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-white/30 hover:text-red-400 p-1.5 rounded transition-colors"
                            title="Remove manual item from simulator"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-white/30 italic flex justify-between">
                <span>Select multiple packages to simulate how shipment consolidation fuses parcels into single boxes.</span>
                <span>Active locker nodes: {inventory.length} items logged</span>
              </div>
            </div>

            {/* Right Status Logger & Control Panel (4 columns) */}
            <div className="lg:col-span-4 bg-[#0b0c10] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider">Diagnostic Activity Logs</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-[10px] text-white/60 space-y-3 max-h-[220px] overflow-y-auto">
                  {dashboardLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed border-l-2 border-[#D4AF37]/50 pl-2">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-[#D4AF37]/5 border border-[#D4AF37]/25 rounded-2xl p-4 text-center">
                <p className="font-bold text-xs text-[#D4AF37]">Want a Virtual Locker Like This?</p>
                <p className="text-[10px] text-white/50 mt-1 mb-4 leading-normal">
                  Our actual account portal grants real-time virtual lockers with cargo snapshots and weight logging globally.
                </p>
                <button
                  onClick={() => {
                    const event = new CustomEvent("open-contact-modal");
                    window.dispatchEvent(event);
                  }}
                  className="w-full py-2.5 rounded-lg bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-lg shadow-[#D4AF37]/10"
                >
                  Activate My Locker
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Section 7: Interactive AI Storage Assistant Chatbot */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Chatbot Left Explanations (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                <MessageCircle className="w-3.5 h-3.5" /> Interactive Advisor
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">AI Storage <span className="text-[#D4AF37]">Concierge</span></h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Got questions regarding custom tax limits, storage rates, prohibited chemical assets, or cargo consolidation guidelines? Ask our simulated agent instantly or tap the quick suggest buttons below.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Select Suggested Topic:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "How does package consolidation save 70%?",
                  "What items are prohibited from storage?",
                  "Is there cargo insurance while items are held?",
                  "Can I store items indefinitely?"
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerChatMessage(q)}
                    disabled={isTyping}
                    className="text-left text-xs bg-white/5 border border-white/10 hover:border-[#D4AF37] text-white/80 hover:text-white px-3 py-2 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chatbot Panel Right (7 columns) */}
          <div className="lg:col-span-7 bg-[#0b0c10] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-[500px]">
            
            {/* Chatbot Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 shadow-lg shadow-black/40">
                  <Warehouse className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">AI Storage Concierge</h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Online & Responsive
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-white/40">FENWAY4U SYSTEM v2.5</span>
            </div>

            {/* Chatbot Message Box */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed shadow-lg
                    ${msg.sender === "user" 
                      ? 'bg-[#D4AF37] text-black font-semibold rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chatbot Input Box */}
            <form onSubmit={handleChatSubmit} className="mt-4 pt-4 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isTyping}
                placeholder="Type your storage or custom regulations query..." 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors resize-none placeholder:text-white/20 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isTyping || !userInput.trim()}
                className="bg-[#D4AF37] hover:bg-yellow-400 text-black font-bold p-3.5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>
      </section>

      {/* Section 8: Monitored Warehouse Security & Badges */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-[#09090c]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#0c0d14] via-[#06070b] to-[#050505] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-full bg-emerald-500/5 blur-[120px]" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase backdrop-blur mb-6">
                  <ShieldCheck className="w-4 h-4 fill-emerald-500/20" /> Insured Infrastructure
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">Fintech-Level Security Infrastructure</h2>
                <p className="text-white/50 text-sm md:text-md mb-8 leading-relaxed">
                  We treat physical storage like a secure banking vault. Your assets are logged with structural precision, isolated in biometrically secured layouts, and insured against global transport liabilities under global carrier compliance guidelines.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/60 border border-white/5 p-4 rounded-xl">
                    <h4 className="font-extrabold text-sm text-white">24/7 CCTV Vault</h4>
                    <p className="text-[10px] text-white/40 mt-0.5">Biometric checkpoints guarding facility bounds.</p>
                  </div>
                  <div className="bg-black/60 border border-white/5 p-4 rounded-xl">
                    <h4 className="font-extrabold text-sm text-white">Insured Cargo</h4>
                    <p className="text-[10px] text-white/40 mt-0.5">Full declared value logistics indemnification protection.</p>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] lg:h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center bg-black/40">
                
                {/* Custom Graphical Representation of Shield Check Verification */}
                <div className="text-center p-8 space-y-6 relative z-10 max-w-sm">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-2 border-dashed border-[#D4AF37]/40 flex items-center justify-center mx-auto"
                  >
                    <div className="w-24 h-24 rounded-full border-2 border-solid border-[#D4AF37]/20 flex items-center justify-center bg-[#D4AF37]/5">
                      <Lock className="w-10 h-10 text-[#D4AF37]" />
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">STORAGE HUB ATTESTED</h3>
                    <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest font-mono">ID: F4U-LOCKER-VERIFIED</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-1 px-3 rounded-full font-bold uppercase">SSL ENCRYPTED</span>
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 py-1 px-3 rounded-full font-bold uppercase">CCTV COMPLIANT</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Customer Testimonials */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Stored with <span className="text-[#D4AF37]">FENWAY4U</span></h2>
          <p className="text-white/50 text-sm">Real stories from travelers, students, and businesses who rely on our storage network.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-[#0b0c10] border border-white/5 p-8 rounded-3xl relative flex flex-col justify-between hover:border-white/10 transition-colors">
              <span className="text-4xl text-[#D4AF37]/20 absolute top-6 left-6 font-serif">“</span>
              <p className="text-white/70 text-xs italic leading-relaxed pt-6 mb-6">"{test.quote}"</p>
              <div className="text-xs font-bold text-white tracking-wide border-t border-white/5 pt-4">
                {test.author}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 10: FAQ Section */}
      <section className="py-24 px-6 relative z-10 bg-[#09090c] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Storage & Consolidation <span className="text-[#D4AF37]">FAQ</span></h2>
            <p className="text-white/50 text-sm">Got questions? We've got structural answers to secure your peace of mind.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-[#0b0c10] border border-white/5 rounded-2xl overflow-hidden transition-all"
                >
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors gap-4"
                  >
                    <span className="font-extrabold text-sm text-white/95">{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-white/5"
                      >
                        <p className="px-6 py-5 text-xs text-white/50 leading-relaxed bg-[#050505]/40">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#0c0d14] via-[#050505] to-black border border-white/5 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">Store Smart. Ship Globally. <br /><span className="text-[#D4AF37]">Save More.</span></h2>
            <p className="text-white/60 text-sm md:text-md max-w-lg mx-auto">
              Flexible international storage options, climate regulated lockers, and cost-effective shipping consolidation tailored for modern global living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button 
                onClick={() => {
                  const event = new CustomEvent("open-contact-modal");
                  window.dispatchEvent(event);
                }}
                className="bg-[#D4AF37] hover:bg-yellow-400 text-black font-extrabold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
              >
                Start Storing Today <Warehouse className="w-4 h-4" />
              </button>
              <a 
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                WhatsApp Concierge <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
