"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  // Sync Dark Mode on Page Load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // ✅ Smooth Scroll Function
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, target: string) => {
    e.preventDefault();
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false); // Close mobile menu after clicking a link
  };

  return (
    <nav className="w-full shadow-md bg-background transition-colors fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* ✅ Logo on Left */}
        <a href="#" className="text-xl font-bold text-foreground transition-colors">
          <Image
            src="/logo-dark.png"
            alt="Mohamed KADI - MKweb logo"
            width={149}
            height={58}
          />
        </a>

        {/* ✅ Desktop Menu Centered */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6">
            {[
              { name: "Home", href: "#hero" },
              { name: "About", href: "#about" },
              { name: "Features", href: "#features" },
              { name: "Portfolio", href: "#portfolio" },
              { name: "Testimonials", href: "#testimonials" },
              { name: "Skills", href: "#skills" },
              { name: "FAQ", href: "#faq" },
              { name: "Blog", href: "#blog" },
              { name: "Contact", href: "#contact" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => smoothScroll(e, item.href)}
                  className="text-foreground hover:text-blue-500 transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Dark Mode Toggle on Right (Desktop Only) */}
        <button onClick={toggleDarkMode} className="hidden md:block ml-4 text-foreground text-2xl transition-colors" aria-label="Open settings">
          {darkMode ? <FiSun className="text-yellow-500" /> : <FiMoon className="text-gray-500" />}
        </button>

        {/* ✅ Mobile Menu Button (Only in Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground text-2xl transition-colors"
          aria-label="Open menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background transition-all absolute top-[64px] w-full shadow-lg">
          <ul className="space-y-2 p-4">
            {[
              { name: "Home", href: "#hero" },
              { name: "About", href: "#about" },
              { name: "Features", href: "#features" },
              { name: "Portfolio", href: "#portfolio" },
              { name: "Testimonials", href: "#testimonials" },
              { name: "Skills", href: "#skills" },
              { name: "FAQ", href: "#faq" },
              { name: "Blog", href: "#blog" },
              { name: "Contact", href: "#contact" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => smoothScroll(e, item.href)}
                  className="block py-2 text-foreground hover:text-blue-500 transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}

            {/* ✅ Dark Mode Toggle (Inside Mobile Menu) */}
            <li className="border-t border-gray-300 dark:border-gray-600 pt-3">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-center py-2 text-foreground transition-colors"
              >
                {darkMode ? (
                  <>
                    <FiSun className="mr-2 text-yellow-500" /> Light Mode
                  </>
                ) : (
                  <>
                    <FiMoon className="mr-2 text-gray-500" /> Dark Mode
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
