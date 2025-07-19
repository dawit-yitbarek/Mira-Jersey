import React, { useEffect, useState } from "react";
import "@fontsource/poppins";
import { Quote, X } from "lucide-react";
import { RetryButton } from "./ErrorRetry";
import {TestimonialsSkeleton} from "./SkeletonPlaceholders";
import api from "./Api";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function TestimonialsSection() {

    const [testimonials, setTestimonials] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false); const [filter, setFilter] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const filteredTestimonials = filter ? testimonials.filter((t) => t.rating === filter) : testimonials;

    useEffect(() => {
        const getTestimonials = async () => {
            try {
                setLoading(true)
                setError(false)
                const response = await api.get(`${BackEndUrl}/api/feedback`);
                setTestimonials(response.data.feedback)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            };
        };
        getTestimonials();
    }, [refresh]);

    return (
        <section className="bg-[#0D1B2A] text-[#E0E1DD] px-6 py-16">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: '"Poppins", sans-serif' }}> What Our Customers Say </h2>
                <p className="text-[#E0E1DD]/80 mb-12 max-w-2xl mx-auto"> Hear from real Mira Jersey buyers who’ve experienced the quality, speed, and style firsthand. </p>

                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                    {testimonials.slice(0, 3).map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#1B263B] p-6 rounded-xl shadow hover:shadow-lg transition text-left"
                        >
                            <Quote className="w-6 h-6 text-[#90E0EF] mb-4" />
                            <p className="text-sm text-[#E0E1DD]/90 italic mb-3">“{item.quote}”</p>
                            <p className="font-semibold text-[#90E0EF]">{item.name}</p>
                            <div className="text-yellow-400 text-sm">
                                {"★".repeat(item.rating)}
                                {"☆".repeat(5 - item.rating)}
                            </div>
                        </div>
                    ))}
                </div>

                {!loading && !error && <button
                    className="mt-10 bg-[#90E0EF] text-[#0D1B2A] font-semibold px-6 py-2 rounded-full hover:bg-[#ADE8F4] transition"
                    onClick={() => setShowModal(true)}
                >
                    View All Feedback
                </button>}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1B263B] text-[#E0E1DD] w-full max-w-3xl p-6 rounded-xl relative overflow-y-auto max-h-[90vh]">
                        <button
                            className="absolute top-4 right-4 text-[#E0E1DD] hover:text-red-400"
                            onClick={() => setShowModal(false)}
                        >
                            <X size={24} />
                        </button>
                        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: '"Poppins", sans-serif' }}>
                            All Feedback
                        </h3>
                        <div className="mb-6 text-left">
                            <label className="mr-2">Sort by Rating:</label>
                            {[5, 4, 3].map((star) => (
                                <button
                                    key={star}
                                    className={`mx-1 px-3 py-1 rounded-full border ${filter === star ? "bg-[#90E0EF] text-[#0D1B2A]" : "border-[#90E0EF] text-[#E0E1DD]"
                                        }`}
                                    onClick={() => setFilter(filter === star ? null : star)}
                                >
                                    {star}★
                                </button>
                            ))}
                        </div>
                        <div className="space-y-6">
                            {filteredTestimonials.map((item, index) => (
                                <div key={index} className="bg-[#0D1B2A] p-4 rounded-lg shadow">
                                    <p className="italic text-sm mb-2">“{item.quote}”</p>
                                    <p className="font-semibold text-[#90E0EF]">{item.name}</p>
                                    <div className="text-yellow-400 text-sm">
                                        {"★".repeat(item.rating)}
                                        {"☆".repeat(5 - item.rating)}
                                    </div>
                                </div>
                            ))}
                            {filteredTestimonials.length === 0 && (
                                <p className="text-center text-[#E0E1DD]/60">No testimonials with that rating yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {loading && <TestimonialsSkeleton />}
            {error && <RetryButton refresh={() => setRefresh(prev => prev + 1)} text={'Failed to load testimonails!'} />}

        </section>

    );
};