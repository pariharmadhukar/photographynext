"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface ContactData {
  subtitle: string;
  socialLinks: {
    instagram: string;
    whatsapp: string;
    phone: string;
  };
}

export default function AdminContactEditor() {
  const [contact, setContact] = useState<ContactData>({
    subtitle: "",
    socialLinks: {
      instagram: "",
      whatsapp: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "contact", "main"));
      if (snap.exists()) {
        setContact(snap.data() as ContactData);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field: string, value: string) => {
    if (field === "subtitle") {
      setContact((prev) => ({ ...prev, subtitle: value }));
    } else {
      setContact((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [field]: value },
      }));
    }
  };

  const handleSave = async () => {
    await setDoc(doc(db, "contact", "main"), contact);
    alert("Contact content updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#412619]">✍️ Edit Contact Section</h2>

      <label className="block text-gray-700 font-medium mb-1">Subtitle:</label>
      <textarea
        value={contact.subtitle}
        onChange={(e) => handleChange("subtitle", e.target.value)}
        rows={3}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        placeholder="Enter subtitle..."
      />

      <label className="block text-gray-700 font-medium mb-1">Instagram Link:</label>
      <input
        type="text"
        value={contact.socialLinks.instagram}
        onChange={(e) => handleChange("instagram", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        placeholder="https://www.instagram.com/..."
      />

      <label className="block text-gray-700 font-medium mb-1">WhatsApp Link:</label>
      <input
        type="text"
        value={contact.socialLinks.whatsapp}
        onChange={(e) => handleChange("whatsapp", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        placeholder="https://wa.me/91..."
      />

      <label className="block text-gray-700 font-medium mb-1">Phone Link:</label>
      <input
        type="text"
        value={contact.socialLinks.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-6"
        placeholder="tel:+91..."
      />

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
      >
        💾 Save Changes
      </button>
    </div>
  );
}
