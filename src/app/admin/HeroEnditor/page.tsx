"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface HeroData {
  title: string;
  taglines: string[];
}

const AdminHeroEditor = () => {
  const [hero, setHero] = useState<HeroData>({
    title: "",
    taglines: [""],
  });

  useEffect(() => {
    const fetchHero = async () => {
      const docSnap = await getDoc(doc(db, "hero", "main"));
      if (docSnap.exists()) setHero(docSnap.data() as HeroData);
    };
    fetchHero();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const handleTaglineChange = (index: number, value: string) => {
    const newTaglines = [...hero.taglines];
    newTaglines[index] = value;
    setHero({ ...hero, taglines: newTaglines });
  };

  const addTagline = () => {
    setHero({ ...hero, taglines: [...hero.taglines, ""] });
  };

  const removeTagline = (index: number) => {
    const newTaglines = [...hero.taglines];
    newTaglines.splice(index, 1);
    setHero({ ...hero, taglines: newTaglines });
  };

  const handleSave = async () => {
    await setDoc(doc(db, "hero", "main"), hero);
    alert("✅ Hero section updated successfully");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">🎯 Edit Hero Section</h3>
      <div className="space-y-4">
        <input
          name="title"
          value={hero.title}
          onChange={handleChange}
          placeholder="Website Title"
          className="p-3 w-full border rounded-lg"
        />

        <label className="block text-sm font-medium mt-4">Taglines</label>
        {hero.taglines.map((tagline, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              value={tagline}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTaglineChange(index, e.target.value)
              }
              className="p-3 border w-full rounded-lg"
            />
            <button
              onClick={() => removeTagline(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addTagline}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Tagline
        </button>
        <br />
        <button
          onClick={handleSave}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          💾 Save Hero
        </button>
      </div>
    </div>
  );
};

export default AdminHeroEditor;
