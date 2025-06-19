"use client";

import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name:'Services', href:'#services'},
  { name:'Gallery', href:'#gallery'},
  { name: 'Contact', href: '#contact' },
  
];

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNavbar(false); // Hide near top
      } else {
        setShowNavbar(true);
        setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Navbar container */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md shadow-md transition-transform duration-300 ${
          !showNavbar || scrollDirection === 'up' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center h-16">
          <ul className="flex space-x-10 text-[#412619] text-lg font-medium">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="cursor-pointer hover:text-[#573422] transition"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end items-center h-16 px-6">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-3xl text-[#412619] focus:outline-none"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col justify-center items-center space-y-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-4xl text-[#412619]"
          >
            <FiX />
          </button>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-[#412619] cursor-pointer hover:text-[#573422] transition"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
