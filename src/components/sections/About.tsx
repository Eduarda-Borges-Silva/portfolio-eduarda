import { SectionTitle } from "../ui/SectionTitle";
import { ScrollReveal } from "../ui/ScrollReveal";

const facts = [
  "Engenharia de Software",
  "Conclusão prevista para 2027",
  "Franca – SP",
  "Desenvolvedora Full Stack",
  "Experiência administrativa",
  "Experiência com suporte de TI"
];

export function About() {
  return (
    <section id="sobre">
      <div className="container">
        <SectionTitle eyebrow="Sobre mim" title="Tecnologia, organização e aprendizado contínuo" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <ScrollReveal direction="left">
            <div className="card animated-panel space-y-5 p-7 leading-7 text-slate-600 dark:text-slate-300">
              <p>Sou estudante de Engenharia de Software na Uni-FACEF, com conclusão prevista para 2027. Tenho interesse em desenvolvimento Full Stack, aplicações web, APIs, bancos de dados e criação de sistemas organizados e funcionais.</p>
              <p>Minha trajetória profissional começou na área administrativa, onde desenvolvi experiência com elaboração de planilhas, relatórios e organização de informações. Atualmente, também atuo com suporte de TI, auxiliando na configuração e manutenção de equipamentos, sistemas, usuários, impressoras, redes e recursos tecnológicos.</p>
              <p>Busco oportunidades que me permitam aplicar meus conhecimentos, evoluir profissionalmente e contribuir para o desenvolvimento de soluções tecnológicas eficientes.</p>
            </div>
          </ScrollReveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {facts.map((fact, index) => (
              <ScrollReveal key={fact} direction="right" delay={index * 0.07}>
                <div className="card animated-panel p-4 font-medium">{fact}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
