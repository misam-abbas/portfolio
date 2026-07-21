import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import TechOrbit from "@/components/sections/tech-orbit";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import GithubActivity from "@/components/sections/github-activity";
import Services from "@/components/sections/services";
import Certificates from "@/components/sections/certificates";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <TechOrbit />
      <Projects />
      <Experience />
      <GithubActivity />
      <Services />
      <Certificates />
      <Contact />
    </>
  );
}
