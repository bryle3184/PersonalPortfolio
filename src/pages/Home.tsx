import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import data from "../lib/data";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Projects from "../components/Projects";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Credentials from "../components/Credentials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      requestAnimationFrame(() =>
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <Nav person={data.person} />
      <main>
        <Hero person={data.person} hero={data.hero} marquee={data.marquee} />
        <Marquee items={data.marquee} />
        <About person={data.person} principles={data.principles} />
        <Experience experience={data.experience} />
        <Skills skills={data.techStack} />
        <Credentials credentials={data.credentials} />
        <Projects projects={data.projects} />
        <Contact person={data.person} />
      </main>
      <Footer person={data.person} marquee={data.marquee} />
    </div>
  );
}
