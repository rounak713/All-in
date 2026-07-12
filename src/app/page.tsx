import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { HowItWorks } from "@/components/HowItWorks";
import { LiveDemo } from "@/components/LiveDemo";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { AiSection } from "@/components/AiSection";
import { ProfileTemplates } from "@/components/ProfileTemplates";
import { AnalyticsPreview } from "@/components/AnalyticsPreview";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden selection:bg-[#FF1A1A]/30 selection:text-white">
      <Navbar />
      <Hero />
      <TrustSection />
      <HowItWorks />
      <LiveDemo />
      <FeaturesGrid />
      <AiSection />
      <ProfileTemplates />
      <AnalyticsPreview />
      <EnterpriseSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
