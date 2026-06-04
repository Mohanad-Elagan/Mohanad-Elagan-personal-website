"use client";

import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  /** Alternating surface tone */
  tone?: 'default' | 'muted';
}

export function Section({
  id,
  className,
  containerClassName,
  children,
  tone = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 py-16 md:py-24',
        tone === 'muted' && 'bg-muted/40',
        className
      )}
    >
      <div className={cn('container mx-auto max-w-6xl px-5 sm:px-6', containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        'mb-10 transition-all duration-700 ease-out md:mb-14',
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className
      )}
    >
      {eyebrow && (
        <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
          <p className="eyebrow">{eyebrow}</p>
          {align === 'center' && <span className="h-px w-8 bg-gold/70" aria-hidden="true" />}
        </div>
      )}
      <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
