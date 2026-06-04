"use client";

import { Section, SectionHeading } from '@/components/section';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

const stops = [
  {
    city: 'Cairo',
    region: 'Egypt',
    note: 'Early medical and science-communication research',
  },
  {
    city: 'Berea',
    region: 'Kentucky',
    note: 'Undergraduate study in neuroscience, math & CS',
  },
  {
    city: 'Boston / Cambridge',
    region: 'Massachusetts',
    note: 'Clinical & cognitive neuroscience research',
  },
];

export function JourneySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });

  return (
    <Section id="journey">
      <SectionHeading
        eyebrow="Journey"
        title="Cairo → Berea → Boston"
        align="center"
        description="My path has grown from early biomedical research experiences in Egypt to interdisciplinary research training in the United States, connecting clinical questions with computation, neuroscience, and communication."
      />

      <div
        ref={ref}
        className={cn(
          'relative mx-auto mt-4 max-w-4xl transition-all duration-700 ease-out',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        )}
      >
        {/* Connecting line (desktop) */}
        <span
          className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-gold/40 via-primary/40 to-gold/40 md:block"
          aria-hidden="true"
        />
        <ol className="grid gap-8 md:grid-cols-3">
          {stops.map((stop, i) => (
            <li key={stop.city} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-card text-primary shadow-sm">
                <MapPin className="h-5 w-5" />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.65rem] font-semibold text-primary-foreground">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{stop.city}</h3>
              <p className="text-xs uppercase tracking-wider text-secondary">{stop.region}</p>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                {stop.note}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
