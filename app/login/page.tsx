"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const loading = useUserStore((state) => state.loading);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData, router);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      
      {/* LEFT ASPECT: High-Contrast Visual Panel (Hidden on Mobile) */}
      <div className="hidden lg:block lg:col-span-6 relative bg-neutral-900 h-full border-r border-neutral-900">
        <Image
          src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1000&q=80"
          alt="Aura training environment visual"
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-50 mix-blend-luminosity grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-12 flex flex-col justify-end">
          <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">Aura Core Infrastructure</span>
          <p className="text-xl font-bold tracking-tight mt-2 max-w-sm text-neutral-300">
            Access your personalized human matrix workspace panel.
          </p>
        </div>
      </div>

      {/* RIGHT ASPECT: Crisp Form Workspace */}
      <div className="col-span-1 lg:col-span-6 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          <div>
            <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Authentication</span>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-1">Welcome Back</h1>
            <p className="text-sm text-neutral-400 mt-2">Enter your identity vectors to synchronize credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
              <input
                type="email"
                required
                disabled={loading}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-none px-4 py-4 text-sm tracking-tight text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors disabled:opacity-50"
                placeholder="identity@domain.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Password</label>
                <Link href="#" className="text-[10px] uppercase font-bold text-neutral-500 hover:text-white underline tracking-wider transition-colors">Forgot?</Link>
              </div>
              <input
                type="password"
                required
                disabled={loading}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-none px-4 py-4 text-sm tracking-tight text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors disabled:opacity-50"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:cursor-not-allowed border border-transparent disabled:border-neutral-800"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="h-3.5 w-3.5" /></>
              )}
            </button>
          </form>

          <div className="border-t border-neutral-900 pt-6 text-center">
            <p className="text-xs text-neutral-500">
              New to the ecosystem?{" "}
              <Link href="/signup" className="text-white font-bold underline hover:text-neutral-300 transition-colors pl-1">
                Create an account
              </Link>
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}
