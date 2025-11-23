import React, { useEffect, useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { RetryButton } from "../components/ErrorRetry";
import api from "../components/Api";
import { CartSkeleton } from "../components/SkeletonPlaceholders";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0)

  // Load cart from localStorage and sync with backend
  useEffect(() => {
    const rawCart = JSON.parse(localStorage.getItem("mira-cart")) || [];
    if (rawCart.length === 0) return;

    const ids = rawCart.map((item) => item.id).join(",");

    const getCartedJersey = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get(`/api/products/carted?ids=${ids}`);
        const jerseys = response.data.jersey;

        const merged = rawCart
          .map((cartItem) => {
            const live = jerseys.find((j) => j.id === cartItem.id);
            if (!live) return null;

            const correctedQty = Math.min(cartItem.quantity, live.available);

            return {
              ...live,
              quantity: correctedQty,
            };
          })
          .filter(Boolean);

        setCart(merged);
        persistCart(merged);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getCartedJersey();
  }, [refresh]);

  const updateQuantity = (id, amount) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.min(
          Math.max(1, item.quantity + amount),
          item.available
        );
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updated);
    persistCart(updated);
  };

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    persistCart(updated);
    window.dispatchEvent(new Event("cartUpdated"))
  };

  const persistCart = (cartData) => {
    const toStore = cartData.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem("mira-cart", JSON.stringify(toStore));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <section className="bg-[#0D1B2A] text-[#E0E1DD] px-4 sm:px-6 py-16 min-h-screen font-[Poppins]">
      <div className="text-center my-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#90E0EF] mb-4">Your Cart</h1>
        <p className="text-[#E0E1DD]/80 text-lg">Review and manage your selected jerseys below.</p>
        <div className="h-1 w-16 bg-gradient-to-r from-[#90E0EF] to-[#ADE8F4] rounded-full mx-auto mt-6" />
      </div>

      {loading && (
        <CartSkeleton />
      )}
      {error && (
        <RetryButton refresh={() => setRefresh(prev => prev + 1)} text={'Failed to load cart. Please try again.'} />
      )}

      {!loading && cart.length === 0 && !error && (
        <p className="text-center text-[#E0E1DD]/60 text-lg">Your cart is empty.</p>
      )}

      {cart.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="bg-[#1B263B] rounded-xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <img src={item.image_url} alt={item.club} className="w-24 h-24 object-cover rounded-md mx-auto sm:mx-0" />
              <div className="flex-1 mt-4 sm:mt-0">
                <h3 className="text-xl font-bold text-[#90E0EF]">{item.club}</h3>
                <p className="text-[#E0E1DD]/80 text-sm">Season: {item.season}</p>
                <p className="text-[#E0E1DD]/80 text-sm">Price: {item.price.toLocaleString()} ETB</p>
                <p className="text-[#E0E1DD]/60 text-sm">Available: {item.available}</p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-[#E0E1DD]/70">Pieces:</span>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-[#0D1B2A] border border-[#90E0EF]/30 text-white rounded-md hover:bg-[#132A3A]"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 py-1 bg-[#132A3A] rounded-md text-white border border-[#90E0EF]/20">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-[#0D1B2A] border border-[#90E0EF]/30 text-white rounded-md hover:bg-[#132A3A]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-4 self-end sm:self-center">
                <button onClick={() => handleRemove(item.id)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="text-center text-xl font-semibold text-[#90E0EF] mt-8">
            Total: {totalPrice.toLocaleString()} ETB
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/checkout')}
              className="bg-[#90E0EF] text-[#0D1B2A] px-6 py-3 rounded-md font-bold hover:bg-[#ADE8F4] transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};