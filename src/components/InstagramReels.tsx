"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const reels = [
  { id: 1, embedUrl: "/assets/Video-138.mp4" },
  { id: 2, embedUrl: "/assets/Video-487.mp4" },
  { id: 3, embedUrl: "/assets/Video-985.mp4" },
  { id: 4, embedUrl: "/assets/Video-182.mp4" },
  { id: 5, embedUrl: "/assets/Video-262.mp4" },
  { id: 6, embedUrl: "/assets/Video-901.mp4" },
];

const InstagramReelsGrid = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const updateVisible = () => {
      setVisibleCount(window.innerWidth <= 768 ? 2 : 6);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  return (
    <section className="w-full min-h-screen bg-[#fdf8f5] py-24 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-serif text-center mb-14 bg-gradient-to-r from-[#d4a373] to-[#ccd5ae] bg-clip-text text-transparent"
      >
        Featured Video Stories
      </motion.h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {reels.slice(0, visibleCount).map((reel) => (
          <motion.div
            key={reel.id}
            className="rounded-xl overflow-hidden shadow-lg group relative cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => setActiveVideo(reel.embedUrl)}
          >
            <video
              src={reel.embedUrl}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg font-medium">
              ▶ Tap to Watch
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/reels-full">
          <button className="px-6 py-2 bg-[#d4a373] text-white rounded-full shadow-md hover:bg-[#b07e4f] transition duration-300">
            Show All
          </button>
        </Link>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-3xl relative"
              onClick={(e) => e.stopPropagation()} // prevent closing modal on video click
            >
              <video
                src={activeVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-[70vh] object-contain rounded-xl shadow-xl"
              />
              <button
                className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-40 rounded-full p-1"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InstagramReelsGrid;
