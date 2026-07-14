"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Beaker, Microscope, Sparkles, Star } from "lucide-react";
import wishesData from "../../data/wishes.json";

export default function Wishes() {
  const getWishIcon = (iconName: string) => {
    switch (iconName) {
      case "beaker":
        return <Beaker size={24} className="text-rose-400" />;
      case "sparkles":
        return <Sparkles size={24} className="text-purple-400" />;
      case "microscope":
        return <Microscope size={24} className="text-emerald-400" />;
      case "stars":
        return <Star size={24} className="text-amber-400 animate-pulse" />;
      default:
        return <Sparkles size={24} className="text-rose-400" />;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  };

  return (
    <section className="py-24 px-4 w-full relative flex flex-col items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1000px] z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-100 tracking-wide mb-3">
            My Birthday Wishes for You
          </h2>
          <p className="text-sm font-mono text-rose-400/80 uppercase tracking-widest">
            Sincere prayers for your life, science, and happiness
          </p>
        </div>

        {/* Wishes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {wishesData.wishes.map((wish, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="p-8 rounded-2xl glass-panel border border-white/5 relative overflow-hidden group flex flex-col justify-between hover:border-rose-500/20 transition-all duration-300"
            >
              {/* Corner Glow effect */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white/5 blur-xl group-hover:bg-rose-500/10 transition-all duration-300" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {getWishIcon(wish.icon)}
                </div>
                
                <h3 className="text-xl font-serif text-slate-200 tracking-wide group-hover:text-rose-300 transition-colors">
                  {wish.title}
                </h3>
                
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {wish.message}
                </p>
              </div>

              {/* Card numbering */}
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-600">
                <span>WISH CAPSULE // 0{index + 1}</span>
                <span>ACTIVE</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
