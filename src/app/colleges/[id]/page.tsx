"use client";

import { use, useEffect, useState } from "react";
import { fetchCollegeById, toggleSavedCollege, getSavedColleges } from "@/lib/api";
import { motion } from "framer-motion";
import { MapPin, Bookmark, BookmarkCheck, BookOpen, Star, IndianRupee, TrendingUp, Info, Loader2 } from "lucide-react";

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadCollege();
  }, [resolvedParams.id]);

  const loadCollege = async () => {
    try {
      const data = await fetchCollegeById(resolvedParams.id);
      setCollege(data);
      const savedList = await getSavedColleges();
      if (savedList.some((c: any) => c.id === resolvedParams.id)) {
        setIsSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      const success = await toggleSavedCollege(undefined, resolvedParams.id, isSaved);
      if (success) setIsSaved(!isSaved);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
      </div>
    );
  }

  if (!college) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-2xl font-bold text-foreground/50">
        College not found
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8 max-w-7xl mx-auto"
    >
      <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 to-accent/5 pointer-events-none"></div>
        
        <div className="h-80 md:h-[400px] w-full relative">
          <img 
            src={college.imageUrl || '/placeholder.jpg'} 
            alt={college.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">{college.name}</h1>
              <p className="text-white/90 text-xl flex items-center gap-2 font-bold">
                <MapPin className="text-accent w-6 h-6" /> {college.location}
              </p>
            </motion.div>
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className={`px-8 py-4 rounded-full font-black shadow-xl transition-all text-lg flex items-center gap-3 ${
                isSaved 
                  ? 'bg-white text-primary border-2 border-primary/20 hover:bg-gray-50' 
                  : 'bg-linear-to-r from-primary to-accent text-white hover:opacity-90'
              }`}
            >
              {isSaved ? (
                <><BookmarkCheck className="w-6 h-6" /> Saved to Shortlist</>
              ) : (
                <><Bookmark className="w-6 h-6" /> Add to Shortlist</>
              )}
            </motion.button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-8 md:p-12 relative z-10">
          <div className="md:col-span-2 space-y-12">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-black mb-6 text-foreground flex items-center gap-3">
                <Info className="text-primary w-8 h-8" /> About the Institute
              </h2>
              <p className="text-foreground/80 leading-relaxed text-xl font-medium bg-white/50 p-6 rounded-3xl border border-white shadow-sm">
                {college.description}
              </p>
            </motion.section>
            
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-black mb-6 text-foreground flex items-center gap-3">
                <BookOpen className="text-accent w-8 h-8" /> Courses Offered
              </h2>
              <div className="flex flex-wrap gap-4">
                {college.courses?.map((course: any, idx: number) => (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    key={course.id} 
                    className="bg-primary/10 text-primary font-bold px-6 py-3 rounded-xl border border-primary/20 shadow-sm text-lg"
                  >
                    {course.name}
                  </motion.span>
                ))}
              </div>
            </motion.section>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/80 border border-white p-8 rounded-4xl shadow-lg hover:shadow-xl transition-shadow group">
              <h3 className="text-sm font-black mb-2 text-foreground/50 uppercase tracking-widest flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" /> Student Rating
              </h3>
              <p className="text-6xl font-black text-primary flex items-baseline gap-2">
                {college.rating} <span className="text-2xl text-foreground/30">/ 5</span>
              </p>
            </div>
            
            <div className="bg-white/80 border border-white p-8 rounded-4xl shadow-lg hover:shadow-xl transition-shadow group">
              <h3 className="text-sm font-black mb-2 text-foreground/50 uppercase tracking-widest flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-foreground/50" /> Avg. Fees (Year)
              </h3>
              <p className="text-5xl font-black text-foreground flex items-baseline gap-2">
                ₹{(college.fees / 100000).toFixed(1)}L
              </p>
            </div>
            
            <div className="bg-linear-to-br from-emerald-50 to-teal-100 border border-emerald-200 p-8 rounded-4xl shadow-lg hover:shadow-xl transition-shadow group">
              <h3 className="text-sm font-black mb-2 text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Placements
              </h3>
              <p className="text-6xl font-black text-emerald-600 flex items-center gap-2">
                {college.placementPercentage}%
              </p>
              <p className="text-sm font-bold text-emerald-700 mt-3 opacity-80">Average placement rate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
