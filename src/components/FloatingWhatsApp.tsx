"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function FloatingWhatsApp() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="https://wa.me/1234567890" // Replace with real number
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]"
      >
        <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-75"></span>
        <MessageCircle className="w-8 h-8 relative z-10" />
      </Link>
    </motion.div>
  );
}
