"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';


export default function About() {
  return (
    <div id="about" className="flex items-center justify-center min-h-screen w-full bg-white pt-10 pb-16 px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="border-[#412619] border-2 rounded-lg p-6 md:p-10 shadow-lg shadow-[#412619] w-full max-w-6xl bg-white"
      >
        <section className="bg-[#faf7f5] py-10 px-4 md:px-10 rounded-lg">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
            {/* Left - Image */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/me2.jpeg"
                alt="Photographer at work"
                className="rounded-2xl shadow-lg object-cover w-full h-full max-h-[400px]"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              className="w-full md:w-1/2 text-[#412619]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <p className="text-md md:text-lg leading-relaxed mb-4">
                Hello! I&apos;m <span className="font-semibold">Tirth</span>, a passionate photographer and visual artist specializing in storytelling through both still and motion pictures. With a strong command over Adobe Photoshop and Premiere Pro, I craft visually compelling content — from vibrant, retouched photographs to cinematic video edits.

              </p>
              <p className="text-md md:text-lg leading-relaxed">
               My work is driven by emotion, precision, and a creative eye. Whether it&apos;s a candid moment or a full-scale production, I focus on delivering high-quality visuals that leave a lasting impression. Let’s transform your memories into timeless visual stories.
              </p>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
