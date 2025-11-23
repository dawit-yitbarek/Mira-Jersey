import React, { useState, useEffect } from "react";
import { RetryButton } from './ErrorRetry';
import { OrdersSkeleton } from "./SkeletonPlaceholders";
import api from "../components/Api";

const OrderDate = (date) => {
    const d = new Date(date)
    const formattedDate = d.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const formattedTime = d.toLocaleTimeString("en-us", {
        hour: "numeric",
        minute: "2-digit"
    })

    return `${formattedDate} at ${formattedTime}`;
};

export default function PendingOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refesh, setRefresh] = useState(0);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmError, setConfirmError] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(false)
                const response = await api.get(`/api/orders/pending`);
                setOrders(response.data);
            } catch (error) {
                setError(true)
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchOrders();
    }, [refesh]);

    const handleConfirm = async (orderId) => {
        try {
            setConfirmLoading(true);
            setConfirmError(false);
            await api.put(`/api/orders/${orderId}`);
            setOrders((prev) =>
                prev.filter((o) =>
                    o.order_id !== orderId
                )
            );
        } catch (error) {
            setConfirmError(true)
            console.error("Error confirming delivery:", error);
        } finally {
            setConfirmLoading(false);
        }
    };

    return (
        <>

            {orders.map((order) => (
                <div
                    key={order.order_id}
                    className="bg-[#1B263B] p-3 rounded-2xl shadow-md mb-8 border border-[#132A3A]"
                >
                    <div className="mb-4 text-sm leading-6 space-y-1">
                        <div>
                            <span className="text-[#90E0EF] font-semibold">Customer:</span>{" "}
                            {order.customer_name}
                        </div>
                        <div>
                            <span className="text-[#90E0EF] font-semibold">Phone:</span>{" "}
                            {order.phone}
                        </div>
                        <div>
                            <span className="text-[#90E0EF] font-semibold">Address:</span>{" "}
                            {order.address}
                        </div>
                        <div>
                            <span className="text-[#90E0EF] font-semibold">Total:</span>{" "}
                            {order.total_amount.toLocaleString()} ETB
                        </div>
                        <div>
                            <span className="text-[#90E0EF] font-semibold">Status:</span>{" "}
                            {order.status}
                        </div>
                        <div>
                            <span className="text-[#90E0EF] font-semibold">Ordered at:</span>{" "}
                            {OrderDate(order.created_at)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {order.items.map((item) => (
                            <div
                                key={item.jersey_id}
                                className="flex items-center gap-4 bg-[#132A3A] p-4 rounded-xl border border-[#90E0EF]/20"
                            >
                                <img
                                    src={item.image}
                                    alt={item.jersey_name}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div>
                                    <div className="font-medium text-[#90E0EF]">
                                        {item.jersey_name}
                                    </div>
                                    <div className="text-sm text-[#E0E1DD]/70">
                                        Qty: {item.quantity}
                                    </div>
                                    <div className="text-sm text-[#E0E1DD]/70">
                                        Price: {item.jersey_price.toLocaleString()} ETB
                                    </div>
                                    <div className="text-sm text-[#E0E1DD]/70">
                                        Season: {item.season}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-right">
                        <button
                            disabled={confirmLoading}
                            onClick={() => handleConfirm(order.order_id)}
                            className="mt-6 px-6 py-2 bg-[#90E0EF] text-[#0D1B2A] rounded-md font-bold hover:bg-[#ADE8F4] transition"
                        >
                            {confirmLoading ? 'Confirming...' : 'Confirm Delivered'}
                        </button>
                    </div>
                    {confirmError && (<p className="text-center font-bold text-red-500 p-5">Failed to confirm order</p>
                    )}
                </div>
            ))}

            {orders.length === 0 && !loading && !error && (
                <p className="text-center font-extrabold text-[#90E0EF] p-5">There is no pending order</p>
            )}

            {loading && (
                <OrdersSkeleton pending={true} />
            )}

            {error && (
                <RetryButton refresh={() => setRefresh(prev => prev + 1)} text={'Failed to load pending orders'} />
            )}
        </>
    );
};