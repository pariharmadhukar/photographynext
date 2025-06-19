"use client";
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

// 🌀 3D Model Component
const Animated3D = () => {
  const texture = useTexture("./New.png");
  const cylRef = useRef();

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

// 📝 Typing Tagline Component
const TaglineTyping = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 0.5 }}
  >
    <TypeAnimation
      sequence={[
        "Framing Moments, Capturing Stories.",
        2000,
        "Every Click Tells a Story.",
        2000,
        "Turning Life into Art Through a Lens.",
        2000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-lg md:text-4xl text-[#573422] font-medium mt-2 select-none text-center md:text-left"
    />
  </motion.div>
);

// 🌐 Canvas Wrapper
const ModelCanvas = ({ cameraPos = [0, 0, 5] }) => (
  <Canvas camera={{ fov: 30, position: cameraPos }}>
    <Suspense fallback={null}>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.9} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
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

// 💠 Main Hero Section
export default function Hero() {
  return (
    <div id="home" className="w-screen min-h-screen bg-white text-[#412619]">
      {/* 📱 Mobile Layout */}
      <div className="md:hidden flex flex-col items-center relative pt-6">
        {/* 🌀 3D Canvas at Top */}
        <section className="w-full h-[50vh] z-10 ">
          <ModelCanvas cameraPos={[0, 0, 6]} />
        </section>

        {/* 🧠 Heading & Typing Below */}
        <motion.div
          className="w-full text-left px-4 mt-6 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl font-bold select-none bg-gradient-to-r from-[#412619] to-[#ccd5ae] bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Tirth Photography
          </motion.h1>

          <TaglineTyping />
        </motion.div>

        {/* 📜 Footer */}
        <motion.footer
          className="text-sm py-4 select-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Scroll to explore more
        </motion.footer>
      </div>

      {/* 💻 Desktop Layout */}
      <div className="hidden md:flex flex-row w-full h-screen">
        {/* Left Panel */}
        <motion.div
          className="w-1/2 flex flex-col justify-center items-start px-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-[130px] font-bold mb-6 select-none leading-tight bg-gradient-to-r from-[#412619] to-[#ccd5ae] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Tirth Photography
          </motion.h1>
          <TaglineTyping />
        </motion.div>

        {/* Right Panel with background image */}
        <motion.div
          className="w-1/2 h-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url('/your-background.jpg')` }}
          />

          {/* Canvas on top of background */}
          <div className="absolute inset-0 z-10">
            <ModelCanvas />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
