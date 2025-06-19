"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const reels = [
  { id: 1, embedUrl: "/assets/Video-138.mp4" },
  { id: 2, embedUrl: "/assets/Video-487.mp4" },
  { id: 3, embedUrl: "/assets/Video-985.mp4" },
  { id: 4, embedUrl: "/assets/Video-182.mp4" },
  { id: 5, embedUrl: "/assets/Video-262.mp4" },
  { id: 6, embedUrl: "/assets/Video-901.mp4" },
  
];

const ReelsFull = () => {
  return (
    <div className="min-h-screen bg-[#fffaf7] px-4 py-8">
      <Link href="/" className="flex items-center mb-6 text-[#412619]">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reels.map((reel) => (
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
