"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "M. Abdou",
    role: "CEO, MGLS",
    review: "Exceptional service and expertise! Our website was transformed into a professional and high-performing platform, leading to increased client engagement and trust.",
    image: "/profile.jpg",
  },
  {
    name: "A. Ilhsan",
    role: "CEO, ELAM",
    review: "Working with this team has been a game-changer for our company. Their full-stack expertise ensured a seamless digital transformation for our business.",
    image: "/profile.jpg",
  },
  {
    name: "E. Hicham",
    role: "CEO, Red Platinum",
    review: "They provided us with a modern and scalable website, helping us improve our online presence and attract more clients. Highly recommended!",
    image: "/profile.jpg",
  },
  {
    name: "O. Jawad",
    role: "Manager, Sahara Service",
    review: "The dedication and attention to detail in the development process were outstanding. Our expectations were exceeded at every stage of the project.",
    image: "/profile.jpg",
  },
  {
    name: "M. Abdessamad",
    role: "CEO & Manager, Asara",
    review: "Asara now has a powerful online presence thanks to this team. Their expertise in UX/UI and development is unmatched.",
    image: "/profile.jpg",
  },
  {
    name: "N. Josh",
    role: "CEO, Really Simple",
    review: "A highly professional and skilled team! They built a robust system that optimized our workflow and improved customer experience.",
    image: "/profile.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6" id="testimonials">
      <div className="mx-auto max-w-screen-xl text-center">
        {/* ✅ Section Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">What Our Clients Say</h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Hear from industry leaders who have experienced our top-tier web development services.
        </p>
      </div>

      {/* ✅ Testimonials Grid */}
      <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition hover:shadow-xl"
          >
            {/* ✅ Client Info */}
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h6 className="font-bold text-sm text-gray-900 dark:text-white">{testimonial.name}</h6>
                <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </div>

            {/* ✅ Testimonial Text */}
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">&quot;</span>
              {testimonial.review}
              <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">&quot;</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
