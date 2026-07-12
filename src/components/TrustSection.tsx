"use client";

import { motion } from "framer-motion";

export function TrustSection() {
  const trustedBy = [
    "Students",
    "Developers",
    "Creators",
    "Businesses",
    "Startups",
    "Doctors",
    "Recruiters",
  ];

  return (
    <section className="py-24 bg-black border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase mb-12"
        >
          Trusted by professionals worldwide
        </motion.p>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee flex items-center gap-12 sm:gap-24 whitespace-nowrap">
            {/* Double the list for infinite scroll illusion */}
            {[...trustedBy, ...trustedBy].map((item, i) => (
              <span
                key={i}
                className="text-2xl sm:text-3xl md:text-4xl font-heading text-white/40 hover:text-white transition-colors duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
