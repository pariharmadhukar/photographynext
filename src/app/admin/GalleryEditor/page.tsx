"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface Photo {
  id: number;
  url: string;
  public_id?: string;
}

export default function AdminGalleryEditor() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "gallery", "main"));
      if (snap.exists()) {
        const data = snap.data();
        setPhotos(data.photos || []);
      }
    };
    fetchData();
  }, []);

  const handleUpload = (url: string) => {
    const newPhoto: Photo = {
      id: Date.now(),
      url,
    };
    setPhotos((prev) => [...prev, newPhoto]);
  };

  const handleDelete = (id: number) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const handleSave = async () => {
    await setDoc(doc(db, "gallery", "main"), { photos });
    alert("✅ Gallery updated!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#412619]">🖼️ Edit Gallery</h2>

      {/* Upload Button */}
      <div className="flex flex-wrap gap-4 mb-6">
        <CldUploadWidget
          uploadPreset="galleryupload"
          onSuccess={(result) => {
            const info = (result as { info?: { secure_url?: string } }).info;
            if (info && typeof info === "object" && "secure_url" in info && typeof info.secure_url === "string") {
              handleUpload(info.secure_url);
            }
          }}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className="px-6 py-3 bg-[#412619] text-white rounded hover:bg-[#5a3b26]"
              type="button"
            >
              ➕ Add Image
            </button>
          )}
        </CldUploadWidget>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          💾 Save Gallery
        </button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            <Image
              src={photo.url}
              alt="gallery"
              width={300}
              height={144}
              className="rounded-md w-full h-36 object-cover shadow"
            />
            <button
              onClick={() => handleDelete(photo.id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-90 hover:opacity-100 transition"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
