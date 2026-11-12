import { AnimatePresence, motion } from "framer-motion";
import { Braces, Database, Gauge, Layers3, Smartphone, Workflow } from "lucide-react";
import { useMemo, useState } from "react";
import { skillGroups } from "../../data/skills";
import { SectionTitle } from "../ui/SectionTitle";

const icons = {
  "Front-end": Layers3,
  "Back-end": Braces,
  "Bancos de dados": Database,
  "Mobile": Smartphone,
  "Dados": Gauge,
  "Ferramentas": Workflow
};

export function Skills() {
  const [active, setActive] = useState<(typeof skillGroups)[number]["title"]>("Front-end");
  const current = useMemo(() => skillGroups.find((group) => group.title === active) ?? skillGroups[0], [active]);
  const Icon = icons[current.title];

  return (
    <section id="tecnologias" className="v3-skills">
      <div className="section-ambient skills-ambient" />
      <div className="container">
        <SectionTitle
          eyebrow="Tecnologias"
          title="Ferramentas organizadas como um ecossistema."
          text="Cada área ocupa uma função diferente dentro da construção de produtos digitais."
        />

        <div className="v3-skills-shell">
          <nav className="v3-skills-nav" aria-label="Categorias de tecnologias" role="tablist">
            {skillGroups.map((group, index) => (
              <button
                key={group.title}
                id={`skill-tab-${index}`}
                role="tab"
                tabIndex={active === group.title ? 0 : -1}
                aria-selected={active === group.title}
                aria-controls="skills-panel"
                className={active === group.title ? "is-active" : ""}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  event.preventDefault();
                  const next = (index + (event.key === "ArrowRight" ? 1 : skillGroups.length - 1)) % skillGroups.length;
                  setActive(skillGroups[next].title);
                  document.getElementById(`skill-tab-${next}`)?.focus();
                }}
                onClick={() => setActive(group.title)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{group.title}</strong>
                  <small>{group.label}</small>
                </div>
                <i />
              </button>
            ))}
          </nav>

          <div className="v3-skills-system" id="skills-panel" role="tabpanel" aria-labelledby={`skill-tab-${skillGroups.findIndex((group) => group.title === active)}`} tabIndex={0}>
            <div className="v3-system-grid" aria-hidden="true" />
            <div className="v3-system-connection v3-system-connection-a" aria-hidden="true" />
            <div className="v3-system-connection v3-system-connection-b" aria-hidden="true" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                className="v3-system-content"
                initial={{ opacity: 0, x: 36, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -28, filter: "blur(8px)" }}
                transition={{ duration: .48, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="v3-system-header">
                  <div className="v3-system-icon"><Icon size={28} /></div>
                  <div>
                    <span>Área ativa</span>
                    <h3>{current.title}</h3>
                  </div>
                </div>

                <p>{current.description}</p>

                <div className="v3-tech-orbit">
                  <div className="v3-tech-core">
                    <Icon size={34} />
                    <span>{current.label}</span>
                  </div>

                  <div className="v3-tech-cloud">
                    {current.items.map((item, index) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: .82, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: .08 + index * .055, duration: .38 }}
                      >
                        <i>{String(index + 1).padStart(2, "0")}</i>
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="v3-system-footer">
                  <span>STACK / {current.title.toUpperCase()}</span>
                  <span>{current.items.length} tecnologias</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
