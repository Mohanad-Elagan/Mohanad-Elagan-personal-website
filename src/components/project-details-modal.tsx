import type { Project } from '@/types/portfolio';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, FileText, BookOpenText, XIcon } from 'lucide-react';
import Link from 'next/link';
// import Image from 'next/image'; // Removed Image import

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
  if (!isOpen) return null;
  const isPaper = project.category === 'Research Papers';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4"> {/* Adjusted padding */}
            {/* Removed Image display section */}
          <DialogTitle className="text-2xl font-bold text-primary">{project.title}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="p-6 pt-0 overflow-y-auto flex-grow"> {/* Adjusted padding */}
          {isPaper && project.publication && (
            <p className="text-sm text-muted-foreground mb-1 italic">Published in: {project.publication}</p>
          )}
          {isPaper && project.authors && project.authors.length > 0 && (
            <p className="text-sm text-muted-foreground mb-3">Authors: {project.authors.join(', ')}</p>
          )}
          <DialogDescription className="text-base text-foreground mb-4 whitespace-pre-line">
            {project.longDescription || project.shortDescription}
          </DialogDescription>

          {project.tags && project.tags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Technologies & Concepts:</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-4 border-t mt-auto"> {/* Adjusted padding */}
          <div className="flex w-full justify-start items-center gap-3 flex-wrap">
            {project.projectUrl && (
              <Button asChild size="sm">
                <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  {isPaper ? <FileText className="mr-2 h-4 w-4" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                  {isPaper ? (project.doiLink ? 'View Publication' : 'Read Paper') : 'View Live Project'}
                </Link>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild variant="outline" size="sm">
                <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Source Code
                </Link>
              </Button>
            )}
            {isPaper && project.doiLink && !project.projectUrl && (
             <Button asChild variant="default" size="sm">
              <Link href={project.doiLink} target="_blank" rel="noopener noreferrer" >
                <BookOpenText className="mr-2 h-4 w-4" /> View Publication (DOI)
              </Link>
            </Button>
           )}
            <Button variant="ghost" onClick={onClose} size="sm">
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
