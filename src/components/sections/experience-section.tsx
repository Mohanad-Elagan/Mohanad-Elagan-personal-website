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
    title: 'Medical Research Intern',
    company: "Brigham and Women's Hospital, Harvard Medical School",
    companyUrl: 'https://www.brighamandwomens.org/',
    location: 'Boston, MA',
    startDate: '05/2025',
    endDate: '08/2025',
    description: 'TBD. Completed 70+ shadowing hours in cardiology and other specialties; regularly attended weekly BWH/HMS seminars on clinical reasoning and medical education.',
    logoUrl: '/img/BWH.png',
    imageHint: "hospital research logo",
    skills: ['Image Processing', '3D Reconstruction', 'Machine Learning', 'Medical Imaging', 'Cardiology'],
  },
  {
    id: 'exp2',
    title: 'IT Support Manager',
    company: 'Berea College',
    companyUrl: 'https://www.berea.edu/',
    location: 'Berea, KY',
    startDate: '08/2024',
    endDate: 'Present',
    description: 'Provided IT support to 1,900+ users; resolved 200+ technical issues focusing on user behavior and ergonomics. Maintained and reimaged 100+ devices across campus buildings. Tutored and graded for 20+ students; co-developed engaging instruction strategies with faculty. Designed Arduino-based systems to study human response to sensory input.',
    logoUrl: '/img/bc.png',
    imageHint: "college IT logo",
    skills: ['IT Support', 'Device Management', 'Teaching Assistance', 'Arduino', 'Problem Solving'],
  },
  {
    id: 'exp3',
    title: 'Research Volunteer',
    company: "Children's Cancer Hospital Foundation 57357",
    companyUrl: 'https://www.57357.org/en',
    location: 'Cairo, Egypt',
    startDate: '02/2024',
    endDate: '07/2024',
    description: 'Conducted research on PCR, parasympathetic nervous system medications, and HIV vaccine development; supported sample prep, lab work, and data analysis. Completed 43 volunteer hours assisting 12 physicians and 49 shadowing hours; maintained medical records and prepared patients.',
    logoUrl: '/img/children.png',
    imageHint: "cancer hospital logo",
    skills: ['PCR', 'Lab Research', 'Data Analysis', 'Medical Records', 'Volunteer Coordination'],
  },
  {
    id: 'exp4',
    title: 'AI Research Scholar',
    company: 'Lumiere Education & Veritas AI Research Programs',
    companyUrl: 'https://www.lumiere-education.com/',
    location: 'Remote',
    startDate: '06/2023',
    endDate: '11/2023',
    description: 'Authored a study on machine learning methods for blood pressure prediction; completed 24 coding tasks under mentorship from UCL. Built an AI-powered irrigation system using weather prediction and phostrip filtration; deployed across 3 locations.',
    logoUrl: '/img/lumiere.png',
    imageHint: "education AI logo",
    skills: ['Machine Learning', 'AI Systems', 'Research Writing', 'Weather Prediction', 'Python'],
  },
  {
    id: 'exp5',
    title: 'Medical Research Scholar',
    company: 'Columbia University VP&S GHO / IYRC',
    companyUrl: 'https://www.vagelos.columbia.edu/',
    location: 'Remote',
    startDate: '03/2023',
    endDate: '11/2023',
    description: 'Independently authored a breast histopathology classification project with full financial aid support. Performed 12-page physical exams; participated in coding workshops and completed 13 applied tasks.',
    logoUrl: '/img/columbia.png',
    imageHint: "university research logo",
    skills: ['Medical Research', 'Histopathology', 'Classification Models', 'Coding Workshops', 'Grant Writing'],
  },
  {
    id: 'exp6',
    title: 'Vice-president',
    company: 'Youth Science Journal',
    companyUrl: 'https://www.ys-journal.org/',
    location: 'Giza, Egypt',
    startDate: '03/2022',
    endDate: '04/2023',
    description: '1st Egyptian Journal for youth; managed the journal\'s website; exposed 87 students to research; supervised 10+, 3hrs, lectures; partnered with IYNA to organize an event; collaborated & oversaw 95 papers in 20+ fields',
    logoUrl: '/img/ysj.png',
    imageHint: "science journal logo",
    skills: ['Leadership', 'Research Management', 'Web Development', 'Event Organization', 'Science Communication'],
  },
  {
    id: 'exp7',
    title: 'President, Cybersecurity Mentor & CTO',
    company: 'Hack Club Egypt',
    companyUrl: 'https://hackclub.com/',
    location: 'Giza, Egypt',
    startDate: '11/2021',
    endDate: '02/2023',
    description: 'Developed a 185-hour CS curriculum and led 7 labs; delivered 24 lectures and organized problem-solving hackathons. Built and maintained club website; launched projects in medical tech and cybersecurity.',
    logoUrl: '/img/hack.png',
    imageHint: "coding club logo",
    skills: ['Leadership', 'Curriculum Development', 'Cybersecurity', 'Web Development', 'Event Organization', 'Medical Technology'],
  },
  {
    id: 'exp8',
    title: 'Executive Director of African Operations, Egypt\'s Branch President',
    company: 'Closing the Divide',
    companyUrl: 'https://www.closingthedivide.foundation/',
    location: 'Giza, Egypt',
    startDate: '11/2021',
    endDate: '07/2023',
    description: 'Built a medical lab with Resala charity; led 30+ students, 4 events; repaired/donated 11 devices to low-income children',
    logoUrl: '/img/ctd1.png',
    imageHint: "nonprofit organization logo",
    skills: ['Leadership', 'Project Management', 'Community Development', 'Device Repair', 'Event Organization'],
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
              <Link href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full">
                <Image
                  src={exp.logoUrl}
                  alt={`${exp.company} logo`}
                  width={120}
                  height={120}
                  className="rounded-full object-contain hover:scale-105 transition-transform duration-300"
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
                <Link href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full">
                  <Image 
                    src={exp.logoUrl} 
                    alt={`${exp.company} logo`} 
                    width={56} 
                    height={56} 
                    className="rounded-full object-contain hover:scale-105 transition-transform duration-300" 
                    data-ai-hint={exp.imageHint || "company logo"} 
                  />
                </Link>
              ) : (
                <Image 
                  src={exp.logoUrl} 
                  alt={`${exp.company} logo`} 
                  width={56} 
                  height={56} 
                  className="rounded-full object-contain" 
                  data-ai-hint={exp.imageHint || "company logo"} 
                />
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

