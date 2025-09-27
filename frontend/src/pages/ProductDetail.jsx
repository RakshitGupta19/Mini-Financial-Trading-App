import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [units, setUnits] = useState(1);

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const buyProduct = async () => {
    try {
      await API.post("/tx/buy", { productId: id, units });
      alert("✅ Purchase successful!");
      // 🔥 Notify Navbar to refresh wallet balance
      window.dispatchEvent(new Event("wallet-updated"));
    } catch (err) {
      alert(err.response?.data?.message || "❌ Purchase failed");
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 pt-20">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-3">{product.name}</h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Price:</span>{" "}
          <span className="text-green-600 font-bold">₹{product.price}</span>
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">P/E Ratio:</span> {product.peRatio}
        </p>

        {/* 📈 Price History Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={product.history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2">
          <label className="block text-gray-700 font-medium mb-1">Units to Buy</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
            type="number"
            min="1"
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
          />
          <button
            onClick={buyProduct}
            className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            🛒 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
