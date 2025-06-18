// src/components/parallax-section-header.tsx
"use client";

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ParallaxSectionHeaderProps {
  title: string;
  backgroundImageUrl: string; // Will be overridden by book image but kept for structure
  imageHint?: string; // Will be overridden
  backgroundText?: string; // New prop for repeating background text
}

export function ParallaxSectionHeader({ title, backgroundText }: ParallaxSectionHeaderProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });
  const [translateY, setTranslateY] = useState(0);
  const [textTranslateX, setTextTranslateX] = useState(0);

  const parallaxImageUrl = "https://picsum.photos/seed/openbooktexture/1200/800";
  const parallaxImageHint = "open book texture";

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Image parallax (vertical)
        const imageSpeedFactor = 0.2;
        setTranslateY(rect.top * imageSpeedFactor);

        // Background text parallax (horizontal)
        if (backgroundText) {
          const textSpeedFactor = 0.15; // Adjust for desired speed
          // Calculate translateX: 0 when element is at the bottom of viewport, increases as it moves up
          // This makes text appear to scroll from left to right as the section moves up.
          const currentTextTranslateX = (viewportHeight - rect.top) * textSpeedFactor;
          setTextTranslateX(currentTextTranslateX);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, backgroundText]);

  return (
    <div 
      ref={ref}
      className={cn(
        "relative h-48 md:h-64 w-full my-12 md:my-16 flex items-center justify-center overflow-hidden rounded-lg shadow-lg",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
        "transition-all duration-700 ease-out"
      )}
    >
      {/* Background Image Container */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden', 
        }}
        className="z-0"
      >
        <Image
          src={parallaxImageUrl}
          alt={`${title} section background - book`}
          fill
          style={{ 
            objectFit: 'cover',
            transform: `translateY(${translateY}px) scale(1.2)`, 
           }}
          quality={75}
          data-ai-hint={parallaxImageHint}
          priority
        />
      </div>

      {/* Repeating Background Text Layer */}
      {backgroundText && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {Array.from({ length: 7 }).map((_, i) => ( // Changed length from 8 to 7
            <span
              key={i}
              className="absolute text-2xl md:text-4xl font-extrabold text-white/10 whitespace-nowrap select-none"
              style={{
                top: `${(i * 15) % 80}%`, 
                left: `${(i * 25 - 150)}%`, // Adjusted left positioning for more words
                transform: `translateX(${textTranslateX}px) translateY(${(i % 3 - 1) * 20}px)`,
              }}
              aria-hidden="true"
            >
              {backgroundText} {backgroundText} {/* Repeat for wider coverage */}
            </span>
          ))}
        </div>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-20"></div>
      
      {/* Main Title */}
      <h2 className="relative z-30 text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight">
        {title}
      </h2>
    </div>
  );
}
