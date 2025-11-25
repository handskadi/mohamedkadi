import Link from "next/link";
import { FaGithub, FaLinkedin, FaSquareXTwitter, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Left Section - Branding & Copyright */}
        <div>
          <h2 className="text-xl font-semibold">Mohamed KADI</h2>
          <p className="text-sm mt-1">Full Stack Developer | MERN | Next.js | WordPress</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            © {new Date().getFullYear()} Mohamed KADI. All rights reserved.
          </p>
        </div>

        {/* Middle Section - Navigation Links */}
        <nav className="mt-6 md:mt-0">
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-500 transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-blue-500 transition-colors">
                Tools
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-blue-500 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Section - Social Links */}
        <div className="mt-6 md:mt-0 flex space-x-4">
          <a
            href="https://github.com/handskadi"
            target="_blank"
            className="text-xl hover:text-blue-500 transition-colors"
            aria-label="Github Profile"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/mohamedkadi"
            target="_blank"
            className="text-xl hover:text-blue-500 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/handskadi"
            target="_blank"
            className="text-xl hover:text-blue-500 transition-colors"
            aria-label="Twitter Profile"
          >
            <FaSquareXTwitter />
          </a>
          <a
            href="mailto:handskadi@gmail.com"
            className="text-xl hover:text-blue-500 transition-colors"
            aria-label="Email Profile"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
