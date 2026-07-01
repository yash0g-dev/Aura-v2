import { create } from "zustand";
import axiosInstance from "@/lib/axios"; // Double check your axios path alias matches
import { toast } from "react-hot-toast";
import type { IProduct } from "@/types/product";

interface ProductState {
  currentProduct: IProduct | null;
  isLoadingProduct: boolean;
  fetchProductBySlug: (slug: string) => Promise<void>;

  featuredProducts: IProduct[];
  isLoadingFeatured: boolean;
  fetchFeaturedProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  currentProduct: null,
  isLoadingProduct: false,
  featuredProducts: [],
  isLoadingFeatured: false,

  fetchProductBySlug: async (slug: string) => {
    set({ isLoadingProduct: true });
    try {
      const response = await axiosInstance.get<IProduct>(
        `/api/products/single/${slug}`,
      );
      // const fetchedProduct = response.data?.product || response.data;
      //
      // if (!fetchedProduct || typeof fetchedProduct !== "object") {
      //   throw new Error("Invalid payload format received from backend server");
      // }
      //
      set({ currentProduct: response.data, isLoadingProduct: false });
    } catch (error: any) {
      console.error("Error inside fetchProductBySlug execution phase:", error);
      toast.error(
        error.response?.data?.message || "Failed to load product details",
      );
      set({ currentProduct: null, isLoadingProduct: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ isLoadingFeatured: true });
    try {
      const response = await axiosInstance.get<IProduct[]>(
        "/api/products/featured",
      );
      // const extractedProducts = Array.isArray(response.data)
      //   ? response.data
      //   : response.data?.products || response.data?.featuredProducts || [];
      //
      set({ featuredProducts: response.data, isLoadingFeatured: false });
    } catch (error: any) {
      console.error(
        "Error inside fetchFeaturedProducts execution phase:",
        error,
      );
      toast.error("Failed to load featured products");
      set({ featuredProducts: [], isLoadingFeatured: false });
    }
  },
}));
