"use client";

import Image from 'next/image';
import type { GraphicDesignItem } from '@/types/portfolio';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { GraphicItemDetailsModal } from './graphic-item-details-modal';

interface GraphicItemCardProps {
  item: GraphicDesignItem;
  index?: number; // For staggered animation
}

export function GraphicItemCard({ item, index = 0 }: GraphicItemCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        ref={ref}
        className={cn(
          "group relative overflow-hidden aspect-square bg-card shadow-sm rounded-sm cursor-pointer transition-all duration-500 ease-out",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}
        style={{ transitionDelay: `${index * 50}ms` }}
        onClick={handleOpenModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenModal()}
        aria-label={`View full image of ${item.title}`}
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 767px) 33vw, 25vw" 
          style={{ objectFit: 'cover' }}
          className="transition-all duration-300 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-110"
        />
      </div>

      <GraphicItemDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={item}
      />
    </>
  );
}
