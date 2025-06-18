
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types/portfolio';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription as CardDesc } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, FileText, BookOpenText, Eye } from 'lucide-react';
import { useState } from 'react';
import { ProjectDetailsModal } from './project-details-modal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index?: number; // For staggered animation
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPaper = project.category === 'Research Papers';

  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Card 
        ref={ref}
        className={cn(
          "flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-out group cursor-pointer",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: `${index * 100}ms` }}
        onClick={handleOpenModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenModal()}
        aria-label={`View details for ${project.title}`}
      >
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={project.imageHint || (isPaper ? 'research paper illustration' : 'project image')}
              priority={project.id === '1' || project.id === '2'} // Example: prioritize first few images
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
          {isPaper && project.publication && (
              <p className="text-xs text-muted-foreground mb-1 italic">Published in: {project.publication}</p>
          )}
          {isPaper && project.authors && project.authors.length > 0 && (
               <p className="text-xs text-muted-foreground mb-2">Authors: {project.authors.join(', ')}</p>
          )}
          <CardDesc className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.shortDescription}</CardDesc>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 border-t">
          <div className="flex w-full justify-start items-center gap-2 flex-wrap">
            <Button variant="default" size="sm" onClick={(e) => { e.stopPropagation(); handleOpenModal(); }} className="shadow-md hover:shadow-lg transition-shadow">
              <Eye className="mr-2 h-4 w-4" /> View Details
            </Button>
            {project.repoUrl && (
              <Button asChild variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Source
                </Link>
              </Button>
            )}
            {project.projectUrl && !isPaper &&(
              <Button asChild variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Site
                </Link>
              </Button>
            )}
             {isPaper && (project.projectUrl || project.doiLink) && (
               <Button asChild variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                <Link href={project.projectUrl || project.doiLink!} target="_blank" rel="noopener noreferrer" >
                  {project.doiLink ? <BookOpenText className="mr-2 h-4 w-4" /> : <FileText className="mr-2 h-4 w-4" />}
                  {project.doiLink ? 'View Publication' : 'Read Paper'}
                </Link>
              </Button>
             )}
          </div>
        </CardFooter>
      </Card>
      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={project}
      />
    </>
  );
}
