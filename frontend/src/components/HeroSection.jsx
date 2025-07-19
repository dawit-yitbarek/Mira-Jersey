import React from "react";
import "@fontsource/bebas-neue";
import "@fontsource/poppins";

const Heading = ({ children, className = "" }) => (
  <h1
    style={{ fontFamily: '"Bebas Neue", cursive' }}
    className={className}>
    {children}
  </h1>
);

const BodyText = ({ children, className = "" }) => (
  <p
    style={{ fontFamily: '"Poppins", sans-serif' }}
    className={className}>
    {children}
  </p>
);

export default function HeroSection() {
  return (
    <section className="relative py-20 px-6 text-[#E0E1DD]"
      style={{ background: "radial-gradient(circle at 40% 30%, #0077B6 0%, #001F3F 50%, #000000 100%)", }} >
      <div className="max-w-7xl mx-auto py-7 h-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Text Content */}
        <div className="text-left z-10">
          <Heading className="text-4xl md:text-6xl drop-shadow-md mb-6"> Unleash Your Game </Heading>
          <BodyText className="text-lg md:text-xl mb-8 text-[#E0E1DD]/90"> Premium Football Jerseys for Champions — Designed to Win. </BodyText>
          <a
            href="#shop"
            className="inline-block bg-[#E0E1DD] text-[#1B263B] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#ffffff] transition"
          >
            Shop Now
          </a>
        </div>

        {/* Right Hero Image with stylized display */}
        <div className="relative flex justify-center">
          <img
            src="/images/hero.webp"
            alt="Football Jersey Hero"
            className="rounded-lg object-cover brightness-95"
          />
        </div>
      </div>

    </section>
  );
};