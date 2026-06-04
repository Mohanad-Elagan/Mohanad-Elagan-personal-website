"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/section';
import { Button } from '@/components/ui/button';
import { CreativePieceCard } from '@/components/creative-piece-card';
import { creativeWritingPieces } from '@/data/creative-writing';
import { siteConfig } from '@/lib/site-config';

export function WritingSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (creativeWritingPieces.length === 0) return null;

  return (
    <Section id="writing" tone="muted">
      <SectionHeading
        eyebrow="Writing & Reflection"
        title="Writing & reflection"
        description="I use writing to connect science, memory, identity, faith, and personal growth."
      />
      {mounted ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creativeWritingPieces.map((piece, index) => (
            <CreativePieceCard key={piece.id} piece={piece} index={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {siteConfig.links.substack && (
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="gap-2 border-gold/60">
            <Link href={siteConfig.links.substack} target="_blank" rel="noopener noreferrer">
              Read more on Substack <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
