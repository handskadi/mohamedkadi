import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

const AboutMe = () => {
  return (
    <section id="about" className="py-16 bg-stone-200 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center max-w-screen-xl px-6">
        {/* ✅ Image Section */}
        <div className="md:w-1/2 flex justify-center p-6">
          <Image
            src="/mk-icon-rep.webp" // Change this with your actual image
            alt="Mohamed KADI - Full Stack Developer"
            width={800}
            height={800}
            className=""
          />
        </div>

        {/* ✅ Text Section */}
        <div className="md:w-1/2 p-6 text-center md:text-left">
          <span className="text-zinc-600 uppercase font-semibold text-sm">About Me</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-4">
            I’m{" "}
            <span className="text-zinc-500">
              <Typewriter
                words={["Mohamed ", "KADI"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
              />
            </span>
            , a Passionate Full Stack Developer
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            With extensive experience in **React, Next.js, Node.js, and DevOps**, I help businesses
            build modern, scalable, and high-performing web applications. My expertise spans from
            **UI/UX design** to complex **backend architecture** and **API development**.
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            I am committed to delivering **fast, secure, and SEO-friendly** digital solutions that
            enhance business success and user engagement.
          </p>

          {/* ✅ CTA Button */}
          <a
            href="#contact"
            className="mt-6 inline-block bg-stone-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
