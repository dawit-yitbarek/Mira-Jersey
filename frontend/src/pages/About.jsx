import React from "react";
import "@fontsource/poppins";

export default function AboutPage() {
    return (
        <section className="max-w-7xl py-7 h-auto bg-gradient-to-b from-[#0D1B2A] to-[#1B263B] text-[#E0E1DD] font-[Poppins]">

            {/* Hero-like Intro Section */}
            <div className="text-center px-6 py-20"
                style={{ background: "radial-gradient(circle at 40% 30%, #0077B6 0%, #001F3F 50%, #000000 100%)", }}>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#90E0EF] mb-4">
                    About Mira Jersey
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-[#E0E1DD]/80">
                    We're not just a jersey store — we're a community built around passion, legacy, and the love of the game.
                </p>
                <div className="h-1 w-16 bg-gradient-to-r from-[#90E0EF] to-[#ADE8F4] rounded-full mx-auto mt-6" />
            </div>

            <div className="max-w-6xl px-6 mx-auto space-y-20">

                {/* Our Story */}
                <div className="text-center mt-16">
                    <p className="uppercase text-[#90E0EF] text-sm font-semibold tracking-widest mb-2">Behind the Brand</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#90E0EF] mb-4">Our Story</h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-[#90E0EF] to-[#ADE8F4] rounded-full mx-auto mb-6"></div>
                    <p className="max-w-3xl mx-auto text-[#E0E1DD]/80 leading-relaxed text-lg">
                        Mira Jersey was born from a deep love for football and authentic fashion. We noticed how hard it was for Ethiopian fans to get quality, original jerseys — so we stepped up. Our mission is to bring the joy and pride of your favorite team directly to your door with jerseys that are real, reliable, and ready to wear.
                    </p>
                </div>

                {/* More Than Just Shirts */}
                <div className="text-center">
                    <p className="uppercase text-[#90E0EF] text-sm font-semibold tracking-widest mb-2">Beyond the Game</p>
                    <h3 className="text-3xl font-bold mb-4">More Than Just Shirts</h3>
                    <p className="max-w-3xl mx-auto text-[#E0E1DD]/80 text-lg">
                        Our jerseys carry moments, memories, and passion. From modern styles to older gems, Mira Jersey gives fans a chance to own a piece of football history. Every jersey is carefully sourced, inspected, and packaged with love.
                    </p>
                </div>

                {/* Old Jerseys Focus */}
                <div className="text-center">
                    <p className="uppercase text-[#90E0EF] text-sm font-semibold tracking-widest mb-2">Timeless Kits</p>
                    <h3 className="text-3xl font-bold mb-4">Classic & Vintage Jerseys</h3>
                    <p className="max-w-3xl mx-auto text-[#E0E1DD]/80 text-lg">
                        We go beyond the current season. Our collection features are rare and classic jerseys from past eras — timeless designs that capture football history. Celebrate the legacy of the game and wear it with pride.
                    </p>
                </div>

                {/* Why Mira Jersey */}
                <div className="text-center">
                    <p className="uppercase text-[#90E0EF] text-sm font-semibold tracking-widest mb-2">Why Choose Us</p>
                    <h3 className="text-3xl font-bold mb-4">Why Mira Jersey?</h3>
                    <ul className="max-w-xl mx-auto text-left list-disc list-inside text-[#E0E1DD]/80 text-lg space-y-2">
                        <li>Both current and older season jerseys — rare finds included</li>
                        <li>Every jersey comes with verified quality checks</li>
                        <li>Fast delivery throughout Ethiopia</li>
                        <li>Secure online payments via Chapa</li>
                    </ul>
                </div>

                {/* Founder Message */}
                <div className="bg-[#24344D] p-8 md:p-12 rounded-xl text-center shadow-md">
                    <h4 className="text-2xl font-bold text-[#90E0EF] mb-4">A Note From the Team</h4>
                    <p className="max-w-3xl mx-auto text-[#E0E1DD]/80 text-lg">
                        Thank you for supporting a local business that’s passionate about the game and committed to quality. Whether you're a die-hard supporter or buying your first jersey — we’re proud to serve you and welcome you into the Mira Jersey family.
                    </p>
                </div>

            </div>
        </section>

    );
};