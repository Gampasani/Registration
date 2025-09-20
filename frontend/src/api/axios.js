// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://registration-backend-m51u.onrender.com/api", // 👈 Render backend URL
});

// ✅ Automatically add token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
