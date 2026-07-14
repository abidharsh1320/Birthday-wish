"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, Globe, Heart, School } from "lucide-react";
import timelineData from "../../data/timeline.json";

const InstagramIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Timeline() {
  const getTimelineIcon = (iconName: string) => {
    switch (iconName) {
      case "school":
        return <School size={16} className="text-rose-400" />;
      case "globe":
        return <Globe size={16} className="text-purple-400 animate-spin" style={{ animationDuration: '20s' }} />;
      case "instagram":
        return <InstagramIcon size={16} className="text-pink-400" />;
      case "heart":
        return <Heart size={16} className="text-rose-500 animate-pulse" />;
      case "gift":
        return <Gift size={16} className="text-amber-400" />;
      default:
        return <Heart size={16} className="text-rose-400" />;
    }
  };

  return (
    <section className="py-24 px-4 w-full relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background soft blur glow */}
      <div className="absolute bottom-1/3 left-1/4 w-[280px] h-[280px] rounded-full bg-purple-500/5 blur-[90px] pointer-events-none" />

      <div className="w-full max-w-[850px] z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-100 tracking-wide mb-3">
            Interactive Timeline
          </h2>
          <p className="text-sm font-mono text-rose-400/80 uppercase tracking-widest">
            A chronological mapping of our path crossing
          </p>
        </div>

        {/* Timeline Line & Cards */}
        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:left-1/2 md:-translate-x-[0.5px] py-4 space-y-12">
          
          {timelineData.events.map((event, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`relative w-full flex flex-col md:flex-row md:items-center ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Connector dot on the center line */}
                <div className="absolute -left-[24.5px] md:left-1/2 md:-translate-x-[20px] top-1.5 md:top-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center z-10 shadow-lg group">
                  <div className="w-8 h-8 rounded-full bg-slate-950/80 border border-rose-500/20 flex items-center justify-center transition-all group-hover:border-rose-400/40">
                    {getTimelineIcon(event.icon)}
                  </div>
                </div>

                {/* Card Container */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 60, damping: 14 }}
                  className={`w-[calc(100%-2rem)] ml-8 md:ml-0 md:w-[45%] p-6 rounded-2xl glass-panel border border-white/5 relative hover:border-rose-500/25 transition-all duration-300 ${
                    isLeft ? "md:mr-[5%]" : "md:ml-[5%]"
                  }`}
                >
                  {/* Decorative glow corner */}
                  <div className="absolute -top-12 -right-12 w-20 h-20 rounded-full bg-white/3 blur-lg" />
                  
                  {/* Period badge */}
                  <span className="text-[10px] font-mono text-rose-400 tracking-widest uppercase border border-rose-500/20 bg-rose-500/5 px-2.5 py-0.5 rounded">
                    {event.period}
                  </span>

                  <h3 className="text-lg font-serif text-slate-100 mt-3 leading-tight">
                    {event.title}
                  </h3>
                  
                  <span className="text-xs font-mono text-slate-400 block mt-1">
                    {event.subtitle}
                  </span>
                  
                  <p className="text-xs md:text-sm text-slate-400/90 font-light mt-3 leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
