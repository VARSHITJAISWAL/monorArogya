import axios from "axios";

// Base URL for the backend API
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Automatically attach JWT to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;