import Link from "next/link";
import { Plane, Globe, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B132B] pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Plane className="w-8 h-8 text-[#D4AF37]" />
              <span className="text-xl font-bold tracking-wider text-white">FENWAY4U</span>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm">
              Premium international relocation, global shipping, and logistics solutions. Seamlessly moving your life and business across borders.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all">
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'Destinations', 'How It Works', 'Get a Quote', 'Track Shipment'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-4">
              {['Immigration Support', 'Vehicle Shipping', 'Electronics Logistics', 'Shop & Ship', 'Air Freight', 'Sea Freight'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>123 Global Hub Blvd, Suite 400<br/>Toronto, ON, Canada</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>support@fenway4u.com</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <p className="text-sm font-medium text-white mb-3">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 border border-white/10 rounded-l-md px-4 py-2 text-sm text-white outline-none focus:border-[#D4AF37]/50 w-full transition-colors"
                />
                <button className="bg-[#D4AF37] hover:bg-[#F3C332] text-[#0B132B] px-4 py-2 rounded-r-md font-semibold transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} FENWAY4U. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
