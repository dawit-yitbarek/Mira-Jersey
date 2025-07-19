import React, { useState } from "react";

const addToCart = (id, quantity = 1) => {
  if (!id) return;
  const rawCart = JSON.parse(localStorage.getItem("mira-cart")) || [];
  const existing = rawCart.find((item) => item.id === id);
  if (existing) {
    existing.quantity = Math.max(1, existing.quantity + quantity);
  } else {
    rawCart.push({ id, quantity: Math.max(1, quantity) });
  }
  localStorage.setItem("mira-cart", JSON.stringify(rawCart));
  window.dispatchEvent(new Event("cartUpdated"))
}


export default function ProductCard({ id, club, season, price, available, image_url }) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    addToCart(id, 1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  }

  return (
    <div className="bg-[#1B263B] rounded-xl p-4 shadow-md hover:scale-[1.02] transition">
      <img
        src={image_url}
        alt={club}
        className="w-full h-auto object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold text-[#90E0EF]">{club}</h3>
      <p className="text-[#E0E1DD]/80">Season: {season}</p>
      <p className="text-[#E0E1DD]/80">Price: {price.toLocaleString()} ETB</p>
      <p className="text-[#E0E1DD]/60 text-sm">Available: {available} pcs</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-[#90E0EF] text-[#0D1B2A] px-4 py-2 rounded-md font-semibold transition-all duration-300 hover:bg-[#ADE8F4] hover:shadow-lg hover:-translate-y-0.5">
        Add to Cart
      </button>

      {showSuccess && (
        <div className="mt-2 text-md font-bold text-green-400 animate-fade-in-out">
          Added to Cart!
        </div>
      )}
    </div>
  );
};