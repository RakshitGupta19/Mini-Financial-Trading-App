import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);

  // ✅ function to fetch wallet balance
  const fetchBalance = async () => {
    try {
      const { data } = await API.get("/auth/me");
      setBalance(data.wallet.balance);
    } catch {
      setBalance(null);
    }
  };

  useEffect(() => {
    fetchBalance();
    // ✅ listen for wallet updates anywhere in the app
    window.addEventListener("wallet-updated", fetchBalance);
    return () => window.removeEventListener("wallet-updated", fetchBalance);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/products"
            className="text-2xl font-bold tracking-wide text-green-400 hover:text-green-300 transition-colors"
          >
            FinTrade
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            <Link to="/products" className="hover:text-green-400 transition-colors">
              Products
            </Link>
            <Link to="/portfolio" className="hover:text-green-400 transition-colors">
              Portfolio
            </Link>
            <Link to="/watchlist" className="hover:text-green-400 transition-colors">
              Watchlist
            </Link>
          </div>

          {/* Wallet + Logout */}
          <div className="flex items-center gap-4">
            {balance !== null && (
              <span className="text-sm text-gray-300">
                💰 Balance:{" "}
                <span className="font-semibold text-green-400">₹{balance}</span>
              </span>
            )}
            <button
              onClick={logout}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
