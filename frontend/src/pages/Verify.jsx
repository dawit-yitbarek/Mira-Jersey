import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle, MdError, MdAutorenew } from 'react-icons/md';
import { useParams } from "react-router-dom";
import api from "../components/Api";

export default function VerifyPage() {
    const { tx_ref } = useParams();
    const [status, setStatus] = useState("loading");
    const [refresh, setRefresh] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                setStatus('loading')
                const res = await api.get(`/api/payment/verify/${tx_ref}`);
                setStatus(res.data.status);
            } catch (err) {
                console.error("Verification error:", err);
                setStatus("error");
            }
        };

        verifyPayment();
    }, [tx_ref, refresh]);

    const renderContent = () => {
        switch (status) {
            case "loading":
                return (
                    <>
                        <MdAutorenew className={`text-6xl mb-4 animate-spin text-[#F2613F]`} />
                        <p className="text-yellow-300">Verifying your payment...</p>
                    </>
                )
            case "success":
                return (
                    <div className="text-green-400 text-center">
                        <MdCheckCircle className={`text-6xl mb-4 text-green-500`} />
                        <h2 className="text-3xl font-bold mb-2"> Order Successful</h2>
                        <p className="text-white">Thank you! Your order has been placed successfully. Our delivery team will contact you.</p>

                        <div className="flex justify-center items-center gap-4 my-6">
                            <button
                                onClick={() => navigate('/')}
                                className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-800"
                            >
                                Home
                            </button>

                            <button
                                onClick={() => navigate('/contact#feedback')}
                                className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-800"
                            >
                                Give feedback
                            </button>
                        </div>
                    </div>
                );
            case "failed":
                return (
                    <div className="text-red-400 text-center">
                        <MdError className={`text-6xl mb-4 text-red-500`} />
                        <h2 className="text-3xl font-bold mb-2">Payment Failed</h2>
                        <p>Unfortunately, your payment was not successful. Please try again.</p>
                    </div>
                );
            case "exists":
                return (
                    <div className="text-blue-400 text-center">
                        <MdError className={`text-6xl mb-4 text-red-500`} />
                        <h2 className="text-3xl font-bold mb-2">Order Already Processed</h2>
                        <p>This order has already been confirmed previously.</p>
                    </div>
                );
            default:
                return (
                    <div className="text-red-500 text-center">
                        <MdError className={`text-6xl mb-4 text-red-500`} />
                        <h2 className="text-3xl font-bold mb-2">Something Went Wrong</h2>
                        <p>We couldn't verify your payment at the moment. Please try again.</p>
                        <button
                            onClick={() => setRefresh(prev => prev + 1)}
                            className={`px-6 py-2 mt-5 w-24 rounded-md font-semibold transition bg-[#90E0EF] text-[#0D1B2A]`}
                        >
                            Retry
                        </button>
                    </div>
                );
        }
    };

    return (
        <section className="min-h-screen bg-[#0D1B2A] text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full p-8 bg-[#1B263B] rounded-lg shadow-lg">
                {renderContent()}
            </div>
        </section>
    );
}