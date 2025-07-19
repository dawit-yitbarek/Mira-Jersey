import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import "@fontsource/poppins";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [totalCart, setTotalCart] = useState(0)

    const getTotalCartItems = () => {
        const cart = JSON.parse(localStorage.getItem("mira-cart")) || [];
        setTotalCart(cart.length);
    };

    useEffect(() => {
        getTotalCartItems();
        window.addEventListener("cartUpdated", getTotalCartItems)
        const handleScroll = () => { setScrolled(window.scrollY > 10); };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("cartUpdated", getTotalCartItems);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 px-6 py-4 backdrop-blur-md transition-all duration-300 ${scrolled ? "bg-[#0D1B2A] shadow-md" : "bg-[#0D1B2A]/30"}`} >
            <div className="max-w-7xl mx-auto flex items-center justify-between text-[#E0E1DD]">

                {/* Brand */}
                <div className="text-2xl font-bold" style={{ fontFamily: '"Poppins", sans-serif' }}>
                    <a href="/"> Mira Jersey </a>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="hover:text-[#90E0EF] transition"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="/cart" className="relative group">
                        <ShoppingCart className="text-[#E0E1DD] hover:text-[#90E0EF] transition" size={30} />
                        {totalCart > 0 && (<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {totalCart}
                        </span>)}
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                    <a href="/cart" className="relative group mr-6">
                        <ShoppingCart className="text-[#E0E1DD] hover:text-[#90E0EF] transition" size={30} />
                        {totalCart > 0 && (<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {totalCart}
                        </span>)}
                    </a>
                    <button
                        className="md:hidden text-[#E0E1DD]"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
                <nav className="md:hidden mt-4 space-y-4 bg-[#0D1B2A] px-6 pb-4 rounded-md">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block text-lg text-white hover:text-[#90E0EF] transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
};