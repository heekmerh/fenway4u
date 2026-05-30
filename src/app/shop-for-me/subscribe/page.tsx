"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Calendar, ShoppingBag, Gift, Coffee, Heart, Check, 
  ArrowRight, ShieldCheck, Star, Trash2, Plus, Clock, HelpCircle, 
  Info, ChevronDown, CheckCircle, Package, Truck, Compass, 
  UserCheck, Plane, Smile, ArrowUpRight, DollarSign, X, Sliders, 
  AlertTriangle, Search, Minus, CalendarDays, RefreshCw, Eye
} from "lucide-react";

// --- Plan Types & Data Structures ---
const plans = [
  {
    id: "essential",
    name: "Essential Home Box",
    popular: false,
    price: "$99",
    period: "month",
    description: "Perfect for students abroad, single professionals, and small households needing a regular taste of home.",
    badge: "Student & Solo Friendly",
    accent: "border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    bgAccent: "from-blue-600/10 to-cyan-500/5",
    buttonAccent: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    items: ["Ijebu Garri (2KG)", "Indomie Noodles (1 Carton)", "Suya Spices & Chin Chin", "Plantain Chips (5 Packs)", "Weekend Soup Sourcing (Garlic, Crayfish)"],
    features: ["1 Sourced Delivery Monthly", "Custom Sourcing Surcharge Waiver", "Standard Telegram Support Chat"]
  },
  {
    id: "family",
    name: "Family Care Package",
    popular: true,
    price: "$199",
    period: "month",
    description: "Our most chosen tier. Tailored for larger households and frequent grocery buyers who want premium global shipping.",
    badge: "Most Popular Sourcing",
    accent: "border-orange-500/30 hover:border-orange-500/60 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]",
    bgAccent: "from-orange-600/15 to-red-500/5",
    buttonAccent: "bg-gradient-to-r from-orange-500 to-red-650 hover:from-red-650 hover:to-orange-500 text-white shadow-[0_0_25px_rgba(249,115,22,0.4)]",
    items: ["Bulk White/Yellow Garri (5KG)", "Family Sized Egusi & Soup Prep", "Nsukka Palm Oil (3 Liters)", "Vacuum Sealed Smoked Fish & Snails", "Consolidated Shopping Sourcing"],
    features: ["2 Flexible Shipments Monthly", "Free Package Consolidation", "Priority Sourcing Premium Queue", "Dedicated Telegram Sourcing Channel"]
  },
  {
    id: "luxury",
    name: "Premium Global Concierge",
    popular: false,
    price: "$399",
    period: "month",
    description: "Elite service tier for busy executives and luxury convenience seekers requiring dedicated personal shopping assistance.",
    badge: "VIP Sourcing Membership",
    accent: "border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]",
    bgAccent: "from-[#D4AF37]/10 to-amber-500/5",
    buttonAccent: "bg-[#D4AF37] hover:bg-[#F3C332] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]",
    items: ["Dedicated Personal Shopper", "Unlimited Custom Sourcing Requests", "Rare/Hard-to-find Item Procurement", "Luxury Fashion & Tech VIP Handling", "Premium Aviation Fast-Track Air Shipping"],
    features: ["Unlimited Monthly Deliveries", "Zero Concierge Commissions", "24/7 VIP Dedicated Account Manager", "Complimentary Freshness Wrapping"]
  }
];

const foodBoxes = [
  {
    title: "Student Survival Box",
    desc: "Curated with instant noodles, traditional local snacks, Ijebu garri, sugar, and quick seasoning cubes.",
    image: "/images/tech_gadget_sourcing.png",
    accent: "border-blue-500/20"
  },
  {
    title: "Weekend Soup Package",
    desc: "Complete ingredients list including hand-peeled Egusi, crayfish, organic palm oil, dry leaf herbs, and vaccum fish.",
    image: "/images/african_groceries_banner.png",
    accent: "border-orange-500/20"
  },
  {
    title: "Monthly African Essentials",
    desc: "The absolute staples: high grade yam flour (Elubo), white garri, Nsukka honey, native tea blends, and local spices.",
    image: "/images/sea_freight_test_1_1779128965828.png",
    accent: "border-yellow-500/20"
  },
  {
    title: "Mom's Kitchen Box",
    desc: "Nostalgic culinary items: special regional pepper mixes, native seeds, local locust bean condiments (Iru), and kiln-dried fish.",
    image: "/images/luxury_fashion_sourcing.png",
    accent: "border-purple-500/20"
  }
];

const features = [
  { title: "Automated Deliveries", desc: "Set your list once and receive it on autopilot every single month. Pause or edit anytime with a click.", icon: Calendar, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { title: "Custom Sourcing Lists", desc: "Want a specific native spice or a designer item from a local mall? Just add it to your monthly subscription list.", icon: Star, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { title: "Warehouse Consolidation", desc: "Combine multiple store orders into a single monthly parcel. Avoid triple shipping charges completely.", icon: Package, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { title: "Flexible Delivery Scheduling", desc: "Control your transit periods completely. Choose weekly, monthly, or quarterly schedules to fit your traveling lifestyle.", icon: Clock, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { title: "Priority Sourcing Queue", desc: "Subscribers receive instant shopper allocation. Our local shoppers head straight to the market on release day.", icon: Sparkles, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  { title: "Dedicated Sourcing Assistant", desc: "Premium tier members get direct WhatsApp & Telegram channels with a real shopper standing inside physical local shops.", icon: UserCheck, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" }
];

const lifestyleBoxes = [
  { title: "Surprise Care Packages", desc: "Sponsor and schedule recurring home-delivered boxes for your kids, siblings, or parents studying or residing abroad. Complete with a handwritten card.", icon: Gift, border: "hover:border-red-500/30" },
  { title: "Festive Holiday Boxes", desc: "Special cultural shipments compiled during Christmas, Eid, New Year, and birthdays, containing curated native clothes, regional delicacies, and gifts.", icon: Sparkles, border: "hover:border-[#D4AF37]/30" },
  { title: "Health & Wellness Care", desc: "Organic bitter leaf infusions, herbal wellness spices, supplements, local cold-pressed coconut oils, and authentic shea butter packages.", icon: Heart, border: "hover:border-emerald-500/30" },
  { title: "Luxury Import Concierge", desc: "Diaspora members can schedule recurring sourcing of high-end Western chocolates, premium gadgets, designer cosmetics, and toys back to kids in Africa.", icon: ShoppingBag, border: "hover:border-blue-500/30" },
  { title: "B2B Business Restock", desc: "Designed for African restaurants, local grocery stores, and independent resellers. Auto-replenish shelf staples on custom recurring timelines.", icon: DollarSign, border: "hover:border-purple-500/30" }
];

const timelineSteps = [
  { step: "01", title: "Choose Subscription Plan", desc: "Select the recurring package tier that matches your frequency and budget. Essential, Family, or Luxury Concierge." },
  { step: "02", title: "Customize Sourcing List", desc: "Pre-fill your box with your preferred grocery brands, items, and sizes inside our smart customizer console." },
  { step: "03", title: "We Procure & Vaccum Prep", desc: "Our personal shoppers purchase items fresh from trusted local vendors, vacuum seal them, and inspect package integrity." },
  { step: "04", title: "Global Doorstep Delivery", desc: " scheduled priority air shipments complete with real-time customs tracking, delivered straight to your international address." }
];

const testimonials = [
  {
    quote: "With the Family Care Package subscription, I never have to look for where to buy clean Egusi or native spices in London. It arrives vacuum-sealed, perfectly fresh every month.",
    author: "Dr. Chioma N., Pediatrician, London",
    plan: "Family Care Plan"
  },
  {
    quote: "My mother sponsors the Student Survival Box for me here in Toronto. The instant noodles, traditional cabin biscuits, and home spices save me huge budget costs and make me feel connected.",
    author: "Tobi A., Student in Canada",
    plan: "Essential Home Box"
  },
  {
    quote: "The VIP Concierge service handles all my high-end electronics sourcing and designer clothing monthly without standard commissions. An exceptional luxury logistics partner.",
    author: "Marcus K., Tech Executive, New York",
    plan: "VIP Sourcing Concierge"
  }
];

const faqs = [
  { q: "How do monthly subscriptions work?", a: "Once you choose a membership plan, you establish a recurring schedule (typically monthly). You fill your virtual subscription box with items. We bill automatically, procure the items fresh on your scheduled shipment day, and ship them internationally with full tracking support." },
  { q: "Can I edit my subscription list between deliveries?", a: "Absolutely. You can log into your simulated subscriber portal on this page or email/message us to customize, swap, add, or delete products up to 72 hours before your recurring packing day." },
  { q: "How are food items packed for long journeys?", a: "All fresh and dry food items undergo high-pressure vacuum sealing. This prevents oxygen flow, preserves taste, eliminates smells, and complies with international export safety regulations." },
  { q: "Can I pause or cancel my subscription?", a: "Yes. Sourcing memberships have zero long-term commitments. You can pause, skip, or cancel your scheduled delivery instantly from your subscriber portal or by chatting with our Telegram support." }
];

// Preloaded checklist defaults for plan subscriptions
const DEFAULT_ITEMS_BY_PLAN: Record<string, { name: string; qty: number; unit: string; freq: string }[]> = {
  essential: [
    { name: "Ijebu Garri", qty: 2, unit: "KG", freq: "Every Month" },
    { name: "Indomie Noodles", qty: 1, unit: "Cartons", freq: "Every Month" },
    { name: "Suya Spices & Chin Chin", qty: 1, unit: "Packs", freq: "Every Month" },
    { name: "Plantain Chips", qty: 5, unit: "Packs", freq: "Every Month" }
  ],
  family: [
    { name: "Bulk White Garri", qty: 5, unit: "KG", freq: "Every Month" },
    { name: "Family Sized Egusi & Soup Prep", qty: 2, unit: "KG", freq: "Every Month" },
    { name: "Nsukka Palm Oil", qty: 3, unit: "Liters", freq: "Every Month" },
    { name: "Vacuum Sealed Smoked Fish & Snails", qty: 2, unit: "KG", freq: "Every Month" }
  ],
  luxury: [
    { name: "Premium Dry Foods Basket", qty: 10, unit: "KG", freq: "Every Month" },
    { name: "Nsukka Wild Honey", qty: 2, unit: "Liters", freq: "Every Month" },
    { name: "Gourmet Local Spice Box", qty: 3, unit: "Packs", freq: "Every Month" },
    { name: "Kiln-Dried Smoked Catfish", qty: 3, unit: "KG", freq: "Every Month" },
    { name: "Hand-picked Seasonal Snacks", qty: 5, unit: "Packs", freq: "Every Month" }
  ]
};

const trendingStaples = [
  "Ijebu Garri",
  "White Garri",
  "Egusi (Melon Seed)",
  "Nsukka Palm Oil",
  "Dried Crayfish",
  "Yam Flour (Elubo)",
  "Suya Seasoning Pack",
  "Honeywell Poundo Yam",
  "Local Smoked Catfish",
  "Vacuum Smoked Snails",
  "Chin Chin Snack",
  "Plantain Chips",
  "Indomie Noodles",
  "Kiln-Dried Fish",
  "Locust Beans (Iru)",
  "Dry Ugu Leaves"
];

interface SubscriptionItem {
  id: string;
  name: string;
  qty: number;
  unit: string;
  freq: string;
}

export default function SubscriptionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Dynamic Onboarding Editor Modal States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activePlan, setActivePlan] = useState("family");
  
  // Customizer state
  const [subItems, setSubItems] = useState<SubscriptionItem[]>([]);
  const [subDestination, setSubDestination] = useState("United States");
  const [subCustomCountry, setSubCustomCountry] = useState("");
  const [subShippingSpeed, setSubShippingSpeed] = useState("express");
  const [subPackageSizer, setSubPackageSizer] = useState(1.0); // 1.0 = standard, 1.2 = +20% Large, 1.5 = +50% Jumbo
  const [subBudgetCap, setSubBudgetCap] = useState(500);
  const [subNextDeliveryDate, setSubNextDeliveryDate] = useState("June 15, 2026");
  
  // Actions states
  const [isSkipActive, setIsSkipActive] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [subSuccessModal, setSubSuccessModal] = useState(false);
  const [subNote, setSubNote] = useState("");

  // Simulated Portal State (for page dashboard preview)
  const [isPaused, setIsPaused] = useState(false);
  const [portalStatus, setPortalStatus] = useState("Active");
  const [editSuccess, setEditSuccess] = useState(false);

  // SSR Hydration Safeguards
  const [mounted, setMounted] = useState(false);
  const [subscriberCode, setSubscriberCode] = useState("");

  useEffect(() => {
    setMounted(true);
    setSubscriberCode(`CONCIERGE-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isEditorOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isEditorOpen]);

  // Handle plan button select - opens fullscreen onboarding customization
  const handleSubscribeInit = (planId: string) => {
    setActivePlan(planId);
    
    // Auto load items checklist matching the plan selected
    const defaults = DEFAULT_ITEMS_BY_PLAN[planId] || DEFAULT_ITEMS_BY_PLAN.family;
    const itemsWithIds = defaults.map((item, idx) => ({
      id: `${planId}-${idx}-${Date.now()}`,
      name: item.name,
      qty: item.qty,
      unit: item.unit,
      freq: item.freq
    }));
    
    setSubItems(itemsWithIds);
    setIsEditorOpen(true);
  };

  // Modify quantities inside rows
  const handleQtyChange = (itemId: string, increment: boolean) => {
    setSubItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const nextQty = increment ? item.qty + 1 : Math.max(1, item.qty - 1);
        return { ...item, qty: nextQty };
      }
      return item;
    }));
  };

  // Modify unit dropdowns
  const handleUnitChange = (itemId: string, nextUnit: string) => {
    setSubItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, unit: nextUnit };
      }
      return item;
    }));
  };

  // Modify custom frequencies inside row checklist
  const handleFreqChange = (itemId: string, nextFreq: string) => {
    setSubItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, freq: nextFreq };
      }
      return item;
    }));
  };

  // Add Item to active checklist
  const handleAddNewItem = (itemName: string) => {
    if (!itemName.trim()) return;
    const newItem: SubscriptionItem = {
      id: `custom-item-${Date.now()}-${Math.random()}`,
      name: itemName.trim(),
      qty: 1,
      unit: itemName.toLowerCase().includes("oil") || itemName.toLowerCase().includes("honey") ? "Liters" : "KG",
      freq: "Every Month"
    };
    setSubItems(prev => [...prev, newItem]);
    setSearchQuery("");
    setIsAddItemOpen(false);
  };

  // Trigger inline delete bubbles
  const handleTriggerDelete = (itemId: string) => {
    setConfirmDeleteId(itemId);
  };

  const handleConfirmDelete = (itemId: string) => {
    setSubItems(prev => prev.filter(item => item.id !== itemId));
    setConfirmDeleteId(null);
  };

  // Recalculate price matrix dynamically in real-time
  const calculateDynamicTotals = () => {
    let basePlanRate = 199;
    if (activePlan === "essential") basePlanRate = 99;
    else if (activePlan === "luxury") basePlanRate = 399;

    // Apply package sizing multiplier (+20% / +50%)
    const sizingRate = basePlanRate * subPackageSizer;
    
    // Country Validation Surcharges
    let destinationSurcharge = 25;
    if (subDestination === "Canada") destinationSurcharge = 35;
    else if (subDestination === "United Kingdom") destinationSurcharge = 30;
    else if (subDestination === "Rest of World") destinationSurcharge = 75; // Rest of world triggers alert & high fee

    // Shipping speeds rates
    let shippingSpeedRate = 35; // express air
    if (subShippingSpeed === "standard") shippingSpeedRate = 15; // standard sea
    else if (subShippingSpeed === "priority") shippingSpeedRate = 65; // VIP direct aviation

    // Item count dynamic premium (reflect items scale Reactively)
    const customItemsCount = subItems.length;
    const itemsSourcingFee = subItems.reduce((acc, curr) => acc + (curr.qty * 3.5), 0);

    const subtotal = Math.round(sizingRate + destinationSurcharge + shippingSpeedRate + itemsSourcingFee);
    const memberSaving = Math.round(subtotal * 0.20); // 20% recurring member savings guarantee
    const total = Math.round(subtotal - memberSaving);

    // If skip cycle is active, dynamic invoice total is 0, but base continues to show preview
    return {
      subtotal,
      saving: memberSaving,
      shipping: destinationSurcharge + shippingSpeedRate,
      itemsCommission: Math.round(itemsSourcingFee),
      baseRate: Math.round(sizingRate),
      total: isSkipActive ? 0 : total,
      totalPreview: total
    };
  };

  const currentInvoice = calculateDynamicTotals();
  const isBudgetExceeded = currentInvoice.totalPreview > subBudgetCap;

  // Handle portal simulation toggles
  const handlePortalPause = () => {
    if (isPaused) {
      setIsPaused(false);
      setPortalStatus("Active");
    } else {
      setIsPaused(true);
      setPortalStatus("Paused");
    }
  };

  // Compile final selection and dispatch mailto console
  const handleSaveSubscription = () => {
    setIsEditorOpen(false);
    setSubSuccessModal(true);

    const activePlanName = plans.find(p => p.id === activePlan)?.name || "Family Care Package";

    const subject = encodeURIComponent(`FENWAY4U Concierge Subscription Customizer — ${activePlanName.toUpperCase()}`);
    const bodyText = `========= CUSTOM SUBSCRIPTION ONBOARDING RECEIPT =========
Subscriber Reference ID: ${subscriberCode}
Selected Plan: ${activePlanName}
Active Billing Frequency: Monthly Autopilot
Package Volume Scaling: ${subPackageSizer === 1.0 ? "Standard Package (1.0x Sizer)" : subPackageSizer === 1.2 ? "Large Box (+20% volume sizer)" : "Jumbo Concierge Box (+50% volume sizer)"}
Cycle Schedule Status: ${isSkipActive ? "PAUSED (Skip next delivery active)" : "ACTIVE"}
Next Sourcing Packaging Day: ${subNextDeliveryDate}

--------- LOGISTICS & DESTINATION SHIPPING ---------
Destination Country: ${subDestination === "Rest of World" ? subCustomCountry : subDestination}
Preferred Transit Level: ${subShippingSpeed.toUpperCase()} (${subShippingSpeed === "priority" ? "VIP Direct Aviation" : subShippingSpeed === "express" ? "Express Air Sourced" : "Standard Consolidated Sea"})

--------- DYNAMIC INVENTORIED CONCIERGE LIST ---------
${subItems.map((item, idx) => {
  return `${idx + 1}. Staple: ${item.name} | Qty: ${item.qty} ${item.unit} | Interval: ${item.freq}`;
}).join("\n")}

${subNote ? `\nSubscriber Concierge Notes:\n"${subNote}"` : ""}

--------- LIVE RETAINER PRICING CALCULATION ---------
Base Plan Fee: $${currentInvoice.baseRate} USD / mo
Logistics, Clearing & Delivery Surcharges: $${currentInvoice.shipping} USD
Items Procurement Surcharges: $${currentInvoice.itemsCommission} USD
Estimated Retainer Subtotal: $${currentInvoice.subtotal} USD
20% Recurring Member Savings Guarantee: -$${currentInvoice.saving} USD
---------------------------------------------------------
Estimated Monthly Sourcing Invoice Retainer: $${currentInvoice.totalPreview} USD / month
${isSkipActive ? "(Note: Next packaging cycle has been skipped. Sourcing bill is $0.00 for June cycle.)" : ""}

---
Auto-compiled on ${new Date().toLocaleDateString()} via FENWAY4U VIP Concierge Portal.`;

    const body = encodeURIComponent(bodyText);
    
    // Automatically trigger window mailto link
    setTimeout(() => {
      window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
    }, 2000);
  };

  // FilterAutocomplete staples drawer
  const filteredStaples = trendingStaples.filter(staple => 
    staple.toLowerCase().includes(searchQuery.toLowerCase()) && 
    !subItems.some(item => item.name.toLowerCase() === staple.toLowerCase())
  );

  return (
    <div className="bg-[#050505] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#050505] relative overflow-hidden">
      
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-[8%] left-[-20%] w-[650px] h-[650px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-20%] w-[650px] h-[650px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[55%] left-[-20%] w-[650px] h-[650px] bg-orange-950/15 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[80%] right-[-10%] w-[550px] h-[550px] bg-fuchsia-950/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden px-6 bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/95 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#050505]/90 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-950/20 via-[#050505]/90 to-[#050505]" />
          <Image 
            src="/images/shop_for_me_hero.png" 
            alt="Vibrant Sourcing Boxes Background" 
            fill 
            priority
            className="object-cover opacity-30 pointer-events-none mix-blend-screen"
          />

          {/* Animated Sourcing Package Widget */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-[8%] w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-2xl hidden md:flex"
          >
            <Calendar className="w-8 h-8 text-[#D4AF37] mb-1 animate-pulse" />
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Monthly</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 right-[22%] w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hidden lg:flex"
          >
            <Package className="w-8 h-8 text-blue-400" />
          </motion.div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-semibold mb-8 uppercase tracking-widest backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Global Concierge Subscriptions
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-white"
            >
              Never Worry About <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#D4AF37] to-cyan-400 font-black">
                International Shopping Again
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed font-light max-w-3xl"
            >
              Automated monthly sourcing, African grocery deliveries, recurring package shipments, and personal shopping support tailored to your busy lifestyle.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#plans" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-extrabold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 text-lg transform hover:scale-105">
                Start Sourcing Subscription <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#customizer-widget" className="bg-white/5 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm group">
                <Calendar className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" /> View Membership Plans
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Features Placeholder Banner */}
      <div className="border-y border-white/5 bg-[#0d0d0d] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-12 relative z-10 text-white/50 text-sm font-medium tracking-widest uppercase">
          <span className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors"><Truck className="w-4 h-4 text-blue-400" /> Automated monthly deliveries</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-orange-400 transition-colors"><Sparkles className="w-4 h-4 text-orange-400" /> Curated Lifestyle boxes</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-colors"><Heart className="w-4 h-4 text-[#D4AF37]" /> Sourced With Love</span>
        </div>
      </div>

      {/* MEMBERSHIP PLANS SECTION */}
      <section id="plans" className="py-24 px-6 bg-[#050505] relative border-b border-white/5">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Membership <span className="text-[#D4AF37]">Plans</span></h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">Flexible curated tiers engineered to remove logistics stress. Select the concierge volume that fits your family.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`bg-[#0d0d0d]/95 rounded-3xl p-8 border transition-all duration-500 flex flex-col justify-between relative ${plan.accent}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-650 text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full border border-orange-500/30 tracking-widest animate-pulse">
                    {plan.badge}
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white">{plan.name}</h3>
                      <p className="text-xs text-white/50 mt-1">{plan.description}</p>
                    </div>
                  </div>

                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 font-mono">{plan.price}</span>
                    <span className="text-white/40 text-sm ml-2">/ {plan.period}</span>
                  </div>

                  <div className="border-t border-white/5 pt-6 mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-4">Sample Box Sourcing:</p>
                    <ul className="space-y-3">
                      {plan.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-white/70">
                           <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="border-t border-white/5 pt-6 mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">Service Benefits Included:</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-white/50">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSubscribeInit(plan.id)}
                    className={`w-full py-4 px-6 rounded-xl font-extrabold text-center block transition-all text-sm uppercase tracking-wider ${plan.buttonAccent}`}
                  >
                    Subscribe & Customize List
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* AFRICAN FOOD SUBSCRIPTION EXPERIENCE */}
      <section className="py-24 px-6 relative bg-[#090909] border-b border-white/5">
        <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-orange-950/15 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="container mx-auto max-w-7xl relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Storytelling Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase backdrop-blur-md border border-orange-500/30">
                <Heart className="w-3.5 h-3.5 fill-orange-400 animate-pulse" /> A Taste of Home — Delivered Monthly
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#D4AF37] to-red-400 font-extrabold">Fresh Staples Sourced with Nostalgic Love</h2>
              <p className="text-white/60 leading-relaxed text-sm">
                Distance shouldn't separate you from authentic flavor. Our personal shoppers pack carefully vacuum-sealed premium African groceries and cultural essentials, Priority Air shipping them directly to your international doorstep. No stress, no local search, pure emotional comfort.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 text-left">
                <div className="bg-[#0d0d0d]/80 border border-white/5 p-4 rounded-xl">
                  <Coffee className="w-6 h-6 text-orange-400 mb-2" />
                  <h4 className="text-xs font-bold">Absolute Freshness</h4>
                  <p className="text-[10px] text-white/40 mt-1">Vacuum-sealed to preserve organic aroma perfectly.</p>
                </div>
                <div className="bg-[#0d0d0d]/80 border border-white/5 p-4 rounded-xl">
                  <Package className="w-6 h-6 text-orange-400 mb-2" />
                  <h4 className="text-xs font-bold">Consolidated Boxing</h4>
                  <p className="text-[10px] text-white/40 mt-1">Saves over 40% on recurring international fees.</p>
                </div>
              </div>
            </div>

            {/* Food Box displays grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {foodBoxes.map((box, idx) => (
                <div key={idx} className={`bg-[#0d0d0d]/90 backdrop-blur-md border p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${box.accent}`}>
                  <div className="absolute right-0 top-0 w-24 h-full bg-orange-500/5 blur-2xl pointer-events-none" />
                  <h3 className="font-bold text-base text-white flex items-center gap-1.5"><Package className="w-4 h-4 text-orange-400 shrink-0" /> {box.title}</h3>
                  <p className="text-[11px] text-white/50 mt-3 leading-normal">{box.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* RECURRING DELIVERY PRIVILEGES */}
      <section className="py-24 px-6 bg-[#050505] relative border-b border-white/5">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Elite Subscription <span className="text-[#D4AF37]">Privileges</span></h2>
            <p className="text-white/40 text-sm max-w-md mx-auto">Concierge logistical superpowers included in all personal shopper plans.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-[#0d0d0d]/80 border border-white/5 p-8 rounded-3xl transition-colors hover:border-[#D4AF37]/35 relative group">
                <div className={`absolute top-6 right-6 w-10 h-10 rounded-xl flex items-center justify-center border backdrop-blur-md ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg mb-3 pt-6">{feature.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE CONCIERGE CONFIGURATOR WIDGET (ON-PAGE LIVE SIMULATOR) */}
      <section id="customizer-widget" className="py-24 px-6 bg-[#090909] relative border-b border-white/5">
        <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="container mx-auto max-w-4xl relative z-10">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Sourcing customizer console
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white font-extrabold">Active Sourcing Calculator</h2>
            <p className="text-white/50 text-sm mt-1">Simulate logistics and billing options to see how member discounts are automatically applied.</p>
          </div>

          <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 text-left relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Concierge Membership Tier</label>
                  <select 
                    value={activePlan}
                    onChange={(e) => setActivePlan(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="essential">Essential Home Box ($99/mo Base)</option>
                    <option value="family">Family Care Package ($199/mo Base)</option>
                    <option value="luxury">Premium Concierge VIP ($399/mo Base)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Logistics Shipping Speed</label>
                  <select 
                    value={subShippingSpeed}
                    onChange={(e) => setSubShippingSpeed(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="standard">Standard Consolidated Sea (15-30 days)</option>
                    <option value="express">Express Priority Air (5-9 days)</option>
                    <option value="priority">VIP Direct Aviation Cargo (2-4 days)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Destination Area</label>
                  <select 
                    value={subDestination}
                    onChange={(e) => setSubDestination(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Rest of World">Rest of World (Surcharges Apply)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Dynamic Box Size multiplier</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setSubPackageSizer(1.0)}
                      className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase text-center border transition-all ${subPackageSizer === 1.0 ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]" : "bg-[#050505] text-white/60 border-white/5"}`}
                    >
                      1.0x Std
                    </button>
                    <button 
                      onClick={() => setSubPackageSizer(1.2)}
                      className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase text-center border transition-all ${subPackageSizer === 1.2 ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]" : "bg-[#050505] text-white/60 border-white/5"}`}
                    >
                      1.2x Lrg (+20%)
                    </button>
                    <button 
                      onClick={() => setSubPackageSizer(1.5)}
                      className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase text-center border transition-all ${subPackageSizer === 1.5 ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]" : "bg-[#050505] text-white/60 border-white/5"}`}
                    >
                      1.5x VIP (+50%)
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Live Estimator Breakdown panel */}
            <div className="bg-gradient-to-br from-[#120703] to-[#050505] border border-orange-500/20 p-5 rounded-2xl relative">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-extrabold uppercase text-[#D4AF37] tracking-wider flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Simulated Sourcing Total</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-2 py-0.5 rounded tracking-wider">20% Savings Guarantee Applied</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-white/60 border-b border-white/5 pb-4 mb-4">
                <div>
                  <p className="text-[9px] uppercase text-white/30">Regular Retail Sourcing</p>
                  <p className="font-extrabold text-white mt-0.5">${currentInvoice.subtotal} USD / mo</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-white/30">Member Discount (20%)</p>
                  <p className="font-extrabold text-emerald-400 mt-0.5">-$${currentInvoice.saving} USD / mo</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-white/30">Cleared Customs Transit</p>
                  <p className="font-extrabold text-white mt-0.5">{subShippingSpeed === "priority" ? "VIP Direct Air" : subShippingSpeed === "express" ? "Express Air" : "Standard Sea"}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-white">
                <div>
                  <p className="font-bold text-xs uppercase text-white/50 tracking-wider">Monthly Retainer Deposit</p>
                  <p className="text-[9px] text-white/30 mt-0.5">Customs clearing & handling included</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#D4AF37] font-mono">
                    ${currentInvoice.totalPreview} USD
                  </span>
                  <span className="text-[10px] text-white/40 ml-1">/ month</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleSubscribeInit(activePlan)}
              className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-extrabold py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] text-center text-sm uppercase tracking-widest flex items-center justify-center gap-2 transform hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 animate-pulse" /> Launch Advanced Concierge Checklist Sizer
            </button>

          </div>

        </div>
      </section>

      {/* LIFESTYLE CONCIERGE SPECIALTIES */}
      <section className="py-24 px-6 bg-[#050505] relative border-b border-white/5">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Concierge <span className="text-[#D4AF37]">Lifestyle Specialties</span></h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">Explore high-end subscription services tailored to celebrate cultural events, business operations, study periods abroad, and family support systems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifestyleBoxes.map((box, idx) => (
              <div key={idx} className={`bg-[#0d0d0d]/80 border border-white/5 p-8 rounded-3xl transition-all duration-300 relative group flex flex-col justify-between ${box.border}`}>
                <div>
                  <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#D4AF37]/45 transition-colors">
                    <box.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-extrabold text-xl mb-3 text-white">{box.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-6">{box.desc}</p>
                </div>
                <button 
                  onClick={() => handleSubscribeInit("family")}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors text-left"
                >
                  Configure This Sourcing <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="py-24 px-6 bg-[#090909] relative border-b border-white/5">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4">The Subscription <span className="text-[#D4AF37]">Workflow</span></h2>
            <p className="text-white/40 text-sm">Four clear operational phases providing absolute transparency from sourcing to delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500/10 via-orange-500/40 to-orange-500/10 -z-0" />
            
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 text-center space-y-4">
                <div className="w-14 h-14 mx-auto bg-[#050505] border-2 border-orange-500/40 rounded-xl flex items-center justify-center text-lg font-bold text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.15)] group hover:scale-105 transition-transform shrink-0 font-mono">
                  {step.step}
                </div>
                <h3 className="font-extrabold text-lg text-white">{step.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY DIASPORA FAMILIES */}
      <section className="py-24 px-6 bg-[#050505] relative border-b border-white/5">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Trusted By <span className="text-[#D4AF37]">Diaspora Families</span></h2>
            <p className="text-white/40 text-sm">Emotional stories of automated unboxing experiences from around the world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-[#0d0d0d] rounded-3xl p-8 border border-white/5 relative flex flex-col justify-between">
                <div className="text-[#D4AF37] text-4xl font-serif absolute top-4 left-6 opacity-25">"</div>
                <p className="text-white/80 italic leading-relaxed text-sm relative z-10 pt-4 mb-6">"{test.quote}"</p>
                <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs">
                  <span className="font-extrabold text-[#D4AF37]">— {test.author}</span>
                  <span className="bg-white/5 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider text-white/40 border border-white/5">{test.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBER MANAGEMENT INTERACTIVE PREVIEW PANEL */}
      <section className="py-24 px-6 bg-[#090909] relative">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black">Subscriber Management <span className="text-[#D4AF37]">Console</span></h2>
            <p className="text-white/50 text-sm mt-1">Manage active schedules, pause billing, or track scheduled unboxings in your subscriber portal preview.</p>
          </div>

          <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-full bg-blue-500/5 blur-2xl pointer-events-none" />
            
            {/* Portal Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/40">Concierge Account Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-extrabold text-white">CONCIERGE-908754</span>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider border
                    ${isPaused ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                    {portalStatus}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePortalPause}
                  className={`text-xs font-extrabold uppercase px-4 py-2.5 rounded-xl border transition-all
                    ${isPaused 
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white border-transparent shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                      : "bg-[#050505] hover:bg-white/5 text-white/80 hover:text-white border-white/10"}`}
                >
                  {isPaused ? "Resume Subscription" : "Pause Deliveries"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditSuccess(true);
                    setTimeout(() => setEditSuccess(false), 3000);
                  }}
                  className="bg-white/5 text-white/80 hover:text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl border border-white/10 transition-colors"
                >
                  Save Active Sourcing List
                </button>
              </div>
            </div>

            {/* Portal active alerts */}
            <AnimatePresence>
              {editSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-2 text-xs text-emerald-400"
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Success! Your active monthly sourcing list was saved and synced to the logistics center.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left text-xs">
              <div className="bg-[#050505] p-5 rounded-2xl border border-white/5">
                <p className="text-white/40 text-[9px] uppercase tracking-wider font-bold">Next Packaging Day</p>
                <p className="font-extrabold text-white mt-1.5">June 15, 2026</p>
                <p className="text-[10px] text-[#D4AF37] mt-0.5">Sourcing begins fresh at dawn</p>
              </div>
              <div className="bg-[#050505] p-5 rounded-2xl border border-white/5">
                <p className="text-white/40 text-[9px] uppercase tracking-wider font-bold">Scheduled Logistics Route</p>
                <p className="font-extrabold text-white mt-1.5">Priority Aviation Air</p>
                <p className="text-[10px] text-white/40 mt-0.5">Customs clearance pre-approved</p>
              </div>
              <div className="bg-[#050505] p-5 rounded-2xl border border-white/5">
                <p className="text-white/40 text-[9px] uppercase tracking-wider font-bold">Subscription Plan</p>
                <p className="font-extrabold text-white mt-1.5">Family Sized Package</p>
                <p className="text-[10px] text-white/40 mt-0.5">Includes consolidation discounts</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left outline-none"
                >
                  <span className={`font-medium text-lg ${openFaq === idx ? 'text-white' : 'text-white/70'}`}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-[#D4AF37]' : 'text-white/30'}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-8 pb-8 text-white/40 leading-relaxed font-light border-t border-white/5 pt-6 text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Subscription Bottom CTA */}
      <div className="fixed bottom-6 left-6 right-6 z-40 bg-[#0d0d0d]/85 backdrop-blur-md border border-[#D4AF37]/30 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 max-w-5xl mx-auto shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center shrink-0 border border-orange-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h4 className="font-extrabold text-sm text-white">Subscribe & Skip Sourcing Commissions</h4>
            <p className="text-[10px] text-emerald-400 mt-0.5 font-bold">20% Savings Guarantee Applied Globally</p>
          </div>
        </div>
        <button
          onClick={() => handleSubscribeInit("family")}
          className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-lg text-center shrink-0 w-full sm:w-auto transform hover:scale-105"
        >
          Configure Concierge Plan
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 🚀 FULLSCREEN HIGH-FIDELITY ONBOARDING & SUBSCRIPTION EDITOR OVERLAY MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isEditorOpen && mounted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
          >
            <motion.div 
              initial={{ y: 80, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 80, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-[#0a0a0b] border border-[#D4AF37]/30 rounded-3xl w-full max-w-6xl overflow-hidden shadow-2xl relative flex flex-col md:grid md:grid-cols-12 min-h-[85vh] max-h-[92vh]"
            >
              
              {/* Gold Top Glimmer Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-[#D4AF37] to-cyan-500" />
              
              {/* Left Column: Cargo Customizer Checklist (8 Cols) */}
              <div className="md:col-span-7 lg:col-span-8 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[92vh] border-b md:border-b-0 md:border-r border-white/5">
                <div>
                  
                  {/* Overlay Header */}
                  <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[9px] uppercase tracking-widest font-bold text-[#D4AF37]">
                        <Sliders className="w-3 h-3 animate-spin-slow" /> Customizer Active
                      </div>
                      <h2 className="text-xl md:text-2xl font-black mt-2 text-white">
                        Sizing & Staples Customizer
                      </h2>
                      <p className="text-white/40 text-xs mt-0.5">
                        Customize quantities, units, and intervals for <span className="text-orange-400 font-extrabold uppercase">{plans.find(p=>p.id===activePlan)?.name}</span>.
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Checklist List */}
                  <div className="space-y-3 mb-6">
                    <p className="text-[10px] uppercase font-extrabold text-white/50 tracking-wider flex items-center gap-2">
                      <Package className="w-3.5 h-3.5 text-orange-400" /> Active Package Sourcing List
                    </p>
                    
                    {subItems.length === 0 ? (
                      <div className="bg-[#0f0f11] border border-dashed border-white/10 rounded-2xl p-8 text-center text-white/40 text-xs">
                        <ShoppingBag className="w-8 h-8 mx-auto text-white/20 mb-2" />
                        Your sourcing checklist is currently empty. Choose a plan or add items below!
                      </div>
                    ) : (
                      subItems.map((item, idx) => (
                        <motion.div 
                          key={item.id}
                          layout
                          className="bg-[#0f0f11] border border-white/5 hover:border-orange-500/20 p-3.5 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between transition-all relative overflow-hidden"
                        >
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-white tracking-wide">{item.name}</span>
                          </div>

                          <div className="w-full sm:w-auto flex flex-wrap gap-2.5 items-center justify-end">
                            
                            {/* Quantity Adjusters */}
                            <div className="bg-[#050505] border border-white/10 rounded-lg flex items-center p-1">
                              <button 
                                onClick={() => handleQtyChange(item.id, false)}
                                className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono font-bold text-white px-2.5 min-w-[28px] text-center">
                                {item.qty}
                              </span>
                              <button 
                                onClick={() => handleQtyChange(item.id, true)}
                                className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Unit type select */}
                            <select 
                              value={item.unit}
                              onChange={(e) => handleUnitChange(item.id, e.target.value)}
                              className="bg-[#050505] border border-white/10 rounded-lg p-1.5 text-[10px] font-bold text-white/80 outline-none focus:border-[#D4AF37] transition-colors"
                            >
                              <option value="KG">KG</option>
                              <option value="Liters">Liters</option>
                              <option value="Packs">Packs</option>
                              <option value="Cartons">Cartons</option>
                              <option value="Grams">Grams</option>
                            </select>

                            {/* Frequency select */}
                            <select 
                              value={item.freq}
                              onChange={(e) => handleFreqChange(item.id, e.target.value)}
                              className="bg-[#050505] border border-white/10 rounded-lg p-1.5 text-[10px] font-bold text-white/80 outline-none focus:border-[#D4AF37] transition-colors"
                            >
                              <option value="Every Month">Monthly</option>
                              <option value="Every 2 Months">Bi-Monthly</option>
                              <option value="Every Quarter">Quarterly</option>
                            </select>

                            {/* Delete Trigger */}
                            <button 
                              onClick={() => handleTriggerDelete(item.id)}
                              className="text-white/20 hover:text-red-400 p-1.5 transition-colors shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>

                          {/* Inline Confirmation Delete Bubble */}
                          <AnimatePresence>
                            {confirmDeleteId === item.id && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute inset-0 bg-[#0f0f11] flex items-center justify-center gap-4 z-10 px-4"
                              >
                                <span className="text-[10px] uppercase font-bold text-red-400 flex items-center gap-1">
                                  <AlertTriangle className="w-3.5 h-3.5" /> Remove {item.name}?
                                </span>
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => handleConfirmDelete(item.id)}
                                    className="bg-red-650 hover:bg-red-500 text-white font-bold text-[9px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors"
                                  >
                                    Yes, Delete
                                  </button>
                                  <button 
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-[9px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Add New Sourcing Item searchable drawer */}
                  <div className="bg-[#0f0f11] border border-dashed border-white/10 rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-wider">
                        Add Custom Staple Items
                      </span>
                      <button 
                        onClick={() => setIsAddItemOpen(!isAddItemOpen)}
                        className="text-[9px] font-extrabold uppercase text-orange-400 hover:text-white transition-colors"
                      >
                        {isAddItemOpen ? "Close Staple Tray" : "+ Browse Traditional Staples"}
                      </button>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
                        <input 
                          type="text"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsAddItemOpen(true);
                          }}
                          placeholder="Search or type custom grocery: Garri, Egusi, Suya spices..."
                          className="w-full bg-[#050505] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs outline-none text-white focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <button 
                        onClick={() => handleAddNewItem(searchQuery)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add Item
                      </button>
                    </div>

                    {/* Auto-complete tray */}
                    <AnimatePresence>
                      {isAddItemOpen && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-[#050505] border border-white/5 rounded-xl p-3 max-h-[140px] overflow-y-auto space-y-2 text-left"
                        >
                          <p className="text-[9px] uppercase font-bold text-white/30">Trending Staples Chips:</p>
                          <div className="flex flex-wrap gap-2">
                            {filteredStaples.length === 0 ? (
                              <p className="text-[10px] text-white/40 italic">Type to search new custom items...</p>
                            ) : (
                              filteredStaples.map((staple) => (
                                <button
                                  key={staple}
                                  onClick={() => handleAddNewItem(staple)}
                                  className="bg-white/5 border border-white/10 hover:border-orange-500/30 text-[9px] text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                                >
                                  + {staple}
                                </button>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                {/* Footer notes text field inside Left column */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-white/40 mb-2">Special Concierge Requests & Notes</label>
                  <textarea 
                    value={subNote}
                    onChange={(e) => setSubNote(e.target.value)}
                    placeholder="Specify food brands, vacuum sealing requests, or designer product details here..."
                    rows={2}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-xs outline-none focus:border-[#D4AF37] text-white transition-colors resize-none font-light"
                  />
                </div>

              </div>

              {/* Right Column: Calculations & Logistics Panel (4 Cols) */}
              <div className="md:col-span-5 lg:col-span-4 p-6 md:p-8 bg-[#0e0e10] flex flex-col justify-between overflow-y-auto max-h-[92vh]">
                <div className="space-y-6">
                  
                  {/* Header Title */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#D4AF37]">
                      Sourcing & Billing Specs
                    </h3>
                    <button 
                      onClick={() => setIsEditorOpen(false)}
                      className="text-white/40 hover:text-white p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* 1. Destination Country */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-white/50 mb-2">
                      Destination Country
                    </label>
                    <select 
                      value={subDestination}
                      onChange={(e) => setSubDestination(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors font-bold"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Rest of World">Rest of World (brokerage sifter fee)</option>
                    </select>

                    {/* Rest of World trigger validation alert */}
                    {subDestination === "Rest of World" && (
                      <div className="mt-2.5 space-y-2">
                        <div className="bg-orange-500/10 border border-orange-500/30 p-2.5 rounded-lg text-[10px] text-orange-400 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>Custom clearances outside USA/CAN/UK will involve specialized customs sifter surcharges.</span>
                        </div>
                        <input 
                          type="text" 
                          value={subCustomCountry}
                          onChange={(e) => setSubCustomCountry(e.target.value)}
                          placeholder="Type your exact shipping country..."
                          className="w-full bg-[#050505] border border-white/5 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#D4AF37] text-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* 2. Package Sizing multipliers */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-white/50 mb-2">
                      Package Sizing scale
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSubPackageSizer(1.0)}
                        className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${subPackageSizer === 1.0 ? "border-[#D4AF37] bg-[#D4AF37]/15 text-white" : "border-white/5 bg-[#050505] text-white/40 hover:text-white"}`}
                      >
                        <span className="text-xs font-bold font-mono">Standard</span>
                        <span className="text-[8px] uppercase font-bold text-white/50 tracking-wider">1.0x Box</span>
                      </button>
                      <button
                        onClick={() => setSubPackageSizer(1.2)}
                        className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${subPackageSizer === 1.2 ? "border-[#D4AF37] bg-[#D4AF37]/15 text-white" : "border-white/5 bg-[#050505] text-white/40 hover:text-white"}`}
                      >
                        <span className="text-xs font-bold text-cyan-400 font-mono">+20% Large</span>
                        <span className="text-[8px] uppercase font-bold text-white/50 tracking-wider">1.2x Box</span>
                      </button>
                      <button
                        onClick={() => setSubPackageSizer(1.5)}
                        className={`p-2 border rounded-xl flex flex-col items-center justify-center transition-all ${subPackageSizer === 1.5 ? "border-[#D4AF37] bg-[#D4AF37]/15 text-white" : "border-white/5 bg-[#050505] text-white/40 hover:text-white"}`}
                      >
                        <span className="text-xs font-bold text-orange-400 font-mono">+50% Jumbo</span>
                        <span className="text-[8px] uppercase font-bold text-white/50 tracking-wider">1.5x Box</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Delivery speed */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-white/50 mb-2">
                      Logistics Speed Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSubShippingSpeed("standard")}
                        className={`p-2.5 border rounded-xl text-[10px] font-extrabold uppercase text-center transition-all ${subShippingSpeed === "standard" ? "border-blue-400 bg-blue-500/10 text-white" : "border-white/5 bg-[#050505] text-white/40"}`}
                      >
                        Standard Sea
                      </button>
                      <button
                        onClick={() => setSubShippingSpeed("express")}
                        className={`p-2.5 border rounded-xl text-[10px] font-extrabold uppercase text-center transition-all ${subShippingSpeed === "express" ? "border-cyan-400 bg-cyan-500/10 text-white" : "border-white/5 bg-[#050505] text-white/40"}`}
                      >
                        Express Air
                      </button>
                      <button
                        onClick={() => setSubShippingSpeed("priority")}
                        className={`p-2.5 border rounded-xl text-[10px] font-extrabold uppercase text-center transition-all ${subShippingSpeed === "priority" ? "border-[#D4AF37] bg-[#D4AF37]/10 text-white" : "border-white/5 bg-[#050505] text-white/40"}`}
                      >
                        VIP Aviation
                      </button>
                    </div>
                  </div>

                  {/* 4. Scheduling & Reschedule dates */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-white/50 mb-2">
                      Delivery Scheduling
                    </label>
                    
                    <div className="bg-[#050505] border border-white/5 p-3.5 rounded-xl space-y-3">
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[8px] uppercase font-bold text-white/40">Next Packaging Cycle</p>
                          <p className="text-xs font-mono font-bold text-white mt-0.5">{subNextDeliveryDate}</p>
                        </div>
                        <button
                          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                          className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg p-2 text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1 shrink-0"
                        >
                          <CalendarDays className="w-3.5 h-3.5 text-[#D4AF37]" /> Reschedule
                        </button>
                      </div>

                      {/* Calendar Slot popup */}
                      <AnimatePresence>
                        {isCalendarOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-[#0c0c0e] border border-white/10 rounded-lg p-2.5 space-y-1.5 text-[10px]"
                          >
                            <p className="text-[8px] font-bold text-white/30 uppercase">Select Delivery Packaging Batch:</p>
                            {["June 15, 2026", "June 30, 2026", "July 15, 2026", "July 30, 2026"].map((dateSlot) => (
                              <button
                                key={dateSlot}
                                onClick={() => {
                                  setSubNextDeliveryDate(dateSlot);
                                  setIsCalendarOpen(false);
                                }}
                                className={`w-full text-left p-1.5 rounded transition-colors ${subNextDeliveryDate === dateSlot ? "bg-[#D4AF37]/20 text-[#D4AF37] font-bold" : "hover:bg-white/5 text-white/60"}`}
                              >
                                {dateSlot} (cleared air space batch)
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Skip Next Delivery Cycle slider/switch */}
                      <div className="flex justify-between items-center border-t border-white/5 pt-3">
                        <div>
                          <p className="text-[9px] font-bold text-white">Skip Next Cycle</p>
                          <p className="text-[8px] text-white/40">Pause this cycle, resume next month</p>
                        </div>
                        <button
                          onClick={() => setIsSkipActive(!isSkipActive)}
                          className={`w-11 h-6 rounded-full p-1 transition-colors outline-none shrink-0 ${isSkipActive ? "bg-orange-500" : "bg-white/10"}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isSkipActive ? "translate-x-5" : "translate-x-0"}`} />
                        </button>
                      </div>

                      {isSkipActive && (
                        <div className="bg-red-950/20 border border-red-500/20 p-2.5 rounded-lg text-[9px] text-orange-400 mt-2 text-center font-bold">
                          📅 June packaging batch paused. Next auto-shipments will resume on July 15. Sourcing retainer invoice is $0.00.
                        </div>
                      )}

                    </div>
                  </div>

                  {/* 5. Spending Caps Slider */}
                  <div>
                    <div className="flex justify-between text-[9px] uppercase tracking-wider font-bold text-white/50 mb-2">
                      <span>Maximum Sourcing Cap</span>
                      <span className="text-[#D4AF37] font-mono">${subBudgetCap} USD</span>
                    </div>
                    <input 
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={subBudgetCap}
                      onChange={(e) => setSubBudgetCap(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#050505] rounded-lg appearance-none cursor-pointer accent-[#D4AF37] outline-none"
                    />

                    {/* Flashing Over-budget warning banner */}
                    {isBudgetExceeded && !isSkipActive && (
                      <div className="mt-2.5 bg-red-950/20 border border-red-500/30 p-2.5 rounded-lg text-[10px] text-red-400 flex items-center gap-1.5 animate-pulse">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Est. total exceeds maximum spending cap! Reduce checklist items or box sizer levels.</span>
                      </div>
                    )}
                  </div>

                  {/* 6. Dynamic Invoice Summary box */}
                  <div className="bg-[#050505] border border-white/5 rounded-2xl p-4 space-y-2.5 text-xs text-left relative overflow-hidden">
                    
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37] border-b border-white/5 pb-2">
                      CONCIERGE INVOICE SUMMARY
                    </p>

                    <div className="flex justify-between text-[11px] text-white/50 pt-1">
                      <span>Base Plan Fee ({activePlan})</span>
                      <span className="font-mono">${currentInvoice.baseRate}.00</span>
                    </div>

                    {currentInvoice.itemsCommission > 0 && (
                      <div className="flex justify-between text-[11px] text-white/50">
                        <span>Checklist staples sourcing</span>
                        <span className="font-mono">+${currentInvoice.itemsCommission}.00</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[11px] text-white/50">
                      <span>Custom clearances + Logistics</span>
                      <span className="font-mono">+${currentInvoice.shipping}.00</span>
                    </div>

                    <div className="flex justify-between text-[11px] text-white/50">
                      <span>Subtotal Sourcing Deposit</span>
                      <span className="font-mono">${currentInvoice.subtotal}.00</span>
                    </div>

                    <div className="flex justify-between text-[11px] text-emerald-400 border-b border-white/5 pb-2.5">
                      <span>20% Subscriber Discount</span>
                      <span className="font-mono">-${currentInvoice.saving}.00</span>
                    </div>

                    <div className="flex justify-between items-center text-white pt-1">
                      <div>
                        <span className="font-extrabold text-sm tracking-wide block">Retainer Total</span>
                        <span className="text-[8px] text-white/30">All clearance brokerage fees pre-paid</span>
                      </div>
                      <span className="text-xl font-mono font-black text-[#D4AF37]">
                        ${isSkipActive ? "0" : currentInvoice.totalPreview}.00 USD
                      </span>
                    </div>

                  </div>

                </div>

                {/* Subscriptions CTA Save Button */}
                <div className="mt-8">
                  <button 
                    onClick={handleSaveSubscription}
                    disabled={isBudgetExceeded && !isSkipActive}
                    className={`w-full py-4.5 rounded-2xl font-extrabold transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl
                      ${(isBudgetExceeded && !isSkipActive)
                        ? "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed" 
                        : "bg-[#D4AF37] hover:bg-[#F3C332] text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] transform hover:scale-[1.02]"
                      }`}
                  >
                    <CheckCircle className="w-5 h-5" /> Confirm & Start Concierge
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 🚀 POST-SUBMISSION SUCCESS MODAL WINDOW OVERLAY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {subSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0d0d0e] border border-[#D4AF37]/40 p-8 rounded-3xl max-w-lg text-center shadow-[0_0_80px_rgba(212,175,55,0.15)] relative overflow-hidden"
            >
              
              <div className="absolute right-[-10%] top-[-10%] w-48 h-48 bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none" />

              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-3">Subscription Saved & Synced!</h2>
              <p className="text-white/60 text-xs leading-relaxed max-w-sm mx-auto mb-6">
                Your customizable sourcing list has been successfully synced with the logistics database. We have compiled a pre-structured Concierge Cargo order document and are launching your default email console now.
              </p>

              <div className="bg-[#050505] border border-white/5 p-4.5 rounded-2xl mb-8 text-left text-xs font-mono space-y-2">
                <p className="text-[#D4AF37] font-bold">Verification ID: {subscriberCode}</p>
                <p className="text-white/50">Recipient Target: consult@fenway4u.com</p>
                <p className="text-white/50">Billing Base: ${currentInvoice.totalPreview} USD / month</p>
                <p className="text-white/50">Next packaging cycle: {subNextDeliveryDate}</p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setSubSuccessModal(false)}
                  className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-extrabold py-4 rounded-xl shadow-lg transition-colors text-xs uppercase tracking-widest"
                >
                  Return to Dashboard Portal
                </button>
                <p className="text-[10px] text-white/30 italic">
                  Didn't see your email console launch? Tap the button to retry.
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
