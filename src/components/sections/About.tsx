"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Award, Beaker, Calendar, GraduationCap, Microscope, Sparkles } from "lucide-react";
import birthdayData from "../../data/birthday.json";
import DnaHelix from "../effects/DnaHelix";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 14 }
    }
  };

  return (
    <section
      id="about-section"
      className="min-h-screen w-full py-24 px-4 flex items-center justify-center relative overflow-hidden"
    >
      {/* Molecule/Bio-Inspired background floating icons */}
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] rounded-full bg-rose-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[250px] h-[250px] rounded-full bg-emerald-500/3 blur-[80px] pointer-events-none" />

      {/* Subtle floating lab nodes in background */}
      <div className="absolute top-1/3 left-12 text-rose-500/10 animate-float pointer-events-none"><Beaker size={48} /></div>
      <div className="absolute bottom-1/3 right-12 text-emerald-500/10 animate-float-delayed pointer-events-none"><Microscope size={44} /></div>

      <div className="w-full max-w-[1100px] z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 font-mono text-[10px] tracking-widest uppercase mb-4"
          >
            <Microscope size={12} className="animate-pulse" />
            <span>Biotechnology Chapter</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-slate-100 tracking-wide mb-3">
            About Priyadharshika
          </h2>
          <p className="text-sm font-mono text-slate-400 max-w-[500px] mx-auto">
            Discovering life's building blocks, cell by cell, with dedication and curiosity.
          </p>
        </div>

        {/* Two-column Layout: Profile & DNA Helix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Column 1: Profile & Education Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* Bio Card */}
            <motion.div variants={cardVariants} className="p-6 rounded-2xl glass-panel border border-white/5 relative overflow-hidden group">
              {/* Corner decorative light */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-rose-500/10 blur-xl group-hover:bg-rose-500/20 transition-all duration-300" />
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300 flex-shrink-0">
                  <Award size={22} />
                </div>
                <div>
                  <h3 className="text-xs font-mono text-rose-400 tracking-widest uppercase mb-1">THE SCHOLAR</h3>
                  <h4 className="text-2xl font-serif text-slate-100 tracking-wide">{birthdayData.fullName}</h4>
                  <p className="text-slate-400 text-xs mt-2 font-mono flex items-center gap-1.5">
                    <Calendar size={12} /> Born {birthdayData.birthday} (Turning 21)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Education Journey Card */}
            <motion.div variants={cardVariants} className="p-6 rounded-2xl glass-panel border border-white/5 relative overflow-hidden group">
              <div className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 flex-shrink-0">
                  <GraduationCap size={22} />
                </div>
                <div className="w-full">
                  <h3 className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-2">EDUCATION JOURNEY</h3>
                  
                  {/* Journey Milestones */}
                  <div className="space-y-6 relative border-l border-white/5 pl-4 ml-2.5 mt-4">
                    
                    {/* B.Sc Biotechnology */}
                    <div className="relative">
                      {/* Bullet node */}
                      <div className="absolute -left-[24.5px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400/80 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded">COMPLETED</span>
                        <h4 className="text-base font-serif text-slate-100 mt-1">{birthdayData.education.completed}</h4>
                        <p className="text-xs text-slate-500 mt-1 font-mono">Synthesizing foundation knowledge in labs</p>
                      </div>
                    </div>

                    {/* M.Sc Biotechnology */}
                    <div className="relative">
                      {/* Bullet node */}
                      <div className="absolute -left-[24.5px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-purple-500/40 flex items-center justify-center animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-purple-400/80 border border-purple-500/20 bg-purple-500/5 px-2 py-0.5 rounded flex items-center gap-1.5 w-max">
                          <Sparkles size={8} className="animate-spin" style={{ animationDuration: "3s" }} /> NEXT JOURNEY
                        </span>
                        <h4 className="text-base font-serif text-slate-100 mt-1">{birthdayData.education.nextJourney}</h4>
                        <p className="text-xs text-slate-500 mt-1 font-mono">Specializing in molecular innovations and research</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Column 2: DNA Helix Interactive */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <DnaHelix />
          </div>

        </div>

      </div>
    </section>
  );
}
