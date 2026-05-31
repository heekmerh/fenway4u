"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Home, Car, Smartphone, Plane, Ship, ShieldAlert, ShoppingBag, ArrowRight, Warehouse } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: GraduationCap, title: "Study Visa Assistance", desc: "Expert guidance for international students.", href: "/study-visa" },
  { icon: Briefcase, title: "Work Permit Guidance", desc: "Seamless corporate and individual work visas.", href: "/work-permit" },
  { icon: Home, title: "Relocation and Visit Visa Support", desc: "End-to-end family and business relocation.", href: "/relocation-support" },
  { icon: Car, title: "Car Purchase & Shipping", desc: "Secure international vehicle transport.", href: "/car-shipping" },
  { icon: Smartphone, title: "Electronics Purchase & Shipping", desc: "Safe handling of delicate electronics.", href: "/electronics-shipping" },
  { icon: Plane, title: "Air Freight", desc: "Fastest delivery for urgent cargo.", href: "/air-freight" },
  { icon: Ship, title: "Sea Freight", desc: "Cost-effective bulk shipping solutions.", href: "/sea-freight" },
  { icon: ShieldAlert, title: "Customs Clearance", desc: "Hassle-free customs brokerage.", href: "/customs-clearance" },
  { icon: ShoppingBag, title: "Shop For Me Service", desc: "We buy and ship products for you globally.", href: "/shop-for-me" },
  { icon: Warehouse, title: "International & Local Storage", desc: "Secure package holding & consolidation hubs.", href: "/storage" },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-[#0B132B] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Our <span className="text-[#D4AF37]">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg"
          >
            Comprehensive solutions tailored for your global mobility and logistics needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer border border-white/5 hover:border-[#D4AF37]/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#D4AF37]/20 transition-colors" />
              
              <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-[#D4AF37]" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/60 mb-6 line-clamp-2">{service.desc}</p>
              
              <Link href={service.href} className="inline-flex items-center text-sm font-bold text-[#D4AF37] group-hover:text-[#F3C332]">
                Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
