import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "MGLS Travel Platform",
    category: "website",
    client: "M. Abdou, CEO",
    description: "A seamless travel booking platform with real-time updates and user-friendly interface.",
    image: "/project1.webp",
  },
  {
    id: 2,
    title: "ELAM Ecommerce Store",
    category: "website",
    client: "A. Ilhsan, CEO",
    description: "A fully functional eCommerce store with smooth UI, fast checkout, and secure payments.",
    image: "/project.webp",
  },
  {
    id: 3,
    title: "Red Platinum Transport System",
    category: "website",
    client: "E. Hicham, CEO",
    description: "A modern transport management system optimizing logistics and customer experience.",
    image: "/project2.webp",
  },
  {
    id: 4,
    title: "Sahara Service - SEO & Web Development",
    category: "seo",
    client: "O. Jawad, Manager",
    description: "Comprehensive SEO, web development, DevOps, and technical support.",
    image: "/project3.webp",
  },
  {
    id: 5,
    title: "Asara Digital Marketing",
    category: "website",
    client: "M. Abdessamad, CEO & Manager",
    description: "SEO, Paid Ads, and full website development for brand growth.",
    image: "/project4.webp",
  },
  {
    id: 6,
    title: "CRS Lead Gen & App Development",
    category: "app",
    client: "K. Hussain",
    description: "Lead generation strategies, website creation, and mobile app development.",
    image: "/project5.webp",
  },
];

const categories = [
  "all",
  "website",
  "app",
  "seo",
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900" id="portfolio">
      <div className="max-w-5xl mx-auto px-6">
        {/* ✅ Section Title */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Portfolio</h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Discover our latest projects showcasing innovation and expertise.
          </p>
        </div>

        {/* ✅ Category Filters */}
        <div className="flex flex-wrap justify-center mt-8 space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition ${activeCategory === category
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-blue-100 dark:text-gray-300"
                }`}
            >
              {category.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* ✅ Portfolio Grid (Boxed Layout) */}
        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative group overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
            >
              {/* ✅ Project Image */}
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* ✅ Project Info (Hidden by Default, Appears on Hover) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-80 text-white p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm text-blue-400">{project.client}</span>
                <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                <p className="mt-1 text-sm">{project.description}</p>
                <a href="#" className="mt-3 inline-block text-blue-400 hover:underline">
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
