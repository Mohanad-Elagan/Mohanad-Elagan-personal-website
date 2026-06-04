"use client";

import { useEffect, useState } from 'react';
import { Section, SectionHeading } from '@/components/section';
import { graphicDesignItems } from '@/data/graphic-design';
import { GraphicItemCard } from '@/components/graphic-item-card';

export function CreativeSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (graphicDesignItems.length === 0) return null;

  return (
    <Section id="creative">
      <SectionHeading
        eyebrow="Creative Work"
        title="Creative work"
        description="Alongside research, I make graphic design, photography, posters, and other visual work. A small selection is below."
      />
      {mounted ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
          {graphicDesignItems.map((item, index) => (
            <GraphicItemCard key={item.id} item={item} index={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-sm bg-muted" />
          ))}
        </div>
      )}
    </Section>
  );
}
