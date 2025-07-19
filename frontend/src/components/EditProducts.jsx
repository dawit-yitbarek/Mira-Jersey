import React, { useEffect, useState } from "react";
import { RetryButton } from './ErrorRetry';
import { EditProductsSkeleton } from "../components/SkeletonPlaceholders";
import UploadImage from './UploadImage';
import api from "./Api";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export default function EditProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refesh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false)
        const res = await api.get(`${BackendUrl}/api/products`);
        setProducts(res.data.products);
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      };
    };
    fetchProducts();
  }, [refesh]);

  const handleEdit = (product) => {
    setEditing(product.id);
    setUpdatedData({ ...product });
  };

  const handleSave = async () => {
    try {
      setEditLoading(true);
      setEditError(false)
      await api.put(`${BackendUrl}/api/products/${editing}`, updatedData);
      const updated = products.map((p) => (p.id === editing ? updatedData : p));
      setProducts(updated);
      setEditing(null);
    } catch (error) {
      setEditError(true);
    } finally {
      setEditLoading(false)
    };
  };

  const filteredProducts = products.filter(
    (item) =>
      item.club.toLowerCase().includes(search.trim().toLowerCase()) &&
      item.season.toLowerCase().includes(season.trim().toLowerCase())
  );

  return (
    <div>
      {/* Search Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by club name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1B263B] text-white px-4 py-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Search by season..."
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="bg-[#1B263B] text-white px-4 py-2 rounded-md"
        />
      </div>

      {/* Product Cards */}
      <div className="space-y-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#1B263B] rounded-lg p-4 flex flex-col sm:flex-row gap-4"
          >
            <img
              src={product.image_url}
              alt={product.club}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              {editing === product.id ? (
                <>
                  <label htmlFor="club">Club</label>
                  <input
                    id="club"
                    type="text"
                    value={updatedData.club}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, club: e.target.value })
                    }
                    className="bg-[#0D1B2A] text-white px-3 py-2 rounded w-full mb-2"
                  />
                  <label htmlFor="season">Season</label>
                  <input
                    id="season"
                    type="text"
                    value={updatedData.season}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, season: e.target.value })
                    }
                    className="bg-[#0D1B2A] text-white px-3 py-2 rounded w-full mb-2"
                  />
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    type="number"
                    value={updatedData.price}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        price: Number(e.target.value),
                      })
                    }
                    className="bg-[#0D1B2A] text-white px-3 py-2 rounded w-full mb-2"
                  />
                  <label htmlFor="available">Available Pieces</label>
                  <input
                    id="available"
                    type="number"
                    value={updatedData.available}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        available: Number(e.target.value),
                      })
                    }
                    className="bg-[#0D1B2A] mb-3 text-white px-3 py-2 rounded w-full"
                  />
                  <UploadImage setImageUrl={(url) => setUpdatedData({ ...updatedData, image_url: url })} />
                  <button
                    disabled={editLoading}
                    onClick={handleSave}
                    className="bg-[#90E0EF] text-[#0D1B2A] px-4 py-2 rounded mt-2"
                  >
                    {editLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    disabled={editLoading}
                    onClick={() => { setEditing(null) }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mx-5 mt-2"
                  >
                    Cancel
                  </button>
                  {editError && (
                    <p className="text-md text-red-400 py-3">Failed to edit product</p>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-[#90E0EF]">
                    {product.club} ({product.season})
                  </h3>
                  <p>Price: {product.price.toLocaleString()} ETB</p>
                  <p>Available: {product.available}</p>
                  <div className="mt-4 md:mt-0 md:ml-auto w-full md:w-auto flex justify-center md:justify-end">
                    <button
                      disabled={editLoading}
                      onClick={() => handleEdit(product)}
                      className="bg-[#90E0EF] text-[#0D1B2A] px-4 py-2 rounded-md font-semibold hover:bg-[#74cbe5] transition"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {loading && (<EditProductsSkeleton />)}

      {error && (
        <RetryButton refresh={() => setRefresh(prev => prev + 1)} text={'Failed to load products'} />
      )}

    </div>
  );
}