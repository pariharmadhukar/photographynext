"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const photos = [
  { id: 1, url: "/assets/Photos/IMG_7028.JPG" },
  { id: 2, url: "/assets/Photos/IMG_7032.JPG" },
  { id: 3, url: "/assets/Photos/IMG_7035.JPG" },
  { id: 4, url: "/assets/Photos/IMG_7036.JPG" },
  { id: 5, url: "/assets/Photos/IMG_7038.JPG" },
  { id: 6, url: "/assets/Photos/IMG_7039.JPG" },
  { id: 7, url: "/assets/Photos/IMG_7040.JPG" },
  { id: 8, url: "/assets/Photos/IMG_7041.JPG" },
  { id: 9, url: "/assets/Photos/IMG_7043.JPG" },
  { id: 10, url: "/assets/Photos/IMG_7044.JPG" },
  { id: 11, url: "/assets/Photos/IMG_7046.JPG" },
  { id: 12, url: "/assets/Photos/IMG_7047.JPG" },
  { id: 13, url: "/assets/Photos/IMG_7048.JPG" },
  { id: 14, url: "/assets/Photos/IMG_7049.JPG" },
  { id: 15, url: "/assets/Photos/IMG_7050.JPG" },
  { id: 16, url: "/assets/Photos/IMG_7051.JPG" },
  { id: 17, url: "/assets/Photos/IMG_7052.JPG" },
  { id: 18, url: "/assets/Photos/IMG_7053.JPG" },
  { id: 19, url: "/assets/Photos/IMG_7054.JPG" },
  { id: 20, url: "/assets/Photos/IMG_7055.JPG" },
  { id: 21, url: "/assets/Photos/IMG_73301.JPG" },
  { id: 22, url: "/assets/Photos/IMG_7057.JPG" },
  { id: 23, url: "/assets/Photos/IMG_7058.JPG" },
  { id: 24, url: "/assets/Photos/IMG_7059.JPG" },
  { id: 25, url: "/assets/Photos/IMG_7060.JPG" },
  { id: 26, url: "/assets/Photos/IMG_7329.JPG" },
  { id: 27, url: "/assets/Photos/IMG_7620.PNG" },
  { id: 28, url: "/assets/Photos/IMG_7063.PNG" },
  { id: 29, url: "/assets/Photos/IMG_7323.JPG" },
  { id: 30, url: "/assets/Photos/IMG_7324.JPG" },
  { id: 31, url: "/assets/Photos/IMG_7325.JPG" },
  { id: 32, url: "/assets/Photos/IMG_7326.JPG" },
  { id: 33, url: "/assets/Photos/IMG_7327.JPG" },
];

export default function GalleryAll() {
  const router = useRouter();

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
        {photos.map((photo) => (
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
