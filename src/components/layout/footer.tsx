import Link from 'next/link';
import { Github, Linkedin, Mail, Brain, GraduationCap, Newspaper } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

const navLinks = [
  { href: '#research-writing', label: 'Research' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#writing', label: 'Writing' },
  { href: '#creative', label: 'Creative' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  { href: siteConfig.links.github, label: 'GitHub', icon: Github, external: true },
  { href: siteConfig.links.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
  { href: siteConfig.links.scholar, label: 'Google Scholar', icon: GraduationCap, external: true },
  { href: siteConfig.links.substack, label: 'Substack', icon: Newspaper, external: true },
  { href: `mailto:${siteConfig.email.berea}`, label: 'Email', icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="arabesque-band w-full opacity-30" aria-hidden="true" />
      <div className="container mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <Link href="#home" className="flex items-center justify-center gap-2.5 md:justify-start">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gold/60 bg-primary/5 text-primary">
                <Brain className="h-4 w-4" />
              </span>
              <span className="font-serif text-base font-semibold">Mohanad Elagan</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Undergraduate researcher in clinical psychology, biomedical AI, and neuroscience.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-1.5">
            {socials.map(({ href, label, icon: Icon, external }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:border-gold/60 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Mohanad Elagan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
