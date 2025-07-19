import React, { useState } from "react";
import UploadImage from "../components/UploadImage";
import axios from "axios";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function AddProducts() {
  const [products, setProducts] = useState([
    { club: "", season: "", price: "", available: "", image_url: "" },
  ]);

  const [addSuccess, setAddSuccess] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(false);
  const [imageReset, setImageReset] = useState(0);

  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addRow = () => {
    setProducts([...products, { club: "", season: "", price: "", available: "", image_url: "" }]);
  };

  const removeRow = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAddLoading(true);
      setAddError(false)
      await axios.post(`${BackEndUrl}/api/products`, { jerseys: products });
      setAddSuccess(true)
      setProducts([{ club: "", season: "", price: "", available: "", image_url: "" }]);
      setImageReset(prev => prev + 1)
    } catch (err) {
      setAddError(true)
    } finally {
      setAddLoading(false)
    }
  };

  return (
    <section className="max-w-7xl bg-[#0D1B2A] text-white p-8 font-[Poppins]">
      <h1 className="text-3xl font-bold text-[#90E0EF] mt-12 mb-6">Add Multiple Jerseys</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-[#1B263B] p-6 rounded-xl shadow-md space-y-5 border border-[#90E0EF]/10"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#90E0EF]">
                Jersey #{index + 1}
              </h2>
              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Club Name"
                value={item.club}
                onChange={(e) => handleChange(index, "club", e.target.value)}
                className="bg-[#2C3E50] border border-[#90E0EF]/30 text-white placeholder:text-[#E0E1DD]/70 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#90E0EF]"
                required
              />
              <input
                type="text"
                placeholder="Season (e.g. 2022/2023)"
                value={item.season}
                onChange={(e) => handleChange(index, "season", e.target.value)}
                className="bg-[#2C3E50] border border-[#90E0EF]/30 text-white placeholder:text-[#E0E1DD]/70 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#90E0EF]"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
                className="bg-[#2C3E50] border border-[#90E0EF]/30 text-white placeholder:text-[#E0E1DD]/70 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#90E0EF]"
                required
              />
              <input
                type="number"
                placeholder="Available Pieces"
                value={item.available}
                onChange={(e) => handleChange(index, "available", e.target.value)}
                className="bg-[#2C3E50] border border-[#90E0EF]/30 text-white placeholder:text-[#E0E1DD]/70 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#90E0EF]"
                required
              />
            </div>

            <UploadImage
              setImageUrl={(url) => handleChange(index, "image_url", url)}
              resetTrigger={imageReset}
              status={addLoading}
            />
          </div>
        ))}

        {/* Submission messages */}
        {addError && (
          <p className="text-lg text-red-500 font-medium text-center">
            Failed to add jerseys
          </p>
        )}
        {addSuccess && (
          <p className="text-lg text-green-500 font-medium text-center">
            Jerseys added successfully!
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            disabled={addLoading}
            type="button"
            onClick={addRow}
            className="bg-[#90E0EF] text-[#0D1B2A] px-6 py-2 rounded font-semibold hover:bg-[#ADE8F4] transition"
          >
            + Add Row
          </button>
          <button
            disabled={addLoading}
            type="submit"
            className="bg-[#00B4D8] text-[#0D1B2A] px-6 py-2 rounded font-semibold hover:bg-[#48CAE4] transition"
          >
            {addLoading ? "Submitting..." : "Submit All"}
          </button>
        </div>
      </form>
    </section>
  );
}