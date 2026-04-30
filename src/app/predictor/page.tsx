"use client";

import { useState } from "react";
import { predictColleges } from "@/lib/api";
import CollegeCard from "@/components/CollegeCard";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Search, GraduationCap, Trophy, Loader2, Sparkles } from "lucide-react";

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await predictColleges(exam, rank);
      setResults(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="py-16 max-w-6xl mx-auto px-6 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest mb-6 shadow-xl shadow-slate-900/20">
          <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Prediction Engine
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tighter">
          Admissions <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">Predictor</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Leverage historical data and AI models to predict your chances at India's most prestigious institutions.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[3rem] p-10 md:p-14 mb-20 shadow-2xl border border-slate-100 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-linear-to-br from-slate-50/50 to-transparent pointer-events-none"></div>
        
        <form onSubmit={handlePredict} className="flex flex-col md:flex-row gap-10 items-end relative z-10">
          <div className="flex-1 w-full">
            <label className="flex items-center gap-2 text-[10px] font-black mb-4 uppercase tracking-[0.2em] text-slate-400">
              < GraduationCap className="w-4 h-4 text-primary" /> Exam Name
            </label>
            <div className="relative">
              <select 
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 focus:outline-none font-bold text-lg text-slate-800 shadow-sm transition-all appearance-none cursor-pointer"
              >
                <option value="JEE Main">JEE Main</option>
                <option value="JEE Advanced">JEE Advanced</option>
                <option value="BITSAT">BITSAT</option>
                <option value="VITEEE">VITEEE</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Target className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <label className="flex items-center gap-2 text-[10px] font-black mb-4 uppercase tracking-[0.2em] text-slate-400">
              <Trophy className="w-4 h-4 text-accent" /> Your AIR Rank
            </label>
            <input 
              type="number" 
              required
              min="1"
              placeholder="e.g. 5000"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 focus:outline-none font-bold text-lg text-slate-800 shadow-sm transition-all placeholder:text-slate-300"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading || !rank}
            className="btn-premium w-full md:w-auto h-[68px] flex items-center justify-center gap-3 px-12 text-lg shadow-2xl"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Search className="w-6 h-6" /> Predict Chances</>}
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {hasSearched && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-slate-200 flex-1" />
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                <Sparkles className="text-primary w-6 h-6" /> Recommended For You
              </h2>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-xs">Simulating Admissions...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {results.map((c: any, i: number) => (
                  <motion.div 
                    key={c.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CollegeCard college={c} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-inner">
                <div className="text-6xl mb-6 grayscale opacity-20">🤷‍♂️</div>
                <h3 className="text-2xl font-black mb-3 text-slate-800">No matches found</h3>
                <p className="text-slate-400 font-medium">Try entering a different rank or checking another exam.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
