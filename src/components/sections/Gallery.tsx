"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Image as ImageIcon, X } from "lucide-react";
import galleryData from "../../data/gallery.json";

export default function Gallery() {
  const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Biotechnology", "Memories", "Connection", "Dreams"];
  const items = galleryData.items;

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category === selectedCategory);

  const handleOpenLightbox = (id: number) => {
    const idx = items.findIndex(item => item.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % items.length);
    }
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <section className="py-24 px-4 w-full relative flex flex-col items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1100px] z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-100 tracking-wide mb-3">
            {galleryData.title}
          </h2>
          <p className="text-sm font-mono text-rose-400/80 uppercase tracking-widest">
            {galleryData.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                selectedCategory === cat
                  ? "bg-rose-500/10 border-rose-500/40 text-rose-300 shadow-md"
                  : "bg-slate-950/20 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Items */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenLightbox(item.id)}
                className="group cursor-pointer rounded-2xl glass-panel border border-white/5 overflow-hidden flex flex-col justify-between hover:border-rose-500/20 transition-all duration-300 min-h-[340px]"
              >
                {/* Image panel */}
                <div className="h-[200px] bg-slate-950/40 overflow-hidden relative flex items-center justify-center border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent z-10" />
                  
                  {/* Actual image */}
                  <img
                    src={`${basePath}/images/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => {
                      // Fallback visual if images are missing
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  
                  {/* Fallback overlay block */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center z-0">
                    <ImageIcon size={32} className="text-rose-500/20 group-hover:text-rose-500/40 transition-colors" />
                    <span className="text-[10px] font-mono text-slate-600">CONCEPT IMAGE</span>
                  </div>

                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 z-20 text-[9px] font-mono tracking-wider uppercase bg-slate-950/80 border border-white/10 text-rose-300 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Text Description panel */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-serif text-slate-200 group-hover:text-rose-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <span className="text-[9px] font-mono text-slate-500/80 mt-4 flex items-center gap-1.5 uppercase">
                    View Moment <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-slate-950/95 flex items-center justify-center p-4 md:p-8"
              onClick={handleCloseLightbox}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLightbox}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all z-20"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevLightbox();
                }}
                className="absolute left-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all z-20"
                aria-label="Previous Image"
              >
                &larr;
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextLightbox();
                }}
                className="absolute right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all z-20"
                aria-label="Next Image"
              >
                &rarr;
              </button>

              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full max-w-[850px] rounded-3xl overflow-hidden glass-panel border border-white/10 flex flex-col md:flex-row relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image container */}
                <div className="w-full md:w-3/5 bg-slate-950 flex items-center justify-center h-[300px] md:h-[450px] border-r border-white/5 relative">
                  <img
                    src={`${basePath}/images/${items[lightboxIndex].image}`}
                    alt={items[lightboxIndex].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-slate-600 z-0">
                    <ImageIcon size={44} className="text-rose-500/10" />
                    <span className="text-xs font-mono">IMAGE DISPLAY</span>
                  </div>
                </div>

                {/* Content description container */}
                <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-slate-950/65">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-widest uppercase border border-rose-500/20 bg-rose-500/5 px-2.5 py-1 rounded text-rose-300 w-max">
                      {items[lightboxIndex].category}
                    </span>
                    <h3 className="text-2xl font-serif text-slate-100 tracking-wide leading-tight">
                      {items[lightboxIndex].title}
                    </h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      {items[lightboxIndex].description}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-6 mt-8 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>MOMENT ID: 0{items[lightboxIndex].id}</span>
                    <span>{lightboxIndex + 1} OF {items.length}</span>
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
