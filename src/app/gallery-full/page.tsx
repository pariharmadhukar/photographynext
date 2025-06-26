"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface gallery {
  id: number;
  url: string;
}


export default function GalleryAll() {
  const router = useRouter();
  const [Gallery, setGallery] = useState<gallery[]>([]);


  useEffect(()=>{
      const fetchGallery = async () => {
           try {
             const snapshot = await getDoc(doc(db, "gallery", "main"));
             if (snapshot.exists()) {
               const data = snapshot.data();
               setGallery(data.photos || []);
             }
           } catch (error) {
             console.error("Error fetching gallery:", error);
           }
         };
     
         fetchGallery();
  },[])

  return (
    <section className="min-h-screen bg-[#faf7f5] px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#412619] hover:underline mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Title */}
      <h1 className="text-4xl font-serif text-[#412619] mb-8">All Captured Moments</h1>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Gallery.map((photo) => (
          <div key={photo.id} className="relative w-full h-[250px] rounded-xl overflow-hidden shadow-md">
            <Image
              src={photo.url}
              alt={`Photo ${photo.id}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
