"use client";

import { useState, useEffect } from "react";
import { getSavedColleges } from "@/lib/api";
import CollegeCard from "@/components/CollegeCard";
import { motion } from "framer-motion";
import { Heart, Loader2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SavedCollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    try {
      const data = await getSavedColleges();
      setColleges(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="py-16 max-w-7xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest mb-6 shadow-xl shadow-slate-900/20">
          <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> Personalized Shortlist
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tighter">
          My <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">Shortlist</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          The colleges you've saved for consideration. Compare them and make your final choice.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
      ) : colleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {colleges.map((c: any, i: number) => (
            <motion.div 
              key={c.id} 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CollegeCard college={c} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-32 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 max-w-3xl mx-auto"
        >
          <div className="text-7xl mb-8 grayscale opacity-20">🏷️</div>
          <h3 className="text-3xl font-black mb-4 text-slate-800">Your list is empty</h3>
          <p className="text-slate-400 text-lg font-medium mb-12">Start exploring colleges and hit the heart icon to save your top choices.</p>
          <Link href="/colleges" className="btn-premium inline-flex items-center gap-3">
            Browse Colleges <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
