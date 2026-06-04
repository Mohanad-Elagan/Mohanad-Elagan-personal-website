"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Github, FileText, BookOpenText, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { allProjectsData } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Section, SectionHeading } from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/site-config';
import type { Project } from '@/types/portfolio';

function ResearchWritingItem({ paper, index }: { paper: Project; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });
  const yearMatch = paper.publication?.match(/\b(\d{4})\b/);
  const year = yearMatch ? yearMatch[1] : null;
  const displayLink = paper.doiLink || paper.projectUrl;
  const linkText = paper.doiLink ? 'View publication' : 'Read';
  const Icon = paper.doiLink ? BookOpenText : FileText;

  return (
    <div
      ref={ref}
      className={cn(
        'academic-card p-5 transition-all duration-700 ease-out md:p-6',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {paper.label && (
          <span className="rounded-full border border-gold/50 bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
            {paper.label}
          </span>
        )}
        {year && <span className="text-xs text-muted-foreground">{year}</span>}
      </div>
      <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
        {paper.title}
      </h3>
      {paper.authors && paper.authors.length > 0 && (
        <p className="mt-1 text-sm text-muted-foreground">{paper.authors.join(', ')}</p>
      )}
      {paper.publication && (
        <p className="mt-0.5 text-sm italic text-muted-foreground">{paper.publication}</p>
      )}
      {paper.shortDescription && (
        <p className="mt-3 text-sm leading-relaxed text-foreground/90">{paper.shortDescription}</p>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {paper.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-muted text-xs font-normal text-foreground/80"
            >
              {tag}
            </Badge>
          ))}
        </div>
        {displayLink && (
          <Button asChild variant="link" size="sm" className="h-auto p-0 text-primary">
            <Link href={displayLink} target="_blank" rel="noopener noreferrer">
              <Icon className="mr-1.5 h-4 w-4" />
              {linkText}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

function ArchiveItem({ project, index }: { project: Project; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });
  const link = project.projectUrl || project.repoUrl;
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col rounded-md border border-border/70 bg-card/60 p-4 transition-all duration-500 ease-out hover:border-secondary/50',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <h4 className="font-serif text-base font-semibold text-foreground">{project.title}</h4>
      <p className="mt-1 line-clamp-2 flex-grow text-sm text-muted-foreground">
        {project.shortDescription}
      </p>
      <div className="mt-3 flex items-center gap-3">
        {project.repoUrl && (
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-3.5 w-3.5" /> Source
          </Link>
        )}
        {project.projectUrl && (
          <Link
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live
          </Link>
        )}
      </div>
    </div>
  );
}

export function ResearchWritingSection() {
  const researchPapers = useMemo(
    () => allProjectsData.filter((p) => p.category === 'Research Papers'),
    []
  );

  if (researchPapers.length === 0) return null;

  return (
    <Section id="research-writing">
      <SectionHeading
        eyebrow="Selected Research Writing"
        title="Publications & research writing"
        description="A mix of peer-reviewed journal articles, conference work, and earlier student writing. Each item is labeled by type so its stage and venue are clear."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {researchPapers.map((paper, index) => (
          <ResearchWritingItem key={paper.id} paper={paper} index={index} />
        ))}
      </div>
    </Section>
  );
}

export function SoftwareProjectsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featured = useMemo(
    () => allProjectsData.filter((p) => p.category !== 'Research Papers' && p.featured),
    []
  );
  const archive = useMemo(
    () => allProjectsData.filter((p) => p.category !== 'Research Papers' && !p.featured),
    []
  );

  return (
    <Section id="projects" tone="muted">
      <SectionHeading
        eyebrow="Selected Software Projects"
        title="Things I have built"
        description="Independent and course projects spanning machine learning, data science, and the web."
      />

      {mounted ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {archive.length > 0 && (
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Earlier projects &amp; archive
            </h3>
            <span className="h-px flex-grow bg-border" aria-hidden="true" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {archive.map((project, index) => (
              <ArchiveItem key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <Button asChild size="lg" variant="outline" className="gap-2 border-gold/60">
          <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" /> More on GitHub
          </Link>
        </Button>
      </div>
    </Section>
  );
}
