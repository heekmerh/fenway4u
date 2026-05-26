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
    { name: "Services", href: "#services" },
    { name: "Destinations", href: "#destinations" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Quote", href: "#quote" },
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
          <span className="text-xl font-bold tracking-wider text-white">INTMOVE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#0B132B] font-semibold hover:bg-[#F3C332] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
          >
            Get Consultation
          </Link>
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
              className="text-lg font-medium text-white/90 hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="w-full text-center px-6 py-3 mt-4 rounded-lg bg-[#D4AF37] text-[#0B132B] font-bold"
            onClick={() => setIsOpen(false)}
          >
            Get Consultation
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
