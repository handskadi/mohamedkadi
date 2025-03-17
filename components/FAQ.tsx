import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in Full Stack Web Development with expertise in React, Next.js, Node.js, Express, and Python (Flask). Additionally, I work with databases like MySQL and MongoDB, CMS platforms such as WordPress/WooCommerce, and front-end frameworks like Tailwind CSS, Sass, and Bootstrap.",
  },
  {
    question: "What experience do you have as a Web Developer?",
    answer: "I have over a decade of experience designing, developing, and maintaining websites. My expertise includes front-end and back-end development, WordPress theme/plugin development, e-commerce solutions, SEO optimization, and performance enhancement.",
  },
  {
    question: "Can you build custom WordPress themes and plugins?",
    answer: "Yes! I have extensive experience in WordPress development, including creating custom themes, building custom plugins, and optimizing websites for SEO and performance.",
  },
  {
    question: "Do you work with e-commerce platforms?",
    answer: "Yes! I have experience building e-commerce sites using WordPress (WooCommerce). I design and develop custom online stores with optimized performance and secure payment integration.",
  },
  {
    question: "Do you have experience with database management?",
    answer: "Absolutely! I work with both SQL and NoSQL databases, including MySQL and MongoDB. I design, optimize, and manage databases for scalable applications.",
  },
  {
    question: "What are your project management skills?",
    answer: "I am experienced with project management tools like Trello and Jira. I have successfully managed projects, coordinated with teams, and ensured timely delivery of software solutions.",
  },
  {
    question: "Do you have experience with DevOps and version control?",
    answer: "Yes! I use Git and GitHub for version control and collaboration. I also work with Linux command-line tools and manage deployments efficiently.",
  },
  {
    question: "Do you offer freelance services?",
    answer: "Yes, I provide freelance web development services, including full-stack development, WordPress customizations, website performance optimization, and SEO consulting. You can check my portfolio at www.mohamedkadi.com/portfolio.",
  },
  {
    question: "What languages do you speak?",
    answer: "I am proficient in English and French, and I also speak German at a B2 level.",
  },
];

const FaqAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="font-sans max-w-5xl mx-auto my-10" id="faq">
      {/* ✅ Heading & Subheader */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Full Stack Web Developer & React Specialist
        </p>
      </div>

      {/* ✅ Accordion List */}
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-300" role="accordion">
          <button
            type="button"
            className="w-full text-base font-semibold text-left px-4 py-6 text-gray-800 flex items-center focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <span className="mr-4">{faq.question}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[14px] h-[14px] fill-current ml-auto shrink-0 transition-transform duration-300 ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-4 pb-6">
              <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FaqAccordion;
