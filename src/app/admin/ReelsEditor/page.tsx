"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CldUploadWidget } from "next-cloudinary";

interface Reel {
  id: number;
  embedUrl: string;
}

export default function AdminReelsEditor() {
  const [reels, setReels] = useState<Reel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "reels", "main"));
      if (snap.exists()) {
        const data = snap.data();
        setReels(data.reels || []);
      }
    };
    fetchData();
  }, []);

  const handleUpload = (url: string) => {
    const newReel: Reel = { id: Date.now(), embedUrl: url };
    setReels((prev) => [...prev, newReel]);
  };

  const handleRemove = (id: number) => {
    setReels((prev) => prev.filter((reel) => reel.id !== id));
  };

  const handleSave = async () => {
    await setDoc(doc(db, "reels", "main"), { reels });
    alert("Reels updated!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#412619]">🎬 Edit Reels</h2>

      {/* Upload Widget */}
      <CldUploadWidget
        uploadPreset="reelsupload"
        onSuccess={(result) => {
          const info = (result as { info?: unknown })?.info;

          if (
            info &&
            typeof info === "object" &&
            "secure_url" in info &&
            typeof (info as { secure_url: unknown }).secure_url === "string"
          ) {
            handleUpload((info as { secure_url: string }).secure_url);
          }
        }}
      >
        {({ open }: { open: () => void }) => (
          <button
            onClick={() => open()}
            className="mb-4 px-4 py-2 bg-[#412619] text-white rounded"
            type="button"
          >
            ➕ Upload Reel
          </button>
        )}
      </CldUploadWidget>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reels.map((reel) => (
          <div key={reel.id} className="relative">
            <video
              src={reel.embedUrl}
              controls
              className="rounded-md w-full h-40 object-cover"
            />
            <button
              onClick={() => handleRemove(reel.id)}
              className="absolute top-1 right-1 text-white bg-red-600 rounded-full px-2 py-1 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded"
      >
        💾 Save All Reels
      </button>
    </div>
  );
}
