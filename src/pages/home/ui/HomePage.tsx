import { Nav } from "../../../widgets/nav";
import { Hero } from "../../../widgets/hero";
import { Steps } from "../../../widgets/steps";
import { History } from "../../../widgets/history";
import { Parts } from "../../../widgets/parts";
import { Contact } from "../../../widgets/contact";
import { Footer } from "../../../widgets/footer";
import { CommandPalette } from "../../../features/command-palette";
import { EasterEgg } from "../../../features/easter-egg";
import { SelectionProvider } from "../../../shared/lib/SelectionProvider";

export default function HomePage() {
  return (
    <SelectionProvider>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Steps />
        <History />
        <Parts />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <EasterEgg />
    </SelectionProvider>
  );
}
