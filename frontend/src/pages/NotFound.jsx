import React from "react";
import { Link } from "react-router-dom";
import "@fontsource/poppins";
import "@fontsource/bebas-neue";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D1B2A] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-[8rem] text-[#90E0EF] font-bold font-[bebas]">404</h1>
      <p className="text-2xl md:text-3xl text-[#E0E1DD] font-[bebas] mb-4">
        Oops! Page not found
      </p>
      <p className="text-[#E0E1DD]/70 max-w-md text-base md:text-lg mb-6 font-[Poppins]">
        The page you’re looking for doesn’t exist or has been moved. Try going back to the homepage.
      </p>
      <Link
        to="/"
        className="bg-[#0077B6] text-white px-6 py-3 rounded-xl hover:bg-[#0096c7] transition font-[Poppins]"
      >
        Go Home
      </Link>
    </div>
  );
}