"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AboutData {
  title: string;
  name: string;
  paragraph1: string;
  imageUrl: string;
}

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "about", "main");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAboutData(docSnap.data() as AboutData);
      }
    };
    fetchData();
  }, []);

  if (!aboutData) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 md:px-10 pt-10 pb-16">
      <motion.div className="border-[#412619] border-2 rounded-lg p-6 md:p-10 shadow-lg shadow-[#412619] w-full max-w-6xl bg-white">
        <section className="bg-[#faf7f5] py-10 px-4 md:px-10 rounded-lg">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
            <motion.div className="w-full md:w-1/2">
              <div className="relative w-full h-96">
                <Image
                  src={aboutData.imageUrl}
                  alt="About"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>

            <motion.div className="w-full md:w-1/2 text-[#412619]">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{aboutData.title}</h2>
              <p className="text-md md:text-lg leading-relaxed mb-4">
                Hello! I’m <strong>{aboutData.name}</strong>, {aboutData.paragraph1}
              </p>
              
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
