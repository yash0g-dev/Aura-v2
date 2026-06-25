"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { IProduct } from "@/types/product";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col bg-transparent cursor-pointer overflow-hidden"
    >
      {/* 3:4 Vertical Aspect Ratio Image Frame (Gymshark Style) */}
      <div className="relative aspect-[3/4] w-full bg-neutral-900 overflow-hidden border border-neutral-900">
        <Image
          src={
            product.images?.[0] ||
            "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600"
          }
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
        />

        {/* Dynamic Badge Minimal Overlay */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 px-2 py-1 text-[9px] font-black tracking-widest uppercase bg-black text-white border border-neutral-800 backdrop-blur-md">
            Limited Drop
          </span>
        )}

        {/* Quick Add Overlay on Hover (Zara Aesthetic) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/80 to-transparent hidden md:block">
          <span className="block w-full py-3 bg-white text-black text-center text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors">
            + View Details
          </span>
        </div>
      </div>

      {/* Item Details Metadata Block */}
      <div className="mt-4 flex flex-col gap-1 flex-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              {product.brand}
            </span>
            <h3 className="font-bold text-neutral-200 group-hover:text-white transition-colors text-sm tracking-tight line-clamp-1 uppercase">
              {product.name}
            </h3>
          </div>
          <p className="text-sm font-black text-white tracking-tight">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
