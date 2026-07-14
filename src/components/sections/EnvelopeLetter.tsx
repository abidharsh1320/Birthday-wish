"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen, Heart, Sparkles, X } from "lucide-react";
import proposalData from "../../data/proposal.json";

export default function EnvelopeLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Open the letter overlay after the flap open animation completes
    setTimeout(() => {
      setShowLetter(true);
    }, 700);
  };

  const handleClose = () => {
    setShowLetter(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

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
        <div className="relative w-full max-w-[500px] h-[320px] flex items-center justify-center">
          
          {/* Main Envelope Body Back */}
          <div className={`absolute inset-0 bg-[#0f071c]/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl transition-all duration-700 ${
            isOpen ? "scale-[1.03] translate-y-6" : ""
          }`}>
            {/* Triangular pocket lines inside back */}
            <div className="absolute inset-0 border-b-[160px] border-b-transparent border-l-[250px] border-l-[#150a26]/20 border-r-[250px] border-r-[#150a26]/20 bottom-0 rounded-b-2xl pointer-events-none" />
          </div>

          {/* Envelope Front Cover */}
          <div className={`absolute inset-0 bg-transparent rounded-2xl pointer-events-none z-30 transition-all duration-700 ${
            isOpen ? "scale-[1.03] translate-y-6" : ""
          }`}>
            {/* Folding shadow overlays */}
            <div className="absolute inset-0 border-t-[160px] border-t-transparent border-l-[250px] border-l-transparent border-r-[250px] border-r-transparent border-b-[160px] border-b-[#0b0414]/90 rounded-b-2xl" />
            <div className="absolute inset-0 border-l-[250px] border-l-[#120722]/60 border-t-[160px] border-t-transparent border-b-[160px] border-b-transparent rounded-l-2xl" />
            <div className="absolute inset-0 border-r-[250px] border-r-[#120722]/60 border-t-[160px] border-t-transparent border-b-[160px] border-b-transparent rounded-r-2xl" />
          </div>

          {/* Envelope Top Flap */}
          <div
            className={`absolute top-0 left-0 w-full h-[160px] bg-transparent origin-top transition-transform duration-700 z-40 ${
              isOpen ? "rotateX-180 -translate-y-[160px] scale-y-[-1] pointer-events-none" : ""
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, #180c2c 0%, #0d0519 100%)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
            }}
          />

          {/* Wax Seal / Click Button */}
          <button
            onClick={isOpen ? handleClose : handleOpen}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20px] w-14 h-14 rounded-full bg-[#8B0000] border-2 border-[#5C0000] shadow-lg flex items-center justify-center text-rose-100 hover:scale-110 active:scale-95 transition-all cursor-pointer z-50 ${
              isOpen ? "translate-y-[60px] opacity-0 pointer-events-none" : "animate-pulse"
            }`}
            aria-label="Open Letter"
          >
            <Heart size={22} className="fill-rose-100 text-[#8B0000] animate-pulse" />
            {/* Wax seal ring design */}
            <span className="absolute inset-1 rounded-full border border-dashed border-[#ff4d4d]/30 pointer-events-none" />
          </button>

        </div>

        {/* Read instructions */}
        <p className="text-[10px] font-mono text-slate-500 mt-12 tracking-widest text-center">
          *CLICK THE HEART WAX SEAL TO OPEN THE ENVELOPE AND READ*
        </p>

        {/* Dynamic Readable Fullscreen Letter Card Modal */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
              onClick={handleClose}
            >
              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="w-full max-w-[620px] bg-[#FAF9F6] text-slate-800 rounded-2xl shadow-2xl p-6 md:p-10 relative z-10 flex flex-col max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all z-20"
                  aria-label="Close Letter"
                >
                  <X size={16} />
                </button>

                {/* Letter Content container with scrollbar */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                  {/* Letter Header */}
                  <div className="border-b border-rose-500/10 pb-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-rose-500 font-mono text-[9px] tracking-widest uppercase mb-1">
                      <Sparkles size={10} /> {proposalData.preHeading}
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-slate-900 leading-tight">
                      {proposalData.heading}
                    </h3>
                    <span className="text-xs text-rose-500 font-serif italic block mt-1.5">
                      {proposalData.subheading}
                    </span>
                  </div>

                  {/* Letter Body Paragraphs */}
                  <div className="space-y-4 text-xs sm:text-sm font-sans font-light leading-relaxed text-slate-700 text-justify">
                    {proposalData.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Letter Sign-off */}
                  <div className="pt-4 border-t border-rose-500/10 flex flex-col items-end">
                    <span className="text-xs text-slate-500 italic font-serif">{proposalData.signOff}</span>
                    <span className="text-sm font-serif font-bold text-rose-500 mt-1">Your Well-Wisher</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
