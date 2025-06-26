"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// 🧾 Type for fetched hero data
interface HeroData {
  title: string;
  taglines: string[];
  backgroundImageUrl: string;
}

// 🔁 3D Model
const Animated3D = () => {
  const texture = useTexture("./New.png");
  const cylRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (cylRef.current) cylRef.current.rotation.y += delta;
  });

  return (
    <group rotation={[0, 0.7, 0.5]}>
      <mesh ref={cylRef}>
        <cylinderGeometry args={[1, 1, 1, 80, 80, true]} />
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// 🖼 Canvas
const ModelCanvas = ({ cameraPos = [0, 0, 5] as [number, number, number] }) => (
  <Canvas camera={{ fov: 30, position: cameraPos }}>
    <Suspense fallback={null}>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 10, 6]} intensity={2} castShadow />
      <pointLight position={[-4, 2, 4]} intensity={1} />
      <spotLight position={[0, 5, -5]} angle={0.5} penumbra={1} intensity={1} />
      <Animated3D />
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={1.2}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.1}
        />
      </EffectComposer>
    </Suspense>
  </Canvas>
);

// 👑 Main Component
export default function Hero() {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "hero", "main");
      const snap = await getDoc(docRef);
      if (snap.exists()) setData(snap.data() as HeroData);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div id="home" className="w-screen min-h-screen bg-white text-[#412619]">
      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center relative pt-6">
        <section className="w-full h-[50vh] z-10">
          <ModelCanvas cameraPos={[0, 0, 6]} />
        </section>

        <motion.div className="w-full text-left px-4 mt-6 z-10">
          <motion.h1 className="text-5xl font-bold bg-gradient-to-r from-[#412619] to-[#ccd5ae] bg-clip-text text-transparent">
            {data.title}
          </motion.h1>
          <TypeAnimation
            sequence={data.taglines.flatMap((t) => [t, 2000])}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-lg md:text-4xl text-[#573422] font-medium mt-2 select-none text-center md:text-left"
          />
        </motion.div>

        <motion.footer className="text-sm py-4 select-none z-10">
          Scroll to explore more
        </motion.footer>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-row w-full h-screen">
        <motion.div className="w-1/2 flex flex-col justify-center items-start px-10">
          <motion.h1 className="text-[130px] font-bold mb-6 select-none leading-tight bg-gradient-to-r from-[#412619] to-[#ccd5ae] bg-clip-text text-transparent">
            {data.title}
          </motion.h1>
          <TypeAnimation
            sequence={data.taglines.flatMap((t) => [t, 2000])}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-lg md:text-4xl text-[#573422] font-medium mt-2 select-none text-left"
          />
        </motion.div>

        <motion.div className="w-1/2 h-full relative">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url('${data.backgroundImageUrl}')` }}
          />
          <div className="absolute inset-0 z-10">
            <ModelCanvas />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
