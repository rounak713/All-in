"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Lock, 
  Package, 
  ShieldCheck, 
  Upload, 
  X, 
  Cpu, 
  RotateCw, 
  Phone, 
  ChevronDown
} from "lucide-react";
import { Logo } from "@/components/Logo";

// Definition of Product Types
interface ProductMaterial {
  id: "plastic" | "metal" | "wood";
  name: string;
  price: number;
  description: string;
  specs: string[];
  colors: { name: string; value: string; textClass: string }[];
}

const PRODUCTS: ProductMaterial[] = [
  {
    id: "plastic",
    name: "Classic Matte Plastic",
    price: 29,
    description: "Premium-grade matte finish plastic. Extremely durable, lightweight, and modern.",
    specs: [
      "Recycled PVC core with premium matte laminate",
      "Dimensions: 85.6mm × 54mm (CR80 standard size)",
      "High-performance NTAG215 NFC microchip",
      "Scratch-resistant coating"
    ],
    colors: [
      { name: "Midnight Black", value: "#121212", textClass: "text-white" },
      { name: "Crisp White", value: "#FAFAFA", textClass: "text-black" },
      { name: "Crimson Red", value: "#B01515", textClass: "text-white" }
    ]
  },
  {
    id: "metal",
    name: "Luxury Engraved Metal",
    price: 69,
    description: "Solid, heavy-gauge stainless steel. Beautifully laser-etched for an elite tactile feeling.",
    specs: [
      "304 Grade Stainless Steel (18g heavy weight)",
      "Dimensions: 85.6mm × 54mm (CR80 standard size)",
      "Integrated dual-frequency hybrid NFC chip",
      "Precision laser-engraved typography"
    ],
    colors: [
      { name: "Stealth Black", value: "stealth-black", textClass: "text-white" },
      { name: "Brushed Silver", value: "brushed-silver", textClass: "text-gray-800" },
      { name: "Champagne Gold", value: "champagne-gold", textClass: "text-[#4A3205]" }
    ]
  },
  {
    id: "wood",
    name: "Eco Organic Wood",
    price: 49,
    description: "Eco-friendly, sustainably sourced organic wood. Unique natural grains make every card one-of-a-kind.",
    specs: [
      "FSC-Certified organic wood fibers",
      "Dimensions: 85.6mm × 54mm (CR80 standard size)",
      "Bio-degradable polymer NFC containment layer",
      "Deep tactile laser-etched engraving"
    ],
    colors: [
      { name: "Sustainable Walnut", value: "walnut", textClass: "text-[#FFE6CC]" },
      { name: "Natural Bamboo", value: "bamboo", textClass: "text-[#2E1F03]" }
    ]
  }
];

export default function GetStarted() {
  // Configurator States
  const [selectedMaterial, setSelectedMaterial] = useState<"plastic" | "metal" | "wood">("metal");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [printName, setPrintName] = useState<string>("Alex Morrison");
  const [companyName, setCompanyName] = useState<string>("TechCorp");
  const [logoSource, setLogoSource] = useState<"default" | "custom" | "none">("default");
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  
  // 3D Card Hover States
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"design" | "specs">("design");
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number>(0);
  
  // Checkout States
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"shipping" | "payment" | "processing" | "success">( "shipping" );
  
  // Form input States
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States"
  });
  
  const [paymentForm, setPaymentForm] = useState({
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: ""
  });
  
  const [paymentError, setPaymentError] = useState("");
  const [shippingError, setShippingError] = useState("");
  
  const currentMaterialData = PRODUCTS.find(m => m.id === selectedMaterial)!;
  const currentColor = currentMaterialData.colors[selectedColorIndex] || currentMaterialData.colors[0];

  // Sync color index when material changes
  useEffect(() => {
    setSelectedColorIndex(0);
  }, [selectedMaterial]);

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedLogo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Card Interactive Tilt Calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt limit up to 15 degrees
    const rotateX = ((centerY - y) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * -15;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Format Card Number (adds space every 4 digits)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Format Expiry MM/YY
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  // Checkout validations
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.fullName || !shippingForm.email || !shippingForm.address || !shippingForm.city || !shippingForm.postalCode) {
      setShippingError("Please fill out all shipping fields.");
      return;
    }
    setShippingError("");
    setCheckoutStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentForm.cardName || paymentForm.cardNumber.length < 15 || paymentForm.cardExpiry.length < 5 || paymentForm.cardCvv.length < 3) {
      setPaymentError("Please provide valid payment card details.");
      return;
    }
    setPaymentError("");
    setCheckoutStep("processing");
    
    // Simulate payment authorization steps
    setTimeout(() => {
      setCheckoutStep("success");
    }, 4000);
  };

  // Calculate pricing sums
  const itemPrice = currentMaterialData.price;
  const customizationFee = logoSource === "custom" ? 10 : 0;
  const subtotal = (itemPrice + customizationFee) * quantity;
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shippingCost;

  // Background/Texture shader getter
  const getCardBackground = () => {
    if (selectedMaterial === "plastic") {
      return currentColor.value;
    }
    
    if (selectedMaterial === "metal") {
      if (currentColor.value === "stealth-black") {
        return "linear-gradient(135deg, #181818 0%, #2e2e2e 50%, #111111 100%)";
      }
      if (currentColor.value === "brushed-silver") {
        return "linear-gradient(135deg, #b8b8b8 0%, #e6e6e6 50%, #b0b0b0 100%)";
      }
      if (currentColor.value === "champagne-gold") {
        return "linear-gradient(135deg, #AA771C 0%, #F5E0A5 50%, #8A5F13 100%)";
      }
    }
    
    if (selectedMaterial === "wood") {
      if (currentColor.value === "walnut") {
        return "linear-gradient(135deg, #3d2314 0%, #52301c 50%, #351e11 100%)";
      }
      if (currentColor.value === "bamboo") {
        return "linear-gradient(135deg, #d9c19b 0%, #ecdcb9 50%, #ccb48c 100%)";
      }
    }
    
    return "#111";
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-white pb-20">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-red-950/20 via-transparent to-transparent pointer-events-none" />

      {/* Header bar */}
      <nav className="relative z-20 border-b border-border bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <Logo className="h-6 scale-90" />
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: 3D Preview (Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center gap-8">
            
            {/* Design/Specs Mode Switcher */}
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10 w-full max-w-[320px]">
              <button 
                onClick={() => setActiveTab("design")}
                className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${activeTab === "design" ? "bg-white text-black shadow-md" : "text-gray-400 hover:text-white"}`}
              >
                Interactive 3D Card
              </button>
              <button 
                onClick={() => setActiveTab("specs")}
                className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${activeTab === "specs" ? "bg-white text-black shadow-md" : "text-gray-400 hover:text-white"}`}
              >
                Chip Specifications
              </button>
            </div>

            {activeTab === "design" ? (
              <>
                {/* 3D Preview Card Window */}
                <div className="w-[300px] h-[480px] sm:w-[320px] sm:h-[510px] flex items-center justify-center relative group" style={{ perspective: "1000px" }}>
                  
                  {/* Outer container rotation wrapper */}
                  <motion.div
                    className="w-full h-full relative cursor-pointer select-none"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  >
                    {/* Tilt container */}
                    <motion.div
                      className="w-full h-full rounded-[24px] relative"
                      style={{ transformStyle: "preserve-3d" }}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      animate={{ rotateX: isFlipped ? 0 : tilt.x, rotateY: isFlipped ? 0 : tilt.y }}
                      transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
                    >
                      {/* CARD FRONT */}
                      <div 
                        className={`absolute inset-0 rounded-[24px] p-8 flex flex-col justify-between border overflow-hidden ${
                          selectedMaterial === "metal" && currentColor.value === "brushed-silver" ? "border-black/10 text-black" : "border-white/15 text-white"
                        }`}
                        style={{ 
                          backfaceVisibility: "hidden", 
                          background: getCardBackground(),
                          boxShadow: selectedMaterial === "metal" ? "0 25px 50px -12px rgba(255,255,255,0.05)" : "0 25px 50px -12px rgba(0,0,0,0.5)"
                        }}
                      >
                        {/* Material Textures */}
                        {selectedMaterial === "wood" && (
                          <div 
                            className="absolute inset-0 opacity-[0.07] pointer-events-none"
                            style={{
                              backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 12px),
                                                repeating-linear-gradient(-35deg, #000 0px, #000 1px, transparent 1px, transparent 18px)`
                            }}
                          />
                        )}
                        {selectedMaterial === "metal" && (
                          <div 
                            className={`absolute inset-0 pointer-events-none ${currentColor.value === "brushed-silver" ? "opacity-[0.08]" : "opacity-[0.05]"}`}
                            style={{
                              backgroundImage: `linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.15) 50%)`,
                              backgroundSize: `2px 100%`
                            }}
                          />
                        )}
                        {selectedMaterial === "plastic" && (
                          <div 
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                              backgroundSize: `6px 6px`
                            }}
                          />
                        )}
                        
                        {/* Dynamic sheen overlay reflecting cursor movement */}
                        <div 
                          className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle at ${50 + (tilt.y * 3)}% ${50 - (tilt.x * 3)}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
                          }}
                        />

                        {/* Card Top: Logo & NFC Logo */}
                        <div className="flex justify-between items-start z-10">
                          {logoSource === "default" && (
                            <Image
                              src="/All in logo.svg"
                              alt="All in Logo"
                              width={110}
                              height={16}
                              className={`object-contain ${
                                selectedMaterial === "metal" && currentColor.value === "brushed-silver" ? "invert opacity-80" : ""
                              }`}
                            />
                          )}
                          {logoSource === "custom" && uploadedLogo ? (
                            <div className="relative w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5 overflow-hidden">
                              <img src={uploadedLogo} alt="Custom Logo" className="w-full h-full object-contain" />
                            </div>
                          ) : logoSource === "custom" ? (
                            <div className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center ${
                              selectedMaterial === "metal" && currentColor.value === "brushed-silver" ? "border-black/30" : "border-white/30"
                            }`}>
                              <Upload size={12} className="opacity-50" />
                            </div>
                          ) : null}
                          {logoSource === "none" && <div />}
                          
                          {/* NFC Waves Icon */}
                          <div className="flex flex-col items-center">
                            <Cpu size={22} className="opacity-80" />
                            <span className="text-[7px] uppercase tracking-[0.2em] font-semibold mt-1 opacity-55">NFC</span>
                          </div>
                        </div>

                        {/* Card Center details */}
                        <div className="flex flex-col gap-1 z-10">
                          <p className="text-xs uppercase tracking-widest font-semibold opacity-70">
                            {companyName || "Your Company"}
                          </p>
                          <h3 className="text-xl font-medium tracking-tight mt-1 font-heading max-w-full truncate">
                            {printName || "Your Name"}
                          </h3>
                        </div>

                        {/* Card Bottom: Premium branding tag */}
                        <div className="flex justify-between items-end border-t pt-4 z-10 border-current/10 opacity-70">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              selectedMaterial === "metal" && currentColor.value === "brushed-silver" ? "bg-black" : "bg-primary"
                            }`} />
                            <span className="text-[9px] uppercase tracking-widest font-bold">ALL-IN PASS</span>
                          </div>
                          <span className="text-[8px] uppercase tracking-widest opacity-60">Tap to connect</span>
                        </div>
                      </div>

                      {/* CARD BACK */}
                      <div 
                        className={`absolute inset-0 rounded-[24px] p-8 flex flex-col justify-between border overflow-hidden ${
                          selectedMaterial === "metal" && currentColor.value === "brushed-silver" ? "border-black/10 text-black" : "border-white/15 text-white"
                        }`}
                        style={{ 
                          backfaceVisibility: "hidden", 
                          transform: "rotateY(180deg)",
                          background: getCardBackground(),
                          boxShadow: selectedMaterial === "metal" ? "0 25px 50px -12px rgba(255,255,255,0.05)" : "0 25px 50px -12px rgba(0,0,0,0.5)"
                        }}
                      >
                        {/* Overlaid grain templates */}
                        {selectedMaterial === "wood" && (
                          <div 
                            className="absolute inset-0 opacity-[0.07] pointer-events-none"
                            style={{
                              backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 12px)`
                            }}
                          />
                        )}
                        {selectedMaterial === "metal" && (
                          <div 
                            className={`absolute inset-0 pointer-events-none ${currentColor.value === "brushed-silver" ? "opacity-[0.08]" : "opacity-[0.05]"}`}
                            style={{
                              backgroundImage: `linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.15) 50%)`,
                              backgroundSize: `2px 100%`
                            }}
                          />
                        )}
                        
                        {/* Card Back Header */}
                        <div className="flex justify-between items-center z-10">
                          <span className="text-[9px] font-bold tracking-widest uppercase opacity-75">All-in NFC Network</span>
                          <Cpu size={16} className="opacity-70" />
                        </div>

                        {/* Center: Stunning vector mock QR Code */}
                        <div className="flex justify-center items-center flex-col gap-3 z-10">
                          <div className={`p-3 rounded-xl bg-white border flex items-center justify-center ${
                            selectedMaterial === "metal" && currentColor.value === "brushed-silver" ? "border-black/10" : "border-white/10"
                          }`}>
                            <svg className="w-24 h-24 text-black" viewBox="0 0 100 100" fill="currentColor">
                              {/* Anchor Top-Left */}
                              <rect x="0" y="0" width="28" height="28" />
                              <rect x="4" y="4" width="20" height="20" fill="white" />
                              <rect x="8" y="8" width="12" height="12" />
                              
                              {/* Anchor Top-Right */}
                              <rect x="72" y="0" width="28" height="28" />
                              <rect x="76" y="4" width="20" height="20" fill="white" />
                              <rect x="80" y="8" width="12" height="12" />

                              {/* Anchor Bottom-Left */}
                              <rect x="0" y="72" width="28" height="28" />
                              <rect x="4" y="76" width="20" height="20" fill="white" />
                              <rect x="8" y="80" width="12" height="12" />
                              
                              {/* Random QR Code Noise Blocks */}
                              <rect x="36" y="4" width="8" height="8" />
                              <rect x="48" y="8" width="8" height="12" />
                              <rect x="60" y="0" width="4" height="20" />
                              <rect x="36" y="16" width="16" height="4" />
                              <rect x="44" y="24" width="20" height="4" />

                              <rect x="4" y="36" width="12" height="8" />
                              <rect x="24" y="36" width="8" height="16" />
                              <rect x="36" y="36" width="24" height="8" />
                              <rect x="68" y="36" width="12" height="12" />
                              <rect x="88" y="36" width="8" height="4" />
                              
                              <rect x="0" y="48" width="16" height="4" />
                              <rect x="48" y="48" width="12" height="12" />
                              <rect x="68" y="52" width="4" height="16" />
                              <rect x="80" y="44" width="16" height="8" />

                              <rect x="36" y="68" width="24" height="4" />
                              <rect x="44" y="76" width="8" height="16" />
                              <rect x="60" y="80" width="24" height="12" />
                              <rect x="72" y="68" width="12" height="8" />
                              <rect x="88" y="76" width="8" height="8" />
                            </svg>
                          </div>
                          <span className="text-[9px] uppercase tracking-widest font-semibold opacity-65">Scan profile instantly</span>
                        </div>

                        {/* Back Bottom */}
                        <div className="text-center z-10 border-t border-current/10 pt-4">
                          <p className="text-[7px] uppercase tracking-widest opacity-60 leading-normal">
                            All-in Inc. • Powered by Secure Encrypted NFC
                          </p>
                        </div>
                      </div>

                    </motion.div>
                  </motion.div>

                </div>

                {/* Flip control trigger */}
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm text-gray-300 font-medium"
                >
                  <RotateCw size={14} className={isFlipped ? "rotate-180 transition-transform duration-500" : "transition-transform duration-500"} />
                  <span>Flip to {isFlipped ? "Front" : "Back"}</span>
                </button>
              </>
            ) : (
              /* Spec Sheet Tab */
              <div className="w-full max-w-[380px] bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-6 text-gray-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-heading text-lg text-white font-semibold mb-2 flex items-center gap-2">
                    <Cpu className="text-primary" size={18} /> Hardware details
                  </h4>
                  <p className="text-gray-400 text-xs">The underlying tech driving your seamless digital connection.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <Check size={12} />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Microchip Protocol</span>
                      <p className="text-xs text-gray-400">NTAG215 ISO 14443A encoding scheme. Maximum compatibility rates across all modern phones.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <Check size={12} />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Offline Action Triggers</span>
                      <p className="text-xs text-gray-400">Pre-programmed directly onto the card storage. Tapping instantly prompts contact files or domain cards.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <Check size={12} />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Zero Energy Transfer</span>
                      <p className="text-xs text-gray-400">Requires no charging or batteries. Powers itself inductively from the electromagnetic field of the scanner phone.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                      <Check size={12} />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Encryption Lock</span>
                      <p className="text-xs text-gray-400">Chip details are permanently write-locked on production to prevent tampering, tracking, or skimming.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs text-gray-500 font-semibold">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> 2-Year Warranty</span>
                  <span className="flex items-center gap-1.5"><Package size={14} /> Eco-Friendly</span>
                </div>
              </div>
            )}
            
            {/* Visual Quality badges */}
            <div className="flex items-center gap-6 mt-2 opacity-65 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> Lifetime NFC guarantee</span>
              <span className="flex items-center gap-1.5"><Phone size={14} /> No application required</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Configurator Options & Details */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Introductory title */}
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">Premium Customization</span>
              <h1 className="text-4xl md:text-5xl font-heading text-white font-medium tracking-tight">
                Order your physical NFC Card
              </h1>
              <p className="text-gray-400 font-light mt-3 leading-relaxed">
                Configure your custom materials, color palettes, and card branding details. Each card contains our integrated high-performance NFC chip.
              </p>
            </div>

            {/* Material Selector Cards */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Step 1: Choose Material</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PRODUCTS.map((prod) => {
                  const isSelected = selectedMaterial === prod.id;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => setSelectedMaterial(prod.id)}
                      className={`text-left p-5 rounded-2xl border transition-all relative flex flex-col justify-between h-44 ${
                        isSelected 
                          ? "bg-white/5 border-primary shadow-[0_0_20px_rgba(255,26,26,0.1)]" 
                          : "bg-white/2 hover:bg-white/4 border-white/5 hover:border-white/10"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-heading text-lg text-white font-semibold mb-1">{prod.name.split(" ")[1]}</h3>
                        <p className="text-[11px] text-gray-400 leading-normal line-clamp-3">{prod.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline justify-between w-full">
                        <span className="text-xs text-gray-500 font-semibold">Price</span>
                        <span className="text-xl font-heading text-white font-semibold">${prod.price}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Swatch Picker */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Step 2: Select Color Finish</span>
              
              <div className="flex items-center gap-3">
                {currentMaterialData.colors.map((color, idx) => {
                  const isSelected = selectedColorIndex === idx;
                  
                  // Styles for metal colors
                  let swatchStyle = {};
                  if (selectedMaterial === "metal") {
                    if (color.value === "stealth-black") {
                      swatchStyle = { background: "linear-gradient(135deg, #151515, #333)" };
                    } else if (color.value === "brushed-silver") {
                      swatchStyle = { background: "linear-gradient(135deg, #bbb, #eee)" };
                    } else if (color.value === "champagne-gold") {
                      swatchStyle = { background: "linear-gradient(135deg, #B38728, #FBF5B7)" };
                    }
                  } else if (selectedMaterial === "wood") {
                    if (color.value === "walnut") {
                      swatchStyle = { background: "linear-gradient(135deg, #3d2314, #5c3b24)" };
                    } else if (color.value === "bamboo") {
                      swatchStyle = { background: "linear-gradient(135deg, #d2b48c, #ebdcb5)" };
                    }
                  } else {
                    swatchStyle = { backgroundColor: color.value };
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`relative w-12 h-12 rounded-full border transition-transform flex items-center justify-center hover:scale-105 active:scale-95 ${
                        isSelected ? "border-primary ring-2 ring-primary/30 scale-105" : "border-white/10"
                      }`}
                      style={swatchStyle}
                      title={color.name}
                    >
                      {isSelected && (
                        <div className={`w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm`}>
                          <Check size={8} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
                <span className="text-sm font-semibold text-gray-400 ml-2">
                  {currentColor.name}
                </span>
              </div>
            </div>

            {/* Customization Details Input Panel */}
            <div className="flex flex-col gap-6 bg-white/3 border border-white/5 rounded-3xl p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Step 3: Card Customization details</span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Full Name on Card</label>
                  <input
                    type="text"
                    maxLength={26}
                    value={printName}
                    onChange={(e) => setPrintName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm font-medium"
                    placeholder="Enter name"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
                    <span>Laser printed exactly as shown</span>
                    <span>{printName.length}/26 chars</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Company Name</label>
                  <input
                    type="text"
                    maxLength={32}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm font-medium"
                    placeholder="Enter company name"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
                    <span>Optional subline details</span>
                    <span>{companyName.length}/32 chars</span>
                  </div>
                </div>
              </div>

              {/* Logo customization select */}
              <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Branding Logo Option</label>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "default", label: "All in Logo" },
                    { id: "custom", label: "Custom Engrave (+$10)" },
                    { id: "none", label: "No Logo (Blank)" }
                  ].map((logoOpt) => (
                    <button
                      key={logoOpt.id}
                      type="button"
                      onClick={() => setLogoSource(logoOpt.id as any)}
                      className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-colors ${
                        logoSource === logoOpt.id
                          ? "bg-white text-black border-white"
                          : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                      }`}
                    >
                      {logoOpt.label}
                    </button>
                  ))}
                </div>

                {/* Custom Logo File Uploader */}
                {logoSource === "custom" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-dashed border-white/15 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 bg-white/[0.01] relative hover:bg-white/[0.02] transition-colors"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="logo-upload-input"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    
                    {uploadedLogo ? (
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2 shrink-0">
                          <img src={uploadedLogo} alt="Uploaded logo mockup" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-left">
                          <span className="text-sm font-semibold text-white block">Logo Uploaded Successfully</span>
                          <span className="text-xs text-gray-500 block">Click or drag files to replace current logo</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setUploadedLogo(null);
                          }}
                          className="ml-auto p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white z-10"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-gray-400">
                          <Upload size={16} />
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-semibold text-white block">Upload custom vector / logo</span>
                          <span className="text-xs text-gray-500 block mt-1">Supports PNG, SVG, JPG. Recommendation: transparent backgrounds</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Product Tech Details Accordion */}
            <div className="border-t border-white/10 pt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-4">Specs & details</span>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Materials & Finishes",
                    content: "Premium cards use CNC cut blanks polished and etched to specification. Metal cards are heavier and feature deep laser engravings. Wood cards are finished in natural organic oils for resistance and waterproofing."
                  },
                  {
                    title: "Dual-Frequency NFC Technology",
                    content: "Integrated with secure-element NTAG215 microchips operating at 13.56MHz. The antenna is engineered around metal components to prevent interference, delivering a 100% read rate."
                  },
                  {
                    title: "Instant Profile Syncing",
                    content: "Your card is bound to your profile dashboard url. Tapping it triggers an instant NDEF contact download. No external app downloads are required by the client."
                  }
                ].map((specItem, index) => {
                  const isOpen = openAccordionIndex === index;
                  return (
                    <div key={index} className="border-b border-white/5 pb-4">
                      <button
                        onClick={() => setOpenAccordionIndex(isOpen ? -1 : index)}
                        className="flex justify-between items-center w-full text-left font-semibold text-white text-sm hover:text-white/80 py-2"
                      >
                        <span>{specItem.title}</span>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden text-xs text-gray-400 mt-2 leading-relaxed"
                          >
                            {specItem.content}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shopping Cart Summary Card */}
            <div className="bg-gradient-to-r from-white/3 to-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg text-white font-semibold">Your Configuration Summary</h4>
                  <p className="text-xs text-gray-400 mt-1">Review items in cart before proceeding.</p>
                </div>
                
                {/* Quantity picker */}
                <div className="flex items-center bg-black/40 rounded-full border border-white/10 p-1">
                  <button 
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(q => q - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-white/5 transition-colors font-semibold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Line items list */}
              <div className="space-y-3 text-sm border-t border-white/5 pt-4">
                <div className="flex justify-between text-gray-400">
                  <span>1x {currentMaterialData.name} ({currentColor.name})</span>
                  <span className="text-white font-semibold">${itemPrice * quantity}</span>
                </div>
                
                {customizationFee > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>1x Custom Logo Laser Engraving Fee</span>
                    <span className="text-white font-semibold">${customizationFee * quantity}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>Shipping & Delivery</span>
                  <span className="text-white font-semibold">
                    {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-base font-semibold border-t border-white/10 pt-4 text-white">
                  <span>Total Amount</span>
                  <span className="text-2xl font-heading text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action checkout buttons */}
              <div className="flex flex-col gap-3 mt-2">
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full py-4 rounded-xl bg-white text-black font-semibold text-base hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-[0.99]"
                >
                  <CreditCard size={18} />
                  <span>Configure & Proceed to Checkout</span>
                </button>
                <p className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-1.5 mt-1">
                  <Lock size={10} /> Fully secure 256-bit encryption. Returns accepted within 30 days.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* CHECKOUT WIZARD MODAL DIALOG */}
      <AnimatePresence>
        {checkoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Dark backing overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (checkoutStep !== "processing" && checkoutStep !== "success") {
                  setCheckoutOpen(false);
                }
              }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-[#0F0F0F] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[90vh] z-10"
            >
              
              {/* Close Button */}
              {checkoutStep !== "processing" && checkoutStep !== "success" && (
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors z-25"
                >
                  <X size={16} />
                </button>
              )}

              {/* Left Side: Order summary details */}
              <div className="w-full md:w-[40%] bg-black/50 p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Order summary</span>
                  <h3 className="text-2xl font-heading text-white font-medium">Your NFC Card</h3>
                  
                  {/* Cart Item Detail */}
                  <div className="mt-8 flex gap-4 items-center">
                    <div 
                      className="w-16 h-10 rounded-lg border border-white/10 flex items-center justify-center p-1.5 text-white scale-90"
                      style={{ background: getCardBackground() }}
                    >
                      <Cpu size={14} className="opacity-80" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block">{currentMaterialData.name}</span>
                      <span className="text-xs text-gray-500 block">{currentColor.name} • Qty {quantity}</span>
                    </div>
                  </div>

                  {/* Summary items */}
                  <div className="mt-8 space-y-3 text-xs border-t border-white/5 pt-6 text-gray-400">
                    <div className="flex justify-between">
                      <span>Card Material</span>
                      <span className="text-white font-semibold">${itemPrice * quantity}</span>
                    </div>
                    {customizationFee > 0 && (
                      <div className="flex justify-between">
                        <span>Logo Engraving</span>
                        <span className="text-white font-semibold">${customizationFee * quantity}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Standard Shipping</span>
                      <span className="text-white font-semibold">{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6 text-sm text-gray-400">
                  <div className="flex justify-between items-baseline text-white">
                    <span>Total Amount</span>
                    <span className="text-3xl font-heading font-semibold text-primary">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-500">
                    <Lock size={12} className="text-primary" />
                    <span>256-Bit SSL Encrypted Purchase</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Step-by-Step Forms */}
              <div className="w-full md:w-[60%] p-8 overflow-y-auto flex flex-col justify-center">
                
                {/* STEP 1: SHIPPING INFORMATION */}
                {checkoutStep === "shipping" && (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleShippingSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h3 className="text-2xl font-heading text-white font-semibold">Shipping Address</h3>
                      <p className="text-xs text-gray-400 mt-1">Please enter where to ship your custom card.</p>
                    </div>

                    {shippingError && (
                      <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-xs text-red-200">
                        {shippingError}
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Full Recipient Name</label>
                      <input
                        required
                        type="text"
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({...shippingForm, fullName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm"
                        placeholder="e.g. Alex Morrison"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Email Address</label>
                      <input
                        required
                        type="email"
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({...shippingForm, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm"
                        placeholder="alex@techcorp.com"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Street Address</label>
                      <input
                        required
                        type="text"
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({...shippingForm, address: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm"
                        placeholder="123 Innovation Way, Suite 400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">City</label>
                        <input
                          required
                          type="text"
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm"
                          placeholder="San Francisco"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Postal / ZIP Code</label>
                        <input
                          required
                          type="text"
                          value={shippingForm.postalCode}
                          onChange={(e) => setShippingForm({...shippingForm, postalCode: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm"
                          placeholder="94107"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-primary hover:bg-red-700 text-white font-semibold text-sm transition-colors mt-4 flex items-center justify-center gap-2"
                    >
                      <span>Continue to Payment Method</span>
                    </button>
                  </motion.form>
                )}

                {/* STEP 2: CREDIT CARD PAYMENT METHOD */}
                {checkoutStep === "payment" && (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handlePaymentSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <h3 className="text-2xl font-heading text-white font-semibold">Credit Card details</h3>
                      <p className="text-xs text-gray-400 mt-1">Provide payment credentials to secure your NFC order.</p>
                    </div>

                    {paymentError && (
                      <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-xs text-red-200">
                        {paymentError}
                      </div>
                    )}

                    {/* MINI LIVE CREDIT CARD PREVIEW */}
                    <div className="w-full h-40 bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative shadow-lg overflow-hidden select-none">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-7 rounded bg-amber-400/20 border border-amber-400/40" />
                        <span className="text-xs uppercase font-bold tracking-widest text-gray-500">Secure Payment</span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-lg font-mono tracking-[0.2em] text-white">
                          {paymentForm.cardNumber || "•••• •••• •••• ••••"}
                        </span>
                        
                        <div className="flex justify-between items-end mt-2">
                          <div className="flex flex-col">
                            <span className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">Card Holder</span>
                            <span className="text-xs text-gray-200 font-medium tracking-wide truncate max-w-[150px]">
                              {paymentForm.cardName || "YOUR FULL NAME"}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex flex-col items-end">
                              <span className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">Expires</span>
                              <span className="text-xs text-gray-200 font-medium font-mono">
                                {paymentForm.cardExpiry || "MM/YY"}
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">CVV</span>
                              <span className="text-xs text-gray-200 font-medium font-mono">
                                {paymentForm.cardCvv || "•••"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Cardholder Full Name</label>
                      <input
                        required
                        type="text"
                        value={paymentForm.cardName}
                        onChange={(e) => setPaymentForm({...paymentForm, cardName: e.target.value.toUpperCase()})}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm"
                        placeholder="e.g. ALEX MORRISON"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Card Number</label>
                      <input
                        required
                        type="text"
                        maxLength={19}
                        value={paymentForm.cardNumber}
                        onChange={(e) => setPaymentForm({...paymentForm, cardNumber: formatCardNumber(e.target.value)})}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm font-mono"
                        placeholder="4111 2222 3333 4444"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Expiry Date (MM/YY)</label>
                        <input
                          required
                          type="text"
                          maxLength={5}
                          value={paymentForm.cardExpiry}
                          onChange={(e) => setPaymentForm({...paymentForm, cardExpiry: formatExpiry(e.target.value)})}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm font-mono"
                          placeholder="09/28"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Security Code (CVV)</label>
                        <input
                          required
                          type="password"
                          maxLength={4}
                          value={paymentForm.cardCvv}
                          onChange={(e) => setPaymentForm({...paymentForm, cardCvv: e.target.value.replace(/[^0-9]/gi, "")})}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors text-sm font-mono"
                          placeholder="•••"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep("shipping")}
                        className="w-1/3 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 font-semibold text-sm transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-4 rounded-xl bg-primary hover:bg-red-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Authorize Payment</span>
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* STEP 3: PAYMENT PROCESSING LOADING AND TRANSITION SCREEN */}
                {checkoutStep === "processing" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center p-8 gap-8"
                  >
                    {/* Ring processing animation */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <Cpu size={32} className="text-primary" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-heading text-white font-semibold animate-pulse">Securing transaction...</h3>
                      <div className="text-xs text-gray-500 font-medium space-y-1">
                        <p className="animate-pulse duration-1000">1. Connecting to Secure Payments vault...</p>
                        <p className="animate-pulse duration-700 delay-150">2. Initializing encryption layer...</p>
                        <p className="animate-pulse duration-500 delay-300">3. Creating digital identity payload...</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS AND CONFETTI WIDGET */}
                {checkoutStep === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center p-6 gap-6 relative"
                  >
                    {/* CONFETTI LAYER EMULATION */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                      {[...Array(25)].map((_, i) => {
                        const style = {
                          left: `${Math.random() * 100}%`,
                          top: `-10px`,
                          backgroundColor: i % 3 === 0 ? "#FF1A1A" : i % 3 === 1 ? "#FFF" : "#D4AF37",
                          transform: `rotate(${Math.random() * 360}deg)`,
                          animation: `fall ${2 + Math.random() * 3}s linear infinite`,
                          animationDelay: `${Math.random() * 2}s`
                        };
                        return (
                          <div
                            key={i}
                            className="absolute w-2 h-4 opacity-75 rounded-sm"
                            style={style}
                          />
                        );
                      })}

                    </div>

                    {/* Success Icon */}
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] z-10">
                      <Check size={36} />
                    </div>

                    <div className="space-y-2 z-10">
                      <span className="text-xs uppercase tracking-widest font-bold text-emerald-500">Order successfully placed</span>
                      <h3 className="text-3xl font-heading text-white font-semibold">Thank you for your purchase!</h3>
                      <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                        Your custom NFC card configuration is complete. We've sent a detailed receipt and shipping tracking info to <strong className="text-white">{shippingForm.email}</strong>.
                      </p>
                    </div>

                    {/* Mock Invoice Details Box */}
                    <div className="w-full bg-white/2 border border-white/5 rounded-2xl p-6 text-left space-y-4 text-xs z-10 max-w-md">
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-gray-500">Order Reference</span>
                        <span className="text-white font-mono font-semibold">#ALN-{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-gray-500">Card Configuration</span>
                        <span className="text-white font-semibold truncate max-w-[200px]">
                          {currentMaterialData.name} ({currentColor.name})
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                        <span className="text-gray-500">Shipping To</span>
                        <span className="text-white font-semibold text-right truncate max-w-[200px]">
                          {shippingForm.fullName}<br />
                          {shippingForm.city}, {shippingForm.postalCode}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-gray-400 font-semibold">Total Paid</span>
                        <span className="text-sm text-primary font-bold">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-4 w-full justify-center mt-4 z-10 max-w-sm">
                      <Link
                        href="/"
                        onClick={() => setCheckoutOpen(false)}
                        className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors w-full"
                      >
                        Return to Homepage
                      </Link>
                    </div>
                  </motion.div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
