"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, UsersRound, Settings } from "lucide-react";
import Link from "next/link";

export function EnterpriseSection() {
  const features = [
    { title: "Bulk Provisioning", desc: "Order and assign cards for 10 or 10,000 employees instantly.", icon: <UsersRound size={20} /> },
    { title: "SSO & Security", desc: "SAML, OAuth, and advanced role-based access control.", icon: <ShieldCheck size={20} /> },
    { title: "Global Templates", desc: "Enforce brand consistency across all company profiles.", icon: <Building2 size={20} /> },
    { title: "API & CRM Sync", desc: "Automatically route leads to Salesforce, Hubspot, and more.", icon: <Settings size={20} /> },
  ];

  return (
    <section className="py-32 bg-black border-y border-white/5 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-medium mb-6"
            >
              <Building2 size={16} /> For Teams & Enterprise
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading text-white font-medium mb-6"
            >
              Scale your brand.<br />Control your identity.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg font-light mb-10"
            >
              The ultimate platform for managing digital business cards at scale. Equip your entire workforce while maintaining absolute control over branding, leads, and security.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
               <Link
                href="/enterprise"
                className="inline-flex px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
