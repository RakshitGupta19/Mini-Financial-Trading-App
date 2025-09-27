import { useEffect, useState } from "react";
import API from "../api";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    API.get("/portfolio/me").then((res) => setPortfolio(res.data));
  }, []);

  if (!portfolio)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          📊 My Portfolio
        </h2>

        {/* Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow-lg rounded-xl p-5 text-center">
            <p className="text-gray-500 text-sm">Total Invested</p>
            <p className="text-2xl font-bold text-blue-600">₹{portfolio.invested}</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-5 text-center">
            <p className="text-gray-500 text-sm">Current Value</p>
            <p className="text-2xl font-bold text-green-600">₹{portfolio.current}</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-5 text-center">
            <p className="text-gray-500 text-sm">Returns</p>
            <p
              className={`text-2xl font-bold ${
                portfolio.returns >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              ₹{portfolio.returns}
            </p>
          </div>
        </div>

        {/* Investments List */}
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Holdings</h3>

          {portfolio.positions.length === 0 ? (
            <p className="text-gray-500 text-center">No investments yet</p>
          ) : (
            <div className="space-y-4">
              {portfolio.positions.map((pos) => (
                <div
                  key={pos.product._id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-lg text-gray-800">
                      {pos.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Category: {pos.product.category}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-sm">
                    <p>
                      <span className="font-medium">Units:</span> {pos.units}
                    </p>
                    <p>
                      <span className="font-medium">Invested:</span> ₹{pos.invested}
                    </p>
                    <p>
                      <span className="font-medium">Current:</span> ₹{pos.current}
                    </p>
                    <p>
                      <span className="font-medium">P/E:</span> {pos.product.peRatio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
