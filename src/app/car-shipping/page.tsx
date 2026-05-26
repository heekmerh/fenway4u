"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Car, Ship, ShieldCheck, FileCheck, Search, Wrench, 
  Clock, ArrowRight, Gavel, Tag, X, ExternalLink, Globe, PhoneCall,
  ChevronLeft, ChevronRight
} from "lucide-react";

// --- Custom Hooks ---
function useCountdown(initialSeconds: number) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// --- Data Structures ---

const services = [
  {
    title: "Door-to-Door Shipping",
    desc: "We handle pickup, international shipping, and final delivery globally.",
    icon: Ship,
  },
  {
    title: "Auction Car Assistance",
    desc: "We help you buy vehicles from Copart, IAAI, Manheim, and local auctions.",
    icon: Gavel,
  },
  {
    title: "Vehicle Inspection",
    desc: "Reduce risk with condition reports, VIN checks, and damage assessments.",
    icon: ShieldCheck,
  },
  {
    title: "Customs Clearance",
    desc: "We handle all import documentation, duties & taxes, and compliance paperwork.",
    icon: FileCheck,
  },
  {
    title: "We Buy For You",
    desc: "Tell us your budget. We find the car, bid for you, and ship it to your destination.",
    icon: Search,
  }
];

const mockListings = [
  {
    id: 1,
    type: "auction",
    make: "Range Rover",
    model: "Velar R-Dynamic",
    year: "2021",
    mileage: "24k mi",
    source: "Copart UK",
    condition: "Minor Dent/Scratches",
    extraInfo: ["Clean Title", "Runs & Drives"],
    price: "Current Bid: £22,500",
    timerSeconds: 8073, // approx 2h 14m
    images: ["/images/car_auction_1_1778971403142.png", "/images/car_auction_1_interior_1779125056157.png"],
    tag: "Ending Soon"
  },
  {
    id: 2,
    type: "buynow",
    make: "Tesla",
    model: "Model S Plaid",
    year: "2023",
    mileage: "5k mi",
    source: "Premium Dealership US",
    condition: "Pristine / Like New",
    extraInfo: ["Clean Title", "Autopilot Included"],
    price: "$85,000 USD",
    shipping: "Est. Shipping: $1,800",
    images: ["/images/car_buynow_1_1778971415490.png", "/images/car_buynow_1_interior_1779125069875.png"],
    tag: "Ready to Ship"
  },
  {
    id: 3,
    type: "buynow",
    make: "Porsche",
    model: "911 Carrera S",
    year: "2022",
    mileage: "12k mi",
    source: "Private Seller UK",
    condition: "Excellent",
    extraInfo: ["Full Service History", "Sport Chrono"],
    price: "£92,000",
    shipping: "Est. Shipping: £1,500",
    images: ["/images/car_buynow_2_1778971428095.png", "/images/car_buynow_2_interior_1779125084558.png"],
    tag: "Verified"
  }
];

// --- Components ---

function AuctionCard({ car, onAction }: { car: any, onAction: (car: any) => void }) {
  const timeLeft = useCountdown(car.timerSeconds);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };
  
  return (
    <div className="bg-[#111] rounded-2xl overflow-hidden border border-red-500/20 hover:border-red-500/50 transition-all group shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col h-full">
      <div className="relative h-64 overflow-hidden group/carousel">
        <Image src={car.images[currentImageIndex]} alt={`${car.make} ${car.model}`} fill className="object-cover transition-all duration-500" />
        
        {car.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {car.images.map((_: any, idx: number) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live Auction
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-white">{car.year} {car.make}</h3>
          <span className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded border border-white/10">{car.tag}</span>
        </div>
        <p className="text-lg text-white/80 mb-4">{car.model}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div><p className="text-white/40">Mileage</p><p className="text-white font-medium">{car.mileage}</p></div>
          <div><p className="text-white/40">Condition</p><p className="text-white font-medium truncate">{car.condition}</p></div>
          <div className="col-span-2"><p className="text-white/40">Source</p><p className="text-white font-medium">{car.source}</p></div>
        </div>

        {car.extraInfo && (
          <div className="flex flex-wrap gap-2 mb-6">
            {car.extraInfo.map((info: string, idx: number) => (
              <span key={idx} className="bg-white/5 text-white/60 text-xs px-2 py-1 rounded-md border border-white/10">{info}</span>
            ))}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-white/40 text-sm">Current Bid</p>
              <p className="text-2xl font-bold text-red-500">{car.price.split(': ')[1]}</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-sm mb-1 flex items-center gap-1 justify-end"><Clock className="w-3 h-3" /> Ends In</p>
              <p className="text-xl font-mono font-bold text-white tracking-wider">{timeLeft}</p>
            </div>
          </div>
          <button onClick={() => onAction(car)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors">
            Place Offer
          </button>
        </div>
      </div>
    </div>
  );
}

function BuyNowCard({ car, onAction }: { car: any, onAction: (car: any) => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#111] rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all group shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col h-full">
      <div className="relative h-64 overflow-hidden group/carousel">
        <Image src={car.images[currentImageIndex]} alt={`${car.make} ${car.model}`} fill className="object-cover transition-all duration-500" />
        
        {car.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {car.images.map((_: any, idx: number) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Available Now
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-white">{car.year} {car.make}</h3>
          <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs px-2 py-1 rounded border border-[#D4AF37]/20">{car.tag}</span>
        </div>
        <p className="text-lg text-white/80 mb-4">{car.model}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div><p className="text-white/40">Mileage</p><p className="text-white font-medium">{car.mileage}</p></div>
          <div><p className="text-white/40">Condition</p><p className="text-white font-medium truncate">{car.condition}</p></div>
          <div className="col-span-2"><p className="text-white/40">Source</p><p className="text-white font-medium">{car.source}</p></div>
        </div>

        {car.extraInfo && (
          <div className="flex flex-wrap gap-2 mb-6">
            {car.extraInfo.map((info: string, idx: number) => (
              <span key={idx} className="bg-white/5 text-white/60 text-xs px-2 py-1 rounded-md border border-white/10">{info}</span>
            ))}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-white/40 text-sm">Fixed Price</p>
              <p className="text-2xl font-bold text-[#D4AF37]">{car.price}</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-sm">Shipping</p>
              <p className="text-white font-medium">{car.shipping.split(': ')[1]}</p>
            </div>
          </div>
          <button onClick={() => onAction(car)} className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold py-3 rounded-xl transition-colors">
            Buy & Ship
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CarShippingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);

  const openModal = (car?: any) => {
    setSelectedCar(car || null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements[0] as HTMLInputElement).value;
    const email = (form.elements[1] as HTMLInputElement).value;
    const phone = (form.elements[2] as HTMLInputElement).value;
    
    let bidLimit = "";
    let message = "";
    if (selectedCar?.type === "auction") {
      bidLimit = (form.elements[3] as HTMLInputElement).value;
      message = (form.elements[4] as HTMLTextAreaElement).value;
    } else {
      message = (form.elements[3] as HTMLTextAreaElement).value;
    }

    const subject = encodeURIComponent(
      selectedCar 
        ? `${selectedCar.type === "auction" ? "Place Bid Offer" : "Secure Vehicle Request"} — ${selectedCar.year} ${selectedCar.make} ${selectedCar.model}` 
        : "Car Sourcing Request — INTMOVE"
    );

    const bodyText = `Car Sourcing & Shipping Inquiry

Details:
- Customer Name: ${name}
- Email: ${email}
- Phone: ${phone}
${selectedCar ? `- Vehicle: ${selectedCar.year} ${selectedCar.make} ${selectedCar.model}\n- Source: ${selectedCar.source}\n- Price/Bid: ${selectedCar.price}\n` : ""}
${bidLimit ? `- Max Bid Limit: ${bidLimit}\n` : ""}
- Message:
${message}

Thank you.`;

    const body = encodeURIComponent(bodyText);
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
    setIsModalOpen(false);
  };

  const handlePartSourcingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const make = (form.elements[0] as HTMLInputElement).value;
    const modelYear = (form.elements[1] as HTMLInputElement).value;
    const part = (form.elements[2] as HTMLInputElement).value;
    const destination = (form.elements[3] as HTMLInputElement).value;
    const info = (form.elements[4] as HTMLTextAreaElement).value;

    const subject = encodeURIComponent(`Car Part Sourcing Request — ${make} ${modelYear}`);
    const bodyText = `Car Part Sourcing & Shipping Request

Details:
- Vehicle Make: ${make}
- Model & Year: ${modelYear}
- Part Required: ${part}
- Shipping Destination: ${destination}
- Additional Information:
${info}

Thank you.`;

    const body = encodeURIComponent(bodyText);
    window.open(`mailto:consult@fenway4u.com?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="bg-[#050505] min-h-screen font-sans text-white pb-20 selection:bg-[#D4AF37] selection:text-[#050505]">
      
      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg p-8 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-bold mb-2">
                {selectedCar ? (selectedCar.type === 'auction' ? 'Place an Offer' : 'Secure this Vehicle') : 'General Inquiry'}
              </h3>
              {selectedCar && (
                <p className="text-white/50 mb-6 text-sm">
                  {selectedCar.year} {selectedCar.make} {selectedCar.model}
                </p>
              )}
              {!selectedCar && (
                <p className="text-white/50 mb-6 text-sm">Please fill out the form below and our sourcing team will contact you shortly.</p>
              )}

              <form className="space-y-4" onSubmit={handleModalSubmit}>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Full Name</label>
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-colors" placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                    <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Phone</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-colors" placeholder="+1..." />
                  </div>
                </div>
                {selectedCar?.type === 'auction' && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Your Max Bid Limit</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-colors" placeholder="e.g. £25,000" />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Message / Questions</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-colors resize-none" placeholder="I am interested in..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3C332] text-black font-bold py-4 rounded-xl mt-4 transition-all text-lg shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  Submit Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero_car_shipping_1778971391359.png" 
            alt="Luxury cars on container ship" 
            fill 
            className="object-cover opacity-30 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-semibold mb-6 tracking-wide"
            >
              <Globe className="w-4 h-4 text-[#D4AF37]" /> Global Vehicle Logistics
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white"
            >
              International Car Shipping <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3C332]">Made Simple</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed font-light"
            >
              We help you buy, ship, and deliver vehicles from the USA and Canada — including auction cars and dealership purchases.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#marketplace" className="bg-[#D4AF37] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#F3C332] transition-all flex items-center justify-center gap-2 text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Browse Cars
              </Link>
              <button onClick={() => openModal()} className="bg-white/10 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/20 border border-white/10 transition-all flex items-center justify-center gap-2 text-lg backdrop-blur-sm">
                Request Sourcing
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: What We Offer */}
      <section className="py-24 px-6 relative bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Offer</h2>
            <p className="text-white/50 text-lg">Complete end-to-end vehicle sourcing and shipping solutions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-[#D4AF37]/30 transition-all group"
              >
                <div className="w-14 h-14 bg-[#1A1A1A] rounded-xl flex items-center justify-center mb-6 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Live Car Listings (MVP Marketplace) */}
      <section id="marketplace" className="py-24 px-6 relative bg-gradient-to-b from-[#050505] to-[#111] border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Live Vehicle Listings</h2>
              <p className="text-white/50 text-lg">Curated auction opportunities and ready-to-ship vehicles.</p>
            </div>
            
            <div className="flex gap-4">
              <span className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg font-bold border border-red-500/20 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Auctions
              </span>
              <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-lg font-bold border border-[#D4AF37]/20 text-sm">
                Buy Now
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockListings.map(car => (
              <motion.div key={car.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                {car.type === 'auction' ? (
                  <AuctionCard car={car} onAction={openModal} />
                ) : (
                  <BuyNowCard car={car} onAction={openModal} />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Section 4: Copart Integration MVP CTA */}
          <div className="mt-16 bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Can't find what you're looking for?</h3>
                <p className="text-white/60">Browse thousands of live auctions directly on Copart. Find a car, send us the lot number, and we'll handle the rest.</p>
              </div>
            </div>
            <a href="https://www.copart.com" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-white/5 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl border border-white/10 hover:border-transparent transition-all flex items-center gap-2">
              Browse Copart Auctions <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Section 3: Car Parts Sourcing */}
      <section className="py-24 px-6 relative bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#111] rounded-3xl p-8 md:p-16 border border-white/5 flex flex-col lg:flex-row gap-16 items-center shadow-2xl relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-full lg:w-1/2 relative z-10">
              <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center mb-8 text-[#D4AF37] border border-[#D4AF37]/20">
                <Wrench className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Parts for Your Car?</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Can't find a specific part locally? We source engines, body parts, electronics, and interior components from the UK, US, and Canada, and ship them directly to you.
              </p>
              <ul className="space-y-4 mb-8">
                {['Engine & Transmission', 'Body & Exterior Parts', 'Electronics & Modules', 'Tires & Wheels'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="w-full lg:w-1/2 relative z-10">
              <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5 shadow-xl">
                <h3 className="text-xl font-bold mb-6">Request Part Sourcing</h3>
                <form className="space-y-4" onSubmit={handlePartSourcingSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/50 mb-1">Car Make</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37]" placeholder="e.g. Mercedes" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/50 mb-1">Car Model & Year</label>
                      <input type="text" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37]" placeholder="e.g. C300 2018" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-1">Part Needed</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37]" placeholder="e.g. Front Bumper Assembly" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-1">Shipping Destination</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37]" placeholder="e.g. Lagos, Nigeria" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-1">Additional Information (Optional)</label>
                    <textarea rows={2} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] resize-none" placeholder="Enter VIN number, specific part numbers, or color preference..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl mt-2 hover:bg-gray-200 transition-colors">
                    Get a Quote
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-12 border-y border-white/5 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-3 font-bold uppercase tracking-widest"><ShieldCheck className="w-6 h-6 text-[#D4AF37]" /> Verified Sourcing</div>
            <div className="flex items-center gap-3 font-bold uppercase tracking-widest"><Globe className="w-6 h-6 text-[#D4AF37]" /> Global Network</div>
            <div className="flex items-center gap-3 font-bold uppercase tracking-widest"><Gavel className="w-6 h-6 text-[#D4AF37]" /> Auction Experts</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#111] to-[#0A0A0A] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-[#D4AF37]/20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent opacity-50" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10 text-white">Find, Buy, and Ship Your <br /><span className="text-[#D4AF37]">Dream Car Globally</span></h2>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10 mt-10">
              <button onClick={() => openModal()} className="bg-[#D4AF37] text-black font-bold px-10 py-5 rounded-xl hover:bg-[#F3C332] transition-all text-lg shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                Request Sourcing
              </button>
              <a href="https://t.me/fenway4u_logistics" target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-[#0088cc] to-[#24A1DE] hover:from-[#24A1DE] hover:to-[#0088cc] text-white font-medium px-10 py-5 rounded-xl transition-all text-lg shadow-[0_0_20px_rgba(0,136,204,0.3)] flex items-center justify-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.51-.46-.01-1.33-.26-1.98-.47-.8-.26-1.42-.4-1.36-.85.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.11.17.26.19.37.01.07.03.22.02.39z"/>
                </svg>
                Telegram Auto Shipping
              </a>
              <Link href="/#quote" className="bg-white/5 text-white font-medium px-10 py-5 rounded-xl hover:bg-white/10 border border-white/10 transition-all text-lg backdrop-blur-sm">
                Get Shipping Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
