"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import {
  X,
  ShoppingBag,
  User as UserIcon,
  ShieldAlert,
  LogOut,
  Activity,
} from "lucide-react";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const router = useRouter();
  const { user, logout } = useUserStore();

  const handleLogoutClick = async () => {
    onClose();
    await logout();
    router.push("/login");
  };

  // Framer Motion Animation Settings
  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: { type: "tween", duration: 0.4, ease: "easeInOut" },
    },
    open: {
      x: 0,
      transition: { type: "tween", duration: 0.4, ease: "easeInOut" },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden">
      {/* 1. Blurred Backdrop Cover Layer */}
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={overlayVariants}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* 2. Full-Screen Slide Layout Frame */}
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={sidebarVariants}
        className="absolute inset-y-0 right-0 w-full sm:max-w-md bg-neutral-950 border-l border-neutral-900 shadow-2xl p-6 md:p-10 flex flex-col justify-between text-white"
      >
        {/* TOP LAYOUT CONTROL AREA */}
        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-white animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-neutral-400">
                Profile Console
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Identity Vector Profiles Details Container */}
          {user ? (
            <div className="space-y-1 pb-6 border-b border-neutral-900">
              <p className="text-2xl font-black uppercase tracking-tighter truncate">
                {user.name}
              </p>
              <p className="text-xs text-neutral-400 truncate">{user.email}</p>

              {/* Conditional Role Clearance Badge Tag Mapping */}
              {user.role === "admin" ? (
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-black font-black text-[9px] uppercase tracking-widest select-none">
                  <ShieldAlert className="h-3 w-3" /> System Admin Clearance
                </div>
              ) : (
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 text-neutral-400 border border-neutral-800 font-bold text-[9px] uppercase tracking-widest select-none">
                  Verified Client Account
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 py-6 border-b border-neutral-900">
              <p className="text-sm text-neutral-400">
                No session configuration profile vectors active.
              </p>
              <Link
                href="/login"
                onClick={onClose}
                className="block w-full py-3 bg-white text-black text-center text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                Sign In Matrix
              </Link>
            </div>
          )}

          {/* INTERNAL MENU ITEMS LINK MAPPING GRID */}
          {user && (
            <nav className="flex flex-col space-y-4">
              <Link
                href="/orders"
                onClick={onClose}
                className="group flex items-center justify-between py-3 border-b border-neutral-900 hover:border-neutral-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    My Order Records
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors font-mono">
                  LOGS // 01
                </span>
              </Link>

              <Link
                href="/profile/settings"
                onClick={onClose}
                className="group flex items-center justify-between py-3 border-b border-neutral-900 hover:border-neutral-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <UserIcon className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Account Parameter Settings
                  </span>
                </div>
                <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors font-mono">
                  VECTORS
                </span>
              </Link>

              {/* 🛡️ CRUCIAL CONDITION: Dynamic Admin Command Panel Insertion Gate */}
              {user.role.trim() === "admin" && (
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="group flex items-center justify-between py-3.5 px-3 bg-neutral-900 border border-neutral-850 hover:border-neutral-500 transition-colors bg-gradient-to-r from-neutral-900 to-black"
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="h-4 w-4 text-white animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest text-white">
                      Admin Control Hub
                    </span>
                  </div>
                  <span className="text-[9px] bg-white text-black font-black px-1.5 py-0.5 uppercase tracking-wider">
                    ROOT
                  </span>
                </Link>
              )}
            </nav>
          )}
        </div>

        {/* BOTTOM TERMINATE ACTION FOOTER BLOCK */}
        {user && (
          <div className="pt-6 border-t border-neutral-900">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-center gap-2 py-4 bg-neutral-900 hover:bg-red-950/20 text-neutral-400 hover:text-red-400 border border-neutral-850 hover:border-red-900/40 text-xs font-black uppercase tracking-widest transition-all duration-200"
            >
              <LogOut className="h-4 w-4" /> Terminate Global Session
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
