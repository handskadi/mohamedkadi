"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import Image from "next/image";


type NavLink =
  | {
    name: string;
    href: string;
    submenu?: false;
  }
  | {
    name: string;
    submenu: true;
    items: { name: string; href: string }[];
  };



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const pathname = usePathname();
  let closeTimer = useRef<NodeJS.Timeout | null>(null);

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

  const links: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    {
      name: "Tools",
      submenu: true,
      items: [
        { name: "Image Compressor", href: "/tools/image-compressor" },
      ],
    },
    { name: "Contact", href: "/#contact" },
  ];


  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-background transition-colors">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <Image src="/logo-dark.png" alt="MK Web Logo" width={149} height={58} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6 items-center">
            {links.map((item) =>
              item.submenu ? (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimer.current) clearTimeout(closeTimer.current);
                    setSubmenuOpen(true);
                  }}
                  onMouseLeave={() => {
                    closeTimer.current = setTimeout(() => setSubmenuOpen(false), 200);
                  }}
                >
                  <button className="flex items-center gap-1 text-foreground hover:text-blue-500 transition-colors">
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${submenuOpen ? "rotate-180" : "rotate-0"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {submenuOpen && (
                    <ul className="absolute left-0 mt-2 w-52 bg-background  border border-gray-200  shadow-lg rounded opacity-100 transition-opacity duration-300 ease-in-out z-50">
                      {item.items.map((subitem) => (
                        <li key={subitem.href}>
                          <Link
                            href={subitem.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-background"
                          >
                            {subitem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => scrollIfOnHome(e, item.href!.replace("/", ""))}
                    className="text-foreground hover:text-blue-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleDarkMode} className="hidden md:block text-xl">
          {darkMode ? <FiSun className="text-yellow-500" /> : <FiMoon />}
        </button>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background shadow-lg">
          <ul className="space-y-2 p-4">
            {links.map((item) =>
              item.submenu ? (
                <li key={item.name}>
                  <button
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                    className="flex justify-between w-full text-foreground hover:text-blue-500"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-300 ${submenuOpen ? "rotate-180" : "rotate-0"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <ul
                    className={`pl-4 mt-2 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${submenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    {item.items.map((subitem) => (
                      <li key={subitem.href}>
                        <Link
                          href={subitem.href}
                          onClick={(e) =>
                            scrollIfOnHome(e, subitem.href.replace("/", ""))
                          }
                          className="block text-foreground hover:text-blue-500"
                        >
                          {subitem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => scrollIfOnHome(e, item.href!.replace("/", ""))}
                    className="block text-foreground hover:text-blue-500"
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
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
