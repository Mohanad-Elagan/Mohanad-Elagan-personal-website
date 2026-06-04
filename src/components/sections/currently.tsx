"use client";

import { Section, SectionHeading } from '@/components/section';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { GraduationCap, FlaskConical, Stethoscope } from 'lucide-react';
import type { ReactNode } from 'react';

interface CurrentItem {
  icon: ReactNode;
  status: string;
  role: string;
  org: string;
  focus: string;
}

const items: CurrentItem[] = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    status: 'Now',
    role: 'Undergraduate Researcher',
    org: 'Berea College',
    focus:
      'Independent neuroscience major with mathematics and computer science, focused on behavioral science and quantitative methods.',
  },
  {
    icon: <FlaskConical className="h-5 w-5" />,
    status: 'Summer',
    role: 'Summer Research',
    org: 'Harvard–MIT Health Sciences and Technology (HST)',
    focus:
      'Research training in a clinical and cognitive neuroscience context, bridging behavioral measures with computation.',
  },
  {
    icon: <Stethoscope className="h-5 w-5" />,
    status: 'Previously',
    role: 'Clinical Research',
    org: 'Harvard Medical School · Mass General Brigham',
    focus:
      'Clinical research integrating psychosocial and physiological risk factors with patient outcomes.',
  },
];

function CurrentCard({ item, index }: { item: CurrentItem; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });
  return (
    <div
      ref={ref}
      className={cn(
        'academic-card flex flex-col p-6 transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          {item.icon}
        </span>
        <span className="eyebrow">{item.status}</span>
      </div>
      <h3 className="font-serif text-xl font-semibold text-foreground">{item.role}</h3>
      <p className="mt-1 text-sm font-medium text-primary">{item.org}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.focus}</p>
    </div>
  );
}

export function CurrentlySection() {
  return (
    <Section id="currently" tone="muted">
      <SectionHeading
        eyebrow="Currently"
        title="Where I am right now"
        description="A snapshot of my present and recent research homes across neuroscience and clinical research."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <CurrentCard key={item.role} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
