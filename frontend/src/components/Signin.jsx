import React, { useState } from "react";
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

export default function Signin() {
    const [password, setPassword] = useState("");
    const [signingIn, setSigningIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSigningIn(true);
        if (password === adminPassword) {
            localStorage.setItem("isAdmin", "true");
            window.location.reload();
        } else {
            alert("Incorrect Password");
            setSigningIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0D1B2A] to-[#1B263B] flex items-center justify-center px-6 py-12">
            <div className="bg-[#24344D] text-[#E0E1DD] p-8 rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-extrabold text-[#90E0EF] text-center mb-6">Admin Signin</h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <label htmlFor="password" className="text-lg font-medium text-[#E0E1DD]">
                        Enter admin password to access the admin page
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#1B263B] text-white p-4 rounded-md border border-[#90E0EF] focus:outline-none focus:ring-2 focus:ring-[#90E0EF]"
                        placeholder="Admin password"
                        required
                    />
                    <button
                        type="submit"
                        disabled={signingIn}
                        className="bg-[#90E0EF] text-[#1B263B] py-3 px-6 rounded-md mt-6 hover:bg-[#ADE8F4] transition"
                    >
                        {signingIn ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};