"use client";

import { motion } from "framer-motion";
import { 
  Wand2, 
  BarChart3, 
  Briefcase, 
  Globe, 
  Palette, 
  Users, 
  CalendarCheck, 
  CreditCard 
} from "lucide-react";

export function FeaturesGrid() {
  const features = [
    { title: "AI Builder", desc: "Generate your profile instantly with AI.", icon: <Wand2 size={24} /> },
    { title: "Rich Analytics", desc: "Track visitors, taps, and engagement.", icon: <BarChart3 size={24} /> },
    { title: "Business CRM", desc: "Manage leads and contacts seamlessly.", icon: <Briefcase size={24} /> },
    { title: "Custom Domain", desc: "Connect your own premium domain.", icon: <Globe size={24} /> },
    { title: "Beautiful Themes", desc: "Multiple Apple-quality dark mode themes.", icon: <Palette size={24} /> },
    { title: "Team Dashboard", desc: "Manage cards for your entire company.", icon: <Users size={24} /> },
    { title: "Book Meetings", desc: "Let clients schedule time with you.", icon: <CalendarCheck size={24} /> },
    { title: "Payment Links", desc: "Accept payments directly on your profile.", icon: <CreditCard size={24} /> },
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        <div className="text-left mb-16 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-white font-medium mb-6"
          >
            A powerhouse of features.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg font-light"
          >
            Everything you need to showcase your work, collect leads, and grow your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:bg-[#111] transition-colors group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:bg-[#FF1A1A] group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-gray-500 font-light text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
