import type { JSX } from "react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { About } from "@/components/site/About";
import { Stack } from "@/components/site/Stack";
import { Experience } from "@/components/site/Experience";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { LEDTickerSection } from "@/components/site/LEDTickerSection";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SpotlightGrid } from "@/components/site/SpotlightGrid";
import { CustomCursor } from "@/components/site/CustomCursor";


export default function Home(): JSX.Element {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <SpotlightGrid />
      <Nav />
      <main className="flex-1">
        <Hero />
        <LEDTickerSection />
        <Projects />
        <About />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
