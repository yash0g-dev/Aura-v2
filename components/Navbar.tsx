"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, ShoppingBag, Search, X } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/hooks/useStore";
import { ProfileDrawer } from "./ProfileDrawer";
import { AnimatePresence, motion } from "framer-motion";
import type { ICartItem } from "@/types/cart";

export default function Navbar() {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const user = useUserStore((state) => state.user);
  const cart = (useStore(useCartStore, (state) => state.cart) as ICartItem[]) || [];
  const setCartOpen = useCartStore((state) => state.setCartOpen);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery(""); // clear after search
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 z-50 px-6 h-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center relative">
          {/* 1. LEFT ASPECT */}
          <Link href="/" className="text-lg font-black uppercase tracking-[0.3em] hover:opacity-80 transition-opacity z-10">
            AURA
          </Link>

          {/* 2. MIDDLE ASPECT */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/shop?department=men" className="text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
              Men
            </Link>
            <Link href="/shop?department=women" className="text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
              Women
            </Link>
            <Link href="/shop?department=unisex" className="text-[11px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors flex items-center gap-1.5">
              <span className="h-1 w-1 bg-white rounded-full animate-pulse" />
              Drops
            </Link>
          </nav>

          {/* 3. RIGHT ASPECT */}
          <div className="flex items-center gap-5 z-10">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
            >
              {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>

            {/* Bag Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-neutral-400 hover:text-white transition-colors relative"
            >
              <ShoppingBag className="h-4 w-4" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-white text-black font-black text-[9px] rounded-full flex items-center justify-center scale-90">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User Profile Trigger */}
            <button
              onClick={() => setProfileOpen(true)}
              className="p-2 text-neutral-400 hover:text-white transition-colors relative"
            >
              <User className="h-4 w-4" />
              {user?.role === "admin" && (
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-white rounded-full animate-ping" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Dropdown Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed top-20 left-0 right-0 bg-neutral-950 border-b border-neutral-900 z-40 p-6"
          >
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative flex items-center">
              <Search className="h-4 w-4 text-neutral-500 absolute left-4" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH CATALOG..."
                className="w-full bg-neutral-900 border border-neutral-800 text-white px-12 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Drawer */}
      <AnimatePresence>
        {profileOpen && (
          <ProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
