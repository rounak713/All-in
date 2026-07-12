import React from "react";
import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <Image
        src="/all in logo.svg"
        alt="All in Logo"
        width={200}
        height={20}
        className="object-contain"
        priority
      />
    </div>
  );
}
