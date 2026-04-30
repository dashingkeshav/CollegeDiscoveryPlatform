"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Users, BookOpen, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative pt-12 pb-24">
      {/* ── Massive Animated Blobs (Filling the center) ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[0%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-10%] w-[55%] h-[55%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '-5s' }} />
        <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-emerald-500/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '-10s' }} />
        <div className="absolute bottom-[10%] right-[0%] w-[45%] h-[45%] bg-rose-500/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '-15s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/30 shadow-sm mb-12"
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-black bg-linear-to-r from-primary via-purple-600 to-rose-500 bg-clip-text text-transparent uppercase tracking-wider">
            Revolutionizing College Search
          </span>
        </motion.div>

        {/* ── Main Heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.8] text-slate-900"
        >
          Your Future, <br />
          <span className="relative inline-block mt-6">
            <span className="relative z-10 bg-linear-to-r from-primary via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              Decoded.
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.2 }}
              className="absolute -bottom-6 left-0 h-6 bg-primary/10 rounded-full blur-xl -z-10"
            />
          </span>
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-700/80 max-w-3xl mx-auto mb-20 font-semibold leading-relaxed"
        >
          Discover top-tier Indian Engineering Colleges through data-driven insights. 
          Compare placements, fees, and predict your admission chances with AI.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-10 mb-40"
        >
          <Link href="/colleges" className="btn-premium group w-full sm:w-auto flex items-center justify-center gap-3 text-xl scale-110 shadow-2xl">
            Explore Colleges <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link href="/predictor" className="px-12 py-5 rounded-3xl font-black text-slate-800 bg-white/20 backdrop-blur-2xl border border-white/50 shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all w-full sm:w-auto flex items-center justify-center gap-3 text-xl">
            Try Predictor <Target className="w-7 h-7 text-accent" />
          </Link>
        </motion.div>

        {/* ── Real Stats / Features ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-48">
          {[
            { icon: <BookOpen className="w-10 h-10" />, label: "Top IITs & NITs", value: "10+", color: "from-blue-500/20 to-blue-600/20 text-blue-600" },
            { icon: <Target className="w-10 h-10" />, label: "Avg. Placement Success", value: "95%+", color: "from-emerald-500/20 to-emerald-600/20 text-emerald-600" },
            { icon: <Users className="w-10 h-10" />, label: "Personalized Support", value: "AI", color: "from-purple-500/20 to-purple-600/20 text-purple-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
              className="glass-card p-12 rounded-[4rem] flex flex-col items-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              <div className={`w-20 h-20 rounded-3xl bg-linear-to-br flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 ${stat.color} shadow-lg`}>
                {stat.icon}
              </div>
              <h3 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">{stat.value}</h3>
              <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs opacity-60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Interactive Info Section ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[5rem] p-12 md:p-32 text-left relative overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.6)] border border-white/5"
        >
          <div className="absolute top-0 right-0 w-2/3 h-full bg-linear-to-l from-primary/40 to-transparent opacity-50 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-linear-to-r from-emerald-500/30 to-transparent opacity-40 blur-[120px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1">
              <div className="w-20 h-1.5 bg-primary mb-10 rounded-full" />
              <h2 className="text-5xl md:text-8xl font-black text-white mb-12 leading-[0.9] tracking-tighter">
                Transparency <br /> meets <span className="text-primary">Intelligence.</span>
              </h2>
              <p className="text-slate-400 text-2xl font-medium mb-16 max-w-xl leading-relaxed">
                Aggregating placement data, fee structures, and campus reviews 
                from over 10,000 verified sources to give you the truth.
              </p>
              <Link href="/compare" className="btn-premium inline-flex items-center gap-5 text-2xl px-12 py-6">
                Start Comparing <ChevronRight className="w-8 h-8" />
              </Link>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-8">
              <motion.div 
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="space-y-8 pt-16"
              >
                <div className="h-60 rounded-[3rem] bg-linear-to-br from-primary/40 to-purple-600/40 border border-white/20 backdrop-blur-3xl shadow-[0_40px_80px_-15px_rgba(99,102,241,0.4)]" />
                <div className="h-80 rounded-[3rem] bg-linear-to-br from-emerald-500/40 to-teal-600/40 border border-white/20 backdrop-blur-3xl shadow-[0_40px_80px_-15px_rgba(16,185,129,0.4)]" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="space-y-8"
              >
                <div className="h-80 rounded-[3rem] bg-linear-to-br from-purple-500/40 to-pink-600/40 border border-white/20 backdrop-blur-3xl shadow-[0_40px_80px_-15px_rgba(168,85,247,0.4)]" />
                <div className="h-60 rounded-[3rem] bg-linear-to-br from-blue-500/40 to-indigo-600/40 border border-white/20 backdrop-blur-3xl shadow-[0_40px_80px_-15px_rgba(59,130,246,0.4)]" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
