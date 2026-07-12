"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background gradients/glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10 max-w-7xl">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9] text-white mb-8"
          >
            Everything<br />
            About You.<br />
            <span className="italic text-white/90">One</span>
            <span className="italic text-[#E53935]">Tap.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-md font-light leading-relaxed"
          >
            Share your complete professional identity instantly.
            No paper. No searching. Just one tap.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/get-started"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black text-lg font-semibold hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)] flex justify-center items-center"
            >
              Get Your Card
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-black border border-white/20 text-white text-lg font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              <Play size={18} className="fill-white" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Right Content - 3D Card / Phone */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative h-[500px] lg:h-[700px] perspective-1000">
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, rotateY: 30, rotateX: 20, z: -100 }}
            animate={{ opacity: 1, rotateY: -15, rotateX: 10, z: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.05, rotateY: 0, rotateX: 0 }}
            className="relative w-[300px] h-[480px] lg:w-[360px] lg:h-[580px] rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 shadow-2xl overflow-hidden cursor-pointer flex items-center justify-center group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card texture/shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* NFC Icon / Logo representation */}
            <div className="relative opacity-70 group-hover:opacity-100 transition-opacity duration-500 scale-150">
              <Logo />
            </div>

            {/* Tap indicator */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#FF1A1A] animate-pulse" />
                </div>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Tap</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
