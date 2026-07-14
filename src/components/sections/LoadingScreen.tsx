"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Dna, Lock, Unlock } from "lucide-react";

interface LoadingScreenProps {
  onUnlock: (nameEntered: string) => void;
}

export default function LoadingScreen({ onUnlock }: LoadingScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);
  const [step, setStep] = useState<"loading" | "unlock">("loading");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loadingSteps = [
    "Establishing connection...",
    "Scanning memory archives (2005 - 2026)...",
    "Initializing biotechnology data models...",
    "Synthesizing DNA double helix structures...",
    "Mapping Instagram chat parameters (reconnection delta: ~30 days)...",
    "Calibrating comfort zone dynamics...",
    "Polishing starry skies and aurora coordinates...",
    "Unlocking digital gift capsule..."
  ];

  // Log sequence
  useEffect(() => {
    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < loadingSteps.length) {
        setLogs((prev) => [...prev, loadingSteps[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    // Percentage progress
    const pctInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(pctInterval);
          setTimeout(() => {
            setStep("unlock");
          }, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 38);

    return () => {
      clearInterval(logInterval);
      clearInterval(pctInterval);
    };
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim().toLowerCase();
    
    if (!cleanName) {
      setErrorMsg("Please enter a name to authenticate.");
      return;
    }

    // Support variations of her name or nickname
    if (cleanName.includes("priya") || cleanName.includes("dharsh") || cleanName.includes("dharshika") || cleanName.includes("priyadharshika")) {
      onUnlock(name.trim());
    } else {
      // Allow any name but flag if it's not her, or let them enter. 
      // Actually, we want anyone to be able to enter if they want, but show a warning or just unlock it as a guest
      // The prompt says "Typing her name unlocks a hidden message". 
      // So let's unlock for ANY name, but pass it up so we know if it was Priyadharshika!
      onUnlock(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05020a] overflow-hidden px-4">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] top-1/4 left-1/3" />

      <div className="w-full max-w-[500px] z-10 flex flex-col justify-between min-h-[400px] glass-panel p-6 md:p-8 rounded-3xl border border-rose-500/10">
        
        {/* Step 1: Cinematic Loading Log Terminal */}
        <AnimatePresence mode="wait">
          {step === "loading" && (
            <motion.div
              key="loading-terminal"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col flex-1 font-mono justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between border-b border-rose-500/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Dna className="text-rose-400 animate-spin" style={{ animationDuration: "6s" }} size={20} />
                    <span className="text-xs font-semibold text-rose-300 tracking-wider">BIO-SYSTEMS CONSOLE v1.0.7</span>
                  </div>
                  <span className="text-xs text-rose-400">{percent}%</span>
                </div>

                <div className="space-y-1.5 overflow-hidden h-[180px] text-[11px] text-slate-300/80">
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-1"
                    >
                      <span className="text-rose-500/70">{">"}</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-100 ease-out"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500">
                  <span>SECURE MEMORY CHIP LOADED</span>
                  <span>SYSTEM ONLINE</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Input Name Unlock Panel */}
          {step === "unlock" && (
            <motion.div
              key="unlock-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center flex-1 text-center py-4"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center mb-6 text-rose-400"
              >
                <Lock size={24} />
              </motion.div>

              <h2 className="text-xl md:text-2xl font-serif text-rose-100 tracking-wide mb-2">
                Decryption Complete
              </h2>
              <p className="text-xs text-slate-400 font-mono max-w-[320px] mb-6">
                Enter your first name to unlock this handcrafted birthday capsule.
              </p>

              <form onSubmit={handleUnlock} className="w-full space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="Enter name..."
                    className="w-full px-5 py-3 rounded-full text-center text-sm font-mono glass-input uppercase tracking-widest text-rose-200 placeholder-slate-600"
                    autoFocus
                  />
                  <Sparkles size={16} className="absolute right-4 top-3.5 text-rose-400/40 pointer-events-none" />
                </div>

                {errorMsg && (
                  <p className="text-[11px] font-mono text-rose-400/80 animate-pulse">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-serif font-medium text-sm tracking-widest uppercase transition-all bg-gradient-to-r from-rose-500/20 to-purple-600/20 border border-rose-500/30 hover:border-rose-400/50 hover:bg-rose-500/30 text-rose-200 flex items-center justify-center gap-2"
                >
                  <Unlock size={14} /> Open Capsule
                </button>
              </form>

              <p className="text-[9px] font-mono text-slate-600 mt-6 tracking-wide">
                SYSTEM DESIGNED EXCLUSIVELY FOR PRIYADHARSHIKA
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
