import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { RetryButton } from "../components/ErrorRetry";
import { ShowPreviewSkeleton } from "../components/SkeletonPlaceholders";
import "@fontsource/poppins";
import api from "../components/Api";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;


export default function ShopPage() {
  const [jersey, setJersey] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("");
  const [sort, setSort] = useState("");
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const getJersey = async () => {
      try {
        setLoading(true)
        setError(false)
        const response = await api.get(`${BackEndUrl}/api/products`);
        setJersey(response.data.products);
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      };
    };
    getJersey();
  }, [refresh]);

  const filteredProducts = jersey
    .filter((item) =>
      item.club.toLowerCase().includes(search.trim().toLowerCase()) &&
      (season ? item.season.includes(season.trim()) : true)
    )
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <section className="bg-[#0D1B2A] text-[#E0E1DD] px-6 py-16 font-[Poppins] min-h-screen">
      {/* Intro Section */}
      <div className="text-center my-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#90E0EF] mb-4">Find Your Favorite Jersey</h1>
        <p className="text-[#E0E1DD]/80 max-w-2xl mx-auto text-lg">
          Explore our handpicked selection of authentic jerseys. Search by club or season, and sort by price to find your perfect fit.
        </p>
        <div className="h-1 w-16 bg-gradient-to-r from-[#90E0EF] to-[#ADE8F4] rounded-full mx-auto mt-6" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center my-10">
        <input
          type="text"
          placeholder="Search by club name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1B263B] text-white px-4 py-2 rounded-md outline-none"
        />
        <div>
          <input
            type="text"
            list="season-options"
            placeholder="Search by Season..."
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="bg-[#1B263B] text-white px-4 py-2 rounded-md"
          />

          <datalist id="season-options">
            <option value="2025/2026" />
            <option value="2024/2025" />
            <option value="2023/2024" />
            <option value="2022/2023" />
            <option value="2021/2022" />
            <option value="2020/2021" />
          </datalist>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#1B263B] text-white px-4 py-2 rounded-md"
        >
          <option value="">Sort by price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>

      {filteredProducts.length === 0 && !error && !loading && (
        <p className="text-center text-[#E0E1DD]/60 mt-8">No matching jersey found.</p>
      )}

      {loading && <ShowPreviewSkeleton loop={6} />}
      {error && <RetryButton refresh={() => setRefresh(prev => prev + 1)} text={'Failed to load Jerseys'} />}
    </section>
  );
};