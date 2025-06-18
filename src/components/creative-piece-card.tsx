
"use client"; 

import type { CreativeWritingPiece } from '@/types/portfolio';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { CreativePieceDetailsModal } from './creative-piece-details-modal';
import { Eye, CalendarDays, BookOpenText, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface CreativePieceCardProps {
  piece: CreativeWritingPiece;
  index?: number; // For staggered animation
}

export function CreativePieceCard({ piece, index = 0 }: CreativePieceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ triggerOnce: true });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <article
        ref={ref}
        className={cn(
          "group py-4 px-3 sm:px-4 border border-border/40 hover:bg-muted/40 transition-all duration-500 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg flex flex-col h-full",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: `${index * 100}ms` }}
        onClick={handleOpenModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenModal()}
        aria-label={`View details for ${piece.title}`}
      >
        <header className="flex flex-col items-start mb-3">
          <h3 className="text-lg lg:text-xl font-semibold text-primary group-hover:text-primary/90 transition-colors">
            {piece.title}
          </h3>
          <Badge variant="secondary" className="mt-2 text-xs py-0.5 px-2.5 self-start">
            {piece.type}
          </Badge>
        </header>

        <div className="flex-grow">
          <p className="text-foreground text-sm leading-relaxed mb-3 line-clamp-4">
            {piece.excerpt}
          </p>
          
          {(piece.year || piece.publication || (piece.tags && piece.tags.length > 0)) && (
            <div className="mb-3 space-y-1.5 pt-2 border-t border-dashed border-border/30">
              {piece.year && (
                <p className="text-xs text-muted-foreground flex items-center">
                  <CalendarDays className="h-3 w-3 mr-1.5 text-primary/80" /> Year: {piece.year}
                </p>
              )}
              {piece.publication && (
                <p className="text-xs text-muted-foreground flex items-center">
                  <BookOpenText className="h-3 w-3 mr-1.5 text-primary/80" /> Published in: <span className="italic ml-1">{piece.publication}</span>
                </p>
              )}
              {piece.tags && piece.tags.length > 0 && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Tag className="h-3 w-3 mr-1.5 text-primary/80" />
                  <span className="font-medium mr-1">Tags:</span>
                  <div className="flex flex-wrap gap-1">
                    {piece.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-[0.7rem] px-1.5 py-0.5">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-3 flex justify-center">
          <Button 
            variant="default" 
            size="sm" 
            onClick={(e) => { e.stopPropagation(); handleOpenModal(); }} 
            className="shadow-sm hover:shadow-md transition-shadow"
            aria-label={`Read more about ${piece.title}`}
          >
            <Eye className="mr-1.5 h-3.5 w-3.5" /> Read Full Piece
          </Button>
        </div>
      </article>

      <CreativePieceDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        piece={piece}
      />
    </>
  );
}
