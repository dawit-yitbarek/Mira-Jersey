import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "./Api";
import { RetryButton } from "./ErrorRetry";
import { ShowPreviewSkeleton } from "./SkeletonPlaceholders";
import "@fontsource/poppins";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;


export default function ShopPreviewSection() {
    const [jerseys, setJerseys] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        const getFeaturedJersey = async () => {
            try {
                setLoading(true)
                setError(false)
                const response = await api.get(`${BackEndUrl}/api/products/featured`)
                setJerseys(response.data.products)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        };
        getFeaturedJersey();
    }, [refresh]);

    return (
        <section className="bg-[#0D1B2A] text-[#E0E1DD] px-6 py-16" id="shop">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: '"Poppins", sans-serif' }}>
                    Featured Jerseys
                </h2>
                <p className="text-[#E0E1DD]/80 mb-10 max-w-xl">
                    Explore some of our best picks from top football clubs — authentic quality and local delivery.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {jerseys.map((jersey, index) => (
                        <ProductCard key={index} {...jersey} />
                    ))}
                </div>

                {loading && <ShowPreviewSkeleton loop={3} />}
                {error && <RetryButton refresh={() => setRefresh(prev => prev + 1)} text={'Failed to load jerseys!'} />}

                <div className="text-center mt-12">
                    <a
                        href="/shop"
                        className="inline-block bg-[#E0E1DD] text-[#1B263B] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-white transition"
                    >
                        View All Jerseys
                    </a>
                </div>
            </div>
        </section>

    );
};