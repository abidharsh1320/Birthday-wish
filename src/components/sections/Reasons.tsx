"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Award, Heart } from "lucide-react";
import reasonsData from "../../data/reasons.json";
import confetti from "canvas-confetti";

export default function Reasons() {
  const [clickedReasons, setClickedReasons] = useState<number[]>([]);
  const [activeReasonIdx, setActiveReasonIdx] = useState<number | null>(null);

  const handleStarClick = (idx: number) => {
    setActiveReasonIdx(idx);
    
    if (!clickedReasons.includes(idx)) {
      const nextClicked = [...clickedReasons, idx];
      setClickedReasons(nextClicked);
      
      // Standard small confetti explosion on click
      confetti({
        particleCount: 20,
        spread: 30,
        origin: { y: 0.7 },
        colors: ["#f43f5e", "#c084fc", "#fcd34d"]
      });

      // Special big explosion if they find all 30!
      if (nextClicked.length === reasonsData.reasons.length) {
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.5 },
            colors: ["#f43f5e", "#a855f7", "#ec4899", "#3b82f6", "#10b981", "#fcd34d"]
          });
        }, 500);
      }
    }
  };

  return (
    <section className="py-24 px-4 w-full relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background aura glow */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1000px] z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300 font-mono text-[10px] tracking-widest uppercase mb-4"
          >
            <Star size={12} className="animate-spin" style={{ animationDuration: "8s" }} />
            <span>Interactive Constellation</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-serif text-slate-100 tracking-wide mb-3">
            {reasonsData.title}
          </h2>
          
          <p className="text-sm font-mono text-slate-400 max-w-[500px] mx-auto mt-2">
            Click each glowing star in the night sky to reveal one reason why you are truly appreciated.
          </p>

          {/* Progress tracker */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="text-xs font-mono text-amber-300">
              STARS DISCOVERED: <span className="font-bold">{clickedReasons.length}</span> / {reasonsData.reasons.length}
            </div>
            
            <div className="w-[200px] md:w-[300px] h-2 bg-white/5 border border-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600"
                style={{ width: `${(clickedReasons.length / reasonsData.reasons.length) * 100}%` }}
                layout
              />
            </div>

            {clickedReasons.length === reasonsData.reasons.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 mt-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full"
              >
                <Heart size={10} className="animate-pulse" /> CONSTELLATION COMPLETE! EASTER EGG UNLOCKED!
              </motion.div>
            )}
          </div>
        </div>

        {/* Constellation Star Map Panel */}
        <div className="w-full max-w-[750px] p-6 md:p-8 rounded-3xl glass-panel border border-white/5 bg-slate-950/20 min-h-[300px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Constellation lines fallback - visual only */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,7,28,0.2),transparent_70%)] pointer-events-none" />

          {/* Stars grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3 md:gap-4 relative z-10 justify-items-center">
            {reasonsData.reasons.map((_, idx) => {
              const isClicked = clickedReasons.includes(idx);
              const isActive = activeReasonIdx === idx;
              
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleStarClick(idx)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center font-mono text-[10px] md:text-xs transition-all duration-300 ${
                    isActive
                      ? "bg-amber-400 border-amber-400 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.8)]"
                      : isClicked
                      ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                      : "bg-white/5 border-white/10 text-slate-500 hover:border-amber-400/40 hover:text-amber-300"
                  }`}
                  aria-label={`Star ${idx + 1}`}
                >
                  {isClicked ? (
                    <Star size={12} className={isActive ? "fill-slate-950" : "fill-rose-300/40"} />
                  ) : (
                    <span>{idx + 1}</span>
                  )}

                  {/* Pulsing glow ring on active or unclicked stars */}
                  {!isClicked && (
                    <span className="absolute -inset-0.5 rounded-full border border-amber-400/10 animate-ping opacity-40 pointer-events-none" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Reveal Center Overlay */}
          <div className="mt-8 border-t border-white/5 pt-6 min-h-[120px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {activeReasonIdx !== null ? (
                <motion.div
                  key={activeReasonIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center max-w-[500px] space-y-2.5"
                >
                  <div className="flex items-center justify-center gap-1.5 text-amber-300 font-mono text-[10px] tracking-widest uppercase">
                    <Award size={12} /> Reason #{activeReasonIdx + 1}
                  </div>
                  <p className="text-sm md:text-base font-serif text-rose-100 leading-relaxed">
                    "{reasonsData.reasons[activeReasonIdx]}"
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs md:text-sm font-mono text-slate-500 italic"
                >
                  *THE CONSTELLATION AWAITS YOUR TOUCH. CHOOSE A STAR.*
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
