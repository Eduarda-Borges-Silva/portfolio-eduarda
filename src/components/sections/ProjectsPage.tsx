import { ArrowLeft } from "lucide-react";
import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionTitle } from "../ui/SectionTitle";

export function ProjectsPage() {
  return (
    <section id="projetos" className="projects-section projects-page">
      <div className="container">
        <a className="projects-back-link" href="/#inicio">
          <ArrowLeft size={17} />
          Voltar ao portfólio
        </a>
        <SectionTitle
          eyebrow="Projetos"
          title="Cases, soluções e aprendizados."
          text="Explore os detalhes, objetivos, funcionalidades e tecnologias de cada projeto."
        />
        <div className="projects-stack">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
