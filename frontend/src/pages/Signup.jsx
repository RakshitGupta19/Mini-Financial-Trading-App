import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [idImage, setIdImage] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const { data } = await API.post("/auth/signup", { email, password });
      localStorage.setItem("token", data.token);
      if (onAuth) onAuth();

      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("pan", pan);
      if (idImage) form.append("idImage", idImage);

      await API.post("/kyc", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Signup & KYC completed!");
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign up to start exploring
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Create a password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">PAN Number</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter PAN"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Upload ID Proof
          </label>
          <input
            type="file"
            className="w-full text-sm"
            onChange={(e) => setIdImage(e.target.files?.[0] || null)}
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
