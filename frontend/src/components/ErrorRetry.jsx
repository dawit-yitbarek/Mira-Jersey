import React from "react"

export function LoadingText({ text }) {
    return (
        <p className="text-center font-extrabold text-[#90E0EF] p-5">{text}</p>
    );
}

export function RetryButton({ text, refresh }) {

    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-center font-extrabold text-red-500 p-5">{text}</p>
            <button
                onClick={refresh}
                className={`px-6 py-2 w-24 rounded-md font-semibold transition bg-[#90E0EF] text-[#0D1B2A]`}
            >
                Retry
            </button>
        </div>
    );
}