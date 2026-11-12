import { ArrowUpRight, Check, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "../../types";
import { ProjectArtwork } from "./ProjectArtwork";
import { ScrollReveal } from "./ScrollReveal";
import { MagneticButton } from "../animation/MagneticButton";
import { TechnologyIcon } from "./TechnologyIcon";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { shouldReduceMotion: reduced } = useAccessibility();
  const reverse = index % 2 === 1;
  const highlights = project.highlights ?? [];

  return (
    <ScrollReveal direction={reverse ? "right" : "left"} className="project-showcase-wrap" viewportAmount={.02} duration={.55}>
      <motion.article
        className={`project-showcase v3-case ${reverse ? "project-showcase-reverse" : ""} ${project.image ? "project-showcase-with-cover" : ""}`}
        whileHover={reduced ? undefined : { y: -5 }}
        transition={{ type: "spring", stiffness: 220, damping: 22, duration: reduced ? 0 : undefined }}
        data-cursor="project"
      >
        <div className="project-art-side">
          <ProjectArtwork project={project} index={index} />
          <div className="v3-case-overlay">
            <span>{project.documentationStatus ?? "Case documentado"}</span>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              Explorar projeto <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="project-content-side">
          <div className="project-kicker-row">
            <span>Case {String(index + 1).padStart(2, "0")}</span>
            <span>{project.category ?? "Aplicação digital"}</span>
          </div>

          <h3>{project.title}</h3>
          {project.summary && <p className="project-summary">{project.summary}</p>}
          <div className="project-about">
            <h4>Sobre o projeto</h4>
            <p className="project-description">{project.description}</p>
          </div>

          <div className="v3-case-grid">
            <div>
              <h4>Objetivo</h4>
              <p>{project.objective ?? "Pendente de atualização."}</p>
            </div>
            <div>
              <h4>Problema identificado</h4>
              <p>{project.problem ?? "Pendente de atualização."}</p>
            </div>
          </div>

          {project.technicalHighlight && (
            <div className="v3-technical-highlight">
              <h4>Destaque técnico</h4>
              <p>{project.technicalHighlight}</p>
            </div>
          )}

          {highlights.length > 0 && (
            <div className="project-features">
              <h4>Principais funcionalidades</h4>
              <ul className="project-highlights">
                {highlights.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={reduced ? false : { opacity: 0, x: reverse ? 18 : -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduced ? 0 : .12 + itemIndex * .07, duration: reduced ? 0 : undefined }}
                  >
                    <Check size={16} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          <div className="project-technologies">
            <h4>Tecnologias utilizadas</h4>
            <div className="project-tech-list">
              {project.technologies.length > 0 ? project.technologies.map((technology, techIndex) => (
                <motion.span
                  key={technology}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduced ? 0 : .08 + techIndex * .04, duration: reduced ? 0 : undefined }}
                >
                  <TechnologyIcon technology={technology} />
                  {technology}
                </motion.span>
              )) : <span>Stack pendente de atualização</span>}
            </div>
          </div>

          <div className="project-actions">
            <MagneticButton>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                Ver código
              </a>
            </MagneticButton>
            {project.projectUrl && (
              <MagneticButton>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} />
                  Ver projeto
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.article>
    </ScrollReveal>
  );
}
