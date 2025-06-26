"use client";

import React from 'react';
import { motion } from 'framer-motion';

import Image from 'next/image';
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Service {
  title: string;
  description: string;
  image: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const snap = await getDoc(doc(db, "services", "main"));
      if (snap.exists()) setServices(snap.data().services || []);
    };
    fetchServices();
  }, []);

  if (!services) return <div>Loading...</div>;
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
            className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center gap-10`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="relative w-full h-52 md:h-72 md:w-1/2 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={service.image}
                alt={service.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 text-[#412619]">
              <div className="flex items-center mb-4">
               
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
