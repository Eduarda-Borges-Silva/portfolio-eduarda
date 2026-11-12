import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Education } from "./components/sections/Education";
import { Contact } from "./components/sections/Contact";
import { AmbientEffects } from "./components/ui/AmbientEffects";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <AmbientEffects />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header theme={theme} onToggle={toggleTheme} />
      <main id="conteudo">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
