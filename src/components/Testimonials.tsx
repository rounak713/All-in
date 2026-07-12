"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CEO at StartupX",
      text: "All in completely changed how we network. Our sales team closes more deals simply because they leave a memorable, premium impression.",
    },
    {
      name: "David Chen",
      role: "Freelance Designer",
      text: "I used to carry paper cards that got thrown away. Now, one tap and they have my portfolio, resume, and contact info saved on their phone.",
    },
    {
      name: "Elena Rodriguez",
      role: "Real Estate Agent",
      text: "The analytics are game-changing. I know exactly when a client views my listings from the card tap. It's brilliant.",
    },
    {
      name: "Michael Chang",
      role: "Event Organizer",
      text: "We deployed All in cards for our entire 200-person staff. The enterprise management dashboard made it effortless.",
    },
  ];

  return (
    <section className="py-32 bg-[#020202] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-white font-medium mb-6"
          >
            Loved by leaders.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-[#FF1A1A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
                  "{t.text}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-white overflow-hidden">
                   {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
