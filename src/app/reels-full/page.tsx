"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Define the Reels type
type Reels = {
  id: string;
  embedUrl: string;
};

const ReelsFull = () => {

  const [Reels, setReels] = useState<Reels[]>([]);

  useEffect(()=>{
const fetchReels = async () => {
      try {
        const snapshot = await getDoc(doc(db, "reels", "main"));
        if (snapshot.exists()) {
          const data = snapshot.data();
          setReels(data.reels || []);
        }
      } catch (error) {
        console.error("Error fetching Reels:", error);
      }
    };

    fetchReels();
  },[])

  return (
    <div className="min-h-screen bg-[#fffaf7] px-4 py-8">
      <Link href="/" className="flex items-center mb-6 text-[#412619]">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Reels.map((reel) => (
          <div
            key={reel.id}
            className="rounded-xl overflow-hidden shadow-md relative"
          >
            <video
              src={reel.embedUrl}
              controls
              muted
              className="w-full h-72 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsFull;
