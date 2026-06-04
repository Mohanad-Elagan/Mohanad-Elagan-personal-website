"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CalendarDays, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeading } from '@/components/section';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ExperienceItem {
  id: string;
  role: string;
  institution: string;
  url?: string;
  location: string;
  date: string;
  bullets: string[];
  tags: string[];
  logoUrl?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 'hst',
    role: 'Summer Research',
    institution: 'Harvard–MIT Health Sciences and Technology (HST)',
    url: 'https://hst.mit.edu/',
    location: 'Cambridge, MA',
    date: 'Summer 2026',
    bullets: [
      'Research training in a clinical and cognitive neuroscience context.',
      'Connecting behavioral measures with computational approaches to study brain and behavior.',
    ],
    tags: ['Cognitive Neuroscience', 'Behavioral Science', 'Research'],
    logoUrl: '/img/MIT.png',
  },
  {
    id: 'hms',
    role: 'Clinical Research Intern',
    institution: 'Harvard Medical School · Mass General Brigham',
    url: 'https://hms.harvard.edu/',
    location: 'Boston, MA',
    date: 'May – Aug 2025',
    bullets: [
      'Integrated psychophysiological and psychosocial risk factors with health outcomes to support evidence-based decisions.',
      'Analyzed 4,000+ cardiac surgery cases, incorporating social-context variables for risk stratification.',
    ],
    tags: ['Clinical Research', 'Risk Stratification', 'Quantitative Analysis'],
    logoUrl: '/img/BWH.png',
  },
  {
    id: 'jhu',
    role: 'Research Assistant (Volunteer)',
    institution: 'Johns Hopkins University — Social & Cognitive Origins Group',
    url: 'https://www.jhu.edu/',
    location: 'Remote',
    date: 'Apr 2025 – Present',
    bullets: [
      'Contribute to behavioral research on social cognition, including Theory of Mind and social learning.',
      'Synthesized 30+ papers on social perception into research-ready summaries.',
    ],
    tags: ['Social Cognition', 'Literature Synthesis', 'Research Communication'],
    logoUrl: '/img/jhu.jpg',
  },
  {
    id: 'n1',
    role: 'Clinical Research Data Intern',
    institution: 'N=1 Collaborative',
    url: 'https://www.n1collab.com/',
    location: 'Remote',
    date: 'May – Aug 2025',
    bullets: [
      'Automated behavioral and clinical data analysis pipelines using R and Python.',
      'Curated health and behavioral datasets for reproducible research and pediatric screening.',
    ],
    tags: ['R', 'Python', 'Clinical Data', 'Reproducible Research'],
    logoUrl: '/img/n1.jpg',
  },
  {
    id: 'booth',
    role: 'Decision Researcher',
    institution: 'University of Chicago Booth School of Business',
    url: 'https://www.chicagobooth.edu/',
    location: 'Remote',
    date: 'Jan – May 2025',
    bullets: [
      'Conducted behavioral decision-making research examining judgment under uncertainty.',
      'Completed 5+ decision case studies, translating data into evidence-based conclusions.',
    ],
    tags: ['Decision Research', 'Behavioral Science', 'Quantitative Analysis'],
    logoUrl: '/img/chicago.png',
  },
  {
    id: 'cch',
    role: 'Medical Research Intern',
    institution: "Children's Cancer Hospital 57357 · Columbia University VP&S",
    url: 'https://www.57357.org/en',
    location: 'Cairo, Egypt',
    date: 'Feb – Jul 2024',
    bullets: [
      'Supported pediatric translational research through literature review and clinical data analysis (SPSS).',
      'Synthesized child-development literature to inform analysis of symptom presentation and outcomes.',
    ],
    tags: ['Translational Research', 'SPSS', 'Pediatric Research', 'Child Development'],
    logoUrl: '/img/children.png',
  },
  {
    id: 'berea-ta',
    role: 'Teaching Assistant',
    institution: 'Berea College',
    url: 'https://www.berea.edu/',
    location: 'Berea, KY',
    date: 'Aug 2024 – Present',
    bullets: [
      'Tutor and grade across courses, strengthening student confidence and reasoning.',
      'Mentor 60+ students with structured, step-by-step feedback.',
    ],
    tags: ['Teaching', 'Mentoring', 'Communication'],
    logoUrl: '/img/bc.png',
  },
  {
    id: 'ysj',
    role: 'Vice President',
    institution: 'Youth Science Journal',
    url: 'https://www.ys-journal.org/',
    location: 'Giza, Egypt',
    date: '2022 – 2023',
    bullets: [
      "Led the first Egyptian youth science journal, overseeing 95 papers across 20+ fields.",
      'Managed the website, supervised 26 lectures, and engaged 87 students in research.',
    ],
    tags: ['Leadership', 'Science Communication', 'Editorial'],
    logoUrl: '/img/ysj.png',
  },
  {
    id: 'ctd',
    role: 'Executive Director, African Operations',
    institution: 'Closing the Divide',
    url: 'https://www.closingthedivide.foundation/',
    location: 'Hybrid',
    date: '2022 – 2023',
    bullets: [
      'Led community initiatives and cross-functional execution across multi-event programs.',
      'Coordinated 30+ volunteers focused on access and community support.',
    ],
    tags: ['Leadership', 'Project Management', 'Community'],
    logoUrl: '/img/ctd.png',
  },
];

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={cn(
        'relative pl-12 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      )}
      style={{ transitionDelay: `${Math.min(index, 4) * 80}ms` }}
    >
      {/* Timeline node */}
      <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-card shadow-sm">
        {exp.logoUrl ? (
          <Image
            src={exp.logoUrl}
            alt={`${exp.institution} logo`}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-contain"
          />
        ) : (
          <span className="h-2 w-2 rounded-full bg-primary" />
        )}
      </span>

      <div className="academic-card p-5 md:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">{exp.role}</h3>
            <p className="mt-0.5 text-sm font-medium text-primary">
              {exp.url ? (
                <Link
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  {exp.institution}
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </Link>
              ) : (
                exp.institution
              )}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-1 text-xs text-muted-foreground sm:items-end">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" /> {exp.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {exp.location}
            </span>
          </div>
        </div>

        <ul className="mt-3 space-y-1.5">
          {exp.bullets.map((b, i) => (
            <li key={i} className="relative pl-4 text-sm leading-relaxed text-muted-foreground">
              <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-gold" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-muted text-xs font-normal text-foreground/80">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" tone="muted">
      <SectionHeading
        eyebrow="Experience"
        title="Research & professional experience"
        description="Roles across clinical research, neuroscience, data, teaching, and community leadership — most recent first."
      />
      <div className="relative">
        {/* Vertical rail */}
        <span
          className="absolute bottom-2 left-[17px] top-2 w-px bg-gradient-to-b from-gold/50 via-border to-transparent"
          aria-hidden="true"
        />
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
