"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Section, SectionHeading } from '@/components/section';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site-config';
import type { ReactNode } from 'react';

interface DirectLink {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const directLinks: DirectLink[] = [
  {
    icon: <Mail className="h-4 w-4" />,
    label: 'Berea email',
    value: siteConfig.email.berea,
    href: `mailto:${siteConfig.email.berea}`,
  },
  {
    icon: <Mail className="h-4 w-4" />,
    label: 'Gmail',
    value: siteConfig.email.gmail,
    href: `mailto:${siteConfig.email.gmail}`,
  },
  {
    icon: <Linkedin className="h-4 w-4" />,
    label: 'LinkedIn',
    value: 'in/mohanadelagan',
    href: siteConfig.links.linkedin,
    external: true,
  },
  {
    icon: <Github className="h-4 w-4" />,
    label: 'GitHub',
    value: 'Mohanad-Elagan',
    href: siteConfig.links.github,
    external: true,
  },
  ...(siteConfig.links.scholar
    ? [
        {
          icon: <GraduationCap className="h-4 w-4" />,
          label: 'Google Scholar',
          value: 'View profile',
          href: siteConfig.links.scholar,
          external: true,
        },
      ]
    : []),
];

export function ContactSection() {
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });

  return (
    <Section id="contact" tone="muted">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        align="center"
        description="I'm always glad to discuss research, collaborations, mentorship, or opportunities. Reach out directly or send a message."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Direct links */}
        <div
          ref={infoRef}
          className={cn(
            'transition-all duration-700 ease-out',
            infoVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
          )}
        >
          <div className="academic-card h-full p-6 md:p-8">
            <h3 className="font-serif text-xl font-semibold text-foreground">Direct contact</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The fastest ways to reach me.
            </p>
            <ul className="mt-6 space-y-2">
              {directLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 transition-colors hover:border-border hover:bg-card"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                        {item.value}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Message form */}
        <div
          ref={formRef}
          className={cn(
            'transition-all duration-700 ease-out',
            formVisible ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
          )}
        >
          <div className="academic-card h-full p-6 md:p-8">
            <h3 className="font-serif text-xl font-semibold text-foreground">Send a message</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              I&apos;ll reply as soon as I can.
            </p>
            <form
              action="https://formspree.io/f/xgeqkkwl"
              method="POST"
              className="mt-6 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" name="subject" placeholder="What is this about?" required />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full gap-2">
                <Send className="h-4 w-4" /> Send message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
