import { FaCode, FaLaptopCode, FaLock, FaRocket, FaCloud, FaUsers } from "react-icons/fa";

const features = [
  {
    title: "Full Stack Development",
    description:
      "Expertise in building scalable web applications using React, Next.js, Node.js, and Express.js.",
    icon: <FaCode className="text-blue-500 text-4xl" />,
  },
  {
    title: "Performance Optimization",
    description:
      "Delivering blazing-fast websites with optimized SEO, caching, and server-side rendering.",
    icon: <FaRocket className="text-purple-500 text-4xl" />,
  },
  {
    title: "Cybersecurity Best Practices",
    description:
      "Implementing secure authentication, authorization, and data protection for web applications.",
    icon: <FaLock className="text-red-500 text-4xl" />,
  },
  {
    title: "Cloud & Deployment",
    description:
      "Deploying applications on Vercel, AWS, and DigitalOcean with CI/CD and best DevOps practices.",
    icon: <FaCloud className="text-green-500 text-4xl" />,
  },
  {
    title: "WordPress & Custom Solutions",
    description: "Building custom WordPress themes and plugins tailored to business needs.",
    icon: <FaLaptopCode className="text-yellow-500 text-4xl" />,
  },
  {
    title: "Global Reach & Collaboration",
    description:
      "Collaborating with international clients and teams for remote software development.",
    icon: <FaUsers className="text-blue-600 text-4xl" />,
  },
];

const Features = () => {
  return (
    <div className="bg-[#F7F7F7]" id="features">
      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* ✅ Heading & Subheading */}
        <h2 className="text-slate-900 md:text-4xl text-3xl font-bold text-center mb-6">
          My Expertise & Services
        </h2>
        <p className="text-gray-600 text-lg text-center mb-12">
          Crafting scalable and high-performance web solutions for businesses worldwide.
        </p>

        {/* ✅ Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:max-w-md mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all p-8 flex flex-col items-center text-center"
            >
              {feature.icon}
              <h3 className="text-slate-900 text-lg font-semibold my-4">{feature.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
