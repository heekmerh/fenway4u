"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  ShoppingBag, Package, Smartphone, Car, Shirt, 
  Coffee, Gift, Heart, Star, Search, ShieldCheck, 
  Globe, Truck, ChevronDown, ArrowRight, MessageCircle, 
  UploadCloud, Compass, CreditCard, Building2, MapPin, Mail,
  Plus, Trash2, HelpCircle, Check, PlusCircle, CheckCircle, 
  AlertCircle, ChevronUp, FileText, Sparkles, X, Calendar, Boxes, Maximize2
} from "lucide-react";

// --- Data Structures ---

const howItWorks = [
  { step: "01", title: "Send Product Link", desc: "Share the URL, description, or your shopping list from Amazon, Best Buy, Walmart, or African local markets.", icon: Search },
  { step: "02", title: "We Purchase It", desc: "Our personal shoppers buy the item, verify its condition, and receive it at our secure international warehouse.", icon: CreditCard },
  { step: "03", title: "Packaging & Shipping", desc: "Items are meticulously inspected, securely packaged, and shipped via our global logistics network.", icon: Package },
  { step: "04", title: "Delivery To You", desc: "Enjoy fast, tracked doorstep delivery anywhere in the world.", icon: Truck }
];

const whatWeBuy = [
  { 
    title: "Electronics & Gadgets", 
    desc: "iPhones, gaming consoles, laptops, and smart TVs.", 
    icon: Smartphone,
    color: "from-blue-500/20 to-cyan-500/5",
    border: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    image: "/images/tech_gadget_sourcing.png",
    accent: "text-blue-400 bg-blue-500/20 border-blue-500/30"
  },
  { 
    title: "Vehicles & Car Parts", 
    desc: "Auction vehicles, luxury cars, and hard-to-find auto parts.", 
    icon: Car,
    color: "from-purple-500/20 to-fuchsia-500/5",
    border: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    image: "/images/car_auction_1_1778971403142.png",
    accent: "text-purple-400 bg-purple-500/20 border-purple-500/30"
  },
  { 
    title: "Fashion & Luxury Goods", 
    desc: "Designer stores, outlet malls, and luxury brand sourcing.", 
    icon: Shirt,
    color: "from-[#D4AF37]/20 to-yellow-500/5",
    border: "hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]",
    image: "/images/luxury_fashion_sourcing.png",
    accent: "text-[#D4AF37] bg-[#D4AF37]/20 border-[#D4AF37]/30"
  },
  { 
    title: "Furniture & Home", 
    desc: "Office furniture, luxury home décor, and kitchen appliances.", 
    icon: Compass,
    color: "from-emerald-500/20 to-teal-500/5",
    border: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    image: "/images/sea_freight_test_1_1779128965828.png",
    accent: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
  }
];

const premiumServices = [
  { title: "Personal Shopper Service", desc: "Dedicated assistant, product recommendations, and price comparisons for busy professionals.", icon: UserIcon },
  { title: "Gift Purchase & Delivery", desc: "Buy gifts internationally, add personalized messages, and request premium packaging.", icon: Gift },
  { title: "Exclusive Item Sourcing", desc: "We find rare or hard-to-get products like limited luxury bags or sold-out electronics.", icon: Star },
  { title: "Bulk Buying Assistance", desc: "Sourcing wholesale inventory and commercial goods for resellers and small businesses.", icon: Building2 },
  { title: "African Care Packages", desc: "Taste of Home boxes, student survival packages, and fresh local groceries sourced with care.", icon: Heart },
  { title: "Warehouse Consolidation", desc: "Combine multiple orders to reduce shipping costs and store items temporarily in our secure global hubs.", icon: Package, href: "/storage" }
];

const africanMarketplace = [
  { title: "Authentic Ingredients", desc: "Garri, Egusi, Fufu, Yam Flour, Dried Fish, Spices, and Palm Oil.", tag: "Most Requested" },
  { title: "Local Snacks & Beverages", desc: "Milo, Plantain Chips, Cabin Biscuits, and regional favorites.", tag: "Nostalgic" },
  { title: "Traditional Fabrics", desc: "Ankara, Lace, Aso Oke, and custom tailored traditional wear.", tag: "Cultural" },
  { title: "International Groceries to Africa", desc: "Imported chocolates, cereals, baby products, and supplements sent back home.", tag: "Global -> Local" }
];

const destinations = [
  { name: "Canada", desc: "Electronics, winter clothing, supplements.", flag: "🇨🇦" },
  { name: "United Kingdom", desc: "Fashion, appliances, groceries.", flag: "🇬🇧" },
  { name: "United States", desc: "Apple products, gaming equipment, luxury retail.", flag: "🇺🇸" },
  { name: "Africa", desc: "Local foods, traditional items, handmade goods.", flag: "🌍" }
];

const testimonials = [
  {
    quote: "I sent them a link for a sold-out MacBook in the US. They sourced it, bought it, and shipped it to me in Lagos perfectly.",
    author: "Tech Entrepreneur, Nigeria"
  },
  {
    quote: "Living in Canada, I missed authentic Nigerian food. The 'Taste of Home' care package they put together for me actually made me cry.",
    author: "Sarah O., Student in Toronto"
  },
  {
    quote: "I use their bulk buying service to stock my boutique in London with authentic African fabrics. Flawless service every time.",
    author: "Boutique Owner, UK"
  }
];

const faqs = [
  { q: "Can you buy products on my behalf?", a: "Yes. You simply send us the link or tell us what you want, and our personal shoppers will purchase it using our local payment methods." },
  { q: "Which countries do you ship to?", a: "We ship globally, with specialized high-speed routes covering the US, UK, Canada, and across Africa." },
  { q: "Can I request specific African foods?", a: "Absolutely. Our 'African Foods Sourcing' builder lets you create custom grocery lists including Garri, Egusi, Spices, and snacks sourced directly from local markets." },
  { q: "Do you combine multiple packages?", a: "Yes. We offer warehouse consolidation. You can buy items from multiple stores, and we will package them into a single shipment to save you money." },
  { q: "How long does food shipping take?", a: "To ensure maximum freshness, food items are vacuum-sealed and priority air shipped, typically arriving at your international address within 3 to 7 days." },
  { q: "Do you handle customs clearance for food?", a: "Yes. Sourced food cargo includes export permits and import documentation brokerage, ensuring hassle-free port clearance." }
];

// Helper icons
function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

// Interactivity Interface for Foods Row
interface FoodItem {
  id: string;
  name: string;
  unit: string;
  qty: string;
  budget: string;
  brand: string;
  notes: string;
}

interface UploadedFile {
  name: string;
  size: string;
  progress: number;
  completed: boolean;
}

export default function ShopForMePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Tabs State
  const [activeTab, setActiveTab] = useState<"standard" | "food-builder">("standard");

  // Standard Form State
  const [stdDetails, setStdDetails] = useState("");
  const [stdDestination, setStdDestination] = useState("United States");
  const [stdUrgency, setStdUrgency] = useState("Express Air (Fastest)");

  // Food Builder State
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    { id: "1", name: "", unit: "KG", qty: "1", budget: "$10–$15", brand: "", notes: "" }
  ]);
  const [foodName, setFoodName] = useState("");
  const [foodEmail, setFoodEmail] = useState("");
  const [foodPhone, setFoodPhone] = useState("");
  const [foodDestination, setFoodDestination] = useState("United States");
  const [foodAddress, setFoodAddress] = useState("");
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express" | "priority">("express");
  const [freshnessProtection, setFreshnessProtection] = useState(true);
  const [uploadedFoodFiles, setUploadedFoodFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [restoreDraftAvailable, setRestoreDraftAvailable] = useState(false);


  // Suggestion parameters
  const [focusedRowId, setFocusedRowId] = useState<string | null>(null);
  const commonTraditionalStaples = [
    "Ijebu Garri", "Yellow Garri", "White Garri", "Egusi (Melon Seed)", 
    "Honeywell Poundo Yam", "Ola-Oluwa Poundo Yam", "Suya Spice", "Palm Oil", 
    "Dried Catfish", "Plantain Chips", "Elubo (Yam Flour)", "Oron Crayfish", 
    "Bitter Leaf", "Knorr Seasoning Cubes", "Yam Tubers", "Stockfish", "Chin Chin", 
    "Kilishi", "Achu Spice", "Dawa Dawa"
  ];

  // Preset package templates
  const presets = {
    survival: [
      { id: "s1", name: "Indomie Noodles", unit: "Cartons", qty: "1", budget: "$25–$30", brand: "Dufil Prima", notes: "Chicken flavor preferred" },
      { id: "s2", name: "Ijebu Garri", unit: "KG", qty: "5", budget: "$10–$15", brand: "Local Market", notes: "Extra sour" },
      { id: "s3", name: "Suya Spice", unit: "Packs", qty: "3", budget: "$10–$15", brand: "Kano Sourced", notes: "Mild hotness" },
      { id: "s4", name: "Plantain Chips", unit: "Packs", qty: "10", budget: "$10–$15", brand: "Premium Sourced", notes: "Lightly salted" }
    ],
    tasteOfHome: [
      { id: "t1", name: "Egusi (Melon Seed)", unit: "KG", qty: "2", budget: "$10–$15", brand: "Hand-peeled local", notes: "Un-grounded preferred" },
      { id: "t2", name: "Poundo Yam", unit: "KG", qty: "4", budget: "$10–$15", brand: "Honeywell Brand", notes: "Sourced fresh" },
      { id: "t3", name: "Palm Oil", unit: "Liters", qty: "3", budget: "$10–$15", brand: "Nsukka Premium", notes: "Pure extraction" },
      { id: "t4", name: "Dried Fish (Catfish)", unit: "Pieces", qty: "5", budget: "$25–$30", brand: "Epe Market Sourced", notes: "Smoked bone-dry" }
    ],
    familyBundle: [
      { id: "f1", name: "White Garri", unit: "KG", qty: "20", budget: "$50–$100", brand: "Bulk Sourced", notes: "Sieved clean" },
      { id: "f2", name: "Elubo (Yam Flour)", unit: "KG", qty: "10", budget: "$25–$30", brand: "Local Sourced", notes: "For Amala" },
      { id: "f3", name: "Crayfish", unit: "Packs", qty: "5", budget: "$10–$15", brand: "Oron Premium", notes: "Blended clean" },
      { id: "f4", name: "Palm Oil", unit: "Liters", qty: "5", budget: "$25–$30", brand: "Nsukka Brand", notes: "Aviation approved cans" }
    ]
  };

  // Add Item row
  const addFoodItemRow = () => {
    const newId = (foodItems.length + 1).toString();
    setFoodItems([...foodItems, { id: newId, name: "", unit: "KG", qty: "1", budget: "$10–$15", brand: "", notes: "" }]);
  };

  // Remove Item row
  const removeFoodItemRow = (id: string) => {
    if (foodItems.length === 1) return;
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  // Row input changes
  const handleRowChange = (id: string, field: keyof FoodItem, value: string) => {
    setFoodItems(foodItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Inject presets
  const applyPresetList = (presetType: "survival" | "tasteOfHome" | "familyBundle") => {
    setFoodItems(presets[presetType]);
  };

  // Drag and drop list file
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        progress: 0,
        completed: false
      };
      setUploadedFoodFiles(prev => [...prev, newFile]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 25;
        setUploadedFoodFiles(prev => 
          prev.map(f => f.name === file.name ? { ...f, progress } : f)
        );
        if (progress >= 100) {
          clearInterval(interval);
          setUploadedFoodFiles(prev => 
            prev.map(f => f.name === file.name ? { ...f, completed: true } : f)
          );
        }
      }, 250);
    });
  };

  // Autosave triggers for foods builder
  useEffect(() => {
    if (foodItems.length > 1 || foodItems[0].name !== "") {
      localStorage.setItem("fenway4u_food_draft", JSON.stringify(foodItems));
    }
  }, [foodItems]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("fenway4u_food_draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.length > 0 && parsed[0].name !== "") {
          setRestoreDraftAvailable(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const restoreFoodDraft = () => {
    const draft = localStorage.getItem("fenway4u_food_draft");
    if (draft) {
      setFoodItems(JSON.parse(draft));
    }
    setRestoreDraftAvailable(false);
  };

  const discardFoodDraft = () => {
    localStorage.removeItem("fenway4u_food_draft");
    setFoodItems([{ id: "1", name: "", unit: "KG", qty: "1", budget: "$10–$25", brand: "", notes: "" }]);
    setRestoreDraftAvailable(false);
  };

  // Dynamic estimate calculations
  const calculateFoodEstimate = () => {
    let itemsSubtotal = 0;
    foodItems.forEach(item => {
      let itemBudgetAvg = 12.5;
      if (item.budget === "$1–$5") itemBudgetAvg = 3;
      else if (item.budget === "$5–$10") itemBudgetAvg = 7.5;
      else if (item.budget === "$10–$15") itemBudgetAvg = 12.5;
      else if (item.budget === "$15–$20") itemBudgetAvg = 17.5;
      else if (item.budget === "$20–$25") itemBudgetAvg = 22.5;
      else if (item.budget === "$25–$30") itemBudgetAvg = 27.5;
      else if (item.budget === "$30–$35") itemBudgetAvg = 32.5;
      else if (item.budget === "$35–$40") itemBudgetAvg = 37.5;
      else if (item.budget === "$40–$45") itemBudgetAvg = 42.5;
      else if (item.budget === "$45–$50") itemBudgetAvg = 47.5;
      else if (item.budget === "$50–$100") itemBudgetAvg = 75;
      else if (item.budget === "$100–$200") itemBudgetAvg = 150;
      else itemBudgetAvg = 12.5;

      const qty = parseFloat(item.qty) || 1;
      itemsSubtotal += itemBudgetAvg * qty;
    });

    const sourcingFee = Math.max(35, itemsSubtotal * 0.10);
    
    let shippingFee = 45;
    if (deliverySpeed === "express") shippingFee = 85;
    else if (deliverySpeed === "priority") shippingFee = 120;

    const wrapFee = freshnessProtection ? 25 : 0;
    const grandTotal = itemsSubtotal + sourcingFee + shippingFee + wrapFee;

    return {
      subtotal: Math.round(itemsSubtotal),
      sourcing: Math.round(sourcingFee),
      shipping: shippingFee,
      wrap: wrapFee,
      total: Math.round(grandTotal)
    };
  };

  const estimates = calculateFoodEstimate();

  // Handlers standard submission
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Shop For Me Sourcing Request — FENWAY4U");
    const bodyText = `Hi FENWAY4U Sourcing Concierge Team,

I would like to request a new Shop For Me personal shopping request.

Details:
- Item details / URL: ${stdDetails}
- Shipping Destination: ${stdDestination}
- Urgency / Preference: ${stdUrgency}

Thank you.`;

    const body = encodeURIComponent(bodyText);
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
  };

  // Handlers food builder submission
  const handleFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`New African Food Order Request — ${foodDestination}`);
    let bodyText = `========= CUSTOMER INFORMATION =========
Name: ${foodName}
Email: ${foodEmail}
Phone Number: ${foodPhone || "Not Provided"}
Destination: ${foodDestination}
Delivery Address: ${foodAddress}

========= DYNAMIC GROCERY ITEM LIST =========
${foodItems.map((item, idx) => {
  return `${idx + 1}. Item: ${item.name} | Qty: ${item.qty} ${item.unit} | Budget: ${item.budget} | Brand: ${item.brand || "Any"} | Notes: ${item.notes || "None"}`;
}).join("\n")}

========= DELIVERY & PACKAGING OPTIONS =========
Delivery Speed: ${deliverySpeed === "priority" ? "Priority Fresh Sourced" : deliverySpeed === "express" ? "Express Air" : "Standard Consolidated"}
Vacuum Freshness Sealed Protection: ${freshnessProtection ? "YES (Attested)" : "NO"}
Attached Shopping Lists: ${uploadedFoodFiles.length > 0 ? uploadedFoodFiles.map(f => f.name).join(", ") : "None"}

========= DYNAMIC COST SUMMARY =========
Estimated Food Retainer Subtotal: $${estimates.subtotal} USD
Concierge Sourcing Commission (10%): $${estimates.sourcing} USD
Premium Shipping & Logistics Rate: $${estimates.shipping} USD
Freshness protection wrapping: $${estimates.wrap} USD
----------------------------------------
Estimated Total Retention Deposit: $${estimates.total} USD

---
Sent via FENWAY4U African Groceries Marketplace Console.
Autosave Draft Recovery Code: FOOD-${Math.floor(100000 + Math.random() * 900000)}`;

    const body = encodeURIComponent(bodyText);
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");

    localStorage.removeItem("fenway4u_food_draft");
    setFoodItems([{ id: "1", name: "", unit: "KG", qty: "1", budget: "$10–$25", brand: "", notes: "" }]);
    setUploadedFoodFiles([]);
  };

  return (
    <div className="bg-[#050505] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#0a0a0a] relative overflow-hidden">
      
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-[10%] left-[-20%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] right-[-20%] w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] left-[-20%] w-[600px] h-[600px] bg-orange-950/15 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[85%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-950/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden px-6 bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/95 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#050505]/90 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-950/20 via-[#050505]/90 to-[#050505]" />
          <Image 
            src="/images/shop_for_me_hero.png" 
            alt="Shop For Me Sourcing" 
            fill 
            priority
            className="object-cover opacity-35 pointer-events-none mix-blend-screen"
          />
          
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-[10%] w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hidden md:flex"
          >
            <ShoppingBag className="w-10 h-10 text-[#D4AF37]" />
          </motion.div>

          <motion.div 
            animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 right-[25%] w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hidden lg:flex"
          >
            <Package className="w-8 h-8 text-blue-400" />
          </motion.div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold mb-8 uppercase tracking-widest backdrop-blur-md"
            >
              <Star className="w-4 h-4" /> Global Concierge
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-white"
            >
              Shop Worldwide. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#D4AF37] to-cyan-400">
                Delivered in Style.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed font-light max-w-2xl"
            >
              Your personal global buying assistant. We source not just high-end goods, but physical memories — vacuum-sealed authentic groceries, traditional garments, and nostalgic spices that bridge the distance and make you feel connected to home.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#request" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 text-lg">
                Request A Purchase <ArrowRight className="w-5 h-5" />
              </Link>
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))} className="bg-white/5 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm group">
                <Truck className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" /> Get Shipping Estimate
              </button>
              <Link href="/shop-for-me/subscribe" className="bg-gradient-to-r from-orange-500 to-red-650 hover:from-red-650 hover:to-orange-500 text-white font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all flex items-center justify-center gap-2 text-lg relative overflow-hidden group">
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Sparkles className="w-5 h-5 text-orange-200 animate-pulse" /> Subscribe
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Features Placeholder Banner */}
      <div className="border-y border-white/5 bg-[#0d0d0d] relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-12 relative z-10 text-white/50 text-sm font-medium tracking-widest uppercase">
          <span className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors"><Search className="w-4 h-4 text-blue-400" /> AI Product Sourcing</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition-colors"><CreditCard className="w-4 h-4 text-green-400" /> Dynamic Sourcing Calculator</span>
          <span className="flex items-center gap-2 cursor-pointer hover:text-[#D4AF37] transition-colors"><Heart className="w-4 h-4 text-[#D4AF37]" /> Sourced With Love</span>
        </div>
      </div>

      {/* Section 1: How It Works Timeline */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-4">How The Service Works</h2>
            <p className="text-white/40 text-lg">Four steps to receiving your international items.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/50 to-[#D4AF37]/10 -z-0" />
            
            {howItWorks.map((step, idx) => {
              const borderColors = [
                "hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
                "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
                "hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]",
                "hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
              ];
              const textGlows = ["text-blue-400", "text-purple-400", "text-[#D4AF37]", "text-emerald-400"];
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-[#0d0d0d]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 transition-all duration-300 relative z-10 text-center ${borderColors[idx]}`}
                >
                  <div className={`w-14 h-14 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xl font-bold ${textGlows[idx]} mb-6 shadow-xl`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: What We Can Buy (Focus on emotional African Foods) */}
      <section className="py-24 px-6 relative bg-[#090909] border-y border-white/5">
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">What We Source <span className="text-[#D4AF37]">For You</span></h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">Explore the global sourcing categories we purchase, inspect, and ship securely to your doorstep.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {whatWeBuy.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-[#0d0d0d]/90 backdrop-blur-md rounded-3xl border border-white/5 transition-all duration-300 group relative overflow-hidden flex flex-col hover:-translate-y-2 ${item.border}`}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-750" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/35 to-transparent" />
                  <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center border backdrop-blur-md ${item.accent}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-colors">{item.title}</h3>
                    <p className="text-white/40 leading-relaxed text-xs">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dedicated African Sourcing Banner */}
          <div className="bg-gradient-to-br from-[#1b0c03] via-[#120703] to-[#080808] border-2 border-orange-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-80 h-full bg-orange-500/10 blur-[120px]" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase backdrop-blur-md border border-orange-500/30 mb-6">
                  <Heart className="w-3.5 h-3.5 fill-orange-400 animate-pulse" /> Taste of Home
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#D4AF37] to-red-400">Authentic African Groceries</h2>
                <p className="text-lg text-white/90 italic font-light mb-6">"Home is just one shipment away."</p>
                <p className="text-white/50 mb-8 text-sm leading-relaxed">
                  For Africans abroad, we source authentic Garri, Egusi, Yam Flour, seasonings, spices, and snacks directly from trusted local markets and ship them fresh to your door in the US, UK, or Canada under tight freshness guarantees.
                </p>
                <a href="#request" onClick={() => setActiveTab("food-builder")} className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-[#D4AF37] to-red-650 hover:from-red-650 hover:via-[#D4AF37] hover:to-orange-500 text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(239,68,68,0.35)] transform hover:scale-105">
                  Launch Food Sourcing Builder <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="relative h-[350px] lg:h-[450px] w-full rounded-3xl overflow-hidden border border-orange-500/20 group shadow-2xl">
                <Image 
                  src="/images/african_groceries_banner.png" 
                  alt="Authentic African Groceries" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/30 to-transparent" />
                
                {/* Floating Info Grid Overlay */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                  <div className="bg-[#080808]/85 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-center shadow-lg">
                    <Coffee className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <p className="font-bold text-xs text-white/90">Vacuum Sealed Protection</p>
                  </div>
                  <div className="bg-[#080808]/85 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-center shadow-lg">
                    <Package className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <p className="font-bold text-xs text-white/90">Global Air Freight Sourcing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: African Marketplace Experience UI */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">The Marketplace</h2>
              <p className="text-white/50">Trending requests & cultural aesthetics.</p>
            </div>
            <button className="text-[#D4AF37] hover:text-white font-medium flex items-center gap-2 transition-colors mt-4 md:mt-0">
              View All Categories <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {africanMarketplace.map((item, idx) => (
              <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-colors relative group">
                <div className="absolute top-4 right-4 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  {item.tag}
                </div>
                <div className="w-12 h-12 bg-[#0a0a0a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-white/70" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Premium Services */}
      <section className="py-24 px-6 relative bg-[#111] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Concierge <span className="text-[#D4AF37]">Services</span></h2>
            <p className="text-white/50 text-lg">Eye-catching services designed for convenience and luxury.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumServices.map((service, idx) => {
              const CardContent = (
                <>
                  {service.title === "Warehouse Consolidation" && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#D4AF37]/15 transition-colors" />
                  )}
                  <service.icon className="w-8 h-8 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-3 text-white">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{service.desc}</p>
                  {service.href && (
                    <span className="inline-flex items-center text-xs font-bold text-[#D4AF37] group-hover:text-yellow-300 transition-colors gap-1.5 mt-auto">
                      Explore Storage Hub <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </>
              );

              return service.href ? (
                <Link
                  key={idx}
                  href={service.href}
                  className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 hover:border-[#D4AF37]/45 hover:bg-white/5 transition-all group flex flex-col justify-between relative overflow-hidden"
                >
                  {CardContent}
                </Link>
              ) : (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all group flex flex-col justify-between relative overflow-hidden"
                >
                  {CardContent}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Rebuilt Dual-Tab Sourcing Console */}
      <section id="request" className="py-24 px-6 relative bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          
          {/* Draft Form Recovery Toast Banner */}
          {restoreDraftAvailable && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-[#D4AF37]/40 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div className="text-left">
                  <h4 className="font-bold text-sm text-white">Unsaved Grocery List Detected</h4>
                  <p className="text-xs text-white/50 mt-0.5">We found an unsaved draft list in your cache. Would you like to resume?</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={discardFoodDraft} className="text-xs text-white/40 hover:text-white px-3 py-1.5 rounded bg-white/5 border border-white/10 transition-colors">Discard</button>
                <button onClick={restoreFoodDraft} className="text-xs text-black font-bold px-3 py-1.5 rounded bg-[#D4AF37] hover:bg-[#F3C332] transition-colors">Resume Sourcing List</button>
              </div>
            </motion.div>
          )}

          {/* Form Tabs Controller */}
          <div className="flex justify-center gap-2 mb-8 bg-[#111]/80 backdrop-blur border border-white/5 rounded-2xl p-1.5 max-w-lg mx-auto">
            <button 
              onClick={() => setActiveTab("standard")}
              className={`flex-1 font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2
                ${activeTab === "standard" ? 'bg-white/5 border border-white/10 text-white font-extrabold shadow' : 'text-white/40 hover:text-white/60'}`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" /> Standard Purchase
            </button>
            <button 
              onClick={() => setActiveTab("food-builder")}
              className={`flex-1 font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2
                ${activeTab === "food-builder" ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-white font-extrabold shadow' : 'text-white/40 hover:text-white/60'}`}
            >
              <Star className="w-3.5 h-3.5 text-orange-400" /> African Foods Marketplace
            </button>
          </div>

          <AnimatePresence mode="wait">
            
            {/* Standard Sourcing request form */}
            {activeTab === "standard" && (
              <motion.div
                key="standard-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-gradient-to-b from-[#111]/90 to-[#0a0a0a]/95 rounded-3xl p-6 md:p-10 border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Form Left (7 columns) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="text-left">
                      <h2 className="text-3xl font-extrabold mb-2">Standard Purchase Sourcing</h2>
                      <p className="text-white/50 text-sm">Paste a product URL or describe what you need. Our personal shoppers will get you a quote instantly.</p>
                    </div>

                    <form onSubmit={handleRequestSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase text-white/60 mb-2">Product URL or Item Description *</label>
                        <textarea 
                          rows={3} 
                          required 
                          value={stdDetails}
                          onChange={(e) => setStdDetails(e.target.value)}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37] transition-colors resize-none placeholder:text-white/20" 
                          placeholder="e.g. https://amazon.com/iphone15 OR 'Please source 5 bags of Ijebu Garri...'" 
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-white/60 mb-2">Destination Country *</label>
                          <select 
                            value={stdDestination}
                            onChange={(e) => setStdDestination(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                          >
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Canada</option>
                            <option>Nigeria / Africa</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-white/60 mb-2">Urgency / Shipping Preference *</label>
                          <select 
                            value={stdUrgency}
                            onChange={(e) => setStdUrgency(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                          >
                            <option>Express Air (Fastest)</option>
                            <option>Standard Delivery</option>
                            <option>Sea Freight (Bulk/Cheapest)</option>
                          </select>
                        </div>
                      </div>

                      {/* Fake Upload Area for UI Polish */}
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-5 text-center hover:border-[#D4AF37]/40 transition-colors cursor-pointer bg-white/3">
                        <UploadCloud className="w-6 h-6 text-white/30 mx-auto mb-2" />
                        <p className="text-xs text-white/50">Upload screenshots of the item (Optional)</p>
                      </div>

                      <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-extrabold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] text-base flex items-center justify-center gap-2">
                        <Mail className="w-5 h-5" /> Send Purchase Request
                      </button>
                    </form>
                  </div>

                  {/* Sourcing Preview Right (5 columns) */}
                  <div className="lg:col-span-5 h-full hidden lg:flex flex-col justify-center">
                    <div className="relative h-[380px] w-full rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                      <Image 
                        src="/images/shop_for_me_electronics_1779126348241.png" 
                        alt="Premium Shopping Sourcing" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 bg-[#0a0a0a]/85 backdrop-blur-md border border-white/10 p-5 rounded-xl text-left">
                        <p className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-widest mb-1">Secure Procurement Network</p>
                        <h4 className="font-extrabold text-sm text-white">Full Sourcing Coverage</h4>
                        <p className="text-[11px] text-white/50 mt-1 leading-normal">From luxury goods in London to high-end electronics in the US, we manage full procurement and package inspection securely.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Custom Interactive Food Order Builder */}
            {activeTab === "food-builder" && (
              <motion.div
                key="food-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-gradient-to-b from-[#111] via-[#0D0B0A] to-[#0a0a0a] rounded-3xl p-6 md:p-10 border border-orange-500/30 shadow-[0_0_50px_rgba(239,68,68,0.05)] relative overflow-hidden"
              >
                
                {/* Traditional Subtle Header Accents */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-[#D4AF37] to-red-600" />
                
                <div className="text-center mb-10 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Taste of Home Concierge
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">African Foods Sourcing Builder</h2>
                  <p className="text-white/60 mt-1 max-w-lg mx-auto text-sm leading-relaxed">
                    Add traditional items dynamically. Our professional local shoppers source fresh staples directly from trusted local markets.
                  </p>
                </div>

                {/* Preset Sourcing Package Buttons */}
                <div className="mb-8 bg-[#0a0a0a]/50 p-4 border border-white/5 rounded-2xl relative z-20">
                  <p className="text-[10px] uppercase text-[#D4AF37] font-bold tracking-widest text-left mb-3">One-Click Traditional Preset Packages:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    <button 
                      type="button" 
                      onClick={() => applyPresetList("survival")}
                      className="p-3 text-left bg-gradient-to-br from-white/5 to-[#0F0B0A] border border-white/10 hover:border-orange-500/40 rounded-xl transition-all duration-300 group"
                    >
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-red-400" /> Student Survival Box</h4>
                      <p className="text-[9px] text-white/50 mt-1 leading-normal">Indomie Noodles, sour Ijebu Garri, Kano Suya Spice, crunchy Plantain Chips.</p>
                    </button>

                    <button 
                      type="button" 
                      onClick={() => applyPresetList("tasteOfHome")}
                      className="p-3 text-left bg-gradient-to-br from-white/5 to-[#0F0B0A] border border-white/10 hover:border-orange-500/40 rounded-xl transition-all duration-300 group"
                    >
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-orange-400" /> Taste of Home Package</h4>
                      <p className="text-[9px] text-white/50 mt-1 leading-normal">Egusi (Melon Seeds), Honeywell Poundo Yam, Nsukka Palm Oil, smoked dry Catfish.</p>
                    </button>

                    <button 
                      type="button" 
                      onClick={() => applyPresetList("familyBundle")}
                      className="p-3 text-left bg-gradient-to-br from-white/5 to-[#0F0B0A] border border-white/10 hover:border-orange-500/40 rounded-xl transition-all duration-300 group"
                    >
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-yellow-400" /> Family Grocery Bundle</h4>
                      <p className="text-[9px] text-white/50 mt-1 leading-normal">Bulk White Garri, Elubo (Yam Flour), blended Oron Crayfish, pure Nsukka Palm Oil.</p>
                    </button>

                  </div>
                </div>

                <form onSubmit={handleFoodSubmit} className="space-y-6 relative z-10">
                  
                  {/* DYNAMIC FOOD BUILDER ITEM LIST */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/60 text-left">Your Grocery Sourcing List:</p>
                    
                    <div className="space-y-3">
                      {foodItems.map((item, index) => (
                        <div key={item.id} className="relative bg-[#0a0a0a] border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center transition-all hover:border-orange-500/30">
                          
                          {/* Item number */}
                          <span className="text-[10px] text-orange-400 font-bold shrink-0 bg-orange-500/10 w-6 h-6 rounded-full flex items-center justify-center border border-orange-500/20">{index + 1}</span>

                          {/* Food Name (with absolute Autocomplete popup) */}
                          <div className="flex-1 w-full relative">
                            <label className="block text-[9px] font-bold uppercase text-white/40 mb-1 text-left">Food Item Name *</label>
                            <input 
                              type="text" 
                              required
                              value={item.name}
                              onFocus={() => setFocusedRowId(item.id)}
                              onBlur={() => setTimeout(() => setFocusedRowId(null), 200)}
                              onChange={(e) => handleRowChange(item.id, "name", e.target.value)}
                              placeholder="e.g. Garri, Egusi, Palm Oil" 
                              className="w-full bg-[#111] border border-white/5 focus:border-orange-400 rounded-xl px-3 py-2 text-xs text-white outline-none transition-colors"
                            />

                            {/* Autocomplete suggestions list */}
                            {focusedRowId === item.id && (
                              <div className="absolute left-0 right-0 top-[52px] z-50 bg-[#111] border border-white/10 rounded-xl shadow-2xl p-2 max-h-[140px] overflow-y-auto flex flex-col text-left">
                                {commonTraditionalStaples
                                  .filter(s => s.toLowerCase().includes(item.name.toLowerCase()))
                                  .map(matchedStaple => (
                                    <button
                                      key={matchedStaple}
                                      type="button"
                                      onClick={() => handleRowChange(item.id, "name", matchedStaple)}
                                      className="w-full text-[10px] text-white/70 hover:text-white hover:bg-orange-500/10 p-2 rounded text-left transition-colors"
                                    >
                                      {matchedStaple}
                                    </button>
                                  ))
                                }
                              </div>
                            )}
                          </div>

                          {/* Quantity inputs */}
                          <div className="w-full md:w-[130px] grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[9px] font-bold uppercase text-white/40 mb-1 text-left">Qty *</label>
                              <input 
                                type="number" 
                                required
                                min="1"
                                value={item.qty}
                                onChange={(e) => handleRowChange(item.id, "qty", e.target.value)}
                                className="w-full bg-[#111] border border-white/5 rounded-xl px-3 py-2 text-xs text-white outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase text-white/40 mb-1 text-left">Unit</label>
                              <select 
                                value={item.unit}
                                onChange={(e) => handleRowChange(item.id, "unit", e.target.value)}
                                className="w-full bg-[#111] border border-white/5 rounded-xl p-2 text-xs text-white appearance-none"
                              >
                                <option>KG</option>
                                <option>Grams</option>
                                <option>Liters</option>
                                <option>Packs</option>
                                <option>Cartons</option>
                                <option>Pieces</option>
                              </select>
                            </div>
                          </div>

                          {/* Budget Selection */}
                          <div className="w-full md:w-[120px]">
                            <label className="block text-[9px] font-bold uppercase text-white/40 mb-1 text-left">Price Tier *</label>
                            <select 
                              value={item.budget}
                              onChange={(e) => handleRowChange(item.id, "budget", e.target.value)}
                              className="w-full bg-[#111] border border-white/5 rounded-xl p-2 text-xs text-white appearance-none"
                            >
                              <option value="$1–$5">$1–$5</option>
                              <option value="$5–$10">$5–$10</option>
                              <option value="$10–$15">$10–$15</option>
                              <option value="$15–$20">$15–$20</option>
                              <option value="$20–$25">$20–$25</option>
                              <option value="$25–$30">$25–$30</option>
                              <option value="$30–$35">$30–$35</option>
                              <option value="$35–$40">$35–$40</option>
                              <option value="$40–$45">$40–$45</option>
                              <option value="$45–$50">$45–$50</option>
                              <option value="$50–$100">$50–$100</option>
                              <option value="$100–$200">$100–$200</option>
                            </select>
                          </div>

                          {/* Brand preference */}
                          <div className="w-full md:w-[140px]">
                            <label className="block text-[9px] font-bold uppercase text-white/40 mb-1 text-left">Brand Preference</label>
                            <input 
                              type="text" 
                              value={item.brand}
                              onChange={(e) => handleRowChange(item.id, "brand", e.target.value)}
                              placeholder="e.g. Honeywell (optional)" 
                              className="w-full bg-[#111] border border-white/5 rounded-xl px-3 py-2 text-xs text-white outline-none"
                            />
                          </div>

                          {/* Action Button */}
                          <button 
                            type="button" 
                            onClick={() => removeFoodItemRow(item.id)}
                            disabled={foodItems.length === 1}
                            className="text-white/30 hover:text-red-400 transition-colors p-2 rounded-xl mt-3 md:mt-2.5 disabled:opacity-20 shrink-0 self-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      ))}
                    </div>

                    <button 
                      type="button" 
                      onClick={addFoodItemRow}
                      className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-[#D4AF37] font-bold transition-colors py-1 relative z-20"
                    >
                      <PlusCircle className="w-4 h-4" /> + Add Food Item Row
                    </button>
                  </div>

                  {/* Customer Information Grid */}
                  <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] text-left">Recipient Profile & Address Details:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-white/50 mb-1 text-left">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          value={foodName}
                          onChange={(e) => setFoodName(e.target.value)}
                          placeholder="Your Name" 
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-white/50 mb-1 text-left">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={foodEmail}
                          onChange={(e) => setFoodEmail(e.target.value)}
                          placeholder="you@example.com" 
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-white/50 mb-1 text-left">Phone Number *</label>
                        <input 
                          type="tel" 
                          required
                          value={foodPhone}
                          onChange={(e) => setFoodPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000" 
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-white/50 mb-1 text-left">Destination Country *</label>
                        <select 
                          value={foodDestination}
                          onChange={(e) => setFoodDestination(e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl p-2.5 text-xs text-white appearance-none"
                        >
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-white/50 mb-1 text-left">Full Delivery Address *</label>
                        <input 
                          type="text" 
                          required
                          value={foodAddress}
                          onChange={(e) => setFoodAddress(e.target.value)}
                          placeholder="Street, City, State, ZIP/Postal Code" 
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Speed, Freshness Wrap, and Sourcing Upload */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl space-y-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-white/70 text-left">Freshness Preservation & Priority Options:</p>
                      
                      {/* Priority select */}
                      <div>
                        <label className="block text-[10px] font-semibold text-white/50 mb-2 text-left">Logistics Timeline Speed</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliverySpeed("standard")}
                            className={`flex-1 p-2 rounded-xl border text-[10px] font-bold transition-all
                              ${deliverySpeed === "standard" ? 'bg-white/5 border-white/30 text-white' : 'bg-[#111] border-transparent text-white/40'}`}
                          >
                            Consolidated Sea ($45)
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliverySpeed("express")}
                            className={`flex-1 p-2 rounded-xl border text-[10px] font-bold transition-all
                              ${deliverySpeed === "express" ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-[#111] border-transparent text-white/40'}`}
                          >
                            Express Air ($85)
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliverySpeed("priority")}
                            className={`flex-1 p-2 rounded-xl border text-[10px] font-bold transition-all
                              ${deliverySpeed === "priority" ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-[#111] border-transparent text-white/40'}`}
                          >
                            Fresh Priority ($120)
                          </button>
                        </div>
                      </div>

                      {/* Freshness Switch */}
                      <button
                        type="button"
                        onClick={() => setFreshnessProtection(!freshnessProtection)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300
                          ${freshnessProtection 
                            ? 'bg-orange-500/10 border-orange-500/40 text-white' 
                            : 'bg-[#111] border-white/5 text-white/40'}`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 shrink-0 ${freshnessProtection ? 'text-orange-400' : 'text-white/20'}`} />
                          <div>
                            <p className="text-xs font-bold">Vacuum-Sealed Freshness Protection</p>
                            <p className="text-[8px] text-white/40">Includes oxygen absorbs & temperature cooling wraps (+$25)</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold">{freshnessProtection ? "Enabled" : "Disabled"}</span>
                      </button>
                    </div>

                    {/* Drag and Drop list upload */}
                    <div 
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center flex flex-col justify-center cursor-pointer transition-colors relative bg-white/3
                        ${isDragActive ? 'border-orange-400 bg-orange-500/5' : 'border-white/10 hover:border-white/20'}`}
                    >
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <UploadCloud className="w-8 h-8 text-orange-400 mx-auto mb-1.5" />
                      <p className="text-xs text-white/80 font-bold mb-0.5">Drag list screenshot or handwritten checklist here</p>
                      <p className="text-[9px] text-white/40">Saves time. PDF/PNG up to 10MB.</p>

                      {/* Upload files feedback */}
                      {uploadedFoodFiles.length > 0 && (
                        <div className="mt-3 space-y-1 relative z-20">
                          {uploadedFoodFiles.map(f => (
                            <div key={f.name} className="flex justify-between items-center text-[10px] bg-[#0a0a0a] border border-white/10 p-1.5 rounded-lg text-white">
                              <span className="truncate max-w-[120px] font-mono">{f.name}</span>
                              <span className="font-mono text-[#D4AF37]">{f.completed ? "Attracted" : `${f.progress}%`}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Live order cost estimate panel */}
                  <div className="bg-[#0D0B0A] border border-orange-500/20 p-6 rounded-2xl shadow-xl relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-32 h-full bg-orange-500/5 blur-2xl pointer-events-none" />
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" /> Live Grocery Estimate Summary
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-white/5 pb-4 mb-4 text-xs text-white/70">
                      <div>
                        <p className="text-[10px] uppercase text-white/40">Food Subtotal</p>
                        <p className="font-bold text-white mt-1">${estimates.subtotal} USD</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-white/40">Concierge Fee (10%)</p>
                        <p className="font-bold text-white mt-1">${estimates.sourcing} USD</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-white/40">Air/Ocean Shipping</p>
                        <p className="font-bold text-white mt-1">${estimates.shipping} USD</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-white/40">Freshness Wrapping</p>
                        <p className="font-bold text-white mt-1">${estimates.wrap} USD</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-white">
                      <span className="font-bold text-sm tracking-wide">Estimated Retainer Deposit</span>
                      <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#D4AF37] font-mono">
                        ${estimates.total} USD
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 via-[#D4AF37] to-red-600 hover:from-red-600 hover:to-orange-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] text-lg flex items-center justify-center gap-2">
                    <Mail className="w-6 h-6" /> Sourced via Email
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>



      {/* Section 6: Shopping Destinations */}
      <section className="py-24 px-6 relative bg-[#111] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Top Sourcing Destinations</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#D4AF37]/30 transition-colors">
                <div className="text-5xl mb-4">{dest.flag}</div>
                <h3 className="font-bold text-lg mb-2">{dest.name}</h3>
                <p className="text-sm text-white/50">{dest.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted Worldwide</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111] rounded-3xl p-8 border border-white/5 relative"
              >
                <div className="text-[#D4AF37] text-4xl font-serif absolute top-4 left-6 opacity-20">"</div>
                <p className="text-white/80 italic leading-relaxed mb-6 font-light relative z-10 pt-4">"{test.quote}"</p>
                <p className="font-bold text-white/90 text-sm text-[#D4AF37]">— {test.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="py-24 px-6 relative bg-[#111] border-y border-white/5">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left outline-none"
                >
                  <span className={`font-medium text-lg ${openFaq === idx ? 'text-white' : 'text-white/70'}`}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-[#D4AF37]' : 'text-white/30'}`} />
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

      {/* Section 9: Final CTA */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-3xl p-12 md:p-24 text-center relative overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 leading-tight text-white">Shop Globally <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Without Limits</span></h2>
            <p className="text-xl text-white/50 mb-12 relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
              From electronics and luxury products to African groceries and personal gifts — we bring the world to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link href="#request" className="bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Start Shopping
              </Link>
              <a href="https://t.me/fenway4u_concierge" target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-[#0088cc] to-[#24A1DE] hover:from-[#24A1DE] hover:to-[#0088cc] text-white font-bold px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_20px_rgba(36,161,222,0.3)] flex items-center justify-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.47-.8-.26-1.42-.4-1.36-.85.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.11.17.26.19.37.01.07.03.22.02.39z"/>
                </svg>
                Telegram Shopping Concierge
              </a>
              <a href="mailto:consult@fenway4u.com?subject=Shop For Me Purchasing Order — FENWAY4U&body=Hi FENWAY4U Sourcing Team,%0A%0AI would like to submit a Shop For Me purchase request.%0A%0AItems to buy:%0ASourcing Store Link:%0A%0AThank you." className="glass text-white font-bold px-10 py-5 rounded-xl hover:bg-white/10 border border-white/20 transition-all flex items-center justify-center gap-3 text-lg">
                <Mail className="w-5 h-5 text-[#D4AF37]" /> Email Purchase Request
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
