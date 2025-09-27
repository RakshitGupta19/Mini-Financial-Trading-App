import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));

    // fetch current watchlist
    API.get("/products/me/watchlist")
      .then((res) => setWatchlist(res.data.map((p) => p._id)))
      .catch(() => {});
  }, []);

  const inWatchlist = (id) => watchlist.includes(id);

  const addWatch = async (id) => {
    try {
      await API.post(`/products/${id}/watch`);
      setWatchlist((prev) => [...new Set([...prev, id])]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to watchlist");
    }
  };

  const removeWatch = async (id) => {
    try {
      await API.delete(`/products/${id}/watch`);
      setWatchlist((prev) => prev.filter((x) => x !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove from watchlist");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white shadow-md rounded-xl p-5 transition transform hover:scale-105 hover:shadow-xl"
              >
                <h3 className="font-bold text-xl text-gray-800 mb-2">{p.name}</h3>
                <p className="text-gray-600 mb-1">
                  Category: <span className="font-medium">{p.category}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  Price:{" "}
                  <span className="font-semibold text-green-600">₹{p.price}</span>
                </p>
                <p className="text-gray-600 mb-3">
                  P/E Ratio: <span className="font-medium">{p.peRatio}</span>
                </p>

                <div className="flex gap-2">
                  <Link
                    to={`/products/${p._id}`}
                    className="flex-1 inline-block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                  >
                    View Details
                  </Link>

                  {inWatchlist(p._id) ? (
                    <button
                      onClick={() => removeWatch(p._id)}
                      className="px-3 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300"
                    >
                      ★ Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => addWatch(p._id)}
                      className="px-3 py-2 rounded-lg text-sm bg-yellow-400 hover:bg-yellow-500"
                    >
                      ☆ Watch
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
