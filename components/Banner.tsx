const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-[#B06AB3] px-6 py-12">
      <div className="container mx-auto flex flex-col justify-center items-center text-center">
        <h2 className="text-white sm:text-4xl text-3xl font-bold mb-6">
          Build Scalable & High-Performance Web Solutions
        </h2>
        <p className="text-white text-base text-center mb-12">
          I specialize in Full Stack Development using React, Next.js, Node.js, WordPress, and more.
          Let&apos;s turn your ideas into reality with modern, optimized, and responsive web
          applications.
        </p>

        <a
          href="#contact"
          className="bg-white text-[15px] text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100 transition"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default Banner;
