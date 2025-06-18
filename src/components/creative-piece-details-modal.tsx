import type { CreativeWritingPiece } from '@/types/portfolio';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, BookOpen, Tag, XIcon } from 'lucide-react';
// import Image from 'next/image'; // Removed Image import

interface CreativePieceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  piece: CreativeWritingPiece;
}

export function CreativePieceDetailsModal({ isOpen, onClose, piece }: CreativePieceDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 relative"> {/* Adjusted padding */}
          {/* Removed Image display section */}
          <DialogTitle className="text-2xl font-bold text-primary">{piece.title}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="p-6 pt-0 overflow-y-auto flex-grow space-y-4"> {/* Adjusted padding */}
          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
            <Badge variant="default" className="text-xs">{piece.type}</Badge>
            {piece.year && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{piece.year}</span>
              </div>
            )}
            {piece.publication && (
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span className="italic">Published in: {piece.publication}</span>
              </div>
            )}
          </div>
          
          <DialogDescription className="text-base text-foreground whitespace-pre-line leading-relaxed">
            {piece.content || piece.excerpt}
          </DialogDescription>

          {piece.tags && piece.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                Tags:
              </h4>
              <div className="flex flex-wrap gap-2">
                {piece.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-4 border-t mt-auto"> {/* Adjusted padding */}
          <Button variant="outline" onClick={onClose} size="sm">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
