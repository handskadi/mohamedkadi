"use client";
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

export default function Home() {
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
      <Contact />
      <FloatingButton />
    </>
  );
}
