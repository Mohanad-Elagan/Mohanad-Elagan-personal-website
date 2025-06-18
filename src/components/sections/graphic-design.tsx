// src/components/sections/graphic-design.tsx
"use client";

import { useEffect, useState } from 'react';
import { graphicDesignItems } from '@/data/graphic-design';
import { GraphicItemCard } from '@/components/graphic-item-card';
import { SectionTitle } from '@/components/section-title';
// Removed type import for GraphicDesignItem as it's not directly used here

export function GraphicDesignSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="graphic-design" className="py-16 md:py-24 bg-muted/40 rounded-xl shadow-inner_lg overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionTitle title="Graphic Design" highlight="Design" />
          <p className="text-center text-muted-foreground mb-12">
            Some of the highlighted designs and photographs I completed are shown here.
          </p>
          <div className="animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-1.5">
              {[...Array(8)].map((_, i) => ( 
                <div key={i} className="bg-muted aspect-square rounded-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="graphic-design" className="py-16 md:py-24 bg-muted/40 rounded-xl shadow-inner_lg overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle title="Graphic Design" highlight="Design" />
        <p className="text-center text-muted-foreground mb-12">
          Some of the highlighted designs and photographs I completed are shown here.
        </p>
        {graphicDesignItems.length > 0 ? (
          <div className="max-w-4xl mx-auto"> {/* Increased max-width for 4 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-1.5"> 
              {graphicDesignItems.map((item, index) => ( // Added index
                <GraphicItemCard key={item.id} item={item} index={index} /> // Pass index
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg mt-12">
            No graphic design items to display at the moment.
          </p>
        )}
      </div>
    </section>
  );
}
