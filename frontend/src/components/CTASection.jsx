import React from "react";

export default function CallToActionSection() {
    return (
        <section className="bg-[#1B263B] text-[#E0E1DD] px-6 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Wear Your Favorite Jersey?</h2>
            <p className="text-[#E0E1DD]/80 max-w-xl mx-auto mb-6"> Limited stock available for some club seasons — get yours before it runs out! </p>
            <a
                href="/shop"
                className="inline-block bg-[#90E0EF] text-[#0D1B2A] font-semibold px-6 py-3 rounded-full hover:bg-[#ADE8F4] transition"
            > Shop Now
            </a>
        </section>
    );
};
