"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface Service {
  title: string;
  description: string;
  image: string;
}

export default function AdminServicesEditor() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "services", "main");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setServices(data.services || []);
      }
    };
    fetchData();
  }, []);

  const handleChange = (index: number, field: keyof Service, value: string) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleSave = async () => {
    await setDoc(doc(db, "services", "main"), { services });
    alert("✅ Services updated successfully!");
  };

  const handleAddService = () => {
    setServices([...services, { title: "", description: "", image: "" }]);
  };

  const handleRemoveService = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#412619]">✍️ Edit Services</h2>

      {services.map((service, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 mb-6 bg-white shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-[#412619]">Service {index + 1}</h3>
            <button
              onClick={() => handleRemoveService(index)}
              className="text-sm text-white bg-red-600 hover:bg-red-700 border border-red-700 rounded-lg py-1 px-3"
              title="Remove Service"
            >
              Remove
            </button>
          </div>

          <input
            className="border p-2 w-full mb-2"
            value={service.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="border p-2 w-full mb-2"
            value={service.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            placeholder="Description"
            rows={3}
          />

          <div className="mb-2">
            <CldUploadWidget
              uploadPreset="servicesimg"
              onSuccess={(result) => {
                const info = (result as { info?: unknown })?.info;

                if (
                  info &&
                  typeof info === "object" &&
                  "secure_url" in info &&
                  typeof (info as { secure_url: unknown }).secure_url === "string"
                ) {
                  const secureUrl = (info as { secure_url: string }).secure_url;
                  const updated = [...services];
                  updated[index].image = secureUrl;
                  setServices(updated);
                }
              }}
            >
              {({ open }: { open: () => void }) => (
                <button
                  onClick={() => open()}
                  className="px-4 py-2 bg-[#412619] text-white rounded mb-2"
                  type="button"
                >
                  Upload Image
                </button>
              )}
            </CldUploadWidget>

            {service.image && (
              <div className="mt-2">
                <Image
                  src={service.image}
                  alt={`Service ${index + 1} image`}
                  width={300}
                  height={160}
                  className="w-full max-w-xs h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={handleAddService}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded"
        >
          ➕ Add New Service
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded"
        >
          💾 Save All Services
        </button>
      </div>
    </div>
  );
}
