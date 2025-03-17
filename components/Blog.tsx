"use client";

import Image from "next/image";

const blogPosts = [
  {
    title: "Why Every Business Needs a Website in 2024",
    category: "Business Growth",
    date: "7 days ago",
    description:
      "In today’s digital world, a website isn’t just an option—it’s a necessity. Learn how having a strong online presence increases credibility, reaches more customers, and boosts sales.",
    author: "M. KADI",
    avatar: "/mohamedkadi.jpg",
    link: "#",
  },
  {
    title: "The Power of Full Stack Development for Business Success",
    category: "Full Stack Development",
    date: "14 days ago",
    description:
      "Full Stack Development allows businesses to build scalable, secure, and high-performing applications. Discover why companies are investing in end-to-end solutions for their success.",
    author: "M. KADI",
    avatar: "/mohamedkadi.jpg",
    link: "#",
  },
  {
    title: "How Modern Web Technologies Drive Innovation",
    category: "Technology & Trends",
    date: "21 days ago",
    description:
      "From React and Next.js to cloud computing and AI, explore how modern web technologies are revolutionizing industries and transforming customer experiences.",
    author: "M. KADI",
    avatar: "/mohamedkadi.jpg",
    link: "#",
  },
];

const Blog = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6" id="blog">
      <div className="mx-auto max-w-screen-xl text-center">
        {/* ✅ Blog Section Header */}
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Explore insights on web development, full stack solutions, and why having a strong digital presence is crucial for business success.
        </p>
      </div>

      {/* ✅ Blog Grid */}
      <div className="grid gap-8 mt-12 lg:grid-cols-3 max-w-screen-lg mx-auto">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="flex flex-col p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition hover:shadow-xl"
          >
            {/* ✅ Blog Category & Date */}
            <div className="flex justify-between items-center mb-3 text-gray-500">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {post.category}
              </span>
              <span className="text-sm">{post.date}</span>
            </div>

            {/* ✅ Blog Title (Always at Top) */}
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href={post.link}>{post.title}</a>
            </h2>

            {/* ✅ Blog Description */}
            <p className="mb-5 text-gray-500 dark:text-gray-400 flex-grow">{post.description}</p>

            {/* ✅ Author Info (Always at Bottom) */}
            <div className="mt-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Image
                  src={post.avatar}
                  alt={post.author}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium dark:text-white">{post.author}</span>
              </div>

              {/* ✅ Read More Button */}
              <a
                href={post.link}
                className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Read more
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
