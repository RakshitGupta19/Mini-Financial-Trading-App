import { useState } from "react";
import API from "../api";

export default function KYC() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [idImage, setIdImage] = useState(null);
  const [kyc, setKyc] = useState(null);

  const submitKYC = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("pan", pan);
    if (idImage) formData.append("idImage", idImage);
    try {
      const { data } = await API.post("/kyc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setKyc(data.kyc);
      alert("✅ KYC submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "❌ KYC submission failed");
    }
  };

  const fetchKYC = async () => {
    try {
      const { data } = await API.get("/kyc");
      setKyc(data.kyc);
    } catch {
      alert("Could not fetch KYC details");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🧾 KYC Verification
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Complete your KYC to unlock full access
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            PAN Number
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your PAN"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Upload ID Proof
          </label>
          <input
            className="w-full text-sm"
            type="file"
            onChange={(e) => setIdImage(e.target.files[0])}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={submitKYC}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
          >
            Submit KYC
          </button>
          <button
            onClick={fetchKYC}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
          >
            Fetch KYC
          </button>
        </div>

        {kyc && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-bold text-gray-800 mb-2">✅ KYC Info:</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(kyc, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
