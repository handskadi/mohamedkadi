"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const scrollIfOnHome = (e: React.MouseEvent, href: string) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    }
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Features", href: "/#features" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Skills", href: "/#skills" },
    { name: "FAQ", href: "/#faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-background transition-colors">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <Image src="/logo-dark.png" alt="MK Web Logo" width={149} height={58} />
        </Link>

        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => scrollIfOnHome(e, item.href.replace("/", ""))}
                  className="text-foreground hover:text-blue-500 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={toggleDarkMode} className="hidden md:block text-xl">
          {darkMode ? <FiSun className="text-yellow-500" /> : <FiMoon />}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background shadow-lg">
          <ul className="space-y-2 p-4">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => scrollIfOnHome(e, item.href.replace("/", ""))}
                  className="block text-foreground hover:text-blue-500"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="border-t pt-3">
              <button
                onClick={toggleDarkMode}
                className="flex items-center w-full justify-center py-2"
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
