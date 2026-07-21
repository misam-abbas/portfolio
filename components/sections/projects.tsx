"use client";

import { useState } from "react";
import SectionHeading from "@/components/shared/section-heading";
import ProjectCard from "@/components/sections/project-card";
import ProjectModal from "@/components/sections/project-modal";
import { PROJECTS } from "@/constants/data";
import type { Project } from "@/types";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="container-portfolio">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A few production builds that show how I think about architecture, not just UI."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
