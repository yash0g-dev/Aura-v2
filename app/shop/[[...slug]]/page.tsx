"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { SlidersHorizontal, Check, Loader2, ShoppingCart } from "lucide-react";
import type { IProduct } from "@types/product.ts";
import { toast } from "react-hot-toast";
import { useCartStore } from "@/store/useCartStore";

export default function IntegratedShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToCart = useCartStore((state) => state.addToCart);

  // Core UI & Data UI States
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter Target State Repositories
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [hideOutOfStock, setHideOutOfStock] = useState<boolean>(false);

  // 1. URL Parameter Parser: Reads '?department=men,women' on initial page mount or link clicks
  useEffect(() => {
    const deptParam = searchParams.get("department");
    const catParam = searchParams.get("category");

    if (deptParam) {
      setSelectedDepartments(deptParam.split(","));
    } else {
      setSelectedDepartments([]);
    }

    if (catParam) {
      setSelectedCategories(catParam.split(","));
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  // 2. Fetch Master Inventory directly from your Express backend cluster
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/api/products");
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      toast.error("Failed to sync live product catalog parameters");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 3. Central URL State Synchronization Engine
  const syncFiltersToURL = (departments: string[], categories: string[]) => {
    const params = new URLSearchParams();

    if (departments.length > 0) params.set("department", departments.join(","));
    if (categories.length > 0) params.set("category", categories.join(","));

    const queryString = params.toString();
    router.push(queryString ? `/shop?${queryString}` : "/shop", {
      scroll: false,
    });
  };

  // Multiselect Box Toggles
  const handleToggleDepartment = (dept: string) => {
    const updated = selectedDepartments.includes(dept)
      ? selectedDepartments.filter((d) => d !== dept)
      : [...selectedDepartments, dept];
    setSelectedDepartments(updated);
    syncFiltersToURL(updated, selectedCategories);
  };

  const handleToggleCategory = (cat: string) => {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(updated);
    syncFiltersToURL(selectedDepartments, updated);
  };

  // 4. Robust Real-Time Processing Filter (With string scrubbing defenses)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Clean up database strings using lowercase and whitespace trimming
      const productDept = product.department?.trim().toLowerCase() || "";
      const productCat = product.category?.trim().toLowerCase() || "";

      // Department multi-select validation check
      if (
        selectedDepartments.length > 0 &&
        !selectedDepartments.includes(productDept)
      ) {
        return false;
      }

      // Category multi-select validation check
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(productCat)
      ) {
        return false;
      }

      // Pricing threshold verification
      if (product.price > maxPrice) return false;

      // Inventory pool validation check
      if (hideOutOfStock && product.stock <= 0) return false;

      return true;
    });
  }, [
    products,
    selectedDepartments,
    selectedCategories,
    maxPrice,
    hideOutOfStock,
  ]);

  const resetFilters = () => {
    setSelectedDepartments([]);
    setSelectedCategories([]);
    setMaxPrice(1000);
    setHideOutOfStock(false);
    router.push("/shop");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-white animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-28 pb-16 px-4 md:px-8 max-w-[1600px] mx-auto overflow-hidden">
      {/* CONTROL ROW HEADER */}
      <div className="border-b border-neutral-900 pb-5 mb-8 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">
            System Inventory Grid
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tighter mt-0.5">
            Catalog Showcase
          </h1>
        </div>

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 border border-neutral-900 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest bg-black/20 hover:border-neutral-500 transition-colors"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {isFilterOpen ? "Compress Filters" : "Expand Filters"}
        </button>
      </div>

      {/* CORE DISPLAY WORKSPACE ROW */}
      <div className="flex gap-0 md:gap-8 items-start w-full relative">
        {/* 🗜️ DYNAMIC SIDEBAR CONTROLLER */}
        <motion.div
          animate={{
            width: isFilterOpen ? "280px" : "0px",
            opacity: isFilterOpen ? 1 : 0,
          }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="shrink-0 overflow-hidden sticky top-28 bg-neutral-950 max-h-[calc(100vh-140px)] pr-1 select-none hidden md:block"
        >
          <div className="w-[280px] border-r border-neutral-900 pr-6 space-y-8 pb-8">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">
                Refinement Tuning
              </span>
              <button
                onClick={resetFilters}
                className="text-[9px] text-neutral-500 underline uppercase font-bold hover:text-white transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Department Filter Section */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                Segment Block
              </h4>
              <div className="flex flex-col space-y-2">
                {["men", "women", "unisex"].map((dept) => {
                  const active = selectedDepartments.includes(dept);
                  return (
                    <button
                      key={dept}
                      onClick={() => handleToggleDepartment(dept)}
                      className="flex items-center gap-3 text-left group"
                    >
                      <div
                        className={`h-3.5 w-3.5 border flex items-center justify-center transition-colors ${active ? "bg-white border-white text-black" : "border-neutral-800 bg-neutral-900 group-hover:border-neutral-500"}`}
                      >
                        {active && <Check className="h-2.5 w-2.5 stroke-[4]" />}
                      </div>
                      <span
                        className={`text-xs uppercase tracking-wider font-bold transition-colors ${active ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}
                      >
                        {dept}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter Section */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                Classification Category
              </h4>
              <div className="flex flex-col space-y-2">
                {["clothing", "shoes", "accessories"].map((cat) => {
                  const active = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => handleToggleCategory(cat)}
                      className="flex items-center gap-3 text-left group"
                    >
                      <div
                        className={`h-3.5 w-3.5 border flex items-center justify-center transition-colors ${active ? "bg-white border-white text-black" : "border-neutral-800 bg-neutral-900 group-hover:border-neutral-500"}`}
                      >
                        {active && <Check className="h-2.5 w-2.5 stroke-[4]" />}
                      </div>
                      <span
                        className={`text-xs uppercase tracking-wider font-bold transition-colors ${active ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}
                      >
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  Max Valuation Ceiling
                </h4>
                <span className="font-mono text-xs text-neutral-300 font-bold">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-white bg-neutral-900 h-1 appearance-none cursor-pointer"
              />
            </div>

            {/* Out of stock filter */}
            <button
              onClick={() => setHideOutOfStock(!hideOutOfStock)}
              className="flex items-center gap-3 text-left group pt-2"
            >
              <div
                className={`h-3.5 w-3.5 border flex items-center justify-center transition-colors ${hideOutOfStock ? "bg-white border-white text-black" : "border-neutral-800 bg-neutral-900 group-hover:border-neutral-500"}`}
              >
                {hideOutOfStock && <Check className="h-2.5 w-2.5 stroke-[4]" />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Exclude Depleted Stock
              </span>
            </button>
          </div>
        </motion.div>

        {/* 🏬 INTERACTIVE PRODUCT DISPLAY GRID */}
        <div className="flex-1 w-full">
          {filteredProducts.length === 0 ? (
            <div className="h-[40vh] border border-dashed border-neutral-900 flex flex-col items-center justify-center space-y-2">
              <p className="text-xs text-neutral-500 font-black uppercase tracking-widest">
                No matching items inventory vectors
              </p>
              <button
                onClick={resetFilters}
                className="text-[10px] bg-white text-black font-black uppercase tracking-wider px-3 py-1.5"
              >
                Reset Catalog
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${isFilterOpen ? "lg:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"} gap-x-4 gap-y-10 transition-all duration-300`}
            >
              {filteredProducts.map((product) => (
                <div key={product._id} className="group space-y-3 relative">
                  <div className="relative w-full aspect-[3/4] bg-neutral-900 border border-neutral-900 overflow-hidden">
                    <img
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.stock > 0 && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <button
                          onClick={() => {
                            addToCart(product, "M");
                            toast.success("Added to shopping bag Matrix");
                          }}
                          className="w-full bg-white text-black py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                        >
                          Quick Add <ShoppingCart className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    {product.stock <= 0 && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="border border-neutral-800 text-neutral-500 font-black text-[9px] uppercase tracking-widest px-3 py-1 bg-black/40">
                          Depleted Allocation
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-start text-xs px-1">
                    <div className="space-y-0.5 truncate max-w-[78%]">
                      <h3 className="font-black uppercase truncate text-neutral-200 group-hover:text-white transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                        {product.department} // {product.category}
                      </p>
                    </div>
                    <span className="font-mono text-neutral-300 font-bold">
                      ${product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
