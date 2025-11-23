import React, { useState, useEffect } from "react";
import AddProducts from "../components/AddProducts";
import EditProducts from "../components/EditProducts";
import DeleteProducts from "../components/DeleteProducts";
import OrderTracking from '../components/OrderTracking';
import Signin from "../components/Signin";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("add");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, []);

  if (!admin) return <Signin />;

  return (
    <section className="bg-[#0D1B2A] text-[#E0E1DD] min-h-screen py-10 px-6 font-[Poppins]">
      {activeTab !== 'orders' && (
        <h1 className="text-3xl font-bold text-[#90E0EF] mb-6 mt-12 text-center">Admin Panel</h1>
      )}

      {/* Toggle Buttons */}
      <div className={`flex flex-wrap justify-center gap-4 ${activeTab === 'orders' ? 'mt-10' : 'mb-10'}`}>
        {["add", "edit", "delete", "orders"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full sm:w-auto px-6 py-2 rounded-md font-semibold transition text-center ${activeTab === tab
              ? "bg-[#90E0EF] text-[#0D1B2A]"
              : "bg-[#1B263B] text-[#E0E1DD] hover:bg-[#233143]"
              }`}
          >
            {tab === "add" && "➕ Add"}
            {tab === "edit" && "✏️ Edit"}
            {tab === "delete" && "🗑️ Delete"}
            {tab === "orders" && "🏍 Orders"}
          </button>
        ))}
      </div>


      {/* Tab Content */}
      <div>
        {activeTab === "add" && <AddProducts />}
        {activeTab === "edit" && <EditProducts />}
        {activeTab === "delete" && <DeleteProducts />}
        {activeTab === "orders" && <OrderTracking />}
      </div>
    </section>
  );
}