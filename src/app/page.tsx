"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "../components/effects/ParticleBackground";
import AudioPlayer from "../components/AudioPlayer";
import LoadingScreen from "../components/sections/LoadingScreen";
import Hero from "../components/sections/Hero";
import Story from "../components/sections/Story";
import About from "../components/sections/About";
import Wishes from "../components/sections/Wishes";
import Reasons from "../components/sections/Reasons";
import Gallery from "../components/sections/Gallery";
import Timeline from "../components/sections/Timeline";
import EnvelopeLetter from "../components/sections/EnvelopeLetter";
import IndirectProposal from "../components/sections/IndirectProposal";
import FinalCelebration from "../components/sections/FinalCelebration";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [nameEntered, setNameEntered] = useState("");

  const handleUnlock = (name: string) => {
    setNameEntered(name);
    setIsUnlocked(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#05020a] overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <LoadingScreen key="loader" onUnlock={handleUnlock} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full relative min-h-screen flex flex-col"
          >
            {/* Background elements */}
            <ParticleBackground />

            {/* Floating Audio Player */}
            <AudioPlayer />

            {/* Cinematic Sections */}
            <main className="relative z-10 w-full flex flex-col">
              <Hero />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <Story />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <About />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <Wishes />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <Reasons />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <Gallery />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <Timeline />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <EnvelopeLetter />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <IndirectProposal />
              
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <FinalCelebration nameEntered={nameEntered} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
