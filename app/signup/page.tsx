"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const signup = useUserStore((state) => state.signup);
  const loading = useUserStore((state) => state.loading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Credentials match error: Passwords mismatch");
      return;
    }

    // Pass down clean credentials destructured payload to your core store
    const { name, email, password } = formData;
    await signup({ name, email, password }, router);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      
      {/* LEFT ASPECT: High-Contrast Visual Panel (Hidden on Mobile) */}
      <div className="hidden lg:block lg:col-span-6 relative bg-neutral-900 h-full border-r border-neutral-900">
        <Image
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&q=80"
          alt="Aura running infrastructure visual"
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-50 mix-blend-luminosity grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-12 flex flex-col justify-end">
          <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">Aura Athletics Matrix</span>
          <p className="text-xl font-bold tracking-tight mt-2 max-w-sm text-neutral-300">
            Join the collective. Track orders and access specialized performance engineering collections.
          </p>
        </div>
      </div>

      {/* RIGHT ASPECT: Form Configuration Workspace */}
      <div className="col-span-1 lg:col-span-6 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 pb-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          <div>
            <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Registration</span>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-1">Create Account</h1>
            <p className="text-sm text-neutral-400 mt-2">Initialize your global profile vectors within our cluster.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Full Name</label>
              <input
                type="text"
                required
                disabled={loading}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-none px-4 py-4 text-sm tracking-tight text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors disabled:opacity-50"
                placeholder="Alex Mercer"
              />
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Password</label>
                <input
                  type="password"
                  required
                  disabled={loading}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-none px-4 py-4 text-sm tracking-tight text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Confirm</label>
                <input
                  type="password"
                  required
                  disabled={loading}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-none px-4 py-4 text-sm tracking-tight text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:cursor-not-allowed border border-transparent disabled:border-neutral-800"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Register Intel <ArrowRight className="h-3.5 w-3.5" /></>
              )}
            </button>
          </form>

          <div className="border-t border-neutral-900 pt-6 text-center">
            <p className="text-xs text-neutral-500">
              Already initialized?{" "}
              <Link href="/login" className="text-white font-bold underline hover:text-neutral-300 transition-colors pl-1">
                Log in here
              </Link>
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}
