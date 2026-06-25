import axios from "axios";

const axiosInstance = axios.create({
  // Fallback directly to your original backend port if the env variable isn't loaded yet
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true, // Crucial for transferring JWT HTTP-only cookies securely
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
