import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import Navbar from "./components/Navbar";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const listener = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  return (
    <BrowserRouter>
      {token && <Navbar onLogout={() => setToken(null)} />}
      <Routes>
        {/* Public routes */}
        <Route
          path="/signup"
          element={<Signup onAuth={() => setToken(localStorage.getItem("token"))} />}
        />
        <Route
          path="/login"
          element={<Login onAuth={() => setToken(localStorage.getItem("token"))} />}
        />

        {/* Protected routes */}
        {token && (
          <>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </>
        )}

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to={token ? "/products" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
