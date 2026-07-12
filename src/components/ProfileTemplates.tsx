"use client";

import { motion } from "framer-motion";

export function ProfileTemplates() {
  const templates = [
    { name: "Student", desc: "Perfect for internships and college apps." },
    { name: "Developer", desc: "Showcase your GitHub and projects." },
    { name: "Creator", desc: "Highlight your YouTube and portfolio." },
    { name: "Business", desc: "Capture leads and book meetings." },
    { name: "Doctor", desc: "Share credentials and schedule patients." },
    { name: "Restaurant", desc: "Menu, location, and reservations." },
  ];

  return (
    <section className="py-32 bg-black border-y border-white/5 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-white font-medium mb-6"
          >
            Built for everyone.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-xl mx-auto text-lg font-light"
          >
            Professionally designed templates optimized for your specific industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {templates.map((template, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-1 rounded-[32px] bg-gradient-to-b from-white/10 to-transparent hover:from-[#FF1A1A]/30 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="bg-[#0a0a0a] rounded-[28px] h-64 p-8 flex flex-col justify-end relative overflow-hidden group-hover:bg-[#0f0f0f] transition-colors">
                {/* Abstract shape representing the template */}
                <div className="absolute top-8 right-8 w-24 h-24 rounded-full border border-white/10 opacity-50 group-hover:scale-110 group-hover:border-[#FF1A1A]/50 transition-all duration-500" />
                <div className="absolute top-16 right-16 w-12 h-12 bg-white/5 backdrop-blur-md rounded-lg group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500" />
                
                <h3 className="text-2xl font-medium text-white mb-2 relative z-10">{template.name}</h3>
                <p className="text-gray-500 font-light text-sm relative z-10">{template.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
