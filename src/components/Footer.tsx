"use client";
import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-[#412619] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Left Side - Copyright */}
        <p className="text-sm text-center md:text-left">
          © 2025 eMTrix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
