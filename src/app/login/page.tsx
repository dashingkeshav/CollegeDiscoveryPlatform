"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, GraduationCap, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/colleges");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-20 px-4">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_24px_64px_rgba(79,70,229,0.15)] border border-white p-8 md:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl font-black text-foreground">Welcome back</h1>
            <p className="text-foreground/50 text-sm mt-1 font-medium">Sign in to your EduNexus account</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 rounded-2xl px-4 py-3 text-sm font-semibold mb-6 flex items-center gap-2">
              ⚠️ {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-xs font-black text-foreground/40 uppercase tracking-widest mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/30 focus:bg-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none font-semibold text-foreground text-sm placeholder:text-foreground/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-black text-foreground/40 uppercase tracking-widest mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/30 focus:bg-white rounded-xl pl-11 pr-12 py-3.5 focus:outline-none font-semibold text-foreground text-sm placeholder:text-foreground/30 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-primary to-accent text-white font-black py-4 rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 disabled:opacity-60 transition-all flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-foreground/50 font-medium mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">Create one free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
