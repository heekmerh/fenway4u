"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, Globe, Shield, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export function FinalCTA() {
  const pathname = usePathname();

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

  // Pre-filled Email links for each page
  const emailMap: { [key: string]: { subject: string; body: string } } = {
    "/study-visa": {
      subject: "Study Visa Academic Advisory Request",
      body: "Hi FENWAY4U Team,\n\nI would like to request academic visa guidance.\n\nName:\nCountry of Interest:\nIntended Level of Study:\nExpected Intakes:\n\nThank you.",
    },
    "/work-permit": {
      subject: "Work Permit Advisory Request",
      body: "Hi FENWAY4U Team,\n\nI would like to request immigration work permit assistance.\n\nName:\nTarget Country:\nProfession/Industry:\nYears of Experience:\n\nThank you.",
    },
    "/relocation-support": {
      subject: "Global Relocation & Travel Assessment",
      body: "Hi FENWAY4U Team,\n\nI would like to request a travel and relocation assessment.\n\nName:\nCurrent Location:\nDestination Country:\nTimeline to Move:\nNumber of Family Members Moving:\n\nThank you.",
    },
    "/air-freight": {
      subject: "Air Freight Cargo Quote Request",
      body: "Hi FENWAY4U Team,\n\nI would like to request an Air Freight cargo quote.\n\nName:\nCargo Origin:\nCargo Destination:\nEstimated Weight (kg):\nType of Goods:\n\nThank you.",
    },
    "/sea-freight": {
      subject: "Sea Freight Logistics Quote Request",
      body: "Hi FENWAY4U Team,\n\nI would like to request a Sea Freight cargo quote.\n\nName:\nOrigin Port:\nDestination Port:\nContainer Size (20ft/40ft/LCL):\nEstimated Weight (kg):\n\nThank you.",
    },
    "/car-shipping": {
      subject: "Car Shipping Quote Request",
      body: "Hi FENWAY4U Team,\n\nI would like to request a vehicle shipping quote.\n\nName:\nVehicle Make & Model:\nOrigin Country/Port:\nDestination Country/Port:\n\nThank you.",
    },
    "/electronics-shipping": {
      subject: "Electronics Shipping Request",
      body: "Hi FENWAY4U Team,\n\nI would like to request an electronics shipping quote.\n\nName:\nItem Type (e.g., Laptops, Phones):\nOrigin (USA/UK/Canada):\nDestination:\nQuantity:\n\nThank you.",
    },
    "/customs-clearance": {
      subject: "Customs Clearance Brokerage Request",
      body: "Hi FENWAY4U Team,\n\nI need customs clearance brokerage assistance.\n\nName:\nImport/Export Origin:\nCustoms Destination Port:\nType of Goods:\nCommercial Invoice Attached? (Yes/No):\n\nThank you.",
    },
    "/shop-for-me": {
      subject: "Shop For Me Purchasing Order",
      body: "Hi FENWAY4U Team,\n\nI would like to use the Shop For Me purchase concierge service.\n\nName:\nProduct Description:\nProduct Store Link:\nQuantity:\nDelivery Address:\n\nThank you.",
    },
  };

  const defaultEmail = {
    subject: "General Consultation Request",
    body: "Hi FENWAY4U Team,\n\nI would like to request a premium logistics and relocation consultation.\n\nName:\nService of Interest:\nDetails of Request:\n\nThank you.",
  };

  const currentEmailData = emailMap[pathname] || defaultEmail;
  const mailtoLink = `mailto:consult@fenway4u.com?subject=${encodeURIComponent(
    currentEmailData.subject + " — FENWAY4U"
  )}&body=${encodeURIComponent(currentEmailData.body)}`;

  // Dispatch custom window event to trigger global slide-up modal
  const triggerConsultationModal = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#020617]">
      {/* Dynamic Ambient Backdrops */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#D4AF37]/5 via-blue-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A0F1C]/80 border border-[#D4AF37]/20 rounded-3xl p-12 md:p-20 shadow-2xl backdrop-blur-md relative"
        >
          {/* Subtle Glowing Header Icon */}
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6 border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Sparkles className="w-5 h-5" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
            Need <span className="text-[#D4AF37]">Assistance?</span>
          </h2>
          
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto font-light">
            Our international support team is ready to help. Speak with an expert today to streamline your visa, shipping, or relocation journey.
          </p>
          
          {/* Main Action Buttons Grid */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12 max-w-3xl mx-auto">
            {/* Telegram Support Button - Primary */}
            <a 
              href={currentTelegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4.5 bg-gradient-to-r from-[#0088cc] to-[#24A1DE] hover:from-[#24A1DE] hover:to-[#0088cc] text-white font-bold text-base rounded-xl transition-all shadow-[0_0_20px_rgba(0,136,204,0.35)] hover:shadow-[0_0_35px_rgba(0,136,204,0.6)] w-full md:w-auto relative group shrink-0"
            >
              {/* Subtle Bouncing Plane Icon inside */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.47-.8-.26-1.42-.4-1.36-.85.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.11.17.26.19.37.01.07.03.22.02.39z"/>
              </svg>
              Telegram Support
            </a>

            {/* Email Us Button - Secondary */}
            <a 
              href={mailtoLink}
              className="flex items-center justify-center gap-3 px-8 py-4.5 bg-[#0A0F1C]/90 text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] font-bold text-base rounded-xl transition-all duration-300 w-full md:w-auto shrink-0"
            >
              <Mail className="w-5 h-5 text-[#D4AF37]" />
              Email Us
            </a>

            {/* Request Consultation - Tertiary */}
            <button 
              onClick={triggerConsultationModal}
              className="flex items-center justify-center gap-3 px-8 py-4.5 bg-gradient-to-r from-[#D4AF37] to-[#F3C332] text-[#0A0F1C] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] font-bold text-base rounded-xl transition-all w-full md:w-auto shrink-0"
            >
              <MessageSquare className="w-5 h-5" />
              Request Consultation
            </button>
          </div>

          {/* Premium Availability Badges Section */}
          <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 justify-center md:justify-start bg-white/3 py-3 px-4 rounded-xl border border-white/5">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              <div className="text-left">
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Response Time</p>
                <p className="text-sm font-bold text-white">&lt; 3 Mins on Telegram</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-center md:justify-start bg-white/3 py-3 px-4 rounded-xl border border-white/5">
              <Globe className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Availability</p>
                <p className="text-sm font-bold text-white">24/7 Global Coverage</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-center md:justify-start bg-white/3 py-3 px-4 rounded-xl border border-white/5">
              <Shield className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Global Support</p>
                <p className="text-sm font-bold text-white mt-0.5">🇬🇧 English Only</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
