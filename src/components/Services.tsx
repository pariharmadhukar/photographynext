"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaCameraRetro, FaFilm, FaPenFancy, FaSlidersH } from 'react-icons/fa';
import Image from 'next/image';

const services = [
  {
    title: 'Creative Photography',
    icon: <FaCameraRetro size={32} />,
    description: 'Professional portraits, pre-wedding shoots, lifestyle, and candid photography with artistic flair.',
    image: 'https://i.pinimg.com/736x/63/7e/4a/637e4acd1b749f8aef8b3446512fc1da.jpg',
  },
  {
    title: 'Cinematic Videography',
    icon: <FaFilm size={32} />,
    description: 'High-definition video shoots including wedding films, short reels, ads, and events using Premiere Pro.',
    image: 'https://images.pexels.com/photos/2611465/pexels-photo-2611465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'Photo Retouching',
    icon: <FaPenFancy size={32} />,
    description: 'Advanced color grading, skin retouch, and background edits using Adobe Photoshop & Lightroom.',
    image: 'https://www.clippingpathcampus.com/wp-content/uploads/2021/11/Photo-retouching.jpg',
  },
  {
    title: 'Video Editing & Effects',
    icon: <FaSlidersH size={32} />,
    description: 'Stylized video editing with transitions, overlays, cinematic LUTs, synced audio using Premiere Pro.',
    image: 'https://images.indianexpress.com/2024/01/Adobe-Premiere-Pro-audio-editing.jpg',
  },
];

const Services = () => {
  return (
    <section id='services' className="bg-[#fffaf7] py-20 px-6 md:px-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#412619] mb-4">My Services</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          We provide premium media production services using the best industry tools like Adobe Premiere Pro and Photoshop.
        </p>
      </div>

      <div className="space-y-20">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            } items-center gap-10`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="w-full h-52  md:h-72  md:w-1/2 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={service.image}
                alt={service.title}
                className=" object-cover rounded-xl"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 text-[#412619]">
              <div className="flex items-center mb-4">
                <div className="text-[#412619] mr-3">{service.icon}</div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>
              <p className="text-md text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
