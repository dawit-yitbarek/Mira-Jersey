import React from "react";
import FeedbackComponent from '../components/Feedback';
import { FaTelegramPlane, FaTiktok, FaEnvelope, FaPhoneAlt, FaInstagram, FaFacebook, FaMapMarker } from 'react-icons/fa';
import "@fontsource/poppins";

export default function ContactPage() {
    return (

        <section className="bg-[#0D1B2A] text-[#E0E1DD] px-6 py-16 font-[Poppins] min-h-screen">

            {/* Intro Section */}
            <div className="text-center my-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#90E0EF] mb-4">Get In Touch With Mira Jersey</h1>
                <p className="text-[#E0E1DD]/80 max-w-2xl mx-auto text-lg"> We'd love to hear from you! Connect with us through social media or contact us directly with your questions or orders. </p>
                <div className="h-1 w-16 bg-gradient-to-r from-[#90E0EF] to-[#ADE8F4] rounded-full mx-auto mt-6" />
            </div>

            {/* Main Contact Section */}
            <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
                {/* Follow Us */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#90E0EF] mb-2">Follow Us</h2>
                    <div className="flex items-start gap-4">
                        <FaInstagram className="text-[#90E0EF] mt-1" size={19} />
                        <a href="https://instagram.com/mirajersey" target="_blank" rel="noopener noreferrer" className="hover:text-[#90E0EF]">
                            instagram.com/mirajersey
                        </a>
                    </div>
                    <div className="flex items-start gap-4">
                        <FaTelegramPlane className="text-[#90E0EF] mt-1" size={19} />
                        <a href="https://t.me/mirajersey" target="_blank" rel="noopener noreferrer" className="hover:text-[#90E0EF]">
                            t.me/mirajersey
                        </a>
                    </div>
                    <div className="flex items-start gap-4">
                        <FaTiktok className="text-[#90E0EF] mt-1" size={19} />
                        <a href="https://www.tiktok.com/@mirajersey" target="_blank" rel="noopener noreferrer" className="hover:text-[#90E0EF]">
                            tiktok.com/@mirajersey
                        </a>
                    </div>
                </div>

                {/* Contact Us */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#90E0EF] mb-2">Contact Us</h2>
                    <div className="flex items-start gap-4">
                        <FaTelegramPlane className="text-[#90E0EF] mt-1" size={19} />
                        <p>@MiraReus2</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <FaPhoneAlt className="text-[#90E0EF] mt-1" size={19} />
                        <p>+251 912 345 678</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <FaMapMarker className="text-[#90E0EF] mt-1" size={19} />
                        <div>
                            <p>Addis Ababa, Ethiopia</p>
                            <a
                                href="https://goo.gl/maps/samplelink"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#E0E1DD]/80 hover:text-[#90E0EF]"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Section */}
            <FeedbackComponent />
        </section>

    );
};