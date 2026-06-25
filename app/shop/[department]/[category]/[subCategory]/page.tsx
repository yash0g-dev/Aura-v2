"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function CategoryPage() {
  // Pull parameters smoothly from your folder naming structures
  const { department, category, subCategory } = useParams();

  return (
    <main className="min-h-screen pt-24 px-6 md:px-12 bg-neutral-950">
      {/* Editorial Category Header */}
      <div className="border-b border-neutral-900 pb-6 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
          {department} / {category}
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black uppercase tracking-tighter mt-1"
        >
          {subCategory?.toString().replace("-", " ")}
        </motion.h1>
      </div>

      {/* Grid Placeholder for items fetched via your Product Store */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12"></div>
    </main>
  );
}
