import React from "react";
import HeroSection from "../components/HeroSection";
import ShopPreviewSection from "../components/ShopPreview";
import WhyChooseUsSection from "../components/WhyChooseUs";
import TestimonialsSection from "../components/Testimonials";
import CallToActionSection from "../components/CTASection";
import FooterSection from "../components/Footer"

export default function HomePage() {
  return (
    <main className="bg-[#0D1B2A] text-[#E0E1DD] min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Shop Preview Section */}
      <ShopPreviewSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call To Action Section */}
      <CallToActionSection />
    </main>
  );
};