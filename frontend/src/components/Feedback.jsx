import React, { useState } from 'react';
import api from "./Api";

const FeedbackComponent = () => {
    const [name, setName] = useState('');
    const [quote, setQuote] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating) {
            setError('Please select rating.');
            return;
        }

        try {
            setSuccess(false)
            setLoading(true)
            setError('')
            await api.post(`/api/feedback`, { name, quote, rating })
            setSuccess(true);
            setName('');
            setQuote('');
            setRating(0);
        } catch (error) {
            setError('Failed to submit feedback. please try again')
        } finally {
            setLoading(false)
        }
    };

    return (
        <div id='feedback' className="bg-[#1B263B] my-12 text-white p-6 rounded-2xl shadow-md max-w-lg">
            <h2 className="text-2xl font-bold py-3 text-[#90E0EF]">Leave Your Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#2C3E50] border border-[#90E0EF]/30 text-white placeholder:text-[#E0E1DD]/70 outline-none focus:ring-2 focus:ring-[#90E0EF]"
                    required
                />

                <textarea
                    placeholder="Your Message"
                    rows="4"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#2C3E50] border border-[#90E0EF]/30 text-white placeholder:text-[#E0E1DD]/70 outline-none focus:ring-2 focus:ring-[#90E0EF]"
                    required
                ></textarea>

                <div className="flex items-center gap-2">
                    <span className="text-[#90E0EF] font-medium">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-2xl ${star <= rating ? 'text-[#90E0EF]' : 'text-gray-500'
                                }`}
                        >
                            ★
                        </button>
                    ))}
                </div>

                {error && (
                    <p className="text-center font-md text-red-500">{error}</p>
                )}

                {success && (
                    <p className="text-center font-md text-green-500">
                        Feedback submited. Thank You for your feedback.
                    </p>
                )}

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full py-3 bg-[#00B4D8] text-[#0D1B2A] hover:bg-[#48CAE4] rounded-xl transition"
                >
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>
        </div>
    );
};

export default FeedbackComponent;
