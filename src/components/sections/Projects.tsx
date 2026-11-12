import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects";
import { personalInfo } from "../../data/personal";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionTitle } from "../ui/SectionTitle";
import { ScrollReveal } from "../ui/ScrollReveal";

export function Projects() {
  return (
    <section id="projetos" className="projects-section">
      <div className="container">
        <div className="projects-heading-row">
          <SectionTitle
            eyebrow="Projetos"
            title="Soluções reais para desafios relevantes."
            text="Uma seleção de projetos que reúne front-end, back-end, dados, automação e experiências digitais."
          />
          <ScrollReveal direction="right">
            <a className="github-profile-link" href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
              Ver perfil no GitHub <ArrowUpRight size={16} />
            </a>
          </ScrollReveal>
        </div>

        <div className="projects-stack">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
