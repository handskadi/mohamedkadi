import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Phone = dynamic(() => import("lucide-react").then(mod => mod.Phone));
const Mail = dynamic(() => import("lucide-react").then(mod => mod.Mail));
const Linkedin = dynamic(() => import("lucide-react").then(mod => mod.Linkedin));
const MessageCircleMore = dynamic(() => import("lucide-react").then(mod => mod.MessageCircleMore));
const Plus = dynamic(() => import("lucide-react").then(mod => mod.Plus));



const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 flex flex-col items-center space-y-2 group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Social Links (Appear on Hover) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center space-y-2"
      >
        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/+212651456226"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-green-500 text-white rounded-full shadow-lg"
          aria-label="Whatsapp Profile"
        >
          <MessageCircleMore size={24} />
        </motion.a>

        {/* Phone */}
        <motion.a
          href="tel:+212651456226"
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg"
          aria-label="Phone Number"
        >
          <Phone size={24} />
        </motion.a>

        {/* Email */}
        <motion.a
          href="mailto:contact@mohamedkadi.com"
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-red-500 text-white rounded-full shadow-lg"
          aria-label="Email Profile"
        >
          <Mail size={24} />
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="https://linkedin.com/in/mohamedkadi"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-blue-700 text-white rounded-full shadow-lg"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={24} />
        </motion.a>
      </motion.div>

      {/* Main Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        className="p-4 bg-gray-800 text-white rounded-full shadow-lg"
        aria-label="Open Floating Button"
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
};

export default FloatingButton;
