"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does international car shipping take?",
    answer: "Typically, sea freight takes 3-6 weeks depending on the origin and destination ports. Air freight for vehicles is much faster, usually taking 5-10 days, though it is more expensive.",
  },
  {
    question: "Do you help with student and work visas?",
    answer: "Yes, our immigration experts provide comprehensive assistance for study visas, work permits, and permanent residency applications for Canada, the UK, and the US.",
  },
  {
    question: "How does the 'Shop For Me' service work?",
    answer: "You tell us what you want to buy (or send us links), we purchase it on your behalf using our local presence, consolidate the items, and ship them securely to your home country.",
  },
  {
    question: "Is my shipment insured against damage or loss?",
    answer: "Absolutely. All our international shipments come with comprehensive marine and transit insurance to ensure your peace of mind from pickup to delivery.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0B132B] mb-6"
          >
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "bg-white rounded-2xl border overflow-hidden transition-all duration-300",
                  isOpen ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10" : "border-gray-200 hover:border-gray-300"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-[#0B132B] pr-8">{faq.question}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isOpen ? "bg-[#D4AF37] text-white" : "bg-gray-100 text-gray-500"
                  )}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
