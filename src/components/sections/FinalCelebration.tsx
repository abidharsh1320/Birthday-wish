"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Heart, Moon, Star, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

interface FinalCelebrationProps {
  nameEntered: string;
}

export default function FinalCelebration({ nameEntered }: FinalCelebrationProps) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [moonClicked, setMoonClicked] = useState(false);
  const [starWishesFound, setStarWishesFound] = useState<string[]>([]);
  const [activeStarWish, setActiveStarWish] = useState<string | null>(null);

  const starWishes = [
    "May your lab results always be accurate! 🧪",
    "May you find endless peace in your heart. 🌸",
    "May your M.Sc biotechnology studies be filled with breakthroughs! 🧬",
    "May your smile never fade away. 😊",
    "May our conversations continue to bring comfort. 💬"
  ];

  const triggerCelebration = () => {
    setCandlesBlown(true);
    
    // Multiple waves of confetti for a premium feel
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f43f5e", "#c084fc", "#fcd34d"]
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f43f5e", "#c084fc", "#fcd34d"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleStarClick = (idx: number) => {
    const wish = starWishes[idx];
    setActiveStarWish(wish);
    if (!starWishesFound.includes(wish)) {
      setStarWishesFound([...starWishesFound, wish]);
    }
    
    confetti({
      particleCount: 15,
      spread: 20,
      origin: { y: 0.8 },
      colors: ["#fcd34d", "#f43f5e"]
    });
  };

  const isPriya =
    nameEntered.toLowerCase().includes("priya") ||
    nameEntered.toLowerCase().includes("dharsh") ||
    nameEntered.toLowerCase().includes("dharshika");

  return (
    <section className="min-h-screen py-24 px-4 w-full relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background celebration lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />

      {/* Floating Interactive Moon Easter Egg */}
      <motion.button
        onClick={() => setMoonClicked(!moonClicked)}
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="absolute top-12 right-12 w-12 h-12 rounded-full flex items-center justify-center border border-white/5 bg-slate-900/40 text-amber-200 hover:text-amber-100 hover:border-amber-500/20 transition-all z-20 shadow-lg"
        aria-label="Interactive Moon"
      >
        <Moon size={22} className={moonClicked ? "fill-amber-200" : "animate-pulse"} />
      </motion.button>

      {/* Floating Stars Easter Egg */}
      <div className="absolute top-1/3 left-10 flex flex-col gap-6 items-center">
        {starWishes.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleStarClick(idx)}
            whileHover={{ scale: 1.2 }}
            className="w-8 h-8 rounded-full border border-white/5 bg-slate-900/30 flex items-center justify-center text-amber-300 hover:border-amber-400/30 shadow-md"
            aria-label={`Hidden star ${idx + 1}`}
          >
            <Star size={12} className="fill-amber-300/20 hover:fill-amber-300" />
          </motion.button>
        ))}
        <span className="text-[8px] font-mono text-slate-600 vertical-text select-none">TAP STARS</span>
      </div>

      <div className="w-full max-w-[800px] z-10 flex flex-col items-center gap-10 text-center">
        
        {/* Interactive Moon Overlay Panel */}
        <AnimatePresence>
          {moonClicked && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => setMoonClicked(false)}
              className="px-6 py-4 rounded-2xl glass-panel border border-amber-500/20 bg-slate-950/90 text-xs md:text-sm font-mono text-amber-200 max-w-[340px] cursor-pointer"
            >
              <p className="italic">
                "We are all like the moon, looking for someone to share our dark phases with."
              </p>
              <span className="text-[9px] text-slate-500 block mt-2.5 uppercase tracking-widest">
                *Click to close*
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Star Wish Reveal */}
        <AnimatePresence>
          {activeStarWish && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="px-5 py-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-200"
            >
              Star Wish Discovered: <span className="font-bold">{activeStarWish}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="space-y-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-4xl"
          >
            🎉
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-slate-100 tracking-wide">
            Let's Celebrate!
          </h2>
          
          <p className="text-sm font-mono text-rose-400/80 uppercase tracking-widest">
            {candlesBlown ? "Wish made! Have a magical year! 🎂✨" : "Blow out the birthday candles by clicking them!"}
          </p>
        </div>

        {/* Interactive Birthday Cake (SVG design) */}
        <div className="relative w-[280px] h-[280px] flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={triggerCelebration}
            className="cursor-pointer select-none"
          >
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              {/* Candles */}
              {!candlesBlown && (
                <>
                  {/* Candle 1 Flame */}
                  <motion.path
                    animate={{ scale: [1, 1.2, 0.9, 1.1, 1], y: [0, -2, 1, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    d="M75 45 C75 35 85 25 85 25 C85 25 95 35 95 45 C95 55 75 55 75 45 Z"
                    fill="url(#flameGrad)"
                  />
                  {/* Candle 2 Flame */}
                  <motion.path
                    animate={{ scale: [1.1, 0.9, 1.2, 1, 1.1], y: [-1, 1, -2, 0, -1] }}
                    transition={{ repeat: Infinity, duration: 1.3, delay: 0.2 }}
                    d="M105 45 C105 35 115 25 115 25 C115 25 125 35 125 45 C125 55 105 55 105 45 Z"
                    fill="url(#flameGrad)"
                  />
                </>
              )}

              {/* Candle Bodies */}
              <rect x="82" y="50" width="6" height="25" fill="#f43f5e" rx="2" />
              <rect x="112" y="50" width="6" height="25" fill="#a855f7" rx="2" />

              {/* Cake Top Layer */}
              <rect x="50" y="75" width="100" height="40" fill="#2d1d4c" rx="8" stroke="rgba(255,255,255,0.05)" />
              {/* Cream Drips */}
              <path d="M50 85 Q 55 95 60 85 T 70 85 T 80 95 T 90 85 T 100 85 T 110 95 T 120 85 T 130 85 T 140 95 T 150 85 L150 75 L50 75 Z" fill="#f43f5e" />

              {/* Cake Bottom Layer */}
              <rect x="35" y="115" width="130" height="50" fill="#1b0f33" rx="10" stroke="rgba(255,255,255,0.05)" />
              {/* Cream Drips Bottom */}
              <path d="M35 125 Q 45 135 55 125 T 75 125 T 95 135 T 115 125 T 135 125 T 155 135 T 165 125 L165 115 L35 115 Z" fill="#a855f7" />

              {/* Serving Stand Plate */}
              <ellipse cx="100" cy="170" rx="75" ry="12" fill="#583d72" />
              <rect x="85" y="170" width="30" height="15" fill="#432c58" />
              <ellipse cx="100" cy="183" rx="45" ry="8" fill="#432c58" />

              <defs>
                <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fffb00" />
                  <stop offset="40%" stopColor="#ff9000" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Candle blowout reset helper */}
          {candlesBlown && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                setCandlesBlown(false);
              }}
              className="absolute -bottom-4 px-3 py-1.5 rounded-full border border-white/5 bg-slate-900/60 text-slate-400 hover:text-white text-[9px] font-mono uppercase tracking-widest flex items-center gap-1 transition-all"
            >
              <RefreshCw size={10} /> Relight Candles
            </motion.button>
          )}
        </div>

        {/* Easter Egg: Personal Decrypted Message (if her name matches) */}
        <AnimatePresence>
          {isPriya && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-[550px] p-6 rounded-2xl glass-panel border border-emerald-500/20 bg-emerald-500/5 text-left relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-20 h-20 rounded-full bg-emerald-500/10 blur-lg pointer-events-none" />
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300 flex-shrink-0">
                  <Gift size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-1">
                    DECRYPTED VISITOR EASTER EGG
                  </h3>
                  <h4 className="text-base font-serif text-slate-200 mb-2">
                    To Priyadharshika (Capsule Owner)
                  </h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed font-sans">
                    You have unlocked this secret block! Thank you for walking through this capsule. Your reconnection is valued, and your academic dedication is deeply respected. I wish you the absolute best in M.Sc Biotechnology and all your upcoming labs. Keep shining. 🧬✨
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Sign-off */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Happy Birthday Priyadharshika. Turn 21 with grace.
          </p>
          <div className="text-[10px] font-mono text-slate-700">
            Designed with respect and appreciation.
          </div>
        </div>

      </div>
    </section>
  );
}
