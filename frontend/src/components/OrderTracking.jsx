import React, { useState } from "react";
import DeliveredOrders from './DeliveredOrders';
import PendingOrders from "./PendingOrders";

export default function OrderTracking() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <section className="bg-[#0D1B2A] text-[#E0E1DD] px-4 sm:px-6 py-16 min-h-screen font-[Poppins]">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#90E0EF] mb-4">
            Admin Order Tracking
          </h1>
          <p className="text-[#E0E1DD]/80 text-lg">
            {activeTab === "pending" ? "Pending Orders" : "Delivered Orders"}
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-[#90E0EF] to-[#ADE8F4] rounded-full mx-auto mt-6" />

          {/* Toggle Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-2 rounded-md font-semibold transition ${activeTab === "pending"
                ? "bg-[#90E0EF] text-[#0D1B2A]"
                : "bg-[#132A3A] text-[#E0E1DD]"
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("delivered")}
              className={`px-6 py-2 rounded-md font-semibold transition ${activeTab === "delivered"
                ? "bg-[#90E0EF] text-[#0D1B2A]"
                : "bg-[#132A3A] text-[#E0E1DD]"
                }`}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-[#1B263B] rounded-2xl shadow-lg">
          {activeTab === "pending" ? <PendingOrders /> : <DeliveredOrders />}
        </div>

      </div>
    </section>
  );
}