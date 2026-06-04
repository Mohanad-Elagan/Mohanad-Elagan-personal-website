"use client";

import Link from 'next/link';
import { Menu, Brain, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site-config';

const navItems = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#research-writing', label: 'Research', id: 'research-writing' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#writing', label: 'Writing', id: 'writing' },
  { href: '#creative', label: 'Creative', id: 'creative' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    const ids = [...navItems.map((i) => i.id), 'journey'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const Monogram = (
    <Link href="#home" className="flex items-center gap-2.5" aria-label="Back to top">
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gold/60 bg-primary/5 text-primary">
        <Brain className="h-5 w-5" />
      </span>
      <span className="hidden font-serif text-lg font-semibold tracking-tight sm:inline">
        Mohanad Elagan
      </span>
    </Link>
  );

  const ScholarButton = (
    <Button asChild size="sm" variant="outline" className="gap-1.5 border-gold/60 shadow-sm">
      <Link
        href={siteConfig.links.scholar}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Google Scholar profile"
      >
        <GraduationCap className="h-4 w-4" />
        <span className="hidden sm:inline">Scholar</span>
      </Link>
    </Button>
  );

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {Monogram}
          <div className="h-9 w-9 rounded-md bg-muted md:hidden" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {Monogram}

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Button
                key={item.label}
                variant="ghost"
                asChild
                className={cn(
                  'h-9 px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
                  isActive && 'text-primary'
                )}
              >
                <Link href={item.href}>
                  <span className="relative">
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-1.5 left-0 h-0.5 bg-gold transition-all duration-300',
                        isActive ? 'w-full' : 'w-0'
                      )}
                    />
                  </span>
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">{ScholarButton}</div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 lg:hidden">
          {ScholarButton}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="font-serif text-lg">Navigation</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          'rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted',
                          isActive ? 'bg-primary/10 text-primary' : 'text-foreground'
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <Link
                    href={siteConfig.links.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 rounded-md border border-gold/60 px-3 py-2.5 text-base font-medium text-foreground"
                  >
                    <GraduationCap className="h-4 w-4" /> Google Scholar
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
