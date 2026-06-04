"use client";

import { Button } from '@/components/ui/button';
import { BookMarked, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/60"
    >
      {/* Subtle arabesque watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] arabesque-watermark"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
          {/* Text column */}
          <div
            className={cn(
              'order-2 text-center transition-all duration-1000 ease-out md:order-1 md:text-left',
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            )}
          >
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
              <p className="eyebrow">Berea College · Undergraduate Researcher</p>
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Mohanad Elagan
            </h1>

            <p className="mt-4 text-lg font-medium text-primary md:text-xl">
              Clinical Psychology · Biomedical AI · Neuroscience
            </p>

            <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg">
              I am an undergraduate at Berea College studying neuroscience,
              mathematics, and computer science, with research interests in
              clinical psychology, biomedical AI, and patient-centered research.
              My work connects behavioral science, medical data, and research
              communication.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
              <Button asChild size="lg" className="w-full gap-2 shadow-sm sm:w-auto">
                <Link href="#research-writing">
                  <BookMarked className="h-4 w-4" /> Selected Research
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full gap-2 border-gold/60 sm:w-auto"
              >
                <Link href="#contact">
                  <Mail className="h-4 w-4" /> Contact Me
                </Link>
              </Button>
            </div>
          </div>

          {/* Portrait column */}
          <div
            className={cn(
              'order-1 flex justify-center transition-all duration-1000 ease-out md:order-2 md:justify-end',
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            )}
          >
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-2xl border border-gold/40"
                aria-hidden="true"
              />
              <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-border shadow-md sm:h-60 sm:w-60 md:h-72 md:w-72">
                <Image
                  src="/img/profile.jpg"
                  alt="Portrait of Mohanad Elagan"
                  fill
                  sizes="(max-width: 768px) 240px, 288px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
              </div>
              <span
                className="absolute -bottom-3 -right-3 h-10 w-10 rounded-md border-b-2 border-r-2 border-primary/50"
                aria-hidden="true"
              />
              <span
                className="absolute -left-3 -top-3 h-10 w-10 rounded-md border-l-2 border-t-2 border-primary/50"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
