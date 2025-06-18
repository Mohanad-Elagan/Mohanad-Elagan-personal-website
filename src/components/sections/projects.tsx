// src/components/sections/projects.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Github, FileText, BookOpenText, LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { CreativePieceCard } from '@/components/creative-piece-card';
import { allProjectsData } from '@/data/projects';
import { creativeWritingPieces } from '@/data/creative-writing';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ParallaxSectionHeader } from '@/components/parallax-section-header';
import { SectionTitle } from '@/components/section-title';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types/portfolio';

function ResearchPaperItem({ paper, index }: { paper: Project, index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });
  const yearMatch = paper.publication?.match(/\b(\d{4})\b/);
  const year = yearMatch ? yearMatch[1] : null;
  
  // Prioritize DOI link if available, otherwise use projectUrl for download/view.
  const displayLink = paper.doiLink || paper.projectUrl;
  const linkText = paper.doiLink ? 'View Publication' : (paper.projectUrl ? 'Download / Read More' : '');
  const LinkIcon = paper.doiLink ? BookOpenText : FileText;

  return (
    <div 
      ref={ref}
      key={paper.id} 
      className={cn(
        "p-4 border border-border rounded-lg bg-card/50 shadow-sm hover:shadow-md transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h4 className="text-lg font-semibold text-primary mb-1">{paper.title}</h4>
      <p className="text-sm text-muted-foreground">
        {paper.authors?.join(', ')}{year ? ` • ${year}` : ''}
      </p>
      <div className="text-sm text-muted-foreground mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="italic">{paper.publication}</span>
        {displayLink && linkText && (
          <Button asChild variant="link" size="sm" className="text-primary hover:underline p-0 mt-1 sm:mt-0 sm:ml-2 self-start sm:self-center">
            <Link href={displayLink} target="_blank" rel="noopener noreferrer">
              <LinkIcon className="mr-1.5 h-4 w-4" />
              {linkText}
            </Link>
          </Button>
        )}
      </div>
      {paper.shortDescription && (
        <p className="text-sm text-foreground mt-2 line-clamp-3">{paper.shortDescription}</p>
      )}
      {paper.tags && paper.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {paper.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const regularProjects = useMemo(() => {
    return allProjectsData.filter(project => project.category !== 'Research Papers');
  }, []);

  const researchPapers = useMemo(() => {
    return allProjectsData.filter(project => project.category === 'Research Papers');
  }, []);

  if (!mounted) {
    return (
      <section id="projects" className="py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionTitle title="My Papers, Projects & Writing" highlight="Papers" />
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-96"></div> 
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle title="My Papers, Projects & Writing" highlight="Papers" />
        
        {researchPapers.length > 0 && (
          <>
            <SectionTitle title="Research Papers" highlight="Papers" className="mb-8" />
            <div className="space-y-6 max-w-3xl mx-auto mt-12">
              {researchPapers.map((paper, index) => (
                <ResearchPaperItem paper={paper} index={index} key={paper.id} />
              ))}
            </div>
          </>
        )}

        {regularProjects.length > 0 && (
          <>
            <SectionTitle title="Software Projects" highlight="Projects" className="text-2xl md:text-3xl mb-8 mt-2" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {regularProjects.map((project, index) => (
                <ProjectCard project={project} key={project.id} index={index} />
              ))}
            </div>
            <div className="text-center my-10">
              <p className="text-muted-foreground mb-3">To see more of my projects...</p>
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="https://github.com/Mohanad-Elagan" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  Visit my GitHub
                </Link>
              </Button>
            </div>
          </>
        )}

        {creativeWritingPieces.length > 0 && (
          <>
            <SectionTitle title="Creative Writing" highlight="Writing" className="text-2xl md:text-3xl mb-2 mt-16 pt-8 border-t" />
            <p className="text-center text-muted-foreground italic mb-12"> 
              Thinking about how I could alter the world with a broken pencil and a tearful paper.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
              {creativeWritingPieces.map((piece, index) => (
                <CreativePieceCard key={piece.id} piece={piece} index={index} />
              ))}
            </div>
          </>
        )}

        {(regularProjects.length === 0 && researchPapers.length === 0 && creativeWritingPieces.length === 0) && (
          <p className="text-center text-muted-foreground text-lg mt-12">
            No projects, papers, or creative writing pieces to display at the moment.
          </p>
        )}
      </div>
    </section>
  );
}