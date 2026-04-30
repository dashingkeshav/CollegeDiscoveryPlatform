"use client";

import Link from "next/link";
import { MapPin, Star, ChevronRight, Heart, Loader2, TrendingUp } from "lucide-react";
import { toggleSavedCollege, getSavedColleges } from "@/lib/api";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CollegeCard({ college }: { college: any }) {
  const [isToggling, setIsToggling] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    checkSaved();
  }, [college.id]);

  const checkSaved = async () => {
    try {
      const saved = await getSavedColleges();
      setIsSaved(saved.some((s: any) => s.id === college.id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsToggling(true);
    try {
      const success = await toggleSavedCollege(undefined, college.id, isSaved);
      if (success) setIsSaved(!isSaved);
    } catch (err) {
      console.error("Failed to toggle save", err);
    }
    setIsToggling(false);
  };

  return (
    <div className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full group transition-all duration-700 hover:-translate-y-2">
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        {college.imageUrl ? (
          <img 
            src={college.imageUrl} 
            alt={college.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            No Image Available
          </div>
        )}
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
        <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-xl text-slate-900 border border-white/50">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {college.rating}
          </div>
          <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2 shadow-xl text-white border border-white/10">
            <TrendingUp className="w-3.5 h-3.5 text-accent" /> {college.placementPercentage}% Placed
          </div>
        </div>

        {/* Heart Button */}
        <button
          onClick={handleToggleSave}
          disabled={isToggling}
          className={`absolute top-6 right-6 w-12 h-12 rounded-[1.25rem] flex items-center justify-center transition-all shadow-2xl border border-white/20 z-10 backdrop-blur-xl ${
            isSaved ? "bg-primary text-white scale-110" : "bg-white/40 text-white hover:bg-white hover:text-primary"
          }`}
        >
          {isToggling ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Heart className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
          )}
        </button>
      </div>
      
      <div className="p-8 flex flex-col grow bg-white/40 relative group-hover:bg-white/60 transition-colors duration-700">
        <h3 className="text-2xl font-black mb-4 line-clamp-2 leading-[1.1] text-slate-900 group-hover:text-primary transition-colors">
          {college.name}
        </h3>
        <p className="text-sm text-slate-500 flex items-center gap-2 font-bold mb-8">
          <MapPin className="w-4 h-4 text-accent" /> {college.location}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-100">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-2">Annual Fees</p>
            <p className="font-black text-3xl text-slate-900 tracking-tighter">
              ₹{(college.fees / 100000).toFixed(1)}L
            </p>
          </div>
          <Link 
            href={`/colleges/${college.id}`}
            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-3xl text-sm font-black transition-all shadow-xl shadow-slate-900/10 hover:shadow-primary/30 hover:bg-primary group/btn"
          >
            Details <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
