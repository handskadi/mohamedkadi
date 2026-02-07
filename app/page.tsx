import FaqAccordion from "../components/FAQ";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Team from "../components/Team";
import Newsletter from "../components/Newsletter";
import Blog from "../components/Blog";
import Testimonials from "../components/Testimonials";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import AboutMe from "../components/AboutMe ";
import FloatingButton from "../components/FloatingButton";
import ToolShowcase from "@/components/ToolShowcase";
import { getTrustpilot } from "@/lib/getTrustpilot";
import TrustpilotCarouselV2 from "@/components/trustpilot/TrustpilotCarouselV2";

export default async function Home() {
  const data = await getTrustpilot();

  return (
    <>
      <Hero />
      <AboutMe />
      <ToolShowcase />
      <Features />
      <Portfolio />
      <Testimonials />
      <Skills />
      <Team />
      <FaqAccordion />
      <Blog />
      <Banner />
      <Newsletter />
      <div className="mx-auto max-w-6xl p-6">
        <TrustpilotCarouselV2
          rate={data.rate}
          reviewsNum={data.reviewsNum}
          reviews={data.reviews}
          trustpilotUrl={data.url}
        />

      </div>
      <Contact />
      <FloatingButton />
    </>
  );
}
