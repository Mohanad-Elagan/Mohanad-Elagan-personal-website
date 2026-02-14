"use client";

import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { SectionTitle } from '@/components/section-title';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string; 
  logoUrl?: string | StaticImageData;
  imageHint?: string;
  skills?: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'exp1',
    title: 'Volunteer Research Assistant',
    company: "The Johns Hopkins University",
    companyUrl: 'https://www.jhu.edu/',
    location: 'Remote',
    startDate: '04/2025',
    endDate: 'Present',
    description: 'Social & Cognitive Origins Group\n• Contributed to behavioral research on social cognition (Theory of Mind, social learning), supporting hypothesis refinement and study direction.\n• Synthesized 30+ papers on social perception/biological motion and translated insights into clear, research-ready summaries.',
    logoUrl: '/img/jhu.jpg',
    imageHint: "Johns Hopkins University logo",
    skills: ['Social Cognition', 'Theory of Mind', 'Comparative Research', 'Literature Synthesis', 'Evolutionary Cognition'],
  },
  {
    id: 'exp2',
    title: 'Teaching Assistant',
    company: 'Berea College',
    companyUrl: 'https://www.berea.edu/',
    location: 'Berea, KY',
    startDate: '08/2024',
    endDate: 'Present',
    description: '• Support learning and problem-solving through tutoring and grading, strengthening student confidence and persistence.\n• Mentor 60+ students using structured feedback and step-by-step reasoning—skills relevant to psychoeducation and assessment feedback.',
    logoUrl: '/img/bc.png',
    imageHint: "college logo",
    skills: ['Tutoring', 'Instructional Design', 'Sensory Perception', 'Collaboration', 'Assessment'],
  },
  {
    id: 'exp6',
    title: 'Clinical Research Intern',
    company: 'Harvard Medical School',
    companyUrl: 'https://hms.harvard.edu/',
    location: 'Boston, Massachusetts',
    startDate: '05/2025',
    endDate: '08/2025',
    description: 'Cardiac Surgery Department, Mass General Brigham (BWH, MGB)\n• Conducted clinical research integrating psychophysiology risk factors with health outcomes to support evidence-based decision-making.\n• Analyzed 4,000+ cases and incorporated family/caregiver + social-context variables to inform risk stratification and outcome modeling.\n• Developed tunable hydrogels and 3D-printed vascular scaffolds to study mechanobiology and cell–material interactions.',
    logoUrl: '/img/BWH.png',
    imageHint: "hospital research logo",
    skills: ['Clinical Research', 'Psychophysiology', 'Psychosocial Assessment', 'Risk Stratification', 'Quantitative Analysis', 'Evidence-Based Practice'],
  },
  {
    id: 'exp7',
    title: 'Clinical Research Data Intern',
    company: 'N=1 Collaborative',
    companyUrl: 'https://www.n1collab.com/',
    location: 'Remote',
    startDate: '05/2025',
    endDate: '08/2025',
    description: '• Automated behavioral and clinical data analysis pipelines using R and Python to improve efficiency.\n• Curated health and behavioral datasets for reproducible research, pediatric screening, and early intervention.',
    logoUrl: '/img/n1.jpg',
    imageHint: "N=1 Collaborative logo",
    skills: ['R', 'Python', 'Clinical Data', 'Behavioral Data', 'Pediatric Screening', 'Reproducible Research', 'Data Pipelines'],
  },
  {
    id: 'exp8',
    title: 'PIMCO Decision Researcher',
    company: 'The University of Chicago Booth School of Business',
    companyUrl: 'https://www.chicagobooth.edu/',
    location: 'Remote',
    startDate: '01/2025',
    endDate: '05/2025',
    description: '• Conducted behavioral decision-making research using structured case analysis to examine judgment under uncertainty.\n• Completed 5+ decision research case studies, translating quantitative and behavioral insights into clear, evidence-based conclusions.',
    logoUrl: '/img/chicago.png',
    imageHint: "University of Chicago Booth logo",
    skills: ['Decision Research', 'Case Analysis', 'Behavioral Economics', 'Quantitative Analysis', 'Evidence-Based Research'],
  },
  {
    id: 'exp10',
    title: 'Medical Research Intern',
    company: "Columbia University VP&S / Children's Cancer Hospital Foundation 57357",
    companyUrl: 'https://www.57357.org/en',
    location: 'Cairo, Egypt',
    startDate: '02/2024',
    endDate: '07/2024',
    description: '• Authored translational research building a predictive modeling diagnostic tool, transferable to pediatric assessment.\n• Supported pediatric clinical research through literature review and behavioral/clinical data analysis (SPSS).\n• Synthesized child development evidence to create analysis plans for symptom presentation and functioning.',
    logoUrl: '/img/children.png',
    imageHint: "pediatric research logo",
    skills: ['Predictive Modeling', 'Pediatric Assessment', 'SPSS', 'Child Development', 'Clinical Data Analysis', 'Translational Research'],
  },
  {
    id: 'exp11',
    title: 'Vice President',
    company: 'Youth Science Journal',
    companyUrl: 'https://www.ys-journal.org/',
    location: 'Giza, Egypt',
    startDate: '03/2022',
    endDate: '04/2023',
    description: '• 1st Egyptian journal for youth; managed the journal\'s website; exposed 87 students to medical/behavioral research.\n• Supervised 26 lectures; partnered with IYNA organizing a neuro event; collaborated and oversaw 95 papers across 20+ fields.',
    logoUrl: '/img/ysj.png',
    imageHint: "science journal logo",
    skills: ['Leadership', 'Research Management', 'Science Communication', 'Web Development', 'Event Organization'],
  },
  {
    id: 'exp12',
    title: 'Executive Director of African Operations',
    company: 'Closing the Divide',
    companyUrl: 'https://www.closingthedivide.foundation/',
    location: 'Hybrid',
    startDate: '07/2022',
    endDate: '12/2023',
    description: '• Led community initiatives and managed cross-functional execution, strengthening leadership and stakeholder coordination.\n• Coordinated 30+ volunteers across multi-event programs focused on access and community support.',
    logoUrl: '/img/ctd1.png',
    imageHint: "nonprofit organization logo",
    skills: ['Leadership', 'Project Management', 'Volunteer Coordination', 'Stakeholder Coordination', 'Community Development'],
  },
];

const ExperienceItemCard = ({ exp, index }: { exp: ExperienceItem; index: number }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative mb-10 md:mb-20">
      {/* Desktop: Central Logo/Icon */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={cn(
          "w-36 h-36 rounded-full bg-card border-4 border-background shadow-xl flex items-center justify-center p-2",
          isVisible ? "animate-pulse-heart" : ""
        )}>
          {exp.logoUrl ? (
            exp.companyUrl ? (
              <Link href={exp.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${exp.company}`}>
                <Image
                  src={exp.logoUrl}
                  alt={`${exp.company} logo`}
                  width={120}
                  height={120}
                  className="rounded-full object-contain"
                  data-ai-hint={exp.imageHint || "company logo"}
                />
              </Link>
            ) : (
              <Image
                src={exp.logoUrl}
                alt={`${exp.company} logo`}
                width={120}
                height={120}
                className="rounded-full object-contain"
                data-ai-hint={exp.imageHint || "company logo"}
              />
            )
          ) : (
            <Briefcase className="w-16 h-16 text-primary" />
          )}
        </div>
      </div>

      {/* Mobile: Timeline elements (Dot and connecting line) */}
      <div className="md:hidden flex items-start mb-4">
        <div className="absolute left-8 top-0 h-full w-0.5 bg-border z-0"></div>
        <div className="relative z-10 flex-shrink-0">
            <div className={cn(
              "w-16 h-16 rounded-full bg-card border-2 border-background shadow-md flex items-center justify-center mr-4",
              isVisible ? "animate-pulse-heart" : ""
            )}>
            {exp.logoUrl ? (
              exp.companyUrl ? (
                <Link href={exp.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${exp.company}`}>
                  <Image src={exp.logoUrl} alt={`${exp.company} logo`} width={56} height={56} className="rounded-full object-contain" data-ai-hint={exp.imageHint || "company logo"} />
                </Link>
              ) : (
                <Image src={exp.logoUrl} alt={`${exp.company} logo`} width={56} height={56} className="rounded-full object-contain" data-ai-hint={exp.imageHint || "company logo"} />
              )
            ) : (
              <Briefcase className="w-8 h-8 text-primary" />
            )}
            </div>
        </div>
      </div>
      
      {/* Content Block */}
      <div 
        className={cn(
          `md:w-[calc(50%-4.5rem)] ml-0 pl-[5.5rem] md:pl-0`,
          `transition-all duration-700 ease-out transform`,
          isEven ? 'md:ml-[calc(50%+4.5rem)] md:text-left' : 'md:mr-[calc(50%+4.5rem)] md:text-right',
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0',
          isVisible && !isEven ? 'md:translate-x-0' : !isVisible && !isEven ? 'md:translate-x-10' : '', // Right items slide from right
          isVisible && isEven ? 'md:translate-x-0' : !isVisible && isEven ? 'md:-translate-x-10' : '' // Left items slide from left
        )}
      >
        <div className={`p-1 ${!isEven && 'md:text-right'}`}>
          <h3 className="text-xl font-semibold text-primary mb-0.5">
            {exp.companyUrl ? (
              <Link href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" aria-label={`Learn more about ${exp.title} at ${exp.company}`}>
                {exp.title}
              </Link>
            ) : (
              exp.title
            )}
          </h3>
          <p className="text-md font-medium text-foreground mb-0.5">
            {exp.company}
          </p>
          <p className="text-sm text-muted-foreground mb-1">
            <MapPin className={`inline-block h-3 w-3 mr-1 ${!isEven && 'md:ml-1 md:mr-0'}`} />
            {exp.location}
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            <CalendarDays className={`inline-block h-3 w-3 mr-1 ${!isEven && 'md:ml-1 md:mr-0'}`} />
            {exp.startDate} – {exp.endDate}
          </p>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {exp.description}
          </p>
          {exp.skills && exp.skills.length > 0 && (
            <div className={`mt-3 flex flex-wrap gap-1.5 ${!isEven ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
              {exp.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-background rounded-xl shadow-inner_lg overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle title="My Professional Journey" highlight="Journey" />
        <p className="text-center text-muted-foreground mb-16 md:mb-20">
          A timeline of my key roles and accomplishments.
        </p>
        <div className="relative">
          {/* Central Timeline Line - Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-border transform -translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <ExperienceItemCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

