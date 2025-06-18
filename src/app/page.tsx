

import { HeroSection } from '@/components/sections/hero';
import { ProjectsSection } from '@/components/sections/projects';
import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';
import { SkillsSection } from '@/components/sections/skills';
import { GraphicDesignSection } from '@/components/sections/graphic-design';
// import { CreativeWritingSection } from '@/components/sections/creative-writing'; // Removed
import { ExperienceSection } from '@/components/sections/experience-section';
import { CompanyLogosSection } from '@/components/sections/company-logos';

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-12 overflow-hidden"> {/* Adjusted vertical spacing & added overflow-hidden */}
      <div> {/* Wrapper for Hero and CompanyLogos */}
        <HeroSection />
        <CompanyLogosSection />
      </div>
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <GraphicDesignSection />
      {/* <CreativeWritingSection /> */} {/* Removed */}
      <ContactSection />
    </div>
  );
}

