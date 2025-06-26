"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        if (pathname !== "/admin/LoginPage") {
          router.push("/admin/LoginPage");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/LoginPage");
  };

  // ✅ If it's the login page, skip layout and just render children
  if (pathname === "/admin/LoginPage") {
    return <>{children}</>;
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!authenticated) return null;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="bg-[#1f2937] text-white flex items-center justify-between px-4 py-3 lg:hidden">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1f2937] text-white p-6 space-y-6 z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:h-auto lg:block`}
      >
        <h2 className="text-2xl font-bold border-b pb-3">Admin Panel</h2>
        <nav className="space-y-3">
          <Link
            href="/admin/AboutEditor"
            className={`block px-4 py-2 rounded ${
              pathname === "/admin/AboutEditor"
                ? "bg-[#374151]"
                : "hover:bg-[#374151]"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            📄 About Section
          </Link>
          <Link
            href="/admin/HeroEnditor"
            className={`block px-4 py-2 rounded ${
              pathname === "/admin/HeroEnditor"
                ? "bg-[#374151]"
                : "hover:bg-[#374151]"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            🎯 Hero Section
          </Link>
          <Link
            href="/admin/ServicesEditor"
            className={`block px-4 py-2 rounded ${
              pathname === "/admin/ServicesEditor"
                ? "bg-[#374151]"
                : "hover:bg-[#374151]"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            🛠 Services Section
          </Link>
          <Link
            href="/admin/GalleryEditor"
            className={`block px-4 py-2 rounded ${
              pathname === "/admin/GalleryEditor"
                ? "bg-[#374151]"
                : "hover:bg-[#374151]"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            🖼️ Gallery Editor
          </Link>
          <Link
            href="/admin/ReelsEditor"
            className={`block px-4 py-2 rounded ${
              pathname === "/admin/ReelsEditor"
                ? "bg-[#374151]"
                : "hover:bg-[#374151]"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            🎬 Reels Editor
          </Link>
          <Link
            href="/admin/ContactEditor"
            className={`block px-4 py-2 rounded ${
              pathname === "/admin/ContactEditor"
                ? "bg-[#374151]"
                : "hover:bg-[#374151]"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            📞 Contact Editor
          </Link>
          <Link
            href="/admin/AdminProfile"
            className={`block px-4 py-2 rounded ${
              pathname === "/admin/AdminProfile"
                ? "bg-[#374151]"
                : "hover:bg-[#374151]"
            }`}
             onClick={() => setSidebarOpen(false)}
          >
            🔑 Admin Profile
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 bg-red-600 rounded hover:bg-red-700 mt-4"
          >
            🔒 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
