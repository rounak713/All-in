"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For individuals starting their digital identity.",
      features: ["Digital Profile", "Standard Analytics", "1 Theme", "QR Code"],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/mo",
      description: "For professionals needing premium features.",
      features: ["Free NFC Metal Card", "Custom Domain", "AI Assistant", "Advanced Analytics", "Lead Collection", "All Themes"],
      highlighted: true,
    },
    {
      name: "Business",
      price: "$49",
      period: "/mo",
      description: "For small teams and growing businesses.",
      features: ["Up to 5 Team Members", "CRM Integration", "Payment Links", "Appointment Booking", "Team Analytics"],
      highlighted: false,
    }
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-white font-medium mb-6"
          >
            Simple, transparent pricing.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-xl mx-auto text-lg font-light"
          >
            Start for free, upgrade when you need more power.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-1 rounded-[32px] ${plan.highlighted ? 'bg-gradient-to-b from-[#FF1A1A] to-black shadow-[0_0_50px_rgba(255,26,26,0.1)]' : 'bg-white/5'}`}
            >
              <div className={`h-full rounded-[28px] p-8 ${plan.highlighted ? 'bg-[#0a0a0a]' : 'bg-transparent'}`}>
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF1A1A] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-medium text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-heading text-white font-medium">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                
                <Link href="/get-started" className={`w-full block text-center py-4 rounded-xl font-medium mb-8 transition-colors ${plan.highlighted ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Get Started
                </Link>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check size={16} className={plan.highlighted ? 'text-[#FF1A1A]' : 'text-gray-500'} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
