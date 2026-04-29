import { Hero } from "../../../widgets/hero";
import { About } from "../../../widgets/about";
import { Experience } from "../../../widgets/experience";
import { Projects } from "../../../widgets/projects";
import { Skills } from "../../../widgets/skills";
import { Contact } from "../../../widgets/contact";
import { Nav } from "../../../widgets/nav";
import { Footer } from "../../../widgets/footer";
import { CommandPalette } from "../../../features/command-palette";
import { EasterEgg } from "../../../features/easter-egg";
import PageLoader from "../../../shared/ui/page-loader/PageLoader";
import ParticleBackground from "../../../shared/ui/particle-background/ParticleBackground";
import ScrollProgress from "../../../shared/ui/scroll-progress/ScrollProgress";
import Grain from "../../../shared/ui/grain/Grain";
import Cursor from "../../../shared/ui/cursor/Cursor";

const Divider = () => <div className="sectionDivider" />;

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <ParticleBackground />
      <ScrollProgress />
      <Grain />
      <Cursor />
      <EasterEgg />
      <CommandPalette />
      <Nav />
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Divider />
        <Skills />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
