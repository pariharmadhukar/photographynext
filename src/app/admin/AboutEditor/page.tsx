"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface AboutData {
  title: string;
  name: string;
  paragraph1: string;
  imageUrl: string;
  public_id: string;
}

export default function AdminAboutEditor() {
  const [about, setAbout] = useState<AboutData>({
    title: "",
    name: "",
    paragraph1: "",
    imageUrl: "",
    public_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "about", "main"));
        if (snap.exists()) {
          const data = snap.data() as AboutData;
          setAbout({
            title: data.title || "",
            name: data.name || "",
            paragraph1: data.paragraph1 || "",
            imageUrl: data.imageUrl || "",
            public_id: data.public_id || "",
          });
        } else {
          setAbout({
            title: "About Me",
            name: "Your Name",
            paragraph1:
              "A passionate photographer and visual artist specializing in storytelling through both still and motion pictures. With a deep love for capturing moments and emotions, I strive to create compelling visual narratives that resonate with viewers.",
            imageUrl: "",
            public_id: "",
          });
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        alert("Failed to load about data. Please check console for details.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Current 'about' section state:", about);
  }, [about]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };

  const handleUpload = async (newImageUrl: string, newPublicId: string) => {
    setAbout((prev) => ({
      ...prev,
      imageUrl: newImageUrl,
      public_id: newPublicId,
    }));
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "about", "main"), about);
      alert("✅ About section updated!");
    } catch (error) {
      console.error("Error saving about data:", error);
      alert("❌ Failed to save about section. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#412619]">
        📝 Edit About Section
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input
            name="title"
            value={about.title}
            onChange={handleChange}
            placeholder="Title (e.g., About Me)"
            className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-[#412619] focus:border-transparent outline-none"
          />
          <input
            name="name"
            value={about.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-[#412619] focus:border-transparent outline-none"
          />
          <textarea
            name="paragraph1"
            value={about.paragraph1}
            onChange={handleChange}
            placeholder="Write your about paragraph here..."
            className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-[#412619] focus:border-transparent outline-none"
            rows={5}
          />

          <CldUploadWidget
            uploadPreset="aboutimage"
            onSuccess={(result) => {
              if (
                typeof result?.info === "object" &&
                result.info !== null &&
                "secure_url" in result.info &&
                "public_id" in result.info
              ) {
                const info = result.info as {
                  secure_url: string;
                  public_id: string;
                };
                handleUpload(info.secure_url, info.public_id);
              } else {
                alert("Upload failed: Missing secure URL or public ID.");
              }
            }}
            onError={(error) => {
              console.error("Cloudinary upload error:", error);
              alert("❌ Image upload failed. Please check console for details.");
            }}
          >
            {({ open }) => (
              <button
                onClick={() => open?.()}
                type="button"
                className="px-6 py-3 bg-[#412619] text-white rounded hover:bg-[#5a3629] transition-colors duration-200"
              >
                📤 Upload Image
              </button>
            )}
          </CldUploadWidget>

          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200 ml-2"
          >
            💾 Save About
          </button>
        </div>

        {about.imageUrl && (
          <div className="flex justify-center items-start">
            <div className="relative w-full h-80 max-w-sm rounded-lg shadow-md overflow-hidden">
              <Image
                src={about.imageUrl}
                alt="About Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
