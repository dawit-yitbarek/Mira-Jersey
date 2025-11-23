import React, { useEffect, useState } from "react";
import api from "../components/Api";
import { CheckoutSkeleton } from "../components/SkeletonPlaceholders";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    const loadCart = async () => {
      const raw = JSON.parse(localStorage.getItem("mira-cart")) || [];
      if (raw.length === 0) return setLoading(false);
      const ids = raw.map((item) => item.id).join(",");

      try {
        const res = await api.get(`/api/products/carted?ids=${ids}`);
        const jerseys = res.data.jersey;

        const merged = raw
          .map((item) => {
            const live = jerseys.find((j) => j.id === item.id);
            return live ? { ...live, quantity: item.quantity } : null;
          })
          .filter(Boolean);

        setCart(merged);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePay = async () => {
    if (!form.name || !form.phone || !form.address) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setPaymentLoading(true)
      setError(false)
      const res = await api.post(`/api/payment/initiate`, {
        price: totalPrice,
        name: form.name,
        phone: form.phone,
        address: form.address,
        cart: cart.map(({ id, quantity }) => ({ id, quantity })),
      });

      window.location.href = res.data.checkout_url; // Redirect to Chapa payment
    } catch (err) {
      console.error(err);
      setPaymentLoading(false)
      setError("Failed to process payment.");
    }
  };

  return (
    <section className="bg-[#0D1B2A] min-h-screen text-[#E0E1DD] px-6 py-16 font-[Poppins]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#90E0EF]">
          Checkout
        </h1>

        {loading ? (
          <CheckoutSkeleton />
        ) : cart.length === 0 ? (
          <p className="text-center text-[#E0E1DD]/60">Your cart is empty.</p>
        ) : (
          <div className="space-y-8">
            {/* User Info Form */}
            <div className="bg-[#1B263B] p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-[#ADE8F4] mb-4">
                Customer Info
              </h2>
              <div className="space-y-4">
                <input
                  spellCheck={false}
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#2C3E50] text-white px-4 py-2 rounded-md outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#2C3E50] text-white px-4 py-2 rounded-md outline-none"
                  required
                />
                <textarea
                  spellCheck={false}
                  placeholder="Delivery Address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-[#2C3E50] text-white px-4 py-2 rounded-md outline-none"
                  required
                />
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-[#1B263B] p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-[#ADE8F4] mb-4">
                Order Summary
              </h2>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between text-sm border-b border-white/10 pb-2"
                  >
                    <span>
                      {item.club} ({item.season}) x {item.quantity}
                    </span>
                    <span>{(item.price * item.quantity).toLocaleString()} ETB</span>
                  </li>
                ))}
              </ul>
              <div className="text-right text-lg mt-4 font-bold text-[#90E0EF]">
                Total: {totalPrice.toLocaleString()} ETB
              </div>
            </div>

            <div className="text-center">
              {error && (
                <p className="text-red-400 text-sm my-2">{error}</p>
              )}
              <button
                disabled={paymentLoading}
                onClick={handlePay}
                className="bg-[#90E0EF] text-[#0D1B2A] px-8 py-3 rounded-md font-semibold hover:bg-[#ADE8F4] transition"
              >
                {paymentLoading ? 'Redirecting...' : 'Pay with Chapa'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};