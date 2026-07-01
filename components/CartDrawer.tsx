"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import type { ICartItem } from "@/types/cart";

export default function CartDrawer() {
  const router = useRouter();
  const isOpen = useCartStore((state) => state.isCartOpen);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const cart =
    (useStore(useCartStore, (state) => state.cart) as ICartItem[]) || [];
  const subtotal =
    (useStore(useCartStore, (state) => state.getCartSubtotal) as number) || 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Blurred Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black backdrop-blur-sm"
          />

          {/* Core Drawer Panel Frame (Zara Rigidity Aesthetic) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-neutral-950 z-50 shadow-2xl border-l border-neutral-900 flex flex-col text-white"
          >
            {/* Header Area */}
            <div className="p-6 border-b border-neutral-900 flex justify-between items-center">
              <h2 className="text-base font-black uppercase tracking-widest">
                Shopping Bag ({cart.length})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Items Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-neutral-500 space-y-2">
                  <p className="text-sm font-bold uppercase tracking-wider">
                    Your bag is currently empty.
                  </p>
                  <p className="text-xs">
                    Fill it with performance tech gear from our catalog
                    collections.
                  </p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product._id}-${item.selectedSize}-${idx}`}
                    className="flex gap-4 pb-6 border-b border-neutral-900/60 items-start"
                  >
                    <div className="relative w-20 aspect-[3/4] bg-neutral-900 shrink-0 border border-neutral-900">
                      <Image
                        src={item.product.images?.[0] || "/placeholder.jpg"}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">
                        {item.product.brand}
                      </span>
                      <h4 className="text-xs font-black uppercase tracking-tight text-neutral-200 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs font-medium text-neutral-400">
                        Size:{" "}
                        <span className="text-white font-bold">
                          {item.selectedSize}
                        </span>
                      </p>

                      {/* Interactive Quantity Stepper Counter */}
                      <div className="flex items-center gap-1 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              item.selectedSize,
                              item.quantity - 1,
                            )
                          }
                          className="p-1 border border-neutral-800 hover:border-neutral-500 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              item.selectedSize,
                              item.quantity + 1,
                            )
                          }
                          className="p-1 border border-neutral-800 hover:border-neutral-500 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-full min-h-[90px]">
                      <span className="text-xs font-black">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() =>
                          removeFromCart(item.product._id, item.selectedSize)
                        }
                        className="text-neutral-500 hover:text-red-400 transition-colors pt-4"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary Container */}
            {cart.length > 0 && (
              <div className="p-6 bg-neutral-950 border-t border-neutral-900 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    Subtotal
                  </span>
                  <span className="text-xl font-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 font-medium">
                  Shipping, duties, and discount deductions are calculated at
                  checkout steps.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCartOpen(false); // 1. Close the drawer safely
                      router.push("/checkout"); // 2. Force Next.js to change the page programmatically
                    }}
                    className="block w-full text-center py-4 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-200"
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
