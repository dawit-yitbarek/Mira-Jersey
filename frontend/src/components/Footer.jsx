import React from "react";
import { Facebook, Instagram, Mail, Phone, Send } from "lucide-react";
import { FaTelegramPlane, FaTiktok, FaEnvelope, FaPhoneAlt, FaInstagram, FaFacebook, FaMapMarker } from 'react-icons/fa';

export default function FooterSection() {

    return (
        <footer className="bg-[#0D1B2A] text-[#E0E1DD] px-6 py-10">
            <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3 text-center md:text-left">
                <div>
                    <h4 className="font-bold text-lg mb-2">Mira Jersey</h4>
                    <p className="text-sm text-[#E0E1DD]/80"> 100% authentic football jerseys delivered across Ethiopia. Online payment supported. </p>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-2">Contact</h4>
                    <ul className="text-sm text-[#E0E1DD]/80 space-y-1">
                        <li className="flex items-center justify-center md:justify-start gap-2">
                            <FaPhoneAlt size={16} /> <a href="tel:+251912345678"> +251 912 345 678</a>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-2">
                            <FaTelegramPlane size={16} /> <a href="https://t.me/MiraReus2"> Telegram: @MiraReus2</a>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-2">
                            <FaMapMarker size={16} /> Jemo 1, Addis Ababa
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-2">Follow Us</h4>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a href="https://www.tiktok.com" className="hover:text-[#90E0EF]">
                            <FaTiktok size={20} />
                        </a>
                        <a href="https://www.instagram.com" className="hover:text-[#90E0EF]">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://t.me" className="hover:text-[#90E0EF]">
                            <FaTelegramPlane size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-[#E0E1DD]/60 mt-8">
                © {new Date().getFullYear()} Mira Jersey. All rights reserved.
                <p className="text-xs text-[#E0E1DD]/40">
                    <a href="https://www.daviddeveloper.site" target="_blank">Developed by Dawit</a>
                </p>
            </div>
        </footer>
    );
};