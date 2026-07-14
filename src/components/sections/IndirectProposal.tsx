"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function IndirectProposal() {
  const lines = [
    { text: "Sometimes,", italic: true, delay: 0 },
    { text: "Life gives us another chance to know someone.", delay: 0.8 },
    { text: "Sometimes,", italic: true, delay: 1.6 },
    { text: "One conversation changes everything.", delay: 2.4 },
    { text: "I don't know what tomorrow brings,", delay: 3.5 },
    { text: "nor do I know where life will take us.", delay: 4.3 },
    { text: "But I'm truly grateful", delay: 5.2, highlight: true },
    { text: "that I met you again.", delay: 6.0, highlight: true },
    { text: "If someday our paths continue together,", delay: 7.0 },
    { text: "I'd be the happiest person.", delay: 7.8, highlight: true },
    { text: "Until then...", italic: true, delay: 8.8 },
    { text: "Keep smiling.", delay: 9.6, roseGlow: true },
    { text: "Happy Birthday.", delay: 10.6, bigReveal: true }
  ];

  return (
    <section className="min-h-screen py-32 px-4 w-full relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background soft glowing particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full bg-purple-500/5 blur-[90px] pointer-events-none" />

      <div className="w-full max-w-[800px] z-10 text-center flex flex-col items-center justify-center min-h-[600px] py-10">
        
        {/* Little top icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-rose-500/10 bg-rose-500/5 text-rose-300/70 font-mono text-[9px] tracking-widest uppercase mb-16"
        >
          <Sparkles size={10} className="animate-pulse" />
          <span>Epilogue</span>
        </motion.div>

        {/* Text lines scroll reveal sequence */}
        <div className="space-y-8 md:space-y-10 w-full flex flex-col items-center">
          {lines.map((line, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 1.2,
                  delay: line.delay * 0.1, // Stagger slightly on view entry
                  type: "spring",
                  stiffness: 40
                }}
                className="w-full flex items-center justify-center"
              >
                {line.bigReveal ? (
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight text-gradient-rose-purple tracking-wide py-2 select-none relative">
                    {line.text}
                    <motion.span
                      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute -right-8 -top-1 text-rose-400 text-2xl sm:text-3xl"
                    >
                      🌸
                    </motion.span>
                  </h3>
                ) : line.roseGlow ? (
                  <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-rose-300 drop-shadow-[0_0_12px_rgba(244,63,94,0.4)] select-none">
                    {line.text}
                  </p>
                ) : line.highlight ? (
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif text-rose-100/90 font-medium tracking-wide select-none">
                    {line.text}
                  </p>
                ) : line.italic ? (
                  <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-slate-400/80 tracking-wide select-none">
                    {line.text}
                  </p>
                ) : (
                  <p className="text-base sm:text-lg md:text-xl font-sans font-light text-slate-400 max-w-[500px] leading-relaxed select-none">
                    {line.text}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Decorative heart bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1.5 }}
          className="mt-20 text-rose-500/30 flex flex-col items-center gap-1 font-mono text-[9px] tracking-[0.3em] uppercase"
        >
          <Heart size={16} className="fill-rose-500/20" />
          <span>SINCERELY</span>
        </motion.div>

      </div>
    </section>
  );
}
