import React, { useState, useEffect } from "react";
import { RetryButton } from './ErrorRetry';
import api from "../components/Api";
import { EditProductsSkeleton } from "./SkeletonPlaceholders";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function DeleteProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refesh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await api.get(`${BackendUrl}/api/products`);
        setProducts(res.data.products);
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [refesh]);

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true)
      setDeleteError(false)
      await api.delete(`${BackendUrl}/api/products/${confirmId}`);
      setProducts(products.filter((item) => item.id !== confirmId));
      setConfirmId(null);
    } catch (err) {
      setDeleteError(true)
      console.error("Failed to delete", err);
    } finally {
      setDeleteLoading(false)
    }
  };

  const filtered = products.filter(
    (item) =>
      item.club.toLowerCase().includes(search.trim().toLowerCase()) &&
      item.season.toLowerCase().includes(season.trim().toLowerCase())
  );

  return (
    <div className="bg-[#0D1B2A] text-[#E0E1DD] p-2 rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#90E0EF]">Delete Jerseys</h2>

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1B263B] px-2 py-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Search by season..."
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="bg-[#1B263B] px-2 py-2 rounded-md"
        />
      </div>

      {filtered.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full bg-[#1B263B] p-4 rounded-lg"
        >
          <img
            src={item.image_url}
            alt={item.club}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#90E0EF]">{item.club}</h3>
            <p className="text-sm text-[#E0E1DD]/80">Season: {item.season}</p>
            <p className="text-sm text-[#E0E1DD]/80">Price: {item.price.toLocaleString()}</p>
          </div>
          <div className="w-full md:w-auto flex justify-end md:justify-normal">
            <button
              onClick={() => setConfirmId(item.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm w-full md:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Inline Confirmation Modal */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6 text-sm text-gray-700">
              Are you sure you want to delete this jersey? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                disabled={deleteLoading}
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                disabled={deleteLoading}
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
            {deleteError && (
              <p className="text-md text-red-600 py-3">Failed to delete jersey</p>
            )}
          </div>
        </div>
      )}

      {loading && (
        <EditProductsSkeleton />
      )}

      {error && (
        <RetryButton refresh={() => setRefresh(prev => prev + 1)} text={'Failed to load products'} />
      )}

    </div>
  );
};