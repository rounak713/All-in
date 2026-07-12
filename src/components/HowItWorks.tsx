"use client";

import { motion } from "framer-motion";
import { CreditCard, Edit3, Smartphone } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Order your premium card.",
      description: "Select your finish. Matte Black, Brushed Steel, or 24k Gold plating.",
      icon: <CreditCard className="w-8 h-8 mb-6 text-white/50" />,
    },
    {
      id: "02",
      title: "Create your digital profile.",
      description: "Use our AI builder to generate a beautiful, dynamic profile in seconds.",
      icon: <Edit3 className="w-8 h-8 mb-6 text-white/50" />,
    },
    {
      id: "03",
      title: "Tap. Share. Connect.",
      description: "Tap your card on any modern smartphone. No app required.",
      icon: <Smartphone className="w-8 h-8 mb-6 text-white/50" />,
    },
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-heading text-white font-medium mb-6"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 max-w-xl mx-auto text-lg font-light"
          >
            Three simple steps to upgrade your professional networking forever.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center p-8 rounded-3xl bg-black border border-white/5 shadow-2xl hover:bg-white/[0.02] transition-colors"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[120px] font-bold text-white/[0.02] pointer-events-none select-none font-heading leading-none">
                {step.id}
              </div>
              {step.icon}
              <h3 className="text-xl text-white font-medium mb-4">{step.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
