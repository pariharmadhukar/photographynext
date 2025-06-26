"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaPhone } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [subtitle, setSubtitle] = useState("");
  const [links, setLinks] = useState({
    instagram: "https://www.instagram.com/",
    whatsapp: "https://wa.me/",
    phone: "tel:+91"
  });

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "contact", "main"));
      if (snap.exists()) {
        const data = snap.data();
        setSubtitle(data.subtitle || "");
        setLinks(data.socialLinks || {});
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_f70uz7k",
      "template_zl2zttl",
      e.target as HTMLFormElement,
      "akqebsGZogrNNw6BH"
    ).then(
      () => alert("Message sent successfully!"),
      () => alert("Message failed to send.")
    );
    (e.target as HTMLFormElement).reset();
  };
if (!links) return <div>Loading...</div>;
  return (
    <div id="contact" className="flex items-center justify-center min-h-screen w-full bg-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="border-[#412619] border-2 rounded-lg p-6 md:p-10 shadow-lg shadow-[#412619] bg-white w-full max-w-6xl"
      >
        <section className="bg-[#f9f5f3] py-8 md:py-12 px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left Side */}
            <div className="flex flex-col justify-center items-start space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#412619]">Connect with Me</h2>
              <p className="text-[#5e463c]">{subtitle}</p>
              <div className="flex gap-6 text-3xl text-[#412619]">
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                  <FaInstagram />
                </a>
                <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                  <FaWhatsapp />
                </a>
                <a href={links.phone} className="hover:text-blue-600">
                  <FaPhone />
                </a>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">
              <h3 className="text-2xl font-semibold mb-4 text-[#412619]">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 text-black">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#412619]"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#412619]"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#412619]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#412619] text-white px-6 py-2 rounded-md hover:bg-[#5e463c] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
