import Image from "next/image";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PhotoGrid from "@/components/PhotoGrid";
import Services from "@/components/Services";
import InstagramReels from "@/components/InstagramReels";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
     <main className="font-sans overflow-hidden">
      <Navbar/>
      <Hero/>
      <About/>
      <Services/>
      <PhotoGrid/>
      <InstagramReels/>
      <Contact/>
      <Footer/>
    </main>
  );
}
