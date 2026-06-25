import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

interface UserState {
  user: any | null;
  loading: boolean;
  isCheckingAuth: boolean;
  signup: (credentials: any, router: any) => Promise<void>;
  login: (credentials: any, router: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  isCheckingAuth: true, // Safeguards layout screen flickering on load

  // 1. User Registration Action
  signup: async (credentials, router) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post(
        "/api/auth/signup",
        credentials,
      );
      set({ user: response.data, loading: false });
      toast.success("Account created successfully!");
      router.push("/"); // Programmatically push user to home page on success
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Registration failed");
    }
  },

  // 2. User Authentication Login Action
  login: async (credentials, router) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/api/auth/login", credentials);
      set({ user: response.data, loading: false });
      toast.success("Welcome back!");
      router.push("/");
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  },

  // 3. User Termination Logout Action
  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.post("/api/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logged out successfully");
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  // 4. Persistence Active Session Handshake
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/api/auth/profile");
      set({ user: response.data, isCheckingAuth: false });
    } catch (error) {
      // Quietly fail authentication mapping if token is expired or missing
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
