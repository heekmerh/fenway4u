"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Sparkles, Calendar, ShoppingBag, Gift, Coffee, Heart, Check, 
  ArrowRight, ShieldCheck, Star, Trash2, Plus, Clock, HelpCircle, 
  Info, ChevronDown, CheckCircle, Package, Truck, Compass, 
  UserCheck, Plane, Smile, ArrowUpRight, DollarSign
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
    features: ["2 Flexible Shipments Monthly", "Free Package Consolidation", "Priority Sourcing Dashboard Queue", "Dedicated Telegram Sourcing Channel"]
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
    image: "/images/tech_gadget_sourcing.png", // using tech sourcing background but dark overlay
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
  { step: "03", title: "We Procure & Vaccum Prep", desc: "Our personal shoppers purchase items fresh from trusted local vendors, vaccum seal them, and inspect package integrity." },
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
  { q: "Can I edit my subscription list between deliveries?", a: "Absolutely. You can log into your simulated dashboard on this page or email/message us to customize, swap, add, or delete products up to 72 hours before your recurring packing day." },
  { q: "How are food items packed for long journeys?", a: "All fresh and dry food items undergo high-pressure vaccum sealing. This prevents oxygen flow, preserves taste, eliminates smells, and complies with international export safety regulations." },
  { q: "Can I pause or cancel my subscription?", a: "Yes. Sourcing memberships have zero long-term commitments. You can pause, skip, or cancel your scheduled delivery instantly from your dashboard or by chatting with our Telegram support." }
];

interface GroceryRow {
  id: string;
  name: string;
  qty: string;
  unit: string;
  freq: string;
}

export default function SubscriptionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Customizer State
  const [selectedPlan, setSelectedPlan] = useState("family");
  const [frequency, setFrequency] = useState("monthly");
  const [destination, setDestination] = useState("United States");
  const [shippingSpeed, setShippingSpeed] = useState("express");
  
  // Custom smart grocery list state
  const [groceryRows, setGroceryRows] = useState<GroceryRow[]>([
    { id: "1", name: "Ijebu Garri", qty: "5", unit: "KG", freq: "Every Month" },
    { id: "2", name: "Egusi (Melon Seed)", qty: "2", unit: "KG", freq: "Every 2 Months" },
    { id: "3", name: "Indomie Noodles", qty: "2", unit: "Cartons", freq: "Every Month" }
  ]);
  const [customItem, setCustomItem] = useState("");
  const [customQty, setCustomQty] = useState("1");
  const [customUnit, setCustomUnit] = useState("KG");
  const [customFreq, setCustomFreq] = useState("Every Month");

  // Simulated Dashboard State
  const [isPaused, setIsPaused] = useState(false);
  const [dashboardStatus, setDashboardStatus] = useState("Active");
  const [editSuccess, setEditSuccess] = useState(false);

  // Recommendations state
  const [recommendationDrawer, setRecommendationDrawer] = useState(false);
  const trendingStaples = ["Palm Oil (3L)", "Dried Crayfish", "Yam Flour (Elubo)", "Suya Seasoning Pack", "Honeywell Poundo Yam", "Local Smoked Catfish", "Regional Snacks Pack"];

  const handleAddGroceryRow = () => {
    if (!customItem) return;
    const newRow: GroceryRow = {
      id: (groceryRows.length + 1).toString(),
      name: customItem,
      qty: customQty,
      unit: customUnit,
      freq: customFreq
    };
    setGroceryRows([...groceryRows, newRow]);
    setCustomItem("");
  };

  const handleRemoveGroceryRow = (id: string) => {
    setGroceryRows(groceryRows.filter(row => row.id !== id));
  };

  const handleAddRecommendation = (item: string) => {
    const newRow: GroceryRow = {
      id: (groceryRows.length + 1).toString(),
      name: item,
      qty: "1",
      unit: item.includes("Oil") ? "Liters" : "Packs",
      freq: "Every Month"
    };
    setGroceryRows([...groceryRows, newRow]);
  };

  // Dynamic cost savings estimator calculations
  const calculateBudgetEstimate = () => {
    let basePlanRate = 199;
    if (selectedPlan === "essential") basePlanRate = 99;
    else if (selectedPlan === "luxury") basePlanRate = 399;

    let frequencyDiscountMultiplier = 1.0;
    if (frequency === "bi-weekly") frequencyDiscountMultiplier = 1.8; // double packages but 10% discount
    else if (frequency === "quarterly") frequencyDiscountMultiplier = 0.95; // 5% discount

    let shippingSurcharge = 45;
    if (shippingSpeed === "priority") shippingSurcharge = 85;
    else if (shippingSpeed === "standard") shippingSurcharge = 25;

    // Surcharges for long distances
    let destinationMultiplier = 15;
    if (destination === "Canada") destinationMultiplier = 20;
    else if (destination === "United Kingdom") destinationMultiplier = 10;

    const baseCost = basePlanRate * frequencyDiscountMultiplier + shippingSurcharge + destinationMultiplier;
    const memberSaving = Math.round(baseCost * 0.20); // 20% savings guarantee
    const subtotal = Math.round(baseCost);
    const finalTotal = subtotal - memberSaving;

    return {
      subtotal,
      saving: memberSaving,
      total: finalTotal
    };
  };

  const estimates = calculateBudgetEstimate();

  const handleDashboardPause = () => {
    if (isPaused) {
      setIsPaused(false);
      setDashboardStatus("Active");
    } else {
      setIsPaused(true);
      setDashboardStatus("Paused");
    }
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Personal Shopper Sourcing Subscription — ${selectedPlan.toUpperCase()}`);
    const bodyText = `========= PERSONAL SHOPPER SUBSCRIPTION ORDER =========
Selected Plan: ${selectedPlan.toUpperCase()}
Billing Frequency: ${frequency.toUpperCase()}
Shipping Destination: ${destination}
Preferred Logistics Rate: ${shippingSpeed.toUpperCase()}

========= DYNAMIC SUBSCRIPTION grocery list =========
${groceryRows.map((row, idx) => {
  return `${idx + 1}. Item: ${row.name} | Quantity: ${row.qty} ${row.unit} | Sourcing Interval: ${row.freq}`;
}).join("\n")}

========= REAL-TIME BUDGET CALCULATION SUMMARY =========
Sourcing Retainer Subtotal: $${estimates.subtotal} USD
Recurring Subscriber Saving Discount (20%): -$${estimates.saving} USD
------------------------------------------------------
Estimated Monthly Retainer Deposit: $${estimates.total} USD

---
Sent via INTMOVE automated Concierge Sourcing Dashboard.
Subscriber Verification Code: CONCIERGE-${Math.floor(100000 + Math.random() * 900000)}`;

    const body = encodeURIComponent(bodyText);
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
  };

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#D4AF37] to-cyan-400">
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
              <a href="#customizer" className="bg-white/5 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm group">
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
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full border border-orange-500/30 tracking-widest animate-pulse">
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

                  <a 
                    href="#customizer" 
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setTimeout(() => {
                        const elem = document.getElementById("customizer");
                        elem?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className={`w-full py-4 px-6 rounded-xl font-extrabold text-center block transition-all text-sm uppercase tracking-wider ${plan.buttonAccent}`}
                  >
                    Subscribe Now
                  </a>
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
              <h2 className="text-3xl md:text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#D4AF37] to-red-400">Fresh Staples Sourced with Nostalgic Love</h2>
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

      {/* RECURRING DELIVERY FEATURES */}
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

      {/* SUBSCRIPTION CUSTOMIZATION MODULE & SMART GROCERY BUILDER */}
      <section id="customizer" className="py-24 px-6 bg-[#090909] relative border-b border-white/5">
        <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="container mx-auto max-w-5xl relative z-10">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Sourcing customizer console
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white">Configure Sourcing Membership</h2>
            <p className="text-white/50 text-sm mt-1">Choose your shipping speed, frequency, and customize your automated monthly groceries list.</p>
          </div>

          <form onSubmit={handleSubscribeSubmit} className="space-y-8">
            
            {/* Customizer Panel */}
            <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Plan select */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Concierge Plan *</label>
                  <select 
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="essential">Essential Home Box</option>
                    <option value="family">Family Care Package</option>
                    <option value="luxury">Premium Concierge VIP</option>
                  </select>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Delivery Interval *</label>
                  <select 
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="monthly">Monthly Auto Ship</option>
                    <option value="bi-weekly">Bi-Weekly Priority</option>
                    <option value="quarterly">Quarterly Bulk Ship</option>
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Destination Country *</label>
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>

                {/* Shipping Speed */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Logistics Timeline *</label>
                  <select 
                    value={shippingSpeed}
                    onChange={(e) => setShippingSpeed(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="express">Express Priority Air</option>
                    <option value="priority">VIP Direct Aviation</option>
                    <option value="standard">Standard Consolidated Sea</option>
                  </select>
                </div>

              </div>

            </div>

            {/* SMART GROCERY BUILDER */}
            <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Smart Auto-Grocery List Builder:</p>
                <button
                  type="button"
                  onClick={() => setRecommendationDrawer(!recommendationDrawer)}
                  className="text-[10px] text-orange-400 font-extrabold uppercase hover:text-white transition-colors"
                >
                  {recommendationDrawer ? "Hide AI Staples Suggestions" : "+ Show AI Sourcing Suggestions"}
                </button>
              </div>

              {/* Autocomplete AI recommendation drawer */}
              <AnimatePresence>
                {recommendationDrawer && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#050505] p-4 border border-white/10 rounded-2xl overflow-hidden space-y-2 text-left"
                  >
                    <p className="text-[10px] uppercase font-bold text-white/40">Suggested Popular Staples (Add in 1-Click):</p>
                    <div className="flex flex-wrap gap-2">
                      {trendingStaples.map((staple) => (
                        <button
                          key={staple}
                          type="button"
                          onClick={() => handleAddRecommendation(staple)}
                          className="bg-white/5 border border-white/10 hover:border-orange-500/40 text-[10px] text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          + {staple}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Groceries List rows */}
              <div className="space-y-3">
                {groceryRows.map((row, index) => (
                  <div key={row.id} className="bg-[#050505] border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center transition-all hover:border-orange-500/20">
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-orange-500/20">{index + 1}</span>
                    
                    <div className="flex-1 w-full text-left">
                      <span className="text-xs font-bold text-white">{row.name}</span>
                    </div>

                    <div className="w-full sm:w-auto flex gap-4 items-center justify-between sm:justify-start">
                      <span className="text-xs text-white/60 font-mono">Qty: {row.qty} {row.unit}</span>
                      <span className="bg-white/5 text-[9px] uppercase font-bold text-white/50 px-2 py-1 rounded tracking-wider border border-white/5 shrink-0">{row.freq}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveGroceryRow(row.id)}
                        className="text-white/20 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Grocery Item row */}
              <div className="bg-[#050505] border border-dashed border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
                <input 
                  type="text" 
                  value={customItem}
                  onChange={(e) => setCustomItem(e.target.value)}
                  placeholder="e.g. garri, Egusi, palm oil, plantain chips"
                  className="flex-1 w-full bg-[#0d0d0d] border border-white/5 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs outline-none text-white transition-colors"
                />

                <div className="w-full sm:w-auto flex gap-2 shrink-0">
                  <input 
                    type="number" 
                    min="1"
                    value={customQty}
                    onChange={(e) => setCustomQty(e.target.value)}
                    className="w-14 bg-[#0d0d0d] border border-white/5 rounded-xl p-2 text-xs text-white text-center outline-none"
                  />
                  <select 
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    className="bg-[#0d0d0d] border border-white/5 rounded-xl p-2 text-xs text-white outline-none"
                  >
                    <option>KG</option>
                    <option>Grams</option>
                    <option>Liters</option>
                    <option>Packs</option>
                    <option>Cartons</option>
                  </select>
                  <select 
                    value={customFreq}
                    onChange={(e) => setCustomFreq(e.target.value)}
                    className="bg-[#0d0d0d] border border-white/5 rounded-xl p-2 text-xs text-white outline-none"
                  >
                    <option>Every Month</option>
                    <option>Every 2 Months</option>
                    <option>Every Quarter</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddGroceryRow}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>

            </div>

            {/* LIVE BUDGET ESTIMATE DRAWER */}
            <div className="bg-gradient-to-br from-[#120703] to-[#050505] border border-orange-500/20 p-6 rounded-3xl text-left shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-full bg-orange-500/5 blur-2xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#D4AF37]" /> Live Smart Budget Estimator
                  </h4>
                  <p className="text-[10px] text-white/30 mt-0.5">Calculated in real-time with automated member savings built in.</p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  20% Subscriber Saving Guaranteed
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-6 mb-6 border-b border-white/5 text-xs text-white/60">
                <div>
                  <p className="text-[10px] uppercase text-white/30">Regular Retail Sourcing Deposit</p>
                  <p className="font-extrabold text-white mt-1 text-sm">${estimates.subtotal} USD / mo</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">Automated Subscriber Discount (20%)</p>
                  <p className="font-extrabold text-emerald-400 mt-1 text-sm">-$${estimates.saving} USD / mo</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-white/30">Inclusive Shipping Speed Timeline</p>
                  <p className="font-extrabold text-white mt-1 text-sm">{shippingSpeed === "priority" ? "Express Direct Priority" : "Express Air Sourced"}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-white">
                <div>
                  <span className="font-bold text-sm tracking-wide">Estimated Monthly Retainer Deposit</span>
                  <span className="text-[9px] text-white/40 block mt-0.5">All cargo clearing brokerage handling fees included</span>
                </div>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#D4AF37] font-mono">
                  ${estimates.total} USD <span className="text-xs text-white/50 font-normal">/ mo</span>
                </span>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-extrabold py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] text-lg flex items-center justify-center gap-2 transform hover:scale-101">
              <CheckCircle className="w-6 h-6 animate-pulse" /> Confirm & Start Concierge Subscription
            </button>

          </form>

        </div>
      </section>

      {/* PREMIUM ADDITIONAL SERVICES */}
      <section className="py-24 px-6 bg-[#050505] relative border-b border-white/5">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Concierge <span className="text-[#D4AF37]">Lifestyle Specialties</span></h2>
            <p className="text-white/40 text-sm max-w-lg mx-auto">Explore high-end subscription services tailored to celebrate cultural events, business operations, and wellness support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifestyleBoxes.map((box, idx) => (
              <div key={idx} className={`bg-[#0d0d0d]/80 border border-white/5 p-8 rounded-3xl transition-colors duration-300 relative group flex flex-col justify-between ${box.border}`}>
                <div>
                  <box.icon className="w-8 h-8 text-[#D4AF37] mb-6" />
                  <h3 className="font-extrabold text-lg mb-3">{box.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-6">{box.desc}</p>
                </div>
                <a href="#customizer" className="text-xs font-bold text-white/60 group-hover:text-orange-400 transition-colors flex items-center gap-1">
                  Add to Sourcing Plan <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS TIMELINE */}
      <section className="py-24 px-6 bg-[#090909] relative border-b border-white/5">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Subscription <span className="text-[#D4AF37]">Timeline</span></h2>
            <p className="text-white/40 text-sm">Four seamless steps to automated global delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500/10 via-orange-500/40 to-orange-500/10 -z-0" />
            
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 text-center space-y-4">
                <div className="w-14 h-14 mx-auto bg-[#050505] border-2 border-orange-500/40 rounded-xl flex items-center justify-center text-lg font-bold text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.15)] group hover:scale-105 transition-transform shrink-0">
                  {step.step}
                </div>
                <h3 className="font-extrabold text-lg text-white">{step.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
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

      {/* SUBSCRIBER MANAGEMENT INTERACTIVE DASHBOARD */}
      <section className="py-24 px-6 bg-[#090909] relative">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black">Subscriber Management <span className="text-[#D4AF37]">Console</span></h2>
            <p className="text-white/50 text-sm mt-1">Manage active schedules, pause billing, or track scheduled unboxings in your dashboard preview.</p>
          </div>

          <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-full bg-blue-500/5 blur-2xl pointer-events-none" />
            
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/40">Concierge Account Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-extrabold text-white">CONCIERGE-908754</span>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider border
                    ${isPaused ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                    {dashboardStatus}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDashboardPause}
                  className={`text-xs font-extrabold uppercase px-4 py-2.5 rounded-xl border transition-all
                    ${isPaused 
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white border-transparent" 
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

            {/* Dashboard active alerts */}
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

      {/* Section 8: FAQ */}
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
      <div className="fixed bottom-6 left-6 right-6 z-50 bg-[#0d0d0d]/85 backdrop-blur-md border border-[#D4AF37]/30 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 max-w-5xl mx-auto shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center shrink-0 border border-orange-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h4 className="font-extrabold text-sm text-white">Subscribe & SkipSourcing Comissions</h4>
            <p className="text-[10px] text-emerald-400 mt-0.5 font-bold">20% Savings Guarantee Applied Globally</p>
          </div>
        </div>
        <a href="#customizer" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-lg text-center shrink-0 w-full sm:w-auto">
          Start Membership
        </a>
      </div>

    </div>
  );
}
