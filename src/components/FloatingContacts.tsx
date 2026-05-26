"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Check, Shield, Clock, Users } from "lucide-react";

export function FloatingContacts() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("General Inquiry");
  const [message, setMessage] = useState("");

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

  // Pre-select service based on URL path when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const detectedService = categoryMap[pathname];
      if (detectedService) {
        setService(detectedService);
      } else {
        setService("General Inquiry");
      }
    }
  }, [isModalOpen, pathname]);

  // Listen to the global custom event to trigger modal from static buttons
  useEffect(() => {
    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the subject line based on framework
    const subject = encodeURIComponent(`${service} Inquiry — ${name}`);
    
    // Category-based email template body
    const bodyText = `Service Category: ${service}
Name: ${name}
Email: ${email}
Phone: ${phone || "Not Provided"}

Inquiry Details:
${message}

---
Sent via Travel & Relocation Support Portal`;

    const body = encodeURIComponent(bodyText);

    // Redirect to pre-filled mailto link
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");

    // Success transition
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 2000);
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

      {/* Consultation Glassmorphic Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-[#0A0F1C]/90 rounded-3xl border border-[#D4AF37]/30 p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] backdrop-blur-2xl overflow-hidden"
            >
              {/* Decorative Blur Backgrounds */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="consultation-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold mb-3 uppercase tracking-wider">
                        <Shield className="w-3.5 h-3.5" /> Premium Consultation
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Request Information</h3>
                      <p className="text-white/60 text-sm">
                        Fill in this form and we'll automatically format your professional email inquiry.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="Your full name"
                        />
                      </div>

                      {/* Email and Phone grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37] transition-colors"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      {/* Service Category */}
                      <div>
                        <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                          Inquiry Category
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Study Visa Guidance">Study Visa Guidance</option>
                          <option value="Work Permit Consultation">Work Permit Consultation</option>
                          <option value="Air Freight Cargo">Air Freight Cargo</option>
                          <option value="Sea Freight Cargo">Sea Freight Cargo</option>
                          <option value="Car Shipping & Transport">Car Shipping & Transport</option>
                          <option value="Electronics & Tech Shipping">Electronics & Tech Shipping</option>
                          <option value="Customs Brokerage & Clearance">Customs Brokerage & Clearance</option>
                          <option value="Shop For Me Concierge">Shop For Me Concierge</option>
                          <option value="Global Relocation & Travel">Global Relocation & Travel</option>
                        </select>
                      </div>

                      {/* Message details */}
                      <div>
                        <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                          Inquiry Details *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37] transition-colors resize-none"
                          placeholder="Please provide details about your request, origins/destinations, budget, or timelines..."
                        />
                      </div>

                      {/* Form Submit */}
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F3C332] text-[#0A0F1C] font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] text-sm flex items-center justify-center gap-2 mt-4"
                      >
                        <Mail className="w-4 h-4" /> Send Email Inquiry
                      </button>

                      {/* Availability Metadata inside modal */}
                      <div className="pt-4 border-t border-white/5 flex justify-between text-[11px] text-white/40 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Response: &lt; 24 Hours
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-blue-400" /> Multi-lingual Support
                        </span>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400 mb-6 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Redirecting to Mail Client</h3>
                    <p className="text-white/60 text-sm max-w-sm">
                      Your professional email template has been generated. Send it to submit your consultation request!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
