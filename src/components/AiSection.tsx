"use client";

import { motion } from "framer-motion";
import { Sparkles, Bot, FileText, Briefcase, PenTool } from "lucide-react";

export function AiSection() {
  const features = [
    { title: "AI Resume Builder", icon: <FileText size={20} /> },
    { title: "AI Portfolio Builder", icon: <PenTool size={20} /> },
    { title: "AI Bio Generator", icon: <Sparkles size={20} /> },
    { title: "AI Cover Letter Generator", icon: <Bot size={20} /> },
  ];

  return (
    <section className="py-32 bg-[#020202] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF1A1A]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF1A1A]/30 bg-[#FF1A1A]/10 text-[#FF1A1A] text-sm font-medium mb-6"
          >
            <Sparkles size={16} /> All in Intelligence
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading text-white font-medium mb-6 leading-tight"
          >
            Meet Your AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Identity Assistant</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg font-light mb-10 max-w-md"
          >
            Building your professional profile used to take hours. Now it takes seconds. Let our AI craft the perfect bio, resume, and portfolio for you.
          </motion.p>
          
          <div className="flex flex-col gap-4">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <span className="text-white font-medium">{feature.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Graphic */}
        <div className="w-full lg:w-1/2 relative h-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-tr from-[#111] to-[#222] rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center"
          >
            {/* Futuristic chat interface representation */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://transparenttextures.com/patterns/cubes.png')]" />
            
            <div className="relative z-10 w-3/4 flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="self-end p-4 rounded-2xl rounded-tr-sm bg-[#222] border border-white/5 max-w-[80%] text-sm text-gray-300 shadow-xl"
              >
                Create a professional bio for a Senior Product Designer.
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="self-start p-4 rounded-2xl rounded-tl-sm bg-[#FF1A1A]/10 border border-[#FF1A1A]/20 max-w-[90%] text-sm text-white shadow-xl flex gap-3"
              >
                <Bot className="shrink-0 text-[#FF1A1A] mt-0.5" size={18} />
                <div>
                  <div className="h-2 w-32 bg-white/20 rounded animate-pulse mb-2" />
                  <div className="h-2 w-48 bg-white/20 rounded animate-pulse mb-2" />
                  <div className="h-2 w-40 bg-white/20 rounded animate-pulse" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
