import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // 1. NEW: Check for token and add header
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. Keep your existing logging
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Optional: Auto-logout on 401
    if (error.response && error.response.status === 401) {
      // You might want to dispatch a logout action here or clear storage
      // localStorage.removeItem('accessToken');
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
