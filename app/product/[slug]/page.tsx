"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";
import { PageLoader } from "@/components/PageLoader";

// Mock sizes mimicking Gymshark's sizing selection grids
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { currentProduct, isLoadingProduct, fetchProductBySlug } =
    useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (slug) fetchProductBySlug(slug as string);
  }, [slug, fetchProductBySlug]);

  if (isLoadingProduct || !currentProduct) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-24 pb-16 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* LEFT COLUMN: Gallery Panel (Sticky on large viewports like Zara/Nike) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 h-fit lg:sticky lg:top-24">
          {/* Thumbnails list */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible shrink-0">
            {currentProduct.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 aspect-[3/4] bg-neutral-900 border transition-colors duration-200 overflow-hidden ${
                  activeImageIndex === idx
                    ? "border-white"
                    : "border-neutral-800 hover:border-neutral-600"
                }`}
              >
                <Image
                  src={img}
                  alt={`${currentProduct.name} preview ${idx}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Visual Display Window */}
          <div className="relative w-full aspect-[3/4] bg-neutral-900 overflow-hidden border border-neutral-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={
                    currentProduct.images?.[activeImageIndex] ||
                    "/placeholder.jpg"
                  }
                  alt={currentProduct.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: Buying Workspace Details Frame */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
              {currentProduct.brand} / {currentProduct.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              {currentProduct.name}
            </h1>
            <p className="text-xl font-bold tracking-tight pt-2 text-white">
              ${currentProduct.price.toFixed(2)}
            </p>
          </div>

          {/* Sizing Engine Grid (Gymshark-Inspired layout structure) */}
          <div className="mt-10">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-3">
              <span>Select Size</span>
              <button className="text-neutral-400 underline hover:text-white transition-colors">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-4 text-sm font-bold transition-all duration-200 relative overflow-hidden ${
                    selectedSize === size
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-neutral-800 hover:border-neutral-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Aggressive Button Intersections */}
          <div className="mt-8 space-y-3">
            <button
              disabled={!selectedSize}
              onClick={() => {
                if (currentProduct && selectedSize) {
                  addToCart(currentProduct, selectedSize);
                }
              }}
              className={`w-full py-5 text-sm font-black uppercase tracking-widest transition-transform duration-150 active:scale-[0.99] ${
                selectedSize
                  ? "bg-white text-black hover:bg-neutral-200"
                  : "bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800"
              }`}
            >
              {selectedSize ? "Add to Bag" : "Select a Size"}
            </button>
          </div>

          {/* Editorial Content Descriptions Drop */}
          <div className="mt-12 border-t border-neutral-900 pt-6 space-y-4 text-sm text-neutral-400 leading-relaxed font-medium">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              Product Description
            </h3>
            <p>{currentProduct.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
