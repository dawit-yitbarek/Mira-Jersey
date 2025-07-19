import React, { useRef, useState, useEffect } from 'react';
import api from './Api';

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function UploadImage({ setImageUrl, resetTrigger, status }) {
    const [preview, setPreview] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            setPreview(null);
            setUploadSuccess(false);
            return;
        }

        setPreview(URL.createObjectURL(file)); // Show preview
        const formData = new FormData();
        formData.append('image', file);

        try {
            setUploadError(false);
            setUploading(true);
            const res = await api.post(`${BackendUrl}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImageUrl(res.data.imageUrl);
            setUploadSuccess(true);
        } catch (error) {
            fileInputRef.current.value = ''; // Reset file input
            setPreview(null); // Clear preview
            setUploadSuccess(false);
            setUploadError(true);
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }

    };

    useEffect(() => {
        setUploadError(false);
        setUploadSuccess(false);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

    }, [resetTrigger]);

    return (
        <div className="flex flex-col gap-2 mb-3">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={status}
                ref={fileInputRef}
                className="w-full max-w-md text-white bg-[#1B263B] border border-[#90E0EF]/30 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#90E0EF] file:text-[#0D1B2A] file:font-semibold file:text-sm hover:file:bg-[#ADE8F4] transition-all duration-300"
                required
            />
            {preview && uploadSuccess && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-48 h-32 object-cover rounded-lg mt-2 border border-[#2F2F2F]"
                />
            )}

            {uploading && (
                <p className="text-center text-[#FFCB74] text-md mt-2">Uploading image...</p>
            )}

            {uploadError && (
                <p className="text-center text-red-500 text-md mt-2">Failed to upload image</p>
            )}


        </div>
    );
};