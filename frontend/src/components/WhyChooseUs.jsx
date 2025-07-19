import React from "react";
import { ShieldCheck, Truck, BadgeCheck, CreditCard } from "lucide-react";
import "@fontsource/poppins";

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-[#90E0EF]" />,
        title: "Authentic Quality",
        description: "All jerseys are carefully selected and guaranteed to meet premium quality standards."
    },
    {
        icon: <Truck className="w-8 h-8 text-[#90E0EF]" />,
        title: "Fast & Local Delivery",
        description: "We deliver across Ethiopia with speed and care — get your favorite jersey in days."
    },
    {
        icon: <BadgeCheck className="w-8 h-8 text-[#90E0EF]" />,
        title: "Rare & Classic Jerseys",
        description: "Mira Jersey also offers older season jerseys — find vintage gems from top clubs."
    },
    {
        icon: <CreditCard className="w-8 h-8 text-[#90E0EF]" />,
        title: "Secure Online Payments",
        description: "Pay easily and safely using chapa — no need for cash or calls. Checkout in seconds."
    }
];

export default function WhyChooseUsSection() {
    return (
        <section className="bg-[#1B263B] text-[#E0E1DD] px-6 py-16">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: '"Poppins", sans-serif' }}>
                    Why Choose Mira Jersey?
                </h2>
                <p className="text-[#E0E1DD]/80 mb-12 max-w-2xl mx-auto"> At Mira Jersey, we’re not just about selling jerseys — we’re about connecting fans with authentic football fashion. Whether you're looking for the latest drops or rare classics, we've got you covered. </p>

                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#0D1B2A] p-6 rounded-xl shadow hover:shadow-lg transition text-left"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-[#E0E1DD]/80">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};