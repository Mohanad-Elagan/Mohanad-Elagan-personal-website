"use client";

import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  highlight?: string;
  className?: string;
}

export function SectionTitle({ title, highlight, className }: SectionTitleProps) {
  const shouldShowLine = title !== "My Projects, Papers & Writing";
  
  return (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-center mb-4 group relative", className)}>
      <span className="inline-block">
        {title.split(' ').map((word, index, array) => (
          <span key={index} className={word === highlight ? "text-primary" : ""}>
            {word}
            {index < array.length - 1 && ' '}
          </span>
        ))}
        {shouldShowLine && (
        <span className="block w-12 group-hover:w-full transition-all duration-500 h-0.5 bg-primary mt-2 mx-auto"></span>
        )}
      </span>
    </h2>
  );
} 