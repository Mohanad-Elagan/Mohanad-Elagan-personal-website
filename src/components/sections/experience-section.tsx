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
    title: 'Research Fellow Volunteer',
    company: "The Johns Hopkins University",
    companyUrl: 'https://www.jhu.edu/',
    location: 'Remote',
    startDate: '04/2025',
    endDate: 'Present',
    description: '• Contributed to behavioral research on social cognition (Theory of Mind, social learning), supporting hypothesis refinement and study direction.\n• Synthesized 30+ papers on social perception/biological motion and translated insights into clear, research-ready summaries.',
    logoUrl: '/img/jhu.jpg',
    imageHint: "Johns Hopkins University logo",
    skills: ['Behavioral Research', 'Social Cognition', 'Research Synthesis'],
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
    skills: ['Communication', 'Tutoring'],
  },
  {
    id: 'exp6',
    title: 'Clinical Researcher',
    company: 'Harvard Medical School',
    companyUrl: 'https://hms.harvard.edu/',
    location: 'Boston, Massachusetts',
    startDate: '05/2025',
    endDate: '08/2025',
    description: 'Mass General Brigham (BWH, MGB)\n• Conducted clinical research integrating psychophysiology risk factors with health outcomes to support evidence-based decision-making.\n• Analyzed 4,000+ cases and incorporated family/caregiver + social-context variables to inform risk stratification and outcome modeling.\n• Developed tunable hydrogels and 3D-printed vascular scaffolds to study mechanobiology and cell–material interactions.',
    logoUrl: '/img/BWH.png',
    imageHint: "hospital research logo",
    skills: ['Docker', 'Data Structures', 'Clinical Research', 'Data Analysis', '3D Printing', 'Mechanobiology'],
  },
  {
    id: 'exp7',
    title: 'Software Development Intern',
    company: 'N=1 Collaborative',
    companyUrl: 'https://www.n1collab.com/',
    location: 'Remote',
    startDate: '05/2025',
    endDate: '08/2025',
    description: '• Built reproducible pipelines for clinical and behavioral datasets (Python/R/SQL), enabling scalable analysis for screening and early-intervention workflows.\n• Automated ETL and processing, reducing manual workload by ~35% and improving reproducibility through documentation and version control.',
    logoUrl: '/img/n1.jpg',
    imageHint: "N=1 Collaborative logo",
    skills: ['Docker', 'Data Structures', 'Python', 'R', 'SQL', 'ETL'],
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
    skills: ['Decision Research', 'Case Analysis', 'Behavioral Insights'],
  },
  {
    id: 'exp9',
    title: 'PwC x Paragon One Non-Profit Consulting Extern',
    company: 'Paragon One',
    companyUrl: 'https://www.paragonone.com/',
    location: 'Remote',
    startDate: '08/2024',
    endDate: '09/2024',
    description: '• Analyzed barriers affecting student persistence for an equity-focused nonprofit, connecting systems factors to long-term outcomes.\n• Produced recommendations from comparative analysis across programs, emphasizing measurable, evidence-based improvements.',
    logoUrl: '/img/paragon.jpg',
    imageHint: "Paragon One logo",
    skills: ['Case Studies', 'Data Analysis', 'Recommendations', 'Program Evaluation'],
  },
  {
    id: 'exp10',
    title: 'Medical Intern',
    company: "Children's Cancer Hospital Foundation 57357",
    companyUrl: 'https://www.57357.org/en',
    location: 'Cairo, Egypt',
    startDate: '08/2023',
    endDate: '07/2024',
    description: '• Observed psychosocial stress and family/caregiver dynamics in pediatric oncology, linking clinical context to long-term well-being outcomes.\n• Completed 49+ shadowing hours and supported documentation in high-stress care settings with attention to details.',
    logoUrl: '/img/children.png',
    imageHint: "cancer hospital logo",
    skills: ['Medical Documentation', 'Pediatric Oncology', 'Clinical Shadowing'],
  },
  {
    id: 'exp11',
    title: 'Vice President & Advisory Board Director',
    company: 'Youth Science Journal',
    companyUrl: 'https://www.ys-journal.org/',
    location: '6th of October, Al Jizah, Egypt',
    startDate: '04/2023',
    endDate: '12/2023',
    description: '• Led a youth research journal focused on mentorship, scientific writing, and research communication at scale.\n• Supported 80+ students and coordinated 20+ fields, overseeing editorial and programming operations with clear standards.',
    logoUrl: '/img/ysj.png',
    imageHint: "science journal logo",
    skills: ['Leadership', 'Research Management', 'Science Communication', 'Event Organization'],
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
    skills: ['Leadership', 'Project Management', 'Community Development', 'Event Organization'],
  },
  {
    id: 'exp13',
    title: 'Medicine Research Scholar',
    company: 'Columbia University Vagelos College of Physicians and Surgeons',
    companyUrl: 'https://www.vagelos.columbia.edu/',
    location: 'Remote',
    startDate: '03/2023',
    endDate: '09/2023',
    description: '• Completed mentored research training emphasizing assessment, evidence evaluation, and clinical reasoning in medical research contexts.\n• Conducted structured documentation and analysis exercises, strengthening rigor, measurement mindset, and research communication.',
    logoUrl: '/img/columbia.png',
    imageHint: "university research logo",
    skills: ['Medical Research', 'Clinical Reasoning', 'Research Communication'],
  },
  {
    id: 'exp14',
    title: 'President',
    company: 'Hack Club',
    companyUrl: 'https://hackclub.com/',
    location: '6th of October, Al Jizah, Egypt',
    startDate: '11/2021',
    endDate: '07/2023',
    description: '• Built and led a learning community focused on mentorship, project execution, and practical problem solving.\n• Delivered 24+ workshops and mentored 60+ students, emphasizing structured thinking, iteration, and impact-driven building.',
    logoUrl: '/img/hack.png',
    imageHint: "coding club logo",
    skills: ['Leadership', 'Curriculum Development', 'Web Development', 'Event Organization', 'Mentorship'],
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

