"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import axiosInstance from "@/lib/axios";
import { 
  BarChart3, Package, PlusSquare, ToggleLeft, ToggleRight, 
  Trash2, DollarSign, Users, ShoppingCart, Loader2, Percent 
} from "lucide-react";
import { toast } from "react-hot-toast";

type TabType = "analytics" | "inventory" | "create";

export default function AdminDashboardPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  
  const [activeTab, setActiveTab] = useState<TabType>("analytics");
  const [loading, setLoading] = useState(true);
  
  // State Repositories
  const [analytics, setAnalytics] = useState<any>(null);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form State for Creating New Technical Products
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    department: "men",
    category: "clothing",
    subCategory: "",
    brand: "Aura",
    stock: "",
  });
  const [productFile, setProductFile] = useState<File | null>(null);

  // 1. Core Gatekeeper security check
  useEffect(() => {
    if (!user || user.role.trim() !== "admin") {
      toast.error("Access Denied: Administrative Clearance Required");
      router.push("/");
    }
  }, [user, router]);

  // 2. Fetch Operational Analytics
  const fetchAnalytics = useCallback(async () => {
    try {
      const { data } = await axiosInstance.post("/api/analytics");
      setAnalytics(data.analyticsData);
      setSalesData(data.dailySalesData || []);
    } catch (err) {
      toast.error("Failed to load ecosystem analytics");
    }
  }, []);

  // 3. Fetch Master Inventory List
  const fetchInventory = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/api/products");
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      toast.error("Failed to fetch product inventory matrix");
    }
  }, []);

  // Centralized Initialization Engine
  useEffect(() => {
    if (user?.role.trim() === "admin") {
      Promise.all([fetchAnalytics(), fetchInventory()]).finally(() => setLoading(false));
    }
  }, [user, fetchAnalytics, fetchInventory]);

  // 4. Mutation Action: Toggle Product Highlight Frame State
  const handleToggleFeatured = async (id: string) => {
    setActionLoading(id);
    try {
      await axiosInstance.patch(`/api/products/${id}`);
      toast.success("Product metadata visibility state shifted");
      await fetchInventory();
    } catch (err) {
      toast.error("Failed to update visibility flags");
    } finally {
      setActionLoading(null);
    }
  };

  // 5. Mutation Action: Discharge Product from Database
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Confirm complete structural discharge of this product matrix?")) return;
    setActionLoading(id);
    try {
      await axiosInstance.delete(`/api/products/${id}`);
      toast.success("Product eliminated from live servers");
      await fetchInventory();
    } catch (err) {
      toast.error("Deletion sequence rejected by backend cluster");
    } finally {
      setActionLoading(null);
    }
  };

  // 6. Mutation Action: Create & Upload New Product Definition via Multipart Form
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFile) {
      toast.error("Please select a physical image file to upload");
      return;
    }

    try {
      // Package payload inside standard multipart Form structures for processing via Multer
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("department", newProduct.department);
      formData.append("category", newProduct.category);
      formData.append("subCategory", newProduct.subCategory);
      formData.append("brand", newProduct.brand);
      formData.append("image", productFile); 

      await axiosInstance.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("New product specs deployed live to Cloudinary!");
      
      // Clean data states completely
      setNewProduct({
        name: "", description: "", price: "", department: "men", 
        category: "clothing", subCategory: "", brand: "Aura", stock: ""
      });
      setProductFile(null);
      
      await fetchInventory();
      setActiveTab("inventory");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit product specifications");
    }
  }; 

  if (loading || !user || user.role.trim() !== "admin") {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-white animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-24 pb-16 px-4 md:px-12 max-w-7xl mx-auto">
      
      {/* Title Infrastructure Area */}
      <div className="border-b border-neutral-900 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Administrative Node Workspace</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mt-1">Control Hub</h1>
        </div>
        
        {/* Sub-Navigation Tabs Menu */}
        <div className="flex border border-neutral-900 p-1 bg-black/40">
          {(["analytics", "inventory", "create"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 ${
                activeTab === tab ? "bg-white text-black" : "text-neutral-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB SUB-PANEL CONTENT RENDERING SWITCHES */}
      
      {/* AREA A: ANALYTICS INTEL REPORTING VIEW */}
      {activeTab === "analytics" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Metadata Performance Cards Row (Updated to handle 5 responsive blocks matching your backend dictionary) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-neutral-950 border border-neutral-900 p-5 space-y-2">
              <div className="flex justify-between text-neutral-500"><span className="text-[10px] font-bold uppercase tracking-widest">Gross Revenue</span><DollarSign className="h-4 w-4" /></div>
              <p className="text-2xl font-black tracking-tight">${analytics?.totalRevenue?.toLocaleString() || "0"}</p>
            </div>
            <div className="bg-neutral-950 border border-neutral-900 p-5 space-y-2">
              <div className="flex justify-between text-neutral-500"><span className="text-[10px] font-bold uppercase tracking-widest">Orders Handled</span><ShoppingCart className="h-4 w-4" /></div>
              <p className="text-2xl font-black tracking-tight">{analytics?.totalSales?.toLocaleString() || "0"}</p>
            </div>
            <div className="bg-neutral-950 border border-neutral-900 p-5 space-y-2">
              <div className="flex justify-between text-neutral-500"><span className="text-[10px] font-bold uppercase tracking-widest">Avg Order Value</span><Percent className="h-4 w-4" /></div>
              <p className="text-2xl font-black tracking-tight">${analytics?.averageOrderValue?.toLocaleString() || "0"}</p>
            </div>
            <div className="bg-neutral-950 border border-neutral-900 p-5 space-y-2">
              <div className="flex justify-between text-neutral-500"><span className="text-[10px] font-bold uppercase tracking-widest">Catalog Items</span><Package className="h-4 w-4" /></div>
              <p className="text-2xl font-black tracking-tight">{analytics?.products?.toLocaleString() || "0"}</p>
            </div>
            <div className="bg-neutral-950 border border-neutral-900 p-5 space-y-2">
              <div className="flex justify-between text-neutral-500"><span className="text-[10px] font-bold uppercase tracking-widest">User Base</span><Users className="h-4 w-4" /></div>
              <p className="text-2xl font-black tracking-tight">{analytics?.user?.toLocaleString() || "0"}</p>
            </div>
          </div>

          {/* Minimalist 7-Day Performance Spark Chart */}
          <div className="bg-neutral-950 border border-neutral-900 p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">7-Day Transaction Performance Metrics</h3>
            <div className="h-48 flex items-end gap-3 pt-4 border-b border-neutral-900">
              {salesData.length === 0 ? (
                <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest pb-4 mx-auto">No transaction vectors tracked in current date framework window.</p>
              ) : (
                salesData.map((day: any, index: number) => {
                  const maxAmount = Math.max(...salesData.map(d => d.sales || 1));
                  const percentageHeight = `${(day.sales / maxAmount) * 100}%`;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                      {/* Tooltip Overlay tracking revenue numbers smoothly */}
                      <div className="absolute -top-8 bg-white text-black font-black text-[9px] px-2 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity tracking-wider pointer-events-none z-10">
                        Rev: ${day.revenue} // Sales: {day.sales}
                      </div>
                      <div style={{ height: percentageHeight }} className="w-full bg-neutral-900 group-hover:bg-white transition-colors duration-200 min-h-[4px]" />
                      <span className="text-[9px] font-bold text-neutral-600 mt-2 block tracking-tight uppercase truncate max-w-full">
                        {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🔵 AREA B: MASTER INVENTORY CONTROLLER DATAGRID */}
      {activeTab === "inventory" && (
        <div className="border border-neutral-900 bg-neutral-950/40 overflow-x-auto animate-fadeIn">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-neutral-900 text-neutral-500 text-[10px] uppercase font-bold tracking-widest">
                <th className="p-5">Product Metadata Definition</th>
                <th className="p-5">Department Structure</th>
                <th className="p-5">Price Matrix</th>
                <th className="p-5">Stock Pool</th>
                <th className="p-5 text-center">Featured status</th>
                <th className="p-5 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 text-xs font-semibold text-neutral-300">
              {products.length === 0 ? (
                <tr><td colSpan={6} className="p-12 text-center text-neutral-600 font-bold uppercase tracking-widest">No active inventory listings loaded on cluster array servers.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-neutral-900/30 transition-colors">
                    <td className="p-5 flex items-center gap-4">
                      <div className="relative w-8 aspect-[3/4] bg-neutral-900 shrink-0 border border-neutral-800 overflow-hidden">
                        <img src={product.images?.[0] || "/placeholder.jpg"} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate max-w-[180px]"><p className="font-black uppercase text-white truncate">{product.name}</p><p className="text-[10px] text-neutral-500 font-medium tracking-tight truncate">{product.brand}</p></div>
                    </td>
                    <td className="p-5 uppercase text-[10px] tracking-wider text-neutral-400">{product.department} // {product.category}</td>
                    <td className="p-5 font-bold text-white">${product.price?.toFixed(2)}</td>
                    <td className="p-5 font-mono text-neutral-400">{product.stock} units</td>
                    <td className="p-5">
                      <button 
                        disabled={actionLoading === product._id}
                        onClick={() => handleToggleFeatured(product._id)}
                        className="mx-auto block text-neutral-400 hover:text-white transition-colors disabled:opacity-30"
                      >
                        {product.isFeatured ? <ToggleRight className="h-5 w-5 text-white" /> : <ToggleLeft className="h-5 w-5 text-neutral-700" />}
                      </button>
                    </td>
                    <td className="p-5 text-right">
                      <button
                        disabled={actionLoading === product._id}
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-2 disabled:opacity-30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/*  AREA C: INVENTORY CREATE SPECIFICATION FORM SHEETS */}
      {activeTab === "create" && (
        <form onSubmit={handleCreateProduct} className="max-w-xl bg-neutral-950 border border-neutral-900 p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Initialize New Catalog Specifications</h3>
            <p className="text-[11px] text-neutral-600 mt-1 font-medium">Input core manufacturing data values directly down to database fields.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Item Core Title</label>
              <input
                type="text" required value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-500 text-white transition-colors rounded-none"
                placeholder="AURA COMPRESSION TOP"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Description Script</label>
              <input
                type="text" required value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-500 text-white transition-colors rounded-none"
                placeholder="Engineered warp-knit composition framework built for thermal stabilization."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
           <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Brand</label>
              <input
                type="text" required value={newProduct.brand}
                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-500 text-white transition-colors rounded-none"
                placeholder="Engineered warp-knit composition framework built for thermal stabilization."
              />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Price Matrix ($)</label>
                <input
                  type="number" required min="0" step="0.01" value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-500 text-white transition-colors rounded-none font-mono"
                  placeholder="85.00"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Available Stock Units</label>
                <input
                  type="number" required min="0" value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-500 text-white transition-colors rounded-none font-mono"
                  placeholder="120"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Department</label>
                <select
                  value={newProduct.department}
                  onChange={(e) => setNewProduct({ ...newProduct, department: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-500 text-white transition-colors rounded-none uppercase font-bold text-[11px] tracking-wider"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-500 text-white transition-colors rounded-none uppercase font-bold text-[11px] tracking-wider"
                >
                  <option value="clothing">Clothing</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Sub Category</label>
                <input
                  type="text" required value={newProduct.subCategory}
                  onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-500 text-white transition-colors rounded-none text-xs"
                  placeholder="compression-tops"
                />
              </div>
            </div>

            {/* 📸 THE NEW IMAGE INPUT NODE SECTOR */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
                Manufacturing Image File Upload
              </label>
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) setProductFile(e.target.files[0]);
                }}
                className="w-full bg-neutral-900 border border-neutral-850 px-4 py-3 text-xs focus:outline-none file:mr-4 file:py-1.5 file:px-3 file:border-0 file:bg-white file:text-black file:text-[10px] file:font-black file:uppercase file:cursor-pointer text-neutral-500 font-mono transition-colors hover:file:bg-neutral-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Deploy Specifications Online <PlusSquare className="h-4 w-4" />
          </button>
        </form>
      )}

    </main>
  );
}
