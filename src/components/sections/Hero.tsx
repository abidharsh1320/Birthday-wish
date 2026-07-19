"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ChevronDown, Heart, Sparkles } from "lucide-react";
import birthdayData from "../../data/birthday.json";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  const heartbeatTransition = {
    repeat: Infinity,
    duration: 1.6,
    ease: "easeInOut",
  } as const;

  return (
    <section className="min-h-screen relative w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-rose-500/10 blur-[90px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[80px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[800px] text-center z-10 flex flex-col items-center gap-6 mt-12"
      >
        {/* Little badge */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-300 font-mono text-[11px] tracking-[0.2em] uppercase"
        >
          <Sparkles size={12} className="animate-spin" style={{ animationDuration: "5s" }} />
          <span>A Handcrafted Digital Gift</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-8xl font-bold font-serif leading-tight tracking-wide text-gradient-rose-purple"
        >
          Happy Birthday
          <br />
          <span className="inline-flex items-center gap-2 sm:gap-4 md:gap-6 justify-center [text-fill-color:initial] [-webkit-text-fill-color:initial]">
            <span className="text-gradient-rose-purple">{birthdayData.name}</span>
            <motion.span
              animate={{ scale: [1, 1.18, 1] }}
              transition={heartbeatTransition}
              className="inline-block drop-shadow-[0_0_15px_rgba(244,63,94,0.7)] text-rose-400 fill-rose-400"
            >
              <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 fill-rose-400 text-rose-400 stroke-[1.5]" />
            </motion.span>
          </span>
        </motion.h1>

        {/* Date of Birth Display */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center font-mono gap-1 mt-4"
        >
          <span className="text-slate-400 text-xs tracking-[0.3em] uppercase">CELEBRATING</span>
          <span className="text-rose-200 text-lg md:text-xl tracking-widest font-semibold border-b border-rose-500/20 pb-2 px-6">
            21ST BIRTHDAY
          </span>
        </motion.div>

        {/* Introductory Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-slate-400 text-sm md:text-base max-w-[480px] font-sans font-light leading-relaxed mt-4"
        >
          Every life has chapters that define us. This is a story of a silent past, an unexpected reconnection, and the comfort found in your conversations.
        </motion.p>

        {/* Let's begin prompt */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <button
            onClick={() => {
              const el = document.getElementById("story-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.25em] text-rose-300 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-400/40 transition-all duration-300 shadow-md flex items-center gap-2 group"
          >
            Begin The Journey <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Sparkles in Background */}
      <div className="absolute top-1/3 left-10 text-rose-400/20 animate-float"><Heart size={24} /></div>
      <div className="absolute bottom-1/3 right-10 text-purple-400/20 animate-float-delayed"><Heart size={32} /></div>
      <div className="absolute top-1/4 right-1/5 text-rose-300/10 animate-pulse"><Sparkles size={20} /></div>
      <div className="absolute bottom-1/4 left-1/5 text-rose-300/15 animate-pulse"><Sparkles size={28} /></div>

      {/* Scroll Down Hint at very bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-[10px] font-mono tracking-widest uppercase opacity-75">
        <span className="animate-bounce"><ChevronDown size={16} /></span>
        SCROLL TO ENTER
      </div>
    </section>
  );
}
