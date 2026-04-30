"use client";

import { useState, useEffect } from "react";
import { fetchColleges } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, CheckCircle2, MapPin, IndianRupee, Star, TrendingUp } from "lucide-react";

export default function ComparePage() {
  const [colleges, setColleges] = useState([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchColleges().then(data => setColleges(data.data || []));
  }, []);

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      if (selectedIds.length >= 3) {
        alert("You can only compare up to 3 colleges at once.");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedColleges = colleges.filter((c: any) => selectedIds.includes(c.id));

  return (
    <div className="py-10 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/10 text-accent font-bold text-sm mb-6 border border-accent/20">
          <Scale className="w-4 h-4" /> Smart Comparison
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground drop-shadow-sm">Compare Colleges</h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto font-medium">
          Select up to 3 colleges below to compare their fees, placements, and ratings side-by-side.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 border border-white p-8 rounded-4xl mb-14 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            Select Colleges
          </h2>
          <span className="text-sm font-bold bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20">
            {selectedIds.length} / 3 Selected
          </span>
        </div>
        
        <div className="flex flex-wrap gap-4 max-h-72 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-surface-border">
          {colleges.map((c: any) => {
            const isSelected = selectedIds.includes(c.id);
            return (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-bold transition-all shadow-sm ${
                  isSelected 
                    ? "bg-primary border-primary text-white scale-105 shadow-md shadow-primary/30 text-white-override" 
                    : "bg-white hover:bg-gray-50 border-surface-border text-foreground/80 hover:border-primary/40"
                }`}
              >
                {c.name} {isSelected && <CheckCircle2 className="w-5 h-5" />}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedColleges.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="overflow-hidden rounded-4xl shadow-2xl border border-white bg-white/90 backdrop-blur-md"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-6 md:p-8 border-b border-r border-surface-border bg-gray-50/80 w-1/4 text-xl font-bold text-foreground/60 uppercase tracking-wider">
                      Features
                    </th>
                    {selectedColleges.map((c: any) => (
                      <th key={c.id} className="p-6 md:p-8 border-b border-r border-surface-border font-black text-2xl text-center bg-white text-primary">
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 md:p-8 border-b border-r border-surface-border font-bold text-lg text-foreground/80 bg-gray-50/50 flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" /> Location
                    </td>
                    {selectedColleges.map((c: any) => (
                      <td key={c.id} className="p-6 md:p-8 border-b border-r border-surface-border text-center text-lg font-medium">
                        {c.location}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 md:p-8 border-b border-r border-surface-border font-bold text-lg text-foreground/80 bg-gray-50/50 flex items-center gap-3">
                      <IndianRupee className="w-5 h-5 text-green-600" /> Fees / Year
                    </td>
                    {selectedColleges.map((c: any) => (
                      <td key={c.id} className="p-6 md:p-8 border-b border-r border-surface-border text-center font-black text-2xl text-foreground">
                        ₹{c.fees.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 md:p-8 border-b border-r border-surface-border font-bold text-lg text-foreground/80 bg-gray-50/50 flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500" /> Student Rating
                    </td>
                    {selectedColleges.map((c: any) => (
                      <td key={c.id} className="p-6 md:p-8 border-b border-r border-surface-border text-center">
                        <span className="inline-flex items-center justify-center gap-1.5 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold text-xl border border-yellow-200 shadow-sm">
                          {c.rating}<span className="text-sm opacity-60">/5</span>
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 md:p-8 border-r border-surface-border font-bold text-lg text-foreground/80 bg-gray-50/50 flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-accent" /> Placement Rate
                    </td>
                    {selectedColleges.map((c: any) => (
                      <td key={c.id} className="p-6 md:p-8 border-r border-surface-border text-center text-green-600 font-black text-3xl">
                        {c.placementPercentage}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-24 bg-white/50 backdrop-blur-md rounded-[2.5rem] border-dashed border-2 border-surface-border shadow-inner"
          >
            <div className="text-6xl mb-6 opacity-40">⚖️</div>
            <p className="text-2xl text-foreground/50 font-bold">Select at least one college to view the comparison.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
