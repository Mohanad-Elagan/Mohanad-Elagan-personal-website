import { HeroSection } from '@/components/sections/hero';
import { CompanyLogosSection } from '@/components/sections/company-logos';
import { CurrentlySection } from '@/components/sections/currently';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ResearchWritingSection, SoftwareProjectsSection } from '@/components/sections/projects';
import { JourneySection } from '@/components/sections/journey';
import { WritingSection } from '@/components/sections/writing';
import { CreativeSection } from '@/components/sections/creative';
import { ContactSection } from '@/components/sections/contact';
import { SiteReachSection } from '@/components/sections/site-reach';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CompanyLogosSection />
      <CurrentlySection />
      <ExperienceSection />
      <ResearchWritingSection />
      <SoftwareProjectsSection />
      <JourneySection />
      <WritingSection />
      <CreativeSection />
      <ContactSection />
      <SiteReachSection />
    </>
  );
}
