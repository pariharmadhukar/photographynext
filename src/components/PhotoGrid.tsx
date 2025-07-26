"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";


interface gallery {
  id: number;
  url: string;
}


const PhotoGrid = () => {

  const [Gallery, setGallery] = useState<gallery[]>([]);

  const [selectedPhoto, setSelectedPhoto] = useState<{ id: number; url: string } | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

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
  }, []);

  if (!Gallery) return <div>Loading...</div>;

  return (
    { Gallery && 
    <section id="gallery" className="pt-12 px-4 bg-[#faf7f5]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-serif text-center text-[#412619] mb-12"
      >
        Moments Captured
      </motion.h2>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={isMobile ? 1.2 : 3}
        spaceBetween={10}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-full max-w-6xl mx-auto"
      >
        {Gallery.slice(0, 8).map((photo, index) => (
          <SwiperSlide key={photo.id} className="p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}

            >
              <div
                className="relative mx-auto overflow-hidden rounded-xl shadow-md"
                style={{ width: 300, height: 250 }}
              >
                <Image
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  width={300}
                  height={280}
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-xl"
                  placeholder="empty"
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Show All Button */}
      <div className="text-center mt-10">
        <Link href="/gallery-full">
          <button className="px-6 py-2 bg-[#412619] text-white rounded-md hover:bg-[#5a3b26] transition">
            Show All
          </button>
        </Link>
      </div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-[90vw] h-[90vh] max-w-[800px] max-h-[600px]"
            >
              <Image
                src={selectedPhoto.url}
                alt={`Photo ${selectedPhoto.id}`}
                fill
                className="rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section> }
  );
};

export default PhotoGrid;
