import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects";
import { personalInfo } from "../../data/personal";
import { SectionTitle } from "../ui/SectionTitle";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ProjectArtwork } from "../ui/ProjectArtwork";
import { TechnologyIcon } from "../ui/TechnologyIcon";

export function Projects() {
  return (
    <section id="projetos" className="projects-section">
      <div className="container">
        <div className="projects-heading-row">
          <SectionTitle
            eyebrow="Projetos"
            title="Soluções reais para desafios relevantes."
            text="Uma prévia de projetos. Na página completa, você encontra os detalhes, objetivos, funcionalidades e tecnologias de cada um."
          />
          <ScrollReveal direction="right">
            <a className="github-profile-link" href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
              Ver perfil no GitHub <ArrowUpRight size={16} />
            </a>
          </ScrollReveal>
        </div>

        <div className="project-preview-grid">
          {projects.slice(0, 2).map((project, index) => (
            <article className="project-preview-card" key={project.id}>
              <div className="project-preview-art">
                <ProjectArtwork project={project} index={index} />
                <span className="project-preview-index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="project-preview-content">
                <span className="project-preview-category">{project.category ?? "Projeto"}</span>
                <h3>{project.title}</h3>
                <p>{project.summary ?? project.description}</p>
                <div className="project-preview-technologies" aria-label="Tecnologias em destaque">
                  {project.technologies.slice(0, 3).map((technology) => (
                    <span key={technology}>
                      <TechnologyIcon technology={technology} />
                      {technology}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="project-preview-more">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <ScrollReveal className="projects-all-cta">
          <a className="btn-primary premium-button" href="/projetos">
            Ver mais projetos <ArrowRight size={18} />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
