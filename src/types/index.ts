export type ProjectStatus = "Concluído" | "Em desenvolvimento" | "Hackathon";
export type Project = {
  id: number; title: string; description: string; technologies: string[];
  githubUrl: string; projectUrl?: string; image?: string;
  status?: ProjectStatus;
  featured?: boolean;
  category?: string;
  summary?: string;
  highlights?: string[];
  objective?: string;
  problem?: string;
  technicalHighlight?: string;
  role?: string;
  documentationStatus?: string;
};
export type Experience = { role: string; company: string; period: string; description?: string; activities: string[] };
export type Education = { course: string; institution: string; period: string; status: string; description?: string };
