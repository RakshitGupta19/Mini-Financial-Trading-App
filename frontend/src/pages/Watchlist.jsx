import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    API.get("/products/me/watchlist")
      .then((res) => setWatchlist(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          My Watchlist
        </h2>

        {watchlist.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No items in your watchlist
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((p) => (
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
                <Link
                  to={`/products/${p._id}`}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
