import { experiences } from "../../data/experiences";
import { SectionTitle } from "../ui/SectionTitle";
import { ScrollReveal } from "../ui/ScrollReveal";

export function Experience() {
  return (
    <section id="experiencia">
      <div className="container">
        <SectionTitle eyebrow="Experiência" title="Trajetória profissional" />
        <div className="experience-timeline relative ml-3 pl-8"><span className="experience-line-base"/><span className="experience-line-fill"/>
          {experiences.map((experience, index) => (
            <ScrollReveal key={experience.role} direction={index % 2 ? "right" : "left"} delay={index * 0.1}>
              <article className="card animated-panel relative mb-7 p-6 before:absolute before:-left-[2.65rem] before:top-8 before:h-4 before:w-4 before:rounded-full before:border-4 before:border-white before:bg-steel dark:before:border-ink">
                <p className="text-sm text-steel">{experience.period}</p>
                <h3 className="mt-1 text-xl font-semibold">{experience.role}</h3>
                <p className="font-medium text-slate-500">{experience.company}</p>
                {experience.description && <p className="mt-4 text-slate-600 dark:text-slate-300">{experience.description}</p>}
                <details className="experience-details mt-5">
                  <summary>Ver atividades ({experience.activities.length})</summary>
                  <ul className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                    {experience.activities.map((activity) => <li key={activity}>{activity}</li>)}
                  </ul>
                </details>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
