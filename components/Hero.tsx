import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <section
      className="grid md:grid-cols-2 items-center md:gap-4 gap-8 max-w-5xl max-md:max-w-md mx-auto px-6 my-20"
      id="home"
    >
      {/* ✅ Text Content */}
      <div className="max-md:order-1 max-md:text-center">
        <h1 className="text-foreground font-black md:text-4xl text-3xl md:leading-tight">
          MOHAMED KADI
          <br />
          <span className="text-zinc-500 dark:text-gray-300">
            <Typewriter
              words={[
                "Full Stack Developer",
                "React / Next.js Expert",
                "WordPress Developer",
                "Python / Flask Developer",
                "MERN Stack Developer",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
            />
          </span>
        </h1>
        <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {" "}
            ⵎⵓⵃⴰⵎⵎⴰⴷ
          </span>{" "}
          ⴽⴰⴷⵉ
        </h2>
        <p className="my-4 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
          I specialize in creating high-performance web applications, scalable architectures, and
          modern UI/UX solutions. Let&apos;s build your next great project together!
        </p>

        {/* ✅ CTA Button */}
        <a
          href="#contact"
          className="px-5 py-2.5 mt-10 rounded text-[15px] font-medium outline-none tracking-wide 
                    bg-stone-950 text-white border border-white transition 
                    hover:bg-white hover:text-black hover:border-black 
                    dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:border-black"
        >
          Contact Me
        </a>
      </div>

      {/* ✅ Hero Image */}
      <div className="flex justify-center items-center min-h-[400px] pt-5">
        <Image
          src="/mk-hero-image.webp"
          alt="Web Development Illustration"
          width={500}
          height={400}
          priority
          className="auto h-auto max-w-full max-h-[400px] md:max-h-[470px] object-contain dark:invert"
        />
      </div>
    </section>
  );
};

export default Hero;
