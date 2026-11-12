import { courses, languages } from "../../data/courses";
import { education } from "../../data/education";
import { SectionTitle } from "../ui/SectionTitle";
import { ScrollReveal } from "../ui/ScrollReveal";

export function Education() {
  return (
    <section id="formacao">
      <div className="container">
        <SectionTitle eyebrow="Formação" title="Educação, cursos e idiomas" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            {education.map((item, index) => (
              <ScrollReveal key={item.course} direction="left" delay={index * 0.08}>
                <article className="card animated-panel p-6">
                  <p className="text-sm text-steel">{item.period}</p>
                  <h3 className="text-xl font-semibold">{item.course}</h3>
                  <p className="text-slate-500">{item.institution}</p>
                  <p className="mt-3 text-sm">{item.status}</p>
                  {item.description && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>}
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="right">
            <div className="card animated-panel p-6">
              <h3 className="text-xl font-semibold">Cursos adicionais</h3>
              <div className="mt-4 space-y-3">
                {courses.map((course, index) => (
                  <div className="course-row flex items-start justify-between gap-4 border-b border-slate-200 pb-3 text-sm dark:border-white/10" style={{ transitionDelay: `${index * 45}ms` }} key={course.name}>
                    <span>{course.name}</span>
                    <span className="text-right text-steel">{course.status}</span>
                  </div>
                ))}
              </div>
              <h3 className="mt-7 text-xl font-semibold">Idiomas</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {languages.map((language) => <span className="badge animated-badge" key={language}>{language}</span>)}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
