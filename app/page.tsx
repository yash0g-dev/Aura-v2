// app/page.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const { featuredProducts, isLoadingFeatured, fetchFeaturedProducts } =
    useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <main className="bg-neutral-950 text-white min-h-screen overflow-x-hidden">
      {/* 1. HERO SECTION (Nike/Zara Full-Screen Aesthetic) */}
      <section className="relative h-screen w-full flex flex-col justify-end px-6 md:px-12 pb-20 overflow-hidden">
        {/* Editorial High-Res Background Image */}
        <div className="absolute inset-0 bg-black">
          <Image
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1800&q=80"
            alt="Aura Performance Athletics"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex items-center gap-2 text-neutral-400 font-bold text-xs uppercase tracking-widest">
            <Activity className="h-3 w-3 text-white animate-pulse" />
            Aura Lab Drop // Vol. 01
          </div>

          {/* Aggressive Revealed Typography */}
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none select-none">
            OWN YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              ENVIRONMENT.
            </span>
          </h1>

          <p className="text-neutral-400 font-medium text-sm md:text-base max-w-md tracking-tight leading-relaxed">
            Engineered sportswear built to transition seamlessly between heavy
            high-performance output and minimal architectural aesthetics.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/shop/men/clothing"
              className="px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-200"
            >
              Shop Men
            </Link>
            <Link
              href="/shop/women/clothing"
              className="px-8 py-4 bg-transparent text-white border border-neutral-800 text-xs font-black uppercase tracking-widest hover:bg-neutral-900 hover:border-neutral-500 transition-colors duration-200"
            >
              Shop Women
            </Link>
          </div>
        </div>

        {/* Subtle Bottom Grid Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-900 mx-6 md:mx-12" />
      </section>

      {/* 2. DEPARTMENT TILES GRID (Zara Minimalism Structure) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Men Category Panel */}
          <Link
            href="/shop/men/clothing"
            className="relative aspect-[4/5] group overflow-hidden bg-neutral-900 border border-neutral-900"
          >
            <Image
              src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80"
              alt="Men's Collection"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center opacity-60 group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <h3 className="text-xl font-black uppercase tracking-tight">
                Men
              </h3>
              <p className="text-neutral-400 text-xs mt-1 uppercase tracking-widest font-bold flex items-center gap-1 group-hover:text-white transition-colors">
                Explore Drops{" "}
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </Link>

          {/* Women Category Panel */}
          <Link
            href="/shop/women/clothing"
            className="relative aspect-[4/5] group overflow-hidden bg-neutral-900 border border-neutral-900"
          >
            <Image
              src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80"
              alt="Women's Collection"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center opacity-60 group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <h3 className="text-xl font-black uppercase tracking-tight">
                Women
              </h3>
              <p className="text-neutral-400 text-xs mt-1 uppercase tracking-widest font-bold flex items-center gap-1 group-hover:text-white transition-colors">
                Explore Drops{" "}
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </Link>

          {/* Accessories / New Drops Panel */}
          <Link
            href="/shop/unisex/accessories"
            className="relative aspect-[4/5] group overflow-hidden bg-neutral-900 border border-neutral-900"
          >
            <Image
              src="https://images.unsplash.com/photo-1543459176-66122568537a?w=800&q=80"
              alt="Hardware Accessories"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center opacity-60 group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <h3 className="text-xl font-black uppercase tracking-tight">
                Technical Gear
              </h3>
              <p className="text-neutral-400 text-xs mt-1 uppercase tracking-widest font-bold flex items-center gap-1 group-hover:text-white transition-colors">
                Explore Drops{" "}
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. FEATURED LIVE PRODUCTS SLIDER (Gymshark Catalog Aesthetic) */}
      <section className="py-16 border-t border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                Curated Catalog Matrix
              </span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mt-1 text-white">
                Season Essentials
              </h2>
            </div>
            <Link
              href="/shop/unisex/clothing"
              className="text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors"
            >
              View All Items
            </Link>
          </div>

          {/* Catalog Conditional Grid Rendering */}
          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-neutral-900 w-full" />
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-neutral-900 text-neutral-500 text-xs font-bold uppercase tracking-widest">
              No live drops flagged as featured on database server cluster.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
