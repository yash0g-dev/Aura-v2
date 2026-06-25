"use client";

import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950 select-none">
      {/* Brand Wordmark with a luxury tracking expanding animation */}
      <motion.h1
        initial={{ letterSpacing: "0.2em", opacity: 0.4 }}
        animate={{ letterSpacing: "0.4em", opacity: 1 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="text-2xl font-black uppercase text-white pl-[0.4em] tracking-[0.4em]"
      >
        Aura
      </motion.h1>

      {/* Industrial minimalist horizontal progress indicator bar */}
      <div className="mt-6 w-32 h-[1px] bg-neutral-900 relative overflow-hidden">
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 bottom-0 w-1/2 bg-white"
        />
      </div>
    </div>
  );
}
