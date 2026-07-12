import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "All in | Everything About You. One Tap.",
  description: "Share your complete professional identity instantly. No paper. No searching. Just one tap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased bg-black text-[#F5F5F5]`}
    >
      <body className="min-h-screen flex flex-col font-sans selection:bg-[#FF1A1A]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
