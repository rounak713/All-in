"use client";

import Link from "next/link";
import { Hash, Camera, User, Code } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6 relative">
              <Logo />
            </Link>
            <p className="text-gray-500 text-sm font-light leading-relaxed max-w-xs mb-8">
              Replacing traditional business cards with a smart digital identity platform. Everything about you, accessible with one tap.
            </p>
            <div className="flex items-center gap-4 text-gray-500">
              <Link href="#" className="hover:text-white transition-colors"><Hash size={20} /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Camera size={20} /></Link>
              <Link href="#" className="hover:text-white transition-colors"><User size={20} /></Link>
              <Link href="#" className="hover:text-white transition-colors"><Code size={20} /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Products</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-white transition-colors">Digital Profiles</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">NFC Cards</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Enterprise</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Developers API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} All in Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
