"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, X, Check, Shield, Clock, Users, ArrowRight, ArrowLeft, 
  UploadCloud, FileText, Sparkles, ChevronRight, Trash2, Loader2, 
  HelpCircle, Send, DollarSign, AlertCircle, Laptop, BookOpen, 
  Briefcase, Plane, Ship, Globe, Building2, ShoppingBag, Smartphone, 
  Car, Settings, CheckSquare, Square, Calendar, ChevronLeft, Phone, Video
} from "lucide-react";

// Types for Form Data
interface FormData {
  name: string;
  email: string;
  telegram: string;
  phone: string;
  residence: string;
  destination: string;
  service: string;
  contactMethod: string;
  urgency: string;
  additionalNotes: string;
  checklist: string[];
  // Study Visa specifics
  ieltsStatus: string;
  intendedSchool: string;
  programType: string;
  // Electronics specifics
  electronicsItemType: string;
  electronicsQuantity: string;
  electronicsValue: string;
  electronicsPickup: string;
  electronicsMethod: string;
  // Shop For Me specifics
  shopUrl: string;
  shopDesc: string;
  shopStore: string;
  shopBudget: string;
  // Freight specifics
  freightWeight: string;
  freightDimensions: string;
  freightCargoType: string;
  // Appointment Details
  bookingDate: string;
  bookingTime: string;
  bookingTimezone: string;
  consultationType: string;
}

interface UploadedFile {
  name: string;
  size: string;
  progress: number;
  completed: boolean;
}

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export function FloatingContacts() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Save & Resume toast state
  const [showRestoreToast, setShowRestoreToast] = useState(false);
  
  // Drag & drop file upload state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  
  // AI Chat Assistant state
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am your INTMOVE AI Sourcing Advisor. Ask me anything about document requirements, logistics fees, or travel eligibility guidelines!",
      time: "Just now"
    }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Calendar scheduling month state (initially June 2026)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5));

  // Form State initialized to empty defaults
  const initialFormState: FormData = {
    name: "",
    email: "",
    telegram: "",
    phone: "",
    residence: "",
    destination: "",
    service: "General Inquiry",
    contactMethod: "Telegram",
    urgency: "Standard",
    additionalNotes: "",
    checklist: [],
    ieltsStatus: "Not Taken",
    intendedSchool: "",
    programType: "Undergraduate",
    electronicsItemType: "Smartphone",
    electronicsQuantity: "1",
    electronicsValue: "",
    electronicsPickup: "",
    electronicsMethod: "Express Air (3-5 days)",
    shopUrl: "",
    shopDesc: "",
    shopStore: "",
    shopBudget: "",
    freightWeight: "",
    freightDimensions: "",
    freightCargoType: "Commercial Goods",
    // Scheduling parameters
    bookingDate: "",
    bookingTime: "",
    bookingTimezone: "UTC",
    consultationType: "Telegram Consultation",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);

  // Category map based on active page
  const categoryMap: { [key: string]: string } = {
    "/study-visa": "Study Visa Guidance",
    "/work-permit": "Work Permit Consultation",
    "/air-freight": "Air Freight Cargo",
    "/sea-freight": "Sea Freight Cargo",
    "/car-shipping": "Car Shipping & Transport",
    "/electronics-shipping": "Electronics & Tech Shipping",
    "/customs-clearance": "Customs Brokerage & Clearance",
    "/shop-for-me": "Shop For Me Concierge",
    "/relocation-support": "Global Relocation & Travel",
  };

  // Smart routing for Telegram channels
  const telegramMap: { [key: string]: string } = {
    "/study-visa": "https://t.me/fenway4u_visa",
    "/work-permit": "https://t.me/fenway4u_visa",
    "/relocation-support": "https://t.me/fenway4u_visa",
    "/air-freight": "https://t.me/fenway4u_logistics",
    "/sea-freight": "https://t.me/fenway4u_logistics",
    "/car-shipping": "https://t.me/fenway4u_logistics",
    "/electronics-shipping": "https://t.me/fenway4u_logistics",
    "/customs-clearance": "https://t.me/fenway4u_logistics",
    "/shop-for-me": "https://t.me/fenway4u_concierge",
  };

  const currentTelegramLink = telegramMap[pathname] || "https://t.me/fenway4u_support";

  // Checklists based on service selected
  const checklistsByService: { [key: string]: string[] } = {
    "Study Visa Guidance": [
      "International Passport", "Academic Transcript", "WAEC/NECO Result", 
      "IELTS/TOEFL Result", "Bank Statement", "Sponsor Letter", 
      "Admission Letter", "Passport Photograph", "CV/Resume"
    ],
    "Work Permit Consultation": [
      "International Passport", "Updated CV/Resume", "Degree Certificate", 
      "Employment Letter", "Language Test Result", "Police Clearance", 
      "Bank Statement", "Job Offer Letter"
    ],
    "Global Relocation & Travel": [
      "Passport", "Bank Statement", "Invitation Letter", 
      "Employment Letter", "Travel Itinerary", "Accommodation Proof", 
      "Passport Photograph"
    ],
    "Customs Brokerage & Clearance": [
      "Commercial Invoice", "Bill of Lading / AWB", "Packing List", 
      "Vehicle Logbook (if applicable)", "Customs Declaration", 
      "Import Permit", "Identification Documents"
    ],
    "Car Shipping & Transport": [
      "Vehicle Title & Registration", "Commercial Invoice / Purchase Invoice", 
      "Owner ID / Passport", "Consignee Details", "Bill of Sale"
    ],
    "Business Freight Services": [
      "Commercial Invoice", "Certificate of Origin", "Packing List", 
      "Import/Export License", "Cargo Insurance Certificate"
    ]
  };

  // Check if current service requires a checklist
  const requiresChecklist = !!checklistsByService[formData.service];

  // Autosave triggers on any change to formData
  useEffect(() => {
    if (formData !== initialFormState) {
      localStorage.setItem("intmove_consultation_draft", JSON.stringify(formData));
    }
  }, [formData]);

  // Auto-detect timezone on mount
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        setFormData(prev => ({ ...prev, bookingTimezone: tz }));
      }
    } catch (e) {
      console.warn("Timezone detection failed", e);
    }
  }, []);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("intmove_consultation_draft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        // Quick verification to make sure it matches structure
        if (parsed.name || parsed.email || parsed.service !== "General Inquiry") {
          setShowRestoreToast(true);
        }
      } catch (e) {
        console.error("Error loading draft", e);
      }
    }
  }, []);

  // Pre-select service based on URL path when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const detectedService = categoryMap[pathname];
      if (detectedService) {
        setFormData(prev => ({ ...prev, service: detectedService }));
      }
    }
  }, [isModalOpen, pathname]);

  // Listen to global open event
  useEffect(() => {
    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  // Auto-scroll AI chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages, aiTyping]);

  // Restore draft handler
  const restoreDraft = () => {
    const savedDraft = localStorage.getItem("intmove_consultation_draft");
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
    setShowRestoreToast(false);
  };

  // Clear draft / reset form handler
  const discardDraft = () => {
    localStorage.removeItem("intmove_consultation_draft");
    setFormData(initialFormState);
    setUploadedFiles([]);
    setShowRestoreToast(false);
  };

  // Calendar cell helper and calendar event link generators
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const cells = [];
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      cells.push(new Date(year, month, day));
    }
    return cells;
  };

  const getGoogleCalendarLink = () => {
    const title = `Onboarding Consultation: ${formData.service}`;
    const desc = `Consultation booked with INTMOVE.\nTimezone: ${formData.bookingTimezone}\nMethod: ${formData.consultationType}\nChecklist items ready: ${formData.checklist.join(", ")}`;
    
    const dateObj = new Date(formData.bookingDate || "2026-06-18");
    const timeParts = (formData.bookingTime || "02:00 PM").split(" ");
    let [hours, minutes] = timeParts[0].split(":");
    if (timeParts[1] === "PM" && hours !== "12") hours = String(Number(hours) + 12);
    if (timeParts[1] === "AM" && hours === "12") hours = "00";
    
    dateObj.setHours(Number(hours), Number(minutes), 0);
    
    const startStr = dateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    // Add 45 mins
    const endDate = new Date(dateObj.getTime() + 45 * 60 * 1000);
    const endStr = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(desc)}&sf=true&output=xml`;
  };

  const getIcsDownloadLink = () => {
    const title = `Onboarding Consultation: ${formData.service}`;
    const desc = `Consultation booked with INTMOVE.\nTimezone: ${formData.bookingTimezone}\nMethod: ${formData.consultationType}`;
    
    const dateObj = new Date(formData.bookingDate || "2026-06-18");
    const timeParts = (formData.bookingTime || "02:00 PM").split(" ");
    let [hours, minutes] = timeParts[0].split(":");
    if (timeParts[1] === "PM" && hours !== "12") hours = String(Number(hours) + 12);
    if (timeParts[1] === "AM" && hours === "12") hours = "00";
    
    dateObj.setHours(Number(hours), Number(minutes), 0);
    
    const startStr = dateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endDate = new Date(dateObj.getTime() + 45 * 60 * 1000);
    const endStr = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//INTMOVE//Advisory Onboarding//EN
BEGIN:VEVENT
UID:uid-${Date.now()}@intmove.com
DTSTAMP:${startStr}
DTSTART:${startStr}
DTEND:${endStr}
SUMMARY:${title}
DESCRIPTION:${desc}
END:VEVENT
END:VCALENDAR`;
    
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  };

  // Drag and Drop Handlers
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
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        progress: 0,
        completed: false
      };
      
      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate premium animated upload progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        setUploadedFiles(prev => 
          prev.map(f => f.name === file.name ? { ...f, progress: currentProgress } : f)
        );

        if (currentProgress >= 100) {
          clearInterval(interval);
          setUploadedFiles(prev => 
            prev.map(f => f.name === file.name ? { ...f, completed: true } : f)
          );
        }
      }, 250);
    });
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
  };

  // Dynamic Cost Calculation
  const calculateCosts = () => {
    let baseFee = 0;
    let details: { [key: string]: number } = {};

    switch (formData.service) {
      case "Study Visa Guidance":
        baseFee = 300;
        details["Academic Advisory & Sourcing Base"] = 300;
        if (formData.destination === "Canada") {
          baseFee += 75;
          details["Canada Premium Routing Option"] = 75;
        } else if (formData.destination === "United States") {
          baseFee += 50;
          details["USA Premium Routing Option"] = 50;
        }
        break;
      case "Work Permit Consultation":
        baseFee = 450;
        details["Work Permit & Employment Assessment"] = 450;
        break;
      case "Global Relocation & Travel":
        baseFee = 250;
        details["Sojourn & Visitor Assessment Plan"] = 250;
        break;
      case "Customs Brokerage & Clearance":
        baseFee = 200;
        details["Standard Customs Clearance Brokerage"] = 200;
        break;
      case "Car Shipping & Transport":
        baseFee = 1200;
        details["Ocean Auto Cargo Container Block"] = 1200;
        break;
      case "Electronics & Tech Shipping":
        baseFee = 85;
        details["Delicate Tech Surcharge base"] = 85;
        if (formData.electronicsMethod.includes("Air")) {
          baseFee += 45;
          details["Express Air cargo delivery"] = 45;
        } else {
          baseFee += 20;
          details["Ocean consolidated delivery"] = 20;
        }
        break;
      case "Shop For Me Concierge":
        const budgetVal = parseFloat(formData.shopBudget) || 1000;
        const sourcingFee = Math.max(50, budgetVal * 0.05);
        baseFee = sourcingFee;
        details["Sourcing Assistance (5% of budget)"] = sourcingFee;
        break;
      case "Air Freight Cargo":
        baseFee = 150;
        details["Aviation Fuel & Handling Base"] = 150;
        break;
      case "Sea Freight Cargo":
        baseFee = 350;
        details["Maritime consolidated ocean base"] = 350;
        break;
      default:
        baseFee = 0;
        details["General Consultation Base"] = 0;
    }

    if (formData.urgency === "Express (High Urgency)") {
      baseFee += 100;
      details["High-Priority Fast-Track Surcharge"] = 100;
    } else if (formData.urgency === "Flexible") {
      baseFee = Math.max(0, baseFee - 30);
      details["Standard Economy Savings Surcharge"] = -30;
    }

    return { total: baseFee, breakdown: details };
  };

  const costBreakdown = calculateCosts();

  // Smart checklist toggle
  const toggleChecklistItem = (item: string) => {
    setFormData(prev => {
      const exists = prev.checklist.includes(item);
      const updatedChecklist = exists 
        ? prev.checklist.filter(i => i !== item)
        : [...prev.checklist, item];
      return { ...prev, checklist: updatedChecklist };
    });
  };

  // AI Assistant responses
  const triggerAiResponse = (userText: string) => {
    setAiMessages(prev => [...prev, { sender: "user", text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setAiTyping(true);

    setTimeout(() => {
      let botResponse = "";
      const textLower = userText.toLowerCase();

      if (textLower.includes("study") || textLower.includes("visa")) {
        botResponse = "For Study Visas, the critical documents are: 1. Academic Transcripts, 2. Financial Sponsor Letter + Bank Statements (showing sufficient study/living funds for at least 1 year), and 3. An official Admission Letter from your school. Canada and US routes generally take 3-6 months. We recommend starting early!";
      } else if (textLower.includes("shop") || textLower.includes("purchase") || textLower.includes("concierge")) {
        botResponse = "Our 'Shop For Me' service is built for clients without eligible international credit cards. You share the Amazon, Best Buy, or Apple links, we purchase the items, inspect them for condition in our secure local warehouse, and ship them to your home address via Express Air cargo.";
      } else if (textLower.includes("eligibility") || textLower.includes("work") || textLower.includes("permit")) {
        botResponse = "Work Permit eligibility depends heavily on: a legitimate Job Offer Letter from a registered international company, certified Degree Certificates matching the job profile, and basic Language test certificates (IELTS/TEF). We fast-track documentation clearance within 6-8 weeks.";
      } else if (textLower.includes("shipping") || textLower.includes("freight") || textLower.includes("fees")) {
        botResponse = "Shipping cargo fees are volumetric. Air freight base starts at $150 (perfect for smartphones and luxury electronics taking 3-5 days), while sea freight consolidated LCL is $350 (ideal for heavy commercial boxes taking 3-6 weeks). All cargo includes comprehensive premium loss insurance.";
      } else {
        botResponse = `Based on your selected service (${formData.service}), we require basic personal identification (ID/Passport) and specific invoices. Please fill in Step 1 & 2 of the form so we can generate an accurate customized cost and legal checklist for you!`;
      }

      setAiMessages(prev => [...prev, { sender: "bot", text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setAiTyping(false);
    }, 1200);
  };

  // Form Submition Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const checklistRate = requiresChecklist 
      ? Math.round((formData.checklist.length / (checklistsByService[formData.service]?.length || 1)) * 100)
      : 100;

    // Create the subject line based on framework
    const subject = encodeURIComponent(`New Consultation Booking — ${formData.service} — ${formData.name}`);
    
    // Category-based email template body
    let bodyText = `========= CLIENT PROFILE =========
Full Name: ${formData.name}
Email Address: ${formData.email}
Telegram Username: @${formData.telegram.replace("@", "")}
Phone Number: ${formData.phone || "Not Provided"}
Country of Residence: ${formData.residence || "Not Provided"}
Destination Target: ${formData.destination || "Not Provided"}
Service Requested: ${formData.service}
Preferred Contact: ${formData.contactMethod}
Urgency Level: ${formData.urgency}

========= APPOINTMENT SCHEDULED =========
Consultation Type: ${formData.consultationType}
Date Selected: ${formData.bookingDate}
Time Selected: ${formData.bookingTime}
User Timezone: ${formData.bookingTimezone}
Note: The first 30 minutes of the consultation is entirely free. Billed hourly subsequently.

========= SERVICE DETAILS & LOGIC =========\n`;

    if (formData.service === "Study Visa Guidance") {
      bodyText += `Destination Country: ${formData.destination}
IELTS/Language Exam Status: ${formData.ieltsStatus}
Intended Academic Institution: ${formData.intendedSchool || "Not Specified"}
Program Level: ${formData.programType}
`;
    } else if (formData.service === "Electronics & Tech Shipping") {
      bodyText += `Electronic Item Type: ${formData.electronicsItemType}
Quantity to Ship: ${formData.electronicsQuantity}
Estimated Item Value: $${formData.electronicsValue || "0"}
Pickup Location: ${formData.electronicsPickup || "Warehouse drop-off"}
Shipping Channel: ${formData.electronicsMethod}
`;
    } else if (formData.service === "Shop For Me Concierge") {
      bodyText += `Purchase Store Link: ${formData.shopUrl}
Product Description: ${formData.shopDesc || "Not Provided"}
Preferred Store: ${formData.shopStore || "Online Retailer"}
Sourcing Budget: $${formData.shopBudget || "0"}
`;
    } else if (formData.service.includes("Freight")) {
      bodyText += `Estimated Weight: ${formData.freightWeight || "0"} kg
Dimensions (CBM): ${formData.freightDimensions || "0"} CBM
Cargo Commodity Type: ${formData.freightCargoType}
`;
    }

    // checklist calculations using standard fallback if none exists
    const listToUse = checklistsByService[formData.service] || ["International Passport", "Driver License / ID Card", "Utility Bill / Proof of Address"];
    bodyText += `\n========= SMART CHECKLIST STATUS (${formData.checklist.length}/${listToUse.length} Completed) =========
${listToUse.map(item => {
  const checked = formData.checklist.includes(item);
  return `${checked ? "✅ [HAS DOCUMENT]" : "❌ [MISSING]"} - ${item}`;
}).join("\n")}
`;

    bodyText += `
========= DYNAMIC COST ESTIMATION =========
Total Estimated Fee: $${costBreakdown.total} USD
Details:
${Object.entries(costBreakdown.breakdown).map(([k, v]) => `  - ${k}: $${v} USD`).join("\n")}

========= ATTACHED DOCUMENTS & ATTESTATION =========
Files Ready to Upload: ${uploadedFiles.length > 0 ? uploadedFiles.map(f => `${f.name} (${f.size})`).join(", ") : "No files attached. Sourcing through mail."}

---
Inquiry Draft ID: INTMOVE-${Math.floor(100000 + Math.random() * 900000)}
Sent via INTMOVE Global Onboarding & Premium Booking System`;

    const body = encodeURIComponent(bodyText);

    // Redirect to pre-filled mailto link
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");

    // Success transition
    setIsSubmitted(true);
    
    // Clean up local storage
    localStorage.removeItem("intmove_consultation_draft");
    
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setActiveStep(1);
      setFormData(initialFormState);
      setUploadedFiles([]);
    }, 3000);
  };

  return (
    <>
      {/* Floating Buttons Stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-center">
        
        {/* Floating Email Button (Glassmorphism & Gold border) */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          className="relative flex items-center justify-center w-14 h-14 bg-[#0A0F1C]/90 text-white rounded-full border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300"
          title="Open Email Consultation Form"
        >
          <Mail className="w-6 h-6 text-[#D4AF37]" />
        </motion.button>

        {/* Floating Telegram Button (Electric Blue Gradient & Glow) */}
        <motion.a
          href={currentTelegramLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#0088cc] to-[#24A1DE] text-white rounded-full shadow-[0_0_20px_rgba(36,161,222,0.4)] hover:shadow-[0_0_30px_rgba(36,161,222,0.7)] group"
          title="Chat instantly on Telegram"
        >
          {/* Subtle Halo Pulsing Effect */}
          <span className="absolute inset-0 w-full h-full rounded-full bg-[#24A1DE] animate-ping opacity-30 group-hover:opacity-40 transition-opacity"></span>
          
          {/* Custom Telegram SVG Logo */}
          <svg className="w-6 h-6 relative z-10 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.47-.8-.26-1.42-.4-1.36-.85.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.11.17.26.19.37.01.07.03.22.02.39z"/>
          </svg>
        </motion.a>
      </div>

      {/* Restore Toast Notification */}
      <AnimatePresence>
        {showRestoreToast && (
          <div className="fixed bottom-24 right-6 z-50 max-w-sm">
            <motion.div
              initial={{ transform: "translateY(50px) scale(0.9)", opacity: 0 }}
              animate={{ transform: "translateY(0) scale(1)", opacity: 1 }}
              exit={{ transform: "translateY(50px) scale(0.9)", opacity: 0 }}
              className="bg-[#0A0F1C] border border-[#D4AF37]/40 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Draft Form Found</h4>
                  <p className="text-xs text-white/60 mt-1">You have an incomplete consultation request saved locally. Would you like to resume?</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end text-xs font-bold">
                <button onClick={discardDraft} className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 transition-colors">Discard</button>
                <button onClick={restoreDraft} className="px-3 py-1.5 rounded bg-[#D4AF37] hover:bg-[#F3C332] text-black transition-colors">Resume Draft</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Consultation Glassmorphic Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-0 md:p-4 py-8 md:py-16 overflow-y-auto bg-black/70 backdrop-blur-lg">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 z-0 bg-black/20"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative z-10 w-full max-w-4xl min-h-screen md:min-h-0 bg-[#0A0F1C]/95 rounded-none md:rounded-3xl border-0 md:border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] backdrop-blur-3xl overflow-hidden flex flex-col lg:flex-row"
            >
              
              {/* Form Side */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                
                {/* Form Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                      <Sparkles className="w-3 h-3" /> Premium Advisory
                    </div>
                    <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">Draft Saved</span>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Indicators */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs text-white/50 font-bold mb-3 uppercase tracking-wider">
                    <span>Step {activeStep} of 5</span>
                    <span className="text-[#D4AF37]">
                      {activeStep === 1 && "Personal Profile"}
                      {activeStep === 2 && "Service details"}
                      {activeStep === 3 && "Smart Checklist"}
                      {activeStep === 4 && "Calendar Scheduling"}
                      {activeStep === 5 && "Review & Submit"}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full rounded-full transition-all duration-300 ${activeStep >= 1 ? 'bg-gradient-to-r from-blue-500 to-[#D4AF37] w-1/5' : 'w-0'}`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${activeStep >= 2 ? 'bg-gradient-to-r from-[#D4AF37] to-purple-500 w-1/5' : 'w-0'}`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${activeStep >= 3 ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-1/5' : 'w-0'}`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${activeStep >= 4 ? 'bg-gradient-to-r from-pink-500 to-blue-400 w-1/5' : 'w-0'}`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${activeStep >= 5 ? 'bg-[#D4AF37] w-1/5' : 'w-0'}`} />
                  </div>
                </div>

                {/* Steps Body */}
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-start">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <div className="space-y-6">
                        
                        {/* STEP 1: PERSONAL INFORMATION */}
                        {activeStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="space-y-4"
                          >
                            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Personal Information</h3>
                            <p className="text-white/50 text-sm font-light mb-6">Let's set up your profile first. Your data is encrypted and saved securely.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* Full Name */}
                              <div>
                                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Full Name *</label>
                                <input 
                                  type="text" 
                                  required
                                  value={formData.name}
                                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                                  placeholder="John Doe" 
                                  className="w-full bg-[#020617] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors shadow-inner focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                                />
                              </div>

                              {/* Email Address */}
                              <div>
                                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Email Address *</label>
                                <input 
                                  type="email" 
                                  required
                                  value={formData.email}
                                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                                  placeholder="john@example.com" 
                                  className="w-full bg-[#020617] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors shadow-inner"
                                />
                              </div>

                              {/* Telegram Username */}
                              <div>
                                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Telegram Username *</label>
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">@</span>
                                  <input 
                                    type="text" 
                                    required
                                    value={formData.telegram.replace("@", "")}
                                    onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                                    placeholder="johndoe_int" 
                                    className="w-full bg-[#020617] border border-white/10 focus:border-[#D4AF37] rounded-xl pl-8 pr-4 py-3 text-sm text-white outline-none transition-colors shadow-inner"
                                  />
                                </div>
                              </div>

                              {/* Phone Number */}
                              <div>
                                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Phone Number</label>
                                <input 
                                  type="tel" 
                                  value={formData.phone}
                                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                  placeholder="+1 (555) 000-0000" 
                                  className="w-full bg-[#020617] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors shadow-inner"
                                />
                              </div>

                              {/* Residence Country */}
                              <div>
                                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Country of Residence *</label>
                                <input 
                                  type="text" 
                                  required
                                  value={formData.residence}
                                  onChange={(e) => setFormData({...formData, residence: e.target.value})}
                                  placeholder="e.g. Nigeria" 
                                  className="w-full bg-[#020617] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                                />
                              </div>

                              {/* Destination Country */}
                              <div>
                                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Destination Country *</label>
                                <select 
                                  value={formData.destination}
                                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                                  className="w-full bg-[#020617] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none"
                                >
                                  <option value="">Select Destination</option>
                                  <option value="Canada">Canada 🇨🇦</option>
                                  <option value="United Kingdom">United Kingdom 🇬🇧</option>
                                  <option value="United States">United States 🇺🇸</option>
                                  <option value="Nigeria">Nigeria / Africa 🇳🇬</option>
                                  <option value="Europe">Europe / Schengen 🇪🇺</option>
                                  <option value="Other">Other / Sourcing</option>
                                </select>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: SERVICE DETAILS */}
                        {activeStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="space-y-6"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Service Details</h3>
                                <p className="text-white/50 text-sm font-light">Custom parameters generated for your logistics channel.</p>
                              </div>
                            </div>

                            {/* Service Interest Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Service Category</label>
                                <select 
                                  value={formData.service}
                                  onChange={(e) => setFormData({...formData, service: e.target.value, checklist: []})}
                                  className="w-full bg-[#020617] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none"
                                >
                                  <option value="General Inquiry">General Inquiry</option>
                                  <option value="Study Visa Guidance">Study Visa Guidance 🎓</option>
                                  <option value="Work Permit Consultation">Work Permit Guidance 💼</option>
                                  <option value="Global Relocation & Travel">Relocation & Visitor Visa ✈️</option>
                                  <option value="Customs Brokerage & Clearance">Customs Clearance 🛃</option>
                                  <option value="Car Shipping & Transport">Vehicle Shipping 🚗</option>
                                  <option value="Business Freight Services">Business Freight Services 🏢</option>
                                  <option value="Electronics & Tech Shipping">Electronics Shipping 📱</option>
                                  <option value="Shop For Me Concierge">Shop For Me Concierge 🛒</option>
                                  <option value="Air Freight Cargo">Air Freight (simple quote) ✈️📦</option>
                                  <option value="Sea Freight Cargo">Sea Freight (simple quote) 🚢📦</option>
                                </select>
                              </div>

                              {/* Urgency Level */}
                              <div>
                                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Urgency / Timeline</label>
                                <select 
                                  value={formData.urgency}
                                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                                  className="w-full bg-[#020617] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none"
                                >
                                  <option value="Standard">Standard (Regular speed)</option>
                                  <option value="Express (High Urgency)">Express (Fastest speed / Surcharge)</option>
                                  <option value="Flexible">Flexible (Economy rate)</option>
                                </select>
                              </div>
                            </div>

                            {/* --- CONDITIONAL SPECIFICS: STUDY VISA + CANADA LOGIC --- */}
                            {formData.service === "Study Visa Guidance" && formData.destination === "Canada" && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-4"
                              >
                                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                  <Globe className="w-4 h-4" /> Canada Student Routing Criteria
                                </h4>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase tracking-wide">IELTS Status</label>
                                    <select 
                                      value={formData.ieltsStatus}
                                      onChange={(e) => setFormData({...formData, ieltsStatus: e.target.value})}
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                    >
                                      <option value="Not Taken">Not Taken Yet</option>
                                      <option value="Result Ready">Result Ready (6.5+)</option>
                                      <option value="Scheduled">Exam Scheduled</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase tracking-wide">Intended School</label>
                                    <input 
                                      type="text" 
                                      value={formData.intendedSchool}
                                      onChange={(e) => setFormData({...formData, intendedSchool: e.target.value})}
                                      placeholder="e.g. U of Toronto" 
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase tracking-wide">Program Type</label>
                                    <select 
                                      value={formData.programType}
                                      onChange={(e) => setFormData({...formData, programType: e.target.value})}
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                    >
                                      <option value="Undergraduate">Bachelor's Degree</option>
                                      <option value="Postgraduate">Master's / PhD</option>
                                      <option value="Diploma">College Diploma</option>
                                    </select>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* --- CONDITIONAL SPECIFICS: ELECTRONICS SHIPPING --- */}
                            {formData.service === "Electronics & Tech Shipping" && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-5 rounded-2xl bg-white/3 border border-white/5 space-y-4"
                              >
                                <h4 className="text-xs font-semibold text-white/80 uppercase tracking-widest">Cargo Dimension & Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase">Device Type</label>
                                    <select 
                                      value={formData.electronicsItemType}
                                      onChange={(e) => setFormData({...formData, electronicsItemType: e.target.value})}
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white"
                                    >
                                      <option value="Smartphone">iPhone / Smartphone</option>
                                      <option value="Laptop">MacBook / Laptop</option>
                                      <option value="Television">LED / OLED TV</option>
                                      <option value="Gaming Console">PlayStation 5 / Console</option>
                                      <option value="Other Tech">Other High-Value Tech</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase">Est. Value (USD)</label>
                                    <input 
                                      type="text" 
                                      value={formData.electronicsValue}
                                      onChange={(e) => setFormData({...formData, electronicsValue: e.target.value})}
                                      placeholder="e.g. $1,200" 
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase">Shipping Route</label>
                                    <select 
                                      value={formData.electronicsMethod}
                                      onChange={(e) => setFormData({...formData, electronicsMethod: e.target.value})}
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white"
                                    >
                                      <option value="Express Air (3-5 days)">Express Air (3-5 days)</option>
                                      <option value="Standard Sea (3-6 weeks)">Standard Sea (3-6 weeks)</option>
                                    </select>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* --- CONDITIONAL SPECIFICS: SHOP FOR ME --- */}
                            {formData.service === "Shop For Me Concierge" && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-5 rounded-2xl bg-white/3 border border-white/5 space-y-4"
                              >
                                <h4 className="text-xs font-semibold text-white/80 uppercase tracking-widest text-[#D4AF37]">Concierge Sourcing URL & Description</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase">Product Store URL</label>
                                    <input 
                                      type="url" 
                                      value={formData.shopUrl}
                                      onChange={(e) => setFormData({...formData, shopUrl: e.target.value})}
                                      placeholder="https://amazon.com/dp/..." 
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase">Sourcing Budget ($)</label>
                                    <input 
                                      type="text" 
                                      value={formData.shopBudget}
                                      onChange={(e) => setFormData({...formData, shopBudget: e.target.value})}
                                      placeholder="e.g. $800" 
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* --- CONDITIONAL SPECIFICS: AIR/SEA FREIGHT --- */}
                            {formData.service.includes("Freight") && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-5 rounded-2xl bg-white/3 border border-white/5 space-y-4"
                              >
                                <h4 className="text-xs font-semibold text-white/80 uppercase tracking-widest">Weight & Volume Cargo Factors</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase">Weight (kg)</label>
                                    <input 
                                      type="number" 
                                      value={formData.freightWeight}
                                      onChange={(e) => setFormData({...formData, freightWeight: e.target.value})}
                                      placeholder="e.g. 250" 
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase">Cargo Volume (CBM)</label>
                                    <input 
                                      type="text" 
                                      value={formData.freightDimensions}
                                      onChange={(e) => setFormData({...formData, freightDimensions: e.target.value})}
                                      placeholder="e.g. 1.2" 
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase">Cargo Commodity</label>
                                    <input 
                                      type="text" 
                                      value={formData.freightCargoType}
                                      onChange={(e) => setFormData({...formData, freightCargoType: e.target.value})}
                                      placeholder="e.g. Machinery" 
                                      className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* Additional Notes */}
                            <div>
                              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Additional Request Details</label>
                              <textarea 
                                rows={2}
                                value={formData.additionalNotes}
                                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                                placeholder="State any specific requests, preferred shipping timetables, or sponsor details here..."
                                className="w-full bg-[#020617] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors resize-none"
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: DOCUMENT CHECKLIST */}
                        {activeStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="space-y-6"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Required Documents</h3>
                                <p className="text-white/50 text-sm font-light">Tick the items you already possess. Our compliance system will prepare templates for missing papers.</p>
                              </div>
                            </div>

                            <div className="bg-white/3 border border-white/5 rounded-2xl p-5 space-y-4">
                              <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                                <Shield className="w-4 h-4 text-[#D4AF37]" /> Smart Checklist: Required Documentation
                              </h4>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {(checklistsByService[formData.service] || ["International Passport", "Driver License / ID Card", "Utility Bill / Proof of Address"]).map((item) => {
                                  const checked = formData.checklist.includes(item);
                                  return (
                                    <button
                                      key={item}
                                      type="button"
                                      onClick={() => toggleChecklistItem(item)}
                                      className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all duration-300
                                        ${checked 
                                          ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white font-semibold' 
                                          : 'bg-[#020617] border-white/5 text-white/50 hover:border-white/20'}`}
                                    >
                                      <div className="shrink-0">
                                        {checked 
                                          ? <CheckSquare className="w-4 h-4 text-[#D4AF37] animate-[scale_0.2s_ease-out]" /> 
                                          : <Square className="w-4 h-4 text-white/30" />
                                        }
                                      </div>
                                      <span>{item}</span>
                                    </button>
                                  );
                                })}
                              </div>
                              
                              {!checklistsByService[formData.service] && (
                                <p className="text-[11px] text-[#D4AF37] italic mt-2">
                                  Note: Sourcing & General Consultations do not require mandatory document sifting. We've preloaded standard identification checklists for you.
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 4: APPOINTMENT BOOKING */}
                        {activeStep === 4 && (
                          <motion.div
                            key="step4"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="space-y-6"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                              <div>
                                <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                                  <Calendar className="w-6 h-6 text-[#D4AF37]" /> Appointment Scheduling
                                </h3>
                                <p className="text-white/50 text-sm font-light">Select a date and direct slot to meet our international coordinators.</p>
                              </div>
                              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span>Only 2 consultation slots left today!</span>
                              </div>
                            </div>

                            {/* Service Duration Alert */}
                            <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-xl flex items-start gap-2.5">
                              <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                              <div>
                                <p className="font-bold uppercase tracking-wider text-[10px]">Consultation Duration Rules</p>
                                <p className="text-white/70 font-light mt-0.5">
                                  {formData.service === "Study Visa Guidance" && "🎓 Study Visa Consultations run for 45 minutes."}
                                  {formData.service === "Work Permit Consultation" && "💼 Work Permit Consultations run for 60 minutes."}
                                  {formData.service === "Electronics & Tech Shipping" && "📱 Electronics Shipping Consultations run for 15 minutes."}
                                  {formData.service !== "Study Visa Guidance" && formData.service !== "Work Permit Consultation" && formData.service !== "Electronics & Tech Shipping" && "🌐 Sourcing, Logistics & Cargo Consultations run for 30 minutes."}
                                  <span className="text-[#D4AF37] font-semibold ml-1">The first 30 minutes are 100% FREE. Subsequent hours are billed hourly.</span>
                                </p>
                              </div>
                            </div>

                            {/* Consultation Types cards */}
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { type: "Video Consultation", icon: Video, label: "Video Call", desc: "Google Meet / Zoom" },
                                { type: "Telegram Consultation", icon: Send, label: "Telegram Support", desc: "Secure Direct Voice/Chat" },
                                { type: "Phone Consultation", icon: Phone, label: "Phone Direct", desc: "Local Standard Call" }
                              ].map(item => {
                                const active = formData.consultationType === item.type;
                                return (
                                  <button
                                    key={item.type}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, consultationType: item.type })}
                                    className={`p-3 rounded-2xl border text-center transition-all duration-300
                                      ${active 
                                        ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                                        : 'bg-[#020617] border-white/5 text-white/50 hover:border-white/20'}`}
                                  >
                                    <item.icon className={`w-5 h-5 mx-auto mb-2 ${active ? 'text-[#D4AF37]' : 'text-white/40'}`} />
                                    <p className="text-xs font-bold truncate">{item.label}</p>
                                    <p className="text-[9px] text-white/40 truncate">{item.desc}</p>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Calendar Grid & Time Slots */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white/2 border border-white/5 p-5 rounded-2xl">
                              
                              {/* Calendar Column */}
                              <div className="md:col-span-7 space-y-4">
                                <div className="flex justify-between items-center bg-white/3 p-2 rounded-xl border border-white/5">
                                  <button 
                                    type="button"
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                    className="p-1 rounded hover:bg-white/5 text-white/60 hover:text-white"
                                  >
                                    <ChevronLeft className="w-5 h-5" />
                                  </button>
                                  <span className="text-xs font-bold text-white uppercase tracking-widest">
                                    {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                                  </span>
                                  <button 
                                    type="button"
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                    className="p-1 rounded hover:bg-white/5 text-white/60 hover:text-white"
                                  >
                                    <ChevronRight className="w-5 h-5" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-7 gap-1 text-center">
                                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                                    <span key={d} className="text-[10px] text-white/30 font-bold uppercase">{d}</span>
                                  ))}
                                  {getDaysInMonth(currentMonth).map((day, idx) => {
                                    if (!day) return <div key={`empty-${idx}`} />;
                                    
                                    const isPast = day.getTime() < new Date().setHours(0,0,0,0);
                                    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                                    const isSelected = formData.bookingDate === day.toDateString();
                                    // Wednesdays/Fridays are limited
                                    const isLimited = day.getDay() === 3 || day.getDay() === 5;

                                    return (
                                      <button
                                        key={day.toDateString()}
                                        type="button"
                                        disabled={isPast || isWeekend}
                                        onClick={() => setFormData({ ...formData, bookingDate: day.toDateString(), bookingTime: "" })}
                                        className={`p-2 rounded-xl text-xs flex flex-col items-center justify-between min-h-[42px] transition-all relative border
                                          ${isSelected 
                                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                                            : isWeekend || isPast
                                              ? 'text-white/10 border-transparent cursor-not-allowed'
                                              : 'bg-[#020617] border-white/5 hover:border-white/20 text-white'}`}
                                      >
                                        <span>{day.getDate()}</span>
                                        {!isPast && !isWeekend && (
                                          <span className={`w-1 h-1 rounded-full ${isLimited ? 'bg-amber-400' : 'bg-green-400'}`} />
                                        )}
                                        {isWeekend && !isPast && (
                                          <span className="text-[6px] text-red-500 scale-75 font-semibold leading-none uppercase">Full</span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Time Slots Column */}
                              <div className="md:col-span-5 flex flex-col justify-start space-y-4">
                                <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-widest border-b border-white/5 pb-2">Available Slots</h4>
                                
                                {formData.bookingDate ? (
                                  <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[190px] pr-1">
                                    {[
                                      "09:00 AM", "10:00 AM", "11:30 AM", 
                                      "01:00 PM", "02:30 PM", "03:30 PM", "04:00 PM"
                                    ].map(slot => {
                                      const active = formData.bookingTime === slot;
                                      
                                      // Deterministically mock slots booked for specific days
                                      const parsedDate = new Date(formData.bookingDate);
                                      const dateNum = parsedDate.getDate();
                                      const isBooked = (dateNum % 3 === 0 && slot === "10:00 AM") || 
                                                        (dateNum % 4 === 0 && slot === "01:00 PM") || 
                                                        (dateNum % 2 === 0 && slot === "03:30 PM");

                                      return (
                                        <button
                                          key={slot}
                                          type="button"
                                          disabled={isBooked}
                                          onClick={() => setFormData({ ...formData, bookingTime: slot })}
                                          className={`py-2 px-3 rounded-xl border text-center text-xs font-semibold transition-all
                                            ${active 
                                              ? 'bg-blue-600 border-blue-500 text-white font-bold' 
                                              : isBooked
                                                ? 'bg-white/1 border-transparent text-white/10 cursor-not-allowed line-through'
                                                : 'bg-[#020617] border-white/5 text-white/70 hover:border-white/20'}`}
                                        >
                                          {isBooked ? `${slot} (Booked)` : slot}
                                        </button>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center py-10 bg-white/1 border border-white/5 rounded-2xl text-center flex-1">
                                    <Calendar className="w-8 h-8 text-white/20 mb-2" />
                                    <p className="text-[10px] text-white/40 max-w-[150px] mx-auto leading-relaxed">Select an open calendar date to view time slots.</p>
                                  </div>
                                )}
                              </div>

                            </div>

                            {/* Timezone Detection and Swapping Selector */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-xl bg-[#020617] border border-white/5 gap-3">
                              <span className="text-[11px] text-white/50 flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5 text-blue-400" />
                                <span>Timezone auto-detected: <strong className="text-white">{formData.bookingTimezone}</strong></span>
                              </span>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] text-white/40 uppercase">Switch:</span>
                                <select
                                  value={formData.bookingTimezone}
                                  onChange={(e) => setFormData({ ...formData, bookingTimezone: e.target.value })}
                                  className="bg-[#0A0F1C] border border-white/10 rounded px-2 py-1 text-[10px] text-white outline-none"
                                >
                                  <option value="UTC">UTC</option>
                                  <option value="EST">EST (New York)</option>
                                  <option value="GMT">GMT (London)</option>
                                  <option value="GMT+1">GMT+1 (West Africa)</option>
                                  <option value="PST">PST (Pacific)</option>
                                  <option value="CET">CET (Central Europe)</option>
                                </select>
                              </div>
                            </div>

                          </motion.div>
                        )}

                        {/* STEP 5: REVIEW & FINAL SUBMIT */}
                        {activeStep === 5 && (
                          <motion.div
                            key="step5"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="space-y-5"
                          >
                            <h3 className="text-2xl font-bold text-white tracking-tight">Review & Booking Confirmation</h3>
                            <p className="text-white/50 text-sm font-light">Confirm your live estimate, checklist completion, and appointment details.</p>

                            {/* Summary Invoice & Appointment Card */}
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-[#0A0F1C] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden space-y-4">
                              <div className="absolute top-0 right-0 w-32 h-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
                              
                              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                <div>
                                  <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Consultation details</h4>
                                  <p className="text-sm font-bold text-white mt-0.5">{formData.service}</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                                    {formData.consultationType.replace(" Consultation", "")}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-xs border-b border-white/5 pb-3">
                                <div>
                                  <p className="text-white/40 text-[9px] uppercase font-bold">Scheduled date</p>
                                  <p className="font-semibold text-white mt-0.5">{formData.bookingDate || "Not Selected"}</p>
                                </div>
                                <div>
                                  <p className="text-white/40 text-[9px] uppercase font-bold">Scheduled time & tz</p>
                                  <p className="font-semibold text-white mt-0.5">{formData.bookingTime || "Not Selected"} ({formData.bookingTimezone})</p>
                                </div>
                              </div>

                              {/* Document checklist completion status */}
                              <div className="space-y-1">
                                <p className="text-white/40 text-[9px] uppercase font-bold">Onboarding documentation checklist</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex-grow bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-green-500 h-full rounded-full transition-all" 
                                      style={{ width: `${(formData.checklist.length / ((checklistsByService[formData.service] || ["International Passport", "Driver License / ID Card", "Utility Bill / Proof of Address"]).length)) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] font-bold text-green-400 font-mono shrink-0">
                                    {formData.checklist.length}/{(checklistsByService[formData.service] || ["International Passport", "Driver License / ID Card", "Utility Bill / Proof of Address"]).length} docs
                                  </span>
                                </div>
                              </div>

                              {/* Fee Invoice Estimate */}
                              <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                                <div className="flex justify-between text-xs text-white/50 font-light">
                                  <span>Service Consultation Retainer Fee</span>
                                  <span className="font-mono">${costBreakdown.total} USD</span>
                                </div>
                                <div className="flex justify-between text-xs text-green-400 font-bold border-t border-white/5 pt-2">
                                  <span>Consultation Promotion Credit</span>
                                  <span className="font-mono">-$30.00 USD</span>
                                </div>
                                <div className="flex justify-between text-sm text-white font-black border-t border-white/10 pt-2">
                                  <span>Estimated Total Retainer Deposit</span>
                                  <span className="font-mono text-[#D4AF37]">${Math.max(0, costBreakdown.total - 30)} USD</span>
                                </div>
                              </div>
                            </div>

                            {/* Drag and Drop Document Upload Zone */}
                            <div>
                              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Upload Support Screenshots / Files (Optional)</label>
                              <div 
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-colors duration-300 relative bg-white/3
                                  ${isDragActive ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/10 hover:border-white/20'}`}
                              >
                                <input 
                                  type="file" 
                                  multiple 
                                  onChange={handleFileInput}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <UploadCloud className="w-6 h-6 text-[#D4AF37] mx-auto mb-1.5" />
                                <p className="text-xs text-white/80 font-bold mb-0.5">Drag & Drop files here, or <span className="text-[#D4AF37]">browse</span></p>
                                <p className="text-[9px] text-white/40">Supports JPG, PNG, PDF formats up to 10MB per file.</p>
                              </div>

                              {/* Uploaded Files Milestones */}
                              {uploadedFiles.length > 0 && (
                                <div className="space-y-2 mt-2 max-h-[100px] overflow-y-auto pr-1">
                                  {uploadedFiles.map(file => (
                                    <div key={file.name} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 text-[10px] text-white">
                                      <div className="flex items-center gap-2 flex-grow truncate">
                                        <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                                        <div className="truncate">
                                          <p className="font-semibold text-white/90 truncate max-w-[150px]">{file.name}</p>
                                          <p className="text-[8px] text-white/40">{file.size}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-3 shrink-0">
                                        {!file.completed ? (
                                          <div className="flex items-center gap-1.5">
                                            <div className="w-12 bg-white/10 h-1 rounded-full overflow-hidden">
                                              <div className="bg-[#D4AF37] h-full" style={{ width: `${file.progress}%` }} />
                                            </div>
                                            <span className="text-[8px] font-mono text-white/50">{file.progress}%</span>
                                          </div>
                                        ) : (
                                          <span className="flex items-center gap-1 text-green-400 text-[8px] font-bold">
                                            <Check className="w-3 h-3 stroke-[3]" /> Staged
                                          </span>
                                        )}
                                        <button type="button" onClick={() => removeFile(file.name)} className="text-white/40 hover:text-red-400 transition-colors">
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Direct Calendar Invite Links Option */}
                            <div className="p-3.5 rounded-xl bg-[#020617] border border-white/5 space-y-2.5">
                              <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">📅 Export Invite Links (Massive professionalism boost):</p>
                              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                                <a 
                                  href={getGoogleCalendarLink()}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-500/20 transition-colors flex items-center gap-1.5"
                                >
                                  Google Calendar
                                </a>
                                <a 
                                  href={getIcsDownloadLink()}
                                  download="INTMOVE_Consultation.ics"
                                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-[#D4AF37] hover:bg-amber-500/20 border border-amber-500/20 transition-colors flex items-center gap-1.5"
                                >
                                  Outlook Calendar (.ics)
                                </a>
                                <a 
                                  href={getIcsDownloadLink()}
                                  download="INTMOVE_Consultation.ics"
                                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors flex items-center gap-1.5"
                                >
                                  Apple iCal (.ics)
                                </a>
                              </div>
                            </div>

                            {/* Contact Method Selector */}
                            <div className="p-3.5 rounded-xl bg-white/3 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-white/60 mb-1.5 uppercase tracking-wider">Preferred Contact Channel</label>
                                <select 
                                  value={formData.contactMethod}
                                  onChange={(e) => setFormData({...formData, contactMethod: e.target.value})}
                                  className="w-full bg-[#020617] border border-white/10 rounded-lg p-2 text-xs text-white"
                                >
                                  <option value="Telegram">Telegram Username (@{formData.telegram || 'username'})</option>
                                  <option value="Email">Email client Inbox ({formData.email || 'your@email.com'})</option>
                                  <option value="Phone Call">Phone Direct ({formData.phone || 'no phone provided'})</option>
                                </select>
                              </div>
                              <div className="flex items-start gap-2.5 text-[10px] text-white/40 leading-relaxed font-light self-center">
                                <Shield className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                <span>We prioritize Telegram contact, routing you directly to corresponding specialists to guarantee same-day bookings.</span>
                              </div>
                            </div>

                          </motion.div>
                        )}

                      </div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                      >
                        <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400 mb-8 shadow-[0_0_35px_rgba(34,197,94,0.25)] animate-bounce">
                          <Check className="w-10 h-10 stroke-[3]" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">Consultation Form Staged</h3>
                        <p className="text-white/60 text-sm max-w-md mx-auto mb-2 leading-relaxed">
                          Your premium consultation details have been compiled. We are now redirecting you to your secure email client.
                        </p>
                        <p className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mt-4">Redirecting in a moment...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Footer Action Buttons */}
                  {!isSubmitted && (
                    <div className="pt-8 border-t border-white/5 flex justify-between gap-4 mt-6">
                      {activeStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => setActiveStep(prev => prev - 1)}
                          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 border border-white/5"
                        >
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={discardDraft}
                          className="px-6 py-3 rounded-xl bg-red-950/20 hover:bg-red-900/10 text-red-400 font-bold text-xs uppercase tracking-wider transition-colors border border-red-500/10"
                        >
                          Reset Form
                        </button>
                      )}

                      {activeStep < 5 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (activeStep === 1 && (!formData.name || !formData.email || !formData.telegram || !formData.residence || !formData.destination)) {
                              alert("Please fill in all required fields marked with * before proceeding.");
                              return;
                            }
                            if (activeStep === 4 && (!formData.bookingDate || !formData.bookingTime)) {
                              alert("Please select a date and an available time slot for your consultation.");
                              return;
                            }
                            setActiveStep(prev => prev + 1);
                          }}
                          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                        >
                          Next <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C332] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] text-[#0A0F1C] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                        >
                          Submit Onboarding Request <Mail className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </form>

              </div>

              {/* Interactive AI Sourcing Assistant Sidebar Panel */}
              <div className="w-full lg:w-[350px] bg-[#0A0F1C] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between h-[350px] lg:h-auto overflow-hidden">
                <div className="p-4 border-b border-white/5 bg-white/2 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0A0F1C] animate-ping" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0A0F1C]" />
                      <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Form Assistant</h4>
                      <p className="text-[9px] text-white/40">Instant Eligibility Advisor</p>
                    </div>
                  </div>
                </div>

                {/* AI Chat History */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[220px] lg:max-h-[none] text-xs">
                  {aiMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                      <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed font-light
                        ${msg.sender === "user" 
                          ? "bg-blue-600 text-white rounded-tr-none" 
                          : "bg-white/5 text-white/80 rounded-tl-none border border-white/5"}`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-white/30 mt-1 font-medium px-1">{msg.time}</span>
                    </div>
                  ))}
                  
                  {aiTyping && (
                    <div className="flex flex-col items-start">
                      <div className="bg-white/5 border border-white/5 text-white/40 p-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                        <span>INTMOVE AI is analyzing rules...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Predefined Quick-Answer Chips */}
                <div className="p-3 bg-white/2 border-t border-white/5 space-y-2 shrink-0">
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider px-1">Common Queries:</p>
                  <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
                    {[
                      "What documents are required for a Study Visa?",
                      "How does Shop For Me work?",
                      "Am I eligible for a Work Permit?",
                      "What is the delivery timeline for Shipping?"
                    ].map(question => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => triggerAiResponse(question)}
                        className="text-[10px] text-white/60 hover:text-white bg-white/5 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 border border-white/5 px-2 py-1.5 rounded-lg text-left transition-colors truncate max-w-[310px]"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Input Box */}
                <div className="p-3 border-t border-white/10 bg-[#020617] shrink-0 flex gap-2">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && aiInput.trim()) {
                        triggerAiResponse(aiInput);
                        setAiInput("");
                      }
                    }}
                    placeholder="Ask AI Form helper..."
                    className="flex-1 bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (aiInput.trim()) {
                        triggerAiResponse(aiInput);
                        setAiInput("");
                      }
                    }}
                    className="bg-[#D4AF37] text-[#0A0F1C] p-2.5 rounded-xl hover:bg-[#F3C332] transition-colors shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
