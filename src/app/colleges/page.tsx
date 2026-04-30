"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchColleges } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, IndianRupee, Loader2, X,
  Filter, Sparkles, LayoutGrid, List, ArrowUpDown
} from "lucide-react";
import CollegeCard from "@/components/CollegeCard";

const FEE_RANGES = [
  { label: "Any Budget", value: "" },
  { label: "Under ₹2L", value: "200000" },
  { label: "Under ₹3L", value: "300000" },
  { label: "Under ₹5L", value: "500000" },
];

const CITIES = ["Any City", "Mumbai", "Delhi", "Chennai", "Pilani", "Hyderabad", "Bangalore"];

const SORT_OPTIONS = [
  { label: "Top Rated", value: "rating" },
  { label: "Lowest Fees", value: "fees_asc" },
  { label: "High Placement", value: "placement" },
];

export default function CollegesPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCity, setActiveCity] = useState("Any City");
  const [activeFeeLabel, setActiveFeeLabel] = useState("Any Budget");
  const [sort, setSort] = useState("rating");
  const [view, setView] = useState<"grid" | "list">("grid");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadColleges = useCallback(async (s: string, l: string, f: string) => {
    setLoading(true);
    try {
      const data = await fetchColleges(s, l, f);
      let list = data.data || [];
      
      if (sort === "rating") list.sort((a: any, b: any) => b.rating - a.rating);
      else if (sort === "fees_asc") list.sort((a: any, b: any) => a.fees - b.fees);
      else if (sort === "placement") list.sort((a: any, b: any) => b.placementPercentage - a.placementPercentage);
      
      setColleges(list);
    } catch (err) {
      console.error(err);
      setColleges([]);
    }
    setLoading(false);
  }, [sort]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => loadColleges(search, location, maxFees), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [search, location, maxFees, loadColleges]);

  const applyCity = (city: string) => {
    setActiveCity(city);
    setLocation(city === "Any City" ? "" : city);
  };

  const applyFees = (label: string, val: string) => {
    setActiveFeeLabel(label);
    setMaxFees(val);
  };

  const clearAll = () => {
    setSearch(""); setLocation(""); setMaxFees("");
    setActiveCity("Any City"); setActiveFeeLabel("Any Budget");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 relative">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '-5s' }} />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border-b border-white/20 pt-20 pb-16 relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[200%] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-widest mb-4 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" /> Discovery Engine
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-5 text-slate-900 tracking-tighter">
              Explore Premier <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">Institutions</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              Real-time insights and advanced filtering for your next big step.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-4xl shadow-2xl shadow-primary/10 border border-slate-100 flex flex-col md:flex-row overflow-hidden p-2.5 gap-2.5">
              <div className="flex-[1.5] flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-2xl border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all">
                <Search className="w-5 h-5 text-primary/40" />
                <input 
                  type="text" 
                  placeholder="Search by college name..."
                  className="bg-transparent focus:outline-none font-bold text-slate-900 text-sm w-full placeholder:text-slate-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-2xl border border-transparent focus-within:border-accent/20 focus-within:bg-white transition-all">
                <MapPin className="w-5 h-5 text-accent/40" />
                <input 
                  type="text" 
                  placeholder="Filter by city..."
                  className="bg-transparent focus:outline-none font-bold text-slate-900 text-sm w-full placeholder:text-slate-400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-8 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${showFilters ? "bg-slate-900 text-white shadow-slate-900/20" : "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200"}`}
              >
                <Filter className="w-4 h-4" /> {showFilters ? "Close" : "Filters"}
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] mt-5 p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> Quick City Select
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {CITIES.map(c => (
                          <button 
                            key={c}
                            onClick={() => applyCity(c)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${activeCity === c ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-600 border-slate-100 hover:border-primary/30"}`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <IndianRupee className="w-3.5 h-3.5" /> Budget Range
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {FEE_RANGES.map(f => (
                          <button 
                            key={f.label}
                            onClick={() => applyFees(f.label, f.value)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${activeFeeLabel === f.label ? "bg-accent text-white border-accent shadow-lg shadow-accent/20" : "bg-slate-50 text-slate-600 border-slate-100 hover:border-accent/30"}`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-900">Found Results</h2>
            <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/20">
              {colleges.length} Items
            </span>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative group">
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white border border-slate-200 px-6 py-3.5 pr-12 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-primary transition-all cursor-pointer shadow-sm hover:border-slate-300"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex shadow-sm">
              <button 
                onClick={() => setView("grid")}
                className={`p-3 rounded-xl transition-all ${view === "grid" ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setView("list")}
                className={`p-3 rounded-xl transition-all ${view === "list" ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" : "text-slate-400 hover:text-slate-600"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="mt-8 text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Parsing Dataset...</p>
          </div>
        ) : colleges.length > 0 ? (
          <motion.div 
            layout
            className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" : "flex flex-col gap-6"}
          >
            {colleges.map((c) => (
              <motion.div 
                layout 
                key={c.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <CollegeCard college={c} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
            <div className="text-7xl mb-8 grayscale opacity-20">🔎</div>
            <h3 className="text-3xl font-black mb-4 text-slate-800">No institutions found</h3>
            <p className="text-slate-400 text-lg font-medium mb-10 max-w-md mx-auto">We couldn't find anything matching your filters. Try widening your search.</p>
            <button onClick={clearAll} className="btn-premium flex items-center gap-2 mx-auto">
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
