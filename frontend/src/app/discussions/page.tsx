"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchQuestions, createQuestion, createAnswer } from "@/lib/api";
import { MessageSquare, Plus, Send, User, Clock, Loader2, Sparkles, X } from "lucide-react";

export default function DiscussionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAsking, setIsAsking] = useState(false);
  
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await fetchQuestions();
      setQuestions(data || []);
    } catch (error) {
      console.error("Failed to load questions", error);
    }
    setLoading(false);
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    setIsSubmitting(true);
    try {
      const q = await createQuestion(newTitle, newContent);
      setQuestions([q, ...questions]);
      setIsAsking(false);
      setNewTitle("");
      setNewContent("");
    } catch (error) {
      console.error("Failed to submit question", error);
    }
    setIsSubmitting(false);
  };

  const handleReply = async (questionId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setIsReplying(true);
    try {
      const answer = await createAnswer(questionId, replyContent);
      setQuestions(questions.map(q => {
        if (q.id === questionId) return { ...q, answers: [...(q.answers || []), answer] };
        return q;
      }));
      setActiveReplyId(null);
      setReplyContent("");
    } catch (error) {
      console.error("Failed to post answer", error);
    }
    setIsReplying(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-5 border border-primary/20 shadow-sm">
          <MessageSquare className="w-4 h-4" /> Community Q&A
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-4 text-foreground tracking-tight">
          Student Discussions
        </h1>
        <p className="text-lg text-foreground/60 max-w-xl mx-auto font-medium leading-relaxed">
          Ask questions about colleges, placements, or exam prep and get answers from the community.
        </p>
      </motion.div>

      <div className="mb-10 text-center">
        {!isAsking ? (
          <button 
            onClick={() => setIsAsking(true)}
            className="bg-linear-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-black shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" /> Ask a Question
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 relative text-left"
          >
            <button 
              onClick={() => setIsAsking(false)}
              className="absolute top-6 right-6 text-foreground/40 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black mb-6 text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" /> What's on your mind?
            </h3>
            <form onSubmit={handleAskQuestion} className="space-y-4">
              <div>
                <label className="text-xs font-black text-foreground/40 uppercase tracking-widest mb-1 block">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How are the CS placements at IIT Bombay?"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/30 focus:bg-white rounded-xl px-5 py-4 focus:outline-none font-bold text-foreground text-sm placeholder:text-foreground/30 transition-all"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-black text-foreground/40 uppercase tracking-widest mb-1 block">Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Add more context..."
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/30 focus:bg-white rounded-xl px-5 py-4 focus:outline-none font-medium text-foreground text-sm placeholder:text-foreground/30 transition-all resize-none"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-3 rounded-full font-black shadow-md transition-all flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Post Question
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4 opacity-40">📝</div>
            <h3 className="text-xl font-bold text-foreground/60">No questions yet. Be the first to ask!</h3>
          </div>
        ) : (
          questions.map((q, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={q.id} 
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl md:text-2xl font-black text-foreground">{q.title}</h3>
                </div>
                <p className="text-foreground/70 font-medium mb-6 leading-relaxed whitespace-pre-wrap">
                  {q.content}
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-foreground/40 uppercase tracking-wider mb-6">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {q.author?.name || 'Guest Student'}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {formatDate(q.createdAt)}</span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <h4 className="text-sm font-black text-foreground/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Answers ({q.answers?.length || 0})
                  </h4>
                  
                  {q.answers?.length > 0 && (
                    <div className="space-y-4 mb-5">
                      {q.answers.map((a: any) => (
                        <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                          <p className="text-sm font-medium text-foreground/80 mb-3 whitespace-pre-wrap">{a.content}</p>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                            <span className="flex items-center gap-1 text-primary"><User className="w-3 h-3" /> {a.author?.name || 'Community Member'}</span>
                            <span>{formatDate(a.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeReplyId === q.id ? (
                    <form onSubmit={(e) => handleReply(q.id, e)} className="mt-4">
                      <textarea
                        required
                        rows={2}
                        placeholder="Write your answer..."
                        className="w-full bg-white border border-gray-200 focus:border-primary/50 rounded-xl px-4 py-3 focus:outline-none font-medium text-sm text-foreground resize-none mb-2"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <button 
                          type="button" 
                          onClick={() => setActiveReplyId(null)}
                          className="px-4 py-2 rounded-lg text-xs font-bold text-foreground/50 hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          disabled={isReplying}
                          className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-xs font-black transition-colors flex items-center gap-2"
                        >
                          {isReplying ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                          Post Answer
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button 
                      onClick={() => setActiveReplyId(q.id)}
                      className="text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add an answer
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
