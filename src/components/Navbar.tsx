"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Destinations", href: "/#destinations" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Quote", href: "/#quote" },
    { name: "B2B Solutions", href: "/b2b", highlight: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "glass-dark py-4 border-white/10 shadow-lg shadow-black/20" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center max-w-7xl">
        <Link href="/" className="flex items-center gap-2 group">
          <Plane className="w-8 h-8 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-bold tracking-wider text-white">FENWAY4U</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 flex items-center gap-1.5",
                link.highlight 
                  ? "text-[#D4AF37] hover:text-yellow-300 font-bold bg-[#D4AF37]/5 px-3.5 py-1 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 shadow-[0_0_10px_rgba(212,175,55,0.05)]" 
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.name}
              {link.highlight && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]"></span>
                </span>
              )}
            </Link>
          ))}
          <button
            onClick={() => {
              const event = new CustomEvent("open-contact-modal");
              window.dispatchEvent(event);
            }}
            className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-extrabold text-xs tracking-wider uppercase hover:bg-[#F3C332] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] cursor-pointer"
          >
            Get Consultation
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 glass-dark border-t border-white/10 flex flex-col p-6 gap-4 md:hidden shadow-2xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-lg font-medium transition-colors flex items-center gap-2",
                link.highlight ? "text-[#D4AF37] font-bold" : "text-white/90 hover:text-[#D4AF37]"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
              {link.highlight && <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping" />}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              const event = new CustomEvent("open-contact-modal");
              window.dispatchEvent(event);
            }}
            className="w-full text-center px-6 py-3.5 mt-4 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs tracking-wider uppercase cursor-pointer"
          >
            Get Consultation
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
