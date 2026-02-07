"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Phone = dynamic(() => import("lucide-react").then((m) => m.Phone));
const Mail = dynamic(() => import("lucide-react").then((m) => m.Mail));
const Linkedin = dynamic(() => import("lucide-react").then((m) => m.Linkedin));
const MessageCircleMore = dynamic(() =>
  import("lucide-react").then((m) => m.MessageCircleMore)
);
const Plus = dynamic(() => import("lucide-react").then((m) => m.Plus));

export default function FloatingButton() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // close when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-6 right-6 flex flex-col items-center space-y-2"
    >
      {/* Icons (toggle visible) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col items-center space-y-2"
          >
            <a
              href="https://wa.me/+212651456226"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-green-500 text-white rounded-full shadow-lg"
              aria-label="Whatsapp Profile"
              onClick={() => setOpen(false)} // close after click
            >
              <MessageCircleMore size={24} />
            </a>

            <a
              href="tel:+212651456226"
              className="p-3 bg-blue-500 text-white rounded-full shadow-lg"
              aria-label="Phone Number"
              onClick={() => setOpen(false)}
            >
              <Phone size={24} />
            </a>

            <a
              href="mailto:contact@mohamedkadi.com"
              className="p-3 bg-red-500 text-white rounded-full shadow-lg"
              aria-label="Email Profile"
              onClick={() => setOpen(false)}
            >
              <Mail size={24} />
            </a>

            <a
              href="https://linkedin.com/in/mohamedkadi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-700 text-white rounded-full shadow-lg"
              aria-label="LinkedIn Profile"
              onClick={() => setOpen(false)}
            >
              <Linkedin size={24} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.95 }}
        className="p-4 bg-gray-800 text-white rounded-full shadow-lg"
        aria-label="Toggle Floating Menu"
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus size={24} />
        </motion.div>
      </motion.button>
    </div>
  );
}
