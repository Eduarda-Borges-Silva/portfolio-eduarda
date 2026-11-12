import { motion } from "framer-motion";
import { BrainCircuit, Clapperboard, Database, HeartHandshake } from "lucide-react";
import type { Project } from "../../types";
import { useAccessibility } from "../../contexts/AccessibilityContext";

const icons = {
  "AniData": Clapperboard,
  "Neuroverse Hackathon 2025": Database,
  "MentorIA": BrainCircuit,
  "ConectaPCD": HeartHandshake
};

export function ProjectArtwork({ project, index }: { project: Project; index: number }) {
  const { shouldReduceMotion: reduced } = useAccessibility();
  const Icon = icons[project.title as keyof typeof icons] ?? Clapperboard;

  if (project.image) {
    return (
      <div className="project-artwork project-artwork-cover">
        <img
          src={project.image}
          alt={`Capa do projeto ${project.title}.`}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={`project-artwork project-artwork-${(index % 4) + 1}`}>
      <div className="project-art-grid" />
      <motion.div
        className="project-orbit project-orbit-a"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="project-orbit project-orbit-b"
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="project-main-icon"
        animate={reduced ? undefined : { y: [-8, 8, -8], rotateY: [0, 22, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon size={38} />
      </motion.div>
      <motion.div
        className="project-float-chip project-float-one"
        animate={reduced ? undefined : { y: [-6, 8, -6], rotate: [-5, 4, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {project.technologies[0] ?? "Projeto"}
      </motion.div>
      <motion.div
        className="project-float-chip project-float-two"
        animate={reduced ? undefined : { y: [8, -7, 8], rotate: [5, -4, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {project.technologies[1] ?? "Concluído"}
      </motion.div>
      <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}
