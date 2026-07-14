"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, Heart, Sparkles } from "lucide-react";
import proposalData from "../../data/proposal.json";

export default function EnvelopeLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-4 w-full relative flex flex-col items-center justify-center overflow-hidden min-h-screen">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-rose-500/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[800px] z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-100 tracking-wide mb-3">
            A Letter for You
          </h2>
          <p className="text-sm font-mono text-rose-400/80 uppercase tracking-widest">
            Click the wax seal to open this digital envelope
          </p>
        </div>

        {/* Envelope Structure */}
        <div className="relative w-full max-w-[550px] h-[340px] flex items-center justify-center">
          
          {/* Main Envelope Body Back */}
          <div className={`absolute inset-0 bg-[#0f071c]/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl transition-all duration-700 ${
            isOpen ? "scale-[1.03] translate-y-12" : ""
          }`}>
            {/* Triangular pocket lines inside back */}
            <div className="absolute inset-0 border-b-[170px] border-b-transparent border-l-[275px] border-l-[#150a26]/20 border-r-[275px] border-r-[#150a26]/20 bottom-0 rounded-b-2xl pointer-events-none" />
          </div>

          {/* Letter Sheet Paper (slides out of envelope) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ y: 0, opacity: 0, scale: 0.95 }}
                animate={{ y: -180, opacity: 1, scale: 1 }}
                exit={{ y: 0, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                className="absolute w-[90%] md:w-[94%] bg-[#FAF9F6] text-slate-800 rounded-xl shadow-2xl p-6 md:p-8 z-20 max-h-[460px] overflow-y-auto"
              >
                {/* Letter Header */}
                <div className="border-b border-rose-500/10 pb-4 mb-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-rose-500 font-mono text-[9px] tracking-widest uppercase mb-1">
                    <Sparkles size={10} /> {proposalData.preHeading}
                  </div>
                  <h3 className="text-lg md:text-xl font-serif text-slate-900 leading-tight">
                    {proposalData.heading}
                  </h3>
                  <span className="text-xs text-rose-500 font-serif italic block mt-1.5">
                    {proposalData.subheading}
                  </span>
                </div>

                {/* Letter Body Paragraphs */}
                <div className="space-y-4 text-xs md:text-sm font-sans font-light leading-relaxed text-slate-700 text-justify">
                  {proposalData.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Letter Sign-off */}
                <div className="mt-8 pt-4 border-t border-rose-500/10 flex flex-col items-end">
                  <span className="text-xs text-slate-500 italic font-serif">{proposalData.signOff}</span>
                  <span className="text-sm font-serif font-bold text-rose-500 mt-1">Your Well-Wisher</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Envelope Front Cover (drawn on top of the letter when closed, behind when open) */}
          <div className={`absolute inset-0 bg-transparent rounded-2xl pointer-events-none z-30 transition-all duration-700 ${
            isOpen ? "scale-[1.03] translate-y-12" : ""
          }`}>
            {/* Folding shadow overlays */}
            <div className="absolute inset-0 border-t-[170px] border-t-transparent border-l-[275px] border-l-transparent border-r-[275px] border-r-transparent border-b-[170px] border-b-[#0b0414]/90 rounded-b-2xl" />
            <div className="absolute inset-0 border-l-[275px] border-l-[#120722]/60 border-t-[170px] border-t-transparent border-b-[170px] border-b-transparent rounded-l-2xl" />
            <div className="absolute inset-0 border-r-[275px] border-r-[#120722]/60 border-t-[170px] border-t-transparent border-b-[170px] border-b-transparent rounded-r-2xl" />
          </div>

          {/* Envelope Top Flap */}
          <div
            className={`absolute top-0 left-0 w-full h-[170px] bg-transparent origin-top transition-transform duration-700 z-40 ${
              isOpen ? "rotateX-180 -translate-y-[170px] scale-y-[-1] pointer-events-none" : ""
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, #180c2c 0%, #0d0519 100%)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
            }}
          />

          {/* Wax Seal / Click Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20px] w-14 h-14 rounded-full bg-[#8B0000] border-2 border-[#5C0000] shadow-lg flex items-center justify-center text-rose-100 hover:scale-110 active:scale-95 transition-all cursor-pointer z-50 ${
              isOpen ? "translate-y-[80px]" : "animate-pulse"
            }`}
            aria-label={isOpen ? "Close Letter" : "Open Letter"}
          >
            {isOpen ? (
              <MailOpen size={20} />
            ) : (
              <Heart size={22} className="fill-rose-100 text-[#8B0000] animate-pulse" />
            )}
            
            {/* Wax seal ring design */}
            <span className="absolute inset-1 rounded-full border border-dashed border-[#ff4d4d]/30 pointer-events-none" />
          </button>

        </div>

        {/* Read instructions */}
        <p className="text-[10px] font-mono text-slate-500 mt-16 tracking-widest text-center">
          {isOpen ? "*SCROLL INSIDE THE PAPER TO READ THE FULL TEXT*" : "*CLICK THE HEART SEAL TO DECRYPT AND READ*"}
        </p>

      </div>
    </section>
  );
}
