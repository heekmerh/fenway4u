"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Package, Globe, Weight, Zap } from "lucide-react";

export function QuoteCalculator() {
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend mock calculation
    const mockPrice = Math.floor(Math.random() * 800) + 200;
    setEstimatedPrice(mockPrice);
  };

  return (
    <section id="quote" className="py-24 bg-[#0B132B] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-[#D4AF37] font-semibold text-sm">
                <Calculator className="w-4 h-4" />
                <span>Instant Estimate</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Get Your <span className="text-[#D4AF37]">Shipping Quote</span> Instantly
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Whether you're shipping a car, moving your entire home, or importing goods, our intelligent estimator gives you a transparent idea of the costs involved.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <h4 className="text-2xl font-bold text-white">99%</h4>
                  <p className="text-white/50 text-sm">Estimate Accuracy</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-2xl font-bold text-white">&lt; 1 min</h4>
                  <p className="text-white/50 text-sm">To Calculate</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Calculator UI */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl relative"
            >
              <form onSubmit={handleCalculate} className="space-y-6">
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Item Type</label>
                    <div className="relative">
                      <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select required defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] appearance-none">
                        <option value="" disabled>Select category...</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="electronics">Electronics</option>
                        <option value="furniture">Furniture</option>
                        <option value="documents">Documents</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Origin</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select required defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] appearance-none">
                          <option value="" disabled>From...</option>
                          <option value="ca">Canada</option>
                          <option value="uk">United Kingdom</option>
                          <option value="us">United States</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Destination</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select required defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] appearance-none">
                          <option value="" disabled>To...</option>
                          <option value="ng">Nigeria</option>
                          <option value="za">South Africa</option>
                          <option value="gh">Ghana</option>
                          <option value="ae">UAE</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                      <div className="relative">
                        <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="number" required placeholder="e.g. 10" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Speed</label>
                      <div className="relative">
                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-800 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] appearance-none">
                          <option value="standard">Standard (Sea Freight)</option>
                          <option value="express">Express (Air Freight)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#0B132B] hover:bg-[#1C1C1C] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Calculate Estimate
                </button>
                
              </form>

              {/* Result Area */}
              {estimatedPrice && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 p-6 rounded-xl bg-gradient-to-r from-[#0B132B] to-[#1C1C1C] text-white flex justify-between items-center"
                >
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Estimated Cost</p>
                    <p className="text-3xl font-bold text-[#D4AF37]">${estimatedPrice}</p>
                  </div>
                  <button className="px-6 py-2 bg-[#D4AF37] text-[#0B132B] font-bold rounded-lg hover:bg-[#F3C332] transition-colors text-sm">
                    Book Now
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
