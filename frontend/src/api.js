import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-financial-trading-app.onrender.com/api",
});

// If token is stored in localStorage, send it automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
