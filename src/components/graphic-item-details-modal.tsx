"use client";

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import type { GraphicDesignItem } from '@/types/portfolio';

interface GraphicItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: GraphicDesignItem;
}

export function GraphicItemDetailsModal({ isOpen, onClose, item }: GraphicItemDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none" 
        onClick={onClose}
      >
        <DialogTitle className="sr-only">
          {item.title} - Full size view
        </DialogTitle>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div 
          className="relative w-full h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            style={{ objectFit: 'contain' }}
            className="transition-transform duration-300"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 