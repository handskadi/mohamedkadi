"use client";

import Image from "next/image";
import { FaLinkedin, FaGithub, FaStackOverflow, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const teamMembers = [
  {
    name: "Mohamed KADI",
    role: "Full Stack Developer",
    description: "A Full Stack Developer, from UX/UI design to complex backend architecture.",
    image: "/mohamedkadi.svg",
    social: {
      linkedin: "https://www.linkedin.com/in/mohamedkadi/",
      github: "https://github.com/handskadi",
      stackoverflow: "https://stackoverflow.com/users/9879112/mohamed-kadi",
      twitter: "https://x.com/handskadi",
      facebook: "https://facebook.com/mohamedkadi",
    },
  },
  {
    name: "Wafa M",
    role: "QA Expert",
    description: "A seasoned QA expert ensuring the highest quality of digital products.",
    image: "/wafamarouani.svg",
    social: {
      linkedin: "https://www.linkedin.com/in/mohamedkadi/",
      instagram: "https://www.instagram.com/handskadi/",
    },
  },
];

const Team = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6" id="team">
      <div className="mx-auto max-w-screen-xl text-center">
        {/* ✅ Section Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Team</h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Meet the professionals dedicated to crafting high-quality software solutions.
        </p>
      </div>

      {/* ✅ Team Grid */}
      <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-2 max-w-screen-lg mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg shadow-lg flex flex-col md:flex-row items-center dark:bg-gray-800 dark:border-gray-700 transition-all hover:shadow-xl"
          >
            {/* ✅ Optimized Member Image */}
            <div className="relative w-full md:w-40 h-40">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-lg md:rounded-none md:rounded-l-lg"
              />
            </div>

            {/* ✅ Member Info */}
            <div className="p-6 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <span className="text-gray-500 dark:text-gray-400">{member.role}</span>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{member.description}</p>

              {/* ✅ Social Links */}
              <div className="mt-4 flex justify-center md:justify-start space-x-4">
                {member.social.linkedin && (
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700" aria-label="LinkedIn Profile">
                    <FaLinkedin size={20} />
                  </a>
                )}
                {member.social.github && (
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black" aria-label="Github Profile">
                    <FaGithub size={20} />
                  </a>
                )}
                {member.social.stackoverflow && (
                  <a href={member.social.stackoverflow} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-600" aria-label="StackOverflow Profile">
                    <FaStackOverflow size={20} />
                  </a>
                )}
                {member.social.twitter && (
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400" aria-label="Twitter Profile">
                    <FaTwitter size={20} />
                  </a>
                )}
                {member.social.facebook && (
                  <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600" aria-label="FaceBook Profile">
                    <FaFacebook size={20} />
                  </a>
                )}
                {member.social.instagram && (
                  <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600" aria-label="Instagram Profile">
                    <FaInstagram size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
