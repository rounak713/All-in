"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, User, Camera, Mail, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Logo } from "./Logo";

export function LiveDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-white font-medium mb-6">
            Experience the Magic
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
            Tap the card below to see how your digital identity will appear on a client's phone.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32">
          
          {/* Card Trigger */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            onClick={() => setIsOpen(true)}
            className="relative w-[280px] h-[440px] rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-center group"
          >
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             <div className="relative opacity-70 group-hover:opacity-100 transition-opacity duration-300 mb-8 scale-150">
                <Logo />
             </div>
             
             <div className="flex flex-col items-center gap-3">
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                 <div className="w-4 h-4 rounded-full bg-[#FF1A1A] animate-pulse" />
               </div>
               <span className="text-sm font-medium text-white tracking-widest uppercase">Tap to View</span>
             </div>
          </motion.div>

          {/* Phone Mockup */}
          <div className="relative w-[320px] h-[650px] bg-black rounded-[48px] border-[8px] border-[#1f1f1f] shadow-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-[#1f1f1f] rounded-b-3xl z-30" />
            
            <AnimatePresence>
              {!isOpen ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]"
                >
                  <p className="text-gray-500 text-sm">Waiting for NFC tap...</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-white text-black overflow-y-auto overflow-x-hidden scrollbar-hide"
                >
                  <div className="relative h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
                     <div className="opacity-20 filter grayscale blur-sm scale-150">
                       <Logo />
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  </div>
                  
                  <div className="px-6 relative -mt-16 pb-12">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-28 h-28 rounded-full border-4 border-white bg-black flex items-center justify-center overflow-hidden mb-4 shadow-lg text-white"
                    >
                      <Logo className="scale-75" />
                    </motion.div>
                    
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold mb-1 font-heading"
                    >
                      Alex Morrison
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-500 text-sm mb-6"
                    >
                      Senior Product Designer at TechCorp
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-3 mb-8"
                    >
                      <button className="flex-1 bg-black text-white py-3 rounded-xl font-medium text-sm flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors">
                        Save Contact
                      </button>
                      <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                         <Mail size={18} />
                      </button>
                    </motion.div>
                    
                    {/* Sections */}
                    <div className="space-y-6">
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Links</h4>
                        <div className="space-y-3">
                          {[
                            { icon: <User size={18} />, label: "LinkedIn", color: "bg-blue-50 text-blue-600" },
                            { icon: <Code size={18} />, label: "GitHub", color: "bg-gray-100 text-gray-900" },
                            { icon: <Camera size={18} />, label: "Instagram", color: "bg-pink-50 text-pink-600" }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                                  {item.icon}
                                </div>
                                <span className="font-medium text-sm">{item.label}</span>
                              </div>
                              <ExternalLink size={16} className="text-gray-400" />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                      
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Book a Meeting</h4>
                        <div className="p-4 rounded-2xl bg-black text-white flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                               <Calendar size={18} />
                             </div>
                             <div>
                               <p className="font-medium text-sm">30 Min Intro Call</p>
                               <p className="text-xs text-white/60">Zoom or Google Meet</p>
                             </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
