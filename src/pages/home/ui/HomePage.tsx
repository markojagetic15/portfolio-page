import { Nav } from "../../../widgets/nav";
import { Hero } from "../../../widgets/hero";
import { Applications } from "../../../widgets/applications";
import { History } from "../../../widgets/history";
import { Characteristics } from "../../../widgets/characteristics";
import { Contact } from "../../../widgets/contact";
import { Footer } from "../../../widgets/footer";
import { CommandPalette } from "../../../features/command-palette";
import { EasterEgg } from "../../../features/easter-egg";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Applications />
        <History />
        <Characteristics />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <EasterEgg />
    </>
  );
}
