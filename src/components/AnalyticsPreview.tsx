"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Smartphone, Globe } from "lucide-react";

export function AnalyticsPreview() {
  const stats = [
    { label: "Total Views", value: "24.5K", icon: <Users size={16} />, trend: "+12%" },
    { label: "Card Taps", value: "1,204", icon: <Smartphone size={16} />, trend: "+8%" },
    { label: "Link Clicks", value: "8,392", icon: <Globe size={16} />, trend: "+15%" },
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-6 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-1 rounded-[24px] bg-gradient-to-br from-white/10 to-transparent"
            >
              <div className="bg-[#0a0a0a] rounded-[20px] p-6 lg:p-10 border border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-medium text-white">Audience Overview</h3>
                  <div className="text-sm text-gray-500 bg-white/5 px-3 py-1 rounded-full">Last 30 Days</div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        {stat.icon}
                        <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                      </div>
                      <div className="flex items-end gap-3">
                        <span className="text-2xl font-bold text-white font-heading">{stat.value}</span>
                        <span className="text-xs text-green-500 mb-1 flex items-center gap-0.5"><TrendingUp size={12} /> {stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mock Chart */}
                <div className="h-48 w-full flex items-end gap-2 border-b border-l border-white/10 p-2">
                  {[40, 60, 45, 80, 55, 90, 70, 100, 85, 110].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (i * 0.05), type: "spring", stiffness: 50 }}
                      className="flex-1 bg-gradient-to-t from-[#FF1A1A]/20 to-[#FF1A1A] rounded-t-sm opacity-80"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading text-white font-medium mb-6"
            >
              Know exactly <br />who’s connecting.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg font-light mb-8"
            >
              Real-time analytics for your digital identity. Track card taps, link clicks, and audience geography in a beautiful, intuitive dashboard.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-gray-300"
            >
              {[
                "Device and location tracking",
                "Conversion rate optimization",
                "Lead capture statistics",
                "Exportable reports for teams"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
