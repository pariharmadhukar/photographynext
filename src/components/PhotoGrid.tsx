"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

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

const PhotoGrid = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  return (
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
        {photos.slice(0, 8).map((photo, index) => (
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
                style={{ width: 300, height: 300 }}
              >
                <Image
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  width={300}
                  height={300}
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
    </section>
  );
};

export default PhotoGrid;
