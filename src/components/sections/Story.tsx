"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MessageCircle, Moon, School, Users } from "lucide-react";
import storyData from "../../data/story.json";

export default function Story() {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  const chapters = storyData.chapters;
  const currentChapter = chapters[activeChapterIdx];

  const getIcon = (id: string) => {
    switch (id) {
      case "childhood":
        return <School size={20} />;
      case "years-passed":
        return <Users size={20} />;
      case "reconnection":
        return <MessageCircle size={20} />;
      case "one-month":
        return <Calendar size={20} />;
      case "comfort-zone":
        return <Moon size={20} />;
      default:
        return <Users size={20} />;
    }
  };

  // Render inline custom animated CSS/SVG visuals
  const renderVisual = (id: string) => {
    switch (id) {
      case "childhood":
        return (
          <div className="relative w-full h-[260px] flex items-center justify-center bg-slate-950/40 rounded-2xl overflow-hidden border border-white/5">
            {/* School theme / classroom representation */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c061a_1px,transparent_1px),linear-gradient(to_bottom,#0c061a_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute w-44 h-44 rounded-full border border-dashed border-rose-500/20"
            />
            {/* Two separate nodes representing us as children */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-1/4 w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-300 text-[10px]"
            >
              Me
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
              className="absolute right-1/4 w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 text-[10px]"
            >
              You
            </motion.div>
            <div className="absolute bottom-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Distant orbits, same classroom
            </div>
          </div>
        );
      case "years-passed":
        return (
          <div className="relative w-full h-[260px] flex items-center justify-center bg-slate-950/40 rounded-2xl overflow-hidden border border-white/5">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
            {/* Divergent paths */}
            <svg className="w-full h-full absolute inset-0 opacity-20" viewBox="0 0 400 260">
              <path d="M 50 130 Q 150 130 200 60 T 350 30" fill="none" stroke="url(#roseGrad)" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M 50 130 Q 150 130 200 200 T 350 230" fill="none" stroke="url(#purpleGrad)" strokeWidth="2" strokeDasharray="5 5" />
              <defs>
                <linearGradient id="roseGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute left-8 w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-300 text-[8px]"
            >
              Me
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute right-8 w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 text-[8px]"
            >
              You
            </motion.div>
            <div className="absolute bottom-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Diverging paths of life
            </div>
          </div>
        );
      case "reconnection":
        return (
          <div className="relative w-full h-[260px] flex items-center justify-center bg-slate-950/40 rounded-2xl overflow-hidden border border-white/5 px-6">
            <div className="absolute inset-0 bg-radial-gradient from-rose-500/5 to-transparent pointer-events-none" />
            <div className="w-full flex flex-col gap-3 max-w-[280px]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="self-start px-3 py-1.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px] font-mono"
              >
                Hey, remember school?
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="self-end px-3 py-1.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-mono"
              >
                Hi! Yes, I do. Long time!
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 1], scale: [0.95, 1.05, 1] }}
                transition={{ duration: 1.2, delay: 1.6 }}
                className="text-center text-[10px] text-rose-400 font-mono italic mt-2"
              >
                Instagram Reconnection established
              </motion.div>
            </div>
          </div>
        );
      case "one-month":
        return (
          <div className="relative w-full h-[260px] flex items-center justify-center bg-slate-950/40 rounded-2xl overflow-hidden border border-white/5">
            <div className="grid grid-cols-7 gap-2 p-4 border border-white/5 rounded-xl bg-slate-950/60 max-w-[240px]">
              {Array.from({ length: 28 }).map((_, i) => {
                const isActive = i < 15; // Represents days we talked
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className={`w-5 h-5 rounded flex items-center justify-center text-[7px] font-mono border ${
                      isActive
                        ? "bg-rose-500/20 border-rose-500/40 text-rose-300 font-bold"
                        : "border-white/5 text-slate-600"
                    }`}
                  >
                    {i + 1}
                  </motion.div>
                );
              })}
            </div>
            <div className="absolute bottom-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              30 Days of Shared Moments
            </div>
          </div>
        );
      case "comfort-zone":
        return (
          <div className="relative w-full h-[260px] flex items-center justify-center bg-slate-950/40 rounded-2xl overflow-hidden border border-white/5">
            {/* Glowing circle representing protection/comfort */}
            <motion.div
              animate={{
                scale: [1, 1.08, 0.95, 1],
                boxShadow: [
                  "0 0 20px rgba(244,63,94,0.1)",
                  "0 0 40px rgba(244,63,94,0.25)",
                  "0 0 20px rgba(244,63,94,0.1)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-32 h-32 rounded-full border border-rose-500/20 flex flex-col items-center justify-center relative bg-rose-500/5"
            >
              <Moon size={28} className="text-rose-300 animate-pulse" />
              <span className="text-[10px] font-mono text-rose-200 mt-2">Sanctuary</span>
              
              {/* Little circling particles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="w-2 h-2 rounded-full bg-purple-400 absolute top-0 left-1/2 -translate-x-1/2" />
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 absolute bottom-0 left-1/2 -translate-x-1/2" />
              </motion.div>
            </motion.div>
            <div className="absolute bottom-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Sanctuary in a busy world
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="story-section"
      className="min-h-screen w-full py-20 px-4 flex flex-col items-center justify-center relative"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-10 w-[250px] h-[250px] rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-[900px] z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-100 tracking-wide mb-3">
            {storyData.title}
          </h2>
          <p className="text-sm font-mono text-rose-400/80 uppercase tracking-widest">
            {storyData.description}
          </p>
        </div>

        {/* Narrative Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-6">
          
          {/* Left panel: chapter list */}
          <div className="md:col-span-4 flex flex-col gap-2 justify-center">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapterIdx(idx)}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all border ${
                  activeChapterIdx === idx
                    ? "bg-rose-500/10 border-rose-500/35 text-rose-200 shadow-md"
                    : "bg-slate-950/20 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10"
                }`}
              >
                <div className={`p-2 rounded-lg ${activeChapterIdx === idx ? "bg-rose-500/25 text-rose-200" : "bg-white/5 text-slate-500"}`}>
                  {getIcon(ch.id)}
                </div>
                <div>
                  <h3 className="text-xs font-mono tracking-wider uppercase font-semibold">
                    {ch.title}
                  </h3>
                  <span className="text-[10px] text-slate-500/80 font-mono">Chapter {idx + 1}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right panel: dynamic chapter content and visual */}
          <div className="md:col-span-8 flex flex-col gap-6 p-6 rounded-2xl glass-panel relative border border-white/5 min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col flex-1 justify-between gap-6"
              >
                {/* Visual Representation */}
                {renderVisual(currentChapter.id)}

                {/* Narrative text */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-rose-400 tracking-widest uppercase">
                      {currentChapter.subtitle}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      CHAPTER {activeChapterIdx + 1} / {chapters.length}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-serif text-slate-200 leading-snug">
                    {currentChapter.title}
                  </h3>
                  
                  <p className="text-sm text-slate-400/95 leading-relaxed font-light font-sans">
                    {currentChapter.description}
                  </p>
                </div>

                {/* Pagination actions */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono text-slate-600">
                    *CLICK THE CHAPTERS TO EXPLORE
                  </span>
                  
                  {activeChapterIdx < chapters.length - 1 ? (
                    <button
                      onClick={() => setActiveChapterIdx((prev) => prev + 1)}
                      className="px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-300 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      Next Chapter <ArrowRight size={12} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const el = document.getElementById("about-section");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-purple-300 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      Explore Her Biotech Journey
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
