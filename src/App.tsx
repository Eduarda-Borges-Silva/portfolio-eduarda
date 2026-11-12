import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { ProjectsPage } from "./components/sections/ProjectsPage";
import { Experience } from "./components/sections/Experience";
import { Education } from "./components/sections/Education";
import { Contact } from "./components/sections/Contact";
import { AmbientEffects } from "./components/ui/AmbientEffects";
import { AccessibilityWidget } from "./components/ui/AccessibilityWidget";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const isProjectsPage = window.location.pathname.replace(/\/+$/, "") === "/projetos";

  return (
    <AccessibilityProvider>
      <AmbientEffects />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header theme={theme} onToggle={toggleTheme} isProjectsPage={isProjectsPage} />
      <main id="conteudo">
        {isProjectsPage ? (
          <ProjectsPage />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <AccessibilityWidget />
    </AccessibilityProvider>
  );
}
